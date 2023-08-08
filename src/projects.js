const projects = (() => {

  class Project {
    constructor(title) {
      this.title = title;
      this.todos = [];
      this.projectIndex = null;
    }
  }

  let projectList = [];

  function addProject(title) {
    const project = new Project(title);
    projectList.push(project);
    project.projectIndex = projectList.indexOf(project);
  }

  function getProjectIndex(titleInput) {
    const index = projectList.map(project => project.title).indexOf(titleInput);
    return index;
  }

  function deleteProject(projectIndex) {
    projectList.splice(projectIndex, 1);
  }

  function editProject(newTitle, projectIndex) {
    const project = projectList[projectIndex];
    project.title = newTitle;
  }

  return {
    projectList,
    addProject,
    getProjectIndex,
    deleteProject,
    editProject
  }

})();

projects.addProject('Default project');

export default projects;