// export default function VideoPlayer() {
//     return (
//       <div className="w-full h-[60%] bg-black rounded-lg mb-4">
//         {/* Replace src with your actual stream/API */}
//         <video src="/sample.mp4" controls className="w-full h-full rounded-lg" />
//       </div>
//     );
//   }
  

"use client";
import { useEffect, useRef, useState } from "react";

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
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

  return (
    <div className="w-full h-[60%] bg-black rounded-lg mb-4 flex items-center justify-center">
      {error ? (
        <p className="text-white text-sm">{error}</p>
      ) : (
        <video ref={videoRef} autoPlay playsInline className="w-full h-full rounded-lg" />
      )}
    </div>
  );
}
