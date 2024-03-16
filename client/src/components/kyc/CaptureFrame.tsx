import React, { useState, useRef, useEffect } from "react";
import WebcamFeed from "@/components/kyc/WebcamFeed";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import "@/components/translations/Translations";
import { useTranslation } from "react-i18next";

const CaptureFrame = ({ onNextStep }) => {
  const { t } = useTranslation();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImages, setCapturedImages] = useState({
    photo: null,
    pan: null,
    sign: null,
  });

  const [currentFrame, setCurrentFrame] = useState("photo");
  const [title, setTitle] = useState("Take a Live Photograph");
  const [subtitle, setSubtitle] = useState(
    "Position your face inside the rectangle",
  );

  useEffect(() => {
    canvasRef.current = document.createElement("canvas");
  }, []);

  const captureImage = (frameType) => {
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
        rectHeight,
      );

      const imageDataUrl = canvas.toDataURL("image/png");
      setCapturedImages((prevImages) => ({
        ...prevImages,
        [frameType]: imageDataUrl,
      }));
    }
  };

  const handleCapture = () => {
    captureImage(currentFrame);
    setShowLoader(true);
  };

  const handleRetake = () => {
    setCapturedImages({
      ...capturedImages,
      [currentFrame]: null,
    });
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

  const speakMessage = (message) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = message;
      speech.volume = 1;
      speech.rate = 1;
      speech.pitch = 1;
      window.speechSynthesis.speak(speech);
    }
  };

  const handleSaveAndContinue = () => {
    // Logic to navigate to the next frame type
    if (currentFrame === "photo") {
      setCurrentFrame("pan");
      setTitle("Take a PAN Card Photograph");
      setSubtitle("Position your PAN Card inside the rectangle for photo");
      speakMessage(
        "Position your PAN card inside the frame and click the capture button to take a picture of your PAN card. After capturing the picture, proceed to the next step.",
      );
    } else if (currentFrame === "pan") {
      setCurrentFrame("aadhar");
      setTitle("Take a Aadhaar Photograph");
      setSubtitle("Position your Aadhaar inside the rectangle for photo");
      speakMessage(
        "Position your Aadhaar card inside the frame and click the capture button to take a picture of your Aadhaar card. After capturing the picture, proceed to the next step.",
      );
    } else {
      // Reached the end, handle saving or navigation logic here
      console.log("All frames captured:", capturedImages);
      // Example logic: Redirect or navigate to the next step/page
      onNextStep();
      speakMessage(
        "Congrats your KYC process is completed. Your KYC status will be updated in the dashboard.",
      );
    }
  };

  const [showLoader, setShowLoader] = useState(true); // State to track whether to show the loader or not

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false); // After 5 seconds, hide the loader
    }, 7000);

    // Clean up the timer to prevent memory leaks
    return () => clearTimeout(timer);
  }, [showLoader]); // Run this effect only once, similar to componentDidMount

  return (
    <div className="text-center w-[600px] mx-auto my-10 p-5">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-md">{subtitle}</p>
      <div className="video-capture-container flex flex-col justify-center">
        {capturedImages[currentFrame] ? (
          <Image
            src={capturedImages[currentFrame]}
            alt={`Captured ${currentFrame}`}
            className="captured-image mx-auto border border-gray-300 rounded-sm my-5"
            width={560}
            height={430}
          />
        ) : (
          <WebcamFeed videoRef={videoRef} frameType={currentFrame} />
        )}
        <div className="button-container flex justify-center">
          {capturedImages[currentFrame] ? (
            <div className="">
              <Button
                onClick={handleRetake}
                variant="outline"
                className="action-button mr-2"
              >
                {t("Retake")}
              </Button>
              {showLoader ? ( // Show loader if showLoader is true
                <div className="loader py-2">Please wait, processing...</div>
              ) : (
                <Button
                  onClick={handleSaveAndContinue}
                  variant="outline"
                  className="action-button ml-2 bg-green-400"
                >
                  {t("Save and continue")}
                </Button>
              )}
            </div>
          ) : (
            <Button
              onClick={handleCapture}
              variant="outline"
              className="action-button text-white bg-blue-600"
            >
              {t("Capture Frame")}
            </Button>
          )}
        </div>
        {!showLoader && capturedImages[currentFrame] ? (
          <div className="loader font-semibold text-md my-4">
            {t("Image Captured")}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default CaptureFrame;
