"use client";
import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../../lib/firebase";
import { getAuth } from "firebase/auth";

// Define the type for eye data
interface EyeData {
  leftEyeCenter: { x: number; y: number };
  rightEyeCenter: { x: number; y: number };
  leftEyeBox: { x: number; y: number; width: number; height: number };
  rightEyeBox: { x: number; y: number; width: number; height: number };
}

export default function VideoPlayerWithEyeTracking() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoScreenRef = useRef<HTMLVideoElement | null>(null);
  const canvasScreenRef = useRef<HTMLCanvasElement | null>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [eyeData, setEyeData] = useState<EyeData | null>(null);
  const [uid, setUid] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth(); // Make sure this is called inside the effect
    const user = auth.currentUser;

    if (user) {
      setUid(user.uid);
      console.log("User ID (immediate):", user.uid);
    } else {
      // Listen for auth state changes
      const unsubscribe = auth.onAuthStateChanged((usr) => {
        if (usr) {
          setUid(usr.uid);
          console.log("User ID (from listener):", usr.uid);
        } else {
          console.log("No user logged in.");
        }
      });

      return () => unsubscribe();
    }
  }, []);

  // Screen capture setup

  useEffect(() => {
    if (!uid) return; // 🔒 Do nothing until uid is ready
    const startScreenshotCapture = async () => {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        const video = document.createElement("video");
        video.srcObject = stream;
        video.play();
        video.style.display = "none";
        document.body.appendChild(video);
        videoScreenRef.current = video;

        const canvas = document.createElement("canvas");
        canvas.style.display = "none";
        document.body.appendChild(canvas);
        canvasScreenRef.current = canvas;

        const interval = setInterval(() => {
          if (!video.videoWidth || !video.videoHeight) {
            console.log("⏳ Waiting for video to be ready...");
            return;
          }

          const now = new Date();
          const pad = (n: number) => n.toString().padStart(2, "0");
          const dateStr = `${now.getFullYear()}-${pad(
            now.getMonth() + 1
          )}-${pad(now.getDate())}`;
          const timeStr = `${pad(now.getHours())}-${pad(now.getMinutes())}`;

          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            console.error("❌ Could not get 2D context from canvas");
            return;
          }
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          canvas.toBlob(async (blob) => {
            if (!blob) return;

            const storage = getStorage(app);
            const imageRef = ref(
              storage,
              `${uid}/screenrecord/SR-${dateStr}-${timeStr}.png`
            );

            try {
              await uploadBytes(imageRef, blob);
              console.log("Uploaded screenshot!");
            } catch (uploadErr) {
              console.error("Upload error:", uploadErr);
            }
          }, "image/png");
        }, 60 * 1000); // Every 30 seconds

        return () => {
          clearInterval(interval);
          video.remove();
          canvas.remove();
          stream.getTracks().forEach((t) => t.stop());
        };
      } catch (err) {
        console.error("🛑 Error during screen capture:", err);
      }
    };

    startScreenshotCapture();
  }, [uid]);

  // Load face-api.js models

  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL =
          "https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights";

        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        ]);

        setModelsLoaded(true);
        console.log("Models loaded successfully");
      } catch (error) {
        console.error("Failed to load models:", error);
      }
    };

    loadModels();
  }, []);

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera error:", err);
      }
    }
    setupCamera();
  }, []);

  // Modified function to capture combined screenshot with eye tracking
  const captureScreenshotWithEyeTracking = () => {
    if (!videoRef.current || !canvasRef.current || !overlayCanvasRef.current)
      return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const overlayCanvas = overlayCanvasRef.current;

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // First, draw the video frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Then, draw the overlay (eye tracking boxes) on top
    if (overlayCanvas.width > 0 && overlayCanvas.height > 0) {
      ctx.drawImage(overlayCanvas, 0, 0, canvas.width, canvas.height);
    }

    // Convert combined image to blob and upload
    canvas.toBlob(async (blob) => {
      if (!blob) return;

      const now = new Date();
      const pad = (n: number) => n.toString().padStart(2, "0");
      const dateStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
        now.getDate()
      )}`;
      const timeStr = `${pad(now.getHours())}-${pad(now.getMinutes())}`;

      const storage = getStorage(app);
      const imageRef = ref(
        storage,
        `${uid}/eyetracking/ET-${dateStr}-${timeStr}.png`
      );

      try {
        await uploadBytes(imageRef, blob);
        console.log("Uploaded screenshot with eye tracking!");
      } catch (uploadErr) {
        console.error("Upload error:", uploadErr);
      }
    }, "image/png");
  };

  useEffect(() => {
    if (!uid) return; // 🔒 Do nothing until uid is ready
    const interval = setInterval(() => {
      captureScreenshotWithEyeTracking();
    }, 60000); // every 1 min

    return () => clearInterval(interval);
  }, [uid]);

  // Function to calculate bounding box for eye landmarks
  const calculateEyeBox = (eyeLandmarks: any[]) => {
    const xCoords = eyeLandmarks.map((point) => point.x);
    const yCoords = eyeLandmarks.map((point) => point.y);

    const minX = Math.min(...xCoords);
    const maxX = Math.max(...xCoords);
    const minY = Math.min(...yCoords);
    const maxY = Math.max(...yCoords);

    return {
      x: minX - 10,
      y: minY - 10,
      width: maxX - minX + 20,
      height: maxY - minY + 20,
    };
  };

  const detectEyes = async () => {
    if (videoRef.current && modelsLoaded && videoRef.current.readyState === 4) {
      try {
        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks();

        if (detections.length > 0) {
          const landmarks = detections[0].landmarks;
          const leftEye = landmarks.getLeftEye();
          const rightEye = landmarks.getRightEye();

          // Calculate eye centers
          const leftEyeCenter = leftEye.reduce(
            (acc, point) => ({
              x: acc.x + point.x,
              y: acc.y + point.y,
            }),
            { x: 0, y: 0 }
          );
          leftEyeCenter.x /= leftEye.length;
          leftEyeCenter.y /= leftEye.length;

          const rightEyeCenter = rightEye.reduce(
            (acc, point) => ({
              x: acc.x + point.x,
              y: acc.y + point.y,
            }),
            { x: 0, y: 0 }
          );
          rightEyeCenter.x /= rightEye.length;
          rightEyeCenter.y /= rightEye.length;

          // Calculate bounding boxes
          const leftEyeBox = calculateEyeBox(leftEye);
          const rightEyeBox = calculateEyeBox(rightEye);

          const newEyeData = {
            leftEyeCenter: { x: leftEyeCenter.x, y: leftEyeCenter.y },
            rightEyeCenter: { x: rightEyeCenter.x, y: rightEyeCenter.y },
            leftEyeBox,
            rightEyeBox,
          };

          setEyeData(newEyeData);
          drawEyeBoxes(newEyeData);
        } else {
          setEyeData(null);
          clearCanvas();
        }
      } catch (error) {
        console.error("Detection error:", error);
      }
    }
  };

  // Function to draw red boxes around eyes
  const drawEyeBoxes = (data: EyeData) => {
    const canvas = overlayCanvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set style for eye boxes
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;
    ctx.fillStyle = "rgba(255, 0, 0, 0.1)";

    // Draw left eye box
    ctx.strokeRect(
      data.leftEyeBox.x,
      data.leftEyeBox.y,
      data.leftEyeBox.width,
      data.leftEyeBox.height
    );
    ctx.fillRect(
      data.leftEyeBox.x,
      data.leftEyeBox.y,
      data.leftEyeBox.width,
      data.leftEyeBox.height
    );

    // Draw right eye box
    ctx.strokeRect(
      data.rightEyeBox.x,
      data.rightEyeBox.y,
      data.rightEyeBox.width,
      data.rightEyeBox.height
    );
    ctx.fillRect(
      data.rightEyeBox.x,
      data.rightEyeBox.y,
      data.rightEyeBox.width,
      data.rightEyeBox.height
    );

    // Draw eye center dots
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(data.leftEyeCenter.x, data.leftEyeCenter.y, 4, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(data.rightEyeCenter.x, data.rightEyeCenter.y, 4, 0, 2 * Math.PI);
    ctx.fill();

    // Add labels
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText("L", data.leftEyeBox.x, data.leftEyeBox.y - 5);
    ctx.fillText("R", data.rightEyeBox.x, data.rightEyeBox.y - 5);
  };

  const clearCanvas = () => {
    const canvas = overlayCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  useEffect(() => {
    if (!modelsLoaded) return;

    const interval = setInterval(detectEyes, 100);
    return () => clearInterval(interval);
  }, [modelsLoaded]);

  return (
    <div className="w-full h-[60%] bg-black rounded-lg mb-4 flex items-center justify-center relative">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-full rounded-lg"
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Overlay canvas for drawing eye boxes */}
      <canvas
        ref={overlayCanvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-lg"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />

      {/* Eye tracking info display */}
      <div className="absolute top-4 left-4 text-white text-sm bg-black bg-opacity-50 p-2 rounded">
        <div>Models: {modelsLoaded ? "✅ Loaded" : "⏳ Loading..."}</div>
        {eyeData ? (
          <>
            <div>👁️ Eyes detected!</div>
            <div>
              Left: ({eyeData.leftEyeCenter.x.toFixed(0)},{" "}
              {eyeData.leftEyeCenter.y.toFixed(0)})
            </div>
            <div>
              Right: ({eyeData.rightEyeCenter.x.toFixed(0)},{" "}
              {eyeData.rightEyeCenter.y.toFixed(0)})
            </div>
          </>
        ) : (
          <div>👁️ Looking for eyes...</div>
        )}
      </div>
    </div>
  );
}
