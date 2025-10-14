import { loadData } from "./storage.js";

const totalTasks = document.getElementById("completedCount");
const totalHours = document.getElementById("hoursLogged");
const topTag = document.getElementById("attendedCount");
const searchBox = document.getElementById("dashboardSearch");
const updateBtn = document.getElementById("updateBtn");

updateBtn.addEventListener("click", () => {
  window.location.href = "add-task.html";
});

function summarize(data) {
  totalTasks.textContent = data.length;
  const totalMinutes = data.reduce((sum, t) => sum + (t.duration || 0), 0);
  totalHours.textContent = (totalMinutes / 60).toFixed(1);

  const tagCount = {};
  data.forEach((t) => {
    tagCount[t.tag] = (tagCount[t.tag] || 0) + 1;
  });

  const top =
    Object.keys(tagCount).length === 0
      ? "–"
      : Object.keys(tagCount).reduce((a, b) =>
          tagCount[a] > tagCount[b] ? a : b
        );
  topTag.textContent = top;
}

function drawChart(canvasId, labels, data) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");

  const barWidth = 40;
  const gap = 25;
  const baseY = 180;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";

  labels.forEach((label, i) => {
    const x = i * (barWidth + gap) + 30;
    const height = data[i] * 3; // scale height visually
    ctx.fillRect(x, baseY - height, barWidth, height);
    ctx.fillText(label, x, baseY + 15);
  });
}

function updateCharts(data) {
  const tagCount = {};
  data.forEach((t) => {
    tagCount[t.tag] = (tagCount[t.tag] || 0) + 1;
  });

  const tags = Object.keys(tagCount);
  const counts = Object.values(tagCount);
  drawChart("tagsChart", tags, counts);

  const eventCount = {};
  data.forEach((t) => {
    const key = t.title.split(" ")[0];
    eventCount[key] = (eventCount[key] || 0) + 1;
  });

  const eventNames = Object.keys(eventCount).slice(0, 5);
  const eventVals = Object.values(eventCount).slice(0, 5);
  drawChart("eventsChart", eventNames, eventVals);
}

function searchTasks(query, allData) {
  const lower = query.toLowerCase();
  return allData.filter(
    (t) =>
      t.title.toLowerCase().includes(lower) ||
      t.tag.toLowerCase().includes(lower)
  );
}

function initDashboard() {
  const allData = loadData();
  summarize(allData);
  updateCharts(allData);

  searchBox.addEventListener("input", () => {
    const filtered = searchTasks(searchBox.value, allData);
    summarize(filtered);
    updateCharts(filtered);
  });
}

initDashboard();