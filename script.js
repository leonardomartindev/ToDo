// Seleção de principais elementos visuais
const input = document.querySelector(".form input");
const addBtn = document.querySelector(".form button");
const qtdTasks = document.querySelector(".container-qtd .qtd-tasks");
const qtdFinishTasks = document.querySelector(".container-qtd .qtd-finish-tasks");
const tasksHtmlContainer = document.querySelector(".tasks");
const popup = document.querySelector(".popup");
const completedTasksContainer = document.querySelector(".completed-tasks");
const toggleArrow = document.querySelector(".toggle-arrow");
const toggleTasksBtn = document.querySelector(".toggle-tasks");
const notTaskContainer = document.querySelector(".not-task-container")

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
  input.value = "";
});

function addTask(name, status) {
  const newTask = {
    name: name,
    finished: status || false
  };
  tasks.push(newTask);
  createTasks();
  updateTaskContainers();
}

function updateTaskContainers() {
  if (tasks.length > 0) {
    notTaskContainer.classList.add("hide");
    toggleTasksBtn.classList.remove("hide");
  } else {
    notTaskContainer.classList.remove("hide");
    toggleTasksBtn.classList.add("hide");
  }
}

function createTasks() {
  tasksHtmlContainer.innerHTML = ""; // Limpa o conteúdo anterior

  const unfinishedTasks = tasks.filter((task) => !task.finished);
  qtdTasks.innerText = unfinishedTasks.length; // Atualiza a contagem de tarefas não concluídas

  tasks.forEach((task) => {
    const taskElement = createTask(task.name);
    if (task.finished) {
      taskElement.querySelector(".circle").classList.add("completed-circle");
      taskElement.querySelector(".circle-name-container").classList.add("completed-text");
      taskElement.classList.add("hide");
      completedTasksContainer.appendChild(taskElement);
    } else {
      tasksHtmlContainer.appendChild(taskElement);
    }

    // Event listener para marcar/desmarcar como concluída
    const circle = taskElement.querySelector(".circle");
    circle.addEventListener("click", () => {
      const wasFinished = task.finished; // Armazena o status anterior da tarefa
      task.finished = !task.finished;
      taskElement.classList.toggle("hide");
      circle.classList.toggle("completed-circle");
      taskElement.querySelector(".circle-name-container").classList.toggle("completed-text");

      if (task.finished) {
        completedTasksContainer.appendChild(taskElement);
        qtdTasks.innerText = parseInt(qtdTasks.innerText) - 1;
        qtdFinishTasks.innerText = `Concluídas ${tasks.filter((task) => task.finished).length} de ${tasks.length}`;
      } else {
        tasksHtmlContainer.appendChild(taskElement);
        qtdTasks.innerText = parseInt(qtdTasks.innerText) + 1;
        qtdFinishTasks.innerText = `${tasks.filter((task) => task.finished).length} de ${tasks.length}`;
      }

      updateCompletedTasks(); // Atualiza as tarefas concluídas
      updateTaskContainers(); // Atualiza os contêineres das tarefas
    });

    // Event listener para editar tarefa
    const editIcon = taskElement.querySelector(".fa-pen");
    editIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      const editTask = document.querySelector("#edit-task");
      const namePTask = taskElement.querySelector(".name-task");
      editTask.value = namePTask.innerText;
      popup.classList.remove("hide");
      editTask.focus()
      // Event listener para confirmar a edição ao pressionar enter
      const faSquareCheck = document.querySelector(".fa-square-check")
      faSquareCheck.addEventListener("click", ()=>{
        const updatedTaskName = editTask.value;
        namePTask.innerText = updatedTaskName;
        task.name = updatedTaskName;
        popup.classList.add("hide");
      })
      editTask.addEventListener("keydown", (e) => {
        if (e.keyCode === 13) { 
          const updatedTaskName = editTask.value;
          namePTask.innerText = updatedTaskName;
          task.name = updatedTaskName;
          popup.classList.add("hide");
        }
      });

      popup.addEventListener("click", (e) => {
        if (e.target.classList.contains("popup")) {
          popup.classList.add("hide");
        }
      });
    });

    // Event listener para excluir tarefa
    const trashIcon = taskElement.querySelector(".fa-trash");
    trashIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      const index = tasks.indexOf(task);
      tasks.splice(index, 1);
      taskElement.remove();
      updateCompletedTasks(); // Atualiza as tarefas concluídas
      qtdTasks.innerText = `${tasks.filter((task) => !task.finished).length}`;
      qtdFinishTasks.innerText = `Concluídas ${tasks.filter((task) => task.finished).length} de ${tasks.length}`;
      updateTaskContainers(); // Atualiza os contêineres das tarefas
    });
  });

  updateCompletedTasks(); // Atualiza as tarefas concluídas
  updateTaskContainers(); // Atualiza os contêineres das tarefas
}

toggleTasksBtn.addEventListener("click", () => {
  toggleArrow.classList.toggle("toggle-arrow-rotate");
  completedTasksContainer.classList.toggle("hide");
});

function updateCompletedTasks() {
  completedTasksContainer.innerHTML = "";
  const completedTasks = tasks.filter((task) => task.finished);

  completedTasks.forEach((task) => {
    const taskElement = createTask(task.name);
    taskElement.querySelector(".circle").classList.add("completed-circle");
    taskElement.querySelector(".circle-name-container").classList.add("completed-text");
    completedTasksContainer.appendChild(taskElement);

    // Event listener para marcar/desmarcar como concluída na seção de completedTasks
    const circle = taskElement.querySelector(".circle");
    circle.addEventListener("click", () => {
      task.finished = !task.finished;
      taskElement.remove();
      createTasks();
      updateCompletedTasks(); // Atualiza as tarefas concluídas
      updateTaskContainers(); // Atualiza os contêineres das tarefas
    });

    // Event listener para excluir tarefa na seção de completedTasks
    const trashIcon = taskElement.querySelector(".fa-trash");
    trashIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      const index = tasks.indexOf(task);
      tasks.splice(index, 1);
      taskElement.remove();
      updateCompletedTasks(); // Atualiza as tarefas concluídas
      qtdFinishTasks.innerText = `${tasks.filter((task) => task.finished).length} de ${tasks.length}`;
      updateTaskContainers(); // Atualiza os contêineres das tarefas
    });
  });

  qtdFinishTasks.innerText = `Concluídas: ${completedTasks.length} de ${tasks.length}`;
}

createTasks(); // Cria as tarefas iniciais
updateTaskContainers(); // Atualiza os contêineres das tarefas
