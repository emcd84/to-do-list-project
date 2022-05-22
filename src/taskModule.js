//Am considering abolishing task notes, seems too similar to description
import { displayAllProjects } from './controllerModule';


export class Task {
    constructor(name, desc, due, priority, completed) {
        this.name = name;
        this.description = desc;
        this.dueDate = due;
        this.priority = priority;
        this.completed = completed;
    }

    setName(value) {
        this.name = value;
    }
    setDescription(value) {
        this.description = value;
    }
    setDueDate(value) {
        this.dueDate = value;
    }
    setPriority(value) {
        this.priority = value;
    }

    buildTaskDiv() {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');

        const taskDivLeft = document.createElement('div');
        taskDivLeft.classList.add('task-left');
        const taskDivRight = document.createElement('div');
        taskDivRight.classList.add('task-right');
        taskDivRight.classList.add('clickable-zone');

        const titleHeader = document.createElement('h3');
        titleHeader.classList.add("task-title");
        titleHeader.textContent = this.name;

        const dueDateSubheader = document.createElement('h4');
        dueDateSubheader.classList.add("task-due-date");
        dueDateSubheader.textContent = this.dueDate;

        const completedChecklist = document.createElement('input');
        completedChecklist.classList.add('task-checkbox');
        completedChecklist.setAttribute('type', 'checkbox');
        completedChecklist.checked = this.completed;
        completedChecklist.addEventListener('click', () => {
            this.completed = completedChecklist.checked;
            displayAllProjects();
        });

        taskDivLeft.appendChild(completedChecklist);
        taskDivRight.appendChild(titleHeader);
        taskDivRight.appendChild(dueDateSubheader);

        taskDiv.appendChild(taskDivLeft);
        taskDiv.appendChild(taskDivRight);

        return(taskDiv);
    }

    buildExpandedTaskDiv() {
        //Want the checkbox + title + duedate part to look exactly like the compact div, and then the expanded details appear in expanded form below. going to try to do it fluidly but might need to use a "top-div" for the first section and then a bottom to append the expanded details


        const expTaskDiv = document.createElement('div');
        expTaskDiv.classList.add('expanded-task');

        const expTaskDivTop = document.createElement('div');
        expTaskDivTop.classList.add('expanded-task-top');
        const expTaskDivTopLeft = document.createElement('div');
        expTaskDivTopLeft.classList.add('expanded-task-top-left');
        const expTaskDivTopRight = document.createElement('div');
        expTaskDivTopRight.classList.add('expanded-task-top-right');
        expTaskDivTopRight.classList.add('clickable-zone');
        
        const expTaskDivBottom = document.createElement('div');
        expTaskDivBottom.classList.add('expanded-task-bottom');
        const expTaskDivBottomLeft = document.createElement('div');
        expTaskDivBottomLeft.classList.add('expanded-task-bottom-left');
        const expTaskDivBottomRight = document.createElement('div');
        expTaskDivBottomRight.classList.add('expanded-task-bottom-right');
        expTaskDivBottomRight.classList.add('clickable-zone');

        const taskTitle = document.createElement('h3');
        taskTitle.classList.add('expanded-task-title');
        taskTitle.textContent = this.name;
        expTaskDivTopRight.appendChild(taskTitle);

        const taskDueDate = document.createElement('h4');
        taskDueDate.classList.add('expanded-task-due-date');
        taskDueDate.textContent = this.dueDate;
        expTaskDivTopRight.appendChild(taskDueDate);

        const taskPriority = document.createElement('p');
        taskPriority.classList.add('expanded-task-priority');
        taskPriority.textContent = "Priority: " + this.priority;
        expTaskDivBottomRight.appendChild(taskPriority);

        const taskDescription = document.createElement('p');
        taskDescription.classList.add('expanded-task-desc');
        taskDescription.textContent = this.description;
        expTaskDivBottomRight.appendChild(taskDescription);

        // const taskNotes = document.createElement('p');
        // taskNotes.classList.add('expanded-task-notes');
        // taskNotes.textContent = this.notes;
        // expTaskDivBottomRight.appendChild(taskNotes);


        const taskCompleted = document.createElement('input');
        taskCompleted.classList.add('task-checkbox');
        taskCompleted.setAttribute('type', 'checkbox');
        taskCompleted.checked = this.completed;
        expTaskDivTopLeft.appendChild(taskCompleted);

        const taskEditButton = document.createElement('button');
        taskEditButton.textContent = "Edit";
        taskEditButton.classList.add("task-edit-button");
        taskEditButton.addEventListener('click', () => {
            this.createEditTaskForm();
        });
        //taskEditDiv.appendChild(taskEditButton);

        const taskDeleteButton = document.createElement('button');
        taskDeleteButton.textContent = "Delete";
        taskDeleteButton.classList.add("task-delete-button");
        // taskDeleteButton.addEventListener('click', () => {
        //     let parentProject = taskDelete
        // })

        expTaskDivTop.appendChild(expTaskDivTopLeft);
        expTaskDivTop.appendChild(expTaskDivTopRight);
        expTaskDivBottom.appendChild(expTaskDivBottomLeft);
        expTaskDivBottom.appendChild(expTaskDivBottomRight);
        expTaskDivBottomLeft.appendChild(taskEditButton);
        expTaskDivBottomLeft.appendChild(taskDeleteButton);

        expTaskDiv.appendChild(expTaskDivTop);
        expTaskDiv.appendChild(expTaskDivBottom);

        return(expTaskDiv);
    }

