import { axiosPrivate } from "../lib/axios";
import { useEffect } from "react";
import useRefresh from "./useRefresh";
import { useAuthContext } from "@/context/AuthContext";

const useAxiosPrivate = () => {
  const refresh = useRefresh();
  const { auth } = useAuthContext();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use((config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${auth.accesstoken}`;
      }
      return config;
    }, (err) => Promise.reject(err));

    const responseIntrecept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (err) => {
        const prevReq = err?.config;
        if (err?.response?.status === 403 && !prevReq?.send) {
          prevReq.sent = true;
          const newToken = await refresh();
          prevReq.header["Authorization"] = `Bearer ${newToken}`;
          return axiosPrivate(prevReq);
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
