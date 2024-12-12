export default class Project {
  _title;
  _description;
  _todoList;

  constructor(title, description) {
    this._title = title;
    this._description = description;
    this._todoList = [];
  }
  
  get title() {
    return this._title;
  }
  set title(value) {
    this._title = value;
  }

  get description() {
    return this._description;
  }
  set description(value) {
    this._description = value;
  }

  get todoList() {
    return this._todoList;
  }
  set todoList(value) {
    this._todoList = value;
  }
}