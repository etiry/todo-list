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
      projectDiv.innerText = project.title;
      projectListDiv.appendChild(projectDiv);
    })

    projectContainer.appendChild(addProjectButton);
    projectContainer.appendChild(projectListDiv);

    const projectDivs = document.querySelectorAll('.project-name');
    projectDivs.forEach(function (project) {
      project.addEventListener('click', handlers.selectProject);
    })
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
      iconsDiv.innerHTML = '<i class="fa-regular fa-circle-check"></i> <i class="fa-solid fa-pen-to-square"></i> <i class="fa-solid fa-trash"></i>';

      todoDiv.appendChild(iconsDiv);
      todoListDiv.appendChild(todoDiv);

    })

    todoContainer.appendChild(addTodoButton);
    todoContainer.appendChild(todoListDiv);

    addDeleteTodoEventListeners();
    addToggleCompleteTodoEventListeners();
    addEditTodoEventListeners();
  }

  function renderAddProjectForm() {
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

    submitButton.addEventListener('click', handlers.addNewProject);

    addProjectTitle.appendChild(addProjectTitleLabel);
    addProjectTitle.appendChild(addProjectTitleInput);

    addProjectForm.appendChild(addProjectTitle);
    addProjectForm.appendChild(submitButton);

    addProjectFormDiv.appendChild(closeButton);
    addProjectFormDiv.appendChild(addProjectForm);

    contentDiv.appendChild(addProjectFormDiv);
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

  function addDeleteTodoEventListeners () {
    const deleteIcons = document.querySelectorAll('.fa-trash');

    deleteIcons.forEach((icon) => icon.addEventListener('click', handlers.deleteTodo));
  }

  function addToggleCompleteTodoEventListeners () {
    const completedIcons = document.querySelectorAll('.fa-circle-check');

    completedIcons.forEach((icon) => icon.addEventListener('click', handlers.toggleComplete));
  }

  function addEditTodoEventListeners () {
    const editIcons = document.querySelectorAll('.fa-pen-to-square');

    editIcons.forEach((icon) => icon.addEventListener('click', handlers.openAddTodoForm));
  }

  return {
    contentDiv,
    renderHeader,
    renderProjects,
    renderTodos,
    renderAddProjectForm,
    renderAddTodoForm
  }

})();

export default dom;