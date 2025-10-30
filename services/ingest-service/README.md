# Ingest Service Documentation

## Overview
The Ingest Service is responsible for syncing product data from the WooCommerce REST API to our local database. It periodically fetches product information and ensures that our local data is up-to-date.

## Features
- Connects to the WooCommerce API to retrieve product data.
- Stores the ingested product data in a local database.
- Supports periodic synchronization through a cron job.

## Installation
To install the Ingest Service, run the following command in the `ingest-service` directory:

```
npm install
```

## Usage
To start the Ingest Service, use the following command:

```
npm start
```

This will initialize the service and start the synchronization process.

## Configuration
Ensure that your environment variables are set up correctly in the `.env` file. You will need to provide your WooCommerce API credentials and database connection details.

## Testing
To run the tests for the Ingest Service, execute:

```
npm test
```

## Contributing
If you would like to contribute to the Ingest Service, please fork the repository and submit a pull request with your changes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Ingest service
- HTTP endpoints:
  - GET /health
  - POST /sync  -> trigger manual sync
  - GET /products -> returns normalized products (data/products.json)
- Run locally:
  cd services/ingest-service
  npm install
  npm run start
- One-off sync:
  npm run sync
- Docker build:
  docker build -t ingest-service:local .
  docker run -e WOOCOMMERCE_BASE_URL=... -e WOOCOMMERCE_CONSUMER_KEY=... -e WOOCOMMERCE_CONSUMER_SECRET=... -p 5001:5001 ingest-service:local