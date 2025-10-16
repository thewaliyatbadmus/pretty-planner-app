const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const searchInput = document.getElementById('taskSearch');

menuBtn.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});

async function loadTasks() {
  const seedData = await fetch('seed.json').then(res => res.json());
  const localData = JSON.parse(localStorage.getItem('tasks') || '[]');

  // Merge only once and preserve completion state
  const merged = [...seedData];
  localData.forEach(task => {
    const existing = merged.find(t => t.id === task.id);
    if (existing) Object.assign(existing, task);
    else merged.push(task);
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

function markAsCompleted(taskId) {
  let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

  // If the task is from seed data, pull it into localStorage
  const all = tasks.length ? tasks : [];

  // Find task in combined data
  loadTasks().then(allTasks => {
    const taskToUpdate = allTasks.find(t => t.id === taskId);
    if (taskToUpdate) {
      taskToUpdate.completed = true;

      // Remove duplicates before saving
      const updated = allTasks.filter(
        (v, i, a) => a.findIndex(t => t.id === v.id) === i
      );

      localStorage.setItem('tasks', JSON.stringify(updated));
      renderTasks(updated);
    }
  });
}

// Handle completion button clicks
document.addEventListener('click', e => {
  if (e.target.classList.contains('complete-btn')) {
    const id = e.target.dataset.id;
    markAsCompleted(id);
  }
});

loadTasks().then(renderTasks);

// Search function
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
