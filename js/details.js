// Details page JavaScript
const API_URL = 'http://localhost:3000/api/items';

// Get item ID from URL
function getItemId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Load item details
async function loadItemDetails() {
    const id = getItemId();
    const container = document.getElementById('detailsContainer');
    
    if (!id) {
        container.innerHTML = '<p style="color: red;">No item selected. Please go back and select an item.</p>';
        return;
    }
    
    container.innerHTML = '<div class="loading">Loading item details...</div>';
    
    try {
        const response = await fetch(`${API_URL}/${id}`);
        
        if (!response.ok) {
            throw new Error('Item not found');
        }
        
        const item = await response.json();
        console.log('Item loaded:', item); // Debug log
        
        container.innerHTML = `
            <div class="detail-item ${item.type.toLowerCase()}">
                <h2>${item.name}</h2>
                <span class="type ${item.type === 'Lost' ? 'type-lost' : 'type-found'}">${item.type}</span>
                
                <div class="field">
                    <span class="label">ID:</span>
                    <span class="value">${item.id}</span>
                </div>
                <div class="field">
                    <span class="label">Category:</span>
                    <span class="value">${item.category}</span>
                </div>
                <div class="field">
                    <span class="label">Location:</span>
                    <span class="value">${item.location}</span>
                </div>
                <div class="field">
                    <span class="label">Date:</span>
                    <span class="value">${item.date}</span>
                </div>
                <div class="field">
                    <span class="label">Status:</span>
                    <span class="value">${item.status}</span>
                </div>
                <div class="field">
                    <span class="label">Description:</span>
                    <span class="value">${item.description}</span>
                </div>
                <div class="actions" style="margin-top: 1rem;">
                    <a href="/items.html" class="btn btn-primary">Back to Items</a>
                    <a href="/form.html?edit=${item.id}" class="btn btn-success">Edit</a>
                    <button onclick="deleteItem(${item.id})" class="btn btn-danger">Delete</button>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error loading item details:', error);
        container.innerHTML = `<p style="color: red;">Failed to load item details. Error: ${error.message}</p>`;
    }
}

// Delete item
async function deleteItem(id) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete item');
        window.location.href = '/items.html';
    } catch (error) {
        console.error('Error deleting item:', error);
        alert('Failed to delete item. Please try again.');
    }
}

// Load page when ready
document.addEventListener('DOMContentLoaded', loadItemDetails);