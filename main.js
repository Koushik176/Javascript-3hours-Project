const myForm = document.querySelector('#my-form');

myForm.addEventListener('submit',onSubmit);

function onSubmit(e) {
    e.preventDefault();

    const expenditure = e.target.expenditure.value;
    const description = e.target.description.value;
    const category = e.target.category.value;
    const obj = {
        expenditure,
        description,
        category,
    }
    localStorage.setItem(obj.description, JSON.stringify(obj));
    showUserOnScreen(obj);
}

function showUserOnScreen(obj) {
    const parentElem = document.getElementById('users');
    const childElem = document.createElement('li');
    childElem.textContent = obj.expenditure+'  -  '
        +obj.description+'  -  '+obj.category;
    const deleteButton = document.createElement('input');
    deleteButton.type = 'button';
    deleteButton.className = 'btn btn-primary';
    deleteButton.value = 'Delete';
    deleteButton.onclick = () => {
        localStorage.removeItem(obj.description);
        parentElem.removeChild(childElem);
    }
    childElem.appendChild(deleteButton);
    const editButton = document.createElement('input');
    editButton.className = 'btn';
    editButton.type = 'button';
    editButton.value = 'Edit';
    editButton.onclick = () => {
        document.querySelector('#expenditure').value = obj.expenditure;
        document.querySelector('#description').value = obj.description;
        document.querySelector('#category').value = obj.category;
        localStorage.removeItem(obj.description);
        parentElem.removeChild(childElem);
    }
    childElem.appendChild(editButton);
    parentElem.appendChild(childElem);
}