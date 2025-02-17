import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = (): JSX.Element => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;