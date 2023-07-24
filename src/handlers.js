import dom from './dom';
import projects from './projects';
import todos from './todos';

const handlers = (() => {

  let selectedProjectIndex = 0;

  function selectProject(e) {
    selectedProjectIndex = projects.getProjectIndex(e.target.innerText);
    dom.renderTasks(selectedProjectIndex);
  }

  function addNewProject(e) {
    e.preventDefault();

    const title = document.querySelector('input[id=title]');

    projects.addProject(title.value);

    closeAddProjectForm();
    dom.renderProjects();
  }

  function addNewTask(e) {
    e.preventDefault();

    const title = document.querySelector('input[id=title]');
    const description = document.querySelector('textarea[id=description]');
    const dueDate = document.querySelector('input[id=due-date]');
    const priority = document.querySelector('select[id=priority]');

    todos.addTodo(title.value, description.value, dueDate.value, priority.value, false, selectedProjectIndex);

    closeAddTaskForm();
    dom.renderTasks(selectedProjectIndex); 
  }

  function openAddProjectForm() {
    dom.renderAddProjectForm();
  }

  function closeAddProjectForm() {
    document.querySelector('#add-project-form').style.display = 'none';
  }

  function openAddTaskForm() {
    dom.renderAddTaskForm();
  }

  function closeAddTaskForm() {
    document.querySelector('#add-task-form').style.display = 'none';
  }

  return {
    selectProject,
    addNewProject,
    addNewTask,
    openAddProjectForm,
    closeAddProjectForm,
    openAddTaskForm,
    closeAddTaskForm
  }

})();

export default handlers;