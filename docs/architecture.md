# Architecture of Woo Segmentation App

## Overview
The Woo Segmentation App is a full-stack application designed to integrate with WooCommerce's REST API. It ingests product data, stores it locally, and provides a user interface for displaying products and defining segments through a text-based rule editor. The application follows a microservices architecture, ensuring scalability and maintainability.

## Architecture Components

### 1. Ingest Service
- **Purpose**: Responsible for syncing product data from WooCommerce to the local database.
- **Key Files**:
  - `src/index.ts`: Entry point that initializes the service and sets up a cron job for periodic data ingestion.
  - `src/workers/wooSync.ts`: Contains the logic for syncing products.
  - `src/clients/wooClient.ts`: Handles API requests to the WooCommerce REST API.

### 2. API Service
- **Purpose**: Provides a RESTful API for accessing product data and segments.
- **Key Files**:
  - `src/app.ts`: Initializes the Express application and sets up middleware and routes.
  - `src/controllers/productsController.ts`: Manages product-related API requests.
  - `src/routes/products.ts`: Defines routes for product endpoints.

### 3. Segmentation Service
- **Purpose**: Evaluates user-defined segments based on product data.
- **Key Files**:
  - `src/index.ts`: Entry point that initializes the service and sets up evaluation logic.
  - `src/ruleEngine/parser.ts`: Parses text-based rules input by users.
  - `src/evaluators/segmentEvaluator.ts`: Evaluates parsed rules against product data.

### 4. Authentication Service
- **Purpose**: Manages user authentication and authorization.
- **Key Files**:
  - `src/index.ts`: Initializes the authentication service.
  - `src/middleware/jwt.ts`: Middleware for JWT authentication.

### 5. Frontend Application
- **Purpose**: Provides a user interface for displaying products and managing segments.
- **Key Files**:
  - `src/index.tsx`: Entry point for the frontend application.
  - `src/App.tsx`: Main application component with routing.
  - `src/pages/Products.tsx`: Displays product cards.
  - `src/pages/Segments.tsx`: Contains the segment editor UI.
  - `src/components/RuleEditor/RuleEditor.tsx`: Component for inputting segment rules.

## Deployment
The application is designed to be deployed using Kubernetes, with configurations defined in the `infra/k8s` directory. Docker images for each service are built using the respective Dockerfiles located in each service directory.

## Conclusion
The Woo Segmentation App leverages a microservices architecture to provide a robust solution for product data ingestion and segmentation. Each service is independently deployable and can be scaled as needed, ensuring flexibility and performance.