import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const { token } = useSelector((state) => state.auth);

  return token ? <Outlet /> : <Navigate replace to="/login" />;
}
