import cv2
import xml.etree.ElementTree as ET

def decode_qr_opencv(image_path):
    image = cv2.imread(image_path)
    detector = cv2.QRCodeDetector()
    data, bbox, _ = detector.detectAndDecode(image)

    if data:
        print("QR Code data:", data)
        return data
    else:
        print("QR code not detected in the image.")
        return None

def check_uid_last_4_digits(qr_data, ocr_uid):
    root = ET.fromstring(qr_data)
    qr_uid = root.get('uid', '')
    if qr_uid[-4:] == ocr_uid[-4:]:
        print("Last 4 digits of UID match.")
    else:
        print("Last 4 digits of UID do not match.")

# Example usage
image_path = 'scripts/qrcode.png'
qr_data = decode_qr_opencv(image_path)
ocr_uid = 'XXXXXXXX7743'
check_uid_last_4_digits(qr_data, ocr_uid)
