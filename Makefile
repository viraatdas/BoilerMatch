
.PHONY: start build recreate start_web start_db db_shell stop

.DEFAULT_GOAL := start

start:
	docker-compose up
	
build:
	docker-compose up --build

recreate:
	docker-compose up --force-recreate

start_web:
	docker-compose up web

start_db:
	docker-compose up postgres

db_shell:
	docker exec -ti postgres_db psql -U postgres -h 0.0.0.0 -d boilermatch

stop:
	docker-compose down -v && docker network prune