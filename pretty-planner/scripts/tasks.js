import { loadData } from "./storage.js";

const categories = document.querySelectorAll(".categories li");
const taskContainer = document.getElementById("taskContainer");
const taskTitle = document.getElementById("taskTitle");
const addTaskBtn = document.getElementById("addTaskBtn");

addTaskBtn.addEventListener("click", () => {
  window.location.href = "add-task.html";
});

let tasks = [];

function renderTasks(filteredTasks, title) {
  taskTitle.textContent = title;
  taskContainer.innerHTML = "";

  if (filteredTasks.length === 0) {
    taskContainer.innerHTML = `<p style="text-align:center; color:#777;">No tasks found.</p>`;
    return;
  }

  const grid = document.createElement("div");
  grid.classList.add("task-grid");

  filteredTasks.forEach((task) => {
    const card = document.createElement("div");
    card.classList.add("task-card");
    card.innerHTML = `
      <h4>${task.title}</h4>
      <p>${task.tag} — Due: ${task.dueDate}</p>
    `;
    grid.appendChild(card);
  });

  taskContainer.appendChild(grid);
}

function getTodayDate() {
  const today = new Date();
  return today.toISOString().split("T")[0];
}

function getTomorrowDate() {
  const t = new Date();
  t.setDate(t.getDate() + 1);
  return t.toISOString().split("T")[0];
}

function filterByCategory(cat) {
  const today = getTodayDate();
  const tomorrow = getTomorrowDate();

  switch (cat) {
    case "All Tasks":
      return tasks;
    case "Today":
      return tasks.filter((t) => t.dueDate === today);
    case "Tomorrow":
      return tasks.filter((t) => t.dueDate === tomorrow);
    case "This Week":
      return tasks.filter((t) => {
        const now = new Date();
        const due = new Date(t.dueDate);
        const diff = (due - now) / (1000 * 60 * 60 * 24);
        return diff >= 0 && diff <= 7;
      });
    case "Classes":
      return tasks.filter((t) => t.tag.toLowerCase() === "class");
    case "Events":
      return tasks.filter((t) => t.tag.toLowerCase() === "event");
    case "Assignments":
      return tasks.filter((t) => t.tag.toLowerCase() === "assignment");
    case "Completed":
      return tasks.filter((t) => t.completed);
    case "Trash":
      return []; // placeholder
    case "Summary":
      return tasks;
    default:
      return tasks;
  }
}

async function init() {
  tasks = await loadData();
  renderTasks(tasks, "All Tasks");

  categories.forEach((li) => {
    li.addEventListener("click", () => {
      categories.forEach((c) => c.classList.remove("active"));
      li.classList.add("active");

      const selected = li.textContent.trim();
      const filtered = filterByCategory(selected);
      renderTasks(filtered, selected);
    });
  });
}

init();
