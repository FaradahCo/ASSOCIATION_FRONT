import type { RouteObject } from "react-router";
import AuthenticationLayout from "../../layouts/authenticationLayout";
import Login from "./login/login";
import Register from "./register/register";
import ForgetPassword from "./forget-password/forgetPassword";
import VerifyOtp from "./verify-otp/verifyOtp";
import CreateNewPassword from "./createNewPassword/createNewPassword";

export const authenticationRoutes: RouteObject[] = [
  {
    path: "",
    element: <AuthenticationLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: "Register", element: <Register /> },
      { path: "ForgetPassword", element: <ForgetPassword /> },
      {
        path: "verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "create-new-password",
        element: <CreateNewPassword />,
      },
    ],
  },
];
