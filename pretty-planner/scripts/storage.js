const KEY = "prettyPlannerData";

export async function loadData() {
  let data = JSON.parse(localStorage.getItem(KEY));

  if (!data || data.length === 0) {
    try {
      const response = await fetch("/seed.json");
      if (!response.ok) throw new Error("Failed to load seed.json");
      data = await response.json();
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Error loading data:", error);
      data = [];
    }
  }

  return data;
}

export function saveData(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}
