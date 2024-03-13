import cv2
from deepface import DeepFace
import numpy as np


#building
# sequential = "scripts/extracted_face/extracted_face.jpg"
# model_temp = DeepFace.represent(img_path=sequential, model_name="VGG-Face") 


def extract_and_store_embedding(reference_image_path):
    embedding = DeepFace.represent(img_path=reference_image_path, model_name="VGG-Face")
    

    # Perform a temporary represent call to build the model
    _ = DeepFace.represent(img_path=reference_image_path, model_name="VGG-Face")
    # Store 'embedding' in your database or file
    # Example: Store as a NumPy array in a file[for the backend devs--With love Aryan]
    import numpy as np
    np.save("stored_embedding.npy", embedding)

live_image_path = "scripts/comparison_Img.JPG"

def compare_faces(live_image_path):
    stored_embedding = np.load("stored_embedding.npy", allow_pickle=True)

    live_embedding = DeepFace.represent(img_path=live_image_path, model_name="VGG-Face")
    #must delete "24-03-13 20:48:40 - Directory /Users/aryanraj/.deepface created"

    result = DeepFace.verify(img1_path = reference_image_path, img2_path = live_image_path, 
                            model_name="VGG-Face", distance_metric="cosine")

    if result['verified']:
        print("Faces match!")
    else:
        print("Faces do not match.")

# Example Usage:
# reference_image_path = "path/to/reference.jpg"
# extract_and_store_embedding(reference_image_path)

# live_image_path = "path/to/live_image.jpg"
# compare_faces(live_image_path)



#testing
reference_image_path = "scripts/extracted_face/extracted_face.jpg"
extract_and_store_embedding(reference_image_path)

live_image_path = "scripts/comparison_Img.JPG"
compare_faces(live_image_path)