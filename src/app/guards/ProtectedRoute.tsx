import { Navigate, Outlet } from 'react-router';

export const isAuthenticated = () => {
  return false;
};

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to='/auth' replace />;
};

export default ProtectedRoute;
