const express = require('express');
const router = express.Router();

const {
    createNewItem,
    getAllItems,
    getItemById,
    updateItemById,
    deleteItemByID,
    searchItemByField,
    validateRequiredFields,
    createNewStock
} = require("../modules/database");

/**
 * GET / - Endpoint to check server status.
 */
router.get('/', (req, res) => {
    res.json({ status: "online" });
});

/**
 * PUT /items/:itemID - Endpoint to update an item by ID.
 * @param {string} req.params.itemID - The ID of the item to update.
 * @param {Object} req.body - The updated item data.
 */
router.put('/items/:itemID', async (req, res) => {
    const itemID = req.params.itemID;
    const newData = req.body;
    const requiredFields = ['ProductID', 'ProductName', 'Category', 'Brand', 'Description', 'UnitSize', 'SupplierID', 'SupplierName', 'ContactInformation', 'Location'];

    // Validate required fields
    if (!validateRequiredFields(itemData, requiredFields)) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const item = await updateItemById(itemID, newData);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(item);
    } catch (err) {
        console.error('Error updating item:', err);
        res.status(500).json({ error: 'Failed to update item' });
    }
});

/**
 * GET /items/search - Endpoint to search for items by a specific field.
 * @param {Object} req.body - The data object containing search parameters.
 * @param {string} req.body.filter - The field to filter by (e.g., 'ProductName', 'Category').
 * @param {string} req.body.filterValue - The value to match against the filter field.
 */
router.get('/items/search', async (req, res) => {
    const data = req.body;
    if (!validateRequiredFields(data, ["filter", "filterValue"])) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const item = await searchItemByField(data);
        if (!item) {
            return res.status(404).json({ error: 'No items found' });
        }
        res.json(item);
    } catch (err) {
        console.error('Error finding items:', err);
        res.status(500).json({ error: 'Failed to find items' });
    }
});

/**
 * DELETE /items/:itemID - Endpoint to delete an item by ID.
 * @param {string} req.params.itemID - The ID of the item to delete.
 */
router.delete('/items/:itemID', async (req, res) => {
    const itemID = req.params.itemID;

    try {
        const item = await deleteItemByID(itemID);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(item);
    } catch (err) {
        console.error('Error deleting item:', err);
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

/**
 * GET /items/:itemID - Endpoint to get an item by ID.
 * @param {string} req.params.itemID - The ID of the item to retrieve.
 */
router.get('/items/:itemID', async (req, res) => {
    const itemID = req.params.itemID;

    try {
        const item = await getItemById(itemID);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(item);
    } catch (err) {
        console.error('Error getting item:', err);
        res.status(500).json({ error: 'Failed to fetch item' });
    }
});

/**
 * POST /items - Endpoint to create a new item.
 * @param {Object} req.body - The data object containing new item details.
 * @param {string} req.body.productName - The name of the product.
 * @param {string} req.body.category - The category of the product.
 * @param {string} req.body.brand - The brand of the product.
 * @param {string} req.body.unitSize - The size/unit of the product.
 * @param {number} req.body.supplierID - The ID of the supplier.
 */
router.post('/items', async (req, res) => {
    const requiredFields = ['ProductName', 'Category', 'Brand', 'Description', 'UnitSize', 'SupplierID', 'SupplierName', 'ContactInformation', 'Location'];
    const itemData = req.body;

    // Validate required fields
    if (!validateRequiredFields(itemData, requiredFields)) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const result = await createNewItem(itemData);
        await createNewStock(result.insertId);
        res.status(201).json({ message: 'Item created successfully', itemId: result.insertId });
    } catch (err) {
        console.error('Error creating new item:', err);
        res.status(500).json({ error: 'Failed to create new item' });
    }
});

/**
 * GET /items - Endpoint to retrieve all items.
 */
router.get('/items', async (req, res) => {
    try {
        const items = await getAllItems();
        res.json(items);
    } catch (err) {
        console.error('Error getting items:', err);
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});



module.exports = router;
