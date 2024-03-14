from flask import Flask, request, jsonify
from flask_cors import CORS
import shutil
import os
import sys

scripts_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..', 'scripts'))
sys.path.append(scripts_path)

ocr_scripts_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..', 'ocr_scripts'))
sys.path.append(ocr_scripts_path)

from pan_ocr import ExtractDetails
from face_extraction_export import extract_adhaar_face
from face_matching_export import extract_and_store_embedding, compare_faces
from qr_uid_matching_export import decode_qr_opencv, check_uid_last_4_digits

app = Flask(__name__)
CORS(app)

ADHAAR_IMAGE = "scripts/aadhar_image"
EXTRACTED_FACE_IMAGE = "scripts/extracted_face_image"
COMPARISON_IMAGE = "scripts/comparison_image"
PANCARD_IMAGE = "scripts/pancard_image"
SIGNATURE_IMAGE = "scripts/signature_image"
PASSPORT_SIZE_IMAGE = "scripts/passport_size_image"

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
        check_face_extraction = extract_adhaar_face(file_path, EXTRACTED_FACE_IMAGE)
        check_uid = check_uid_last_4_digits(qr_data, 'XXXXXXXX7743')  # Replace with your actual UID


        if qr_data:
            return jsonify({
                'message': 'Aadhar uploaded and stored successfully and data extracted successfully',
                'qr_data': qr_data,
                'face_extraction': check_face_extraction,
                'uid_match': check_uid
            })
        else:
            return jsonify({
                'message': 'Aadhar uploaded and stored. No QR code detected.'
            })
    else:
        return jsonify({'error': 'File not stored'})
    

@app.route('/pan-upload', methods=['POST'])
def pan_upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    file = request.files['file']
    if file.filename != '':  # Check if filename is not empty
        file_path = os.path.join(PANCARD_IMAGE, file.filename)
        file.save(file_path)
        data = ExtractDetails(file_path)

        return jsonify({
            'message': 'Pan Card uploaded and stored successfully', 
            'pan_number': data[0], 
            'dob': data[1]
        })
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

@app.route('/livephoto-upload', methods=['POST'])
def livephoto_upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    file = request.files['file']
    # Do something with the uploaded signature file
    #return jsonify({'message': 'Signature uploaded successfully'})
    if file.filename != '':  # Check if filename is not empty
        file_path = os.path.join(COMPARISON_IMAGE, file.filename)
        file.save(file_path)

        extract_and_store_embedding(file_path)
        check_face_matching = compare_faces(EXTRACTED_FACE_IMAGE + "/extracted_face.jpg", file_path)

        return jsonify({
            'message': 'Live photo uploaded and stored successfully',
            'face_matching': check_face_matching
            })
    else:
        return jsonify({'error': 'Invalid file'})
    

@app.route('/passport-photo-upload', methods=['POST'])
def passport_photo_upload():
    global COMPARISON_IMAGE
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    file = request.files['file']
    # Do something with the uploaded passport photo file
    # return jsonify({'message': 'Passport photo uploaded successfully'})
    if file.filename != '':  # Check if filename is not empty
        file_path = os.path.join(PASSPORT_SIZE_IMAGE, file.filename)
        file.save(file_path)

        extract_and_store_embedding(file_path)
        check_face_matching = compare_faces(file_path, COMPARISON_IMAGE + "/live_photo.jpg")

        return jsonify({
            'message': 'Passport photo uploaded and stored successfully',
            'face_matching': check_face_matching
            })
    else:
        return jsonify({'error': 'Invalid file'})

if __name__ == '__main__':
    app.run(debug=True)
