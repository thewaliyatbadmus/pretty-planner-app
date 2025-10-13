const KEY = "prettyPlanner:data";

export function loadData() {
  const saved = localStorage.getItem(KEY);
  if (saved) return JSON.parse(saved);
  return [];
}

export function saveData(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export async function loadSeed() {
  const res = await fetch("seed.json");
  const data = await res.json();
  saveData(data);
  return data;
}
