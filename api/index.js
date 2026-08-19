const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from public folder
app.use(express.static('public'));

// Import API routes
const itemsRouter = require('./items');
app.use('/api/items', itemsRouter);

// Export for Vercel (NO app.listen())
module.exports = app;