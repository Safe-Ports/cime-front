import { Navigate } from "react-router-dom";
import React from "react";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = sessionStorage.getItem("token");
  return token ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;