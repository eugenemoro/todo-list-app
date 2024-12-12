export default class Todo {
  _title;
  _description;
  _dueDate;
  _priority;
  _notes;

  constructor(title, description, dueDate, priority, notes) {
    this._title = title;
    this._description = description;
    this._dueDate = dueDate;
    this._priority = priority;
    this._notes = notes;
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

  get dueDate() {
    return this._dueDate;
  }
  set dueDate(value) {
    this._dueDate = value;
  }

  get priority() {
    return this._priority;
  }
  set priority(value) {
    this._priority = value;
  }

  get notes() {
    return this._notes;
  }
  set notes(value) {
    this._notes = value;
  }
}