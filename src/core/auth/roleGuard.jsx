import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const RoleGuard = ({ children, allow }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user.tipo || user.role; 

  if (!allow.includes(userRole)) {
 
    return <Navigate to="/login" replace />;
  }

  return children;
};