import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/Loading";
import useAuthStatus from "../hooks/useAuthStatus";

export default function ProtectedRoute() {
  const { isLoggedIn, isLoading } = useAuthStatus();

  if (isLoading) {
    return <Loading />;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}
