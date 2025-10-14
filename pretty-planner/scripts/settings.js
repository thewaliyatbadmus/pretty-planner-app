const importBtn = document.getElementById("importBtn");
const exportBtn = document.getElementById("exportBtn");
const clearBtn = document.getElementById("clearBtn");
const resetBtn = document.getElementById("resetBtn");
const fileInput = document.getElementById("importFile");
const contrastSelect = document.getElementById("contrast");
const body = document.body;

// Import Data (JSON → localStorage)
importBtn.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      localStorage.setItem("prettyPlannerData", JSON.stringify(data));
      alert("Data imported successfully!");
    } catch {
      alert("Invalid JSON file. Please upload a valid data file.");
    }
  };
  reader.readAsText(file);
});

// Export Data (localStorage → JSON)
exportBtn.addEventListener("click", () => {
  const data = localStorage.getItem("prettyPlannerData");
  if (!data) {
    alert("No data found to export!");
    return;
  }
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "pretty_planner_data.json";
  a.click();
  URL.revokeObjectURL(url);
});

// Clear All Tasks
clearBtn.addEventListener("click", () => {
  const confirmClear = confirm("Are you sure you want to clear all tasks?");
  if (confirmClear) {
    localStorage.removeItem("prettyPlannerData");
    alert("All tasks have been cleared.");
  }
});

// Clear Settings (resets form)
resetBtn.addEventListener("click", () => {
  const confirmReset = confirm("Clear all settings?");
  if (confirmReset) {
    document.getElementById("settingsForm").reset();
    localStorage.removeItem("prettyPlannerTheme");
    alert("Settings cleared.");
  }
});

// Accessibility Theme Toggle
contrastSelect.addEventListener("change", () => {
  const theme = contrastSelect.value;
  if (theme === "dark") {
    body.classList.add("dark-mode");
    localStorage.setItem("prettyPlannerTheme", "dark");
  } else {
    body.classList.remove("dark-mode");
    localStorage.setItem("prettyPlannerTheme", "light");
  }
});

// Load saved theme on page load
const savedTheme = localStorage.getItem("prettyPlannerTheme");
if (savedTheme === "dark") {
  body.classList.add("dark-mode");
  contrastSelect.value = "dark";
}

