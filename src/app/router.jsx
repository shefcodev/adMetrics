import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { CampaignListPage } from "../features/campaigns/index.js";
import { DashboardPage } from "../features/dashboard/index.js";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <CampaignListPage /> },
      { path: "campaigns/:cid", element: <DashboardPage /> },
    ],
  },
]);
