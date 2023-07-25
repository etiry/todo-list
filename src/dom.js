import projects from './projects';
import handlers from './handlers';

const dom = (() => {

  const contentDiv = document.getElementById('content');

  function renderProjects() {
    const projectContainer = document.getElementById('projects');

    projectContainer.innerHTML = '';
    
    const addProjectButton = document.createElement('button');
    addProjectButton.setAttribute('class', 'add-project-button');
    const addProjectImage = document.createElement('img');
    addProjectImage.setAttribute('src', './img/add.svg');
    addProjectButton.appendChild(addProjectImage);
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

  function renderTasks(projectIndex) {
    const todoContainer = document.getElementById('todos');

    todoContainer.innerHTML = '';
    
    const addTaskButton = document.createElement('button');
    addTaskButton.setAttribute('class', 'add-task-button');
    const addTaskImage = document.createElement('img');
    addTaskImage.setAttribute('src', './img/add.svg');
    addTaskButton.appendChild(addTaskImage);
    addTaskButton.addEventListener('click', handlers.openAddTaskForm);

    const taskListDiv = document.createElement('div');

    projects.projectList[projectIndex].tasks.forEach(function (task) {
      const taskDiv = document.createElement('div');
      taskDiv.setAttribute('class', 'task-name');
      taskDiv.innerText = task.title;
      taskListDiv.appendChild(taskDiv);
    })

    todoContainer.appendChild(addTaskButton);
    todoContainer.appendChild(taskListDiv);
  }

  function renderAddProjectForm() {
    const addProjectFormDiv = document.createElement('div');
    addProjectFormDiv.setAttribute('id', 'add-project-form');

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

    const submitButton = document.createElement('button');
    submitButton.setAttribute('id', 'submit-new-project-form');

    const submitText = document.createTextNode('Submit');
    submitButton.appendChild(submitText);

    submitButton.addEventListener('click', handlers.addNewProject);

    addProjectTitle.appendChild(addProjectTitleLabel);
    addProjectTitle.appendChild(addProjectTitleInput);

    addProjectForm.appendChild(addProjectTitle);
    addProjectForm.appendChild(submitButton);

    addProjectFormDiv.appendChild(addProjectForm);

    contentDiv.appendChild(addProjectFormDiv);
  }

  function renderAddTaskForm() {
    const addTaskFormDiv = document.createElement('div');
    addTaskFormDiv.setAttribute('id', 'add-task-form');

    const addTaskForm = document.createElement('form');
    addTaskForm.setAttribute('action', '#');
    addTaskForm.setAttribute('id', 'form');

    // title
    const addTaskTitle = document.createElement('div');
    addTaskTitle.setAttribute('class', 'form-item');

    const addTaskTitleLabel = document.createElement('label');
    addTaskTitleLabel.setAttribute('for', 'title');

    const taskTitleLabel = document.createTextNode('Task title:');
    addTaskTitleLabel.appendChild(taskTitleLabel);

    const addTaskTitleInput = document.createElement('input');
    addTaskTitleInput.setAttribute('type', 'text');
    addTaskTitleInput.setAttribute('id', 'title');
    addTaskTitleInput.setAttribute('name', 'title');

    // description
    const addTaskDescription = document.createElement('div');
    addTaskDescription.setAttribute('class', 'form-item');

    const addTaskDescriptionLabel = document.createElement('label');
    addTaskDescriptionLabel.setAttribute('for', 'description');

    const taskDescriptionLabel = document.createTextNode('Task description:');
    addTaskDescriptionLabel.appendChild(taskDescriptionLabel);

    const addTaskDescriptionInput = document.createElement('textarea');
    addTaskDescriptionInput.setAttribute('id', 'description');
    addTaskDescriptionInput.setAttribute('name', 'description');

    // due date
    const addTaskDueDate = document.createElement('div');
    addTaskDueDate.setAttribute('class', 'form-item');

    const addTaskDueDateLabel = document.createElement('label');
    addTaskDueDateLabel.setAttribute('for', 'due-date');

    const taskDueDateLabel = document.createTextNode('Task due date:');
    addTaskDueDateLabel.appendChild(taskDueDateLabel);

    const addTaskDueDateInput = document.createElement('input');
    addTaskDueDateInput.setAttribute('type', 'date');
    addTaskDueDateInput.setAttribute('id', 'due-date');
    addTaskDueDateInput.setAttribute('name', 'due-date');

    // priority
    const addTaskPriority = document.createElement('div');
    addTaskPriority.setAttribute('class', 'form-item');

    const addTaskPriorityLabel = document.createElement('label');
    addTaskPriorityLabel.setAttribute('for', 'priority');

    const taskPriorityLabel = document.createTextNode('Task priority:');
    addTaskPriorityLabel.appendChild(taskPriorityLabel);

    const addTaskPriorityInput = document.createElement('select');
    addTaskPriorityInput.setAttribute('id', 'priority');
    addTaskPriorityInput.setAttribute('name', 'priority');

    const options = ['Not urgent', 'Normal', 'Urgent'];
    options.forEach(function (option) {
      let opt = document.createElement('option');
      opt.setAttribute('value', option);
      let val = document.createTextNode(option);
      opt.appendChild(val);
      addTaskPriorityInput.appendChild(opt);
    })

    const submitButton = document.createElement('button');
    submitButton.setAttribute('id', 'submit-new-task-form');

    const submitText = document.createTextNode('Submit');
    submitButton.appendChild(submitText);

    submitButton.addEventListener('click', handlers.addNewTask);

    addTaskTitle.appendChild(addTaskTitleLabel);
    addTaskTitle.appendChild(addTaskTitleInput);

    addTaskDescription.appendChild(addTaskDescriptionLabel);
    addTaskDescription.appendChild(addTaskDescriptionInput);

    addTaskDueDate.appendChild(addTaskDueDateLabel);
    addTaskDueDate.appendChild(addTaskDueDateInput);

    addTaskPriority.appendChild(addTaskPriorityLabel);
    addTaskPriority.appendChild(addTaskPriorityInput);

    addTaskForm.appendChild(addTaskTitle);
    addTaskForm.appendChild(addTaskDescription);
    addTaskForm.appendChild(addTaskDueDate);
    addTaskForm.appendChild(addTaskPriority);
    addTaskForm.appendChild(submitButton);

    addTaskFormDiv.appendChild(addTaskForm);

    contentDiv.appendChild(addTaskFormDiv);
  }

  return {
    renderProjects,
    renderTasks,
    renderAddProjectForm,
    renderAddTaskForm
  }

})();

export default dom;