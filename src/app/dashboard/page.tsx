"use client";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";


import VideoPlayer from "./../components/VideoPlayer";
import MoodAnalysis from "./../components/MoodAnalysis";
import TranscriptSidebar from "./../components/TranscriptSidebar";
import Header from "./../components/Header";


export default function Home() {
    
    const [showModal, setShowModal] = useState(false);
    
    const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/login";
};

  
  return (
    <main className="flex flex-col h-screen"> 
    <Header logout={() => setShowModal(true)} />
     {/* Main content area fills remaining height */}
      <div className="flex flex-1">
        {/* Left Section */}
        <div className="flex flex-col max-h-screen w-2/3 pl-4 pr-4">
          <VideoPlayer />
          
          {/* Stretch MoodAnalysis to fill remaining height */}
          <div className="flex-1 ">
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