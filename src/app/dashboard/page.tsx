"use client";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { app } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import MoodAnalysis from "./../components/MoodAnalysis";
import TranscriptSidebar from "./../components/TranscriptSidebar";
import Header from "./../components/Header";
import VideoPlayerWithEyeTracking from "../components/VideoPlayerWithEyeTracking";
import { getAuth } from "firebase/auth";
import { useCallback } from "react";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [script, setScript] = useState(""); // Store transcribed text
  const [finalSpeech, setFinalSpeech] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const listeningRef = useRef(false);
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, "0");
  const dateStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
    now.getDate()
  )}`;
  const timeStr = `${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(
    now.getSeconds()
  )}`;

  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("🔐 User is logged in:", user.uid);

        setChecking(false);
      } else {
        router.push("/login");
      }
    });

    return () => unsub();
  }, []);

  // useEffect(() => {
  //   initializeSpeechRecognition();

  //   return () => {
  //     if (recognitionRef.current) {
  //       recognitionRef.current.stop();
  //     }
  //   };
  // }, []);

  // const initializeSpeechRecognition = () => {
  //   // ✅ Check for browser compatibility
  //   const SpeechRecognition =
  //     (window as any).SpeechRecognition ||
  //     (window as any).webkitSpeechRecognition;
  //   const synth = (window as any).speechSynthesis;

  //   if (!SpeechRecognition || !synth) {
  //     console.warn("Web Speech API is not supported in this browser.");
  //     return;
  //   }

  //   let recognition = new SpeechRecognition();
  //   recognition.continuous = true;
  //   recognition.lang = "en-US";
  //   recognition.interimResults = false;

  //   recognitionRef.current = recognition;

  //   // ✅ Start recognition loop
  //   const startListening = () => {
  //     if (!listeningRef.current) {
  //       try {
  //         recognition.start();
  //         listeningRef.current = true;
  //         setIsListening(true);
  //       } catch (e) {
  //         console.error("Failed to start recognition:", e);
  //       }
  //     }
  //   };

  //   let idleTimeout: NodeJS.Timeout | null = null;

  //   recognition.onresult = (event: any) => {
  //     const transcript =
  //       event.results[event.results.length - 1][0].transcript.trim();
  //     console.log("🧠 Heard:", transcript);

  //     // Clear existing timeout first
  //     if (idleTimeout) {
  //       clearTimeout(idleTimeout);
  //       idleTimeout = null;
  //     }

  //     // Update script with all spoken text
  //     setScript((prev) => {
  //       const newScript = prev + transcript + " ";
  //       console.log("📝 Full script:", newScript);

  //       // Restart 5s idle timer every update
  //       idleTimeout = setTimeout(async () => {
  //         setFinalSpeech(newScript.trim());
  //         setScript(""); // clear buffer
  //         console.log("✅ Final speech submitted:", newScript.trim());

  //         // Upload final speech to Firebase Storage

  //         try {
  //           const db = getFirestore(app);
  //           const auth = getAuth();
  //           const user = auth.currentUser;

  //           if (!user) {
  //             console.warn("User not authenticated. Skipping Firestore write.");
  //             return;
  //           }

  //           const speechRef = collection(db, "user", user.uid, "speech");
  //           await addDoc(speechRef, {
  //             SpeechText: newScript.trim(),
  //             DateTime: `${dateStr}-${timeStr}"`,
  //           });

  //           console.log("📝 Speech saved to Firestore");
  //         } catch (err) {
  //           console.error("❌ Error saving speech:", err);
  //         }
  //       }, 10000);
  //       return newScript;
  //     });

  //     // Optional: Add voice commands
  //     const lowerTranscript = transcript.toLowerCase();
  //     if (lowerTranscript.includes("hey assistant")) {
  //       speak("Yes? How can I help?");
  //     } else if (lowerTranscript.includes("clear script")) {
  //       setScript("");
  //       speak("Script cleared");
  //     }
  //   };

  //   recognition.onerror = (e: any) => {
  //     console.error("🎙️ Speech recognition error:", e.error);
  //     if (e.error === "not-allowed" || e.error === "service-not-allowed") {
  //       alert(
  //         "Microphone access was denied. Please allow microphone access and refresh the page."
  //       );
  //     }
  //     listeningRef.current = false;
  //     setIsListening(false);
  //   };

  //   recognition.onend = () => {
  //     listeningRef.current = false;
  //     setIsListening(false);
  //     // Restart automatically after 1 second
  //     setTimeout(startListening, 1000);
  //   };

  //   recognition.onstart = () => {
  //     console.log("🎤 Speech recognition started");
  //     setIsListening(true);
  //   };

  //   // Start listening
  //   startListening();

  //   // ✅ Simple speech function
  //   const speak = (text: string) => {
  //     const utterance = new SpeechSynthesisUtterance(text);
  //     utterance.lang = "en-US";
  //     synth.speak(utterance);
  //   };
  // };

  // Add these refs at the top of your component
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isProcessingRef = useRef(false);
  const isInitializedRef = useRef(false);

  const initializeSpeechRecognition = useCallback(() => {
    // Prevent multiple initializations
    if (isInitializedRef.current) {
      console.log("⚠️ Speech recognition already initialized, skipping...");
      return;
    }

    console.log("🎤 Initializing speech recognition...");
    isInitializedRef.current = true;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    const synth = (window as any).speechSynthesis;

    if (!SpeechRecognition || !synth) {
      console.warn("Web Speech API is not supported in this browser.");
      return;
    }

    let recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognitionRef.current = recognition;

    // Separate Firebase save function
    const saveSpeechToFirebase = async (speechText: string) => {
      // Double-check processing flag
      if (isProcessingRef.current) {
        console.log("⚠️ Already processing Firebase save, skipping...");
        return;
      }

      isProcessingRef.current = true;
      const timestamp = Date.now();
      console.log(`🔥 Attempting to save at ${timestamp}:`, speechText);

      try {
        const db = getFirestore(app);
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          console.warn("User not authenticated. Skipping Firestore write.");
          return;
        }

        const speechRef = collection(db, "user", user.uid, "speech");
        const docRef = await addDoc(speechRef, {
          SpeechText: speechText,
          DateTime: `${dateStr}-${timeStr}`,
          Timestamp: timestamp,
        });

        console.log(`📝 Speech saved to Firestore with ID: ${docRef.id}`);
      } catch (err) {
        console.error("❌ Error saving speech:", err);
      } finally {
        // Reset processing flag after a short delay to prevent rapid duplicates
        setTimeout(() => {
          isProcessingRef.current = false;
        }, 1000);
      }
    };

    const processTimeout = () => {
      console.log("⏰ Timeout triggered - processing final speech");

      // Clear the timeout reference immediately
      idleTimeoutRef.current = null;

      // Double-check processing flag
      if (isProcessingRef.current) {
        console.log("⚠️ Already processing timeout, skipping...");
        return;
      }

      setScript((currentScript) => {
        const finalText = currentScript.trim();

        if (finalText) {
          console.log("✅ Final speech submitted:", finalText);
          setFinalSpeech(finalText);
          saveSpeechToFirebase(finalText);
        }

        return ""; // Clear the script
      });
    };

    recognition.onresult = (event: any) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript.trim();
      console.log("🧠 Heard:", transcript);

      // Clear existing timeout FIRST
      if (idleTimeoutRef.current) {
        console.log("🧹 Clearing existing timeout");
        clearTimeout(idleTimeoutRef.current);
        idleTimeoutRef.current = null;
      }

      // Update script
      setScript((prev) => {
        const newScript = prev + transcript + " ";
        console.log("📝 Full script:", newScript);
        return newScript;
      });

      // Set NEW timeout with a unique reference
      console.log("⏰ Setting new timeout");
      idleTimeoutRef.current = setTimeout(processTimeout, 10000);

      // Voice commands
      const lowerTranscript = transcript.toLowerCase();
      if (lowerTranscript.includes("hey assistant")) {
        speak("Yes? How can I help?");
      } else if (lowerTranscript.includes("clear script")) {
        setScript("");
        speak("Script cleared");
      }
    };

    const startListening = () => {
      if (!listeningRef.current) {
        try {
          recognition.start();
          listeningRef.current = true;
          setIsListening(true);
        } catch (e) {
          console.error("Failed to start recognition:", e);
        }
      }
    };

    recognition.onerror = (e: any) => {
      console.error("🎙️ Speech recognition error:", e.error);
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        alert(
          "Microphone access was denied. Please allow microphone access and refresh the page."
        );
      }
      listeningRef.current = false;
      setIsListening(false);
    };

    recognition.onend = () => {
      console.log("🔚 Recognition ended");
      listeningRef.current = false;
      setIsListening(false);

      // Only restart if we're still initialized and not processing
      if (isInitializedRef.current && !isProcessingRef.current) {
        console.log("🔄 Restarting recognition...");
        setTimeout(startListening, 1000);
      }
    };

    recognition.onstart = () => {
      console.log("🎤 Speech recognition started");
      setIsListening(true);
    };

    // Start listening
    startListening();

    const speak = (text: string) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      synth.speak(utterance);
    };
  }, []); // Empty dependency array for useCallback

  // Updated useEffect
  useEffect(() => {
    console.log("🔄 useEffect running...");

    initializeSpeechRecognition();

    return () => {
      console.log("🧹 Cleaning up speech recognition...");

      // Set cleanup flag first
      isInitializedRef.current = false;

      // Clear timeout
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
        idleTimeoutRef.current = null;
      }

      // Reset processing flag
      isProcessingRef.current = false;

      // Stop recognition
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }

      listeningRef.current = false;
      setIsListening(false);
    };
  }, []); // Empty dependency array

  const handleLogout = async () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    await signOut(auth);
    window.location.href = "/login";
  };

  if (checking) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
          <p className="text-white text-lg font-medium">Checking login...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex flex-col h-screen bg-gray-800">
      <Header logout={() => setShowModal(true)} />

      {/* Speech Recognition Status */}
      <div className="bg-gray-100 px-4 py-2 text-sm border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isListening ? "bg-red-500 animate-pulse" : "bg-gray-400"
              }`}
            ></div>
            <span className="text-gray-700">
              {isListening ? "Listening..." : "Speech recognition inactive"}
            </span>
          </div>
        </div>
      </div>

      {/* Main content area fills remaining height */}
      <div className="flex flex-1">
        {/* Left Section */}
        <div className="flex flex-col max-h-screen w-2/3 pl-4 pr-4">
          {/* <VideoPlayer /> */}
          <VideoPlayerWithEyeTracking />

          {/* Stretch MoodAnalysis to fill remaining height */}
          <div className="flex-1">
            <MoodAnalysis />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-1/3 relative backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-xl p-4">
          <TranscriptSidebar />
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-lg text-black font-semibold mb-4">Log out?</h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-black"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
