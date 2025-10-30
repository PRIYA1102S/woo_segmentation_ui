# API Service Documentation

This document provides an overview of the API service within the Woo Segmentation application. The API service is responsible for exposing endpoints to interact with product data and manage user-defined segments.

## Overview

The API service integrates with the WooCommerce REST API to ingest product data and store it locally. It provides endpoints for retrieving product information and managing segments defined by users through a text-based rule editor.

## Features

- **Product Retrieval**: Fetch product data from the local database.
- **Segment Management**: Define and evaluate segments based on user-defined rules.
- **Integration with Ingest Service**: Automatically syncs product data from WooCommerce.

## Getting Started

### Prerequisites

- Node.js
- TypeScript
- Prisma

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd woo-segmentation-app/services/api-service
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Running the Service

To start the API service, run:
```
npm start
```

### API Endpoints

- **GET /products**: Retrieve a list of products.
- **POST /segments**: Create a new segment based on defined rules.
- **GET /segments**: Retrieve existing segments.
- **POST /segments/evaluate**: Evaluate segments with given rules. Example body: `{ "rules": "price > 100\nstock_status = instock" }`
- **GET /docs**: Access the Swagger UI documentation.

## Testing

To run the tests for the API service, use:
```
npm test
```

## Deployment

Refer to the infrastructure documentation for deployment instructions using Kubernetes or Docker.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## API service

- Endpoints:
  - GET /products
  - POST /segments/evaluate  { rules: "price > 100\nstock_status = instock" }
  - GET /docs (Swagger UI)
- Run locally:
  cd services/api-service
  npm install
  npm start
- Docker:
  docker build -t api-service:local .
  docker run -p 4000:4000 -v <repo-root>/data:/data api-service:local