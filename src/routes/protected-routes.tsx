import { useToken } from "@/utils/contexts/token";
import { Outlet, Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoutes() {
  const { pathname } = useLocation();
  const { token, user } = useToken();

  const authProtected = ["/login", "/register"];
  const tokenProtected = ["/profile", "/profile/edit", "/dashboard"];
  const roleProtected = ["/dashboard"];

  if (authProtected.includes(pathname)) {
    if (token) return <Navigate to="/" />;
  }

  if (tokenProtected.includes(pathname)) {
    if (!token) return <Navigate to="/login" />;

    if (roleProtected.includes(pathname)) {
      if (user.role === "user") return <Navigate to="/" />;
    }
  }

  return <Outlet />;
}
