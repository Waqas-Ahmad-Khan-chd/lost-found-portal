const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from public folder
app.use(express.static(path.join(__dirname, '..', 'public')));

// Also serve css and js folders directly
app.use('/css', express.static(path.join(__dirname, '..', 'css')));
app.use('/js', express.static(path.join(__dirname, '..', 'js')));

// API routes
const itemsRouter = require('./items');
app.use('/api/items', itemsRouter);

// Serve HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/items.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'items.html'));
});

app.get('/form.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'form.html'));
});

app.get('/details.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'details.html'));
});

app.get('/about.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'about.html'));
});

// Export for Vercel
module.exports = app;