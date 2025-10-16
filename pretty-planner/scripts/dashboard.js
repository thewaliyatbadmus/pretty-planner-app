const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');

menuBtn.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});

function loadTasks() {
  const localData = localStorage.getItem('tasks');
  if (localData) {
    return Promise.resolve(JSON.parse(localData));
  } else {
    return fetch('seed.json').then(res => res.json());
  }
}

function updateDashboard(tasks) {
  const totalTasks = tasks.length;
  const totalHours = tasks.reduce((sum, t) => sum + (t.duration / 60), 0);
  const topTag =
    tasks.length > 0
      ? tasks
          .map(t => t.tag)
          .reduce(
            (most, tag, _, arr) =>
              arr.filter(t => t === tag).length >
              arr.filter(t => t === most).length
                ? tag
                : most
          )
      : '-';

  document.getElementById('completedCount').textContent = totalTasks;
  document.getElementById('hoursLogged').textContent = Math.round(totalHours);
  document.getElementById('topTagCount').textContent = topTag;
}

loadTasks().then(data => {
  updateDashboard(data);
});

