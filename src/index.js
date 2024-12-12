import "./styles.css";
import ProjectHandler from "./projectHandler.js";
import DOMHandler from "./domHandler.js";

const projectHandler = new ProjectHandler();

// const dataProvider = new DataProvider();
// projectHandler.createProject('Project1', 'Descr1');
// projectHandler.createProject('Project2', 'Descr2');
// projectHandler.createProject('Project3', 'Descr3');
// projectHandler.updateProject(0, 'newProject1', 'newDescr1');
// projectHandler.deleteProject(1);
// console.log(projectHandler.getProjectList());
// projectHandler.addTodo(0, 'todo1');
// projectHandler.updateTodo(0, 0, 'todo1upd', 'tratata');

// dataProvider.saveData(projectHandler.getProjectList());
// console.log(dataProvider.loadData());
// console.log(projectHandler.reviveProjectList(dataProvider.loadData()));

// console.log(projectHandler.getProjectList());
projectHandler.createProject('Project1', 'Descr1');
projectHandler.createProject('Project2', 'Descr2');
new DOMHandler(projectHandler);
