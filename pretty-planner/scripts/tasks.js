const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const searchInput = document.getElementById('taskSearch');

menuBtn.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});

fetch('seed.json')
  .then(res => res.json())
  .then(data => {
    const classes = document.querySelector('#classes .task-list');
    const events = document.querySelector('#events .task-list');
    const assignments = document.querySelector('#assignments .task-list');

    data.forEach(task => {
      const card = document.createElement('div');
      card.classList.add('task-card');
      card.innerHTML = `
        <h4>${task.title}</h4>
        <p>${task.dueDate}</p>
        <p>${task.duration} minutes</p>
        <p>#${task.tag.toLowerCase()}</p>
      `;

      if (task.tag === 'Class') classes.appendChild(card);
      else if (task.tag === 'Event') events.appendChild(card);
      else if (task.tag === 'Assignment') assignments.appendChild(card);
    });

    searchInput.addEventListener('input', e => {
  const searchValue = e.target.value.toLowerCase();
  const cards = document.querySelectorAll('.task-card');
  let found = false;

  cards.forEach(card => {
    if (card.textContent.toLowerCase().includes(searchValue)) {
      card.style.display = 'block';
      found = true;
    } else {
      card.style.display = 'none';
    }
  });

  let msg = document.querySelector('.no-results');
  if (!msg) {
    msg = document.createElement('p');
    msg.className = 'no-results';
    msg.textContent = 'No tasks match your search.';
    msg.style.textAlign = 'center';
    msg.style.marginTop = '1rem';
    msg.style.display = 'none';
    document.querySelector('.tasks-container').appendChild(msg);
  }

  msg.style.display = found ? 'none' : 'block';
});
  });

  async function loadTasks() {
  const seedData = await fetch('seed.json').then(res => res.json());
  const localData = JSON.parse(localStorage.getItem('tasks') || '[]');
  const merged = [...seedData];

  localData.forEach(task => {
    if (!merged.find(t => t.id === task.id)) merged.push(task);
  });

  return merged;
}
