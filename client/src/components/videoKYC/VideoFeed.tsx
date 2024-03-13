import React, { useEffect, useRef } from "react";

const VideoFeed = ({ videoRef }) => {
  const localVideoRef = useRef(null);
  const usedVideoRef = videoRef || localVideoRef; // Use passed ref if available

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          const video = usedVideoRef.current;
          if (video) {
            video.srcObject = stream;
            video.play();
          }
        })
        .catch((error) => {
          console.error("Error accessing the camera", error);
        });
    }
  }, [usedVideoRef]);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <video ref={usedVideoRef} style={{ width: "100%" }}></video>
      <div
        style={{
          position: "absolute",
          top: "10%", // Adjust these values as needed
          left: "10%",
          width: "80%", // Adjust width and height as needed
          height: "80%",
          border: "2px solid red", // Adjust border color and thickness as needed
          pointerEvents: "none", // Ensures clicks go through to the video
        }}
      ></div>
    </div>
  );
};

export default VideoFeed;
