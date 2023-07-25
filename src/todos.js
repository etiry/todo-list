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
    const todo = new Todo(title, description, dueDate, priority, completed, selectedProjectIndex);
    (projects.projectList[selectedProjectIndex].todos).push(todo);
  }

  function getTaskIndex(titleInput) {
    const index = projects.projectList[projects.getProjectIndex('Test project')].todos.map(todo => todo.title).indexOf(titleInput);
    return index;
  }

  function deleteTodo(projectIndex, todoIndex) {
    (projects.projectList[projectIndex].todos).splice(todoIndex, 1);
  }

  function editTodo(projectIndex, todoIndex, prop, value) {
    projects.projectList[projectIndex].todos[todoIndex][prop] = value;
  }

  return {
    addTodo,
    deleteTodo,
    getTaskIndex,
    editTodo
  }
})();

export default todos;

