from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any
import uvicorn
import json
import os
import aiohttp
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get environment variables
API_HOST = os.getenv("API_HOST", "0.0.0.0")
API_PORT = int(os.getenv("API_PORT", "8000"))
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_API_URL = os.getenv("GROQ_API_URL")
GROQ_MODEL_NAME = os.getenv("GROQ_MODEL_NAME")

app = FastAPI(
    title="Sales Dashboard API",
    description="API for serving sales representatives data and AI functionality",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load dummy data
try:
    with open("dummyData.json", "r") as f:
        DUMMY_DATA = json.load(f)
except FileNotFoundError:
    DUMMY_DATA = {"salesReps": []}
    print("Warning: dummyData.json not found. Using empty data.")


@app.get("/api/sales-reps", response_model=Dict[str, List[Dict[str, Any]]])
def get_sales_reps():
    """
    Returns all sales representatives data.
    """
    return DUMMY_DATA


@app.get("/api/sales-reps/{rep_id}")
def get_sales_rep(rep_id: int):
    """
    Returns data for a specific sales representative.
    """
    for rep in DUMMY_DATA["salesReps"]:
        if rep["id"] == rep_id:
            return rep
    raise HTTPException(
        status_code=404,
        detail="Sales representative not found"
    )


@app.get("/api/deals")
def get_all_deals():
    """
    Returns all deals across all sales representatives.
    """
    all_deals = []
    for rep in DUMMY_DATA["salesReps"]:
        for deal in rep["deals"]:
            all_deals.append({**deal, "sales_rep": rep["name"]})
    return {"deals": all_deals}


async def get_groq_response(
    session: aiohttp.ClientSession,
    question: str,
    context: Dict
) -> str:
    """
    Get response from Groq API using async HTTP.
    """
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {GROQ_API_KEY}"
    }
    
    # Prepare the prompt with context
    prompt = (
        "You are a helpful sales analytics assistant. "
        "Use the following context to answer the question. "
        "If the question cannot be answered with the given context, say so.\n\n"
        f"Context:\n{json.dumps(context, indent=2)}\n\n"
        f"Question: {question}\n\n"
        "Answer:"
    )

    data = {
        "model": GROQ_MODEL_NAME,
        "messages": [{
            "role": "user",
            "content": prompt
        }]
    }

    try:
        async with session.post(
            GROQ_API_URL,
            headers=headers,
            json=data
        ) as response:
            if response.status != 200:
                error_text = await response.text()
                raise HTTPException(
                    status_code=response.status,
                    detail=f"Groq API error: {error_text}"
                )
            
            result = await response.json()
            return result["choices"][0]["message"]["content"].strip()
    except aiohttp.ClientError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error communicating with Groq API: {str(e)}"
        )


@app.post("/api/ai")
async def ai_endpoint(request: Request):
    """
    Accepts a user question and returns an
    AI-generated response using Groq API.
    """
    if not all([GROQ_API_KEY, GROQ_API_URL, GROQ_MODEL_NAME]):
        raise HTTPException(
            status_code=500,
            detail="Groq API configuration is incomplete"
        )

    try:
        body = await request.json()
        question = body.get("question", "").strip()
        
        if not question:
            raise HTTPException(
                status_code=400,
                detail="Question cannot be empty"
            )

        # Prepare context from DUMMY_DATA
        regions = list(set(rep["region"] for rep in DUMMY_DATA["salesReps"]))
        total_deals = sum(len(rep["deals"]) for rep in DUMMY_DATA["salesReps"])
        closed_won_value = sum(
            deal["value"] for rep in DUMMY_DATA["salesReps"] 
            for deal in rep["deals"] if deal["status"] == "Closed Won"
        )

        context = {
            "sales_reps": DUMMY_DATA["salesReps"],
            "total_reps": len(DUMMY_DATA["salesReps"]),
            "regions": regions,
            "total_deals": total_deals,
            "closed_won_value": closed_won_value
        }

        # Create aiohttp session and get response
        async with aiohttp.ClientSession() as session:
            response = await get_groq_response(session, question, context)
            return {"answer": response}

    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON body")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/")
def read_root():
    """
    Root endpoint with API information.
    """
    return {
        "message": "Welcome to the Sales Dashboard API",
        "version": "1.0.0",
        "environment": ENVIRONMENT,
        "endpoints": {
            "/api/sales-reps": "Get all sales representatives",
            "/api/sales-reps/{rep_id}": "Get specific sales representative",
            "/api/deals": "Get all deals",
            "/api/ai": "AI assistant endpoint (POST)"
        }
    }


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=API_HOST,
        port=API_PORT,
        reload=ENVIRONMENT == "development"
    )
