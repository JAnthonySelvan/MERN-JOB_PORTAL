import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({allowedRoles}) {
  const { loading, isAuthenticated, user } = useSelector((state) => state.auth);

  if(loading){
    return <div className="p-4">Loading...</div>
  }

  if(!isAuthenticated){
    // console.log(isAuthenticated)
    return <Navigate to="/login" replace/>
  }

  if(allowedRoles && !allowedRoles.includes(user?.role)){
    // console.log(user)
    return <Navigate to="/unautherized" replace/>
  }
  return <Outlet/>
}

export default ProtectedRoute;
