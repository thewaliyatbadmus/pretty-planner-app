const form = document.getElementById("settingsForm");
const capInput = document.getElementById("cap");
const unitSelect = document.getElementById("unit");
const statusMsg = document.getElementById("statusMsg");
const exportBtn = document.getElementById("exportBtn");
const importBtn = document.getElementById("importBtn");
const fileInput = document.getElementById("fileInput");

function loadSettings() {
  const saved = JSON.parse(localStorage.getItem("prettyPlanner:settings")) || {};
  if (saved.cap) capInput.value = saved.cap;
  if (saved.unit) unitSelect.value = saved.unit;
}

function saveSettings() {
  const settings = {
    cap: capInput.value,
    unit: unitSelect.value
  };
  localStorage.setItem("prettyPlanner:settings", JSON.stringify(settings));
  statusMsg.textContent = "Settings saved successfully!";
  setTimeout(() => (statusMsg.textContent = ""), 2000);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  saveSettings();
});

exportBtn.addEventListener("click", () => {
  const data = localStorage.getItem("prettyPlanner:data");
  if (!data) {
    alert("No data to export.");
    return;
  }
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "prettyPlanner-data.json";
  a.click();
  URL.revokeObjectURL(url);
});

importBtn.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const json = JSON.parse(reader.result);
      if (Array.isArray(json)) {
        localStorage.setItem("prettyPlanner:data", JSON.stringify(json));
        statusMsg.textContent = "Data imported successfully!";
      } else {
        statusMsg.textContent = "Invalid file format.";
      }
    } catch {
      statusMsg.textContent = "Error reading file.";
    }
    setTimeout(() => (statusMsg.textContent = ""), 3000);
  };
  reader.readAsText(file);
});

loadSettings();
