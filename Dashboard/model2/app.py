import datetime
from pymongo.server_api import ServerApi
from pymongo.mongo_client import MongoClient
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import pickle
import joblib
from routes.route import router
from typing import List
from config.database import collection_name
from routes.route import add_predictions


app = FastAPI()


app.include_router(router)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
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
        # Get the forecast from the model
        forecast = model.forecast(request.periods)

        # Prepare the forecast data to send to the database
        prediction_data = [
            {
                "forecast_dates": [date.strftime("%Y-%m-%d") for date in forecast.index],
                "predictions": forecast.values.tolist(),
                # Adding timestamp
                "created_at": pd.to_datetime("now").strftime("%Y-%m-%d %H:%M:%S")
            }
        ]

        # Call add_predictions to store the forecast in the MongoDB database
        await add_predictions(prediction_data)

        # Return the forecast response
        return ForecastResponse(
            forecast_dates=[date.strftime("%Y-%m-%d")
                            for date in forecast.index],
            predictions=forecast.values.tolist()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
