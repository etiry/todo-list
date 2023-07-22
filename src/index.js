import projects from './projects';
import todos from './todos';

// projects();
// todos();

projects.addProject('Test project');

console.log(projects.projectList);

// todos.addTodo('test', 'test description', new Date(), 'important', false);
// todos.addTodo('test2', 'another test description', new Date(), 'not important', false);

// console.log(projects.projectList);

// todos.deleteTodo(projects.getProjectIndex('Test project'), todos.getTaskIndex('test'));

// console.log(projects.projectList);

// todos.editTodo(projects.getProjectIndex('Test project'), todos.getTaskIndex('test2'), 'completed', true)

// // projects.editProject(projects.getProjectIndex('Test project'), 'title', 'New project');

// // projects.deleteProject(projects.getProjectIndex('Test project'));

// console.log(projects.projectList);