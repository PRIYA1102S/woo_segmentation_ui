#!/bin/bash

# Load environment variables
source .env

# Sync products from WooCommerce API
echo "Starting product sync from WooCommerce..."

# Call the ingest service to perform the sync
curl -X POST http://localhost:3001/sync-products

if [ $? -eq 0 ]; then
  echo "Product sync completed successfully."
else
  echo "Product sync failed."
fi