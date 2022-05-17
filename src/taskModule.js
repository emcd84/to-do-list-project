export class Task {
    constructor(name, desc, due, priority, notes, completed) {
        this.name = name;
        this.description = desc;
        this.dueDate = due;
        this.priority = priority;
        this.notes = notes;
        this.completed = completed;
    }

    buildTaskDiv() {
        const taskDiv = document.createElement('div');

        const titleHeader = document.createElement('h3');
        titleHeader.classList.add("task-title");
        titleHeader.textContent = this.name;

        const dueDateSubheader = document.createElement('div');
        dueDateSubheader.classList.add("task-due-date");
        dueDateSubheader.textContent = this.dueDate;

        const completedChecklist = document.createElement('input');
        completedChecklist.classList.add('task-checkbox');
        completedChecklist.setAttribute('type', 'checkbox');
        completedChecklist.checked = this.completed;

        taskDiv.appendChild(titleHeader);
        taskDiv.appendChild(dueDateSubheader);
        taskDiv.appendChild(completedChecklist);

        return(taskDiv);
    }



}