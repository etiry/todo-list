import projects from './projects';

const dom = (() => {

  const contentDiv = document.getElementById('content');

  function renderProjects() {
    const projectListDiv = document.createElement('div');

    projects.projectList.forEach(function (project) {
      const projectDiv = document.createElement('div');
      projectDiv.innerText = project.title;
      projectListDiv.appendChild(projectDiv);
    })

    contentDiv.appendChild(projectListDiv);
  }

  function renderTasks(projectIndex) {
    const taskListDiv = document.createElement('div');

    projects.projectList[projectIndex].tasks.forEach(function (task) {
      const taskDiv = document.createElement('div');
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