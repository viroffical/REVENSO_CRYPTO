import React, { useState, useRef } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FaCamera } from 'react-icons/fa';
import { IoInformationCircleOutline } from 'react-icons/io5';

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    gender: '',
    email: '',
    twitter: '',
    profileImage: null,
    profileImagePreview: null,
    coverImage: null,
    coverImagePreview: null,
  });

  const profileImageRef = useRef(null);
  const coverImageRef = useRef(null);
  
  // Calculate progress percentage
  const progressPercentage = ((currentStep + 1) / 3) * 100;
  
  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle gender selection
  const handleGenderSelect = (gender) => {
    setFormData(prev => ({ ...prev, gender }));
  };
  
  // Handle image uploads
  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          [type]: file,
          [`${type}Preview`]: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle form submission
  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your API
    alert('Profile setup complete!');
  };
  
  // Navigate to next step
  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 2));
  };
  
  // Navigate to previous step
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };
  
  // Check if current step is valid to proceed
  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.firstName && formData.birthDay && formData.birthMonth && formData.birthYear;
      case 1:
        return formData.email;
      case 2:
        return true; // Photos are optional
      default:
        return false;
    }
  };
  
  // Variants for the animated transitions
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };
  
  // Track the direction of navigation
  const [direction, setDirection] = useState(0);
  
  const customNextStep = () => {
    setDirection(1);
    nextStep();
  };
  
  const customPrevStep = () => {
    setDirection(-1);
    prevStep();
  };
  
  // Render the current step content
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div 
            key="step1"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'tween', duration: 0.4 }}
            className="w-full max-w-md mx-auto px-6 py-8"
          >
            <h1 className="text-3xl font-bold mb-2">Oh hey! Let's start with an intro.</h1>
            
            <div className="space-y-6 mt-8">
              <div className="space-y-2">
                <label className="block text-lg font-medium">Your first name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-4 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="First name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-lg font-medium">Your birthday</label>
                <div className="flex space-x-4">
                  <div className="flex-1 space-y-1">
                    <input
                      type="text"
                      name="birthDay"
                      value={formData.birthDay}
                      onChange={handleChange}
                      className="w-full p-4 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="DD"
                      maxLength="2"
                      required
                    />
                    <span className="block text-sm text-gray-500 text-center">Day</span>
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <input
                      type="text"
                      name="birthMonth"
                      value={formData.birthMonth}
                      onChange={handleChange}
                      className="w-full p-4 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="MM"
                      maxLength="2"
                      required
                    />
                    <span className="block text-sm text-gray-500 text-center">Month</span>
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <input
                      type="text"
                      name="birthYear"
                      value={formData.birthYear}
                      onChange={handleChange}
                      className="w-full p-4 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="YYYY"
                      maxLength="4"
                      required
                    />
                    <span className="block text-sm text-gray-500 text-center">Year</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">It's never too early to count down</p>
              </div>
            </div>
          </motion.div>
        );
        
      case 1:
        return (
          <motion.div 
            key="step2"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'tween', duration: 0.4 }}
            className="w-full max-w-md mx-auto px-6 py-8"
          >
            <h1 className="text-3xl font-bold mb-2">{formData.firstName || 'You'} is a great name</h1>
            <p className="text-gray-600 mb-8">We love that you're here. Pick the gender that best describes you, then add more about it if you like.</p>
            
            <div className="space-y-4">
              <label className="block text-lg font-medium">Which gender best describes you?</label>
              
              <div 
                className={`p-4 rounded-2xl bg-gray-100 flex justify-between items-center cursor-pointer ${formData.gender === 'Woman' ? 'border-2 border-yellow-500' : ''}`}
                onClick={() => handleGenderSelect('Woman')}
              >
                <span>Woman</span>
                <div className={`w-6 h-6 rounded-full border-2 ${formData.gender === 'Woman' ? 'border-yellow-500 flex items-center justify-center' : 'border-gray-300'}`}>
                  {formData.gender === 'Woman' && <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>}
                </div>
              </div>
              
              <div 
                className={`p-4 rounded-2xl bg-gray-100 flex justify-between items-center cursor-pointer ${formData.gender === 'Man' ? 'border-2 border-yellow-500' : ''}`}
                onClick={() => handleGenderSelect('Man')}
              >
                <span>Man</span>
                <div className={`w-6 h-6 rounded-full border-2 ${formData.gender === 'Man' ? 'border-yellow-500 flex items-center justify-center' : 'border-gray-300'}`}>
                  {formData.gender === 'Man' && <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>}
                </div>
              </div>
              
              <div 
                className={`p-4 rounded-2xl bg-gray-100 flex justify-between items-center cursor-pointer ${formData.gender === 'Nonbinary' ? 'border-2 border-yellow-500' : ''}`}
                onClick={() => handleGenderSelect('Nonbinary')}
              >
                <span>Nonbinary</span>
                <div className={`w-6 h-6 rounded-full border-2 ${formData.gender === 'Nonbinary' ? 'border-yellow-500 flex items-center justify-center' : 'border-gray-300'}`}>
                  {formData.gender === 'Nonbinary' && <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>}
                </div>
              </div>
              
              <div className="flex items-center text-sm mt-4 text-gray-500">
                <IoInformationCircleOutline className="mr-1" size={16} />
                <span>You can always update this later. <a href="#" className="text-yellow-500 underline">A note about gender on our platform.</a></span>
              </div>
            </div>
            
            <div className="space-y-6 mt-8">
              <div className="space-y-2">
                <label className="block text-lg font-medium">Email address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-lg font-medium">Twitter handle (optional)</label>
                <input
                  type="text"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  className="w-full p-4 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="@username"
                />
              </div>
            </div>
          </motion.div>
        );
        
      case 2:
        return (
          <motion.div 
            key="step3"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'tween', duration: 0.4 }}
            className="w-full max-w-md mx-auto px-6 py-8"
          >
            <h1 className="text-3xl font-bold mb-2">Time to put a face to the name</h1>
            <p className="text-gray-600 mb-8">You do you! Add at least 4 photos, whether it's you with your pet, eating your fave food, or in a place you love.</p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {/* Photo upload boxes */}
              <div 
                className="aspect-square rounded-2xl border-2 border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden"
                onClick={() => profileImageRef.current.click()}
              >
                {formData.profileImagePreview ? (
                  <img 
                    src={formData.profileImagePreview} 
                    alt="Profile" 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <span className="text-3xl text-gray-400">+</span>
                )}
                <input
                  type="file"
                  ref={profileImageRef}
                  onChange={(e) => handleImageChange(e, 'profileImage')}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              
              <div 
                className="aspect-square rounded-2xl border-2 border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden"
                onClick={() => coverImageRef.current.click()}
              >
                {formData.coverImagePreview ? (
                  <img 
                    src={formData.coverImagePreview} 
                    alt="Cover" 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <span className="text-3xl text-gray-400">+</span>
                )}
                <input
                  type="file"
                  ref={coverImageRef}
                  onChange={(e) => handleImageChange(e, 'coverImage')}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              
              {/* Additional placeholder boxes */}
              {[...Array(4)].map((_, index) => (
                <div 
                  key={index}
                  className="aspect-square rounded-2xl border-2 border-gray-300 flex items-center justify-center cursor-pointer"
                >
                  <span className="text-3xl text-gray-400">+</span>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-100 p-4 rounded-xl flex items-start space-x-3 mb-8">
              <div className="bg-black rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                <FaCamera className="text-white" />
              </div>
              <div>
                <p className="text-gray-700">Want to make sure you really shine?</p>
                <a href="#" className="text-yellow-500 font-medium">Check out our photo tips</a>
              </div>
            </div>
            
            {currentStep === 2 && (
              <button
                onClick={handleSubmit}
                className="w-full py-3 bg-yellow-500 text-white font-bold rounded-full hover:bg-yellow-600 transition-colors"
              >
                Complete Profile
              </button>
            )}
          </motion.div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <>
      <Head>
        <title>Complete Your Profile</title>
      </Head>
      
      <div className="min-h-screen bg-white">
        {/* Progress bar */}
        <div className="h-1 w-full bg-gray-200">
          <div 
            className="h-full bg-yellow-500 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        
        {/* Step indicators */}
        <div className="flex justify-center my-6 px-4">
          {[1, 2, 3].map((step) => (
            <div 
              key={step}
              className={`w-8 h-8 mx-2 rounded-full flex items-center justify-center text-sm 
                ${step === currentStep + 1 
                  ? 'border-2 border-yellow-500 text-yellow-500' 
                  : step < currentStep + 1 
                    ? 'bg-yellow-500 text-white' 
                    : 'border-2 border-gray-300 text-gray-500'
                }`}
            >
              {step}
            </div>
          ))}
        </div>
        
        {/* Form content */}
        <div className="relative overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>
        
        {/* Navigation buttons */}
        <div className="fixed bottom-8 right-8 flex space-x-4">
          {currentStep > 0 && (
            <button
              onClick={customPrevStep}
              className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <IoIosArrowBack size={24} />
            </button>
          )}
          
          {currentStep < 2 && (
            <button
              onClick={customNextStep}
              disabled={!isCurrentStepValid()}
              className={`w-12 h-12 rounded-full shadow-md flex items-center justify-center transition-colors
                ${isCurrentStepValid() 
                  ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              <IoIosArrowForward size={24} />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default OnboardingPage;