import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ReactGA from "react-ga4";


ReactGA.initialize("G-0WEQQ1Z8R3");
createRoot(document.getElementById("root")!).render(<App />);
