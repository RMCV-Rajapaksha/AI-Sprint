from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import pickle
import joblib
from typing import List

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ForecastRequest(BaseModel):
    periods: int


class ForecastResponse(BaseModel):
    forecast_dates: List[str]
    predictions: List[float]


# Load the model
model = joblib.load('model2.pkl')


@app.post("/forecast/")
async def forecast(request: ForecastRequest):
    try:
        forecast = model.forecast(request.periods)
        return ForecastResponse(
            forecast_dates=[date.strftime("%Y-%m-%d")
                            for date in forecast.index],
            predictions=forecast.values.tolist()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
