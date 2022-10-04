const form = document.querySelector("form")
const input = document.querySelector("#new-todo")
const button = document.querySelector("#add")
const formAlert = document.querySelector("#form-alert")
const todoAlert = document.querySelector("#todos-alert")
const ul = document.querySelector("ul")

addEventListener("load", (e) => {
  const todos = getTodos() || []
  if (todos.length === 0) showTodoAlert(true)
  else {
    showTodoAlert(false)
    showTodos(todos)
  }
})

form.addEventListener("submit", (e) => {
  e.preventDefault()
  if (inputChecker()) setTodos(input.value.trim())
})

input.addEventListener("keyup", (e) => {
  inputChecker()
})

function inputChecker() {
  if (input.value.trim().length) {
    button.removeAttribute("disabled")
    formAlert.classList.add("hide")
    return true
  } else {
    button.setAttribute("disabled", "")
    formAlert.classList.remove("hide")
  }
}

function getTodos() {
  return JSON.parse(localStorage.getItem("todos"))
}

function setTodos(newTodo) {
  const todos = getTodos() || []
  todos.push({ didIt: false, name: newTodo })
  localStorage.setItem("todos", JSON.stringify(todos))
  showTodoAlert(false)
  showTodos(todos)
  input.value = ""
}

function showTodoAlert(hasNoTodo) {
  if (hasNoTodo) todoAlert.classList.remove("hide")
  else todoAlert.classList.add("hide")
}

function showTodos(todos) {
  ul.innerHTML = ""

  const uncompleted = printTodos(todos, false)

  if (todos.length > uncompleted) {
    const completed = document.createElement("h2")
    completed.innerHTML = `Completed (${todos.length - uncompleted})`
    ul.appendChild(completed)
  }
  if (uncompleted === 0) showTodoAlert(true)
  else showTodoAlert(false)

  printTodos(todos, true)

  if (todos.length > uncompleted) {
    const clearCompleted = document.createElement("div")
    clearCompleted.id = "clear"
    clearCompleted.setAttribute("onclick", "clearCompleted()")
    clearCompleted.innerHTML = `Clear Completed Todo's`
    ul.appendChild(clearCompleted)
  }
}

function printTodos(todos, completed) {
  let uncompleted = 0
  todos.map(({ didIt, name }, index) => {
    const li = document.createElement("li")
    if (didIt === completed) {
      li.innerHTML = `
  <div class="todo" onclick="didTodo(${index})">${name}</div>
  <div class="remove" onclick="removeTodo(${index})">X</div>`
      ul.appendChild(li)
      if (!completed) uncompleted++
    }
  })
  return uncompleted
}

function clearCompleted() {
  let todos = getTodos().filter(({ didIt }) => !didIt)
  localStorage.setItem("todos", JSON.stringify(todos))
  showTodos(todos)
}

function removeTodo(todoId) {
  let todos = getTodos()
  todos = todos.filter((todo, index) => index !== todoId)
  localStorage.setItem("todos", JSON.stringify(todos))
  showTodos(todos)
}

function didTodo(todoId) {
  let todos = getTodos()
  todos = todos.map((todo, index) => {
    if (index === todoId) todo.didIt = !todo.didIt
    return todo
  })

  localStorage.setItem("todos", JSON.stringify(todos))
  showTodos(todos)
}
