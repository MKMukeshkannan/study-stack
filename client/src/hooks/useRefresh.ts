import axios from "@/lib/axios";
import { useAuthContext } from "@/context/AuthContext";

export default function useRefresh() {
  const { setAuth } = useAuthContext();

  const refresh = async () => {
    const response = await axios.get("/api/v1/auth/refresh", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    setAuth({
      name: response.data.name,
      email: response.data.email,
      access_token: response.data.access_token,
    });

    return response.data;
  };

  return refresh;
}
