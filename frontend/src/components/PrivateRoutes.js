import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../components/UserContext";

const PrivateRoutes = () => {
  const { user, isLoading } = useContext(UserContext);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoutes;
