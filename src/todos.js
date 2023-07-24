import projects from './projects';

const todos = (() => {

  class Todo {
    constructor(title, description, dueDate, priority, completed) {
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
      this.completed = completed;
    }
  }

  function addTodo(title, description, dueDate, priority, completed, selectedProjectIndex) {
    const task = new Todo(title, description, dueDate, priority, completed, selectedProjectIndex);
    (projects.projectList[selectedProjectIndex].tasks).push(task);
  }

  function getTaskIndex(titleInput) {
    const index = projects.projectList[projects.getProjectIndex('Test project')].tasks.map(task => task.title).indexOf(titleInput);
    return index;
  }

  function deleteTodo(projectIndex, taskIndex) {
    (projects.projectList[projectIndex].tasks).splice(taskIndex, 1);
  }

  function editTodo(projectIndex, taskIndex, prop, value) {
    projects.projectList[projectIndex].tasks[taskIndex][prop] = value;
  }

  return {
    addTodo,
    deleteTodo,
    getTaskIndex,
    editTodo
  }
})();

export default todos;

