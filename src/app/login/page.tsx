"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { signInWithGoogle } from "../../lib/auth";
import Image from "next/image";
import Logo from "../assets/parley-ai-logo.png";

export default function LoginPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard");
      } else {
        setChecking(false);
      }
    });

    return () => unsub();
  }, [router]);

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
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Glass panel */}
      <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl p-12 rounded-3xl max-w-md w-full mx-4 hover:bg-white/15 transition-all duration-300 hover:shadow-3xl hover:scale-105">
        {/* Inner glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/5 to-transparent pointer-events-none"></div>

        <div className="relative text-center">
          {/* Logo with glass effect */}
          <div className="w-24 h-24 mx-auto mb-6 relative">
            <div className="absolute inset-0 b bg-white rounded-full border border-white/30"></div>
            <Image
              src={Logo}
              alt="logo"
              width={96}
              height={96}
              className="relative z-10 rounded-full p-2"
            />
          </div>

          <h1 className="text-3xl font-bold mb-3 text-white drop-shadow-lg">
            Welcome to Parley AI
          </h1>
          <p className="text-lg text-white/80 mb-8 font-medium">
            Your wellness companion
          </p>

          {/* Glass button */}
          <button
            onClick={signInWithGoogle}
            className="relative w-full backdrop-blur-md bg-white/20 border border-white/30 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:bg-white/30 hover:border-white/50 hover:shadow-xl hover:scale-105 active:scale-95 group overflow-hidden"
          >
            {/* Button inner glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <span className="relative z-10 flex items-center justify-center gap-3">
              Sign in with Google
            </span>
          </button>

          {/* Subtle decorative elements */}
          <div className="mt-8 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-white/30 rounded-full"></div>
            <div className="w-2 h-2 bg-white/20 rounded-full"></div>
            <div className="w-2 h-2 bg-white/30 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
