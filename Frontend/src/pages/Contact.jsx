import React from 'react'
import Navbar from '../components/Header/Navbar'
import Footer from '../components/Footer/Footer'
import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <>
      <Navbar />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 py-16"
      >
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-800 via-purple-800 to-indigo-800 bg-clip-text text-transparent mb-8">Contact Us</h1>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-white to-purple-50/50 rounded-2xl shadow-xl p-8 border border-purple-200/50">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-slate-800 to-purple-800 bg-clip-text text-transparent mb-6">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-purple-200 rounded-full flex items-center justify-center mr-4 border border-purple-300">
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Address</p>
                    <p className="text-slate-600">Shirpur, Maharashtra, India</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center mr-4 border border-emerald-300">
                    <span className="text-2xl">📞</span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Phone</p>
                    <p className="text-slate-600">+91 8767837363</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-100 to-indigo-200 rounded-full flex items-center justify-center mr-4 border border-indigo-300">
                    <span className="text-2xl">✉️</span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Email</p>
                    <p className="text-slate-600">info@docsewa.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-white to-purple-50/50 rounded-2xl shadow-xl p-8 border border-purple-200/50">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-slate-800 to-purple-800 bg-clip-text text-transparent mb-6">Send Message</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/70"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/70"
                />
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/70"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  )
}