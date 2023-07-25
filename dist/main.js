(()=>{"use strict";const t=(()=>{class t{constructor(t){this.title=t,this.todos=[]}}let e=[];return{projectList:e,addProject:function(o){const n=new t(o);e.push(n)},getProjectIndex:function(t){return e.map((t=>t.title)).indexOf(t)},deleteProject:function(t){e.splice(t,1)},editProject:function(t,o,n){e[t][o]=n}}})();t.addProject("Default project");const e=t,o=(()=>{class t{constructor(t,e,o,n,d){this.title=t,this.description=e,this.dueDate=o,this.priority=n,this.completed=d}}return{addTodo:function(o,n,d,c,r,i){const s=new t(o,n,d,c,r,i);e.projectList[i].todos.push(s)},deleteTodo:function(t,o){e.projectList[t].todos.splice(o,1)},getTaskIndex:function(t){return e.projectList[e.getProjectIndex("Test project")].todos.map((t=>t.title)).indexOf(t)},editTodo:function(t,o,n,d){e.projectList[t].todos[o][n]=d}}})(),n=(()=>{let t=0;function n(){document.querySelector("#add-project-form").style.display="none"}function c(){document.querySelector("#add-todo-form").style.display="none"}return{selectProject:function(o){t=e.getProjectIndex(o.target.innerText),d.renderTodos(t)},addNewProject:function(t){t.preventDefault();const o=document.querySelector("input[id=title]");e.addProject(o.value),n(),d.renderProjects()},addNewTodo:function(e){e.preventDefault();const n=document.querySelector("input[id=title]"),r=document.querySelector("textarea[id=description]"),i=document.querySelector("input[id=due-date]"),s=document.querySelector("select[id=priority]");o.addTodo(n.value,r.value,i.value,s.value,!1,t),c(),d.renderTodos(t)},openAddProjectForm:function(){d.renderAddProjectForm()},closeAddProjectForm:n,openAddTodoForm:function(){d.renderAddTodoForm()},closeAddTodoForm:c}})(),d=(()=>{const t=document.getElementById("content");return{renderProjects:function(){const t=document.getElementById("projects");t.innerHTML="";const o=document.createElement("button");o.setAttribute("class","add-project-button");const d=document.createElement("img");d.setAttribute("src","./img/add-light.svg"),o.appendChild(d),o.addEventListener("click",n.openAddProjectForm);const c=document.createElement("div");e.projectList.forEach((function(t){const e=document.createElement("div");e.setAttribute("class","project-name"),e.innerText=t.title,c.appendChild(e)})),t.appendChild(o),t.appendChild(c),document.querySelectorAll(".project-name").forEach((function(t){t.addEventListener("click",n.selectProject)}))},renderTodos:function(t){const o=document.getElementById("todos");o.innerHTML="";const d=document.createElement("button");d.setAttribute("class","add-todo-button");const c=document.createElement("img");c.setAttribute("src","./img/add.svg"),d.appendChild(c),d.addEventListener("click",n.openAddTodoForm);const r=document.createElement("div");e.projectList[t].todos.forEach((function(t){const e=document.createElement("div");e.setAttribute("class","todo-name"),e.innerText=t.title,r.appendChild(e)})),o.appendChild(d),o.appendChild(r)},renderAddProjectForm:function(){const e=document.createElement("div");e.setAttribute("id","add-project-form");const o=document.createElement("form");o.setAttribute("action","#"),o.setAttribute("id","form");const d=document.createElement("div");d.setAttribute("class","form-item");const c=document.createElement("label");c.setAttribute("for","title");const r=document.createTextNode("Project title:");c.appendChild(r);const i=document.createElement("input");i.setAttribute("type","text"),i.setAttribute("id","title"),i.setAttribute("name","title");const s=document.createElement("button");s.setAttribute("id","submit-new-project-form");const a=document.createTextNode("Submit");s.appendChild(a),s.addEventListener("click",n.addNewProject),d.appendChild(c),d.appendChild(i),o.appendChild(d),o.appendChild(s),e.appendChild(o),t.appendChild(e)},renderAddTodoForm:function(){const e=document.createElement("div");e.setAttribute("id","add-todo-form");const o=document.createElement("form");o.setAttribute("action","#"),o.setAttribute("id","form");const d=document.createElement("div");d.setAttribute("class","form-item");const c=document.createElement("label");c.setAttribute("for","title");const r=document.createTextNode("Todo title:");c.appendChild(r);const i=document.createElement("input");i.setAttribute("type","text"),i.setAttribute("id","title"),i.setAttribute("name","title");const s=document.createElement("div");s.setAttribute("class","form-item");const a=document.createElement("label");a.setAttribute("for","description");const u=document.createTextNode("Todo description:");a.appendChild(u);const l=document.createElement("textarea");l.setAttribute("id","description"),l.setAttribute("name","description");const m=document.createElement("div");m.setAttribute("class","form-item");const p=document.createElement("label");p.setAttribute("for","due-date");const b=document.createTextNode("Todo due date:");p.appendChild(b);const h=document.createElement("input");h.setAttribute("type","date"),h.setAttribute("id","due-date"),h.setAttribute("name","due-date");const f=document.createElement("div");f.setAttribute("class","form-item");const A=document.createElement("label");A.setAttribute("for","priority");const E=document.createTextNode("Todo priority:");A.appendChild(E);const j=document.createElement("select");j.setAttribute("id","priority"),j.setAttribute("name","priority"),["Not urgent","Normal","Urgent"].forEach((function(t){let e=document.createElement("option");e.setAttribute("value",t);let o=document.createTextNode(t);e.appendChild(o),j.appendChild(e)}));const C=document.createElement("button");C.setAttribute("id","submit-new-todo-form");const T=document.createTextNode("Submit");C.appendChild(T),C.addEventListener("click",n.addNewTodo),d.appendChild(c),d.appendChild(i),s.appendChild(a),s.appendChild(l),m.appendChild(p),m.appendChild(h),f.appendChild(A),f.appendChild(j),o.appendChild(d),o.appendChild(s),o.appendChild(m),o.appendChild(f),o.appendChild(C),e.appendChild(o),t.appendChild(e)}}})();e.addProject("Test project"),o.addTodo("test","test description",new Date,"important",!1,1),o.addTodo("test2","another test description",new Date,"not important",!1,1),d.renderProjects()})();