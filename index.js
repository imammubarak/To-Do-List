const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

function AddTask(){
  if (inputBox.value === ''){
    alert('You must input Something');
  }
  else {
    let li = document.createElement('li');
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    inputBox.value = '';
  }

}