const mysql = require('mysql2');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../config/.env') });

// Create MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,         // Hostname of the database server
    user: process.env.DATABASE_USER,         // Database user
    password: process.env.DATABASE_PASSWORD, // Password for the database user
    database: process.env.DATABASE_NAME,     // Name of the database
    port: process.env.DATABASE_PORT,         // Port on which the database server is running
    waitForConnections: true,                // Whether the pool should wait for a connection to become available
    connectionLimit: 10,                     // Maximum number of connections in the pool
    queueLimit: 0                            // Maximum number of connection requests the pool will queue before returning an error
});

const promisePool = pool.promise();

/**
 * Creates a new item in the database.
 * @param {Object} data - The data object containing item details.
 * @param {string} data.productName - The name of the product.
 * @param {string} data.category - The category of the product.
 * @param {string} data.brand - The brand of the product.
 * @param {string} data.description - The description of the product.
 * @param {string} data.unitSize - The size/unit of the product.
 * @param {number} data.supplierID - The ID of the supplier.
 * @param {string} data.supplierName - The name of the supplier.
 * @param {string} data.contactInformation - The contact information of the supplier.
 * @param {string} data.barcode - The barcode of the product.
 * @param {string} data.location - The location where the product is stored.
 * @returns {Promise<Object|boolean>} - Returns the result object if successful, or false if unsuccessful.
 */
async function createNewItem(data) {
    const sql = "INSERT INTO `produkte` (`ProductName`, `Category`, `Brand`, `Description`, `UnitSize`, `SupplierID`, `SupplierName`, `ContactInformation`, `Barcode`, `Location`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

    const {
        ProductName,
        Category,
        Brand,
        Description,
        UnitSize,
        SupplierID,
        SupplierName,
        ContactInformation,
        Barcode,
        Location
    } = data;

    const params = [
        ProductName,
        Category,
        Brand,
        Description,
        UnitSize,
        SupplierID,
        SupplierName,
        ContactInformation,
        Barcode,
        Location
    ].map(field => (typeof field === 'undefined' ? null : field));

    try {
        const [result] = await promisePool.execute(sql, params);
        if(result.length === 0) 
            return false;
        return result;
    } catch (err) {
        console.error('Error inserting new item:', err);
        throw err;
    }
}

/**
 * Updates an existing item in the database by its ID.
 * @param {number} itemID - The ID of the item to be updated.
 * @param {Object} data - The data object containing updated item details.
 * @param {string} data.ProductID - The new Product ID.
 * @param {string} data.ProductName - The new Product Name.
 * @param {string} data.Category - The new Category.
 * @param {string} data.Brand - The new Brand.
 * @param {string} data.Description - The new Description.
 * @param {string} data.UnitSize - The new Unit Size.
 * @param {number} data.SupplierID - The new Supplier ID.
 * @param {string} data.SupplierName - The new Supplier Name.
 * @param {string} data.ContactInformation - The new Contact Information.
 * @param {string} data.Barcode - The new Barcode.
 * @param {string} data.Location - The new Location.
 * @returns {Promise<Object|boolean>} - Returns the result object if successful, or false if unsuccessful.
 */
async function updateItemById(itemID, data) {
    const sql = "UPDATE `produkte` SET `ProductID`=?, `ProductName`=?, `Category`=?, `Brand`=?, `Description`=?, `UnitSize`=?, `SupplierID`=?, `SupplierName`=?, `ContactInformation`=?, `Barcode`=?, `Location`=? WHERE `ProductID`=?";

    try {
        const [result] = await promisePool.execute(sql, [
            data.ProductID,
            data.ProductName,
            data.Category,
            data.Brand,
            data.Description,
            data.UnitSize,
            data.SupplierID,
            data.SupplierName,
            data.ContactInformation,
            data.Barcode,
            data.Location,
            itemID
        ]);
        if (result.affectedRows === 0) 
            return false;
        return result;
    } catch (err) {
        console.error('Error updating item:', err);
        throw err;
    }
}

