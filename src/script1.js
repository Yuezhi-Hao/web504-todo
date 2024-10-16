//firebase config 
// Your web app's Firebase configuration

// Initialise Firebase
const app = initializeApp(firebaseConfig);
const database = firebase.database();
const todoRef = firebase.database().ref("todo");
//Select DOM elements
const addToDoButton = document.getElementById("add-todo-btn");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const prioritySelect = document.getElementById("priority-select");
const searchInput = document.getElementById("search-input");
const darkToggle = document.getElementById("dark-mode-toggle");

//Event listener to add Todo item

addToDoButton.addEventListener("click", () => {
    const todoText = todoInput.value.trim();
    const priority = prioritySelect.value
    if(todoText > 0) {
        //Create a new reference in the database for a new todo item
        const newTodoRef = todoRef.push()
        const currentDate = new Date().toLocaleDateString()
        //Set the new todo items properties in firebase
        newTodoRef.set({
            text: todoText,
            completed: false,
            date: currentDate,
            priority: priority,
            catagory: "general" //Add a default catagory for time being
        })
        //Clear the input after adding the todo
        todoInput = ""; 
    }
});

//Add keypress event to add todo with "Enter" key
todoInput.addEventListener("keypress", (e) => {
    if(e.key === "Enter") {
        addToDoButton.click()
    }
});

//Event listener to Toggle Dark Mode
darkToggle.addEventListener("Click", () => {
    document.body.classList.toggle("dark-mode")
});

if(todoItem.completed) {
    statusIcon.classList.add("completed")
    statusbar.InnerHTML = '<i class = "fas fa-check"></i>'
} else if (todoItem.priority === "high") {
    statusIcon.classList.add("priority")
    statusIcon.InnerHTML = '<i class = "fa-exclamation-circle"</i>'
} else if (todoItem.priority === 'medium') {
    statusIcon.classList.add('in-progress');
    statusIcon.innerHTML = '<i class="fas fa-hourglass-half"></i>';
} else if (todoItem.priority === 'low') {
    statusIcon.classList.add('waiting');
    statusIcon.innerHTML = '<i class="fas fa-pause"></i>';
} else {
    statusIcon.classList.add('unfinished');
    statusIcon.innerHTML = '<i class="fas fa-times"></i>';
}
todoContent.appendChild(statusIcon);

//display the todo text
const todoTextSpan = document.createElement('span')
todoTextSpan.textContent = `${todoItem.text}`
if(todoItem.completed) {
    todoTextSpan.classList.add("completed") //Style the text if completed
}
todoContent.appendChild(todoTextSpan);

//create an edit button

const editBtn = document.createElement('i')
editBtn.classList.add('fas', 'fa-edit', 'edit-btn')
editBtn.addEventListener("click", (e) => {
    e.stopPropagation() //prevent click from toggling completion
    const editInput = document.createElement("input")
    editInput.type = "text"
    editInput.classList.add('todo-input-edit')
    editInput.value = todoItem.text
    todoContent.replaceChild(editInput, todoTextSpan) //to replace text with input field
    editInput.focus();

    //when editing is complete on losing focus
    editInput.addEventListener("blur", () => {
        const updatedText = editInput.value.trim()
        if(updatedText.length > 0) {
            //update the todo text and date in Firebase
            todoRef.child(todoKey).update({
                text: updatedText,
                date: new Date().toLocaleDateString()
            }) }
            else {
                //revert to original text if no valid input
                todoContent.replaceChild(todoTextSpan, editInput)
            } 
    });
});

//create a complete button
const completeBtn = document.createElement("i")
completeBtn.classList.add("fas", "fa-check", "complete-btn")
completeBtn.addEventListener('click', (e) => {
    e.stopPropagation() //prevent click from triggering other actions
    //toggle the completion status of the todo item
        todoRef.child(todoKey).update({
        complete: !todoItem.completed,

    });
});

//create an undo button for completed task
const undoBtn = document.createElement("i")
undoBtn.classList.add("fas", "fa-undo", "undo-btn")
undoBtn.addEventListener("click", (e) => {
e.stopPropagation() //prevent click from triggering any other actions
//set the task as incomplete
todoRef.child(todoKey).update({
    complete: false,
 })
})

//create a delete button

const deleteBtn = document.createElement("i")
deleteBtn.classList.add("fas", "fa-delete", "delete-btn")
deleteBtn.addEventListener("click", (e) => {
e.stopPropagation() //prevent click from triggerings any other action
//remove the todo item from firebase
todoRef.child(todoKey).remove();
});

li.appendChild(todoContent)
if(todoItem.complete) {
    li.appendChild(undoBtn) // add undo button only if the task is completed
} else{
    li.appendChild(completeBtn) // add complete button if the task is not completed
}

li.appendChild(editBtn)
li.appendChild(deleteBtn)
todoList.appendChild(li) //add the list item to the todo list UI
