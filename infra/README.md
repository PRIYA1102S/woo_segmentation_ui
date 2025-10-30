# Infrastructure Setup for Woo Segmentation App

This directory contains the infrastructure-related configurations and documentation for the Woo Segmentation application. 

## Kubernetes Configuration
- **k8s/**: Contains Kubernetes manifests for deploying the services.
  - **ingress.yaml**: Defines the ingress configuration for routing external traffic to the services.
  - **namespace.yaml**: Sets up the namespace for the application.
  - **deploy/**: Contains deployment configurations for each service.
    - **ingest-deployment.yaml**: Deployment configuration for the ingest service.
    - **api-deployment.yaml**: Deployment configuration for the API service.
    - **segmentation-deployment.yaml**: Deployment configuration for the segmentation service.
    - **frontend-deployment.yaml**: Deployment configuration for the frontend application.
  - **svc/**: Contains service configurations for internal communication.
    - **api-service.yaml**: Service configuration for the API service.
    - **frontend-service.yaml**: Service configuration for the frontend application.

## Terraform Configuration
- **terraform/**: Contains Terraform scripts for provisioning infrastructure.
  - **main.tf**: Main Terraform configuration file.
  - **variables.tf**: Defines variables used in the Terraform configuration.

## Docker Compose
- **docker-compose.yml**: Defines the services and configurations for local development using Docker Compose.

## Usage
Refer to the individual files for specific configurations and instructions on how to deploy and manage the infrastructure for the Woo Segmentation application.