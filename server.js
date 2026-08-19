const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware - IMPORTANT: These must be in this order
app.use(cors());
app.use(express.json());  // This parses JSON bodies
app.use(express.urlencoded({ extended: true }));  // This parses form data

// Serve static files
app.use(express.static(__dirname));
app.use(express.static('public'));

// API routes
const itemsRouter = require('./api/items');
app.use('/api/items', itemsRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});