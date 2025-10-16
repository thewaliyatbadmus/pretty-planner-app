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

const form = document.querySelector('form');
const messageBox = document.getElementById('message');

function showMessage(text, type = 'success') {
  messageBox.textContent = text;
  messageBox.className = `popup show ${type}`;
  setTimeout(() => {
    messageBox.classList.remove('show');
  }, 3000);
}



document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', () => menu.classList.remove('show'));
});


form.addEventListener('submit', e => {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const duration = parseInt(document.getElementById('duration').value);
  const dueDate = document.getElementById('dueDate').value;
  const tag = document.getElementById('tag').value.trim();

  if (!title || !duration || !dueDate || !tag) {
    showMessage('Please fill in all required fields.', 'error');
    return;
  }

  const newTask = {
    id: 'rec_' + Date.now(),
    title,
    duration,
    dueDate,
    tag,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  
  const existing = JSON.parse(localStorage.getItem('tasks') || '[]');
  existing.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(existing));

  showMessage('Task added successfully!', 'success');

 
  setTimeout(() => {
    window.location.href = 'tasks.html';
  }, 1200);
});
