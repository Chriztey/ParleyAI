"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { signInWithGoogle } from "../../lib/auth";
import Image from "next/image";
import Logo from '../assets/ceemo-logo.png'

export default function LoginPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      } else {
        setChecking(false);
      }
    });

    return () => unsub();
  }, [router]);

  if (checking) return <p className="text-center mt-10">Checking login...</p>;

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-pink-100">
      <div className="bg-white shadow-xl p-10 rounded-xl max-w-sm w-full text-center">
        {/* Logo Placeholder */}
        {/* <div className="w-16 h-16 mx-auto mb-4 bg-indigo-200 rounded-full" /> */}
        <Image src={Logo} alt="logo" width={100} height={100} className="mx-auto mb-4"></Image>
        <h1 className="text-2xl font-bold mb-2 text-gray-800">Welcome to Cheemo</h1>
        <p className="text-sm text-gray-500 mb-6">Your emotional wellness companion</p>

        <button
          onClick={signInWithGoogle}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all w-full"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
