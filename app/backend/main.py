from fastapi import FastAPI, Depends, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import get_db, engine, Base
import os
import redis
import psycopg2

# Import models and schemas
import models
import schemas
from email_service import send_waitlist_confirmation

# Create tables on startup
models.Base.metadata.create_all(bind=engine)

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

@app.post("/waitlist", response_model=schemas.WaitlistSignupResponse)
async def join_waitlist(
    signup: schemas.WaitlistSignupCreate, 
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    # Check if email already exists
    db_user = db.query(models.WaitlistSignup).filter(models.WaitlistSignup.email == signup.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create new signup record
    new_signup = models.WaitlistSignup(
        name=signup.name,
        email=signup.email,
        company=signup.company
    )
    
    db.add(new_signup)
    db.commit()
    db.refresh(new_signup)
    
    # Send confirmation email in background
    background_tasks.add_task(send_waitlist_confirmation, signup.email, signup.name)
    
    # Update email_sent status (optimistic, or update in a separate task callback)
    new_signup.email_sent = True
    db.commit()
    
    return new_signup

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
