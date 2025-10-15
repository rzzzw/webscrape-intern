export default function Table({ items }: any) {
  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th>Quote</th>
          <th>Author</th>
          <th>Tags</th>
        </tr>
      </thead>
      <tbody>
        {items.slice(0, 5).map((i: any, idx: number) => (
          <tr key={idx}>
            <td>{i.quote}</td>
            <td>{i.author}</td>
            <td>{i.tags.join(", ")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
