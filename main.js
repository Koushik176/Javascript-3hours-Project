const myForm = document.querySelector('#my-form');

myForm.addEventListener('submit',saveToLocalStorage);

function saveToLocalStorage(e) {
    e.preventDefault();

    const expenditure = e.target.expenditure.value;
    const description = e.target.description.value;
    const category = e.target.category.value;
    const obj = {
        expenditure,
        description,
        category,
    }

    axios.post("https://crudcrud.com/api/671135eecbf440a7b13243c80d91ada3/appointmentData", obj)
        .then((Response) => {
            showUserOnScreen(Response.data);
            console.log(Response)
        })
        .catch((err) => {
            console.log(err)
        })
    //localStorage.setItem(obj.description, JSON.stringify(obj));
    
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