const todoList = [{
  name: 'wake up to read',
  dueDate: '2022-12-22',
  completed: false
}];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    const { name, dueDate, completed } = todoObject;
    
    const html = `
      <div class="todo-item ${completed ? 'completed' : ''}">
        <input type="checkbox" 
          ${completed ? 'checked' : ''} 
          onchange="toggleTodo(${i})"
          class="todo-checkbox">
        
        <div class="todo-content">
          ${i === todoObject.editIndex ? `
            <input type="text" value="${name}" class="edit-input" id="edit-input-${i}">
            <input type="date" value="${dueDate}" class="edit-date-input" id="edit-date-input-${i}">
            <button onclick="saveTodo(${i})" class="save-button">Save</button>
          ` : `
            <div>${name}</div>
            <div>${dueDate}</div>
          `}
        </div>
        
        <div class="todo-actions">
          ${i === todoObject.editIndex ? '' : `
            <button onclick="editTodo(${i})" class="edit-button">Edit</button>
          `}
          <button onclick="deleteTodo(${i})" class="delete-todo-button">Delete</button>
        </div>
      </div>
    `;
    todoListHTML += html;
  }

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
}

function AddTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value.trim();
  
  if (!name) {
    alert('You must add todo item')
    return;
  };

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  todoList.push({
    name: name,
    dueDate: dueDate,
    completed: false,
    editIndex: -1
  });

  inputElement.value = '';
  dateInputElement.value = '';
  renderTodoList();
}

function deleteTodo(index) {
  todoList.splice(index, 1);
  renderTodoList();
}

function editTodo(index) {

  todoList.forEach(item => item.editIndex = -1);
  

  todoList[index].editIndex = index;
  renderTodoList();
  
  setTimeout(() => {
    const editInput = document.getElementById(`edit-input-${index}`);
    if (editInput) editInput.focus();
  }, 0);
}

function saveTodo(i) {
  const nameInput = document.getElementById(`edit-input-${i}`);
  const dateInput = document.getElementById(`edit-date-input-${i}`);
  
  if (nameInput && dateInput) {
    todoList[i].name = nameInput.value.trim();
    todoList[i].dueDate = dateInput.value;
    todoList[i].editIndex = -1;
    renderTodoList();
  }
}

function toggleTodo(i) {
  todoList[i].completed = !todoList[i].completed;
  renderTodoList();
}
