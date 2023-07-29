import projects from './projects';
import todos from './todos';
import dom from './dom';

projects.addProject('Test project');

todos.addTodo('test', 'test description', new Date(), 'important', false, 1);
todos.addTodo('test2', 'another test description', new Date(), 'not important', false, 1);

dom.renderHeader();
dom.renderProjects();
