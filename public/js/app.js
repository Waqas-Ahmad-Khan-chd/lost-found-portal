const API_URL = '/api/items';

async function loadHomePage() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch items');
        const items = await response.json();
        
        updateStats(items);
        displayRecentItems(items);
    } catch (error) {
        console.error('Error loading home page:', error);
        document.getElementById('recentItems').innerHTML = '<p>Failed to load items. Please try again.</p>';
    }
}

function updateStats(items) {
    const total = items.length;
    const lost = items.filter(i => i.type === 'Lost').length;
    const found = items.filter(i => i.type === 'Found').length;
    const returned = items.filter(i => i.status === 'Returned').length;
    
    document.getElementById('totalItems').textContent = total;
    document.getElementById('lostItems').textContent = lost;
    document.getElementById('foundItems').textContent = found;
    document.getElementById('returnedItems').textContent = returned;
}

function displayRecentItems(items) {
    const container = document.getElementById('recentItems');
    const recent = items.slice(-4).reverse();
    
    if (recent.length === 0) {
        container.innerHTML = '<p>No items found.</p>';
        return;
    }
    
    container.innerHTML = recent.map(item => createItemCard(item)).join('');
}

function createItemCard(item) {
    return `
        <div class="item-card ${item.type.toLowerCase()}">
            <h3>${item.name}</h3>
            <span class="type ${item.type === 'Lost' ? 'type-lost' : 'type-found'}">${item.type}</span>
            <div class="meta">Category: ${item.category}</div>
            <div class="meta">Location: ${item.location}</div>
            <div class="meta">Status: ${item.status}</div>
            <div class="meta">Date: ${item.date}</div>
            <div class="actions">
                <a href="/details.html?id=${item.id}" class="btn btn-primary">View</a>
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', loadHomePage);