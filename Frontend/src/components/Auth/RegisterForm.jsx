import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { API_ENDPOINTS, API_CONFIG } from '../../config/api';

export default function RegisterForm({ onSwitchToLogin, onClose }) {
  const [formData, setFormData] = useState({
    full_name: '',
    date_of_birth: '',
    gender: '',
    mobile: '',
    email: '',
    father_name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    district: '',
    password: '',
    confirm_password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Remove confirm_password before sending
    const submitData = { ...formData };
    delete submitData.confirm_password;

    try {
      // You may need to adjust the endpoint to match your backend
      const response = await fetch(API_ENDPOINTS.AUTH.REGISTER, {
        method: 'POST',
        headers: API_CONFIG.headers,
        body: JSON.stringify(submitData),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess('Account created successfully!');
        setTimeout(() => {
          onClose && onClose();
        }, 1200);
      } else {
        setError(data.error || 'Registration failed');
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
      className="w-full max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-xl border border-purple-100"
    >
      <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-slate-800 to-purple-800 bg-clip-text text-transparent mb-8">
        Create Account
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
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
          <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} className="input-field" placeholder="Enter your full name" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Father's Name *</label>
          <input type="text" name="father_name" value={formData.father_name} onChange={handleChange} className="input-field" placeholder="Enter father's name" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth *</label>
          <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} className="input-field" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Gender *</label>
          <select name="gender" value={formData.gender} onChange={handleChange} className="input-field" required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Mobile Number *</label>
          <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="input-field" placeholder="Enter your mobile number" required pattern="[6-9]\d{9}" title="Please enter a valid 10-digit mobile number" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field" placeholder="Enter your email address" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Address *</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} className="input-field" placeholder="Enter your address" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">City *</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} className="input-field" placeholder="Enter city" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">District *</label>
          <input type="text" name="district" value={formData.district} onChange={handleChange} className="input-field" placeholder="Enter district" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">State *</label>
          <input type="text" name="state" value={formData.state} onChange={handleChange} className="input-field" placeholder="Enter state" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Pincode *</label>
          <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} className="input-field" placeholder="Enter pincode" required pattern="\d{6}" title="Please enter a valid 6-digit pincode" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Password *</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="input-field" placeholder="Create a password" required minLength={6} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password *</label>
          <input type="password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} className="input-field" placeholder="Confirm password" required minLength={6} />
        </div>
        <div className="md:col-span-2">
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed mt-2">
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </div>
      </form>
      <p className="mt-6 text-center text-sm text-slate-600">
        Already have an account?{' '}
        <button onClick={onSwitchToLogin} className="text-purple-600 hover:text-purple-700 font-medium">Sign In</button>
      </p>
    </motion.div>
  );
}