const todoInput = document.getElementById("todo_input");
const todoBtn = document.getElementById("todo_button");
const todoList = document.querySelector(".todo_list");
const filterSelect = document.querySelector(".filter_select");

let todos = [];

// 이벤트
window.addEventListener("DOMContentLoaded", loadTodo);
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", handleBtn);
filterSelect.addEventListener("click", filterTodo);

//함수
function deleteTodo(e) {
  console.log(e.target.parentElement.children[0].innerText);
  const text = e.target.parentElement.children[0].innerText;
  console.log(todos);
  todos.splice(todos.indexOf(text), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodo() {
  if (localStorage.getItem("todos") === null) return;

  todos = JSON.parse(localStorage.getItem("todos"));
  todos.forEach((todo) => {
    paintTodo(todo);
  });
}

function saveTodo(todo) {
  todos.push(todo);
  console.log(todos);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function filterTodo(e) {
  // console.log(e.target.value);
  // console.log(todoList.childNodes);

  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "finished":
        todo.classList.contains("finished") ? (todo.style.display = "flex") : (todo.style.display = "none");
        break;
      case "unfinished":
        !todo.classList.contains("finished") ? (todo.style.display = "flex") : (todo.style.display = "none");
        break;
    }
  });
}

function handleBtn(e) {
  if (e.target.classList[0] === "delete_btn") {
    e.target.parentElement.remove();
    deleteTodo(e);
  }

  if (e.target.classList[0] === "check_btn") {
    e.target.parentElement.classList.toggle("finished");

    if (e.target.parentElement.classList.contains("finished")) {
      e.target.children[0].classList = "xi-check-circle";
    } else {
      e.target.children[0].classList = "xi-check-circle-o";
    }
  }
}

function paintTodo(todo) {
  const todoItem = document.createElement("li");
  todoItem.classList = "todo_item";
  const todoText = document.createElement("h4");
  todoText.innerText = todo;
  const checkBtn = document.createElement("button");
  checkBtn.innerHTML = '<i class="xi-check-circle-o"></i>';
  checkBtn.classList = "check_btn";
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="xi-trash"></i>';
  deleteBtn.classList = "delete_btn";

  todoItem.appendChild(todoText);
  todoItem.appendChild(checkBtn);
  todoItem.appendChild(deleteBtn);
  todoList.appendChild(todoItem);
}

function addTodo(e) {
  e.preventDefault();

  const todoText = todoInput.value;
  paintTodo(todoText);
  saveTodo(todoText);

  todoInput.value = "";
}
