# 1. Library imports
import uvicorn
from fastapi import FastAPI
from BaseModel import Sales
import numpy as np
import pickle
import pandas as pd

# 2. Create the app object
app = FastAPI()

# Load the model using pickle
with open("model2.pkl", "rb") as pickle_in:
    classifier = pickle.load(pickle_in)


@app.post('/predict')
async def predict_title(data: Sales):
    try:
        # Convert Pydantic model to dict
        data_dict = data.model_dump()

        # Create input array for prediction from the contest data
        input_features = np.array([
            data_dict[f'contest{i}'] for i in range(1, 11)
        ]).reshape(1, -1)

        # Make prediction using the input data
        prediction = classifier.predict(input_features)

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
