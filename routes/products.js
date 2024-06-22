const express = require('express');
const router = express.Router();

const {createNewItem, getAllItems} = require("../modules/database")

 router.get('/', (req, res) => {
    res.json({ status: "online" });
});



router.post('/items', async (req, res) => {
    const requiredFields = ['productName', 'category', 'brand', 'unitSize', 'supplierID'];
    const itemData = req.body;

    // Validate required fields
    if (!validateRequiredFields(itemData, requiredFields)) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const result = await createNewItem(itemData);
        res.status(201).json({ message: 'Item created successfully', itemId: result.insertId });
    } catch (err) {
        console.error('Error creating new item:', err);
        res.status(500).json({ error: 'Failed to create new item' });
    }
});

router.get('/items', async (req, res) => {
    try {
        const items = await getAllItems();
        res.json(items);
    } catch (err) {
        console.error('Error getting items:', err);
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

function validateRequiredFields(data, requiredFields) {
    for (const field of requiredFields) {
        if (!(field in data)) {
            return false; // Field is missing
        }
    }
    return true; // All required fields are present
}

module.exports = router;