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
    const mainContainer = document.querySelector('.tasks-container');

    const noResultMsg = document.createElement('p');
    noResultMsg.textContent = 'No tasks match your search.';
    noResultMsg.style.display = 'none';
    noResultMsg.style.textAlign = 'center';
    noResultMsg.style.marginTop = '1rem';
    mainContainer.appendChild(noResultMsg);

    function renderTasks(list, tag) {
      list.innerHTML = '';
      data
        .filter(task => task.tag === tag)
        .forEach(task => {
          const card = document.createElement('div');
          card.classList.add('task-card');
          card.innerHTML = `
            <h4>${task.title}</h4>
            <p>${task.dueDate}</p>
            <p>${task.duration} minutes</p>
            <p>#${task.tag.toLowerCase()}</p>
          `;
          list.appendChild(card);
        });
    }

    renderTasks(classes, 'Class');
    renderTasks(events, 'Event');
    renderTasks(assignments, 'Assignment');

    searchInput.addEventListener('input', e => {
      const searchValue = e.target.value.toLowerCase();
      let matchCount = 0;

      document.querySelectorAll('.task-card').forEach(card => {
        if (card.textContent.toLowerCase().includes(searchValue)) {
          card.style.display = 'block';
          matchCount++;
        } else {
          card.style.display = 'none';
        }
      });

      noResultMsg.style.display = matchCount === 0 ? 'block' : 'none';
    });
  })
  .catch(err => console.error('Error loading tasks:', err));
