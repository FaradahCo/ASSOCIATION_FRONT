import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider } from "antd";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./index.css";

const theme = {
  token: {
    colorPrimary: "#AA1826",
  },
};

createRoot(document.getElementById("root")!).render(
  <ConfigProvider theme={theme}>
    <App />
  </ConfigProvider>
);
