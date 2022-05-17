import { Task } from "./taskModule";

export class Project {
    constructor(name, tasks) {
        this.name = name;
        this.tasks = tasks;
    }
    
    get name() {
        return this._name;
    }
    set name(newName) {
        this._name = newName;
    }

    get tasks() {
        return this._tasks;
    }
    set tasks(newTasks) {
        this._tasks = newTasks;
    }

    addTask(name, desc, due, priority, notes, completed) {
        this.tasks.push(new Task(name, desc, due, priority, notes, completed));
    }

    displayProject() {
        const contentDiv = document.querySelector("#content");

        const projectDiv = document.createElement('div');

        const projectHeader = document.createElement('h2');
        projectHeader.classList.add('project-name');
        projectHeader.textContent = this.name;

        projectDiv.appendChild(projectHeader);
        for(let i=0; i<this.tasks.length; i++) {
            projectDiv.appendChild(this.tasks[i].buildTaskDiv());
        }

        const addTaskButton = document.createElement('button');
        addTaskButton.textContent = "New Task"
        addTaskButton.classList.add("add-task-button");
        addTaskButton.addEventListener('click', () => {
            this.addTask("Test Project", "No description", "2021-01-01", 1, "none", false);
        });
        projectDiv.appendChild(addTaskButton);


        contentDiv.appendChild(projectDiv);
    }

    
}