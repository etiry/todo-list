import dom from './dom';
import projects from './projects';

const handlers = (() => {

  function selectProject(e) {
    const selectedProject = e.target.innerText;
    dom.renderTasks(projects.getProjectIndex(selectedProject));
  }

  function addNewProject(e) {
    e.preventDefault();

    const title = document.querySelector('input[id=title]');

    projects.addProject(title.value);

    closeAddProjectForm();
    dom.renderProjects();
  }

  function openAddProjectForm() {
    dom.renderAddProjectForm();
  }

  function closeAddProjectForm() {
    document.querySelector('#add-project-form').style.display = 'none';
  }

  return {
    selectProject,
    addNewProject,
    openAddProjectForm,
    closeAddProjectForm
  }

})();

export default handlers;