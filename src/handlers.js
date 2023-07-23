import dom from './dom';
import projects from './projects';

const handlers = (() => {

  function selectProject(e) {
    console.log(e);
    const selectedProject = e.target.innerText;
    dom.renderTasks(projects.getProjectIndex(selectedProject));
  }

  return {
    selectProject
  }

})();

export default handlers;