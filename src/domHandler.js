import ProjectHandler from "./projectHandler.js";

export default function DOMHandler(projectHandler) {
  const content = document.getElementById('content');

  const projectsPage = function() {
    content.innerHTML = '';
   
    addDomElement('h2', 'Projects', content);

    const btnSection = addDomElement('div', '', content);
    btnSection.className = 'buttons-section';

    addDomElement('button', 'New Project', btnSection, newProjectDialog);

    const projectList = projectHandler.getProjectList();

    const cards = addDomElement('div', '', content);
    cards.className = 'cards';

    for (let i = 0; i < projectList.length; i++) {
      addProjectCard(projectList[i], i, cards);
    }
  }

  const newProjectDialog = function(projectId, project) {
    const dialog = document.createElement('dialog');

    addDomElement('h2', project ? project.title : 'New Project', dialog);

    const newProjectTitle = addInputElementWithLabel('input', 'Title', dialog);
    
    const newProjectDescription = addInputElementWithLabel('input', 'Description', dialog);

    if (project) {
      newProjectTitle.value = project.title;
      newProjectDescription.value = project.description;
    }

    const btnSection = addDomElement('div', '', dialog);
    btnSection.className = 'buttons-section';

    const saveBtn = addDomElement(
      'button',
      'Save',
      btnSection,
      function() {
        if (newProjectTitle.value && newProjectDescription.value) {
          if (!project) {
            projectHandler.createProject(newProjectTitle.value, newProjectDescription.value);
          } else {
            projectHandler.updateProject(projectId, newProjectTitle.value, newProjectDescription.value);
          }
          dialog.close();
          projectsPage();
        }
      }
    );

    const closeBtn = addDomElement(
      'button',
      'Close',
      btnSection,
      function() {
        dialog.close();
        projectsPage();
      }
    );
    
    content.appendChild(dialog);

    dialog.showModal();
  }

  const todoPage = function(projectId) {
    content.innerHTML = '';
    const project = projectHandler.getProject(projectId);
    const todoList = projectHandler.getTodoList(projectId);
    
    addDomElement('h2', project.title, content);

    const btnSection = addDomElement('div','', content);
    btnSection.className = 'buttons-section';

    addDomElement(
      'button', 
      'Back to Projects', 
      btnSection, 
      function() {
        projectsPage();
      });
    
    addDomElement(
      'button', 
      'New Todo', 
      btnSection, 
      function() {
        newTodoDialog(projectId);
      });

    const cards = addDomElement('div', '', content);
    cards.className = 'cards';
    content.appendChild(cards);
    
    for (let i = 0; i < todoList.length; i++) {
      addTodoCard(todoList[i], i, projectId, cards);
    }
  }

  const newTodoDialog = function(projectId, todoId, todo) {
    const dialog = document.createElement('dialog');

    addDomElement('h1', todo ? todo.title : 'New Todo', dialog);

    const newTodoTitle = addInputElementWithLabel('input', 'Title', dialog);
    
    const newTodoDescription = addInputElementWithLabel('input', 'Description', dialog);

    const newTodoDueDate = addInputElementWithLabel('input', 'Due date', dialog);
    newTodoDueDate.setAttribute('type', 'date');

    const prioritySection = addDomElement('div', '', dialog);
    addDomElement('p', 'Priority: ', prioritySection);
    
    const checkedPriorityRadio = true;
    const normalPriorityRadio = addPriorityRadioElement('normal', prioritySection, checkedPriorityRadio);
    const mediumPriorityRadio = addPriorityRadioElement('medium', prioritySection);
    const highPriorityRadio = addPriorityRadioElement('high', prioritySection);

    if (todo) {
      newTodoTitle.value = todo.title;
      newTodoDescription.value = todo.description;
      newTodoDueDate.value = todo.dueDate;
      switch (todo.priority) {
        case 'normal': { 
          normalPriorityRadio.setAttribute('checked',true);
          break;
        }
        case 'medium': { 
          mediumPriorityRadio.setAttribute('checked', true);
          break;
        }
        case 'high': {
          highPriorityRadio.setAttribute('checked', true);
          break;
        }
      }
    }

    const btnSection = addDomElement('div', '', dialog);
    btnSection.className = 'buttons-section';

    const saveBtn = addDomElement(
      'button',
      'Save',
      btnSection,
      function() {
        if (newTodoTitle.value && newTodoDescription.value) {
          if (!todo) {
            projectHandler.addTodo(
              projectId,
              newTodoTitle.value,
              newTodoDescription.value,
              newTodoDueDate.value,
              (function() {
                if (normalPriorityRadio.checked) return 'normal';
                if (mediumPriorityRadio.checked) return 'medium';
                if (highPriorityRadio.checked) return 'high';
              })()
            );
          } else {
            projectHandler.updateTodo(
              projectId, 
              todoId,
              newTodoTitle.value,
              newTodoDescription.value,
              newTodoDueDate.value,
              (function() {
                if (normalPriorityRadio.checked) return 'normal';
                if (mediumPriorityRadio.checked) return 'medium';
                if (highPriorityRadio.checked) return 'high';
              })()
            );
          }
          dialog.close();
          todoPage(projectId);
        }
      }
    );

    const closeBtn = addDomElement(
      'button',
      'Close',
      btnSection,
      function() {
        dialog.close();
        todoPage(projectId);
      }
    );

    content.appendChild(dialog);

    dialog.showModal();
  }

  const addProjectCard = function(project, projectId, element) {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';

    addDomElement('h3', project.title, projectCard);

    addDomElement('p', project.description, projectCard);

    addDomElement('p', `${project.todoList.length} Todo Items`, projectCard);

    const btnSection = addDomElement('div', '', projectCard);
    btnSection.className = 'buttons-section';

    addDomElement(
      'button', 
      'Edit', 
      btnSection, 
      function() {
        newProjectDialog(projectId, project)
      });

    addDomElement(
      'button', 
      'Delete', 
      btnSection, 
      function() {
        if (confirm('Are you sure you want do delete project permanently?')) {
          projectHandler.deleteProject(projectId);
        }
        projectsPage();
      });

    projectCard.addEventListener('click', (e) => {
      if (!(e.target.matches('button'))) todoPage(projectId)
    });

    element.appendChild(projectCard);
  }

  const addTodoCard = function(todo, todoId, projectId, element) {
    const todoCard = document.createElement('div');
    todoCard.className = 'todo-card';

    addDomElement('h3', todo.title, todoCard);

    addDomElement('p', todo.description, todoCard);

    addDomElement('p', `Due date: ${todo.dueDate}`, todoCard);
    
    addDomElement('p', `Priority: ${todo.priority}`, todoCard);
    
    addDomElement('p', `Notes: ${todo.notes}`, todoCard);

    const btnSection = addDomElement('div', '', todoCard);
    btnSection.className = 'buttons-section';

    addDomElement(
      'button', 
      'Edit', 
      btnSection, 
      function() {
        newTodoDialog(projectId, todoId, todo);
      });

    addDomElement(
      'button', 
      `Delete`, 
      btnSection, 
      function() {
        if (confirm('Are you sure you want do delete todo item permanently?')) {
          projectHandler.deleteTodo(projectId, todoId);
        }
        todoPage(projectId);
      });
  
    element.appendChild(todoCard);
  }

  projectsPage();

  function addDomElement(element, text, parentElement, eventListenerFunction) {
    const newElement = document.createElement(element);
    newElement.innerText = text;
    if (eventListenerFunction) newElement.addEventListener('click', (e) => eventListenerFunction());
    parentElement.appendChild(newElement);
    return newElement;
  }

  function addInputElementWithLabel(element, text, parentElement) {
    const container = document.createElement('div');
    const label = addDomElement('label', `${text}: `, container);
    label.setAttribute('for', `input-${text}`);
    const newElement = addDomElement(element, '', container);
    newElement.setAttribute('id', `input-${text}`);
    parentElement.appendChild(container);
    return newElement;
  }

  const addPriorityRadioElement = function(text, section, checked) {
    const priorityRadio = addDomElement('input', '', section);
    priorityRadio.setAttribute('name', 'priority');
    priorityRadio.setAttribute('type', 'radio');
    priorityRadio.setAttribute('id', `${text}-priority`);
    if (checked) priorityRadio.setAttribute('checked', checked);
    priorityRadio.setAttribute('value', text);

    const labelForPriority = addDomElement('label', ' ' + text.charAt(0).toUpperCase() + text.slice(1), section);
    labelForPriority.setAttribute('for', `${text}-priority`);
    addDomElement('br', '', section);

    return priorityRadio;
  }
}