// import VideoPlayer from "./components/VideoPlayer";
// import MoodAnalysis from "./components/MoodAnalysis";
// import TranscriptSidebar from "./components/TranscriptSidebar";
// import Header from "./components/Header";





// export default function Home() {
  
//   return (
//     <main className="flex flex-col h-screen"> 
//     <Header />
//      {/* Main content area fills remaining height */}
//       <div className="flex flex-1">
//         {/* Left Section */}
//         <div className="flex flex-col w-2/3 p-4">
//           <VideoPlayer />
          
//           {/* Stretch MoodAnalysis to fill remaining height */}
//           <div className="flex-1 mt-4">
//             <MoodAnalysis />
//           </div>
//         </div>

//       {/* Right Sidebar */}
//       <div className="w-1/3 bg-gray-100 p-4">
//         <TranscriptSidebar />
//       </div>
//     </div>
//     </main>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../lib/firebase";

export default function Home() {
  const router = useRouter();
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const unsub = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       console.log("✅ Logged in as:", user.displayName || user.email);
  //       router.replace("/dashboard");
  //     } else {
  //       console.log("❌ Not logged in. Redirecting to login page.");
  //       router.replace("/login");
  //     }
  //     setLoading(false);
  //   });

  //   return () => unsub();
  // }, [router]);

  useEffect(() => {
   
        router.replace("/home");
     
      
    });

   
  

  // if (loading) return <p>Loading...</p>;

  return null;
}

