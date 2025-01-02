# 1. Library imports
import uvicorn
from fastapi import FastAPI
from contests import Contests
import numpy as np
import pickle
import pandas as pd
# 2. Create the app object
app = FastAPI()
pickle_in = open("model.pkl", "rb")
classifier = pickle.load(pickle_in)


@app.post('/predict')
async def predict_title(data: Contests):
    try:
        # Convert Pydantic model to dict
        data_dict = data.model_dump()

        # Create input array for prediction
        input_features = [
            data_dict[f'contest{i}'] for i in range(1, 11)
        ]

        # Make prediction
        prediction = classifier.predict([input_features])

        # Return formatted response
        return {
            "status": "success",
            # Convert numpy array to list
            "prediction": prediction[0].tolist(),
            "input_data": data_dict
        }
    except Exception as e:
        # Error handling
        return {
            "status": "error",
            "message": str(e)
        }


# 5. Run the API with uvicorn
#    Will run on http://127.0.0.1:8000
if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)

# uvicorn app:app --reload
