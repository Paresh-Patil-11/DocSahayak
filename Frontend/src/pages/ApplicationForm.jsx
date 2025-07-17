import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import Navbar from '../components/Header/Navbar'
import Footer from '../components/Footer/Footer'
import { useAuth } from '../context/AuthContext'

const serviceDetails = {
  'aadhar-card': {
    title: 'Aadhar Card Application',
    description: 'Apply for new Aadhar Card or update existing information',
    requiredDocs: ['Birth Certificate', 'Address Proof', 'Identity Proof'],
    processingTime: '15-30 days',
    fee: '₹50'
  },
  'pan-card': {
    title: 'PAN Card Application',
    description: 'Apply for new PAN Card or request corrections',
    requiredDocs: ['Identity Proof', 'Address Proof', 'Date of Birth Proof'],
    processingTime: '10-15 days',
    fee: '₹110'
  },
  'voter-id': {
    title: 'Voter ID Card Application',
    description: 'Register as a voter and get your Voter ID Card',
    requiredDocs: ['Age Proof', 'Address Proof', 'Identity Proof'],
    processingTime: '30-45 days',
    fee: 'Free'
  },
  'ayushman-card': {
    title: 'Ayushman Bharat Health Card',
    description: 'Get health insurance coverage under India\'s flagship health insurance program',
    requiredDocs: ['Aadhar Card', 'Ration Card', 'Income Certificate'],
    processingTime: '7-10 days',
    fee: 'Free'
  },
  'income-certificate': {
    title: 'Income Certificate',
    description: 'Official income verification for government schemes and benefits. Unlock opportunities with verified income proof.',
    requiredDocs: ['Salary Slips', 'Bank Statements', 'Property Documents'],
    processingTime: '7-14 days',
    fee: '₹30'
  },
  'caste-certificate': {
    title: 'Caste Certificate',
    description: 'Official caste verification for reservation benefits and educational opportunities. Empowering social justice.',
    requiredDocs: ['Birth Certificate', 'School Certificate', 'Family Documents'],
    processingTime: '15-30 days',
    fee: '₹30'
  },
  'nationality-certificate': {
    title: 'Nationality Certificate',
    description: 'Official proof of Indian nationality for various legal and administrative purposes. Essential for government services and documentation.',
    requiredDocs: ['Birth Certificate', 'School Leaving Certificate', 'Address Proof'],
    processingTime: '10-20 days',
    fee: '₹40'
  },
  'domicile-certificate': {
    title: 'Domicile Certificate',
    description: 'Proof of residence for state benefits, education, and employment. Establish your legal domicile with ease.',
    requiredDocs: ['Residence Proof', 'Birth Certificate', 'Affidavit'],
    processingTime: '7-15 days',
    fee: '₹30'
  },
  'disability-certificate': {
    title: 'Disability Certificate',
    description: 'Certification for persons with disabilities to avail government schemes, reservations, and support services.',
    requiredDocs: ['Medical Report', 'Photo ID Proof', 'Address Proof'],
    processingTime: '15-30 days',
    fee: 'Free'
  },
  'pension-welfare-scheme': {
    title: 'Pension or Welfare Scheme Documents',
    description: 'Documentation for pensioners and welfare scheme beneficiaries. Hassle-free processing for your social security needs.',
    requiredDocs: ['Age Proof', 'Bank Passbook', 'Scheme Application Form'],
    processingTime: 'Varies',
    fee: 'Free'
  },
}

