import type { RouteObject } from "react-router";
import AuthenticationLayout from "../../layouts/authenticationLayout";
import Login from "./login/login";
import Register from "./register/register";
import ForgetPassword from "./forget-password/forgetPassword";
import VerifyOtp from "./verify-otp/verifyOtp";
import CreateNewPassword from "./createNewPassword/createNewPassword";

export const authenticationRoutes: RouteObject[] = [
  {
    path: "/auth",
    element: <AuthenticationLayout />,
    children: [
      {
        index: true,
        loader: () => ({
          image: "/images/auth-background.png",
          title: "Welcome Back!",
          formTitle: "Login",
        }),
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
        loader: () => ({
          image: "/images/auth-background.png",
          title: "Welcome Back!",
          formTitle: "Login to Your Account",
          formDescription: "Enter your credentials to access your account.",
        }),
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
        loader: () => ({
          image: "/images/auth-background.png",
          title: "Welcome Back!",
          formTitle: "Login to Your Account",
          formDescription: "Enter your credentials to access your account.",
        }),
      },
      {
        path: "verify-otp",
        element: <VerifyOtp />,
        loader: () => ({
          image: "/images/auth-background.png",
          title: "Welcome Back!",
          formTitle: "Login to Your Account",
          formDescription: "Enter your credentials to access your account.",
        }),
      },
      {
        path: "create-new-password",
        element: <CreateNewPassword />,
        loader: () => ({
          image: "/images/login.jpg",
          title: "Welcome Back!",
          formTitle: "Login to Your Account",
          formDescription: "Enter your credentials to access your account.",
        }),
      },
    ],
  },
];

export const authenticationRoutePath = {
  LOGIN: "/auth",
  REGISTER: "/auth/register",
  FORGET_PASSWORD: "/auth/forget-password",
  VERIFY_OTP: "/auth/verify-otp",
  NEW_PASSWORD: "/auth/create-new-password",
};
