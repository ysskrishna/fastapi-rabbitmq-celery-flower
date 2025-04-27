from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.core.dbutils import engine
from src.models import models
from src.routers import notification

# create all tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# include routers
app.include_router(notification.router)

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI + Poetry!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

