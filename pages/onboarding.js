import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  IoIosArrowBack, 
  IoIosArrowForward,
  IoIosWarning
} from 'react-icons/io';
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

  // React Hook Form setup for each step
  const {
    register: registerStep1,
    handleSubmit: handleSubmitStep1,
    formState: { errors: errorsStep1 },
    trigger: triggerStep1,
  } = useForm({
    mode: 'onChange',
  });

  const {
    register: registerStep2,
    handleSubmit: handleSubmitStep2,
    formState: { errors: errorsStep2 },
    trigger: triggerStep2,
  } = useForm({
    mode: 'onChange',
  });

  const {
    handleSubmit: handleSubmitStep3,
  } = useForm({
    mode: 'onChange',
  });

  const profileImageRef = useRef(null);
  const coverImageRef = useRef(null);
  
  // Handle form data changes with validation
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
  
  // Form submission handlers for each step
  const onSubmitStep1 = (data) => {
    customNextStep();
  };

  const onSubmitStep2 = (data) => {
    customNextStep();
  };

  const onSubmitStep3 = (data) => {
    handleFinalSubmit();
  };
  
  // Handle final form submission
  const handleFinalSubmit = () => {
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
  const isCurrentStepValid = async () => {
    switch (currentStep) {
      case 0:
        const step1Valid = await triggerStep1(['firstName', 'birthDay', 'birthMonth', 'birthYear']);
        return step1Valid;
      case 1:
        const step2Valid = await triggerStep2(['email', 'gender']);
        return step2Valid && formData.gender;
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
  
  const customNextStep = async () => {
    const isValid = await isCurrentStepValid();
    
    if (isValid) {
      setDirection(1);
      nextStep();
    }
  };
  
  const customPrevStep = () => {
    setDirection(-1);
    prevStep();
  };
  
  // Render validation error message
  const ErrorMessage = ({ message }) => (
    <div className="flex items-center text-red-500 mt-1 text-sm">
      <IoIosWarning className="mr-1" />
      <span>{message}</span>
    </div>
  );
  
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
            className="w-full max-w-md mx-auto px-6 py-8 overflow-visible"
          >
            <form onSubmit={handleSubmitStep1(onSubmitStep1)}>
              <h1 className="text-3xl font-bold mb-2">Oh hey! Let's start with an intro.</h1>
              
              <div className="space-y-6 mt-8">
                <div className="space-y-2">
                  <label className="block text-lg font-medium">Your first name</label>
                  <input
                    {...registerStep1('firstName', { 
                      required: 'First name is required',
                      pattern: { 
                        value: /^[A-Za-z]+$/,
                        message: 'Only letters allowed (A-Z, a-z)'
                      }
                    })}
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full p-4 border-2 ${errorsStep1.firstName ? 'border-red-500' : 'border-gray-300'} rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                    placeholder="First name"
                  />
                  {errorsStep1.firstName && <ErrorMessage message={errorsStep1.firstName.message} />}
                </div>
                
                <div className="space-y-2">
                  <label className="block text-lg font-medium">Your birthday</label>
                  <div className="flex space-x-4">
                    <div className="flex-1 space-y-1">
                      <input
                        {...registerStep1('birthDay', { 
                          required: 'Day is required',
                          pattern: { 
                            value: /^[0-9]{1,2}$/,
                            message: 'Numbers only'
                          },
                          min: {
                            value: 1,
                            message: 'Min 1'
                          },
                          max: {
                            value: 31,
                            message: 'Max 31'
                          }
                        })}
                        type="text"
                        name="birthDay"
                        value={formData.birthDay}
                        onChange={handleChange}
                        className={`w-full p-4 border-2 ${errorsStep1.birthDay ? 'border-red-500' : 'border-gray-300'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                        placeholder="DD"
                        maxLength="2"
                      />
                      <span className="block text-sm text-gray-500 text-center">Day</span>
                      {errorsStep1.birthDay && <ErrorMessage message={errorsStep1.birthDay.message} />}
                    </div>
                    
                    <div className="flex-1 space-y-1">
                      <input
                        {...registerStep1('birthMonth', { 
                          required: 'Month is required',
                          pattern: { 
                            value: /^[0-9]{1,2}$/,
                            message: 'Numbers only'
                          },
                          min: {
                            value: 1,
                            message: 'Min 1'
                          },
                          max: {
                            value: 12,
                            message: 'Max 12'
                          }
                        })}
                        type="text"
                        name="birthMonth"
                        value={formData.birthMonth}
                        onChange={handleChange}
                        className={`w-full p-4 border-2 ${errorsStep1.birthMonth ? 'border-red-500' : 'border-gray-300'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                        placeholder="MM"
                        maxLength="2"
                      />
                      <span className="block text-sm text-gray-500 text-center">Month</span>
                      {errorsStep1.birthMonth && <ErrorMessage message={errorsStep1.birthMonth.message} />}
                    </div>
                    
                    <div className="flex-1 space-y-1">
                      <input
                        {...registerStep1('birthYear', { 
                          required: 'Year is required',
                          pattern: { 
                            value: /^[0-9]{4}$/,
                            message: 'Must be 4 digits'
                          },
                          min: {
                            value: 1900,
                            message: 'Min 1900'
                          },
                          max: {
                            value: new Date().getFullYear(),
                            message: `Max ${new Date().getFullYear()}`
                          }
                        })}
                        type="text"
                        name="birthYear"
                        value={formData.birthYear}
                        onChange={handleChange}
                        className={`w-full p-4 border-2 ${errorsStep1.birthYear ? 'border-red-500' : 'border-gray-300'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                        placeholder="YYYY"
                        maxLength="4"
                      />
                      <span className="block text-sm text-gray-500 text-center">Year</span>
                      {errorsStep1.birthYear && <ErrorMessage message={errorsStep1.birthYear.message} />}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">It's never too early to count down</p>
                </div>
              </div>
            </form>
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
            className="w-full max-w-md mx-auto px-6 py-8 overflow-visible"
          >
            <form onSubmit={handleSubmitStep2(onSubmitStep2)}>
              <h1 className="text-3xl font-bold mb-2">{formData.firstName || 'You'} is a great name</h1>
              <p className="text-gray-600 mb-8">We love that you're here. Pick the gender that best describes you, then add more about it if you like.</p>
              
              <div className="space-y-4">
                <label className="block text-lg font-medium">Which gender best describes you?</label>
                <input 
                  {...registerStep2('gender', { 
                    required: 'Please select a gender' 
                  })}
                  type="hidden" 
                  name="gender" 
                  value={formData.gender} 
                />
                
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
                
                {errorsStep2.gender && <ErrorMessage message={errorsStep2.gender.message} />}
                
                <div className="flex items-center text-sm mt-4 text-gray-500">
                  <IoInformationCircleOutline className="mr-1" size={16} />
                  <span>You can always update this later. <a href="#" className="text-yellow-500 underline">A note about gender on our platform.</a></span>
                </div>
              </div>
              
              <div className="space-y-6 mt-8">
                <div className="space-y-2">
                  <label className="block text-lg font-medium">Email address</label>
                  <input
                    {...registerStep2('email', { 
                      required: 'Email is required',
                      pattern: { 
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email format'
                      }
                    })}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-4 border-2 ${errorsStep2.email ? 'border-red-500' : 'border-gray-300'} rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                    placeholder="your.email@example.com"
                  />
                  {errorsStep2.email && <ErrorMessage message={errorsStep2.email.message} />}
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
            </form>
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
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
            className="w-full max-w-md mx-auto px-6 py-8 overflow-visible"
          >
            <form onSubmit={handleSubmitStep3(onSubmitStep3)}>
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
                  type="submit"
                  className="w-full py-3 bg-yellow-500 text-white font-bold rounded-full hover:bg-yellow-600 transition-colors"
                >
                  Complete Profile
                </button>
              )}
            </form>
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
      
      <div className="min-h-screen bg-white overflow-y-auto">
        {/* Form content */}
        <div className="relative pb-28">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>
        
        {/* Navigation buttons */}
        <div className="fixed bottom-16 right-8 flex space-x-4 z-50">
          {currentStep > 0 && (
            <button
              onClick={customPrevStep}
              className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <IoIosArrowBack size={28} />
            </button>
          )}
          
          {currentStep < 2 && (
            <button
              onClick={() => isCurrentStepValid().then(valid => valid && customNextStep())}
              className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors
                bg-yellow-500 text-white hover:bg-yellow-600`}
            >
              <IoIosArrowForward size={28} />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default OnboardingPage;