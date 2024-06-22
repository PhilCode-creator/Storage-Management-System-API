const mysql = require('mysql2');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../config/.env') });
const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const promisePool = pool.promise();

async function createNewItem(data) {
    const sql = "INSERT INTO `produkte` (`ProductName`, `Category`, `Brand`, `Description`, `UnitSize`, `SupplierID`, `SupplierName`, `ContactInformation`, `Barcode`, `Location`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

    // Destructure data object with default values to avoid undefined
    const {
        productName,
        category,
        brand,
        description,
        unitSize,
        supplierID,
        supplierName,
        contactInformation,
        barcode,
        location
    } = data;

    // Convert undefined fields to null
    const params = [
        productName,
        category,
        brand,
        description,
        unitSize,
        supplierID,
        supplierName,
        contactInformation,
        barcode,
        location
    ].map(field => (typeof field === 'undefined' ? null : field));

    try {
        const [result] = await promisePool.execute(sql, params);
        return result;
    } catch (err) {
        console.error('Error inserting new item:', err);
        throw err;
    }
}

async function getAllItems() {
    const sql = "SELECT * FROM `produkte`";
    try {
        const [rows, fields] = await promisePool.execute(sql);
        return rows; // Rows will be an array of objects, each representing a row from the database
    } catch (err) {
        console.error('Error fetching items:', err);
        throw err;
    }
}


module.exports = { createNewItem, getAllItems };