import type { RouteObject } from 'react-router';
import AuthenticationLayout, { type AuthLayoutMetadata } from '../../layouts/authenticationLayout';

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
      {
        index: true,
        element: <Login />,
        handle: {
          titleKey: 'login.pageTitle',
          descriptionKey: 'login.pageDescription',
          illustration: 'login',
        } satisfies AuthLayoutMetadata,
      },
      {
        path: 'login',
        element: <Login />,
        handle: {
          titleKey: 'login.pageTitle',
          descriptionKey: 'login.pageDescription',
          illustration: 'login',
        } satisfies AuthLayoutMetadata,
      },

      // Forgot Password Flow
      {
        path: 'forgot-password',
        children: [
          {
            index: true,
            element: <ForgotPassword />,
            handle: {
              titleKey: 'forgotPassword.title',
              descriptionKey: 'forgotPassword.subtitle',
              illustration: 'forgotPassword',
            } satisfies AuthLayoutMetadata,
          },
          {
            path: 'otp',
            element: <Otp />,
            handle: {
              titleKey: 'otp.title',
              descriptionKey: 'otp.subtitle',
              illustration: 'otp',
            } satisfies AuthLayoutMetadata,
          },
          {
            path: 'reset/:token',
            element: <ResetPassword />,
            handle: {
              titleKey: 'resetPassword.title',
              descriptionKey: 'resetPassword.subtitle',
              illustration: 'padlock',
            } satisfies AuthLayoutMetadata,
          },
        ],
      },

      // Signup Flow
      {
        path: 'register',
        children: [
          {
            index: true,
            element: <Register />,
            handle: {
              titleKey: 'signup.hibaCheck.title',
              descriptionKey: 'signup.hibaCheck.subtitle',
              illustration: 'signup',
            } satisfies AuthLayoutMetadata,
          },
          {
            path: 'check',
            element: <HibaCheck />,
            handle: {
              titleKey: 'signup.hibaCheck.title',
              descriptionKey: 'signup.hibaCheck.subtitle',
              illustration: 'signup',
            } satisfies AuthLayoutMetadata,
          },
          {
            path: 'otp',
            element: <OtpVerify />,
            handle: {
              titleKey: 'signup.otp.title',
              descriptionKey: 'signup.otp.subtitle',
              illustration: 'passwordOtp',
            } satisfies AuthLayoutMetadata,
          },
          {
            path: 'profile',
            element: <ProfileInfo />,
            handle: {
              titleKey: 'signup.hibaCheck.title',
              illustration: 'data',
            } satisfies AuthLayoutMetadata,
          },
          {
            path: 'entity',
            element: <EntityInfo />,
            handle: {
              titleKey: 'signup.hibaCheck.title',
              illustration: 'data',
            } satisfies AuthLayoutMetadata,
          },
          {
            path: 'bank',
            element: <BankInfo />,
            handle: {
              titleKey: 'signup.hibaCheck.title',
              illustration: 'bank',
            } satisfies AuthLayoutMetadata,
          },
          {
            path: 'admin',
            element: <PlatformAdmin />,
            handle: {
              titleKey: 'signup.hibaCheck.title',
              illustration: 'data',
            } satisfies AuthLayoutMetadata,
          },
          {
            path: 'representative',
            element: <AssociateRep />,
            handle: {
              titleKey: 'signup.hibaCheck.title',
              illustration: 'data',
            } satisfies AuthLayoutMetadata,
          },
          {
            path: 'result/approved',
            element: <ResultApproved />,
            handle: {
              titleKey: 'signup.result.approved.title',
              illustration: 'data',
            } satisfies AuthLayoutMetadata,
          },
          {
            path: 'result/rejected',
            element: <ResultRejected />,
            handle: {
              titleKey: 'signup.result.rejected.title',
              illustration: 'data',
            } satisfies AuthLayoutMetadata,
          },
        ],
      },
    ],
  },
];

// Route path constants for easy navigation
export const authRoutePaths = {
  LOGIN: '/auth',
  REGISTER: '/auth/register',
  REGISTER_CHECK: '/auth/register/check',
  REGISTER_OTP: '/auth/register/otp',
  REGISTER_PROFILE: '/auth/register/profile',
  REGISTER_ENTITY: '/auth/register/entity',
  REGISTER_BANK: '/auth/register/bank',
  REGISTER_ADMIN: '/auth/register/admin',
  REGISTER_REPRESENTATIVE: '/auth/register/representative',
  REGISTER_RESULT_APPROVED: '/auth/register/result/approved',
  REGISTER_RESULT_REJECTED: '/auth/register/result/rejected',
  FORGOT_PASSWORD: '/auth/forgot-password',
  FORGOT_PASSWORD_OTP: '/auth/forgot-password/otp',
  RESET_PASSWORD: (token: string) => `/auth/forgot-password/reset/${token}`,
} as const;
