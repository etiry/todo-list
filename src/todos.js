import projects from './projects';
import { format } from 'date-fns';

const todos = (() => {

  class Todo {
    constructor(title, description, dueDate, priority, completed, projectIndex) {
      this.title = title;
      this.description = description;
      this.dueDate = format(new Date(dueDate), 'yyyy-MM-dd');
      this.priority = priority;
      this.completed = completed;
      this.projectIndex = projectIndex;
      this.todoIndex = null;
    }
  }

  function addTodo(title, description, dueDate, priority, completed, projectIndex) {
    const todo = new Todo(title, description, dueDate, priority, completed, projectIndex);
    (projects.projectList[projectIndex].todos).push(todo);
    todo.index = projects.projectList[projectIndex].todos.indexOf(todo);
  }

  function getTodoIndex(titleInput) {
    const index = projects.projectList[projects.getProjectIndex('Test project')].todos.map(todo => todo.title).indexOf(titleInput);
    return index;
  }

  function deleteTodo(projectIndex, todoIndex) {
    const todoList = projects.projectList[projectIndex].todos;

    todoList.splice(todoIndex, 1);

    todoList.forEach((todo) => todo.index = todoList.indexOf(todo))
  }

  function toggleComplete(projectIndex, todoIndex) {
    projects.projectList[projectIndex].todos[todoIndex].completed = !projects.projectList[projectIndex].todos[todoIndex].completed
  }

  function editTodo(title, description, dueDate, priority, projectIndex, todoIndex) {
    const todo = projects.projectList[projectIndex].todos[todoIndex];
    todo.title = title;
    todo.description = description;
    todo.dueDate = dueDate;
    todo.priority = priority;
  }

  return {
    addTodo,
    deleteTodo,
    toggleComplete,
    getTodoIndex,
    editTodo
  }
})();

export default todos;

