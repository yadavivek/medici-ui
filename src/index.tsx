import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Tailwind CSS styles
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Create a root element and render the app
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
