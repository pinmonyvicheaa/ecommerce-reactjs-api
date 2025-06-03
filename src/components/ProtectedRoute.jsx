import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, token } = useContext(AuthContext); // Get user and token
  const location = useLocation();

  console.log("ProtectedRoute Check - User:", user); // Debugging
  console.log("ProtectedRoute Check - Token:", token); // Debugging

  // Redirect to login if no user or token
  if (!user || !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
