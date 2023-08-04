(()=>{"use strict";const e=(()=>{class e{constructor(e){this.title=e,this.todos=[],this.projectIndex=null}}let t=[];return{projectList:t,addProject:function(n){const d=new e(n);t.push(d),d.index=t.indexOf(d)},getProjectIndex:function(e){return t.map((e=>e.title)).indexOf(e)},deleteProject:function(e){t.splice(e,1)},editProject:function(e,n,d){t[e][n]=d}}})();e.addProject("Default project");const t=e,n=(()=>{class e{constructor(e,t,n,d,o,c){this.title=e,this.description=t,this.dueDate=n,this.priority=d,this.completed=o,this.projectIndex=c,this.todoIndex=null}}return{addTodo:function(n,d,o,c,r,i){const s=new e(n,d,o,c,r,i);t.projectList[i].todos.push(s),s.index=t.projectList[i].todos.indexOf(s)},deleteTodo:function(e,n){const d=t.projectList[e].todos;d.splice(n,1),d.forEach((e=>e.index=d.indexOf(e)))},getTodoIndex:function(e){return t.projectList[t.getProjectIndex("Test project")].todos.map((e=>e.title)).indexOf(e)},editTodo:function(e,n,d,o){t.projectList[e].todos[n][d]=o}}})(),d=(()=>{let e=0;function d(){const e=document.getElementById("content"),t=document.getElementById("add-project-form");e.removeChild(t)}function c(){const e=document.getElementById("content"),t=document.getElementById("add-todo-form");e.removeChild(t)}return{selectProject:function(n){e=t.getProjectIndex(n.target.innerText),o.renderTodos(e)},addNewProject:function(e){e.preventDefault();const n=document.querySelector("input[id=title]");n.reportValidity()&&(t.addProject(n.value),d(),o.renderProjects())},addNewTodo:function(t){t.preventDefault();const d=document.querySelector("input[id=title]"),r=document.querySelector("textarea[id=description]"),i=document.querySelector("input[id=due-date]"),s=document.querySelector("select[id=priority]");d.reportValidity()&&(n.addTodo(d.value,r.value,i.value,s.value,!1,e),c(),o.renderTodos(e))},openAddProjectForm:function(){document.getElementById("add-todo-form")&&c(),document.getElementById("add-project-form")||o.renderAddProjectForm()},closeAddProjectForm:d,openAddTodoForm:function(){document.getElementById("add-project-form")&&d(),document.getElementById("add-todo-form")||o.renderAddTodoForm()},closeAddTodoForm:c}})(),o=(()=>{const e=document.getElementById("content");function o(e){const n=document.getElementById("todos");n.innerHTML="";const o=document.createElement("button");o.setAttribute("class","add-todo-button");const r=document.createElement("img");r.setAttribute("src","./img/add.svg");const i=document.createElement("h2");i.innerText="Add new todo",o.appendChild(r),o.appendChild(i),o.addEventListener("click",d.openAddTodoForm);const s=document.createElement("div");t.projectList[e].todos.forEach((function(e){const t=document.createElement("div");t.setAttribute("class","todo-name"),t.setAttribute("data-todo-index",e.index),t.setAttribute("data-project-index",e.projectIndex),t.innerText=e.title;const n=document.createElement("div");n.setAttribute("class","icons");const d=document.createElement("span");d.setAttribute("class","material-symbols-outlined"),d.innerText=" edit ",n.appendChild(d);const o=document.createElement("span");o.setAttribute("class","material-symbols-outlined"),o.innerText=" delete ",n.appendChild(o);const r=document.createElement("span");r.setAttribute("class","material-symbols-outlined"),r.innerText=" task_alt ",n.appendChild(r),t.appendChild(n),s.appendChild(t),o.addEventListener("click",c)})),n.appendChild(o),n.appendChild(s)}function c(e){const t=e.target.parentElement.parentElement.dataset.todoIndex,d=e.target.parentElement.parentElement.dataset.projectIndex;n.deleteTodo(d,t),o(d)}return{contentDiv:e,renderHeader:function(){const e=document.getElementById("header"),t=document.createElement("h1");t.innerText="Todo List",e.appendChild(t)},renderProjects:function(){const e=document.getElementById("projects");e.innerHTML="";const n=document.createElement("button");n.setAttribute("class","add-project-button");const o=document.createElement("img");o.setAttribute("src","./img/add-light.svg");const c=document.createElement("h2");c.innerText="Add new project",n.appendChild(o),n.appendChild(c),n.addEventListener("click",d.openAddProjectForm);const r=document.createElement("div");t.projectList.forEach((function(e){const t=document.createElement("div");t.setAttribute("class","project-name"),t.innerText=e.title,r.appendChild(t)})),e.appendChild(n),e.appendChild(r),document.querySelectorAll(".project-name").forEach((function(e){e.addEventListener("click",d.selectProject)}))},renderTodos:o,renderAddProjectForm:function(){const t=document.createElement("div");t.setAttribute("id","add-project-form");const n=document.createElement("img");n.setAttribute("src","./img/close-light.svg"),n.setAttribute("class","close-button"),n.addEventListener("click",d.closeAddProjectForm);const o=document.createElement("form");o.setAttribute("action","#"),o.setAttribute("id","form");const c=document.createElement("div");c.setAttribute("class","form-item");const r=document.createElement("label");r.setAttribute("for","title");const i=document.createTextNode("Project title:");r.appendChild(i);const s=document.createElement("input");s.setAttribute("type","text"),s.setAttribute("id","title"),s.setAttribute("name","title"),s.required=!0;const a=document.createElement("button");a.setAttribute("class","submit-button");const l=document.createTextNode("Submit");a.appendChild(l),a.addEventListener("click",d.addNewProject),c.appendChild(r),c.appendChild(s),o.appendChild(c),o.appendChild(a),t.appendChild(n),t.appendChild(o),e.appendChild(t)},renderAddTodoForm:function(){const t=document.createElement("div");t.setAttribute("id","add-todo-form");const n=document.createElement("img");n.setAttribute("src","./img/close-light.svg"),n.setAttribute("class","close-button"),n.addEventListener("click",d.closeAddTodoForm);const o=document.createElement("form");o.setAttribute("action","#"),o.setAttribute("id","form");const c=document.createElement("div");c.setAttribute("class","form-item");const r=document.createElement("label");r.setAttribute("for","title");const i=document.createTextNode("Todo title:");r.appendChild(i);const s=document.createElement("input");s.setAttribute("type","text"),s.setAttribute("id","title"),s.setAttribute("name","title"),s.required=!0;const a=document.createElement("div");a.setAttribute("class","form-item");const l=document.createElement("label");l.setAttribute("for","description");const u=document.createTextNode("Todo description:");l.appendChild(u);const m=document.createElement("textarea");m.setAttribute("id","description"),m.setAttribute("name","description");const p=document.createElement("div");p.setAttribute("class","form-item");const h=document.createElement("label");h.setAttribute("for","due-date");const b=document.createTextNode("Todo due date:");h.appendChild(b);const E=document.createElement("input");E.setAttribute("type","date"),E.setAttribute("id","due-date"),E.setAttribute("name","due-date");const A=document.createElement("div");A.setAttribute("class","form-item");const f=document.createElement("label");f.setAttribute("for","priority");const C=document.createTextNode("Todo priority:");f.appendChild(C);const j=document.createElement("select");j.setAttribute("id","priority"),j.setAttribute("name","priority"),["Not urgent","Normal","Urgent"].forEach((function(e){let t=document.createElement("option");t.setAttribute("value",e);let n=document.createTextNode(e);t.appendChild(n),j.appendChild(t)}));const T=document.createElement("button");T.setAttribute("class","submit-button");const x=document.createTextNode("Submit");T.appendChild(x),T.addEventListener("click",d.addNewTodo),c.appendChild(r),c.appendChild(s),a.appendChild(l),a.appendChild(m),p.appendChild(h),p.appendChild(E),A.appendChild(f),A.appendChild(j),o.appendChild(c),o.appendChild(a),o.appendChild(p),o.appendChild(A),o.appendChild(T),t.appendChild(n),t.appendChild(o),e.appendChild(t)}}})();t.addProject("Test project"),n.addTodo("test","test description",new Date,"important",!1,1),n.addTodo("test2","another test description",new Date,"not important",!1,1),o.renderHeader(),o.renderProjects()})();