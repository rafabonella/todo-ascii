let tasks = [];

// referencias
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');
const counter = document.getElementById('counter');

// add tarefa
function addTask(text) {
    const task = {
        id: Date.now(),
        text: text,
        done: false,
    };
    tasks.push(task);
    render();
}

// alterna entre concluida e pendente
function toggleTask(id) {
    tasks = tasks.map((task) =>
        task.id === id ? {...task, done: !task.done } : task
    );
    render();
}

// desenha a lista na tela
function render() {
    list.innerHTML = '';

    tasks.forEach((task) => {
        const li = document.createElement('li');
    if (task.done) li.classList.add('done');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.addEventListener('change', () => toggleTask(task.id));

    const span = document.createElement('span');
    span.textContent = task.text;

    li.appendChild(checkbox);
    li.appendChild(span);
    list.appendChild(li);
    });

    const pending = tasks.filter((task) => !task.done).length;
    counter.textContent = `${pending} tarefa(s) pendente(s)`;
}

// envio do forms
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (text === '') return;
  addTask(text);
  input.value = '';
});


// primeira renderização
render();