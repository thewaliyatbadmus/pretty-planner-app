const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const searchInput = document.getElementById('taskSearch');

menuBtn.addEventListener('click', () => {
  menu.classList.toggle('hidden');
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

function renderTasks(tasks) {
  const sections = {
    Class: document.querySelector('#classes .task-list'),
    Event: document.querySelector('#events .task-list'),
    Assignment: document.querySelector('#assignments .task-list'),
    Completed: document.querySelector('#completed .task-list')
  };

  Object.values(sections).forEach(section => (section.innerHTML = ''));

  tasks.forEach(task => {
    const card = document.createElement('div');
    card.classList.add('task-card');
    card.innerHTML = `
      <h4>${task.title}</h4>
      <p>${task.dueDate}</p>
      <p>${task.duration} minutes</p>
      <p>#${task.tag.toLowerCase()}</p>
      ${
        task.completed
          ? '<p class="done-text">✔ Completed</p>'
          : `<button class="complete-btn" data-id="${task.id}">Mark as Completed</button>`
      }
    `;

    if (task.completed) {
      sections.Completed.appendChild(card);
    } else if (task.tag === 'Class') {
      sections.Class.appendChild(card);
    } else if (task.tag === 'Event') {
      sections.Event.appendChild(card);
    } else if (task.tag === 'Assignment') {
      sections.Assignment.appendChild(card);
    }
  });
}

function updateLocalStorage(id) {
  const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  const updated = allTasks.map(task => {
    if (task.id === id) task.completed = true;
    return task;
  });
  localStorage.setItem('tasks', JSON.stringify(updated));
}

document.addEventListener('click', e => {
  if (e.target.classList.contains('complete-btn')) {
    const taskId = e.target.dataset.id;
    updateLocalStorage(taskId);
    loadTasks().then(renderTasks);
  }
});

loadTasks().then(renderTasks);

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
