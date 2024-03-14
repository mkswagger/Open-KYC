import React, { useState, useRef, useEffect } from "react";
import CameraFeed from "@/components/kyc/VideoFeed";

const SignatureVerification = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    canvasRef.current = document.createElement("canvas");
  }, []);

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext("2d");

      const rectX = video.videoWidth * 0.1;
      const rectY = video.videoHeight * 0.1;
      const rectWidth = video.videoWidth * 0.8;
      const rectHeight = video.videoHeight * 0.8;

      canvas.width = rectWidth;
      canvas.height = rectHeight;

      context.drawImage(
        video,
        rectX,
        rectY,
        rectWidth,
        rectHeight,
        0,
        0,
        rectWidth,
        rectHeight
      );

      const stream = video.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());

      const imageDataUrl = canvas.toDataURL("image/png");
      setCapturedImage(imageDataUrl);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          const video = videoRef.current;
          video.srcObject = stream;
          video.play();
        })
        .catch((error) => {
          console.error("Error accessing the camera", error);
        });
    }
  };

  return (
    <div className="text-center w-[600px] mx-auto p-5">
      <h2>Position your signature inside the rectangle</h2>
      <div className="video-capture-container">
        {capturedImage ? (
          <img
            src={capturedImage}
            alt="Captured frame"
            className="captured-image"
          />
        ) : (
          <CameraFeed videoRef={videoRef} />
        )}
        <div className="button-container">
          {capturedImage ? (
            <>
              <button onClick={handleRetake} className="action-button">
                Retake
              </button>
              <button className="action-button">Save and continue</button>
            </>
          ) : (
            <button onClick={handleCapture} className="action-button">
              Capture Frame
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignatureVerification;
