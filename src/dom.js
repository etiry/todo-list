import projects from './projects';
import handlers from './handlers';

const dom = (() => {

  const contentDiv = document.getElementById('content');

  function renderHeader() {
    const header = document.getElementById('header');
    header.innerHTML = `<h1>Todo List</h1>`;
  }

  function renderProjects() {
    // get projects from local storage if they exist
    if (!localStorage.getItem('projects')) {
      projects.addProject('Default project');
    } else {
      const projectsFromStorage = JSON.parse(localStorage.getItem('projects'));
      projects.projectList = projectsFromStorage;
    }

    const projectContainer = document.getElementById('projects');
    const projectListDiv = document.createElement('div');

    const addProjectTemplate = `
      <button class="add-project-button">
        <i class="fa-solid fa-plus"></i>
        <h2>Add new project</h2>
      </button>`;

    projects.projectList.forEach((project) => {
      const template = `
        <div class="project-name" data-project-index=${project.projectIndex}>
          ${project.title} <i class="fa-solid fa-pen-to-square edit-project"></i>
        </div>`;

      projectListDiv.insertAdjacentHTML('beforeend', template);
    })

    projectContainer.innerHTML = '';
    projectContainer.insertAdjacentHTML('beforeend', addProjectTemplate);
    projectContainer.insertAdjacentElement('beforeend', projectListDiv);

    addAddNewProjectEventListener();
    addSelectProjectEventListeners();
    addEditProjectEventListeners();
  }

  function renderTodos(projectIndex) {
    const todoContainer = document.getElementById('todos');
    const todoListDiv = document.createElement('div');

    const addTodoTemplate = `
    <button class="add-todo-button">
      <i class="fa-solid fa-plus"></i>
      <h2>Add new todo</h2>
    </button>`;

    projects.projectList[projectIndex].todos.forEach(function (todo) {
      const template = `
        <div class="todo-name" data-todo-index=${todo.index} data-project-index=${todo.projectIndex}>
          ${todo.title}
          <div class="icons">
            <i class="fa-regular fa-circle-check"></i> <i class="fa-solid fa-pen-to-square edit-todo"></i> <i class="fa-solid fa-trash"></i>
          </div>
        </div>`

      todoListDiv.insertAdjacentHTML('beforeend', template);
    })

    todoContainer.innerHTML = '';
    todoContainer.insertAdjacentHTML('beforeend', addTodoTemplate);
    todoContainer.insertAdjacentElement('beforeend', todoListDiv);

    addAddNewTodoEventListener();
    addToggleTodoDetailsEventListeners();
    addToggleCompleteTodoEventListeners();
    addDeleteTodoEventListeners();
    addEditTodoEventListeners();
  }

  function renderTodoDetails (todoDiv, projectIndex, todoIndex) {
    const todo = projects.projectList[projectIndex].todos[todoIndex];

    const detailsTemplate = `
      <div class="todo-details">
        <div class="todo-details-title"><span class="details-label">Title: </span>${todo.title}</div>
        <div class="todo-details-description"><span class="details-label">Description: </span>${todo.description}</div>
        <div class="todo-details-due-date"><span class="details-label">Due Date: </span>${todo.dueDate}</div>
        <div class="todo-details-priority"><span class="details-label">Priority: </span>${todo.priority}</div>
        <div class="todo-details-completed"><span class="details-label">Completed: </span>${todo.completed ? `Yes` : `No`}</div>
      </div>`

    todoDiv.insertAdjacentHTML('afterend', detailsTemplate);
  }

  function renderAddProjectForm(projectIndex) {
    const template = `
      <div id="add-project-form">
        <i class="fa-solid fa-xmark"></i>
        <form id="form">
          <div class="form-item>
            <label for="title>Project title:</label>
            <input type="text" id="title" name="title" required>
            <button class="submit-button">Submit</button>
          </div>
        </form>
      </div>`

    contentDiv.insertAdjacentHTML('beforeend', template);

    if (arguments.length === 1) {
      const project = projects.projectList[projectIndex];
      const addProjectTitleInput = document.querySelector('input[id=title]');
      const submitButton = document.querySelector('.submit-button');
      const addProjectFormDiv = document.querySelector('#add-project-form');

      addProjectTitleInput.value = project.title;
      submitButton.setAttribute('id', 'edit-project-submit-button');
      addProjectFormDiv.setAttribute('data-project-index', projectIndex);
    }

    document.querySelector('.submit-button').addEventListener('click', (e) => {
      if (e.target.id === 'edit-project-submit-button') {
        handlers.submitProjectForm(e, projectIndex);
      } else {
        handlers.submitProjectForm(e);
      }
    })
  }

  function renderAddTodoForm(projectIndex, todoIndex) {
    const addTodoFormDiv = document.createElement('div');
    addTodoFormDiv.setAttribute('id', 'add-todo-form');

    const closeButton = document.createElement('img');
    closeButton.setAttribute('src', './img/close-light.svg');
    closeButton.setAttribute('class', 'close-button');
    closeButton.addEventListener('click', handlers.closeAddTodoForm);

    const addTodoForm = document.createElement('form');
    addTodoForm.setAttribute('action', '#');
    addTodoForm.setAttribute('id', 'form');

    // title
    const addTodoTitle = document.createElement('div');
    addTodoTitle.setAttribute('class', 'form-item');

    const addTodoTitleLabel = document.createElement('label');
    addTodoTitleLabel.setAttribute('for', 'title');

    const todoTitleLabel = document.createTextNode('Todo title:');
    addTodoTitleLabel.appendChild(todoTitleLabel);

    const addTodoTitleInput = document.createElement('input');
    addTodoTitleInput.setAttribute('type', 'text');
    addTodoTitleInput.setAttribute('id', 'title');
    addTodoTitleInput.setAttribute('name', 'title');
    addTodoTitleInput.required = true;

    // description
    const addTodoDescription = document.createElement('div');
    addTodoDescription.setAttribute('class', 'form-item');

    const addTodoDescriptionLabel = document.createElement('label');
    addTodoDescriptionLabel.setAttribute('for', 'description');

    const todoDescriptionLabel = document.createTextNode('Todo description:');
    addTodoDescriptionLabel.appendChild(todoDescriptionLabel);

    const addTodoDescriptionInput = document.createElement('textarea');
    addTodoDescriptionInput.setAttribute('id', 'description');
    addTodoDescriptionInput.setAttribute('name', 'description');

    // due date
    const addTodoDueDate = document.createElement('div');
    addTodoDueDate.setAttribute('class', 'form-item');

    const addTodoDueDateLabel = document.createElement('label');
    addTodoDueDateLabel.setAttribute('for', 'due-date');

    const todoDueDateLabel = document.createTextNode('Todo due date:');
    addTodoDueDateLabel.appendChild(todoDueDateLabel);

    const addTodoDueDateInput = document.createElement('input');
    addTodoDueDateInput.setAttribute('type', 'date');
    addTodoDueDateInput.setAttribute('id', 'due-date');
    addTodoDueDateInput.setAttribute('name', 'due-date');

    // priority
    const addTodoPriority = document.createElement('div');
    addTodoPriority.setAttribute('class', 'form-item');

    const addTodoPriorityLabel = document.createElement('label');
    addTodoPriorityLabel.setAttribute('for', 'priority');

    const todoPriorityLabel = document.createTextNode('Todo priority:');
    addTodoPriorityLabel.appendChild(todoPriorityLabel);

    const addTodoPriorityInput = document.createElement('select');
    addTodoPriorityInput.setAttribute('id', 'priority');
    addTodoPriorityInput.setAttribute('name', 'priority');

    const options = ['Not urgent', 'Normal', 'Urgent'];
    options.forEach(function (option) {
      let opt = document.createElement('option');
      opt.setAttribute('value', option);
      let val = document.createTextNode(option);
      opt.appendChild(val);
      addTodoPriorityInput.appendChild(opt);
    })

    const submitButton = document.createElement('button');
    submitButton.setAttribute('class', 'submit-button');

    const submitText = document.createTextNode('Submit');
    submitButton.appendChild(submitText);

    submitButton.addEventListener('click', handlers.submitTodoForm);

    addTodoTitle.appendChild(addTodoTitleLabel);
    addTodoTitle.appendChild(addTodoTitleInput);

    addTodoDescription.appendChild(addTodoDescriptionLabel);
    addTodoDescription.appendChild(addTodoDescriptionInput);

    addTodoDueDate.appendChild(addTodoDueDateLabel);
    addTodoDueDate.appendChild(addTodoDueDateInput);

    addTodoPriority.appendChild(addTodoPriorityLabel);
    addTodoPriority.appendChild(addTodoPriorityInput);

    addTodoForm.appendChild(addTodoTitle);
    addTodoForm.appendChild(addTodoDescription);
    addTodoForm.appendChild(addTodoDueDate);
    addTodoForm.appendChild(addTodoPriority);
    addTodoForm.appendChild(submitButton);

    addTodoFormDiv.appendChild(closeButton);
    addTodoFormDiv.appendChild(addTodoForm);

    contentDiv.appendChild(addTodoFormDiv);

    if (arguments.length === 2) {
      const todo = projects.projectList[projectIndex].todos[todoIndex];
      addTodoTitleInput.value = todo.title;
      addTodoDescriptionInput.value = todo.description;
      addTodoDueDateInput.value = todo.dueDate;
      addTodoPriorityInput.value = todo.priority;

      submitButton.setAttribute('id', 'edit-todo-submit-button');
      addTodoFormDiv.setAttribute('data-todo-index', todoIndex);
    }
  }

  function addAddNewProjectEventListener () {
    document.querySelector('.add-project-button').addEventListener('click', handlers.openAddProjectForm);
  }

  function addAddNewTodoEventListener () {
    document.querySelector('.add-todo-button').addEventListener('click', handlers.openAddTodoForm);
  }

  function addSelectProjectEventListeners () {
    const projectDivs = document.querySelectorAll('.project-name');
    projectDivs.forEach((project) => project.addEventListener('click', handlers.selectProject));
  }

  function addToggleTodoDetailsEventListeners () {
    const todoDivs = document.querySelectorAll('.todo-name');

    todoDivs.forEach((todo) => todo.addEventListener('click', handlers.toggleTodoDetails));
  }

  function addDeleteTodoEventListeners () {
    const deleteIcons = document.querySelectorAll('.fa-trash');

    deleteIcons.forEach((icon) => icon.addEventListener('click', handlers.deleteTodo));
  }

  function addToggleCompleteTodoEventListeners () {
    const completedIcons = document.querySelectorAll('.fa-circle-check');

    completedIcons.forEach((icon) => icon.addEventListener('click', handlers.toggleComplete));
  }

  function addEditTodoEventListeners () {
    const editIcons = document.querySelectorAll('.fa-pen-to-square.edit-todo');

    editIcons.forEach((icon) => icon.addEventListener('click', handlers.openAddTodoForm));
  }

  function addEditProjectEventListeners () {
    const editIcons = document.querySelectorAll('.fa-pen-to-square.edit-project');

    editIcons.forEach((icon) => icon.addEventListener('click', handlers.openAddProjectForm));
  }

  return {
    contentDiv,
    renderHeader,
    renderProjects,
    renderTodos,
    renderTodoDetails,
    renderAddProjectForm,
    renderAddTodoForm
  }

})();

export default dom;