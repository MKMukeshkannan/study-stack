import axios from "@/lib/axios";
import { useAuthContext } from "@/context/AuthContext";

export default function useRefresh() {
  const { setAuth } = useAuthContext();

  const refresh = async () => {
    const response = await axios.get("/api/v1/auth/refresh", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    setAuth((prev) => {
      return { ...prev, access_token: response.data };
    });

    return response.data;
  };

  return refresh;
}
