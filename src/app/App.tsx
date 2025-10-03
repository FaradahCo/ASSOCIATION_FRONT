import { RouterProvider } from "react-router";
import router from "../main.routes";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
