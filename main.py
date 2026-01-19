from fastapi import FastAPI
from app.api.v1 import recommendations
import uvicorn

app = FastAPI(
    title="AI Career Partner API",
    description="Backend services for Smart Portfolio Recommendations & Market Alignment",
    version="1.0.0"
)

# Include Routers
app.include_router(recommendations.router)

@app.get("/")
async def root():
    return {
        "message": "AI Career Partner Backend is operational",
        "docs": "/docs"
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)