import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
reportWebVitals();
