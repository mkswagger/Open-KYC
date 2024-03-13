from PIL import Image
from io import BytesIO
import numpy as np
import cv2
import os
import requests

def extract_adhaar_face(aadhar_image_path, extracted_face_path):    
    response = requests.get(aadhar_image_path)
    image = Image.open(BytesIO(response.content))
    image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    face_cascade = cv2.CascadeClassifier("scripts/haarcascade_frontalface_default.xml")
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    if len(faces) > 0:
        x, y, w, h = faces[0] 
        face_roi = image[y:y+h, x:x+w]
        cv2.imwrite(os.path.join(extracted_face_path + "/extracted_face.jpg"), face_roi)
        print("Face extracted and saved as 'extracted_face.jpg'")

    else:
        print("No faces detected in the Aadhar image.")

if __name__ == "__main__":
    aadhar_image_path = "http://127.0.0.1:8000/image"
    extracted_face_path = "scripts/extracted_face"
    extract_adhaar_face(aadhar_image_path, extracted_face_path)