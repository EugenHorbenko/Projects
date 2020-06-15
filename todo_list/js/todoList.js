// import todoItem from "../templates/todo-item.hbs";

const todos = {
    items: [],
    add(text) {
        const todo = {
            id: Date.now(),
            text
        };
        this.items.push(todo)

        return todo;
    },
    delete(id) {
        this.items = this.items.filter(item => item.id !== id);
    },
    edit(id, text) {
        this.items.forEach(item => {
            if(item.id === Number(id)) {
               return item.text = text
            }
        })
    },
    priorityUp(id) {
        this.items.forEach(item => {
            if(item.id === Number(id)) {
                let currentIdx = this.items.indexOf(item)
                const newIdx = currentIdx -= 1
                const deleteIdx = currentIdx += 2
               this.items.splice(newIdx, 0, item)
               this.items.splice(deleteIdx, 1)
            }
        })
    }
};

const editor = document.querySelector('.js-editor')
const todoList = document.querySelector('.js-todo-list')

const refs = {
    editor: document.querySelector('.js-editor'),
    todoList: document.querySelector('.js-todo-list'),
}

refs.editor.addEventListener('submit', handleEditorSubmit)
refs.todoList.addEventListener('click', handleTodoListClick)

function handleEditorSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget
    const inputValue = form.elements.text.value


    const todo = todos.add(inputValue)
    const todoMarkup = buildTodoItem(todo);
    appendTodoItem(refs.todoList, todoMarkup)
    console.log(todos.items)
    form.reset();
    
}

function buildTodoItem(item) {
    return `
    <li class="todo-list__item" data-id="${item.id}">
    <div class="todo-container">
        <p class="todo__text" name="todo__text">
        ${item.text}
        </p>
        <div class="todo__actions">
            <button title="Удалить" class="todo-button todo-button-delete" name="delete"></button>
            <button title="Редактировать" class="todo-button todo-button-edit" name="edit" ></button>
            <button title="Изменить приоритет" class="todo-button todo-button-priority" name="priorityUp" ></button>
        </div>
    </div>
    </li> `
}

function appendTodoItem(parentRef, todoEl) {
    parentRef.insertAdjacentHTML('beforeend', todoEl);
} 

function handleTodoListClick(e) {
    const button = e.target;
    const li = button.closest('li.todo-list__item')
    const todoId = li.dataset.id
    if(e.target.name === 'delete') {

    todos.delete(Number(todoId))
    console.log(todos.items)
    refs.todoList.removeChild(li)
} else if (e.target.name === 'edit') {
    const p = button.closest('div.todo-container')
    let todoText = p.children.todo__text.innerText
    const editedTodoText = prompt('Редактировать', todoText)
    p.children.todo__text.innerText = editedTodoText
    todos.edit(todoId, editedTodoText)
    console.log(todos.items)
    
} else if (e.target.name === 'priorityUp') {
    todos.priorityUp(todoId)
    console.log(todos.items)
    todoList.insertBefore(li, li.previousElementSibling)
}
} 

