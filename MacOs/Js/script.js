import { projects } from "./projects.js";

const container = document.getElementById("windowContainer");
const frame = document.getElementById("projectFrame");
const projectsContainer = document.getElementById("projects");
const source = document.getElementById("projects-template").innerHTML;
const template = Handlebars.compile(source);
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const dock = document.getElementById("dock");

let currentURL = "";
let currentSearch = "";
let currentSort = "asc";
let isMaximized = false;



function renderProjects(list) {
  projectsContainer.innerHTML = template({ projects: list });
}

function filterProjects() {
  let filtered = [...projects];

  if (currentSearch) {
    filtered = filtered.filter((p) =>
      p.projectName.toLowerCase().includes(currentSearch.toLowerCase())
    );
  }

  filtered.sort((a, b) =>
    currentSort === "asc"
      ? a.projectName.localeCompare(b.projectName)
      : b.projectName.localeCompare(a.projectName)
  );

  renderProjects(filtered);
}

filterProjects();

searchInput.addEventListener("input", (e) => {
  currentSearch = e.target.value;
  filterProjects();
});

sortSelect.addEventListener("change", (e) => {
  currentSort = e.target.value;
  filterProjects();
});



export function openWindow(url) {
  currentURL = url;
  frame.src = url;
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
