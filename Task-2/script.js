const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const overdueList = document.getElementById('overdue-tasks');
const dueTodayList = document.getElementById('due-today-tasks');
const dueLaterList = document.getElementById('due-later-tasks');
const completedList = document.getElementById('completed-tasks');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const todoText = input.value.trim();

  if (todoText !== '') {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="todo-text">${todoText}</span>
      <button class="delete-button">Delete</button>
      <button class="complete-button">Complete</button>
    `;
    dueLaterList.appendChild(li);
    input.value = '';
  }
});

function moveToOverdue(li) {
  li.querySelector('.complete-button').remove();
  overdueList.appendChild(li);
}

function moveToDueToday(li) {
  li.querySelector('.complete-button').remove();
  dueTodayList.appendChild(li);
}

function moveToDueLater(li) {
  dueLaterList.appendChild(li);
}

function markAsCompleted(li) {
  li.classList.add('completed');
  li.querySelector('.complete-button').remove();
  li.querySelector('.delete-button').remove();
  completedList.appendChild(li);
}

overdueList.addEventListener('click', function(e) {
  if (e.target.classList.contains('delete-button')) {
    e.target.parentElement.remove();
  } else if (e.target.classList.contains('complete-button')) {
    markAsCompleted(e.target.parentElement);
  }
});

dueTodayList.addEventListener('click', function(e) {
  if (e.target.classList.contains('delete-button')) {
    e.target.parentElement.remove();
  } else if (e.target.classList.contains('complete-button')) {
    markAsCompleted(e.target.parentElement);
  }
});

dueLaterList.addEventListener('click', function(e) {
  if (e.target.classList.contains('delete-button')) {
    e.target.parentElement.remove();
  } else if (e.target.classList.contains('complete-button')) {
    markAsCompleted(e.target.parentElement);
  }
});

setInterval(function() {
  const now = new Date();
  const lis = dueLaterList.getElementsByTagName('li');

  for (let i = 0; i < lis.length; i++) {
    const li = lis[i];
    const dueText = li.querySelector('.todo-text').textContent;
    const dueDate = new Date(dueText);
    
    if (dueDate < now) {
      moveToOverdue(li);
    } else if (dueDate.toDateString() === now.toDateString()) {
      moveToDueToday(li);
    } else {
      moveToDueLater(li);
    }
  }
}, 60000);
