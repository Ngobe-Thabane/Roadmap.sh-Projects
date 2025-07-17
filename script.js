import { projects } from "./projects.js";

const container = document.getElementById("windowContainer");
const frame = document.getElementById("projectFrame");
const projectsContainer = document.getElementById("projects");
const source = document.getElementById("projects-template").innerHTML;
const template = Handlebars.compile(source);
const dock = document.getElementById("dock");

const searchInput = document.getElementById("searchInput");
const techStackFilterContainer = document.getElementById("techStackFilterContainer");

let currentURL = "";
let isMaximized = false;
let debounceTimeout = null;

// 🔄 Extract all unique tech stacks from the projects
const allStacks = Array.from(
  new Set(projects.flatMap(p => p.techStack))
).sort();

// 👇 Create checkbox filters dynamically
function renderStackCheckboxes() {
  allStacks.forEach(stack => {
    const id = `stack-${stack}`;
    const label = document.createElement("label");
    label.className = "flex items-center space-x-2 text-sm mb-1";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = stack;
    checkbox.className = "stack-checkbox";
    checkbox.id = id;

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(stack));
    techStackFilterContainer.appendChild(label);

    checkbox.addEventListener("change", applyFilters);
  });
}

// 👇 Actual render function
function renderProjects(list) {
  projectsContainer.innerHTML = template({ projects: list });
}

// 🧠 Main filtering logic
function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase();

  // Selected tech stacks
  const selectedStacks = Array.from(
    document.querySelectorAll(".stack-checkbox:checked")
  ).map(cb => cb.value);

  let filtered = [...projects];

  // Filter by name
  if (searchTerm) {
    filtered = filtered.filter(project =>
      project.projectName.toLowerCase().includes(searchTerm)
    );
  }

  // Filter by tech stacks (must include all selected)
  if (selectedStacks.length > 0) {
    filtered = filtered.filter(project =>
      selectedStacks.every(tag => project.techStack.includes(tag))
    );
  }


  renderProjects(filtered);
}

// 🕓 Debounce search input
searchInput.addEventListener("input", () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    applyFilters();
  }, 300);
});

// Initial render
renderProjects(projects);
renderStackCheckboxes();

// Window controls (unchanged)
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

interact('.projectFrame').draggable({
  allowFrom: '.cursor-move',
  listeners: {
    move(event) {
      const target = event.target;
      const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
      const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
      target.style.transform = `translate(${x}px, ${y}px)`;
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    }
  }
});

window.openWindow = openWindow;
window.closeWindow = closeWindow;
window.minimizeWindow = minimizeWindow;
window.maximizeWindow = maximizeWindow;
window.restoreWindow = restoreWindow;
window.toggleDarkMode = function () {
  document.documentElement.classList.toggle("dark");
};
