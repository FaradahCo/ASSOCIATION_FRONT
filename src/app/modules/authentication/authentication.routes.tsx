import type { RouteObject } from 'react-router';
import AuthenticationLayout from '../../layouts/authenticationLayout';

// Login Flow
import Login from './login-flow/login';

// Forgot Password Flow
import ForgotPassword from './forgot-password-flow/forgotPassword';
import Otp from './forgot-password-flow/otp';
import ResetPassword from './forgot-password-flow/resetPassword';

// Signup Flow
import Register from './signup-flow/register';
import HibaCheck from './signup-flow/hibaCheck';
import OtpVerify from './signup-flow/otpVerify';
import ProfileInfo from './signup-flow/profileInfo';
import EntityInfo from './signup-flow/entityInfo';
import BankInfo from './signup-flow/bankInfo';
import PlatformAdmin from './signup-flow/platformAdmin';
import AssociateRep from './signup-flow/associateRep';
import ResultApproved from './signup-flow/resultApproved';
import ResultRejected from './signup-flow/resultRejected';

export const authenticationRoutes: RouteObject[] = [
  {
    path: '/auth',
    element: <AuthenticationLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: 'login', element: <Login /> },

      // Forgot Password Flow
      {
        path: 'forgot-password',
        children: [
          { index: true, element: <ForgotPassword /> },
          { path: 'otp', element: <Otp /> },
          { path: 'reset/:token', element: <ResetPassword /> },
        ],
      },

      // Signup Flow
      {
        path: 'register',
        children: [
          { index: true, element: <Register /> },
          { path: 'check', element: <HibaCheck /> },
          { path: 'otp', element: <OtpVerify /> },
          { path: 'profile', element: <ProfileInfo /> }, // Flow A: Simple profile after OTP
          { path: 'entity', element: <EntityInfo /> }, // Flow B: Organization data after check
          { path: 'bank', element: <BankInfo /> },
          { path: 'admin', element: <PlatformAdmin /> },
          { path: 'representative', element: <AssociateRep /> },
          { path: 'result/approved', element: <ResultApproved /> },
          { path: 'result/rejected', element: <ResultRejected /> },
        ],
      },
    ],
  },
];
