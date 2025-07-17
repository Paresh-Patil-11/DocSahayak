import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BlogCard = ({ title, description, image, serviceType, processingTime }) => (
  <motion.div 
    whileHover={{ y: -8, scale: 1.03 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="bg-gradient-to-br from-white to-purple-50/50 border border-purple-200/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 w-85 max-w-sm m-4 overflow-hidden backdrop-blur-sm"
  >
    <div className="relative overflow-hidden">
      <motion.img
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.6 }}
        className="w-full h-48 object-cover"
        src={image}
        alt={title}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      
    </div>
    <div className="p-6">
      <div className="text-center mb-4">
        <h5 className="mb-3 text-xl font-bold tracking-tight bg-gradient-to-r from-slate-800 to-purple-800 bg-clip-text text-transparent">
          {title}
        </h5>
        <p className="text-sm text-slate-600 mb-4 leading-relaxed">
          {description}
        </p>
        <div className="flex justify-center items-center text-xs mb-6">
          <span className="bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 px-3 py-2 rounded-full font-medium shadow-sm border border-emerald-300">
            ⚡ {processingTime}
          </span>
        </div>
      </div>
      <div className="flex justify-center">
        <Link
          to={`/apply/${serviceType}`}
          className="group relative inline-flex items-center px-8 py-3 text-sm font-bold text-white bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 rounded-xl hover:from-purple-700 hover:via-purple-800 hover:to-pink-700 focus:ring-4 focus:outline-none focus:ring-purple-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <span className="relative z-10">Apply Now</span>
          <motion.svg
            whileHover={{ x: 3 }}
            className="w-4 h-4 ml-2 relative z-10"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </motion.svg>
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>
      </div>
    </div>
  </motion.div>
);

export default BlogCard;