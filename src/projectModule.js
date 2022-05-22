import { Task } from "./taskModule";
import { displayAllProjects } from "./controllerModule";

export class Project {
    constructor(name, tasks, project) {
        this.name = name;
        this.tasks = tasks;
        this.expanded = -1;
    }
    
    // get name() {
    //     return this._name;
    // }
    // set name(newName) {
    //     this._name = newName;
    // }

    // get tasks() {
    //     return this._tasks;
    // }
    // set tasks(newTasks) {
    //     this._tasks = newTasks;
    // }

    setTasks(newTasks) {
        this.tasks = newTasks;
    }

    addTask(name, desc, due, priority, notes, completed) {
        console.log("run");
        let newTask = new Task(name, desc, due, priority, notes, completed);
        this.tasks.concat([newTask]);
        console.log(this.tasks);
    }

    deleteTask(index) {
        let newTasks = [];
        let num = 0;
        for(let i=0; i<this.tasks.length; i++) {
            if(i != index) {
                newTasks[num] = this.tasks[i];
                num++;
            }
        }
        this.tasks = newTasks;
        displayAllProjects();
    }

    displayProject() {
        //const contentDiv = document.querySelector("#content");

        const projectDiv = document.createElement('div');
        projectDiv.classList.add("project");

        const projectHeader = document.createElement('h2');
        projectHeader.classList.add('project-name');
        projectHeader.textContent = this.name;
        projectDiv.appendChild(projectHeader);

        let tempTaskDiv;
        let tempTaskDivClicks;
        let deleteButton;
        for(let i=0; i<this.tasks.length; i++) {
            if(i == this.expanded) {
                tempTaskDiv = this.tasks[i].buildExpandedTaskDiv();
                deleteButton = tempTaskDiv.querySelector(".task-delete-button");
                deleteButton.addEventListener('click', () => {
                    this.deleteTask(i);
                });
            } else {
                tempTaskDiv = this.tasks[i].buildTaskDiv();
            }
            tempTaskDiv.setAttribute('task-id', i);
            tempTaskDivClicks = tempTaskDiv.querySelectorAll('.clickable-zone');
            for(let j=0; j<tempTaskDivClicks.length; j++) {
                tempTaskDivClicks[j].addEventListener('click', () => {
                    if(i === this.expanded) {
                        this.expanded = -1;
                        displayAllProjects();
                    } else {
                        this.expanded = i;
                        displayAllProjects();
                    }
                })
            }

            projectDiv.appendChild(tempTaskDiv);
        }

        const addTaskButton = document.createElement('button');
        addTaskButton.textContent = "New Task"
        addTaskButton.classList.add("add-task-button");
        addTaskButton.addEventListener('click', () => {
            this.createNewTaskForm();
        });
        projectDiv.appendChild(addTaskButton);


        //contentDiv.appendChild(projectDiv);
        return(projectDiv);
    }

    createNewTaskForm() {
        if(document.querySelector('.new-task-container') == null) {

            const body = document.querySelector("body");

            if(document.querySelector('#new-project-container') != null) {
                body.removeChild(document.querySelector('#new-project-container'));
            }

            const newTaskContainer = document.createElement('div');
            newTaskContainer.classList.add('new-task-container');
        
            const newTaskDiv = document.createElement('div');
            newTaskDiv.classList.add('new-task-div');
        
            const taskNameDiv = document.createElement('div');
            taskNameDiv.classList.add('task-name-div');
            taskNameDiv.classList.add('form-div');
            const taskNameInput = document.createElement('input');
            taskNameInput.setAttribute('type', 'text');
            taskNameInput.setAttribute('id', 'name-input');
            const taskNameLabel = document.createElement('label');
            taskNameLabel.textContent = "Name:";
            taskNameLabel.setAttribute('for', 'name-input');
            taskNameDiv.appendChild(taskNameLabel);
            taskNameDiv.appendChild(taskNameInput);
            newTaskDiv.appendChild(taskNameDiv);

            const taskDueDateDiv = document.createElement('div');
            taskDueDateDiv.classList.add('task-due-date-div');
            taskDueDateDiv.classList.add('form-div');
            const taskDueDateInput = document.createElement('input');
            taskDueDateInput.setAttribute('type', 'date');
            taskDueDateInput.setAttribute('id', 'due-date-input');
            const taskDueDateLabel = document.createElement('label');
            taskDueDateLabel.textContent = "Due Date:";
            taskDueDateLabel.setAttribute('for', 'due-date-input');
            taskDueDateDiv.appendChild(taskDueDateLabel);
            taskDueDateDiv.appendChild(taskDueDateInput);
            newTaskDiv.appendChild(taskDueDateDiv);

            const taskPriorityDiv = document.createElement('div');
            taskPriorityDiv.classList.add('task-priority-div');
            taskPriorityDiv.classList.add('form-div');
            const taskPriorityInput = document.createElement('input');
            taskPriorityInput.setAttribute('type', 'number');
            taskPriorityInput.setAttribute('id', 'priority-input');
            const taskPriorityLabel = document.createElement('label');
            taskPriorityLabel.textContent = "Priority:";
            taskPriorityLabel.setAttribute('for', 'priority-input');
            taskPriorityDiv.appendChild(taskPriorityLabel);
            taskPriorityDiv.appendChild(taskPriorityInput);
            newTaskDiv.appendChild(taskPriorityDiv);
        
            const taskDescriptionDiv = document.createElement('div');
            taskDescriptionDiv.classList.add('task-description-div');
            taskDescriptionDiv.classList.add('form-div');
            const taskDescriptionInput = document.createElement('textarea');
            taskDescriptionInput.setAttribute('rows', '4');
            //taskDescriptionInput.setAttribute('type', 'text');
            taskDescriptionInput.setAttribute('id', 'description-input');
            const taskDescriptionLabel = document.createElement('label');
            taskDescriptionLabel.textContent = "Description:";
            taskDescriptionLabel.setAttribute('for', 'description-input');
            taskDescriptionDiv.appendChild(taskDescriptionLabel);
            taskDescriptionDiv.appendChild(taskDescriptionInput);
            newTaskDiv.appendChild(taskDescriptionDiv);
        
        
            // const taskNotesInput = document.createElement('input');
            // taskNotesInput.setAttribute('type', 'text');
            // taskNotesInput.setAttribute('id', 'notes-input');
            // const taskNotesLabel = document.createElement('label');
            // taskNotesLabel.textContent = "Notes:";
            // taskNotesLabel.setAttribute('for', 'notes-input');
            // newTaskDiv.appendChild(taskNotesLabel);
            // newTaskDiv.appendChild(taskNotesInput);
        
            const submitDiv = document.createElement('div');
            submitDiv.classList.add('task-submit-div');
            submitDiv.classList.add('form-div');
            const submitButton = document.createElement('button');
            submitButton.classList.add('new-task-submit');
            submitButton.textContent = "Add Task";
            submitButton.addEventListener('click', () => {
                let newTasks = [];
                newTasks = this.tasks;
                newTasks.push(new Task(taskNameInput.value, taskDescriptionInput.value, taskDueDateInput.value, taskPriorityInput.labels, false));
                this.tasks = newTasks;
                displayAllProjects();
                body.removeChild(newTaskContainer);
            });
            submitDiv.appendChild(submitButton);
            newTaskDiv.appendChild(submitDiv);
        
            newTaskContainer.appendChild(newTaskDiv);
            body.appendChild(newTaskContainer);
        }
    }
    
}