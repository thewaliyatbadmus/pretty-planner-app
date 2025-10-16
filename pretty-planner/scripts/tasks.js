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
      document.querySelectorAll('.task-card').forEach(card => {
        card.style.display = card.textContent.toLowerCase().includes(searchValue)
          ? 'block'
          : 'none';
      });
    });
  })
  .catch(err => console.error('Error loading tasks:', err));
