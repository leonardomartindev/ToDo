// Seleção de principais elementos visuais
const input = document.querySelector(".form-input-btn input");
const addBtn = document.querySelector(".form-input-btn button");
const qtdTasks = document.querySelector(".container-span .qtd-tasks");
const qtdFinishTasks = document.querySelector(".container-span .qtd-finish-tasks");
const tasksHtmlContainer = document.querySelector(".tasks");
const popup = document.querySelector(".popup");
const completedTasksContainer = document.querySelector(".completed-tasks");
const toggleArrow = document.querySelector(".toggle-arrow");
const toggleTasksBtn = document.querySelector(".toggle-tasks");

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

  tasks.forEach((task, index) => {
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
      task.finished = !task.finished;
      taskElement.classList.toggle("hide");
      circle.classList.toggle("completed-circle");
      taskElement.querySelector(".circle-name-container").classList.toggle("completed-text");

      if (task.finished) {
        completedTasksContainer.appendChild(taskElement);
      } else {
        tasksHtmlContainer.appendChild(taskElement);
      }

      updateCompletedTasks(); // Atualiza as tarefas concluídas
    });

    // Event listener para editar tarefa
    const editIcon = taskElement.querySelector(".fa-pen");
    editIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      const editTask = document.querySelector("#edit-task");
      const namePTask = taskElement.querySelector(".name-task");
      editTask.value = namePTask.innerText;
      popup.classList.remove("hide");
      popup.addEventListener("click", (e) => {
        if (e.target.classList.contains("popup")) {
          popup.classList.add("hide");
        }
        if (e.target.classList.contains("fa-square-check")) {
          const updatedTaskName = editTask.value;
          namePTask.innerText = updatedTaskName;
          task.name = updatedTaskName;
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
      qtdTasks.innerText = tasks.length;
    });
  });

  updateCompletedTasks(); // Atualiza as tarefas concluídas

  qtdTasks.innerText = tasks.length;
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
    });
  });

  qtdFinishTasks.innerText = `${completedTasks.length} de ${tasks.length}`;
}

createTasks(); // Cria as tarefas iniciais
