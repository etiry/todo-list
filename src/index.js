import projects from './projects';
import todos from './todos';
import dom from './dom';
import handlers from './handlers';

projects.addProject('Test project');

todos.addTodo('test', 'test description', new Date(), 'important', false);
todos.addTodo('test2', 'another test description', new Date(), 'not important', false);

dom.renderProjects();


// dom.renderTasks(projects.getProjectIndex('Test project'));

// console.log(projects.projectList);

// todos.deleteTodo(projects.getProjectIndex('Test project'), todos.getTaskIndex('test'));

// console.log(projects.projectList);

// todos.editTodo(projects.getProjectIndex('Test project'), todos.getTaskIndex('test2'), 'completed', true)

// // projects.editProject(projects.getProjectIndex('Test project'), 'title', 'New project');

// // projects.deleteProject(projects.getProjectIndex('Test project'));

// console.log(projects.projectList);