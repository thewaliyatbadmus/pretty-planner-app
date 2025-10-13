const taskList = document.getElementById("taskList");
const searchBox = document.getElementById("searchBox");

function loadTasks() {
  const data = JSON.parse(localStorage.getItem("prettyPlanner:data")) || [];
  displayTasks(data);
}

function displayTasks(tasks) {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    taskList.innerHTML = "<p>No tasks available.</p>";
    return;
  }

  tasks.forEach((t) => {
    const card = document.createElement("div");
    card.className = "task-card";

    card.innerHTML = `
      <h3>${t.title}</h3>
      <p class="task-info">Tag: ${t.tag}</p>
      <p class="task-info">Duration: ${t.duration} min</p>
      <p class="task-info">Due: ${t.dueDate}</p>
      <div class="task-actions">
        <button class="delete-btn" data-id="${t.id}">Delete</button>
      </div>
    `;

    taskList.appendChild(card);
  });
}

function deleteTask(id) {
  const data = JSON.parse(localStorage.getItem("prettyPlanner:data")) || [];
  const updated = data.filter((t) => t.id !== id);
  localStorage.setItem("prettyPlanner:data", JSON.stringify(updated));
  loadTasks();
}

taskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.getAttribute("data-id");
    deleteTask(id);
  }
});

searchBox.addEventListener("input", () => {
  const data = JSON.parse(localStorage.getItem("prettyPlanner:data")) || [];
  const query = searchBox.value.toLowerCase();
  const filtered = data.filter(
    (t) =>
      t.title.toLowerCase().includes(query) ||
      t.tag.toLowerCase().includes(query)
  );
  displayTasks(filtered);
});

loadTasks();

