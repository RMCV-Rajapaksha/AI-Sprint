# 1. Library imports
import uvicorn
from fastapi import FastAPI
from contests import Contests
import numpy as np
import pickle
import pandas as pd

# 2. Create the app object
app = FastAPI()

# Load the model and scaler using pickle
with open("model.pkl", "rb") as pickle_in:
    classifier = pickle.load(pickle_in)

with open("scaler.pkl", "rb") as scaler_in:
    scaler = pickle.load(scaler_in)


@app.post('/predict')
async def predict_title(data: Contests):
    try:
        # Convert Pydantic model to dict
        data_dict = data.model_dump()

        # Create input array for prediction from the contest data
        input_features = np.array([
            data_dict[f'contest{i}'] for i in range(1, 11)
            # Reshape to ensure it's 2D (for a single prediction)
        ]).reshape(1, -1)

        # Scale the input data using the loaded scaler
        scaled_input = scaler.transform(input_features)

        # Make prediction using the scaled data
        prediction = classifier.predict(scaled_input)

        # Return formatted response
        return {
            "status": "success",
            "prediction": prediction[0].tolist(),  # Convert numpy to list
            "input_data": data_dict
        }
    except Exception as e:
        # Error handling
        return {
            "status": "error",
            "message": str(e)
        }


# 5. Run the API with uvicorn
# Will run on http://127.0.0.1:8000
if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)

# uvicorn app:app --reload
