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

    axios.post("https://crudcrud.com/api/c3c243b802fa4a3885998a0e71b521e7/appointmentData", obj)
        .then((Response) => {
            showUserOnScreen(Response.data);
        })
        .catch((err) => {
            console.log(err)
        })
    //localStorage.setItem(obj.description, JSON.stringify(obj));
    
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/c3c243b802fa4a3885998a0e71b521e7/appointmentData")
        .then((response) => {
            for(var i = 0; i< response.data.length; i++)
            {
                showUserOnScreen(response.data[i]);
            }
        })
        .catch((err) => {
            console.log(err)
        })
})

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
        axios.delete(`https://crudcrud.com/api/c3c243b802fa4a3885998a0e71b521e7/appointmentData/${obj._id}`)
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            })
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
        //localStorage.removeItem(obj.description);
        axios.delete(`https://crudcrud.com/api/c3c243b802fa4a3885998a0e71b521e7/appointmentData/${obj._id}`)
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            })
        parentElem.removeChild(childElem);
    }
    childElem.appendChild(editButton);
    parentElem.appendChild(childElem);
}