    createEditTaskForm() {
        const body = document.querySelector("body");

        const editTaskContainer = document.createElement('div');
        editTaskContainer.classList.add('edit-task-container');
        
        const editTaskDiv = document.createElement('div');
        editTaskDiv.classList.add('edit-task-div');

        // const editHeader = document.createElement('h2');
        // editHeader.textContent = "Edit Task";
        // editTaskDiv.appendChild(editHeader);

        const taskNameDiv = document.createElement('div');
        taskNameDiv.classList.add('task-name-div');
        taskNameDiv.classList.add('form-div');
        const taskNameInput = document.createElement('input');
        taskNameInput.setAttribute('type', 'text');
        taskNameInput.setAttribute('id', 'name-input');
        taskNameInput.setAttribute('value', this.name);
        const taskNameLabel = document.createElement('label');
        taskNameLabel.textContent = "Name:";
        taskNameLabel.setAttribute('for', 'name-input');
        taskNameDiv.appendChild(taskNameLabel);
        taskNameDiv.appendChild(taskNameInput);
        editTaskDiv.appendChild(taskNameDiv);

        const taskDueDateDiv = document.createElement('div');
        taskDueDateDiv.classList.add('task-due-date-div');
        taskDueDateDiv.classList.add('form-div');
        const taskDueDateInput = document.createElement('input');
        taskDueDateInput.setAttribute('type', 'date');
        taskDueDateInput.setAttribute('id', 'due-date-input');
        taskDueDateInput.setAttribute('value', this.dueDate);
        const taskDueDateLabel = document.createElement('label');
        taskDueDateLabel.textContent = "Due Date:";
        taskDueDateLabel.setAttribute('for', 'due-date-input');
        taskDueDateDiv.appendChild(taskDueDateLabel);
        taskDueDateDiv.appendChild(taskDueDateInput);
        editTaskDiv.appendChild(taskDueDateDiv);

        const taskPriorityDiv = document.createElement('div');
        taskPriorityDiv.classList.add('task-priority-div');
        taskPriorityDiv.classList.add('form-div');
        const taskPriorityInput = document.createElement('input');
        taskPriorityInput.setAttribute('type', 'number');
        taskPriorityInput.setAttribute('id', 'priority-input');
        taskPriorityInput.setAttribute('value', this.priority);
        const taskPriorityLabel = document.createElement('label');
        taskPriorityLabel.textContent = "Priority:";
        taskPriorityLabel.setAttribute('for', 'priority-input');
        taskPriorityDiv.appendChild(taskPriorityLabel);
        taskPriorityDiv.appendChild(taskPriorityInput);
        editTaskDiv.appendChild(taskPriorityDiv);

        const taskDescriptionDiv = document.createElement('div');
        taskDescriptionDiv.classList.add('task-description-div');
        taskDescriptionDiv.classList.add('form-div');
        const taskDescriptionInput = document.createElement('textarea');
        taskDescriptionInput.setAttribute('rows', '4');
        taskDescriptionInput.setAttribute('id', 'description-input');
        taskDescriptionInput.textContent = this.description;
        const taskDescriptionLabel = document.createElement('label');
        taskDescriptionLabel.textContent = "Description:";
        taskDescriptionLabel.setAttribute('for', 'description-input');
        taskDescriptionDiv.appendChild(taskDescriptionLabel);
        taskDescriptionDiv.appendChild(taskDescriptionInput);
        editTaskDiv.appendChild(taskDescriptionDiv);

        const submitDiv = document.createElement('div');
        submitDiv.classList.add('task-submit-div');
        submitDiv.classList.add('form-div');
        const submitButton = document.createElement('button');
        submitButton.classList.add('new-task-submit');
        submitButton.textContent = "Edit Task";
        submitButton.addEventListener('click', () => {
            this.setName(taskNameInput.value);
            this.setDueDate(taskDueDateInput.value);
            this.setPriority(taskPriorityInput.value);
            this.setDescription(taskDescriptionInput.value);
            body.removeChild(editTaskContainer);
            displayAllProjects();
        });
        submitDiv.appendChild(submitButton);
        editTaskDiv.appendChild(submitDiv);

        editTaskContainer.appendChild(editTaskDiv);
        body.append(editTaskContainer);
    }



}