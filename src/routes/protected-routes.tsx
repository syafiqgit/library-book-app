import { Outlet, Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoutes() {
  const { pathname } = useLocation();

  const authProtected = ["/login", "/register"];
  const tokenProtected = ["/profile", "/profile/edit", "/dashboard"];
  const roleProtected = ["/dashboard"];

  return <Outlet />;
}
