import cv2

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

# Example usage
image_path = 'scripts/qrcode.png'
qr_data = decode_qr_opencv(image_path)

print(qr_data)
