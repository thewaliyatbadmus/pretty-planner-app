const form = document.getElementById("taskForm");
const titleInput = document.getElementById("title");
const durationInput = document.getElementById("duration");
const dateInput = document.getElementById("dueDate");
const tagInput = document.getElementById("tag");

const patterns = {
  title: /^\S(?:.*\S)?$/,
  duration: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
  date: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
  tag: /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/,
  duplicateWord: /\b(\w+)\s+\1\b/i
};

function validateField(input, pattern, errorId, message) {
  const value = input.value.trim();
  const error = document.getElementById(errorId);

  if (!pattern.test(value)) {
    error.textContent = message;
    input.style.borderColor = "red";
    return false;
  } else {
    error.textContent = "";
    input.style.borderColor = "black";
    return true;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const validTitle = validateField(
    titleInput,
    patterns.title,
    "titleError",
    "Invalid title."
  );

  const validDuration = validateField(
    durationInput,
    patterns.duration,
    "durationError",
    "Enter a valid number."
  );

  const validDate = validateField(
    dateInput,
    patterns.date,
    "dateError",
    "Use YYYY-MM-DD format."
  );

  const validTag = validateField(
    tagInput,
    patterns.tag,
    "tagError",
    "Letters, spaces, or hyphens only."
  );

  const duplicateWords = patterns.duplicateWord.test(titleInput.value);
  if (duplicateWords) {
    document.getElementById("titleError").textContent = "Duplicate word found.";
    titleInput.style.borderColor = "red";
  }

  const allValid =
    validTitle && validDuration && validDate && validTag && !duplicateWords;

  if (allValid) {
    const newTask = {
      id: Date.now().toString(),
      title: titleInput.value.trim(),
      duration: Number(durationInput.value),
      dueDate: dateInput.value,
      tag: tagInput.value.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    saveTask(newTask);
    alert("Task added successfully!");
    form.reset();
  }
});

function saveTask(task) {
  const key = "prettyPlanner:data";
  const saved = JSON.parse(localStorage.getItem(key)) || [];
  saved.push(task);
  localStorage.setItem(key, JSON.stringify(saved));
}
