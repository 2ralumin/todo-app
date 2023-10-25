const list = document.getElementById("list");
const createBtn = document.getElementById("create-btn");

let todos = [];


createBtn.addEventListener('click',createNewTodo);

function createNewTodo(){
  item = {
    id : new Date().getTime(),
    title : "",
    done : false
  } //할 일

  todos.unshift(item);

  const {itemEl, inputEl} = createTodoElement(item);

  list.prepend(itemEl);

  inputEl.removeAttribute("disabled");
  inputEl.focus();

  saveToLocalStorage();

}

function createTodoElement(item){
  const itemEl = document.createElement("div");
  itemEl.classList.add("item");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = item.done;

  if(item.done){
    itemEl.classList.add("done");
  }

  const inputEl = document.createElement("input");
  inputEl.type = "text";
  inputEl.value = item.title;
  inputEl.setAttribute("disabled","");
  
  const actionsEl = document.createElement("div");
  actionsEl.classList.add("actions");

  const editBtn = document.createElement("button");
  editBtn.classList.add("material-icons");
  editBtn.innerText = "edit"

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("material-icons", "remove-btn");
  removeBtn.innerText = "remove_circle";

  actionsEl.append(editBtn);
  actionsEl.append(removeBtn);

  itemEl.append(checkbox);
  itemEl.append(inputEl);
  itemEl.append(actionsEl);

  checkbox.addEventListener("change", () => {
    item.done = checkbox.checked;
  
    if(item.done){
      itemEl.classList.add("complete");
    }else{
      itemEl.classList.remove("complete");
    }
  
    saveToLocalStorage();
  });
  
  inputEl.addEventListener("input", () => {
    item.title = inputEl.value;
  });
  
  inputEl.addEventListener("blur", () => {
    inputEl.setAttribute("disabled", "");
    saveToLocalStorage();
  });
  
  editBtn.addEventListener("click", () => {
    inputEl.removeAttribute("disabled");
    inputEl.focus();
  });
  
  removeBtn.addEventListener("click", () => {
    todos = todos.filter(t => t.id != item.id);
    itemEl.remove();
    saveToLocalStorage();
  });

  return {itemEl, inputEl, editBtn, removeBtn};

}

function saveToLocalStorage(){
  const data = JSON.stringify(todos);
  localStorage.setItem("my_todos", data);
}

function loadFromLocalStorage(){
  const data = localStorage.getItem("my_todos");

  if(data){
    todos = JSON.parse(data);
  }
}

function displayTodos(){
  loadFromLocalStorage();

  for (let index = 0; index < todos.length; index++) {
    const item = todos[index];
    
    const {itemEl} = createTodoElement(item);

    list.append(itemEl);
  }
}

displayTodos();