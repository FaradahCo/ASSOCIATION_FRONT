import type { RouteObject } from "react-router";
import MainLayout from "../../layouts/mainLayout";
import Home from "./pages/home/home";
import Reports from "./pages/reports/reports";
import Supports from "./pages/supports/supports";
import FinalRequests from "./pages/fundRequests/findReuests";

export const dashboardRoutes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "reports", element: <Reports /> },
      { path: "find-requests", element: <FinalRequests /> },
      { path: "supports", element: <Supports /> },
    ],
  },
];
