# Lista de Tarefas

Este é um repositório contendo uma aplicação de Lista de Tarefas desenvolvida com HTML, CSS e JavaScript. A aplicação permite adicionar, editar, marcar como concluída e excluir tarefas. Além disso, possui recursos responsivos e a funcionalidade de mostrar ou esconder as tarefas concluídas.

# Índice
1. [Lista de Tarefas](#lista-de-tarefas)
2. [Funcionalidades](#funcionalidades)
3. [Estrutura do Código](#estrutura-do-código)
4. [Demonstração](#demonstração)
5. [Contribuição](#contribuição)

## Funcionalidades

A aplicação possui as seguintes funcionalidades:

- Adicionar tarefas: É possível adicionar uma nova tarefa utilizando o campo de entrada e o botão correspondente.
- Marcar como concluída: Cada tarefa possui um círculo que pode ser clicado para marcar ou desmarcar como concluída. As tarefas concluídas são movidas para a seção de tarefas concluídas.
- Editar tarefa: É possível editar o nome de uma tarefa clicando no ícone de edição (ícone de lápis). Após editar, a tarefa será atualizada com o novo nome.
- Excluir tarefa: Para remover uma tarefa, basta clicar no ícone de lixeira.
- Mostrar/Esconder tarefas concluídas: Existe um botão que permite mostrar ou esconder as tarefas concluídas. As tarefas concluídas são exibidas em uma seção separada.
- Monitoramento de quantidade de tarefas: Na parte superior da página, há dois parágrafos que exibem a quantidade de tarefas criadas e a quantidade de tarefas concluídas.

## Estrutura do Código

O código JavaScript está dividido em diversas seções e utiliza seletores para obter os elementos visuais da página. Abaixo estão as principais seções e suas funcionalidades:

- `createTask(name, taskId)`: Função responsável por criar e retornar um elemento HTML representando uma tarefa. Recebe como parâmetros o nome da tarefa e o ID da tarefa.
- `addTask(name, status)`: Função para adicionar uma nova tarefa ao array `tasks`. Recebe como parâmetros o nome da tarefa e um status opcional (por padrão, `false`).
- `updateTaskContainers()`: Função para atualizar os contêineres das tarefas com base na quantidade de tarefas existentes. Esconde ou mostra elementos visuais conforme necessário.
- `createTasks()`: Função para criar as tarefas HTML com base no array `tasks`. Também trata os eventos de clique nos elementos das tarefas.
- `updateCompletedTasks()`: Função para atualizar as tarefas concluídas e seus eventos correspondentes.
- Event listeners: Existem diversos event listeners no código, como o listener para adicionar uma nova tarefa, marcar/desmarcar como concluída, editar tarefa e excluir tarefa. Também há um listener para o botão de mostrar/esconder tarefas concluídas.

## Demonstração

Abaixo está uma imagem demonstrando a aparência da aplicação de Lista de Tarefas:

![To Do list design img](https://github.com/leonardomartindev/ToDo/assets/100030317/4be7364b-49b7-4a79-bc00-50dfaed33044)
![demonstração-ToDoList](https://github.com/leonardomartindev/ToDo/assets/100030317/eafef688-bbab-493e-af59-7c666c9106c2)
![demonstração-editTask](https://github.com/leonardomartindev/ToDo/assets/100030317/7567f3a4-c43d-4d53-a0bf-7e4406aa3063)


Para experimentar a aplicação, você pode acessar a [demo online](https://leonardomartindev.github.io/ToDo/) ou clonar este repositório e abrir o arquivo `index.html` em seu navegador.

## Contribuição

Se você quiser contribuir para este projeto, fique à vontade para fazer um fork e enviar pull requests. Sua contribuição será muito bem-vinda!

