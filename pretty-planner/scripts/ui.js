export function createTaskCard(task) {
  const card = document.createElement("div");
  card.className = "task-card";
  card.innerHTML = `
    <h3>${task.title}</h3>
    <p class="task-info">Tag: ${task.tag}</p>
    <p class="task-info">Duration: ${task.duration} min</p>
    <p class="task-info">Due: ${task.dueDate}</p>
    <div class="task-actions">
      <button class="delete-btn" data-id="${task.id}">Delete</button>
    </div>
  `;
  return card;
}
