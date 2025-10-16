const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const searchInput = document.getElementById('dashboardSearch');

menuBtn.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});

// Load both seed.json and localStorage tasks, merge them safely
async function loadTasks() {
  const seedData = await fetch('seed.json').then(res => res.json());
  const localData = JSON.parse(localStorage.getItem('tasks') || '[]');

  // Avoid duplicates by using IDs
  const merged = [...seedData];
  localData.forEach(task => {
    if (!merged.find(t => t.id === task.id)) merged.push(task);
  });

  return merged;
}

// Calculate and display dashboard stats
function calculateStats(tasks) {
  const totalTasks = tasks.length;
  const totalHours = tasks.reduce((sum, t) => sum + (t.duration / 60), 0);
  const topTag = findTopTag(tasks);
  const events = tasks.filter(t => t.tag.toLowerCase() === 'event').length;

  document.getElementById('completedCount').textContent = totalTasks;
  document.getElementById('hoursLogged').textContent = Math.round(totalHours);
  document.getElementById('topTags').textContent = topTag || '–';

  console.log(`Stats updated: ${totalTasks} tasks, ${totalHours} hrs, ${events} events`);
}

// Find top tag
function findTopTag(tasks) {
  const tagCount = {};
  tasks.forEach(task => {
    const tag = task.tag?.trim();
    if (tag) tagCount[tag] = (tagCount[tag] || 0) + 1;
  });

  const sortedTags = Object.entries(tagCount).sort((a, b) => b[1] - a[1]);
  return sortedTags.length ? sortedTags[0][0] : null;
}

// Initialize dashboard
loadTasks().then(tasks => {
  calculateStats(tasks);

  // Enable search function for dashboard
  searchInput.addEventListener('input', e => {
    const searchValue = e.target.value.toLowerCase();
    const found = tasks.some(t =>
      t.title.toLowerCase().includes(searchValue) ||
      t.tag.toLowerCase().includes(searchValue)
    );
    if (!found && searchValue.trim() !== '') {
      alert('No matching tasks found.');
    }
  });
});
