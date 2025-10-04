import MetricTile from "./MetricTile";
import {
  FiEye,
  FiMousePointer,
  FiUsers,
  FiHash,
  FiTrendingUp,
} from "react-icons/fi";
import { formatNumber, formatPercent } from "../../../../lib/utils";
import PropTypes from "prop-types";

export default function Tiles({ totals, recent, number }) {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3 xl:grid-cols-4">
      <MetricTile
        title="Total Impressions"
        value={formatNumber(totals.impressions)}
        icon={FiEye}
        accent="blue"
      />
      <MetricTile
        title="Total Clicks"
        value={formatNumber(totals.clicks)}
        icon={FiMousePointer}
      />
      {/* ✅ CTR icon in the same top-right slot */}
      <MetricTile
        title="CTR"
        value={formatPercent(totals.ctr)}
        icon={FiTrendingUp}
        accent="green"
      />
      <MetricTile
        title="Total Users"
        value={formatNumber(totals.users)}
        icon={FiUsers}
      />

      <MetricTile
        title="Current Number"
        value={formatNumber(number)}
        icon={FiHash}
        variant="filled"
      />
      <MetricTile
        title="Most Recent Impressions"
        value={formatNumber(recent.impressions)}
        icon={FiEye}
        accent="blue"
      />
      <MetricTile
        title="Most Recent Clicks"
        value={formatNumber(recent.clicks)}
        icon={FiMousePointer}
      />
      {/* ✅ Most Recent CTR icon in the same top-right slot */}
      <MetricTile
        title="Most Recent CTR"
        value={formatPercent(recent.ctr)}
        icon={FiTrendingUp}
        accent="green"
      />
    </div>
  );
}

Tiles.propTypes = {
  totals: PropTypes.shape({
    impressions: PropTypes.number.isRequired,
    clicks: PropTypes.number.isRequired,
    ctr: PropTypes.number.isRequired,
    users: PropTypes.number.isRequired,
  }).isRequired,
  recent: PropTypes.shape({
    impressions: PropTypes.number.isRequired,
    clicks: PropTypes.number.isRequired,
    ctr: PropTypes.number.isRequired,
  }).isRequired,
  number: PropTypes.number.isRequired,
};
