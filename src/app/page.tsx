"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen transition-all duration-500 ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 flex items-center px-6 sm:px-8 py-3 sm:py-4 w-full max-w-7xl mx-auto transition-all duration-500">
        <div className="flex items-center w-full justify-between">
          <Link href="/">
            <Image src="/logo.png" alt="Ecliptic Logo" width={64} height={64} className="cursor-pointer" />
          </Link>
          <nav className="flex space-x-4 sm:space-x-6 text-base sm:text-lg">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg transition-all duration-300">
              <Image src={darkMode ? "/sun.svg" : "/moon.svg"} alt="Toggle Dark Mode" width={24} height={24} />
            </button>
            <Link href="/dashboard" className="px-3 py-2 sm:px-4 sm:py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm sm:text-base">
              Log In
            </Link>
          </nav>
        </div>
      </header>
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="text-center flex flex-col justify-center items-center h-screen w-full px-6 sm:px-8 max-w-4xl mx-auto"
      >
        <h2 className="text-6xl sm:text-7xl font-bold mb-6 leading-snug">Protect, manage, portal.</h2>
        <p className={`text-xl sm:text-2xl ${darkMode ? "text-gray-300" : "text-gray-600"} mb-8 max-w-2xl`}>
          Ecliptic Portal allows you to manage your community<br /> and protect your game from anywhere, anytime.
        </p>
        
        <div className="flex space-x-4 sm:space-x-6">
          <Link href="/login" className="px-6 sm:px-8 py-3 sm:py-4 bg-black text-white rounded-lg flex items-center justify-center hover:bg-gray-900 text-lg sm:text-xl">
            Log In
          </Link>
          <Link 
            href="/signup" 
            className={`px-6 sm:px-8 py-3 sm:py-4 border ${darkMode ? "border-white text-white hover:bg-gray-800" : "border-black text-black hover:bg-black hover:text-white"} rounded-lg text-lg sm:text-xl`}
          >   
            Create Ecliptic ID
          </Link>
        </div>
      </motion.div>

      {/* Background Effect */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 0.3 }} 
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
        className={`absolute bottom-0 w-full h-48 bg-gradient-to-t ${
          darkMode ? "from-[#6a0dad] via-[#3b075e] to-transparent" : "from-[#9b5cfb] via-[#d8b4fe] to-transparent"
        }`}        
      ></motion.div>
    </div>
  );
}
