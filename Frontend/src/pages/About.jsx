import React from 'react'
import Navbar from '../components/Header/Navbar'
import Footer from '../components/Footer/Footer'
import { motion } from 'framer-motion'

export default function About() {
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
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-800 via-purple-800 to-indigo-800 bg-clip-text text-transparent mb-8">About DocSewa</h1>
          <div className="bg-gradient-to-r from-white to-purple-50/50 rounded-2xl shadow-xl p-8 border border-purple-200/50">
            <p className="text-lg text-slate-600 mb-6">
              DocSewa is your premium partner for all government document services. We transform the complex process 
              of obtaining essential documents into a seamless, efficient experience with unmatched quality and reliability.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-800 to-purple-900 bg-clip-text text-transparent mb-4">Our Mission</h3>
                <p className="text-slate-600">
                  To revolutionize government document processing through premium service delivery, 
                  cutting-edge technology, and unwavering commitment to customer satisfaction.
                </p>
              </div>
              <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-6 rounded-xl border border-indigo-200">
                <h3 className="text-xl font-semibold bg-gradient-to-r from-indigo-800 to-indigo-900 bg-clip-text text-transparent mb-4">Why Choose Us</h3>
                <ul className="text-slate-600 space-y-2">
                  <li>• Premium 24/7 Customer Support</li>
                  <li>• Lightning-Fast Processing</li>
                  <li>• Bank-Grade Security & Privacy</li>
                  <li>• Transparent & Competitive Pricing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  )
}