// script.js

const taskList = document.getElementById('task-list');
const addTaskForm = document.getElementById('add-task-form');
const taskInput = document.getElementById('task-input');

let tasks = [];

addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText) {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            dueDate: null
        };
        tasks.push(task);
        renderTaskList();
        taskInput.value = '';
    }
});

taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) {
        const taskId = e.target.parentNode.dataset.taskId;
        const task = tasks.find((task) => task.id === taskId);
        const editText = prompt('Edit task:', task.text);
        if (editText) {
            task.text = editText;
            renderTaskList();
        }
    } else if (e.target.classList.contains('delete-btn')) {
        const taskId = e.target.parentNode.dataset.taskId;
        tasks = tasks.filter((task) => task.id !== taskId);
        renderTaskList();
    } else if (e.target.classList.contains('task')) {
        const taskId = e.target.dataset.taskId;
        const task = tasks.find((task) => task.id === taskId);
        task.completed = !task.completed;
        renderTaskList();
    }
});

function renderTaskList() {
    taskList.innerHTML = '';
    tasks.forEach((task) => {
        const taskHTML = `
            <li class="task" data-task-id="${task.id}">
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <span>${task.text}</span>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
                ${task.dueDate ? `<span class="due-date">Due: ${task.dueDate.toLocaleString()}</span>` : ''}
            </li>
        `;
        taskList.insertAdjacentHTML('beforeend', taskHTML);
    });
}

// initialize task list
renderTaskList();