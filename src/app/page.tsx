"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import AboutPopup from "../components/AboutPopup"; // Import pop-up component

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);

  return (
    <div className={`relative flex flex-col items-center justify-center min-h-screen transition-all duration-500 ${
      darkMode ? "bg-black text-white" : "bg-white text-black"
    }`}>

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
            <Link href="/login" className="px-3 py-2 sm:px-4 sm:py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm sm:text-base">
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
          The Ecliptic Portal allows you to manage your community, protect your game, and take control—anytime, anywhere.
        </p>

        {/* Buttons */}
        <div className="flex space-x-4 sm:space-x-6">
          <Link href="/login" className="px-6 sm:px-8 py-3 sm:py-4 bg-purple-600 text-white rounded-lg flex items-center justify-center hover:bg-purple-700 text-lg sm:text-xl">
            Log In
          </Link>
          <button 
            onClick={() => setPopupOpen(true)}
            className={`px-6 sm:px-8 py-3 sm:py-4 border ${
              darkMode ? "border-white text-white hover:bg-gray-800" : "border-black text-black hover:bg-black hover:text-white"
            } rounded-lg text-lg sm:text-xl`}
          >
            Learn More
          </button>
        </div>
      </motion.div>

      {/* Background Gradient */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 0.4 }} 
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
        className={`absolute bottom-0 w-full h-48 bg-gradient-to-t ${
          darkMode ? "from-purple-900 via-black to-transparent" : "from-purple-300 via-white to-transparent"
        }`}        
      ></motion.div>

      {/* About Pop-Up */}
      {isPopupOpen && <AboutPopup isOpen={isPopupOpen} darkMode={darkMode} onClose={() => setPopupOpen(false)} />}
    </div>
  );
}
