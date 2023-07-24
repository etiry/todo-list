import projects from './projects';
import handlers from './handlers';

const dom = (() => {

  const contentDiv = document.getElementById('content');

  function renderProjects() {
    contentDiv.innerHTML = '';
    
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

    contentDiv.appendChild(addProjectButton);
    contentDiv.appendChild(projectListDiv);

    const projectDivs = document.querySelectorAll('.project-name');
    projectDivs.forEach(function (project) {
      project.addEventListener('click', handlers.selectProject);
    })
  }

  function renderTasks(projectIndex) {
    const taskListDiv = document.createElement('div');

    projects.projectList[projectIndex].tasks.forEach(function (task) {
      const taskDiv = document.createElement('div');
      taskDiv.setAttribute('class', 'task-name');
      taskDiv.innerText = task.title;
      taskListDiv.appendChild(taskDiv);
    })

    contentDiv.appendChild(taskListDiv);
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

    const label = document.createTextNode('Project title:');
    addProjectTitleLabel.appendChild(label);

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



  return {
    renderProjects,
    renderTasks,
    renderAddProjectForm,
  }

})();

export default dom;