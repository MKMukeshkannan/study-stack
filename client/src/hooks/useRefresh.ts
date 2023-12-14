import axios from "@/lib/axios";
import { useAuthContext } from "@/context/AuthContext";

export default function useRefresh() {
  const { setAuth } = useAuthContext();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });

    setAuth((prev) => {
      return { ...prev, accesstoken: response.data.accesstoken };
    });

    return response.data.accesstoken;
  };

  return refresh;
}
