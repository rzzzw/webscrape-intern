import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function Chart({ items }: any) {
  const tagCounts: Record<string, number> = {};
  items.forEach((i: any) => {
    i.tags.forEach((t: string) => (tagCounts[t] = (tagCounts[t] || 0) + 1));
  });

  const data = Object.entries(tagCounts).map(([tag, count]) => ({
    tag,
    count,
  }));

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Quotes by Tag</h2>
      <BarChart width={600} height={300} data={data}>
        <XAxis dataKey="tag" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" />
      </BarChart>
    </div>
  );
}
