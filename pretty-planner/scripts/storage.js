const KEY = "prettyPlannerData";

export async function loadData() {
  let data = JSON.parse(localStorage.getItem(KEY));

  if (!data || data.length === 0) {
    try {
      const response = await fetch("../seed.json");
      data = await response.json();
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch (err) {
      console.error("Error loading seed data:", err);
      data = [];
    }
  }

  return data;
}

export function saveData(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

