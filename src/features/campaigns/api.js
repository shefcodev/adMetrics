import { apiGet } from "../../lib/apiClient.js";

export const fetchCampaigns = () => apiGet("/api/campaigns");
