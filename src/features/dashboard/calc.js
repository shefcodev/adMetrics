export const ctr = (clicks, impressions) =>
  impressions ? (clicks / impressions) * 100 : 0;
