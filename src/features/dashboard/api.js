import { apiGet } from "../../lib/apiClient.js";

export const fetchMetrics = (cid, number) =>
  apiGet(`/api/campaigns/${cid}?number=${number}`);
