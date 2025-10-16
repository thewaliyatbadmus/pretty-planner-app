const form = document.querySelector('form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const duration = parseInt(document.getElementById('duration').value);
  const dueDate = document.getElementById('dueDate').value;
  const tag = document.getElementById('tag').value.trim();

  if (!title || !duration || !dueDate || !tag) {
    alert('Please fill in all fields.');
    return;
  }

  const newTask = {
    id: 'rec_' + Date.now(),
    title,
    duration,
    dueDate,
    tag,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };


  const existing = JSON.parse(localStorage.getItem('tasks') || '[]');
  existing.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(existing));

  alert('Task added successfully!');
  window.location.href = 'dashboard.html';
});
