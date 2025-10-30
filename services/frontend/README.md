# Frontend Service Documentation

This directory contains the frontend application for the Woo Segmentation App. The frontend is built using React and communicates with the backend services to display product data and allow users to define segments through a text-based rule editor.

## Structure

- **src/**: Contains the source code for the frontend application.
  - **index.tsx**: Entry point for the React application.
  - **App.tsx**: Main application component that sets up routing.
  - **pages/**: Contains page components.
    - **Products.tsx**: Displays product cards.
    - **Segments.tsx**: Contains the segment editor UI.
  - **components/**: Contains reusable components.
    - **RuleEditor/**: Contains the RuleEditor component for inputting segment rules.

- **public/**: Contains static files.
  - **index.html**: Main HTML file for the frontend application.

- **tests/**: Contains unit tests for the frontend application.

## Setup

To set up the frontend application, run the following commands:

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm start
   ```

## Deployment

The frontend application can be deployed using Docker. To build the Docker image, run:

```
docker build -t woo-segmentation-frontend .
```

Then, you can run the container with:

```
docker run -p 3000:3000 woo-segmentation-frontend
```

## API Integration

The frontend communicates with the backend API service to fetch product data and manage segments. Ensure that the API service is running and accessible.

## Testing

To run the unit tests for the frontend application, use:

```
npm test
```

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Frontend (React + Vite)

- Dev:
  ```
  cd services/frontend
  npm install
  npm run dev
  ```
- Build:
  ```
  npm run build
  ```
- Docker:
  ```
  docker build -t woo-frontend:local .
  docker run -p 3000:3000 woo-frontend:local
  ```
- Config:
  - Set `VITE_API_URL` to point to API (default `http://localhost:4000`)