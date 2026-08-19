const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from public folder
app.use(express.static('public'));

// API routes - MUST come BEFORE static routes
const itemsRouter = require('./items');
app.use('/api/items', itemsRouter);

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/*.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', req.path));
});

// Export for Vercel
module.exports = app;