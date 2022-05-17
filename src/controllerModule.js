import { Task } from "./taskModule";
import { Project } from "./projectModule";

//May 17 -- Add ability to expand a task by clicking within its div


let allProjects = [
    new Project("Project One", [new Task("Task One", "the first task", "2022-07-01", 1, "brief note", true), new Task("Task Two", "the second task", "2022-09-01", 1, "do after task one", false)]),
    new Project("Project Two", [new Task("Task One", "the first task", "2022-07-01", 1, "brief note", true), new Task("Task Two", "the second task", "2022-09-01", 1, "do after task one", false)])
]

const run = () => {
    initEventListeners();
    displayAllProjects();

}

const displayAllProjects = () => {
    const contentDiv = document.querySelector("#content");
    while(contentDiv.firstChild) {
        contentDiv.removeChild(contentDiv.lastChild);
    }

    for(let i=0; i<allProjects.length; i++) {
        allProjects[i].displayProject();
    }

    const addTaskButtons = document.querySelectorAll(".add-task-button");
    for(let i=0; i<addTaskButtons.length; i++) {
        addTaskButtons[i].addEventListener('click', () => {
            displayAllProjects();
        });
    }
}

const initEventListeners = () => {
    const newProjectButton = document.querySelector("#new-project-button");
    newProjectButton.addEventListener('click', () => {
        createNewProjectForm();
    });
}

const addProject = (name, tasks) => {
    allProjects.push(new Project(name, tasks));
    displayAllProjects();
}

const createNewProjectForm = () => {
    const newProjectForm = document.createElement('div');
    newProjectForm.setAttribute('id', 'new-project-form');

    const newProjectInput = document.createElement('input');
    newProjectInput.setAttribute('placeholder', 'Project Name');

    const newProjectSubmit = document.createElement('button');
    newProjectSubmit.setAttribute('id', 'new-project-button');
    newProjectSubmit.textContent = "Create Project";
    newProjectSubmit.addEventListener('click', () => {
        addProject(newProjectInput.value, []);
        body.removeChild(newProjectForm);
    });

    newProjectForm.appendChild(newProjectInput);
    newProjectForm.appendChild(newProjectSubmit);

    const body = document.querySelector('body');
    body.append(newProjectForm);
}

export { run };