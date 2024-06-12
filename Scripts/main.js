let todos;
if(JSON.parse(localStorage.getItem('todos'))){
    todos = JSON.parse(localStorage.getItem('todos'));
}else{
    todos = [];
}
const todoField = document.getElementById("to-do-name");
const dateField = document.getElementById("date");
const timeField = document.getElementById("time");
const submitBtn = document.getElementById("submit");
const todoDisplay = document.querySelector(".to-do-display");
displayTodo();
function displayTodo(){
    todoDisplay.innerHTML = '';
    todos.forEach((todo) => {
        todoDisplay.innerHTML += `
            <section class="to-dos">
                <p class="to-do-name">${todo.todoName}</p>
                <div>
                    <p class="date">${todo.date}</p>
                    <p class="time">${todo.time}</p>
                </div>
                <button class="delete-btn" type="button">Delete</button>
            </section>`;
    });
    const deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach((deleteBtn, index) => { 
        deleteBtn.addEventListener('click', () => {
            todos.splice(index, 1);
            const newTodos = JSON.parse(localStorage.getItem('todos'));
            newTodos.splice(index, 1);
            localStorage.setItem('todos', JSON.stringify(newTodos));
            displayTodo();
        });
    });
}

function addTodo(){
    if(todoField.value === '' || dateField.value === '' || dateField.value === ''){
        document.querySelector('.js-error-handling')
            .style.color = '#e11727';
        document.querySelector('.js-error-handling')
            .style.display = 'flex';
    }else{
        document.querySelector('.js-error-handling')
            .style.display = 'none';
        const dateString = dateField.value;
        const dateObject = new Date(Date.parse(dateString));
        const formattedDate = `${dateObject.toLocaleDateString('en-US', {day: 'numeric'})} ${dateObject.toLocaleDateString('en-US', {month: 'long'})}, ${dateObject.toLocaleDateString('en-US', {year: 'numeric'})}`;
        const newTodo = {
            todoName: todoField.value.trim(),
            date: formattedDate,
            time: time.value,
            remainingTime: ""
        }
        todos.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(todos));
        displayTodo();
        todoField.value = '';
        dateField.value = '';
        timeField.value ='';
    }
}

submitBtn.addEventListener('click', (event) => {
    addTodo();
});


