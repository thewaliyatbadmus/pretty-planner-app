document.getElementById("importBtn").addEventListener("click", () => {
  alert("Import feature will load data from JSON soon!");
});

document.getElementById("exportBtn").addEventListener("click", () => {
  alert("Export feature will save your data to a JSON file soon!");
});

document.getElementById("clearBtn").addEventListener("click", () => {
  const confirmClear = confirm("Are you sure you want to clear all tasks?");
  if (confirmClear) {
    localStorage.clear();
    alert("All tasks have been cleared.");
  }
});

document.getElementById("resetBtn").addEventListener("click", () => {
  const confirmReset = confirm("Clear all settings?");
  if (confirmReset) {
    document.getElementById("settingsForm").reset();
    alert("Settings have been cleared.");
  }
});
