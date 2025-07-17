import { projects } from "./projects.js";

const container = document.getElementById("windowContainer");
const frame = document.getElementById("projectFrame");
const projectsContainer = document.getElementById("projects");
const source = document.getElementById("projects-template").innerHTML;
const template = Handlebars.compile(source);
const dock = document.getElementById("dock");

let currentURL = "";
let isMaximized = false;

interact('.projectFrame').draggable({
      allowFrom: '.cursor-move',
      listeners: {
        move (event) {
          const target = event.target
          const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
          const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
          target.style.transform = `translate(${x}px, ${y}px)`
          target.setAttribute('data-x', x)
          target.setAttribute('data-y', y)
        }
      }
    });

function renderProjects(list) {
  projectsContainer.innerHTML = template({ projects: list });
}

renderProjects(projects);


export function openWindow(url, e) {
  currentURL = url;
  frame.src = url;
  if (e) e.stopPropagation();
  container.classList.remove("hidden");
  container.style.display = "flex";
  dock.classList.add("hidden");
}

export function closeWindow() {
   container.style.display = "none"; 
    setTimeout(() => {
    frame.src = "";
  }, 300);
  dock.classList.add("hidden");
}

export function minimizeWindow() {
   container.style.display = "none";  
   setTimeout(() => {
    frame.src = "";
  }, 300);
  dock.classList.remove("hidden");
}

export function maximizeWindow() {
  if (!isMaximized) {
    container.style.top = "0";
    container.style.left = "0";
    container.style.width = "99vw";
    container.style.height = "90vh";
  } else {
    container.style.bottom = "0rem";
    container.style.left = "2.5rem";
    container.style.width = "80vw";
    container.style.height = "70vh";
  }
  isMaximized = !isMaximized;
}

export function restoreWindow() {
  container.classList.remove("hidden");
  container.style.display = "flex";
  frame.src = currentURL;
  dock.classList.add("hidden");
}

window.openWindow = openWindow;
window.closeWindow = closeWindow;
window.minimizeWindow = minimizeWindow;
window.maximizeWindow = maximizeWindow;
window.restoreWindow = restoreWindow;

window.toggleDarkMode = function () {
  document.documentElement.classList.toggle("dark");
};
