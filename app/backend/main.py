from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import get_db, engine, Base
import os
import redis
import psycopg2

# Create tables on startup (as a backup to migrations)
# Base.metadata.create_all(bind=engine)

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World", "Service": "ScanLedger Backend"}

from sqlalchemy import text

@app.get("/users")
def get_users(db: Session = Depends(get_db)):
    # Using raw SQL for a quick test since we haven't defined SQLAlchemy models yet
    result = db.execute(text("SELECT * FROM users")).fetchall()
    return [{"id": row[0], "email": row[1], "full_name": row[2], "is_active": row[3]} for row in result]

@app.post("/seed")
def seed_user(db: Session = Depends(get_db)):
    db.execute(text("INSERT INTO users (email, full_name, is_active) VALUES ('test@example.com', 'Test User', true)"))
    db.commit()
    return {"message": "User seeded successfully"}

@app.get("/health")
def health_check():
    # Basic health check for Redis and DB
    health = {"status": "ok", "redis": "unknown", "db": "unknown"}
    
    # Redis check
    try:
        redis_url = os.getenv("REDIS_URL", "redis://redis:6379")
        r = redis.from_url(redis_url, decode_responses=True)
        r.ping()
        health["redis"] = "connected"
    except Exception as e:
        health["redis"] = f"error: {str(e)}"

    # DB check
    try:
        db_url = os.getenv("DATABASE_URL", "postgresql://scanledgeruser:scanledger4932@db:5432/scanledgerdb")
        conn = psycopg2.connect(db_url)
        health["db"] = "connected"
        conn.close()
    except Exception as e:
        health["db"] = f"error: {str(e)}"
        
    return health
