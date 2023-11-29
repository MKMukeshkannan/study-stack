import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import SideBarContextProvider from "./context/SideBarContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SideBarContextProvider>
      <App />
    </SideBarContextProvider>
  </React.StrictMode>,
);
