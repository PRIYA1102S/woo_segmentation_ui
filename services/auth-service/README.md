# Authentication Service

This service is responsible for handling user authentication and authorization within the Woo Segmentation application. It provides endpoints for user login, registration, and token management.

## Features

- JWT-based authentication
- User registration and login
- Middleware for protecting routes

## Getting Started

1. **Install Dependencies**: Run `npm install` to install the required packages.
2. **Configuration**: Set up your environment variables in a `.env` file based on the `.env.example` provided.
3. **Run the Service**: Use `npm start` to start the authentication service.

## API Endpoints

- `POST /auth/login`: Authenticate a user and return a JWT token.
- `POST /auth/register`: Register a new user.

## Testing

Run the tests using `npm test` to ensure everything is functioning correctly.

## Docker

To build and run the service in a Docker container, use the provided `Dockerfile`. 

## License

This project is licensed under the MIT License. See the LICENSE file for details.