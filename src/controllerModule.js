import { Task } from "./taskModule";
import { Project } from "./projectModule";

//Hold off on implementing task editing until we clean up the display so we can decide how best to implement it
//Probably going to want an "edit form" that expands in the centre, don't think we can fit in edit buttons. could do a double click on expanded event to edit and have an instructions page to convey that info
//May 20-- style new task / new project forms -- done
//May 21-- set up edit functionality -- done
//May 22 -- set up info retainment + add delete functionality + finalize appearance

let allProjects = [
    new Project("Inbox", [new Task("Set up my to-do list", "This is your to-do list! Create projects to organize your tasks and place miscellaneous items here in your inbox.", "No due date", 1, false)])
]

const run = () => {
    //localStorage.clear();
    getInfo();
    console.log(allProjects);
    initEventListeners();
    displayAllProjects();

}

const displayAllProjects = () => {
    const contentDiv = document.querySelector("#content");
    while(contentDiv.firstChild) {
        contentDiv.removeChild(contentDiv.lastChild);
    }

    let tempProject;
    for(let i=0; i<allProjects.length; i++) {
        tempProject = allProjects[i].displayProject();
        tempProject.setAttribute('project-id', i);
        contentDiv.appendChild(tempProject);
    }

    saveInfo();
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
    if(document.querySelector("#new-project-container") == null) {

        const body = document.querySelector('body');
        
        if(document.querySelector(".new-task-container") != null) {
            body.removeChild(document.querySelector(".new-task-container"));
        }

        const newProjectContainer = document.createElement('div');
        newProjectContainer.setAttribute('id', 'new-project-container');
        
        const newProjectForm = document.createElement('div');
        newProjectForm.setAttribute('id', 'new-project-form');

        const newProjectLabel = document.createElement('label');
        newProjectLabel.textContent = "Name:";
        newProjectLabel.setAttribute('for', 'project-name-input');
        const newProjectInput = document.createElement('input');
        newProjectInput.setAttribute('id', 'project-name-input');

        const newProjectSubmit = document.createElement('button');
        newProjectSubmit.setAttribute('id', 'new-project-button');
        newProjectSubmit.textContent = "Create Project";
        newProjectSubmit.addEventListener('click', () => {
            addProject(newProjectInput.value, []);
            body.removeChild(newProjectContainer);
        });

        newProjectForm.appendChild(newProjectLabel);
        newProjectForm.appendChild(newProjectInput);
        newProjectForm.appendChild(newProjectSubmit);

        newProjectContainer.appendChild(newProjectForm);

        body.append(newProjectContainer);
    }

}

const saveInfo = () => {
    localStorage.setItem('projects', JSON.stringify(allProjects));
}

const getInfo = () => {
    let projects = JSON.parse(localStorage.getItem('projects'));
    if(projects == null) return;

    console.log("run");
    let allTasks = [];
    let projectTasks;
    for(let i=0; i<projects.length; i++) {
        projectTasks = projects[i].tasks;
        for(let j=0; j<projectTasks.length; j++) {
            projectTasks[j] = new Task(projectTasks[j].name, projectTasks[j].description, projectTasks[j].dueDate, projectTasks[j].priority, projectTasks[j].completed);
        }
        allTasks[i] = projectTasks;
    }

    let tempProject;
    for(let i=0; i<projects.length; i++) {
        tempProject = projects[i];
        projects[i] = new Project(tempProject.name, allTasks[i]);
    }

    allProjects = projects;
}




export { run , displayAllProjects };