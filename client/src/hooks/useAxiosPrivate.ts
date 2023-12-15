import { axiosPrivate } from "../lib/axios";
import { useEffect } from "react";
import useRefresh from "./useRefresh";
import { useAuthContext } from "@/context/AuthContext";
import { CanceledError } from "axios";

const useAxiosPrivate = () => {
  const refresh = useRefresh();
  const { auth } = useAuthContext();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use((config) => {
      if (!config.headers["authorization"]) {
        config.headers["authorization"] = `Bearer ${auth.access_token}`;
      }
      return config;
    }, (err) => Promise.reject(err));

    const responseIntrecept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (err: CanceledError<any>) => {
        const prevReq = err?.config;
        if (err.response?.status === 403) {
          const newToken = await refresh();
          if (prevReq) {
            prevReq.headers["authorization"] = `Bearer ${newToken}`;
            return axiosPrivate(prevReq);
          }
        }
        return Promise.reject(err);
      },
    );

    return () => {
      axiosPrivate.interceptors.response.eject(responseIntrecept);
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
