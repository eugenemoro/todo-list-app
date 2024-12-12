import Todo from "./todo.js";

export default function TodoHandler() {

  const createTodo = function(title, description, dueDate, priority, notes) {
    return new Todo(title, description, dueDate, priority, notes);
  }

  const updateTodo = function(todo, title, description, dueDate, priority, notes) {
    todo.title = title;
    todo.description = description;
    todo.dueDate = dueDate;
    todo.priority = priority;
    todo.notes = notes;
  }

  return {
    createTodo,
    updateTodo
  };
}