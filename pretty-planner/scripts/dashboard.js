function loadTasks() {
  const localData = localStorage.getItem('tasks');
  if (localData) {
    return JSON.parse(localData);
  } else {
    return fetch('seed.json').then(res => res.json());
  }
}

function calculateStats(tasks) {
  const totalTasks = tasks.length;
  const totalHours = tasks.reduce((sum, t) => sum + (t.duration / 60), 0);
  const attended = tasks.filter(t => t.tag === 'Event').length;

  document.getElementById('completedCount').textContent = totalTasks;
  document.getElementById('hoursLogged').textContent = Math.round(totalHours);
  document.getElementById('attendedCount').textContent = attended;
}

loadTasks().then(data => {
  calculateStats(data);
});

