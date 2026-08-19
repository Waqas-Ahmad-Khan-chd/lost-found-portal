// Form page JavaScript
const API_URL = 'http://localhost:3000/api/items';
let editId = null;

// Get URL parameters
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return params.get('edit');
}

// Load item for editing
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

// Show alert
function showAlert(message, type = 'success') {
    const container = document.getElementById('alertContainer');
    container.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
    setTimeout(() => container.innerHTML = '', 5000);
}

// Handle form submit
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
    
    // Log the data being sent
    console.log('Sending data:', formData);
    
    try {
        let response;
        if (editId) {
            // Update existing item
            response = await fetch(`${API_URL}/${editId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
        } else {
            // Create new item
            response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
        }
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Server response:', errorText);
            throw new Error('Failed to save item');
        }
        
        const result = await response.json();
        console.log('Item saved:', result);
        
        showAlert(editId ? 'Item updated successfully!' : 'Item added successfully!');
        
        if (!editId) {
            document.getElementById('itemForm').reset();
        }
        
        setTimeout(() => window.location.href = '/items.html', 1500);
    } catch (error) {
        console.error('Error saving item:', error);
        showAlert('Failed to save item. Please try again. Error: ' + error.message, 'error');
    }
});

// Initialize form
document.addEventListener('DOMContentLoaded', () => {
    editId = getUrlParams();
    if (editId) {
        loadItemForEdit(editId);
    }
    
    // Set default date
    const dateInput = document.getElementById('date');
    if (!dateInput.value) {
        dateInput.value = new Date().toISOString().split('T')[0];
    }
});