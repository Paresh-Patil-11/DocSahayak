import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Header/Navbar';
import Footer from '../components/Footer/Footer';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, token, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [documentHistory, setDocumentHistory] = useState([]);
  const [appliedDocuments, setAppliedDocuments] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    fetchDashboardData();
  }, [isAuthenticated, navigate, token]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch document history
      const historyResponse = await fetch('http://localhost:3001/api/documents/history', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (historyResponse.ok) {
        const historyData = await historyResponse.json();
        setDocumentHistory(historyData);
      }

      // Fetch applied documents
      const appliedResponse = await fetch(`http://localhost:3001/api/documents/applied?status=${statusFilter}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (appliedResponse.ok) {
        const appliedData = await appliedResponse.json();
        setAppliedDocuments(appliedData);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [statusFilter]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const formatServiceType = (serviceType) => {
    return serviceType
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 py-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-purple-800 bg-clip-text text-transparent">
              Welcome back, {user?.fullName?.split(' ')[0]}!
            </h1>
            <p className="text-slate-600 mt-2">Manage your documents and track your applications</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Document History Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-r from-white to-purple-50/50 rounded-2xl shadow-xl p-6 border border-purple-200/50"
              >
                <h2 className="text-xl font-semibold bg-gradient-to-r from-slate-800 to-purple-800 bg-clip-text text-transparent mb-6 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Document History
                </h2>

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {documentHistory.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                      <svg className="w-12 h-12 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p>No document history found</p>
                    </div>
                  ) : (
                    documentHistory.map((doc, index) => (
                      <div key={index} className="bg-white/70 rounded-xl p-4 border border-purple-100 hover:shadow-md transition-all duration-300">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-slate-800">{formatServiceType(doc.document_name)}</h3>
                          <span className="text-xs text-slate-500">{formatDate(doc.last_edited_date)}</span>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{doc.summary}</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(doc.status)}`}>
                          {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>

              {/* Applied Documents Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-r from-white to-purple-50/50 rounded-2xl shadow-xl p-6 border border-purple-200/50"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold bg-gradient-to-r from-slate-800 to-purple-800 bg-clip-text text-transparent flex items-center">
                    <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Applied Documents
                  </h2>
                  
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm bg-white/70"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {appliedDocuments.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                      <svg className="w-12 h-12 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <p>No applications found</p>
                    </div>
                  ) : (
                    appliedDocuments.map((doc, index) => (
                      <div key={index} className="bg-white/70 rounded-xl p-4 border border-purple-100 hover:shadow-md transition-all duration-300">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-slate-800">{formatServiceType(doc.document_title)}</h3>
                          <span className="text-xs text-slate-500">{formatDate(doc.created_at)}</span>
                        </div>
                        <p className="text-sm text-slate-600 mb-3">Applicant: {doc.full_name}</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(doc.status)}`}>
                          {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            </div>
          )}

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 bg-gradient-to-r from-white to-purple-50/50 rounded-2xl shadow-xl p-6 border border-purple-200/50"
          >
            <h2 className="text-xl font-semibold bg-gradient-to-r from-slate-800 to-purple-800 bg-clip-text text-transparent mb-4">
              Quick Actions
            </h2>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Apply for New Document
              </button>
              <button
                onClick={() => navigate('/profile')}
                className="bg-gradient-to-r from-slate-600 to-slate-700 text-white px-6 py-3 rounded-xl hover:from-slate-700 hover:to-slate-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Update Profile
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
}