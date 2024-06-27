let userCount = 1;

function addUser() {
    const nameInput = document.getElementById('nameInput');
    const name = nameInput.value.trim();
    if (name !== '') {
        const userTable = document.getElementById('userTable');
        const row = userTable.insertRow();
        row.insertCell(0).innerText = userCount++;
        row.insertCell(1).innerText = name;
        const actionsCell = row.insertCell(2);
        
        const editBtn = document.createElement('button');
        editBtn.innerText = '✏️';
        editBtn.classList.add('edit-btn');
        editBtn.onclick = function() {
            editUser(this);
        };
        actionsCell.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = '🗑️';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = function() {
            deleteUser(this);
        };
        actionsCell.appendChild(deleteBtn);

        nameInput.value = '';
    }
}

function editUser(btn) {
    const row = btn.parentElement.parentElement;
    const nameCell = row.cells[1];
    const newName = prompt('Edit name:', nameCell.innerText);
    if (newName) {
        nameCell.innerText = newName;
    }
}

function deleteUser(btn) {
    const row = btn.parentElement.parentElement;
    row.parentElement.removeChild(row);
    userCount--;
    updateRowNumbers();
}

function updateRowNumbers() {
    const rows = document.getElementById('userTable').rows;
    for (let i = 0; i < rows.length; i++) {
        rows[i].cells[0].innerText = i + 1;
    }
}
