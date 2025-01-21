from fastapi import APIRouter
from model.predictions import Prediction
from config.database import collection_name
from schema.schemas import list_serial, individual_serial
from bson import ObjectId
from typing import List

router = APIRouter()

# get


@router.get("/predictions/")
async def get_predictions():
    predictions = list_serial(collection_name.find())
    return predictions


@router.post("/predictions/")
async def add_predictions(predictions: List[Prediction]):
    try:
        # Convert the list of prediction objects into dictionaries and insert them into MongoDB
        prediction_dicts = [dict(prediction) for prediction in predictions]
        collection_name.insert_many(prediction_dicts)

        return {"message": "Predictions added successfully!"}
    except Exception as e:
        return {"error": str(e)}
