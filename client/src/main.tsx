import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Apply dark mode from localStorage or system preference on initial load
if (
  localStorage.getItem("darkMode") === "true" ||
  (!localStorage.getItem("darkMode") &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

createRoot(document.getElementById("root")!).render(<App />);
