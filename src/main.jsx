import React from "react";
import ReactDOM from "react-dom/client";
import Providers from "./app/Providers.jsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router.jsx";
import "./styles/index.css";

// Start MSW in dev
async function enableMocks() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser.js");
    await worker.start({ onUnhandledRequest: "bypass" });
  }
}
enableMocks().finally(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <Providers>
        <RouterProvider router={router} />
      </Providers>
    </React.StrictMode>
  );
});
