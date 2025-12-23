.PHONY: up down build logs restart ps watch clean

up:
	@docker-compose up -d --remove-orphans 2>&1 | sed 's/done/\x1b[32mstarted\x1b[0m/g' | grep -E "started|Network|Volume"

down:
	@docker-compose down 2>&1 | sed 's/done/\x1b[32mremoved\x1b[0m/g' | grep -v "Stopping" | grep -E "removed|Network"

build:
	docker-compose build

logs:
	docker-compose logs -f

restart:
	@$(MAKE) down
	@$(MAKE) up

clean:
	@docker-compose down -v --remove-orphans 2>&1 | sed 's/done/\x1b[32mremoved\x1b[0m/g' | grep -v "Stopping" | grep -E "removed|Network|Volume"
	@docker network prune -f

ps:
	docker-compose ps

watch:
	@$(MAKE) up
	docker-compose logs -f

migrate:
	docker-compose exec backend alembic upgrade head
