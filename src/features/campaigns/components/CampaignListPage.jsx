import { CampaignCard } from "./CampaignCard.jsx";
import { useCampaignList } from "../hooks/useCampaignList.js";
import LoadingComponent from "./ui/LoadingComponent.jsx";

export function CampaignListPage() {
  const { data, loading, error } = useCampaignList();

  if (loading) return <LoadingComponent />;

  if (error) return <p>Failed to load campaigns</p>;

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
