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
        <i class="fa-solid fa-xmark close-project-button"></i>
        <form id="form">
          <div class="form-item>
            <label for="title>Project title:</label>
            <input type="text" id="title" name="title" required>
          </div>
          <button class="submit-project-button">Submit</button>
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

    document.querySelector('.close-project-button').addEventListener('click', handlers.closeAddProjectForm);
    document.querySelector('.submit-project-button').addEventListener('click', (e) => {
      if (e.target.id === 'edit-project-submit-button') {
        handlers.submitProjectForm(e, projectIndex);
      } else {
        handlers.submitProjectForm(e);
      }
    })
  }

  function renderAddTodoForm(projectIndex, todoIndex) {
    const template = `
      <div id="add-todo-form">
        <i class="fa-solid fa-xmark close-todo-button"></i>
        <form id="form">
          <div class="form-item">
            <label for="title">Todo title:</label>
            <input type="text" id="title" name="title" required>
          </div>
          <div class="form-item">
            <label for="description">Todo description:</label>
            <textarea id="description" name="description"></textarea>
          </div>
          <div class="form-item">
            <label for="due-date">Todo due date:</label>
            <input type="date" id="due-date" name="due-date">
          </div>
          <div class="form-item">
            <label for="priority">Todo priority:</label>
            <select id="priority" name="priority">
              <option value="Not urgent">Not urgent</option>
              <option value="Normal">Normal</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
          <button class="submit-todo-button">Submit</button>
        </form>
      </div>`

    contentDiv.insertAdjacentHTML('beforeend', template);

    if (arguments.length === 2) {
      const todo = projects.projectList[projectIndex].todos[todoIndex];
      const addTodoTitleInput = document.querySelector("#title");
      const addTodoDescriptionInput = document.querySelector("#description");
      const addTodoDueDateInput = document.querySelector('#due-date');
      const addTodoPriorityInput = document.querySelector('#priority');
      const submitButton = document.querySelector('.submit-button');
      const addTodoFormDiv = document.querySelector('#add-todo-form');

      addTodoTitleInput.value = todo.title;
      addTodoDescriptionInput.value = todo.description;
      addTodoDueDateInput.value = todo.dueDate;
      addTodoPriorityInput.value = todo.priority;

      submitButton.setAttribute('id', 'edit-todo-submit-button');
      addTodoFormDiv.setAttribute('data-todo-index', todoIndex);
    }

    document.querySelector('.close-todo-button').addEventListener('click', handlers.closeAddTodoForm);
    document.querySelector('.submit-todo-button').addEventListener('click', handlers.submitTodoForm);
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