import { createBrowserRouter } from "react-router";
import { authenticationRoutes } from "./app/modules/authentication/authentication.routes";

const router = createBrowserRouter([...authenticationRoutes]);

export default router;
