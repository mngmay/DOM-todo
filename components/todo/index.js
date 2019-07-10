class TodoComponent {
  constructor(componentElement) {
    // Assign outer TodoComponent Element. We should do all of our searching within here, not `document`.
    this.componentElement = componentElement;
    // Get the todos container element
    this.todosElement = document.querySelector(".todos-container");
    console.log(this.todosElement);
    // instantiate the Todos class with it
    this.todos = new Todos(this.todosElement);
    console.log(this.todos);
    // Do the same with form Element
    this.formElement = document.querySelector("form");
    console.log(this.formElement);
    // I've given you a hint here. Look at the TodoForm constructor.
    this.form = new TodoForm(this.formElement, this.todos);
    console.log(this.form);
  }
}

class Todos {
  constructor(containerElement) {
    this.containerElement = containerElement;
  }
  addTodo(text) {
    // Add a todo element to the container, and instantiate its class
    let newTodo = document.createElement("div");
    newTodo.textContent = text;
    newTodo.classList.add("todo");
    this.containerElement.appendChild(newTodo);
    newTodo = new Todo(newTodo);
  }
}

class Todo {
  constructor(todoElement) {
    this.todoElement = todoElement;
    // What do we need to add to make our element to make `this.toggle` work?
    this.todoElement.addEventListener("click", () => this.toggle());
  }
  toggle() {
    // Toggle the element being 'done'
    this.todoElement.classList.toggle("done");
    console.log("test");
  }
}

class TodoForm {
  // Note the second argument, `todos`. It is an instance of the `Todos` class
  constructor(formElement, todos) {
    this.formElement = formElement;
    this.todos = todos;
    this.input = this.formElement.querySelector("input");
    this.addButton = this.formElement.querySelector(".add");
    this.addButton.addEventListener("click", () => this.submitTodo());

    // stretch - make a button clear all completed todos
    this.clearButton = this.formElement.querySelector(".clear");
    this.clearButton.addEventListener("click", () => this.clear());

    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event
  }
  submitTodo() {
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
    // see 'value'.
    // We need to actually add a todo to the page. If only we had access to
    // a class that has a member function that does just that.
    event.preventDefault();
    this.todos.addTodo(this.input.value);
    console.log(this.todo);
  }

  clear() {
    event.preventDefault();
    const todos = document.querySelectorAll(".todo");
    console.log(todos);
    todos.forEach(todo => {
      if (todo.classList.contains("done")) {
        todo.classList.add("hide");
      }
    });
  }
}

// Instantiate TodoComponent Classes
document
  .querySelectorAll(".todo-component")
  .forEach(todoElem => new TodoComponent(todoElem));
