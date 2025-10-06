import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ROUTES } from "../../../lib/constants";

export function CampaignCard({ id, name, className = "" }) {
  const href = ROUTES.dashboard(id);

  return (
    <Link
      to={href}
      state={{ id, name }}
      className={[
        "group block rounded-xl border border-zinc-200 bg-white/70 p-4 shadow-sm",
        "transition hover:bg-zinc-50 hover:shadow-md",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40",
        className,
      ].join(" ")}
      aria-label={`Open dashboard for campaign ${name} (ID ${id})`}
    >
      <div className="text-[10px] font-medium uppercase tracking-wide text-zinc-500">
        Campaign Name
      </div>
      <div className="mt-1 truncate text-lg font-semibold text-zinc-900 group-hover:text-blue-700">
        {name}
      </div>

      <div className="mt-3 text-[10px] font-medium uppercase tracking-wide text-zinc-500">
        ID
      </div>
      <div className="mt-1 tabular-nums text-sm text-zinc-600">{id}</div>
    </Link>
  );
}

CampaignCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};
