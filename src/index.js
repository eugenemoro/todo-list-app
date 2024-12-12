import "./styles.css";
import ProjectHandler from "./projectHandler.js";
import DOMHandler from "./domHandler.js";
import DataProvider from "./dataProvider.js";

const projectHandler = new ProjectHandler();

new DOMHandler(projectHandler);
