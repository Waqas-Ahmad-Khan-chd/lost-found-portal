// Items page JavaScript
const API_URL = 'http://localhost:3000/api/items';
let allItems = [];

// Function to remove duplicate items
function removeDuplicates(items) {
    const seen = new Set();
    return items.filter(item => {
        const key = `${item.name}-${item.location}-${item.date}`;
        if (seen.has(key)) {
            return false;
        }
        seen.add(key);
        return true;
    });
}

// Load items
async function loadItems() {
    const container = document.getElementById('itemsContainer');
    container.innerHTML = '<div class="loading">Loading items...</div>';
    
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch items');
        allItems = await response.json();
        allItems = removeDuplicates(allItems); // Remove duplicates
        filterAndDisplayItems();
    } catch (error) {
        console.error('Error loading items:', error);
        container.innerHTML = '<p>Failed to load items. Please try again.</p>';
    }
}

// Filter and display items
function filterAndDisplayItems() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const typeFilter = document.getElementById('typeFilter').value;
    const categoryFilter = document.getElementById('categoryFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    const sortFilter = document.getElementById('sortFilter').value;
    
    let filtered = allItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm) || 
                             item.description.toLowerCase().includes(searchTerm);
        const matchesType = !typeFilter || item.type === typeFilter;
        const matchesCategory = !categoryFilter || item.category === categoryFilter;
        const matchesStatus = !statusFilter || item.status === statusFilter;
        return matchesSearch && matchesType && matchesCategory && matchesStatus;
    });
    
    // Sort
    if (sortFilter === 'name') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortFilter === 'date') {
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    displayItems(filtered);
}

// Display items
function displayItems(items) {
    const container = document.getElementById('itemsContainer');
    
    if (items.length === 0) {
        container.innerHTML = '<p>No items found matching your criteria.</p>';
        return;
    }
    
    container.innerHTML = items.map(item => `
        <div class="item-card ${item.type.toLowerCase()}">
            <h3>${item.name}</h3>
            <span class="type ${item.type === 'Lost' ? 'type-lost' : 'type-found'}">${item.type}</span>
            <div class="meta">Category: ${item.category}</div>
            <div class="meta">Location: ${item.location}</div>
            <div class="meta">Status: ${item.status}</div>
            <div class="meta">Date: ${item.date}</div>
            <div class="actions">
                <a href="/details.html?id=${item.id}" class="btn btn-primary">View</a>
                <a href="/form.html?edit=${item.id}" class="btn btn-success">Edit</a>
                <button onclick="deleteItem(${item.id})" class="btn btn-danger">Delete</button>
            </div>
        </div>
    `).join('');
}

// Delete item
async function deleteItem(id) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete item');
        await loadItems();
    } catch (error) {
        console.error('Error deleting item:', error);
        alert('Failed to delete item. Please try again.');
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadItems();
    
    document.getElementById('searchInput').addEventListener('input', filterAndDisplayItems);
    document.getElementById('typeFilter').addEventListener('change', filterAndDisplayItems);
    document.getElementById('categoryFilter').addEventListener('change', filterAndDisplayItems);
    document.getElementById('statusFilter').addEventListener('change', filterAndDisplayItems);
    document.getElementById('sortFilter').addEventListener('change', filterAndDisplayItems);
});