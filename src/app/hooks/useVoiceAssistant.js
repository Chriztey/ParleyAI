import { useState, useEffect } from "react";
import { dummyMoods } from "../data/dummyMood";

export function useVoiceAssistant() {
  const [moodIndex, setMoodIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);

  const currentMood = dummyMoods[moodIndex];

  // Speak via Web Speech API
  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    synth.speak(utter);
  };

  // Start listening via Web Speech API
  const listen = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();
    setIsListening(true);

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript.toLowerCase();
      console.log("Heard:", transcript);

      // Dummy logic: if user says "better", improve mood
      if (transcript.includes("better") || transcript.includes("okay")) {
        setMoodIndex(1); // move to more neutral mood
      }

      setIsListening(false);
    };

    recognition.onerror = (err) => {
      console.error("Voice error", err);
      setIsListening(false);
    };
  };

  useEffect(() => {
    // speak on first mood
    speak(currentMood.response);

    const delay = setTimeout(() => {
      listen();
    }, 4000); // wait for TTS to finish before listening

    return () => clearTimeout(delay);
  }, [moodIndex]);

  return { currentMood, isListening };
}

export default useVoiceAssistant;
