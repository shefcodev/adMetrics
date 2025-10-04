import { useEffect, useState } from "react";
import { fetchCampaigns } from "../api.js";
import { CampaignCard } from "./CampaignCard.jsx";
import LoadingComponent from "../../dashboard/components/ui/LoadingComponent.jsx";

export function CampaignList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    fetchCampaigns()
      .then(setData)
      .catch(setErr)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent />;
  if (err) return <p>Failed to load campaigns</p>;

  return (
    <section className="space-y-4">
      <h3 className="text-3xl font-sans font-bold">Campaigns</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {data.map(({ id, name }, index) => (
          <CampaignCard key={index} id={id} name={name} />
        ))}
      </div>
    </section>
  );
}
