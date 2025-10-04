import { Link } from "react-router-dom";
import { ROUTES } from "../../../lib/constants";
import PropTypes from "prop-types";

export function CampaignCard({ id, name }) {
  return (
    <div className="flex flex-col gap-2 p-4.5 rounded-xl shadow-md bg-white">
      <div className="flex flex-col gap-1">
        <p className="text-sm text-gray-400 font-sans">CAMPAIGN NAME</p>
        <Link to={ROUTES.dashboard(id)} state={{ id, name }}>
          <span className="text-2xl font-sans font-bold">{name}</span>
        </Link>
      </div>
      <Link
        to={ROUTES.dashboard(id)}
        state={{ id, name }}
        className="text-sm text-gray-400 font-sans"
      >
        <span>ID: </span>
        <span>{id}</span>
      </Link>
    </div>
  );
}

CampaignCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
};
