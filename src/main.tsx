import ReactDOM from "react-dom/client";
import "@/styles/index.css";
import { Routes } from "./routes/routes";
import { TokenProvider } from "./utils/contexts/token";
import { Toaster } from "./components/ui/toaster";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <TokenProvider>
    <Routes />
    <Toaster/>
  </TokenProvider>
);
