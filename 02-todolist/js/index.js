const form = document.querySelector("form")
const input = document.querySelector("#new-todo")
const button = document.querySelector("#add")
const formAlert = document.querySelector("#form-alert")
const todoAlert = document.querySelector("#todos-alert")
const ul = document.querySelector("ul")

input.addEventListener("keyup", (e) => {
  if (e.target.value.trim().length) {
    button.removeAttribute("disabled")
    formAlert.classList.add("hide")
  } else {
    button.setAttribute("disabled", "")
    formAlert.classList.remove("hide")
  }
})

form.addEventListener("submit", (e) => {
  e.preventDefault()
  if (input.value.trim().length) {
    button.removeAttribute("disabled")
    formAlert.classList.add("hide")
    setTodos(input.value.trim())
  } else {
    button.setAttribute("disabled", "")
    formAlert.classList.remove("hide")
  }
})

addEventListener("load", (e) => {
  // e.preventDefault()
  const todos = getTodos() || []
  if (todos.length === 0) showTodoAlert(true)
  else {
    showTodoAlert(false)
    showTodos(todos)
  }
})

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
  let uncompleted = 0
  todos.map(({ didIt, name }, index) => {
    const li = document.createElement("li")
    if (!didIt) {
      li.innerHTML = `
    <div class="todo" onclick="didTodo(${index})">${name}</div>
    <div class="remove" onclick="removeTodo(${index})">X</div>`
      ul.appendChild(li)
      uncompleted++
    }
  })

  if (todos.length > uncompleted) {
    const completed = document.createElement("h2")
    completed.innerHTML = `Completed (${todos.length - uncompleted})`
    ul.appendChild(completed)
  }
  if (uncompleted === 0) showTodoAlert(true)
  if (uncompleted) showTodoAlert(false)
  todos.map(({ didIt, name }, index) => {
    const li = document.createElement("li")
    li.classList.add("did-it")
    if (didIt) {
      li.innerHTML = `
    <div class="todo" onclick="didTodo(${index})">${name}</div>
    <div class="remove" onclick="removeTodo(${index})">X</div>`
      ul.appendChild(li)
    }
  })
  if (todos.length > uncompleted) {
    const clearCompleted = document.createElement("div")
    clearCompleted.id = "clear"
    clearCompleted.setAttribute("onclick", "clearCompleted()")
    clearCompleted.innerHTML = `Clear Completed Todo's`
    ul.appendChild(clearCompleted)
  }
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
