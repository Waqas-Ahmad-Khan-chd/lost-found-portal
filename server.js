const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Serve static files from public
app.use(express.static('public'));

// API routes
const itemsRouter = require('./api/items');
app.use('/api/items', itemsRouter);

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/items.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'items.html'));
});

app.get('/form.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

app.get('/details.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'details.html'));
});

app.get('/about.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});