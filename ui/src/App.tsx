import { useEffect, useState } from "react";
import { loadData } from "./lib/loadData";
import Table from "./components/Table";
import Filters from "./components/Filters";
import Chart from "./components/Chart";

function App() {
  const [items, setItems] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);

  useEffect(() => {
    loadData().then((data) => {
      setItems(data);
      setFiltered(data);
    });
  }, []);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Quotes Explorer</h1>
      <Filters items={items} setFiltered={setFiltered} />
      <Table items={filtered} />
      <Chart items={filtered} />
    </div>
  );
}
export default App;
