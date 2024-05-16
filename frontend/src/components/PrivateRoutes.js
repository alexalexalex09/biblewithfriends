import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../components/UserContext";

const PrivateRoutes = () => {
  const theContext = useContext(UserContext);
  let user = null;
  if (theContext != null) {
    user = theContext.user;
  }
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
