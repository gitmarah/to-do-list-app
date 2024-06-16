//GLOBAL VARIABLES
const todoField = document.getElementById("to-do-name");
const dateField = document.getElementById("date");
const timeField = document.getElementById("time");
const submitBtn = document.getElementById("submit");
const todoDisplay = document.querySelector(".to-do-display");
let inputDate;
let nowDate;

//GETS TODO (LOCALSTORAGE)
let todos;
if(JSON.parse(localStorage.getItem('todos'))){
    todos = JSON.parse(localStorage.getItem('todos'));
}else{
    todos = [];
}

//DISPLAYS TODO
displayTodo();
setInterval(displayTodo, 60000);

//METHOD TO DISPLAY TODO
function displayTodo(){
    updateTimeLeft();
    todoDisplay.innerHTML = '';
    todos.forEach((todo, index) => {

        //SENDS NOTIFICATION
        if(todo.minutes === 0 && todo.days === 0 && todo.hours === 0){
            const notification = new Notification("Tela Todo List", {
                body: `You have a TO-DO: ${todo.todoName} at ${todo.time}`,
                icon: "TelaStudio Logo.png",
                tag: "Alarm sent",
            });
        }

        //DELETES TODO AUTOMATICALLY
        if (todo.minutes < 0){
            const newTodos = JSON.parse(localStorage.getItem('todos'));
            newTodos.splice(index, 1);
            localStorage.setItem('todos', JSON.stringify(newTodos));
        }else{
            todoDisplay.innerHTML += `
            <section class="to-dos">
                <p class="to-do-name">${todo.todoName}</p>
                <div>
                    <p class="date">${todo.date}</p>
                    <p class="time">${todo.time}</p>
                </div>
                <p class="remaining-time">${todo.days} day(s) ${todo.hours} hours(s) ${todo.minutes} minutes(s) remaining</p>
                <button class="delete-btn" type="button">Delete</button>
            </section>`;
        }
        
    });
    
    //DELETE BUTTON EVENT LISTENER
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

    //LOCAL VARIABLES & FORMATS DATE
    const dateString = dateField.value;
    const dateObject = new Date(Date.parse(dateString));
    const formattedDate = `${dateObject.toLocaleDateString('en-US', {day: 'numeric'})} ${dateObject.toLocaleDateString('en-US', {month: 'long'})}, ${dateObject.toLocaleDateString('en-US', {year: 'numeric'})}`;
    nowDate = new Date();
    const standardTime = timeField.value;
    const timeArray = standardTime.split(':');
    inputDate = new Date(`${dateString}`);
    inputDate.setHours(timeArray[0], timeArray[1]);
    
    //INPUT VALIDATION
    if(todoField.value === '' || dateField.value === '' || dateField.value === ''){
        document.querySelector('.js-error-handling')
            .style.color = '#e11727';
        document.querySelector('.js-error-handling')
            .style.display = 'flex';
    }else if(nowDate >= inputDate){
        document.querySelector('.js-error-handling')
            .innerHTML = 'Invalid Date or Time';
        document.querySelector('.js-error-handling')
            .style.color = '#e11727';
        document.querySelector('.js-error-handling')
            .style.display = 'flex';
    }else{
        document.querySelector('.js-error-handling')
            .style.display = 'none';
        const newTodo = {
            todoName: todoField.value.trim(),
            date: formattedDate,
            time: timeField.value,
            formattedDate: inputDate,
            days: 0,
            hours: 0,
            minutes: 0,
        }
        
        //ADDS TO-DO & SENDS TO LOCALSTORAGE
        todos.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(todos));
        displayTodo();
        todoField.value = '';
        dateField.value = '';
        timeField.value ='';
    }
}

//ADD TO-DO BUTTON
submitBtn.addEventListener('click', (event) => {
    addTodo();
});

//METHOD TO UPDATE REMAINING TIME 
function updateTimeLeft(){
    todos.forEach((todo) => {
        const currentDate = new Date();
        const timeDifference = Date.parse(todo.formattedDate) - currentDate;
        const days = Math.floor(timeDifference / (1000*60*60*24));
        const hours = Math.floor(timeDifference % (1000*60*60*24) / (1000*60*60));
        const minutes = Math.floor(timeDifference % (1000*60*60) / (1000*60));
        todo.days = days;
        todo.hours = hours;
        todo.minutes = minutes;
        localStorage.setItem('todos', JSON.stringify(todos));
    });
}
