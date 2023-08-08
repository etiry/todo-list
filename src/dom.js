import projects from './projects';
import todos from './todos';
import handlers from './handlers';

const dom = (() => {

  const contentDiv = document.getElementById('content');

  function renderHeader() {
    const header = document.getElementById('header');

    const headerTitle = document.createElement('h1');
    headerTitle.innerText = 'Todo List';

    header.appendChild(headerTitle);
  }

  function renderProjects() {
    const projectContainer = document.getElementById('projects');

    projectContainer.innerHTML = '';
    
    const addProjectButton = document.createElement('button');
    addProjectButton.setAttribute('class', 'add-project-button');
    const addProjectImage = document.createElement('img');
    addProjectImage.setAttribute('src', './img/add-light.svg');
    const addProjectText = document.createElement('h2');
    addProjectText.innerText = 'Add new project';
    addProjectButton.appendChild(addProjectImage);
    addProjectButton.appendChild(addProjectText);
    addProjectButton.addEventListener('click', handlers.openAddProjectForm);

    const projectListDiv = document.createElement('div');

    projects.projectList.forEach(function (project) {
      const projectDiv = document.createElement('div');
      projectDiv.setAttribute('class', 'project-name');
      projectDiv.setAttribute('data-project-index', project.projectIndex);
      projectDiv.innerHTML = `${project.title} <i class="fa-solid fa-pen-to-square edit-project"></i>`;
      projectListDiv.appendChild(projectDiv);
    })

    projectContainer.appendChild(addProjectButton);
    projectContainer.appendChild(projectListDiv);

    const projectDivs = document.querySelectorAll('.project-name');
    projectDivs.forEach(function (project) {
      project.addEventListener('click', handlers.selectProject);
    })

    addEditProjectEventListeners();
  }

  function renderTodos(projectIndex) {
    const todoContainer = document.getElementById('todos');

    todoContainer.innerHTML = '';
    
    const addTodoButton = document.createElement('button');
    addTodoButton.setAttribute('class', 'add-todo-button');
    const addTodoImage = document.createElement('img');
    addTodoImage.setAttribute('src', './img/add.svg');
    const addTodoText = document.createElement('h2');
    addTodoText.innerText = 'Add new todo';
    addTodoButton.appendChild(addTodoImage);
    addTodoButton.appendChild(addTodoText);
    addTodoButton.addEventListener('click', handlers.openAddTodoForm);

    const todoListDiv = document.createElement('div');

    projects.projectList[projectIndex].todos.forEach(function (todo) {
      const todoDiv = document.createElement('div');
      todoDiv.setAttribute('class', 'todo-name');
      todoDiv.setAttribute('data-todo-index', todo.index);
      todoDiv.setAttribute('data-project-index', todo.projectIndex);
      todoDiv.innerText = todo.title;

      const iconsDiv = document.createElement('div');
      iconsDiv.setAttribute('class', 'icons');
      iconsDiv.innerHTML = '<i class="fa-regular fa-circle-check"></i> <i class="fa-solid fa-pen-to-square edit-todo"></i> <i class="fa-solid fa-trash"></i>';

      todoDiv.appendChild(iconsDiv);
      todoListDiv.appendChild(todoDiv);

    })

    todoContainer.appendChild(addTodoButton);
    todoContainer.appendChild(todoListDiv);

    addToggleTodoDetailsEventListeners();
    addDeleteTodoEventListeners();
    addToggleCompleteTodoEventListeners();
    addEditTodoEventListeners();
  }

  function renderTodoDetails (todoDiv, projectIndex, todoIndex) {
    const todo = projects.projectList[projectIndex].todos[todoIndex];

    const detailsTemplate = `<div class="todo-details"><div class="todo-details-title"><span class="details-label">Title: </span>${todo.title}</div><div class="todo-details-description"><span class="details-label">Description: </span>${todo.description}</div><div class="todo-details-due-date"><span class="details-label">Due Date: </span>${todo.dueDate}</div><div class="todo-details-priority"><span class="details-label">Priority: </span>${todo.priority}</div><div class="todo-details-completed"><span class="details-label">Completed: </span>${todo.completed ? `Yes` : `No`}</div>`

    todoDiv.insertAdjacentHTML('afterend', detailsTemplate);
  }

  function renderAddProjectForm(projectIndex) {
    const addProjectFormDiv = document.createElement('div');
    addProjectFormDiv.setAttribute('id', 'add-project-form');

    const closeButton = document.createElement('img');
    closeButton.setAttribute('src', './img/close-light.svg');
    closeButton.setAttribute('class', 'close-button');
    closeButton.addEventListener('click', handlers.closeAddProjectForm);

    const addProjectForm = document.createElement('form');
    addProjectForm.setAttribute('action', '#');
    addProjectForm.setAttribute('id', 'form');

    const addProjectTitle = document.createElement('div');
    addProjectTitle.setAttribute('class', 'form-item');

    const addProjectTitleLabel = document.createElement('label');
    addProjectTitleLabel.setAttribute('for', 'title');

    const projectTitleLabel = document.createTextNode('Project title:');
    addProjectTitleLabel.appendChild(projectTitleLabel);

    const addProjectTitleInput = document.createElement('input');
    addProjectTitleInput.setAttribute('type', 'text');
    addProjectTitleInput.setAttribute('id', 'title');
    addProjectTitleInput.setAttribute('name', 'title');
    addProjectTitleInput.required = true;

    const submitButton = document.createElement('button');
    submitButton.setAttribute('class', 'submit-button');

    const submitText = document.createTextNode('Submit');
    submitButton.appendChild(submitText);

    addProjectTitle.appendChild(addProjectTitleLabel);
    addProjectTitle.appendChild(addProjectTitleInput);

    addProjectForm.appendChild(addProjectTitle);
    addProjectForm.appendChild(submitButton);

    addProjectFormDiv.appendChild(closeButton);
    addProjectFormDiv.appendChild(addProjectForm);

    contentDiv.appendChild(addProjectFormDiv);

    if (arguments.length === 1) {
      const project = projects.projectList[projectIndex];
      addProjectTitleInput.value = project.title

      submitButton.setAttribute('id', 'edit-project-submit-button');
      addProjectFormDiv.setAttribute('data-project-index', projectIndex);
    }

    submitButton.addEventListener('click', function (e) {
      if (e.target.id === 'edit-project-submit-button') {
        handlers.submitProjectForm(e, projectIndex);
      } else {
        handlers.submitProjectForm(e);
      }
      
    });
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