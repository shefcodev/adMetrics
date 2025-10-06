import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Nav({
  brand = "AdStack",
  rightLabel = "Campaigns",
  rightTo = "/",
  className = "",
}) {
  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-40 md:hidden",
        "bg-white/90 backdrop-blur shadow-sm",
        className,
      ].join(" ")}
      role="banner"
    >
      <div className="mx-auto flex h-14 items-center gap-3 px-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-mono text-zinc-500"
        >
          <span
            className="inline-block h-2 w-2 rounded-sm bg-blue-600"
            aria-hidden
          />
          {brand}
        </Link>

        <Link
          to={rightTo}
          className="ml-auto inline-flex items-center rounded-lg border border-zinc-200
                     bg-white px-3 py-1.5 text-sm font-medium text-zinc-700
                     hover:bg-zinc-50 focus:outline-none focus-visible:ring-2
                     focus-visible:ring-blue-500/40"
        >
          {rightLabel}
        </Link>
      </div>
    </header>
  );
}

Nav.propTypes = {
  brand: PropTypes.string,
  rightLabel: PropTypes.string,
  rightTo: PropTypes.string,
  className: PropTypes.string,
};
