let todoArray = [];

// access input field
const input = document.querySelector('#todo-input')

// Listening to click event from "Add" button.
document.querySelector('#submit').addEventListener('click', () => {
    // value of the input field
    const inputData = input.value
    input.value = ''

    todoArray.push(inputData);

    console.log('Current todoArray:', todoArray);

    // creating todo item element
    const todo_el = document.createElement('div')
    todo_el.classList.add('todo-item')

    const todo_content_el = document.createElement('div')
    todo_el.appendChild(todo_content_el)

    const todo_input_el = document.createElement('input')
    todo_input_el.classList.add('text')
    todo_input_el.type = 'text'
    todo_input_el.value = inputData
    todo_input_el.setAttribute('readonly', 'readonly')

    todo_content_el.appendChild(todo_input_el)

    const todo_actions_el = document.createElement('div')
    todo_actions_el.classList.add('action-items')

    const todo_done_el = document.createElement('i')
    todo_done_el.classList.add('fa-solid')
    todo_done_el.classList.add('fa-check')

    const todo_edit_el = document.createElement('i')
    todo_edit_el.classList.add('fa-solid')
    todo_edit_el.classList.add('fa-pen-to-square')
    todo_edit_el.classList.add('edit')

    const todo_delete_el = document.createElement('i')
    todo_delete_el.classList.add('fa-solid')
    todo_delete_el.classList.add('fa-trash')

    todo_actions_el.appendChild(todo_done_el)
    todo_actions_el.appendChild(todo_edit_el)
    todo_actions_el.appendChild(todo_delete_el)

    todo_el.appendChild(todo_actions_el)
    console.log(todo_el)
    // add the todo-item to lists
    document.querySelector('.todo-lists').appendChild(todo_el)

    // done functionality
    todo_done_el.addEventListener('click', () => {
        todo_input_el.classList.add('done')
        todo_el.removeChild(todo_actions_el)
    })

    // edit functionality
    todo_edit_el.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        console.log(index)
        if (todo_edit_el.classList.contains('edit')) {
            todo_edit_el.classList.remove('edit')
            todo_edit_el.classList.remove('fa-pen-to-square')
            todo_edit_el.classList.add('fa-x')
            todo_edit_el.classList.add('save')
            todo_input_el.removeAttribute('readonly')
            todo_input_el.focus()
        } else {
            todo_edit_el.classList.remove('save')
            todo_edit_el.classList.remove('fa-x')
            todo_edit_el.classList.add('fa-pen-to-square')
            todo_edit_el.classList.add('edit')
            todo_input_el.setAttribute('readonly', 'readonly')
        }
        // Update the todoArray with the new value
        if (index > -1) {
            todoArray.splice(index, 1, todo_input_el.value);
            console.log('Updated array:', todoArray);
        }
    })

// delete functionality
todo_delete_el.addEventListener('click', (e) => {
    const index = todoArray.indexOf(todo_input_el.value);

    // Remove the element from the array
    if (index > -1) {
        todoArray.splice(index, 1);
        console.log('Array after deletion:', todoArray);
    }

    document.querySelector('.todo-lists').removeChild(todo_el)
    })
})

todo_edit_el.addEventListener('click', (e) => {
    const index = e.target.dataset.index;
    
    if (index !== undefined) {
        if (todo_edit_el.classList.contains('edit')) {
            // Enter edit mode
            todo_edit_el.classList.remove('edit', 'fa-pen-to-square');
            todo_edit_el.classList.add('fa-x', 'save');
            todo_input_el.removeAttribute('readonly');
            todo_input_el.focus();
        } else {
            // Save changes
            todo_edit_el.classList.remove('save', 'fa-x');
            todo_edit_el.classList.add('fa-pen-to-square', 'edit');
            todo_input_el.setAttribute('readonly', 'readonly');

            // Update the todoArray with the new value
            todoArray[index] = todo_input_el.value;
            console.log('Updated array:', todoArray);
        }
    }
});


todo_delete_el.addEventListener('click', (e) => {
    const index = e.target.dataset.index;
    if (index !== undefined) {
        // Remove the item from the array
        todoArray.splice(index, 1);
        console.log('Array after deletion:', todoArray);

        // Remove the todo item from the DOM
        document.querySelector('.todo-lists').removeChild(todo_el);

        // Update indexes
        updateIndexes();
    }
});

function updateIndexes() {
  const todoItems = document.querySelectorAll('.todo-item')
todoItems.forEach((item, newIndex) => {
  item.dataset.index = newIndex

  //Update data-index for edit button
  const editButton = item.querySelector('.edit, .save')
 if(editButton) editButton.dataset.index = newIndex

 //Update data-index for delete button

 const deleteButton = item.querySelector('.fa-trash')
 if(deleteButton) deleteButton.dataset.index = newIndex
})

}

// Insdie the delete event listener make sure you have the following

updateIndexes()
