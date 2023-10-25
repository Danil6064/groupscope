import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App";
import { AuthProvider } from "./context/AuthProvider";

const root = createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
