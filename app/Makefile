.PHONY: help up down build logs restart ps watch clean frontend-install backend-install init dev migrate shell-frontend shell-backend prune health

# Detect OS for cross-platform compatibility
UNAME := $(shell uname -s)
ifeq ($(UNAME),Darwin)
	# macOS
	SED_INPLACE := sed -i ''
	OPEN_CMD := open
else
	# Linux
	SED_INPLACE := sed -i
	OPEN_CMD := xdg-open
endif

# Color output
GREEN := \033[0;32m
YELLOW := \033[0;33m
NC := \033[0m # No Color

## help: Display this help message
help:
	@echo "$(GREEN)ScanLedger Docker Commands$(NC)"
	@echo ""
	@echo "$(YELLOW)Setup:$(NC)"
	@echo "  make init              - Initialize project (first time setup)"
	@echo "  make build             - Build all Docker images"
	@echo ""
	@echo "$(YELLOW)Development:$(NC)"
	@echo "  make up                - Start all services"
	@echo "  make down              - Stop all services"
	@echo "  make restart           - Restart all services"
	@echo "  make watch             - Start services and follow logs"
	@echo "  make dev               - Full development setup (init + watch)"
	@echo ""
	@echo "$(YELLOW)Logs & Monitoring:$(NC)"
	@echo "  make logs              - Follow all service logs"
	@echo "  make ps                - Show running containers"
	@echo "  make health            - Check service health"
	@echo ""
	@echo "$(YELLOW)Database & Migrations:$(NC)"
	@echo "  make migrate           - Run database migrations"
	@echo ""
	@echo "$(YELLOW)Dependencies:$(NC)"
	@echo "  make frontend-install  - Install frontend dependencies"
	@echo "  make backend-install   - Install backend dependencies"
	@echo ""
	@echo "$(YELLOW)Shell Access:$(NC)"
	@echo "  make shell-frontend    - Open shell in frontend container"
	@echo "  make shell-backend     - Open shell in backend container"
	@echo ""
	@echo "$(YELLOW)Cleanup:$(NC)"
	@echo "  make clean             - Remove containers and volumes"
	@echo "  make prune             - Deep clean (remove all unused Docker resources)"
	@echo ""

## init: Initialize the project (first time setup)
init:
	@echo "$(GREEN)Initializing ScanLedger...$(NC)"
	@$(MAKE) build
	@$(MAKE) up
	@echo "$(YELLOW)Waiting for services to be ready...$(NC)"
	@sleep 5
	@$(MAKE) frontend-install
	@$(MAKE) backend-install
	@echo "$(GREEN)Initialization complete!$(NC)"
	@echo "$(YELLOW)Run 'make migrate' to set up the database$(NC)"

## dev: Full development setup (build, up, and watch)
dev:
	@$(MAKE) build
	@$(MAKE) watch

## up: Start all services in detached mode
up:
	@echo "$(GREEN)Starting services...$(NC)"
	@docker-compose up -d --remove-orphans
	@echo "$(GREEN)Services started!$(NC)"
	@$(MAKE) ps

## down: Stop all services
down:
	@echo "$(YELLOW)Stopping services...$(NC)"
	@docker-compose down
	@echo "$(GREEN)Services stopped!$(NC)"

## build: Build all Docker images
build:
	@echo "$(GREEN)Building Docker images...$(NC)"
	@docker-compose build
	@echo "$(GREEN)Build complete!$(NC)"

## logs: Follow logs from all services
logs:
	@docker-compose logs -f

## restart: Restart all services
restart:
	@$(MAKE) down
	@$(MAKE) up

## clean: Remove containers, volumes, and orphans
clean:
	@echo "$(YELLOW)Cleaning up containers and volumes...$(NC)"
	@docker-compose down -v --remove-orphans
	@docker network prune -f
	@echo "$(GREEN)Cleanup complete!$(NC)"

## prune: Deep clean - remove all unused Docker resources
prune:
	@echo "$(YELLOW)This will remove ALL unused Docker resources!$(NC)"
	@echo "$(YELLOW)Press Ctrl+C to cancel, or wait 5 seconds to continue...$(NC)"
	@sleep 5
	@$(MAKE) clean
	@docker system prune -af --volumes
	@echo "$(GREEN)Deep clean complete!$(NC)"

## ps: Show running containers
ps:
	@docker-compose ps

## watch: Start services and follow logs
watch:
	@$(MAKE) up
	@echo "$(GREEN)Watching logs... (Ctrl+C to stop)$(NC)"
	@docker-compose logs -f

## migrate: Run database migrations
migrate:
	@echo "$(GREEN)Running database migrations...$(NC)"
	@docker-compose exec backend alembic upgrade head
	@echo "$(GREEN)Migrations complete!$(NC)"

## frontend-install: Install frontend dependencies
frontend-install:
	@echo "$(GREEN)Installing frontend dependencies...$(NC)"
	@docker-compose exec frontend npm install
	@echo "$(GREEN)Frontend dependencies installed!$(NC)"

## backend-install: Install backend dependencies
backend-install:
	@echo "$(GREEN)Installing backend dependencies...$(NC)"
	@docker-compose exec backend pip install -r requirements.txt
	@echo "$(GREEN)Backend dependencies installed!$(NC)"

## shell-frontend: Open a shell in the frontend container
shell-frontend:
	@docker-compose exec frontend /bin/sh

## shell-backend: Open a shell in the backend container
shell-backend:
	@docker-compose exec backend /bin/bash

## health: Check service health
health:
	@echo "$(GREEN)Checking service health...$(NC)"
	@echo ""
	@echo "$(YELLOW)Frontend (http://localhost:3000):$(NC)"
	@curl -s -o /dev/null -w "Status: %{http_code}\n" http://localhost:3000 || echo "Status: Unavailable"
	@echo ""
	@echo "$(YELLOW)Backend (http://localhost:8000):$(NC)"
	@curl -s -o /dev/null -w "Status: %{http_code}\n" http://localhost:8000 || echo "Status: Unavailable"
	@echo ""
	@echo "$(YELLOW)Database:$(NC)"
	@docker-compose exec -T db pg_isready -U scanledgeruser || echo "Status: Unavailable"
	@echo ""
	@echo "$(YELLOW)Redis:$(NC)"
	@docker-compose exec -T redis redis-cli ping || echo "Status: Unavailable"
	@echo ""
