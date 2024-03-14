import cv2
from deepface import DeepFace
import numpy as np

def extract_and_store_embedding(reference_image_path):
    embedding = DeepFace.represent(img_path=reference_image_path, model_name="VGG-Face")
    _ = DeepFace.represent(img_path=reference_image_path, model_name="VGG-Face") # Perform a temporary represent call to build the model
    np.save("stored_embedding.npy", embedding)

def compare_faces(reference_image_path, live_image_path):
    stored_embedding = np.load("stored_embedding.npy", allow_pickle=True)
    live_embedding = DeepFace.represent(img_path=live_image_path, model_name="VGG-Face")
    result = DeepFace.verify(img1_path = reference_image_path, img2_path = live_image_path, 
                            model_name="VGG-Face", distance_metric="cosine")

    if result['verified']:
        print("Faces match!")
    else:
        print("Faces do not match!")

if __name__ == "__main__":
    extracted_face_path = "scripts/extracted_face_image/extracted_face.jpg"
    live_image_path = "scripts/comparison_image/comparison_Img.JPG"
    extract_and_store_embedding(extracted_face_path)
    compare_faces(extracted_face_path, live_image_path)