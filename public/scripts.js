const taskForm = document.querySelector('#task-form')
const taskDescription = document.querySelector('#task-desc')
const taskList = document.querySelector('#task-list')

function loadTasks() {
  taskDescription.focus()
  taskDescription.value = ''
  fetch('/api/tasks')
    .then((response) => response.json())
    .then((data) => {
      taskList.innerHTML = '';
      Object.values(data.tasks).forEach(function(task) {
        const li = document.createElement('li')        
        li.innerHTML = `
          <div class="li-span">
            <span>${task.description}</span>
          </div>
          <div class="btn">
            <button class="edit-button" data-id="${task.id}">Editar</button>
            <button class="delete-button" data-id="${task.id}">Deletar</button>
          </div>
        `;
        taskList.appendChild(li)
      });
    })
    .catch((error) => {
      console.error('Erro ao carregar as tarefas: ', error);
    })
}

function addTask(description) {
  fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ description })
  })
  .then(() => {
    console.log('Adicionado com sucesso!')
    loadTasks();
  })
  .catch((error) => {
    console.error('Erro ao adicionar a tarefa:', error);
  })
}

function updateTask(id, newDescription) {
  fetch(`/api/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ description: newDescription })
  })
  .then(() => {
    loadTasks();
  })
  .catch((error) => {
    console.error('Erro ao atualizar a tarefa: ', error);
  });
}

function deleteTask(id) {
  fetch(`/api/tasks/${id}`, {
    method: 'DELETE',
  })
  .then(() => {
    loadTasks();
  })
  .catch((error) => {
    console.error('Erro ao excluir a tarefa: ', error);
  })
}

function editTask(liElement, task) {
  const descriptionSpan = liElement.querySelector('span');
  const editButton = liElement.querySelector('.edit-button');
  
  // Crie uma entrada de texto para editar a descrição
  const input = document.createElement('input');
  input.type = 'text';
  input.value = task.description;

  // Crie um botão de "Salvar" para salvar as alterações
  const saveButton = document.createElement('button');
  saveButton.innerText = 'Salvar';

  // Adicione os elementos ao li
  liElement.innerHTML = '';
  liElement.appendChild(input);
  liElement.appendChild(saveButton);

  // Adicione um manipulador de eventos para o botão "Salvar"
  saveButton.addEventListener('click', () => {
    const newDescription = input.value;
    updateTask(task.id, newDescription);
  });
}

taskForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const description = taskDescription.value;
  if (description !== '') {
    addTask(description);
    description.value = '';
  }
});

taskList.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete-button')) {
    const taskId = e.target.getAttribute('data-id');
    deleteTask(taskId);
  }
});

taskList.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete-button')) {
    const taskId = e.target.getAttribute('data-id');
    deleteTask(taskId);
  } else if (e.target.classList.contains('edit-button')) {
    const liElement = e.target.closest('li');
    const taskId = e.target.getAttribute('data-id');
    const task = { id: taskId, description: liElement.querySelector('span').innerText };
    editTask(liElement, task);
  }
});

window.addEventListener('load', loadTasks);