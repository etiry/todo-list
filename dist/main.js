(()=>{"use strict";const t=(()=>{class t{constructor(t){this.title=t,this.tasks=[]}}let e=[];return{projectList:e,addProject:function(n){const o=new t(n);e.push(o)},getProjectIndex:function(t){return e.map((t=>t.title)).indexOf(t)},deleteProject:function(t){e.splice(t,1)},editProject:function(t,n,o){e[t][n]=o}}})();t.addProject("Default project");const e=t,n=(()=>{class t{constructor(t,e,n,o,c){this.title=t,this.description=e,this.dueDate=n,this.priority=o,this.completed=c}}return{addTodo:function(n,o,c,s,r){const i=new t(n,o,c,s,r);e.projectList[e.getProjectIndex("Test project")].tasks.push(i)},deleteTodo:function(t,n){e.projectList[t].tasks.splice(n,1)},getTaskIndex:function(t){return e.projectList[e.getProjectIndex("Test project")].tasks.map((t=>t.title)).indexOf(t)},editTodo:function(t,n,o,c){e.projectList[t].tasks[n][o]=c}}})(),o=function(t){console.log(t);const n=t.target.innerText;c.renderTasks(e.getProjectIndex(n))},c=(()=>{const t=document.getElementById("content");return{renderProjects:function(){const n=document.createElement("button");n.setAttribute("class","add-project-button");const c=document.createElement("img");c.setAttribute("src","./img/add.svg"),n.appendChild(c);const s=document.createElement("div");e.projectList.forEach((function(t){const e=document.createElement("div");e.setAttribute("class","project-name"),e.innerText=t.title,s.appendChild(e)})),t.appendChild(n),t.appendChild(s),document.querySelectorAll(".project-name").forEach((function(t){t.addEventListener("click",o)}))},renderTasks:function(n){const o=document.createElement("div");e.projectList[n].tasks.forEach((function(t){const e=document.createElement("div");e.setAttribute("class","task-name"),e.innerText=t.title,o.appendChild(e)})),t.appendChild(o)}}})();e.addProject("Test project"),n.addTodo("test","test description",new Date,"important",!1),n.addTodo("test2","another test description",new Date,"not important",!1),c.renderProjects()})();