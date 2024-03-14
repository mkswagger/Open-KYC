import cv2
import xml.etree.ElementTree as ET

def decode_qr_opencv(image_path):
    image = cv2.imread(image_path)
    detector = cv2.QRCodeDetector()
    data, bbox, _ = detector.detectAndDecode(image)

    if data:
        return data
    else:
        # print(f"No QR code detected in the image at {image_path}.")
        return None

def check_uid_last_4_digits(qr_data, ocr_uid):
    root = ET.fromstring(qr_data)
    qr_uid = root.get('uid', '')
    is_match = qr_uid[-4:] == ocr_uid[-4:]
    if is_match:
        # print(f"Success: The last 4 digits of the UID from the QR code ({qr_uid[-4:]}) match the OCR UID ({ocr_uid[-4:]}).")
        return True
    else:
        # print(f"Error: The last 4 digits of the UID from the QR code ({qr_uid[-4:]}) do not match the OCR UID ({ocr_uid[-4:]}).")
        return False

# Example usage
image_path = 'scripts/aadhar_image/aadhar.png'
ocr_uid = 'XXXXXXXX7743'  # Replace with your actual UID
qr_data= decode_qr_opencv(image_path)
check_uid_last_4_digits(qr_data, ocr_uid)