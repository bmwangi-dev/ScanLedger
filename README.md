# ScanLedger MVP

ScanLedger is a modern web application built with Next.js, FastAPI, PostgreSQL, and Redis.

## Tech Stack

- **Frontend:** Next.js (TypeScript) + Axios
- **Backend:** Python FastAPI + Uvicorn + Pydantic
- **Database:** PostgreSQL 15
- **Cache:** Redis 7
- **Orchestration:** Docker Compose

## Getting Started

### Prerequisites

- Docker and Docker Compose installed on your machine.
- Make (optional, for using the Makefile shortcuts).

### Installation & Setup

1. **Build the containers:**
   ```bash
   make build
   ```

2. **Start the services:**
   ```bash
   make up
   ```

3. **Access the application:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8000](http://localhost:8000)
   - API Docs (Swagger): [http://localhost:8000/docs](http://localhost:8000/docs)

### Useful Commands

- `make up`: Start all services in detached mode.
- `make down`: Stop and remove all containers.
- `make build`: Build or rebuild services.
- `make watch`: Start services and follow logs in real-time.
- `make migrate`: Run database migrations.
- `make clean`: Deep reset of the Docker environment.
- `make logs`: View real-time logs from all containers.
- `make ps`: List running containers.

For a deep dive into the Docker architecture, see [DOCKER_SETUP.md](./DOCKER_SETUP.md).

## Project Structure

```text
.
├── app/
│   ├── backend/            # FastAPI source code
│   │   ├── Dockerfile
│   │   ├── main.py
│   │   └── requirements.txt
│   └── frontend/           # Next.js source code
│       ├── Dockerfile
│       ├── pages/
│       ├── package.json
│       └── tsconfig.json
├── docker-compose.yml  # Docker orchestration
├── Makefile            # Shortcut commands
└── README.md           # Project documentation
```

## Environment Variables

Default environment variables are configured in `docker-compose.yml`. For production, ensure you use a `.env` file and update the security settings.
