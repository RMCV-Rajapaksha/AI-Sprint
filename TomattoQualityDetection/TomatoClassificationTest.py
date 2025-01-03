import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import matplotlib.pyplot as plt
import os

# Configure model path - fix model name
MODEL_PATH = r'C:\Users\ROG\OneDrive\Desktop\Projects\Tomato\tomato_classification_model.h5'

try:
    # Verify model exists
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")

    # Load the saved model
    model = tf.keras.models.load_model(MODEL_PATH)
except Exception as e:
    print(f"Error loading model: {str(e)}")
    exit(1)

# Class labels for tomato diseases
class_names = ['Damaged', 'Old', 'Ripe', 'Unripe']

def predict_image(image_path):
    try:
        # Verify image exists
        if not os.path.exists(image_path):
            raise FileNotFoundError(f"Image not found at {image_path}")
            
        # Load and preprocess image
        img = load_img(image_path, target_size=(224, 224))
        img_array = img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = img_array / 255.0
        
        # Make prediction
        predictions = model.predict(img_array)
        predicted_class = class_names[np.argmax(predictions[0])]
        confidence = float(np.max(predictions[0]))
        
        # Display results
        plt.figure(figsize=(8, 6))
        plt.imshow(img)
        plt.title(f'Prediction: {predicted_class}\nConfidence: {confidence:.2f}')
        plt.axis('off')
        plt.show()
        
        return predicted_class, confidence
    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        return None, None

# Test image path - update with your test image path
image_path = r'C:\Users\ROG\OneDrive\Desktop\Projects\Tomato\content\ieee-mbl-cls\val\Ripe\r (383).jpg'

# Make prediction
result, conf = predict_image(image_path)
if result:
    print(f'Predicted class: {result}')
    print(f'Confidence: {conf:.2f}')