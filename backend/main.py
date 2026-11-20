from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth.database import engine, Base
from auth.routes import router as auth_router

# Initialize database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="MLForge AI Backend API",
    description="Agentic AI-Based Autonomous AutoML Platform REST API with Secure Authentication",
    version="1.1.0"
)

# Explicit origins for credentials support (HTTP-only cookies)
ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Authentication Router
app.include_router(auth_router)

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "MLForge AI Engine",
        "version": "1.1.0",
        "description": "An Agentic AI-Based Autonomous AutoML Platform API"
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "auth_module": "active",
        "agents_available": [
            "Dataset Analysis Agent",
            "Planning Agent",
            "Preprocessing Engine",
            "Coding Agent",
            "Debugging Agent",
            "Evaluation Agent",
            "Report Generation Agent"
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
