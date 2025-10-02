import type { RouteObject } from 'react-router';
import AuthenticationLayout from '../../layouts/authenticationLayout';
import Login from './login/login';
import Register from './register/register';
import VerifyOtp from './verify-otp/verifyOtp';
import CreateNewPassword from './createNewPassword/createNewPassword';
import ForgotPassword from './forgot-password/forgotPassword';
import Otp from './otp/otp';
import ResetPassword from './reset-password/resetPassword';

export const authenticationRoutes: RouteObject[] = [
  {
    path: '/auth',
    element: <AuthenticationLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
         { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'otp', element: <Otp /> },
      { path: 'reset-password/:token', element: <ResetPassword /> },
      {
        path: 'verify-otp',
        element: <VerifyOtp />,
      },
      {
        path: 'create-new-password',
        element: <CreateNewPassword />,
      },
     
 
    ],
  },
];
