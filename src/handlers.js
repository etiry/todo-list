import dom from './dom';
import projects from './projects';
import todos from './todos';

const handlers = (() => {

  let selectedProjectIndex = 0;

  function selectProject(e) {
    selectedProjectIndex = projects.getProjectIndex(e.target.innerText);
    dom.renderTodos(selectedProjectIndex);
  }

  function addNewProject(e) {
    e.preventDefault();

    const title = document.querySelector('input[id=title]');

    if (title.reportValidity()) {
      projects.addProject(title.value);
      closeAddProjectForm();
      dom.renderProjects();
    }
  }

  function submitTodoForm(e) {
    e.preventDefault();

    const title = document.querySelector('input[id=title]');
    const description = document.querySelector('textarea[id=description]');
    const dueDate = document.querySelector('input[id=due-date]');
    const priority = document.querySelector('select[id=priority]');

    if (title.reportValidity()) {
      if (e.target.id === 'edit-todo-submit-button') {
        const todoIndex = e.target.parentElement.parentElement.dataset.todoIndex;
        todos.editTodo(title.value, description.value, dueDate.value, priority.value, selectedProjectIndex, todoIndex);
      } else {
        todos.addTodo(title.value, description.value, dueDate.value, priority.value, false, selectedProjectIndex);
      }
    
    closeAddTodoForm();
    dom.renderTodos(selectedProjectIndex); 
    }
  }

  function openAddProjectForm() {
    if (document.getElementById('add-todo-form')) {
      closeAddTodoForm();
    }

    if (!document.getElementById('add-project-form')) {
      dom.renderAddProjectForm();
    }
  }

  function closeAddProjectForm() {
    const contentDiv = document.getElementById('content');
    const addProjectFormDiv = document.getElementById('add-project-form');
    contentDiv.removeChild(addProjectFormDiv);
  }

  function openAddTodoForm(e) {
    if (document.getElementById('add-project-form')) {
      closeAddProjectForm();
    }

    if (!document.getElementById('add-todo-form')) {
      if (e.target.classList.contains('fa-pen-to-square')) {
        const todoIndex = e.target.parentElement.parentElement.dataset.todoIndex;
        const projectIndex = e.target.parentElement.parentElement.dataset.projectIndex;

        dom.renderAddTodoForm(projectIndex, todoIndex);
      } else {
        dom.renderAddTodoForm();
      } 
    }
  }

  function closeAddTodoForm() {
    const contentDiv = document.getElementById('content');
    const addTodoFormDiv = document.getElementById('add-todo-form');
    contentDiv.removeChild(addTodoFormDiv);
  }

  function deleteTodo (e) {
    const todoIndex = e.target.parentElement.parentElement.dataset.todoIndex;
    const projectIndex = e.target.parentElement.parentElement.dataset.projectIndex;

    todos.deleteTodo(projectIndex, todoIndex);

    dom.renderTodos(projectIndex);
  }

  function toggleComplete (e) {
    if (e.target.classList.contains('fa-regular')) {
      e.target.classList.remove('fa-regular');
      e.target.classList.add('fa-solid');
    } else {
      e.target.classList.remove('fa-solid');
      e.target.classList.add('fa-regular');
    }

    const todoIndex = e.target.parentElement.parentElement.dataset.todoIndex;
    const projectIndex = e.target.parentElement.parentElement.dataset.projectIndex;

    todos.toggleComplete(projectIndex, todoIndex);
  }

  return {
    selectProject,
    addNewProject,
    submitTodoForm,
    openAddProjectForm,
    closeAddProjectForm,
    openAddTodoForm,
    closeAddTodoForm,
    deleteTodo,
    toggleComplete
  }

})();

export default handlers;