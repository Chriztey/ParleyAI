"use client";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";

import VideoPlayer from "./../components/VideoPlayer";
import MoodAnalysis from "./../components/MoodAnalysis";
import TranscriptSidebar from "./../components/TranscriptSidebar";
import Header from "./../components/Header";
import VideoPlayerWithEyeTracking from "../components/VideoPlayerWithEyeTracking";

export default function Home() {
    const [showModal, setShowModal] = useState(false);
    const [script, setScript] = useState(""); // Store transcribed text
    const [finalSpeech, setFinalSpeech] = useState('');
let idleTimeout = null;
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<any>(null);
    const listeningRef = useRef(false);
    const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
    
    useEffect(() => {
        initializeSpeechRecognition();
        
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    const initializeSpeechRecognition = () => {
        // ✅ Check for browser compatibility
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const synth = (window as any).speechSynthesis;
        
        if (!SpeechRecognition || !synth) {
            console.warn("Web Speech API is not supported in this browser.");
            return;
        }

        let recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        
        recognitionRef.current = recognition;

        // ✅ Start recognition loop
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

        recognition.onresult = (event: any) => {
            const transcript = event.results[event.results.length - 1][0].transcript.trim();
            console.log("🧠 Heard:", transcript);
            
            
            // Update script with all spoken text
            setScript(prev => {
                const newScript = prev + transcript + ' ';
                console.log("📝 Full script:", newScript);

                // Restart 5s idle timer every update
        idleTimeout = setTimeout(() => {
            setFinalSpeech(newScript.trim());
            setScript(''); // clear buffer
            console.log("✅ Final speech submitted:", newScript.trim());
        }, 10000);
                return newScript;
            });

          

            // Optional: Add voice commands
            const lowerTranscript = transcript.toLowerCase();
            if (lowerTranscript.includes("hey assistant")) {
                speak("Yes? How can I help?");
            } else if (lowerTranscript.includes("clear script")) {
                setScript("");
                speak("Script cleared");
            }
        };

        recognition.onerror = (e: any) => {
            console.error("🎙️ Speech recognition error:", e.error);
            if (e.error === "not-allowed" || e.error === "service-not-allowed") {
                alert("Microphone access was denied. Please allow microphone access and refresh the page.");
            }
            listeningRef.current = false;
            setIsListening(false);
        };

        recognition.onend = () => {
            listeningRef.current = false;
            setIsListening(false);
            // Restart automatically after 1 second
            setTimeout(startListening, 1000);
        };

        recognition.onstart = () => {
            console.log("🎤 Speech recognition started");
            setIsListening(true);
        };

        // Start listening
        startListening();

        // ✅ Simple speech function
        const speak = (text: string) => {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            synth.speak(utterance);
        };

    };

    const handleLogout = async () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        await signOut(auth);
        window.location.href = "/login";
    };

    return (
        <main className="flex flex-col h-screen bg-gray-800"> 
            <Header logout={() => setShowModal(true)} />
            
            {/* Speech Recognition Status */}
            <div className="bg-gray-100 px-4 py-2 text-sm border-b">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`}></div>
                        <span className="text-gray-700">
                            {isListening ? 'Listening...' : 'Speech recognition inactive'}
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