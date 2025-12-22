import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { getToken } = useAuth();
  const token = getToken();

  if (!token) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
