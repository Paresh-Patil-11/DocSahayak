import React from "react";
import { motion } from "framer-motion";

export default function ServiceHeading() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center px-4 sm:px-16 xl:px-48 py-16 bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50"
    >
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-6 text-4xl font-extrabold leading-none tracking-tight bg-gradient-to-r from-slate-800 via-purple-800 to-indigo-800 bg-clip-text text-transparent md:text-5xl lg:text-6xl"
      >
         <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Services</span>
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-8 text-lg font-normal text-slate-600 lg:text-xl max-w-3xl mx-auto"
      >
        Experience unparalleled excellence in document processing. Our premium service 
        ensures swift, secure, and seamless handling of all your government documentation needs.
      </motion.p>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex justify-center items-center space-x-8 text-sm text-slate-600"
      >
        <div className="flex items-center bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-purple-200">
          <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full mr-2 animate-pulse"></div>
          <span className="font-medium">Lightning Fast</span>
        </div>
        <div className="flex items-center bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-purple-200">
          <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full mr-2 animate-pulse"></div>
          <span className="font-medium">Bank-Grade Security</span>
        </div>
        <div className="flex items-center bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-purple-200">
          <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full mr-2 animate-pulse"></div>
          <span className="font-medium">24/7 Premium Support</span>
        </div>
      </motion.div>
    </motion.div>
  );
}