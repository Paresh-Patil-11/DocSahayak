import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { API_ENDPOINTS, API_CONFIG } from '../../config/api';

export default function LoginForm({ onSwitchToRegister, onClose }) {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        headers: API_CONFIG.headers,
        body: JSON.stringify({ mobile, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess('Login successful!');
        setTimeout(() => {
          onClose && onClose();
        }, 1200);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl border border-purple-100"
    >
      <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-slate-800 to-purple-800 bg-clip-text text-transparent mb-8">
        Sign In to DocSewa
      </h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4 text-center animate-fade-in">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl mb-4 text-center animate-fade-in">
          {success}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Mobile Number *</label>
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="input-field"
            placeholder="Enter your mobile number"
            required
            pattern="[6-9]\d{9}"
            title="Please enter a valid 10-digit mobile number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Password *</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            placeholder="Enter your password"
            required
            minLength={6}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-600">
        Don't have an account?{' '}
        <button onClick={onSwitchToRegister} className="text-purple-600 hover:text-purple-700 font-medium">Create Account</button>
      </p>
    </motion.div>
  );
}