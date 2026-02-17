const todoForm = document.querySelector('form');             //Points to the form, so we can know when the user submits something, and the value will be pass to its JS reference "todoForm".
const todoInput = document.getElementById('todo-input');     //Points to the input field, so we can get what the user typed, so we have something to display, reference yung  todoInput.
const todoListUL = document.getElementById('todo-list');     //Now this is the line responsible for displaying the user inputs in our screen. Adds and uptae the list, reference yung todoListUL.

let allTodos = getTodos();                                   //This was like "let allTodos = []" before, but the problem there was that it never store the todos everytime the page loads. 
updateTodoList();                                            /*So, I changed it into getTodos(), so it can retrieve data from the local storage
                                                                Then, updateTodoList() to update the todo-list, like when we add new tasks to the list.*/

todoForm.addEventListener('submit', function(e){            //Adds the event listener to the form, so when we click the add-button, this function will run.
    e.preventDefault();                                     //The e.preventDefault() prevents reloading the page when the form collects the data, since we might loose what we type in the form. 
    addTodo();                                              //This is the function when we takes input, under this function we also have the save and update function, so it updates the list and also  save it to the local storage. 
})

function addTodo(){                                        
    const todoText = todoInput.value.trim();                //This line gets the data from the input field, then trim the spaces, then pass it to the "todoText".
    if (todoText.length > 0){                               //This is to make sure the user actually typed something, which prevents empty task  in our list. Length = number of characters in the string.
        const todoObject = {                                //We created an objects for our todo data, so we can group them; text - for the text the user typed, completed - this is flag to track is the task is done (false for not finish, true for  complete)
            text: todoText,                                 //The object is inside the if statement, to make sure that we really have something to store, not empty spaces to store. We do not need to create objects, when it is all empty spaces.
            completed: false
        }
        allTodos.push(todoObject);                          //This lines adds the new todoObject we created to our array "allTodos", so it can be add to our list. 
        updateTodoList();                                   //Calls this function to refresh the list on the page, so new task appears.
        saveTodos();                                        //Saves the tasks on the localStorage, so  even we reload the page, the tasks are still there.
        todoInput.value = "";                               //This clears the input field after the submission. 
    }
}

function updateTodoList(){                                              
    todoListUL.innerHTML = "";                              //todoListUL - reference to the <ul> element, where todos are displayed. .innerHTML = "" - clears all existing <li> insde the <ul>.  //So, we can ensure that there won't be duplications. 
    allTodos.forEach((todo, todoIndex)=>{                   //This is foreach loops, where it loops through each elements in an array; todo - is the current element in an array or the one that holds the value for todoObject, while the todoIndex - is the postion of the element in the array. And thsi enable us to do something about the arrays. 
        todoItem = createTodoItem(todo, todoIndex);         // Calls the function createTodoItem() and passes  the todo(current) and todoIndex(postion), so it can turn as visible HTML so browser can undeerstand it and display the tasks on the screen.
        todoListUL.append(todoItem);                        // Adds new <li> element to the <ul> element in the html, the "todoItem" is the <li> element that holds the current todo.
    })
}


function createTodoItem(todo, todoIndex){
    const todoId = "todo-"+todoIndex;                       //This line makes unique id for each todo's checkbox(todo-0, so on...), we need this so the browser would know which labels belong to which checkbox.
    const todoLI = document.createElement("li");            //This createw new html element and <li> specifies the type of element. We need this because the app stores todos in JS object, and the browser cannot understand that, that is why we create html element to make browser understand our data.
    const todoText = todo.text;                             //Gets the text from the todo object so we can display it in HTML
    todoLI.className = "todo";                              //Give the <li> elements  the classname "todo", so they all have the same styling and design.
    todoLI.innerText = todo.text;                           //Sets the text inside the <li>
    todoLI.innerHTML = `                                    
        <input type="checkbox" id="${todoId}">
                <label class="custom-checkbox" for="${todoId}">
                    <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                        <path d="M718-313 604-426l57-56 57 56 141-141 57 56-198 198ZM440-501Zm0 381L313-234q-72-65-123.5-116t-85-96q-33.5-45-49-87T40-621q0-94 63-156.5T260-840q52 0 99 22t81 62q34-40 81-62t99-22q81 0 136 45.5T831-680h-85q-18-40-53-60t-73-20q-51 0-88 27.5T463-660h-46q-31-45-70.5-72.5T260-760q-57 0-98.5 39.5T120-621q0 33 14 67t50 78.5q36 44.5 98 104T440-228q26-23 61-53t56-50l9 9 19.5 19.5L605-283l9 9q-22 20-56 49.5T498-172l-58 52Z"/>
                    </svg>  
                </label>
                <label for="${todoId}" class="todo-text">
                    ${todoText}
                </label>
                <button class = "edit-button">Edit</button>
                
                <button class="delete-button">
                    <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                    </svg>
                </button>
    `;                                                                 //Fills the <li> with all the html needed for a todo; ${todoId} - ensures each checkbox and label pair is unique, ${todoText} - displays the actual todo task typed by the user.

    const deleteButton = todoLI.querySelector(".delete-button");       //Finds the delete-button 
    deleteButton.addEventListener("click", ()=>{                       //Adds click event listener, and when the button is clicked, it calls the deleteTodoItem(todoIndex)
        deleteTodoItem(todoIndex);                                     // And remove the task from the array, and update the page.
    })

    const checkbox = todoLI.querySelector("input");                    //Finds the checkbox, which is stored in the variable called "checkbox"
    checkbox.addEventListener("change", ()=>{                          //Eventlisterner for checkbox which performs checked or unchecked
        allTodos[todoIndex].completed = checkbox.checked;              //This updates the todo object's completed status: checkbox.checked - true if check, false if not.
        saveTodos();                                                   //Saves the updated list in local storage
    })
    checkbox.checked = todo.completed;  


    const editButton = todoLI.querySelector(".edit-button");
    const textLabel = todoLI.querySelector(".todo-text");

    editButton.addEventListener("click", () => {
        const input = document.createElement("input");
        input.type = "text";
        input.value = todo.text;

        todoLI.replaceChild(input, textLabel);
        input.focus();

        const finish = () => {
            allTodos[todoIndex].text = input.value.trim() || todo.text;
            saveTodos();
            updateTodoList();
        };

        input.addEventListener("keydown", e => e.key === "Enter" && finish());
        input.addEventListener("blur",)
    })
    return todoLI;                                                     //Sends back the element, so it can be display on the page.
}

function deleteTodoItem(todoIndex){                                    
    allTodos = allTodos.filter((_, i)=> i !== todoIndex);
    saveTodos();
    updateTodoList();

}

function saveTodos(){
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem("todos", todosJson);
}

function getTodos(){
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}

