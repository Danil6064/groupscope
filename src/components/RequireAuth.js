import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RequireAuth({ allowedRoles }) {
  const { auth } = useAuth();
  const location = useLocation();
  console.log("Auth:", auth);
  console.log("Auth role:", allowedRoles.includes(auth?.role));

  return allowedRoles.includes(auth?.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}
