#!/bin/bash

# Navigate to the services directory
cd services

# Build Docker images for all services
for service in ingest-service api-service segmentation-service frontend; do
  cd $service
  docker build -t myapp/$service .
  cd ..
done

# Deploy to Kubernetes
kubectl apply -f ../infra/k8s/namespace.yaml
kubectl apply -f ../infra/k8s/deploy/
kubectl apply -f ../infra/k8s/svc/

# Set up ingress
kubectl apply -f ../infra/k8s/ingress.yaml

echo "Deployment completed successfully."