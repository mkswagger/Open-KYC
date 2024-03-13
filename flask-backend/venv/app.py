from flask import Flask, request, jsonify
from flask_cors import CORS
import shutil
import os

app = Flask(__name__)
CORS(app)

ADHAAR_FOLDER = "scripts/aadhar_image"
PAN_CARD = "scripts/Pan_card"
SIGNATURE = "scripts/signatures"
PASSPORTPIC = "scripts/Passport_pic"

@app.route('/')
def index():
    return 'Hello, World!'

@app.route('/aadhar-upload', methods=['POST'])
def aadhar_upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename != '':  # Check if filename is not empty
        file_path = os.path.join(ADHAAR_FOLDER, file.filename)
        file.save(file_path)
        return jsonify({'message': 'Aadhar uploaded and stored successfully'})
    else:
        return jsonify({'error': 'Invalid file'})

@app.route('/pan-upload', methods=['POST'])
def pan_upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    file = request.files['file']
    # Do something with the uploaded PAN file
    # return jsonify({'message': 'PAN uploaded successfully'})
    if file.filename != '':  # Check if filename is not empty
        file_path = os.path.join(PAN_CARD, file.filename)
        file.save(file_path)
        return jsonify({'message': 'Pan Card uploaded and stored successfully'})
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
        file_path = os.path.join(SIGNATURE, file.filename)
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
        file_path = os.path.join(PASSPORTPIC, file.filename)
        file.save(file_path)
        return jsonify({'message': 'Passport Picture uploaded and stored successfully'})
    else:
        return jsonify({'error': 'Invalid file'})

if __name__ == '__main__':
    app.run(debug=True)
