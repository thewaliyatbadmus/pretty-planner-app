const clearTasksBtn = document.getElementById('clearTasks');
const clearSettingsBtn = document.getElementById('clearSettings');
const importBtn = document.getElementById('importBtn');
const exportBtn = document.getElementById('exportBtn');
const form = document.getElementById('settingsForm');
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');

menuBtn.addEventListener('click', () => {
  menu.classList.toggle('show');
});

document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('show');
  });
});

function showPopup(message, type) {
  const popup = document.createElement('div');
  popup.className = `popup ${type}`;
  popup.textContent = message;
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 2500);
}

clearTasksBtn.addEventListener('click', () => {
  localStorage.removeItem('tasks');
  showPopup('All tasks cleared successfully.', 'success');
});

clearSettingsBtn.addEventListener('click', () => {
  form.reset();
  showPopup('Settings have been reset.', 'info');
});

importBtn.addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(event) {
      try {
        const data = JSON.parse(event.target.result);
        if (Array.isArray(data)) {
          localStorage.setItem('tasks', JSON.stringify(data));
          showPopup('Data imported successfully.', 'success');
        } else {
          showPopup('Invalid file format.', 'error');
        }
      } catch {
        showPopup('Error reading file.', 'error');
      }
    };
    reader.readAsText(file);
  };
  input.click();
});

exportBtn.addEventListener('click', () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  if (tasks.length === 0) {
    showPopup('No data to export.', 'error');
    return;
  }
  const blob = new Blob([JSON.stringify(tasks, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'tasks_export.json';
  link.click();
  showPopup('Data exported successfully.', 'success');
});
