provider "aws" {
  region = "us-west-2"
}

resource "aws_s3_bucket" "product_data" {
  bucket = "woo-segmentation-app-product-data"
  acl    = "private"
}

resource "aws_ecs_cluster" "app_cluster" {
  name = "woo-segmentation-app-cluster"
}

resource "aws_ecs_task_definition" "ingest_service" {
  family                   = "ingest-service"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"

  container_definitions = jsonencode([{
    name      = "ingest-service"
    image     = "your-docker-repo/ingest-service:latest"
    essential = true
    portMappings = [{
      containerPort = 3000
      hostPort      = 3000
      protocol      = "tcp"
    }]
  }])
}

resource "aws_ecs_task_definition" "api_service" {
  family                   = "api-service"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"

  container_definitions = jsonencode([{
    name      = "api-service"
    image     = "your-docker-repo/api-service:latest"
    essential = true
    portMappings = [{
      containerPort = 4000
      hostPort      = 4000
      protocol      = "tcp"
    }]
  }])
}

resource "aws_ecs_task_definition" "segmentation_service" {
  family                   = "segmentation-service"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"

  container_definitions = jsonencode([{
    name      = "segmentation-service"
    image     = "your-docker-repo/segmentation-service:latest"
    essential = true
    portMappings = [{
      containerPort = 5000
      hostPort      = 5000
      protocol      = "tcp"
    }]
  }])
}

resource "aws_ecs_task_definition" "frontend_service" {
  family                   = "frontend-service"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"

  container_definitions = jsonencode([{
    name      = "frontend-service"
    image     = "your-docker-repo/frontend:latest"
    essential = true
    portMappings = [{
      containerPort = 3000
      hostPort      = 3000
      protocol      = "tcp"
    }]
  }])
}

resource "aws_ecs_service" "ingest_service" {
  name            = "ingest-service"
  cluster         = aws_ecs_cluster.app_cluster.id
  task_definition = aws_ecs_task_definition.ingest_service.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = ["your-subnet-id"]
    security_groups  = ["your-security-group-id"]
    assign_public_ip = true
  }
}

resource "aws_ecs_service" "api_service" {
  name            = "api-service"
  cluster         = aws_ecs_cluster.app_cluster.id
  task_definition = aws_ecs_task_definition.api_service.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = ["your-subnet-id"]
    security_groups  = ["your-security-group-id"]
    assign_public_ip = true
  }
}

resource "aws_ecs_service" "segmentation_service" {
  name            = "segmentation-service"
  cluster         = aws_ecs_cluster.app_cluster.id
  task_definition = aws_ecs_task_definition.segmentation_service.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = ["your-subnet-id"]
    security_groups  = ["your-security-group-id"]
    assign_public_ip = true
  }
}

resource "aws_ecs_service" "frontend_service" {
  name            = "frontend-service"
  cluster         = aws_ecs_cluster.app_cluster.id
  task_definition = aws_ecs_task_definition.frontend_service.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = ["your-subnet-id"]
    security_groups  = ["your-security-group-id"]
    assign_public_ip = true
  }
}