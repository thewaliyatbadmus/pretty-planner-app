import { loadData, loadSeed } from "./storage.js";

const totalTasks = document.getElementById("completedCount");
const totalHours = document.getElementById("hoursLogged");
const topTag = document.getElementById("attendedCount");

async function initDashboard() {
  let data = loadData();
  if (data.length === 0) data = await loadSeed();

  const taskCount = data.length;
  const totalMinutes = data.reduce((sum, t) => sum + t.duration, 0);
  const hours = (totalMinutes / 60).toFixed(1);

  const tagCount = {};
  data.forEach((t) => {
    tagCount[t.tag] = (tagCount[t.tag] || 0) + 1;
  });

  const top =
    Object.keys(tagCount).reduce((a, b) =>
      tagCount[a] > tagCount[b] ? a : b
    );

  totalTasks.textContent = taskCount;
  totalHours.textContent = hours;
  topTag.textContent = top;
}

initDashboard();
