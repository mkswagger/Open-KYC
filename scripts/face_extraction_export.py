import cv2
import os

def extract_adhaar_face(aadhar_image_path, extracted_face_path):    
    image = cv2.imread(aadhar_image_path)
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
    aadhar_image_path = "scripts/aadhar_image/aadhar.png"
    extracted_face_path = "scripts/extracted_face"
    extract_adhaar_face(aadhar_image_path, extracted_face_path)