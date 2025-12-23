.PHONY: up down build logs restart ps watch clean

up:
	docker-compose up -d --remove-orphans

down:
	docker-compose down

build:
	docker-compose build

logs:
	docker-compose logs -f

restart:
	docker-compose down
	docker-compose up -d --remove-orphans

clean:
	docker-compose down -v --remove-orphans
	docker network prune -f

ps:
	docker-compose ps

watch:
	docker-compose up -d --remove-orphans
	@echo "🚀 ScanLedger is starting..."
	@echo "📱 Frontend: http://localhost:3000"
	@echo "⚙️  Backend:  http://localhost:8000"
	@echo "📄 API Docs: http://localhost:8000/docs"
	docker-compose logs -f

migrate:
	docker-compose exec backend alembic upgrade head
