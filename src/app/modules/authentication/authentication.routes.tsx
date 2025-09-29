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
      { index: true, element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forget-password", element: <ForgetPassword /> },
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
