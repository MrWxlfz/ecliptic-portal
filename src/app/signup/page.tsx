"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  const handleSignup = async () => {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Account created! Redirecting...");
      setTimeout(() => router.push("/login"), 2000);
    } else {
      setMessage(data.error || "Something went wrong.");
    }
  };

  return (
    <div className={`relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden ${
      darkMode ? "bg-black text-white" : "bg-white text-black"
    }`}>
      {/* Updated Gradient - Ecliptic Purple */}
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-br from-[#7D1EFF] via-[#400A78] to-black opacity-90 animate-liquid ${
          darkMode ? "opacity-100" : "opacity-80"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      {/* Signup Box */}
      <motion.div 
        className={`relative z-10 w-[90%] sm:w-[400px] p-8 rounded-2xl shadow-xl ${
          darkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex flex-col items-center">
          <Image src="/logo.svg" alt="Ecliptic Logo" width={100} height={100} className="mb-4" />
          <h1 className="text-2xl font-bold mb-4">Create Your Ecliptic ID</h1>
        </div>

        {/* Input Fields */}
        <input className="w-full p-3 mb-3 border border-gray-600 rounded-lg bg-transparent placeholder-gray-400 text-white" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="w-full p-3 mb-3 border border-gray-600 rounded-lg bg-transparent placeholder-gray-400 text-white" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full p-3 mb-3 border border-gray-600 rounded-lg bg-transparent placeholder-gray-400 text-white" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

        {/* Signup Button */}
        <button className="w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300" onClick={handleSignup}>
          Create Account
        </button>

        {message && <p className="mt-3 text-center">{message}</p>}

        {/* Login Redirect */}
        <p className="mt-6 text-gray-400 text-center text-sm">
          Already have an ID?{" "}
          <Link href="/login" className="text-purple-400 hover:underline font-semibold">
            Log in →
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
