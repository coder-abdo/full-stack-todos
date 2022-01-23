import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStore } from "../store/store";

function ProtectedRoutes() {
  const location = useLocation();
  const {
    auth: { isAuthenticated },
  } = useStore();
  if (!isAuthenticated) {
    return <Navigate to="login" state={{ from: location }} />;
  }
  return <Outlet />;
}
export default ProtectedRoutes;
