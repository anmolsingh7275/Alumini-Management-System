// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function ProtectedRoute({ children, role }) {
//   const { user, loading } = useAuth();
//   if (loading) return <div className="p-8">Loading...</div>;
//   if (!user) return <Navigate to="/login" replace />;
//   if (role && user.role !== role) return <Navigate to="/" replace />;
//   return children;
// }

// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  // TEMPORARY: bypass auth check
  // const user = JSON.parse(localStorage.getItem("user"));
  // if (!user || user.role !== role) return <Navigate to="/login" />;

  // For UI testing only, allow all
  return children;
};

export default ProtectedRoute;

