document.addEventListener('DOMContentLoaded', function() {
    const todoInput = document.getElementById('todoInput');
    const addTodoBtn = document.getElementById('addTodoBtn');
    const todoList = document.getElementById('todoList');

    // Load todos from local storage
    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => {
            createTodoElement(todo);
        });
    }

    // Save todos to local storage
    function saveTodos() {
        const todos = [];
        document.querySelectorAll('.todo-item').forEach(item => {
            todos.push(item.querySelector('span').innerText);
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Create a todo item element
    function createTodoElement(todoText) {
        const li = document.createElement('li');
        li.className = 'list-group-item todo-item';
        li.innerHTML = `
            <span>${todoText}</span>
            <button class="btn btn-danger btn-sm delete-btn">Delete</button>
        `;
        todoList.appendChild(li);

        li.querySelector('.delete-btn').addEventListener('click', function() {
            li.remove();
            saveTodos();
        });
    }

    // Add a new todo
    addTodoBtn.addEventListener('click', function() {
        const todoText = todoInput.value.trim();
        if (todoText) {
            createTodoElement(todoText);
            saveTodos();
            todoInput.value = '';
        }
    });

    // Initial load
    loadTodos();
});
