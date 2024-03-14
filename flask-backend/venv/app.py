from flask import Flask, request, jsonify
from flask_cors import CORS
import shutil
import os
import sys
from easyocr import Reader
from pan_read import pan_read_data

scripts_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..', 'scripts/'))
sys.path.append(scripts_path)

print(sys.path)
app = Flask(__name__)
CORS(app)

# ####################################### Functions ####################################

# import cv2
# import xml.etree.ElementTree as ET

# def decode_qr_opencv(image_path):
#     image = cv2.imread(image_path)
#     detector = cv2.QRCodeDetector()
#     data, bbox, _ = detector.detectAndDecode(image)

#     if data:
#         return data
#     else:
#         print(f"No QR code detected in the image at {image_path}.")
#         return None


# ######################################################################################

from face_extraction_export import extract_adhaar_face
from face_matching_export import extract_and_store_embedding, compare_faces
from qr_uid_matching_export import decode_qr_opencv, check_uid_last_4_digits

ADHAAR_IMAGE = "scripts/aadhar_image"
EXTRACTED_FACE_IMAEG = "scripts/extracted_face_image"
COMPARISON_IMAGE = "scripts/comparison_image"
PANCARD_IMAGE = "scripts/pancard_image"
SIGNATURE_IMAGE = "scripts/signature_image"
PASSPORT_SIZE_IMAGE = "scripts/passport_sizee_image"

@app.route('/')
def index():
    return 'Hello, World!'

@app.route('/aadhar-upload', methods=['POST'])
def aadhar_upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename != '':  # Check if filename is not empty
        file_path = os.path.join(ADHAAR_IMAGE, file.filename)
        file.save(file_path)
        qr_data = decode_qr_opencv(file_path)

        if qr_data:
            return jsonify({
                'message': 'Aadhar uploaded and stored successfully and data extracted successfully',
                'qr_data': qr_data
            })
        else:
            return jsonify({
                'message': 'Aadhar uploaded and stored. No QR code detected.'
            })
    else:
        return jsonify({'error': 'File not stored'})

    
    



    

# @app.route('/pan-upload', methods=['POST'])
# def pan_upload():
#     if 'file' not in request.files:
#         return jsonify({'error': 'No file part'})
#     file = request.files['file']
#     # Do something with the uploaded PAN file
#     # return jsonify({'message': 'PAN uploaded successfully'})
#     if file.filename != '':  # Check if filename is not empty
#         file_path = os.path.join(PANCARD_IMAGE, file.filename)
#         file.save(file_path)
#         return jsonify({'message': 'Pan Card uploaded and stored successfully'})
#     else:
    



@app.route('/pan-upload', methods=['POST'])
def pan_upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    file = request.files['file']
    if file.filename != '':  # Check if filename is not empty
        file_path = os.path.join(PAN_CARD, file.filename)
        file.save(file_path)
        reader = Reader(['en'])
        result = reader.readtext(file_path, detail=0)
        text = ' '.join(result)
        data = pan_read_data(text)

        return jsonify({'message': 'Pan Card uploaded and stored successfully', 'data': data})
    else:
        return jsonify({'error': 'Invalid file'})

@app.route('/signature-upload', methods=['POST'])
def signature_upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    file = request.files['file']
    # Do something with the uploaded signature file
    #return jsonify({'message': 'Signature uploaded successfully'})
    if file.filename != '':  # Check if filename is not empty
        file_path = os.path.join(SIGNATURE_IMAGE, file.filename)
        file.save(file_path)
        return jsonify({'message': 'Signature uploaded and stored successfully'})
    else:
        return jsonify({'error': 'Invalid file'})

@app.route('/passport-photo-upload', methods=['POST'])
def passport_photo_upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    file = request.files['file']
    # Do something with the uploaded passport photo file
    # return jsonify({'message': 'Passport photo uploaded successfully'})
    if file.filename != '':  # Check if filename is not empty
        file_path = os.path.join(PASSPORT_SIZE_IMAGE, file.filename)
        file.save(file_path)
        return jsonify({'message': 'Passport Picture uploaded and stored successfully'})
    else:
        return jsonify({'error': 'Invalid file'})

if __name__ == '__main__':
    app.run(debug=True)
