import cv2
import numpy as np
import webbrowser
from pyzbar.pyzbar import decode

def preprocess_frame(frame):
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    thresh = cv2.adaptiveThreshold(
        gray, 255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        11, 2
    )
    denoised = cv2.fastNlMeansDenoising(thresh)
    return denoised

def main():
    cap = cv2.VideoCapture(0)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)
    
    while True:
        ret, frame = cap.read()
        if not ret:
            print("Failed to grab frame")
            break
            
        original_frame = frame.copy()
        processed_frame = preprocess_frame(frame)
        
        try:
            decoded_objects = decode(original_frame) + decode(processed_frame)
            
            for obj in decoded_objects:
                data = obj.data.decode("utf-8")
                bbox = obj.polygon
                
                if len(bbox) == 4:
                    pts = np.array([[point.x, point.y] for point in bbox], dtype=np.int32)
                    pts = pts.reshape((-1, 1), 2)
                    frame = cv2.polylines(frame, [pts], isClosed=True, color=(0, 255, 0), thickness=2)
                    
                    if data:
                        print(f"Code Detected: {data}")
                        cv2.putText(
                            frame,
                            data,
                            (pts[0][0][0], pts[0][0][1] - 10),
                            cv2.FONT_HERSHEY_SIMPLEX,
                            0.5,
                            (0, 255, 0),
                            2
                        )
                        if data.startswith("http://") or data.startswith("https://"):
                            webbrowser.open(data)
        
        except Exception as e:
            print(f"Error during code detection: {e}")
            continue
       
        cv2.imshow("Code Scanner", frame)
        cv2.imshow("Processed Frame", processed_frame)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()