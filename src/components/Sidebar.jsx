import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { MdCampaign } from "react-icons/md";

export default function Sidebar({ items = defaultItems, className = "" }) {
  const linkBase =
    "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40";

  const active = "bg-zinc-100 text-zinc-900";
  const idle = "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50";
  const pending = "opacity-70";

  return (
    <aside
      className={[
        "hidden md:flex flex-col gap-6 bg-white shadow-md",
        "min-h-screen",
        className,
      ].join(" ")}
      style={{ width: "var(--sidebar-w, 240px)" }}
    >
      <div className="px-4 pt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-mono text-zinc-500"
        >
          <span
            className="inline-block h-2 w-2 rounded-sm bg-blue-600"
            aria-hidden
          />
          AdStack
        </Link>
      </div>

      {/* Nav */}
      <nav className="px-4" aria-label="Primary">
        <ul className="space-y-2">
          {items.map(({ to, label, icon: Icon, end }, i) => (
            <li key={i}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive, isPending }) =>
                  [
                    linkBase,
                    isActive ? active : idle,
                    isPending ? pending : "",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={[
                        "h-5 w-5 shrink-0",
                        isActive ? "text-blue-600" : "text-zinc-500",
                      ].join(" ")}
                      aria-hidden
                    />
                    <span className="truncate">{label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

const defaultItems = [
  { to: "/", label: "Campaigns", icon: MdCampaign, end: true },
];

Sidebar.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
      end: PropTypes.bool,
    })
  ),

  className: PropTypes.string,
};
