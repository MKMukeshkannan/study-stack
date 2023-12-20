import { useAuthContext } from "@/context/AuthContext";
import useRefresh from "@/hooks/useRefresh";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const refrsh = useRefresh();
  const { auth, persist } = useAuthContext();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refrsh();
      } catch (e) {
        console.error(e);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.access_token && persist ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {persist === "false"
        ? <Outlet />
        : isLoading
        ? <p>Loadin</p>
        : <Outlet />}
    </>
  );
};

export default PersistLogin;
