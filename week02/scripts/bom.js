const input = document.querySelector('favechap');
const button = document.querySelector('button');
const list = document.querySelector('_____');

const li = document.createElement('li');
const deleteButton = document.createElement('button');
li.textContent = input.value;
deleteButton.textContent = '❌';
li.append(deleteButton);
list.append('li');
button.addEventListener('click', function (){
    if (input.value.trim() !== '') {
        li.textContent = input.value;
        deleteButton.textContent = '❌';
        li.append(deleteButton);
        list.append('li');

        deleteButton.removeEventListener('click', function () {
            list.removeChild(li);
            input.focus();
        })
    }
        input.value = '';
}
