import Project from "./project.js";
import TodoHandler from "./todoHandler.js";
import DataProvider from "./dataProvider.js";

export default function ProjectHandler() {
  let projectList = [];
  const todoHandler = new TodoHandler();
  const dataProvider = new DataProvider();
  console.log(dataProvider);
  
  const reviveProjectList = function(data) {
    const projectList = [];
    for (let i = 0; i < data.length; i++) {
      const revivedTodoList = [];
      for (let j = 0; j < data[i]._todoList.length; j++) {
        const todo = data[i]._todoList[j];
        revivedTodoList.push(
          todoHandler.createTodo (
            todo._title,
            todo._description, 
            todo._dueDate, 
            todo._priority, 
            todo._notes
          )
        );
      }
      data[i]._todoList = revivedTodoList;
      const revivedProject = new Project(data[i]._title, data[i]._description);
      setTodoList(revivedProject, revivedTodoList);
      projectList.push(revivedProject);
    }
    return projectList;
  };

  const createProject = function(title, description){
    if (!projectList.find((el) => el.title === title)) {
      const newProject = new Project(title, description);
      projectList.push(newProject);
      saveData();
      return newProject;
    } else {
      return null;
    }
  };

  const updateProject = function(projectId, title, description){
    getProject(projectId).title = title;
    getProject(projectId).description = description; 
    saveData();
  };

  const deleteProject = function(projectId){
    projectList.splice(projectId, 1);
    saveData();
  };

  const addTodo = function(projectId, title, description, dueDate, priority, notes){
    const newTodo = todoHandler.createTodo(title, description, dueDate, priority, notes);
    getTodoList(projectId).push(newTodo);
    saveData();
  };

  const deleteTodo = function(projectId, todoId){
    getTodoList(projectId).splice(todoId, 1);
    saveData();
  };

  const updateTodo = function(projectId, todoId, title, description, dueDate, priority, notes) {
    const todoToUpdate = getTodo(projectId, todoId);
    todoHandler.updateTodo(todoToUpdate, title, description, dueDate, priority, notes);
    saveData();
  }
  
  const getProjectList = () => projectList;

  const setTodoList = (project, todoList) => project.todoList = todoList;

  const getTodoList = (projectId) => getProjectList()[projectId].todoList;

  const getProject = (projectId) => getProjectList()[projectId];

  const getTodo = (projectId, todoId) => getTodoList(projectId)[todoId];

  const saveData = () => dataProvider.saveData(projectList);

  const initialize = (function() {
    const data = dataProvider.loadData();
    if (data) {
      projectList = reviveProjectList(data);
    } else {
      createProject('Template Project #1', 'This is to show the appearance of projects');
      addTodo(0, 'Template Todo Project #1 Item #1', 'This is to show the appearance of todo items');
      addTodo(0, 'Template Todo Project #1 Item #2', 'This is to show the appearance of todo items');

      createProject('Template Project #2', 'This is to show the appearance of projects');
      addTodo(1, 'Template Todo Project #2 Item #1', 'This is to show the appearance of todo items');
      addTodo(1, 'Template Todo Project #2 Item #2', 'This is to show the appearance of todo items');
    } 
  })()

  return {
    createProject,
    updateProject,
    deleteProject,
    addTodo,
    deleteTodo,
    updateTodo,
    getProject,
    getProjectList,
    getTodoList,
    reviveProjectList
  }
};