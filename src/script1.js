//firebase config 
// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyDfwbdmlQl7zX9BDnoCYpWC01RLeBf189A",
  
    authDomain: "my-project-b7492.firebaseapp.com",
  
    projectId: "my-project-b7492",
  
    storageBucket: "my-project-b7492.appspot.com",
  
    messagingSenderId: "31311538636",
  
    appId: "1:31311538636:web:e3c5e1b831692c4cabd569"
  
  };
  
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

