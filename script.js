import { projects } from "./projects.js";

const projectsContainer = document.getElementById('projects');
const source = document.getElementById('projects-template').innerHTML;
const template = Handlebars.compile(source);
const html = template({projects:projects});
console.log(html)
projectsContainer.innerHTML = html;
const container = document.getElementById('windowContainer');
const frame = document.getElementById('projectFrame');

let isMaximized = false;

export function openWindow(url) {
  frame.src = url;
  container.classList.remove('hidden');
}

export function closeWindow() {
  container.classList.add('hidden');
  frame.src = '';
}

export function minimizeWindow() {
  container.style.display = 'none';
}

export function maximizeWindow() {
  if (!isMaximized) {
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100vw';
    container.style.height = '100vh';
  } else {
    container.style.top = '2.5rem';
    container.style.left = '2.5rem';
    container.style.width = '80vw';
    container.style.height = '70vh';
  }
  isMaximized = !isMaximized;
}

window.openWindow = openWindow;
window.closeWindow = closeWindow;
window.maximizeWindow = maximizeWindow;
window.minimizeWindow = minimizeWindow;