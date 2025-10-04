import { useParams, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { FiClock } from "react-icons/fi";
import { fetchCampaigns } from "../../campaigns/api.js";
import { useCampaignMetrics } from "../hooks/useCampaignMetrics.js";
import { ctr } from "../calc.js";
import Tiles from "./Tiles/Tiles.jsx";
import DashboardSkeleton from "../ui/DashboardSkeleton.jsx";

export function DashboardPage() {
  const { cid } = useParams();
  const { state } = useLocation();

  const [name, setName] = useState(state?.name ?? null);

  useEffect(() => {
    let cancelled = false;
    if (name) return;

    (async () => {
      try {
        const campaigns = await fetchCampaigns();
        if (cancelled) return;

        const found = campaigns.find(
          (campaign) => String(campaign.id) === String(cid)
        );

        if (found?.name) setName(found.name);
      } catch {
        setName(null);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [cid, name]);

  const { number, latest, totals, lastUpdated, isFetching, error } =
    useCampaignMetrics(cid, { pauseOnHidden: true });

  const recent = latest ?? { impressions: 0, clicks: 0, users: 0 };

  const { totalCtr, recentCtr } = useMemo(
    () => ({
      totalCtr: ctr(totals.clicks, totals.impressions),
      recentCtr: ctr(recent.clicks, recent.impressions),
    }),
    [totals.clicks, totals.impressions, recent.clicks, recent.impressions]
  );

  const totalsPayload = useMemo(
    () => ({
      impressions: totals.impressions,
      clicks: totals.clicks,
      ctr: totalCtr,
      users: totals.users,
    }),
    [totals.impressions, totals.clicks, totals.users, totalCtr]
  );

  const recentPayload = useMemo(
    () => ({
      impressions: recent.impressions,
      clicks: recent.clicks,
      ctr: recentCtr,
      users: recent.users,
    }),
    [recent.impressions, recent.clicks, recent.users, recentCtr]
  );

  const lastUpdatedText = useMemo(() => {
    if (!lastUpdated) return null;
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(lastUpdated);
  }, [lastUpdated]);

  if (isFetching) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-sans font-bold">
          <span className="text-primary-100 truncate">{name ?? `#${cid}`}</span>{" "}
          Campaign
        </h1>

        <div
          className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-sm text-zinc-600"
          aria-live="polite"
        >
          <FiClock className="h-4 w-4" aria-hidden />
          <span>Last updated: {lastUpdatedText ?? "—"}</span>
          {isFetching && (
            <span className="ml-2 h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          )}
        </div>
      </div>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Failed to refresh metrics. Retrying…
        </div>
      )}

      <Tiles
        totals={totalsPayload}
        recent={recentPayload}
        number={number}
        loading={!latest && number === 0}
      />
    </div>
  );
}
