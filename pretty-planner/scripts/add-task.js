const form = document.querySelector('form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const duration = parseInt(document.getElementById('duration').value);
  const dueDate = document.getElementById('dueDate').value;
  const tag = document.getElementById('tag').value.trim();

  const newTask = {
    id: 'rec_' + Date.now(),
    title,
    duration,
    dueDate,
    tag,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  alert('Task added successfully!');
  window.location.href = 'dashboard.html';
});

