# Makefile

.PHONY: all ingest api segmentation frontend clean

all: ingest api segmentation frontend

ingest:
	docker build -t ingest-service ./services/ingest-service
	docker run -d --name ingest-service ingest-service

api:
	docker build -t api-service ./services/api-service
	docker run -d --name api-service -p 3000:3000 api-service

segmentation:
	docker build -t segmentation-service ./services/segmentation-service
	docker run -d --name segmentation-service segmentation-service

frontend:
	docker build -t frontend ./services/frontend
	docker run -d --name frontend -p 8080:80 frontend

clean:
	docker rm -f ingest-service api-service segmentation-service frontend || true
	docker rmi -f ingest-service api-service segmentation-service frontend || true