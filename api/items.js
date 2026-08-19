const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'items.json');

async function readData() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

async function writeData(data) {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET all items
router.get('/', async (req, res) => {
    try {
        const items = await readData();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read items' });
    }
});

// GET single item
router.get('/:id', async (req, res) => {
    try {
        const items = await readData();
        const item = items.find(i => i.id === parseInt(req.params.id));
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read item' });
    }
});

// POST create item
router.post('/', async (req, res) => {
    try {
        const items = await readData();
        const newItem = {
            id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1001,
            ...req.body
        };
        items.push(newItem);
        await writeData(items);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create item' });
    }
});

// PUT update item
router.put('/:id', async (req, res) => {
    try {
        const items = await readData();
        const index = items.findIndex(i => i.id === parseInt(req.params.id));
        if (index === -1) {
            return res.status(404).json({ error: 'Item not found' });
        }
        items[index] = { ...items[index], ...req.body };
        await writeData(items);
        res.json(items[index]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update item' });
    }
});

// DELETE item
router.delete('/:id', async (req, res) => {
    try {
        const items = await readData();
        const filtered = items.filter(i => i.id !== parseInt(req.params.id));
        if (filtered.length === items.length) {
            return res.status(404).json({ error: 'Item not found' });
        }
        await writeData(filtered);
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

module.exports = router;