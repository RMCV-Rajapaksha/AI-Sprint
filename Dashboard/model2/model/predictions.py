from pydantic import BaseModel


class Prediction(BaseModel):
    date: str
    prediction: float
