import { RouterProvider } from "react-router";
import router from "../main.routes";

function App() {
  console.log("RENDER APP !");

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
