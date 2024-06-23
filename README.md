# Storage Management System API

This repository contains a Node.js and Express.js backend application designed for managing product inventory through a RESTful API. It provides endpoints for creating, updating, deleting, and retrieving products, as well as managing stock information.

## Features

- **Product Management**
  - Create new products with various attributes.
  - Update existing products by ID.
  - Delete products by ID.
  - Retrieve all products or a specific product by ID.
  - Search for products by specific fields.

- **Stock Management**
  - Update stock information for products by ID.
  - Create initial stock entries for new products.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Additional Libraries**: dotenv for environment configuration, body-parser for JSON parsing

## Setup Instructions

1. Clone the repository:
   ```sh
   git clone https://github.com/PhilCode-creator/Lager-System.git
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the `config` directory.
   - Define necessary variables (e.g., database connection string).

4. Start the server:
   ```sh
   npm start
   ```

## API Documentation

### Basic Routes

- **Check Server Status**
  - **Endpoint**: `GET /`
  - **Response**: 
    ```json
    { "status": "online" }
    ```

### Product Management

- **Create New Product**
  - **Endpoint**: `POST /products/items`
  - **Body**:
    ```json
    {
      "ProductName": "example",
      "Category": "example",
      "Brand": "example",
      "Description": "example description",
      "UnitSize": "example size",
      "SupplierID": 1,
      "SupplierName": "example supplier",
      "ContactInformation": "example contact",
      "Barcode": "example barcode",
      "Location": "example location"
    }
    ```

- **Update Product by ID**
  - **Endpoint**: `PUT /products/items/:itemID`
  - **Body**:
    ```json
    {
      "ProductID": 1,
      "ProductName": "updated name",
      "Category": "updated category",
      "Brand": "updated brand",
      "Description": "updated description",
      "UnitSize": "updated size",
      "SupplierID": 2,
      "SupplierName": "updated supplier",
      "ContactInformation": "updated contact",
      "Location": "updated location"
    }
    ```

- **Delete Product by ID**
  - **Endpoint**: `DELETE /products/items/:itemID`

- **Get Product by ID**
  - **Endpoint**: `GET /products/items/:itemID`

- **Get All Products**
  - **Endpoint**: `GET /products/items`

- **Search Products by Field**
  - **Endpoint**: `GET /products/items/search`
  - **Body**:
    ```json
    {
      "filter": "Category",
      "filterValue": "example category"
    }
    ```

### Stock Management

- **Update Stock by Product ID**
  - **Endpoint**: `PUT /stock`
  - **Body**:
    ```json
    {
      "ProductID": 1,
      "Amount": 100,
      "LastPurchase": "2023-01-01",
      "ExpiryDate": "2024-01-01"
    }
    ```

## Contributing

Feel free to contribute by forking the repository and submitting pull requests for new features or bug fixes.

## License

This project is licensed under the MIT License.

---
