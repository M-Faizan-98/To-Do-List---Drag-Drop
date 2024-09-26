const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

const counter = document.getElementById('counter');
const counter2 = document.getElementById('counter2');
const btn = document.getElementById('btn');
const row1 = document.getElementById('row1');
const listContainer2 = document.getElementById('list-container-2');

listContainer2.addEventListener('dragover', function (e) {
  e.preventDefault();
});

listContainer2.addEventListener('drop', function (e) {
  if (selected) {
    listContainer2.appendChild(selected);
    liDropping();
    updateCounter();
    selected = null;
    saveData();
  }
});
listContainer.addEventListener('dragover', function (e) {
  e.preventDefault();
});

listContainer.addEventListener('drop', function (e) {
  if (selected) {
    listContainer.appendChild(selected);
    liDroppingBack();
    updateCounter();
    selected = null;
    saveData();
  }
});

function liDropping() {
  selected.children[0].setAttribute(
    'src',
    'https://i.postimg.cc/HW8y8rZB/checked.png'
  );
  selected.children[1].classList.add('checked');
  selected.children[1].setAttribute('contenteditable', 'false');
}
function liDroppingBack() {
  selected.children[0].setAttribute(
    'src',
    'https://i.postimg.cc/y8HcH7Tn/unchecked.png'
  );
  selected.children[1].classList.remove('checked');
  selected.children[1].setAttribute('contenteditable', 'true');
}

function addTask() {
  if (inputBox.value.length == '') {
    if (row1.getElementsByTagName('p').length < 1) {
      let p = document.createElement('p');
      p.classList.add('empty-input');
      p.innerHTML = 'You must write something!';
      inputBox.classList.add('input-empty');
      row1.appendChild(p);
    } else if (row1.getElementsByTagName('p').length > 1) {
      return;
    }
  } else {
    let li = document.createElement('li');
    listContainer.appendChild(li);
    li.setAttribute('draggable', 'true');
    li.classList.add('list');
    let img = document.createElement('img');
    img.setAttribute('draggable', 'false');
    img.src = 'https://i.postimg.cc/y8HcH7Tn/unchecked.png';
    li.appendChild(img);

    let p = document.createElement('p');
    p.setAttribute('contenteditable', 'true');
    p.setAttribute('draggable', 'false');
    p.classList.add('task');
    p.innerHTML = inputBox.value;
    li.appendChild(p);

    p.addEventListener('dragstart', function (e) {
      e.preventDefault();
    });

    let span = document.createElement('span');
    span.setAttribute('draggable', 'false');
    span.innerHTML = '\u00d7';
    li.appendChild(span);

    li.addEventListener('dragstart', function (e) {
      selected = e.target;
    });
  }

  inputBox.value = '';
  saveData();
  updateCounter();
}

const updateCounter = () => {
  counter.innerHTML = 'Task : ' + listContainer.children.length;
  counter2.innerHTML = 'Completed : ' + listContainer2.children.length;
  saveData();
};

function editTask(event) {
  if (event.target.tagName === 'IMG') {
    const currentSrc = event.target.getAttribute('src');

    if (currentSrc.endsWith('https://i.postimg.cc/y8HcH7Tn/unchecked.png')) {
      event.target.setAttribute(
        'src',
        'https://i.postimg.cc/HW8y8rZB/checked.png'
      );
      event.target.nextSibling.classList.add('checked');
      event.target.nextSibling.setAttribute('contenteditable', 'false');
      saveData();
    } else if (
      currentSrc.endsWith('https://i.postimg.cc/HW8y8rZB/checked.png')
    ) {
      event.target.setAttribute(
        'src',
        'https://i.postimg.cc/y8HcH7Tn/unchecked.png'
      );
      event.target.nextSibling.classList.remove('checked');
      event.target.nextSibling.setAttribute('contenteditable', 'true');
      saveData();
    }
  } else if (event.target.tagName == 'SPAN') {
    event.target.parentElement.remove();
    saveData();
    updateCounter();
  } else if (event.target.tagName == 'P') {
    const tasks = document.querySelectorAll('.task');
    tasks.forEach((p) => {
      p.onkeyup = function () {
        saveData();
      };
    });
  }
}

function removeAlertMsg() {
  if (inputBox.value.length >= 0 && row1.childElementCount > 1) {
    const p = inputBox.nextSibling;

    inputBox.classList.remove('input-empty');
    p.remove();
  } else {
    return;
  }
}

inputBox.addEventListener('input', removeAlertMsg);
listContainer.addEventListener('click', editTask);
listContainer2.addEventListener('click', editTask);
btn.addEventListener('click', addTask);

function saveData() {
  localStorage.setItem('data', listContainer.innerHTML);
  localStorage.setItem('data2', counter.innerHTML);
  localStorage.setItem('data4', counter2.innerHTML);
  localStorage.setItem('data3', listContainer2.innerHTML);
}
function showData() {
  listContainer.innerHTML = localStorage.getItem('data');
  counter.innerHTML = localStorage.getItem('data2');
  counter2.innerHTML = localStorage.getItem('data4');
  listContainer2.innerHTML = localStorage.getItem('data3');

  const lists = document.querySelectorAll('.list');
  lists.forEach((item) => {
    item.addEventListener('dragstart', function (e) {
      selected = e.target;
    });
  });
}
showData();
