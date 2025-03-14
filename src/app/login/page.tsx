"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password.");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden">
      {/* Updated Gradient - Ecliptic Purple */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-[#7D1EFF] via-[#400A78] to-black opacity-90 animate-liquid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      {/* Login Box */}
      <motion.div 
        className="relative z-10 w-[90%] sm:w-[400px] p-8 rounded-2xl shadow-xl bg-black text-white"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex flex-col items-center">
          <Image src="/logo.svg" alt="Ecliptic Logo" width={100} height={100} className="mb-4" />
          <h1 className="text-2xl font-bold mb-4">Sign In to Ecliptic</h1>
        </div>

        {/* Input Fields */}
        <input className="w-full p-3 mb-3 border border-gray-600 rounded-lg bg-transparent placeholder-gray-400 text-white" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full p-3 mb-3 border border-gray-600 rounded-lg bg-transparent placeholder-gray-400 text-white" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

        {/* Login Button */}
        <button className="w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300" onClick={handleLogin}>
          Log In
        </button>

        {error && <p className="mt-3 text-red-500 text-center">{error}</p>}

        {/* Sign-up Redirect */}
        <p className="mt-6 text-gray-400 text-center text-sm">
          Don’t have an ID?{" "}
          <Link href="/signup" className="text-purple-400 hover:underline font-semibold">
            Create one today →
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
