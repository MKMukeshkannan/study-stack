import { useAuthContext } from "@/context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth() {
  const { auth } = useAuthContext();
  const location = useLocation();

  return (
    auth?.email
      ? <Outlet />
      : <Navigate to="/login" state={{ from: location }} replace />
  );
}
