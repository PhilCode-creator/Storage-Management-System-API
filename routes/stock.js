const express = require('express');
const router = express.Router();

const {
    updateItemsStockById,
    validateRequiredFields
} = require("../modules/database");

/**
 * PUT / - Endpoint to update the stock information of an item by ID.
 * @param {Object} req.body - The data object containing updated stock information.
 * @param {number} req.body.ProductID - The ID of the product to update.
 * @param {number} req.body.Amount - The new amount of stock.
 * @param {string} req.body.LastPurchase - The date of the last purchase.
 * @param {string} req.body.ExpiryDate - The expiry date of the product.
 */
router.put('/', async (req, res) => {
    const newData = req.body;
    const requiredFields = ['ProductID', 'Amount', 'LastPurchase', 'ExpiryDate'];

    // Validate required fields
    if (!validateRequiredFields(newData, requiredFields)) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const itemID = newData.ProductID;

    try {
        const item = await updateItemsStockById(itemID, newData);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(item);
    } catch (err) {
        console.error('Error updating item:', err);
        res.status(500).json({ error: 'Failed to update item' });
    }
});

module.exports = router;
