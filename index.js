    const todoInput = document.getElementById('todo-input');
    const addTodoButton = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');
    let taskId = 0;

    const addTodo = () => {
        const todoText = todoInput.value.trim();
        if (todoText === '') return;

        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'task_check';
        const span = document.createElement('span');
        span.innerHTML = todoText;
        li.appendChild(checkbox);
        li.appendChild(span);
        todoList.appendChild(li);
        todoInput.value = '';

        taskId++;
        localStorage.setItem(`taskId_${taskId}`, todoText)

        const editButton = document.createElement('button');
        editButton.id = 'edit_btn';
        editButton.textContent = 'Редактировать';
        li.appendChild(editButton);

        const editTask = document.createElement('textarea');
        editTask.value = todoText;
        editTask.className = 'edit-task';
        li.prepend(editTask);
        editTask.style.display = 'none';
         
        editButton.onclick = function() {
        if (editTask.style.display === 'none') {
            checkbox.style.display = 'none';
            editTask.style.display = 'inline';
            span.style.display = 'none';
            editButton.textContent = 'Сохранить';
        } else {
            if (editTask.value === '') {
            let answer = confirm('Удалить задачу?')
            if (answer === true) {
                todoList.removeChild(li)
            }
            else { return }
            };
            span.textContent = editTask.value; 
            checkbox.style.display = 'inline';
            editTask.style.display = 'none';
            span.style.display = 'inline';
            editButton.textContent = 'Редактировать';
            }
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.id = 'delete_btn'
        li.appendChild(deleteButton);

        deleteButton.onclick = () => {
            todoList.removeChild(li);
        }

        checkbox.addEventListener('change', function() {
            if (this.checked) {
                span.style.color = 'grey'; // Цвет, когда checkbox отмечен
                editButton.style.backgroundColor = 'grey';
                deleteButton.style.backgroundColor = 'grey';
            } else {
                span.style.color = 'black'; // Цвет, когда checkbox не отмечен
                editButton.style.backgroundColor = '#433FFF';
                deleteButton.style.backgroundColor = 'red';
            }
        });
}

        // Обработчик события на кнопку добавления
    addTodoButton.addEventListener('click', addTodo);

        // Обработчик события на Enter в поле ввода
    todoInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTodo();
        }
    });