document.addEventListener('DOMContentLoaded', () => {
    loadMenuItems();
    displayWelcome();
});

function displayWelcome() {
    const welcomeMsg = document.querySelector('.welcome-section h2');
    welcomeMsg.textContent = "Welcome, Cafe Owner!";
}

function loadMenuItems() {
    fetch('http://localhost:8080/menu')
        .then(response => response.json())
        .then(items => {
            const menuGrid = document.getElementById('menuGrid');
            menuGrid.innerHTML = '';
            updateSummary(items.length);
            items.forEach(item => addMenuItemToDOM(item));
        })
        .catch(error => console.error('Error loading menu:', error));
}

function addMenuItem() {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = parseFloat(document.getElementById('price').value);
    const stock = parseInt(document.getElementById('stock').value);
    const available = document.getElementById('available').checked;

    fetch('http://localhost:8080/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, price, stock, available })
    })
    .then(response => response.json())
    .then(item => {
        addMenuItemToDOM(item);
        document.getElementById('name').value = '';
        document.getElementById('description').value = '';
        document.getElementById('price').value = '';
        document.getElementById('stock').value = '';
        document.getElementById('available').checked = false;
        updateSummary(document.querySelectorAll('.menu-card').length);
    })
    .catch(error => console.error('Error adding menu item:', error));
}

function addMenuItemToDOM(item) {
    const menuGrid = document.getElementById('menuGrid');
    const div = document.createElement('div');
    div.className = 'menu-card' + (item.available ? '' : ' unavailable');
    div.innerHTML = `
        <span>${item.name} - ${item.description} ($${item.price}) | Stock: ${item.stock}</span>
        <div>
            <button onclick="toggleAvailability(${item.id})">Toggle Availability</button>
            <button onclick="deleteMenuItem(${item.id})">Delete</button>
        </div>
    `;
    menuGrid.appendChild(div);
}

function toggleAvailability(id) {
    fetch(`http://localhost:8080/menu/${id}`)
        .then(response => response.json())
        .then(item => {
            fetch(`http://localhost:8080/menu/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...item, available: !item.available })
            })
            .then(() => loadMenuItems())
            .catch(error => console.error('Error toggling availability:', error));
        });
}

function deleteMenuItem(id) {
    fetch(`http://localhost:8080/menu/${id}`, {
        method: 'DELETE'
    })
    .then(() => loadMenuItems())
    .catch(error => console.error('Error deleting menu item:', error));
}

function updateSummary(count) {
    document.getElementById('itemCount').textContent = `${count} items on menu.`;
}
div.innerHTML = `
    <span><img src="https://via.placeholder.com/50?text=${item.name}" alt="${item.name}"> ${item.name} - ${item.description} ($${item.price}) | Stock: ${item.stock}</span>
    <div>
        <button onclick="toggleAvailability(${item.id})">Toggle Availability</button>
        <button onclick="deleteMenuItem(${item.id})">Delete</button>
    </div>
`;