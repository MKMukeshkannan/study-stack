import { useAuthContext } from "@/context/AuthContext";
import axios from "@/lib/axios";

const useLogout = () => {
  const { setAuth } = useAuthContext();

  const logoutCall = async () => {
    try {
      setAuth(null);
      await axios("api/v1/auth/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return logoutCall;
};

export default useLogout;
