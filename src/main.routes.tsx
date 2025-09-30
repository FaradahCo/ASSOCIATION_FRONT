import { createBrowserRouter } from 'react-router';
import { authenticationRoutes } from './app/modules/authentication/authentication.routes';
import { dashboardRoutes } from './app/modules/dashborad/dashboard.routes';
import ProtectedRoute from './app/guards/ProtectedRoute';
import AuthProtectedRoute from './app/guards/authProtected';

const router = createBrowserRouter([
  {
    element: <AuthProtectedRoute />,
    children: [...authenticationRoutes],
  },
  
  {
    element: <ProtectedRoute />,
    children: [...dashboardRoutes],
  },
]);

export default router;
