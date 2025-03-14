"use client";

import { motion } from "framer-motion";

interface AboutPopupProps {
  isOpen: boolean;
  darkMode: boolean;
  onClose: () => void;
}

export default function AboutPopup({ isOpen, darkMode, onClose }: AboutPopupProps) {
  if (!isOpen) return null; // Ensures the pop-up only renders when open

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md" // Blurred background instead of full black
      onClick={onClose} // Clicking outside closes pop-up
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        exit={{ opacity: 0, scale: 0.8 }} 
        className={`relative p-8 rounded-lg shadow-lg w-96 ${
          darkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
        onClick={(e) => e.stopPropagation()} // Prevents clicks inside from closing the pop-up
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">What is Ecliptic Portal?</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl cursor-pointer"
          >
            &times;
          </button>
        </div>
        <p className={`${
          darkMode ? "text-gray-300" : "text-black"
        } text-lg`}>
          The <strong>Ecliptic Portal</strong> is an advanced, <strong>secure</strong> platform designed exclusively for 
          <strong> Ecliptic Ultra</strong> users. Seamlessly integrated with <strong>Ecliptic One</strong>, it offers
          <strong> community management</strong>, <strong>game security</strong>, and <strong>next-gen moderation tools</strong>.
        </p>
        <div className="mt-6 flex justify-center">
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
          >
            Got It
          </button>
        </div>
      </motion.div>
    </div>
  );
}
