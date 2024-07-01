let users = [];
let editIndex = null;

document.getElementById('cancelDeleteBtn').onclick = () => {
    document.getElementById('deleteModal').style.display = 'none';
    document.getElementById('cancelModal').style.display = 'flex';
};

document.getElementById('closeCancelModalBtn').onclick = () => {
    document.getElementById('cancelModal').style.display = 'none';
};

function addOrEditUser(event) {
    event.preventDefault(); // Prevent form from submitting and refreshing the page

    const userInput = document.getElementById('userInput').value.trim();
    if (userInput === '') return;

    if (editIndex !== null) {
        users[editIndex] = userInput;
        editIndex = null;
        document.getElementById('addUserBtn').textContent = 'Add User';
        document.getElementById('cancelEditBtn').style.display = 'none';
    } else {
        users.push(userInput);
    }
    document.getElementById('userInput').value = '';
    renderTable();
}

function renderTable() {
    const userTableBody = document.getElementById('userTableBody');
    userTableBody.innerHTML = '';
    users.forEach((user, index) => {
        const row = document.createElement('tr');

        const cellIndex = document.createElement('td');
        cellIndex.textContent = index + 1;
        row.appendChild(cellIndex);

        const cellName = document.createElement('td');
        cellName.textContent = user;
        row.appendChild(cellName);

        const cellActions = document.createElement('td');

        const editButton = document.createElement('button');
        editButton.innerHTML = '&#9998;';
        editButton.className = 'edit-btn';
        editButton.onclick = () => editUser(index);
        cellActions.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '&#128465;';
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = () => confirmDelete(index);
        cellActions.appendChild(deleteButton);

        row.appendChild(cellActions);
        userTableBody.appendChild(row);
    });
}

function editUser(index) {
    document.getElementById('userInput').value = users[index];
    document.getElementById('addUserBtn').textContent = 'Edit User';
    document.getElementById('cancelEditBtn').style.display = 'inline';
    editIndex = index;
}

function cancelEdit() {
    document.getElementById('userInput').value = '';
    document.getElementById('addUserBtn').textContent = 'Add User';
    document.getElementById('cancelEditBtn').style.display = 'none';
    editIndex = null;
}

function confirmDelete(index) {
    document.getElementById('deleteModal').style.display = 'flex';
    document.getElementById('confirmDeleteBtn').onclick = () => deleteUser(index);
}

function deleteUser(index) {
    users.splice(index, 1);
    document.getElementById('deleteModal').style.display = 'none';
    renderTable();
}
