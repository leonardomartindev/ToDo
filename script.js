// Seleção de principais elementos visuais
const input = document.querySelector(".form-input-btn input");
const addBtn = document.querySelector(".form-input-btn button");
const qtdTasks = document.querySelector(".container-span .qtd-tasks");
const qtdFinishTasks = document.querySelector(".container-span .qtd-finish-tasks");
// const task = document.querySelector(".task");
//Declaração de arrays que vai conter os objetos que serão cada uma das tasks
const tasks = [];

// função de criação de elementos da task
function createTasks(){
    const task = document.querySelector(".task");
    const tasksContainer = document.createElement("div")
    tasksContainer.classList.add("task")
    const divCircleNameContainer = document.createElement("div")
    divCircleNameContainer.classList.add("circle-name-container")
    const divCircle = document.createElement("div")
    divCircle.classList.add("circle")
    const icon = document.createElement("div")
    icon.classList.add("icon")
    const editIcon = document.createElement("i")
    const trashIcon = document.createElement("i")
    editIcon.classList.add("fa-solid")
    editIcon.classList.add("fa-pen")
    trashIcon.classList.add("fa-solid")
    trashIcon.classList.add("fa-trash")
    const name = document.createElement("p")
    name.innerText = valueInput
    
    tasksContainer.appendChild(divCircleNameContainer)
    tasksContainer.appendChild(icon)
    divCircleNameContainer.appendChild(divCircle)
    divCircleNameContainer.appendChild(name)
    icon.appendChild(editIcon)
    icon.appendChild(trashIcon)
    
    
    task.appendChild(tasksContainer)
}

// event listenner no botão para criar tarefa


addBtn.addEventListener("click", (e)=>{
    const valueInput = input.value;
    e.preventDefault()
    if(!valueInput)return
    addTask(valueInput)
    createTasks()


})

function addTask(name, status ){
    const newTask = {
        name: name,
        finished: status || false
    };

    // createTasks(newTask.name)
    tasks.push(newTask)
}

// console.log(tasksContainer);

// document.addEventListener("click", (e)=>{
//     console.log(e.target)
// })