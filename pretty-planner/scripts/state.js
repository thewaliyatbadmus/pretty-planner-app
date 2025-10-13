import { loadData, saveData } from "./storage.js";

let state = loadData();

export function getState() {
  return state;
}

export function addTask(task) {
  state.push(task);
  saveData(state);
}

export function deleteTask(id) {
  state = state.filter((t) => t.id !== id);
  saveData(state);
}
