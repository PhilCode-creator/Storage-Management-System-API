const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const app = express();
const productsRoute = require('./routes/products');
const stockRoute = require('./routes/stock');

// Load environment variables from .env file
dotenv.config({ path: './config/.env' });

// Middleware to parse JSON bodies
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000; // Default to port 3000 if not specified

/**
 * GET / - Basic route to check server status.
 */
app.get('/', (req, res) => {
  res.json({
    status: "online"
  });
});

// Use the products route for endpoints starting with /products
app.use('/products', productsRoute);

// Use the stock route for endpoints starting with /stock
app.use('/stock', stockRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
