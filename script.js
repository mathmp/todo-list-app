document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task.text, task.completed));

    todoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const taskText = todoInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            saveTask(taskText);
            todoInput.value = '';
        }
    });

    function addTask(text, completed = false) {
        const taskItem = document.createElement('li');
        taskItem.textContent = text;
        if (completed) {
            taskItem.classList.add('completed');
        }
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove');
        removeButton.addEventListener('click', () => {
            removeTask(taskItem, text);
        });

        taskItem.addEventListener('click', () => {
            toggleTaskCompletion(taskItem, text);
        });

        taskItem.appendChild(removeButton);
        todoList.appendChild(taskItem);
    }

    function saveTask(text) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ text, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function removeTask(taskItem, text) {
        todoList.removeChild(taskItem);
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.text !== text);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function toggleTaskCompletion(taskItem, text) {
        taskItem.classList.toggle('completed');
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.map(task => {
            if (task.text === text) {
                task.completed = !task.completed;
            }
            return task;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
