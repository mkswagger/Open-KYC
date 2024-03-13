from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return 'Hello, World!'

@app.route('/aadhar-upload', methods=['POST'])
def aadhar_upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    file = request.files['file']
    # Do something with the uploaded Aadhar file
    return jsonify({'message': 'Aadhar uploaded successfully'})

@app.route('/pan-upload', methods=['POST'])
def pan_upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    file = request.files['file']
    # Do something with the uploaded PAN file
    return jsonify({'message': 'PAN uploaded successfully'})

@app.route('/signature-upload', methods=['POST'])
def signature_upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    file = request.files['file']
    # Do something with the uploaded signature file
    return jsonify({'message': 'Signature uploaded successfully'})

@app.route('/passport-photo-upload', methods=['POST'])
def passport_photo_upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    file = request.files['file']
    # Do something with the uploaded passport photo file
    return jsonify({'message': 'Passport photo uploaded successfully'})

if __name__ == '__main__':
    app.run(debug=True)
