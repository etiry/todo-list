import projects from './projects';
import handlers from './handlers';

const dom = (() => {

  const contentDiv = document.getElementById('content');

  function renderProjects() {
    const addProjectButton = document.createElement('button');
    addProjectButton.setAttribute('class', 'add-project-button');
    const addProjectImage = document.createElement('img');
    addProjectImage.setAttribute('src', './img/add.svg');
    addProjectButton.appendChild(addProjectImage);

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



  return {
    renderProjects,
    renderTasks
  }

})();

export default dom;