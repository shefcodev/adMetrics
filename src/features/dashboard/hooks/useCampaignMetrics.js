import { useEffect, useRef, useState } from "react";
import { fetchMetrics } from "../api.js";
import usePolling from "./usePolling.js";
import { POLL_MS } from "../../../lib/constants.js";

export function useCampaignMetrics(cid, { pauseOnHidden = false } = {}) {
  const [number, setNumber] = useState(0);
  const numberRef = useRef(0);
  const [latest, setLatest] = useState(null);
  const [totals, setTotals] = useState({ impressions: 0, clicks: 0, users: 0 });
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const inflight = useRef(false);
  const cidRef = useRef(cid);

  useEffect(() => {
    cidRef.current = cid;
    numberRef.current = 0;
    setNumber(0);
    setLatest(null);
    setTotals({ impressions: 0, clicks: 0, users: 0 });
    setLastUpdated(null);
    setError(null);
  }, [cid]);

  usePolling(
    async () => {
      if (!cid) return;
      if (pauseOnHidden && typeof document !== "undefined" && document.hidden)
        return;
      if (inflight.current) return;
      inflight.current = true;
      const currentN = numberRef.current;

      try {
        setIsFetching(true);
        const data = await fetchMetrics(cid, currentN);

        if (cidRef.current !== cid) return;

        setLatest(data);
        setTotals((prev) => ({
          impressions: prev.impressions + data.impressions,
          clicks: prev.clicks + data.clicks,
          users: prev.users + data.users,
        }));

        numberRef.current = currentN + 1;
        setNumber(numberRef.current);
        setLastUpdated(new Date());
        setError(null);
      } catch (e) {
        if (cidRef.current === cid) setError(e);
      } finally {
        inflight.current = false;
        setIsFetching(false);
      }
    },
    POLL_MS,
    [cid, pauseOnHidden]
  );

  return { number, latest, totals, lastUpdated, isFetching, error };
}
