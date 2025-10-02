import { Navigate, Outlet } from 'react-router';
import { isAuthenticated } from './ProtectedRoute';

const AuthProtectedRoute = () => {
  return !isAuthenticated() ? <Outlet /> : <Navigate to='/' replace />;
};

export default AuthProtectedRoute;
