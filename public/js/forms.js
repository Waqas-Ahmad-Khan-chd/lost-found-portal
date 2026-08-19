const API_URL = '/api/items';
let editId = null;

function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return params.get('edit');
}

async function loadItemForEdit(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error('Item not found');
        const item = await response.json();
        
        document.getElementById('type').value = item.type;
        document.getElementById('name').value = item.name;
        document.getElementById('category').value = item.category;
        document.getElementById('location').value = item.location;
        document.getElementById('date').value = item.date;
        document.getElementById('description').value = item.description;
        document.getElementById('status').value = item.status;
        
        document.querySelector('h1').textContent = 'Edit Item';
        document.querySelector('form button[type="submit"]').textContent = 'Update Item';
    } catch (error) {
        console.error('Error loading item for edit:', error);
        showAlert('Failed to load item for editing.', 'error');
    }
}

function showAlert(message, type = 'success') {
    const container = document.getElementById('alertContainer');
    container.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
    setTimeout(() => container.innerHTML = '', 5000);
}

document.getElementById('itemForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        type: document.getElementById('type').value,
        name: document.getElementById('name').value,
        category: document.getElementById('category').value,
        location: document.getElementById('location').value,
        date: document.getElementById('date').value,
        description: document.getElementById('description').value,
        status: document.getElementById('status').value
    };
    
    try {
        let response;
        if (editId) {
            response = await fetch(`${API_URL}/${editId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
        } else {
            response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
        }
        
        if (!response.ok) throw new Error('Failed to save item');
        
        showAlert(editId ? 'Item updated successfully!' : 'Item added successfully!');
        
        if (!editId) {
            document.getElementById('itemForm').reset();
        }
        
        setTimeout(() => window.location.href = '/items.html', 1500);
    } catch (error) {
        console.error('Error saving item:', error);
        showAlert('Failed to save item. Please try again.', 'error');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    editId = getUrlParams();
    if (editId) {
        loadItemForEdit(editId);
    }
    
    const dateInput = document.getElementById('date');
    if (!dateInput.value) {
        dateInput.value = new Date().toISOString().split('T')[0];
    }
});