# Woo Segmentation App

## Overview
The Woo Segmentation App is a full-stack application that integrates with WooCommerce's REST API to ingest product data, store it locally, and display products through both an API and a user interface. The application allows users to define segments using a text-based rule editor and follows a microservices architecture for scalability and maintainability.

## Architecture
The application is structured into multiple services:
- **Ingest Service**: Responsible for syncing product data from WooCommerce.
- **API Service**: Provides a RESTful API for accessing product data and segments.
- **Segmentation Service**: Evaluates user-defined segments based on product data.
- **Auth Service**: Manages user authentication and authorization.
- **Frontend**: A React-based user interface for interacting with the application.

## Features
- Integration with WooCommerce REST API for product data ingestion.
- Local storage of product data for quick access.
- RESTful API for product and segment management.
- Text-based rule editor for defining segments.
- Microservices architecture for better scalability and maintainability.

## Getting Started

### Prerequisites
- Node.js
- Docker
- Kubernetes (for deployment)
- Terraform (for infrastructure provisioning)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd woo-segmentation-app
   ```

2. Install dependencies for each service:
   - For Ingest Service:
     ```
     cd services/ingest-service
     npm install
     ```

   - For API Service:
     ```
     cd ../api-service
     npm install
     ```

   - For Segmentation Service:
     ```
     cd ../segmentation-service
     npm install
     ```

   - For Auth Service:
     ```
     cd ../auth-service
     npm install
     ```

   - For Frontend:
     ```
     cd ../frontend
     npm install
     ```

### Running the Application
- To run the services locally, use Docker Compose:
  ```
  cd ../infra
  docker-compose up
  ```

- To deploy the application to Kubernetes, use the provided Kubernetes manifests in the `infra/k8s` directory.

### Testing
Each service contains its own set of tests. To run the tests, navigate to the respective service directory and run:
```
npm test
```

## Documentation
- [API Documentation](docs/api.md)
- [Architecture Documentation](docs/architecture.md)
- [Segments Specification](docs/segments-spec.md)

## License
This project is licensed under the MIT License. See the LICENSE file for details.