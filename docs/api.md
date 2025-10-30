# API Documentation

## Overview

This document provides an overview of the APIs available in the Woo Segmentation App. The application integrates with WooCommerce's REST API to ingest product data, which is then made available through a local API for frontend consumption.

## Base URL

The base URL for the API service is:

```
http://<api-service-host>:<port>
```

## Authentication

All API requests require authentication. Use the JWT token obtained from the authentication service in the `Authorization` header:

```
Authorization: Bearer <token>
```

## Endpoints

### 1. Get Products

- **Endpoint:** `/api/products`
- **Method:** `GET`
- **Description:** Retrieves a list of products from the local database.
- **Response:**
  - **200 OK**
    - Content: `application/json`
    - Body: 
      ```json
      [
        {
          "id": "1",
          "name": "Product Name",
          "price": "19.99",
          "description": "Product Description",
          "category": "Category Name"
        },
        ...
      ]
      ```

### 2. Get Product by ID

- **Endpoint:** `/api/products/:id`
- **Method:** `GET`
- **Description:** Retrieves a single product by its ID.
- **Parameters:**
  - `id` (path): The ID of the product to retrieve.
- **Response:**
  - **200 OK**
    - Content: `application/json`
    - Body: 
      ```json
      {
        "id": "1",
        "name": "Product Name",
        "price": "19.99",
        "description": "Product Description",
        "category": "Category Name"
      }
      ```
  - **404 Not Found**
    - Content: `application/json`
    - Body: 
      ```json
      {
        "error": "Product not found"
      }
      ```

### 3. Create Segment

- **Endpoint:** `/api/segments`
- **Method:** `POST`
- **Description:** Creates a new segment based on user-defined rules.
- **Request Body:**
  - Content: `application/json`
  - Body: 
    ```json
    {
      "name": "Segment Name",
      "rules": "price > 20 AND category == 'Electronics'"
    }
    ```
- **Response:**
  - **201 Created**
    - Content: `application/json`
    - Body: 
      ```json
      {
        "id": "1",
        "name": "Segment Name",
        "rules": "price > 20 AND category == 'Electronics'"
      }
      ```

### 4. Get Segments

- **Endpoint:** `/api/segments`
- **Method:** `GET`
- **Description:** Retrieves a list of all segments.
- **Response:**
  - **200 OK**
    - Content: `application/json`
    - Body: 
      ```json
      [
        {
          "id": "1",
          "name": "Segment Name",
          "rules": "price > 20 AND category == 'Electronics'"
        },
        ...
      ]
      ```

## Error Handling

All error responses will follow the format:

```json
{
  "error": "Error message"
}
```

## Conclusion

This API documentation provides a comprehensive overview of the available endpoints for the Woo Segmentation App. For further details on specific endpoints or additional functionality, please refer to the individual service documentation.