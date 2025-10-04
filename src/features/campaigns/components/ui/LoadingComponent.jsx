import PropTypes from "prop-types";

export default function LoadingComponent({ count = 6, className = "" }) {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading campaigns"
      className={["grid gap-4 grid-cols-1 sm:grid-cols-2", className].join(" ")}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
        >
          <div className="text-[10px] font-medium uppercase tracking-wide text-zinc-500">
            Campaign Name
          </div>
          <div className="mt-1 h-5 w-1/3 rounded bg-zinc-200 animate-pulse" />

          <div className="mt-3 text-[10px] font-medium uppercase tracking-wide text-zinc-500">
            ID
          </div>
          <div className="mt-1 h-4 w-16 rounded bg-zinc-200 animate-pulse" />
        </div>
      ))}

      <span className="sr-only">Loading…</span>
    </div>
  );
}

LoadingComponent.propTypes = {
  count: PropTypes.number,
  className: PropTypes.string,
};
