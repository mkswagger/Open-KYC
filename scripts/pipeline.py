from face_matching_export import extract_and_store_embedding, compare_faces
from face_extraction_export import extract_adhaar_face
from qr_uid_matching_export import decode_qr_opencv, check_uid_last_4_digits

def run_pipeline(aadhar_image_path, extracted_face_folder_path, extracted_face_path, comparison_image_path, qr_image_path):
    extract_adhaar_face(aadhar_image_path, extracted_face_path)

    extract_and_store_embedding(extracted_face_folder_path)
    compare_faces(extracted_face_folder_path, comparison_image_path)

    uid = 'XXXXXXXX7743' # Later to be replaced with OCR UID function
    qr_data = decode_qr_opencv(qr_image_path)
    check_uid_last_4_digits(qr_data, uid)

if __name__ == "__main__":
    aadhar_image_path = "scripts/aadhar_image/aadhar.png"
    extracted_face_path = "scripts/extracted_face_image"
    extracted_face_folder_path = "scripts/extracted_face_image/extracted_face.jpg"
    comparison_image_path = "scripts/comparison_image/comparison_Img.JPG"
    qr_image_path = "scripts/aadhar_image/aadhar.png"
    run_pipeline(aadhar_image_path, extracted_face_folder_path, extracted_face_path, comparison_image_path, qr_image_path)