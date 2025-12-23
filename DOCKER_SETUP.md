# ScanLedger Docker Architecture & Setup Guide

This document provides a detailed breakdown of the Docker configuration for the ScanLedger MVP. The environment is designed for high-performance development with hot-reloading and production parity.

## 🏗️ Architecture Overview

The system consists of four primary services orchestrated via Docker Compose:

1.  **Frontend**: Next.js (TypeScript)
2.  **Backend**: FastAPI (Python)
3.  **Database**: PostgreSQL 15
4.  **Cache**: Redis 7

---

## 📦 Service Breakdown

### 1. Frontend (`scanledger-frontend`)
- **Image**: `scanledger-frontend:latest`
- **Port**: `3000:3000`
- **Dockerfile**: Multi-stage build (`app/frontend/Dockerfile`)
    - **Base**: Installs dependencies.
    - **Development**: Runs `npm run dev` with hot-reloading.
    - **Builder**: Creates an optimized production build.
    - **Runner**: Lightweight production image using Next.js standalone output.
- **Volumes**: 
    - `./app/frontend:/app`: Syncs source code for hot-reloading.
    - `/app/node_modules`: Anonymous volume to prevent local `node_modules` from overriding container dependencies.

### 2. Backend (`scanledger-backend`)
- **Image**: `scanledger-backend:latest`
- **Port**: `8000:8000`
- **Dockerfile**: `app/backend/Dockerfile` (Python 3.11-slim)
- **Features**: 
    - Auto-reloading enabled via Uvicorn (`--reload`).
    - SQLAlchemy & Alembic integrated for database migrations.
- **Volumes**:
    - `./app/backend:/app`: Syncs source code for instant backend updates.

### 3. Database (`scanledger-db`)
- **Image**: `postgres:15-alpine`
- **Port**: `5432:5432`
- **Credentials**:
    - **User**: `scanledgeruser`
    - **Password**: `scanledger4932`
    - **DB Name**: `scanledgerdb`
- **Persistence**: Data is stored in the `postgres_data` Docker volume.

### 4. Redis (`scanledger-redis`)
- **Image**: `redis:7-alpine`
- **Port**: `6379:6379`
- **Usage**: Used for caching and session management.

---

## 🌐 Networking

The services communicate over a default Docker bridge network. 

- **Internal Communication**: Services can reach each other using their container names (e.g., the backend connects to the database at `db:5432`).
- **External Communication**: The browser accesses the frontend at `localhost:3000` and the backend at `localhost:8000`.

---

## 💾 Persistence & Volumes

| Volume Name | Mount Point | Purpose |
| :--- | :--- | :--- |
| `postgres_data` | `/var/lib/postgresql/data` | Ensures database data survives container restarts. |
| `./app/frontend` | `/app` | Enables hot-reloading for Next.js. |
| `./app/backend` | `/app` | Enables auto-reloading for FastAPI. |

---

## 🛠️ Development Workflow

### Useful Commands (Makefile)

| Command | Description |
| :--- | :--- |
| `make up` | Start all services in the background. |
| `make build` | Rebuild frontend and backend images. |
| `make watch` | Start services and follow logs in real-time. |
| `make migrate` | Run Alembic migrations inside the backend container. |
| `make restart` | Full stop and start of all services. |
| `make clean` | **Deep Reset**: Removes containers, volumes, and networks. |

---

## ❓ Troubleshooting

### "Network needs to be recreated" Error
If you see an error regarding `enable_ipv6` or `enable_ipv4` changing:
1. Run `make clean`.
2. Run `make watch`.
This happens when Docker's internal network state gets out of sync with the configuration.

### "Port 5432 is already in use"
This occurs if you have a local PostgreSQL service running on your machine.
- **Fix**: Stop your local Postgres service (`sudo systemctl stop postgresql`) before running `make up`.

### Frontend "Module not found"
If the frontend fails to find `next` or other modules:
- Ensure you have run `make build` at least once to install dependencies inside the image.
- If issues persist, run `make clean` and then `make build`.

---

## 🔒 Security Note
Environment variables are managed via the `.env` file. **Never commit your `.env` file to Git.** Use `.env.example` as a template for new developers.
