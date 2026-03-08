import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly }) {

  const token = localStorage.getItem("token");
  const student = JSON.parse(localStorage.getItem("student"));

  if(!token){
    return <Navigate to="/login" />;
  }

  // admin check
  if(adminOnly && student?.role !== "admin"){
    return <Navigate to="/dashboard" />;
  }

  return children;
}