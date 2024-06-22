const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const app = express();
const productsRoute = require('./routes/products');

dotenv.config({ path: './config/.env' });
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000; // Default to port 3000 if not specified

// Define a basic route
app.get('/', (req, res) => {
  res.json({
    status: "online"
  })
});

app.use('/products', productsRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});