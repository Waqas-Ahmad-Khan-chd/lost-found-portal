const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from public folder
app.use(express.static('public'));

// Route for home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Route for items page
app.get('/items.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'items.html'));
});

// Route for form page
app.get('/form.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'form.html'));
});

// Route for details page
app.get('/details.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'details.html'));
});

// Route for about page
app.get('/about.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'about.html'));
});

// API routes
const itemsRouter = require('./items');
app.use('/api/items', itemsRouter);

// Export for Vercel
module.exports = app;