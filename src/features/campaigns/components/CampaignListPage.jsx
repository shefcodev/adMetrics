import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { useCampaignList } from "../hooks/useCampaignList.js";
import { CampaignCard } from "./CampaignCard.jsx";
import LoadingComponent from "./ui/LoadingComponent.jsx";

export function CampaignListPage() {
  const { data, loading, error, refetch } = useCampaignList();
  const [query, setQuery] = useState("");

  const campaigns = useMemo(() => {
    const list = Array.isArray(data) ? data : [];
    const term = query.trim().toLowerCase();
    const filtered = term
      ? list.filter(
          (campaign) =>
            String(campaign.id).includes(term) ||
            (campaign.name || "").toLowerCase().includes(term)
        )
      : list;
    return [...filtered].sort((a, b) => Number(a.id) - Number(b.id));
  }, [data, query]);

  if (loading) return <LoadingComponent />;

  if (error) {
    return (
      <section className="space-y-5">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Campaigns
        </h1>
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Failed to load campaigns.{" "}
          <button
            onClick={refetch}
            className="font-medium underline underline-offset-2"
          >
            Try again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Campaigns
        </h1>
        <button
          onClick={() => {
            refetch();
            setQuery("");
          }}
          className="inline-flex items-center rounded-lg border border-zinc-200 bg-white/70 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
        >
          Refresh
        </button>
      </div>

      <div className="relative">
        <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search campaigns"
          aria-label="Search campaigns"
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white/70 pl-9 pr-3 text-sm outline-none placeholder:text-zinc-400 focus:border-blue-300"
        />
      </div>

      <div className="hidden md:block">
        <div className="overflow-auto rounded-xl border bg-white/70">
          <table className="w-full border-separate border-spacing-0 text-sm">
            <caption className="sr-only">List of campaigns</caption>
            <thead className="bg-zinc-50 text-[11px] uppercase tracking-wide text-zinc-500">
              <tr>
                <th scope="col" className="px-4 py-2 text-left font-medium">
                  Campaign ID
                </th>
                <th scope="col" className="px-4 py-2 text-left font-medium">
                  Campaign Name
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="group hover:bg-zinc-50">
                  <td className="px-4 py-3 align-middle">
                    <Link
                      to={`/campaigns/${campaign.id}`}
                      state={{ id: campaign.id, name: campaign.name }}
                      className="block tabular-nums text-zinc-700 group-hover:text-zinc-900"
                    >
                      {campaign.id}
                    </Link>
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <Link
                      to={`/campaigns/${campaign.id}`}
                      state={{ id: campaign.id, name: campaign.name }}
                      className="block truncate font-medium text-zinc-900 group-hover:text-blue-700"
                    >
                      {campaign.name}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {campaigns.map(({ id, name }) => (
          <CampaignCard key={id} id={id} name={name} />
        ))}
      </div>

      {campaigns.length === 0 && (
        <div className="rounded-xl border bg-white/70 p-6 text-sm text-zinc-600">
          No campaigns match “{query}”.
        </div>
      )}
    </section>
  );
}
