import { Navigate, Outlet } from "react-router-dom";

export function PrivateRoutes() {
  const auth = { token: false };
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
}