/**
 * Retrieves an item from the database by its ID.
 * @param {number} itemID - The ID of the item to retrieve.
 * @returns {Promise<Object|boolean>} - Returns the retrieved item object if found, or false if not found.
 */
async function getItemById(itemID) {
    const sql = "SELECT * FROM produkte WHERE ProductID=?"
    try {
        const [result] = await promisePool.execute(sql, [itemID]);
        if(result.length === 0) 
            return false;
        return result;
    } catch (err) {
        console.error('Error retrieving item:', err);
        throw err;
    }
}

/**
 * Retrieves all items from the database.
 * @returns {Promise<Array>} - Returns an array of all items retrieved from the database.
 */
async function getAllItems() {
    const sql = "SELECT * FROM `produkte`";
    try {
        const [rows, fields] = await promisePool.execute(sql);
        return rows;
    } catch (err) {
        console.error('Error fetching items:', err);
        throw err;
    }
}

/**
 * Deletes an item from the database by its ID.
 * @param {number} itemID - The ID of the item to delete.
 * @returns {Promise<Object|boolean>} - Returns the result object if successful, or false if unsuccessful.
 */
async function deleteItemByID(itemID) {
    const sql = "DELETE FROM `produkte` WHERE ProductID=?";
    try {
        const [result] = await promisePool.execute(sql, [itemID]);
        if(result.length === 0) 
            return false;
        return result;
    } catch (err) {
        console.error('Error deleting item:', err);
        throw err;
    }
}

/**
 * Searches for an item in the database by a specific field.
 * @param {Object} data - The data object containing search parameters.
 * @param {string} data.filter - The field to filter by (e.g., 'ProductName', 'Category').
 * @param {string} data.filterValue - The value to match against the filter field.
 * @returns {Promise<Object|boolean>} - Returns the search result object if successful, or false if no items found.
 */
async function searchItemByField(data) {
    const sql = `SELECT * FROM produkte WHERE ${data.filter} = ?`;
    try {
        const [result] = await promisePool.execute(sql, [data.filterValue]);
        if(result.length === 0) 
            return false;
        return result;
    } catch (err) {
        console.error('Error searching item:', err);
        throw err;
    }
}



async function updateItemsStockById(itemID, data) {
    const sql = "UPDATE `lager` SET `Amount`=?,`LastPurchase`=?,`ExpiryDate`=? WHERE ProductID=?"
    try {
        const [result] = await promisePool.execute(sql, [data.Amount, data.LastPurchase, data.ExpiryDate, itemID]);
        if(result.length === 0) 
            return false;
        return result;
    } catch (err) {
        console.error('Error updating stock:', err);
        throw err;
    }
}

async function createNewStock(id) {
    const sql = "INSERT INTO `lager`(`ProductID`, `Amount`, `LastPurchase`, `ExpiryDate`) VALUES (?,?,?,?)"
    try {
        const [result] = await promisePool.execute(sql, [id, 0, "", ""]);
        if(result.length === 0) 
            return false;
        return result;
    } catch (err) {
        console.error('Error creating stock:', err);
        throw err;
    }
}

/**
 * Validates if all required fields are present in the data object.
 * @param {Object} data - The data object to validate.
 * @param {Array<string>} requiredFields - An array of required field names.
 * @returns {boolean} - Returns true if all required fields are present, otherwise false.
 */
function validateRequiredFields(data, requiredFields) {
    for (const field of requiredFields) {
        if (!(field in data)) {
            return false; // Field is missing
        }
    }
    return true; // All required fields are present
}

module.exports = {
    createNewItem,
    getAllItems,
    getItemById,
    updateItemById,
    deleteItemByID,
    searchItemByField,
    validateRequiredFields,
    updateItemsStockById,
    createNewStock
};
