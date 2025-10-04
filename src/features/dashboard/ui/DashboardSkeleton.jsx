import MetricTile from "../components/Tiles/MetricTile";
import {
  FiClock,
  FiEye,
  FiMousePointer,
  FiUsers,
  FiHash,
  FiTrendingUp,
} from "react-icons/fi";
import PropTypes from "prop-types";

export default function DashboardSkeleton({ cards = 8, className = "" }) {
  const defaultTiles = [
    { title: "Total Impressions", icon: FiEye, accent: "blue" },
    { title: "Total Clicks", icon: FiMousePointer },
    { title: "CTR", icon: FiTrendingUp, accent: "green" },
    { title: "Total Users", icon: FiUsers },
    { title: "Current Number", icon: FiHash, variant: "filled" },
    { title: "Most Recent Impressions", icon: FiEye, accent: "blue" },
    { title: "Most Recent Clicks", icon: FiMousePointer },
    { title: "Most Recent CTR", icon: FiTrendingUp, accent: "green" },
  ];

  const tiles = defaultTiles.slice(0, cards);

  return (
    <div
      className={["space-y-4", className].join(" ")}
      aria-busy="true"
      role="status"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="h-8 w-72 rounded bg-zinc-200 animate-pulse" />

        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-sm text-zinc-600">
          <FiClock className="h-4 w-4 text-zinc-400" aria-hidden />
          <div className="h-4 w-32 rounded bg-zinc-200 animate-pulse" />
          <span className="ml-2 h-2 w-2 rounded-full bg-zinc-200 animate-pulse" />
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 xl:grid-cols-4">
        {tiles.map((t, i) => (
          <MetricTile
            key={i}
            title={t.title}
            value="—"
            icon={t.icon}
            accent={t.accent}
            variant={t.variant}
            loading
          />
        ))}
      </div>

      <span className="sr-only">Loading dashboard…</span>
    </div>
  );
}

DashboardSkeleton.propTypes = {
  cards: PropTypes.number,
  className: PropTypes.string,
};
