# Segmentation Service Documentation

## Overview

The Segmentation Service is a microservice responsible for evaluating user-defined segments based on product data ingested from WooCommerce. It provides an API for parsing and evaluating segmentation rules, allowing users to create dynamic segments for targeted marketing and analysis.

## Features

- **Rule Parsing**: The service includes a rule engine that parses text-based rules input by users.
- **Segment Evaluation**: Evaluates parsed rules against the product data to determine segment membership.
- **Microservices Architecture**: Designed to work in conjunction with other services such as the Ingest Service and API Service.

## Getting Started

### Prerequisites

- Node.js (version X.X.X)
- TypeScript
- Docker (for containerization)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd woo-segmentation-app/services/segmentation-service
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Running the Service

To run the segmentation service locally, use the following command:
```
npm start
```

### Testing

To run the tests for the segmentation service, use:
```
npm test
```

### Docker

To build the Docker image for the segmentation service, run:
```
docker build -t segmentation-service .
```

To run the Docker container:
```
docker run -p 3000:3000 segmentation-service
```

## API Endpoints

- **POST /segments/evaluate**: Evaluates a segment rule against the product data.
- **GET /segments**: Retrieves all defined segments.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.