import React from 'react';
import Navbar from '../components/Header/Navbar';
import Footer from '../components/Footer/Footer';
import { motion } from 'framer-motion';

export default function PrivacyTerms() {
  return (
    <>
      <Navbar />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 py-12 px-4"
      >
        <div className="max-w-3xl mx-auto bg-white/80 rounded-2xl shadow-xl p-8 border border-purple-200/50">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-purple-800 bg-clip-text text-transparent mb-6 text-center">Privacy Policy</h1>
          <p className="text-slate-700 mb-2 text-right text-sm font-medium">Effective Date: <span className="text-purple-700">2024-06-01</span></p>
          <p className="text-slate-700 mb-6 text-right text-sm font-medium">Company: <span className="text-purple-700">DocSewa</span></p>
          <p className="mb-4 text-slate-700">DocSewa is committed to protecting your privacy. This policy explains how we collect, use, and protect your personal information.</p>
          <h2 className="text-xl font-semibold text-purple-800 mt-8 mb-2">Information We Collect</h2>
          <ul className="list-disc ml-6 text-slate-700 mb-4">
            <li>Full name</li>
            <li>Contact details (email, phone number, address)</li>
            <li>Information provided through service request forms</li>
            <li>Details shared during the service process</li>
          </ul>
          <h2 className="text-xl font-semibold text-purple-800 mt-8 mb-2">How We Use Your Information</h2>
          <ul className="list-disc ml-6 text-slate-700 mb-4">
            <li>Confirm and schedule your service</li>
            <li>Contact you regarding your request</li>
            <li>Provide document update services as requested</li>
          </ul>
          <h2 className="text-xl font-semibold text-purple-800 mt-8 mb-2">Data Security and Confidentiality</h2>
          <ul className="list-disc ml-6 text-slate-700 mb-4">
            <li><span className="font-bold text-emerald-700">100% data security</span></li>
            <li>Your personal information is not shared, sold, or disclosed to any third party</li>
            <li>Only authorized personnel within our company can access your data for service purposes</li>
          </ul>
          <h2 className="text-xl font-semibold text-purple-800 mt-8 mb-2">Data Retention and Deletion</h2>
          <p className="mb-4 text-slate-700">We keep your information only as long as necessary to provide our services or comply with legal obligations. You can request that we delete your data at any time by contacting us at <a href="mailto:info@docsewa.com" className="text-purple-700 underline">info@docsewa.com</a>.</p>
          <h2 className="text-xl font-semibold text-purple-800 mt-8 mb-2">Changes to This Policy</h2>
          <p className="mb-4 text-slate-700">We may update this policy. If we make changes, we will notify you on our website or by email.</p>

          <hr className="my-8 border-purple-200" />

          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-purple-800 bg-clip-text text-transparent mb-6 text-center">Terms &amp; Conditions</h1>
          <p className="text-slate-700 mb-2 text-right text-sm font-medium">Effective Date: <span className="text-purple-700">2024-06-01</span></p>
          <p className="text-slate-700 mb-6 text-right text-sm font-medium">Company: <span className="text-purple-700">DocSewa</span></p>
          <p className="mb-4 text-slate-700">These Terms and Conditions govern the use of our document update services.</p>
          <h2 className="text-xl font-semibold text-purple-800 mt-8 mb-2">Service Description</h2>
          <p className="mb-4 text-slate-700">Our service allows users to request document updates by submitting a form. We will confirm the request, schedule a visit, and send an agent to assist with your document updates.</p>
          <h2 className="text-xl font-semibold text-purple-800 mt-8 mb-2">User Responsibilities</h2>
          <ul className="list-disc ml-6 text-slate-700 mb-4">
            <li>Provide accurate and complete information</li>
            <li>Be available for communication and appointment confirmation</li>
            <li>Cooperate with our service agent during the visit</li>
          </ul>
          <h2 className="text-xl font-semibold text-purple-800 mt-8 mb-2">Payments and Fees</h2>
          <p className="mb-4 text-slate-700">Fees for services will be clearly communicated in advance. Payment is due upon service completion unless otherwise agreed.</p>
          <h2 className="text-xl font-semibold text-purple-800 mt-8 mb-2">Cancellations</h2>
          <p className="mb-4 text-slate-700">Cancellations must be made at least 24 hours in advance. Cancellations made later than this may be subject to a fee.</p>
          <h2 className="text-xl font-semibold text-purple-800 mt-8 mb-2">Data Privacy</h2>
          <ul className="list-disc ml-6 text-slate-700 mb-4">
            <li>Your personal data will not be shared with any third parties</li>
            <li>Your data is stored securely</li>
            <li>All information is used only for providing the requested service</li>
          </ul>
          <h2 className="text-xl font-semibold text-purple-800 mt-8 mb-2">Limitation of Liability</h2>
          <p className="mb-4 text-slate-700">We are not responsible for delays or errors caused by incorrect information provided by the user or delays from third-party institutions such as government offices.</p>
          <h2 className="text-xl font-semibold text-purple-800 mt-8 mb-2">Governing Law</h2>
          <p className="mb-4 text-slate-700">These Terms are governed by the laws of <span className="text-purple-700 font-semibold">India</span>.</p>
        </div>
      </motion.div>
      <Footer />
    </>
  );
} 