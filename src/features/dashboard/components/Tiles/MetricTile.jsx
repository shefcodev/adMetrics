import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import PropTypes from "prop-types";

export default function MetricTile({
  title,
  value,
  icon: Icon,
  accent = "default",
  trend,
  variant = "default",
  className = "",
  loading = false,
}) {
  const valueColor = {
    default: "text-zinc-900",
    blue: "text-blue-600",
    green: "text-green-600",
    red: "text-red-600",
  }[accent];

  const iconTone = {
    default: "bg-zinc-100 text-zinc-500",
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    red: "bg-red-50 text-red-600",
  }[accent];

  const base = "rounded-xl border shadow-sm p-4";
  const variantCls =
    variant === "filled"
      ? "bg-zinc-50/80 border-zinc-200"
      : "bg-white/70 border-zinc-200";

  if (loading) {
    return (
      <div className={[base, variantCls, className].join(" ")}>
        <div className="flex items-center justify-between">
          <div className="h-3 w-28 rounded bg-zinc-200 animate-pulse" />
          <div className="h-7 w-7 rounded-full bg-zinc-200 animate-pulse" />
        </div>
        <div className="mt-3 h-8 w-32 rounded bg-zinc-200 animate-pulse" />
      </div>
    );
  }

  return (
    <div className={[base, variantCls, className].join(" ")}>
      <div className="flex items-center justify-between">
        <div className="text-xs font-medium uppercase tracking-wide text-zinc-500">
          {title}
        </div>
        {Icon ? (
          <div
            className={[
              "flex h-7 w-7 items-center justify-center rounded-full",
              iconTone,
            ].join(" ")}
          >
            <Icon className="h-4 w-4" aria-hidden />
          </div>
        ) : null}
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <div
          className={["text-3xl font-semibold tabular-nums", valueColor].join(
            " "
          )}
        >
          {value}
        </div>

        {trend?.direction ? (
          <div
            className={[
              "inline-flex items-center gap-1 text-sm",
              trend.direction === "up" ? "text-green-600" : "text-red-600",
            ].join(" ")}
            title={trend.label}
          >
            {trend.direction === "up" ? (
              <FiTrendingUp className="h-4 w-4" aria-hidden />
            ) : (
              <FiTrendingDown className="h-4 w-4" aria-hidden />
            )}
            {trend.label ? <span>{trend.label}</span> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

MetricTile.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node,
  ]).isRequired,
  icon: PropTypes.elementType,
  accent: PropTypes.oneOf(["default", "blue", "green", "red"]),
  trend: PropTypes.shape({
    direction: PropTypes.oneOf(["up", "down"]).isRequired,
    label: PropTypes.string,
  }),
  variant: PropTypes.oneOf(["default", "filled"]),
  className: PropTypes.string,
  loading: PropTypes.bool,
};
