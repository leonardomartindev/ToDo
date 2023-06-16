// Seleção de principais elementos visuais
const input = document.querySelector(".form-input-btn input");
const addBtn = document.querySelector(".form-input-btn button");
const qtdTasks = document.querySelector(".container-span .qtd-tasks");
const qtdFinishTasks = document.querySelector(".container-span .qtd-finish-tasks");
const tasksHtmlContainer = document.querySelector(".tasks");
const popup = document.querySelector(".popup")

// const task = document.querySelector(".task");
// Declaração de arrays que vai conter os objetos que serão cada uma das tasks
const tasks = [];

// função de criação de elementos da task
function createTask(name) {
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task");

  const circleContainer = document.createElement("div");
  circleContainer.classList.add("circle-name-container");

  const divCircle = document.createElement("div");
  divCircle.classList.add("circle");

  const namePTask = document.createElement("p");
  namePTask.classList.add("name-task");
  namePTask.innerText = name;

  const iconContainer = document.createElement("div");
  iconContainer.classList.add("icon");

  const editIcon = document.createElement("i");
  editIcon.classList.add("fa-solid");
  editIcon.classList.add("fa-pen");

  const trashIcon = document.createElement("i");
  trashIcon.classList.add("fa-solid");
  trashIcon.classList.add("fa-trash");

  taskContainer.appendChild(circleContainer);
  taskContainer.appendChild(iconContainer);
  circleContainer.appendChild(divCircle);
  circleContainer.appendChild(namePTask);
  iconContainer.appendChild(editIcon);
  iconContainer.appendChild(trashIcon);

  return taskContainer;
}

// Event listener no botão para criar tarefa
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const valueInput = input.value;

  if (!valueInput) return;

  addTask(valueInput);
  input.value = ""; // Limpa o campo de entrada
});

function addTask(name, status) {
  const newTask = {
    name: name,
    finished: status || false
  };

  tasks.push(newTask);
  createTasks();
}

function createTasks() {
  tasksHtmlContainer.innerHTML = ""; // Limpa o conteúdo anterior

  tasks.forEach((task) => {
    const taskElement = createTask(task.name);
    tasksHtmlContainer.appendChild(taskElement);
  });
    const finishedTasks = tasks.filter(task => task.finished === true);
    const finisheLength = finishedTasks.length;
    qtdFinishTasks.innerText = `${finisheLength} de ${tasks.length}`
    qtdTasks.innerText = tasks.length
}


document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div")
    
    if(targetEl.classList.contains("circle")){
        targetEl.classList.toggle("completed-cricle")
        const nameTaskContainer = targetEl.closest(".circle-name-container")
        nameTaskContainer.classList.toggle("completed-text")
        const nameValue = nameTaskContainer.querySelector(".name-task").innerText
        console.log(nameValue)
    }
    if(targetEl.classList.contains("fa-pen")){
        const editTask = document.querySelector("#edit-task")
        const divIcon = targetEl.closest("div")
        const divTaskName = divIcon.previousElementSibling
        editTask.value = divTaskName.querySelector("p").innerText 
        popup.classList.remove("hide")
        document.addEventListener("click", (e) =>{
            if(e.target.classList.contains("popup")){
                popup.classList.add("hide")
            }
            if(e.target.classList.contains("fa-square-check")){
                console.log("")
            }
        })
    }
})