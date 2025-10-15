import { useState } from "react";

export default function Filters({ items, setFiltered }: any) {
  const [search, setSearch] = useState("");
  const allTags = [...new Set(items.flatMap((i: any) => i.tags))];

  const applyFilter = (term: string) => {
    const f = items.filter((i: any) =>
      i.quote.toLowerCase().includes(term.toLowerCase())
    );
    setFiltered(f);
  };

  return (
    <div className="flex gap-2 items-center">
      <input
        type="text"
        placeholder="Search quote..."
        className="border p-2 rounded"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          applyFilter(e.target.value);
        }}
      />
      <select
        onChange={(e) => {
          const t = e.target.value;
          setFiltered(
            t ? items.filter((i: any) => i.tags.includes(t)) : items
          );
        }}
      >
        <option value="">All tags</option>
        {allTags.map((t) => (
          <option key={t}>{t}</option>
        ))}
      </select>
    </div>
  );
}