export default function ApplicationForm() {
  const { serviceType } = useParams()
  const navigate = useNavigate()
  const { user, token, isAuthenticated } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadedFiles, setUploadedFiles] = useState({})
  const [validationErrors, setValidationErrors] = useState({})
  const [showSuccess, setShowSuccess] = useState(false)
  
  const { register, handleSubmit, formState: { errors }, watch, trigger } = useForm()
  
  const service = serviceDetails[serviceType]
  
  if (!service) {
    return <div>Service not found</div>
  }

  const validateStep = async (step) => {
    let isValid = true
    const newErrors = {}

    if (step === 1) {
      const personalFields = ['fullName', 'dateOfBirth', 'gender', 'mobile', 'fatherName']
      for (const field of personalFields) {
        const result = await trigger(field)
        if (!result) isValid = false
      }
    } else if (step === 2) {
      const addressFields = ['address', 'city', 'state', 'pincode', 'district']
      for (const field of addressFields) {
        const result = await trigger(field)
        if (!result) isValid = false
      }
    } else if (step === 3) {
      // Validate document uploads
      for (const doc of service.requiredDocs) {
        if (!uploadedFiles[doc]) {
          newErrors[doc] = `${doc} is required`
          isValid = false
        }
      }
      setValidationErrors(newErrors)
    }

    return isValid
  }

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3001/api/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({ 
          ...data, 
          serviceType,
          userId: user?.id 
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleFileUpload = (docType, file) => {
    if (file) {
      setUploadedFiles(prev => ({
        ...prev,
        [docType]: file
      }))
      // Clear validation error for this document
      setValidationErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[docType]
        return newErrors
      })
    }
  }

  const nextStep = async () => {
    const isValid = await validateStep(currentStep)
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, 4))
    }
  }

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 py-8">
        <div className="max-w-4xl mx-auto px-2 sm:px-4 md:px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-white to-purple-50/50 rounded-2xl shadow-xl p-8 mb-8 border border-purple-200/50">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-purple-800 bg-clip-text text-transparent mb-2">{service.title}</h1>
              <p className="text-slate-600 mb-6">{service.description}</p>
              
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-4 rounded-xl border border-purple-300">
                  <span className="font-semibold text-purple-800">Processing Time:</span>
                  <p className="text-purple-700 font-medium">{service.processingTime}</p>
                </div>
                <div className="bg-gradient-to-r from-emerald-100 to-emerald-200 p-4 rounded-xl border border-emerald-300">
                  <span className="font-semibold text-emerald-800">Service Fee:</span>
                  <p className="text-emerald-700 font-bold text-lg">{service.fee}</p>
                </div>
                <div className="bg-gradient-to-r from-indigo-100 to-indigo-200 p-4 rounded-xl border border-indigo-300">
                  <span className="font-semibold text-indigo-800">Documents Required:</span>
                  <p className="text-indigo-700 font-medium">{service.requiredDocs.length} documents</p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-gradient-to-r from-white to-purple-50/50 rounded-2xl shadow-xl p-6 mb-8 border border-purple-200/50">
              <div className="flex flex-wrap items-center justify-between mb-4 gap-2 sm:gap-0">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center min-w-[60px] flex-1">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-300 ${
                      currentStep >= step 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                        : 'bg-slate-200 text-slate-600'
                    }`}>
                      {step}
                    </div>
                    {step < 4 && (
                      <div className={`h-1 sm:h-2 mx-1 sm:mx-2 flex-1 rounded-full transition-all duration-300 ${
                        currentStep > step 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                          : 'bg-slate-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              {/* Responsive step labels */}
              <div className="flex flex-wrap justify-between gap-y-1 text-xs sm:text-sm text-slate-600 font-medium">
                <span className="flex-1 min-w-[60px] text-center">Personal Info</span>
                <span className="flex-1 min-w-[60px] text-center">Address Details</span>
                <span className="flex-1 min-w-[60px] text-center">Documents</span>
                <span className="flex-1 min-w-[60px] text-center">Review & Submit</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="bg-gradient-to-r from-white to-purple-50/50 rounded-2xl shadow-xl p-8 border border-purple-200/50">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-semibold bg-gradient-to-r from-slate-800 to-purple-800 bg-clip-text text-transparent mb-6">Personal Information</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                      <input
                        {...register('fullName', { required: 'Full name is required' })}
                        defaultValue={user?.fullName || ''}
                        className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/70"
                        placeholder="Enter your full name"
                      />
                      {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Date of Birth *</label>
                      <input
                        type="date"
                        {...register('dateOfBirth', { required: 'Date of birth is required' })}
                        className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/70"
                      />
                      {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Gender *</label>
                      <select
                        {...register('gender', { required: 'Gender is required' })}
                        className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/70"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Mobile Number *</label>
                      <input
                        {...register('mobile', { 
                          required: 'Mobile number is required',
                          pattern: {
                            value: /^[6-9]\d{9}$/,
                            message: 'Enter valid 10-digit mobile number'
                          }
                        })}
                        defaultValue={user?.mobile || ''}
                        className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/70"
                        placeholder="Enter 10-digit mobile number"
                      />
                      {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        {...register('email')}
                        defaultValue={user?.email || ''}
                        className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/70"
                        placeholder="Enter email address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Father's Name *</label>
                      <input
                        {...register('fatherName', { required: "Father's name is required" })}
                        className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/70"
                        placeholder="Enter father's name"
                      />
                      {errors.fatherName && <p className="text-red-500 text-sm mt-1">{errors.fatherName.message}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Address Details */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-semibold bg-gradient-to-r from-slate-800 to-purple-800 bg-clip-text text-transparent mb-6">Address Details</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Full Address *</label>
                      <textarea
                        {...register('address', { required: 'Address is required' })}
                        rows="3"
                        className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/70"
                        placeholder="Enter complete address"
                      />
                      {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">City *</label>
                        <input
                          {...register('city', { required: 'City is required' })}
                          className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/70"
                          placeholder="Enter city"
                        />
                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">State *</label>
                        <select
                          {...register('state', { required: 'State is required' })}
                          className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/70"
                        >
                          <option value="">Select State</option>
                          <option value="maharashtra">Maharashtra</option>
                          <option value="gujarat">Gujarat</option>
                          
                        </select>
                        {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">PIN Code *</label>
                        <input
                          {...register('pincode', { 
                            required: 'PIN code is required',
                            pattern: {
                              value: /^\d{6}$/,
                              message: 'Enter valid 6-digit PIN code'
                            }
                          })}
                          className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/70"
                          placeholder="Enter 6-digit PIN code"
                        />
                        {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode.message}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">District *</label>
                        <input
                          {...register('district', { required: 'District is required' })}
                          className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/70"
                          placeholder="Enter district"
                        />
                        {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district.message}</p>}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Document Upload */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-semibold bg-gradient-to-r from-slate-800 to-purple-800 bg-clip-text text-transparent mb-6">Required Documents</h2>
                  <div className="space-y-6">
                    {service.requiredDocs.map((doc, index) => (
                      <div key={index} className="border border-purple-200 rounded-xl p-6 bg-white/50">
                        <label className="block text-sm font-medium text-slate-700 mb-3">{doc} *</label>
                        <div className="flex items-center space-x-4">
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileUpload(doc, e.target.files[0])}
                            className="flex-1 px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/70"
                          />
                          {uploadedFiles[doc] && (
                            <span className="text-emerald-600 text-sm font-medium bg-emerald-100 px-3 py-1 rounded-full">✓ Uploaded</span>
                          )}
                        </div>
                        {validationErrors[doc] && <p className="text-red-500 text-sm mt-2">{validationErrors[doc]}</p>}
                        <p className="text-xs text-slate-500 mt-2">Accepted formats: PDF, JPG, PNG (Max 5MB)</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Review & Submit */}
              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-semibold bg-gradient-to-r from-slate-800 to-purple-800 bg-clip-text text-transparent mb-6">Review & Submit</h2>
                  <div className="bg-gradient-to-r from-slate-50 to-purple-50 rounded-xl p-6 mb-6 border border-purple-200">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Application Summary</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-slate-700">Service:</span>
                        <p className="text-slate-600">{service.title}</p>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">Processing Fee:</span>
                        <p className="text-slate-600 font-bold">{service.fee}</p>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">Expected Processing Time:</span>
                        <p className="text-slate-600">{service.processingTime}</p>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">Documents Uploaded:</span>
                        <p className="text-slate-600">{Object.keys(uploadedFiles).length} of {service.requiredDocs.length}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-6 mb-6">
                    <h4 className="font-semibold text-purple-800 mb-3">Important Notes:</h4>
                    <ul className="text-purple-700 text-sm space-y-2">
                      <li>• Please ensure all uploaded documents are clear and readable</li>
                      <li>• Processing time may vary based on government office workload</li>
                      <li>• You will receive SMS/Email updates on your application status</li>
                      <li>• Keep your application reference number safe for future reference</li>
                    </ul>
                  </div>

                  <div className="flex items-center mb-6">
                    <input
                      type="checkbox"
                      {...register('terms', { required: 'Please accept terms and conditions' })}
                      className="mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500 border-purple-300 rounded"
                    />
                    <label className="text-sm text-slate-700">
                      I agree to the <a href="#" className="text-purple-600 hover:underline font-medium">Terms and Conditions</a> and 
                      <a href="#" className="text-purple-600 hover:underline font-medium ml-1">Privacy Policy</a>
                    </label>
                  </div>
                  {errors.terms && <p className="text-red-500 text-sm mb-4">{errors.terms.message}</p>}
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-purple-200">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
                    currentStep === 1 
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-slate-600 to-slate-700 text-white hover:from-slate-700 hover:to-slate-800 shadow-lg hover:shadow-xl transform hover:scale-105'
                  }`}
                >
                  Previous
                </button>

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-10 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-medium hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Submit Application
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        </div>
        {/* Success Modal */}
        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full flex flex-col items-center animate-fade-in">
              <svg className="w-16 h-16 text-emerald-500 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2l4-4"/></svg>
              <h3 className="text-xl font-bold text-emerald-700 mb-2">Data Submitted Successfully!</h3>
              <p className="text-slate-700 mb-4 text-center">Our team will react ASAP.</p>
              <button onClick={() => { setShowSuccess(false); navigate('/'); }} className="mt-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium shadow hover:from-purple-700 hover:to-pink-700 transition-all">Close</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}