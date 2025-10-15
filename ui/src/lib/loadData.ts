export async function loadData(): Promise<any[]> {
  const res = await fetch("/data/items.jsonl");
  const text = await res.text();
  return text
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line));
}

