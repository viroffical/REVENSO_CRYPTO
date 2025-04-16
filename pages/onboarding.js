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
import useRegister from '../lib/useRegister';

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    twitter: '',
    password: '',
    role: '',
    project: '',
    bio: '',
    event: '',
    profileImage: null,
    profileImagePreview: null,
  });

  // React Hook Form setup for each step
  const {
    register: registerStep1,
    handleSubmit: handleSubmitStep1,
    formState: { errors: errorsStep1 },
    trigger: triggerStep1,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      fullName: formData.fullName || '',
      email: formData.email || '',
      twitter: formData.twitter || '',
      password: formData.password || ''
    }
  });
  
  const {
    register: registerStep2,
    handleSubmit: handleSubmitStep2,
    formState: { errors: errorsStep2 },
    trigger: triggerStep2,
    setValue: setValueStep2,
    clearErrors: clearErrorsStep2
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      role: formData.role || '',
      project: formData.project || '',
      bio: formData.bio || '',
      event: formData.event || ''
    }
  });

  const profileImageRef = useRef(null);
  const coverImageRef = useRef(null);
  const containerRef = useRef(null);
  
  // Auto-scroll to top on step changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    
    // Reset scroll position in window
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [currentStep]);
  
  // Handle form data changes with validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle gender selection
  const handleGenderSelect = (gender) => {
    // Update the form data state
    setFormData(prev => ({ ...prev, gender }));
    
    // Update the form value in React Hook Form
    if (setValueStep2) {
      setValueStep2('gender', gender);
      
      // Clear any gender validation errors
      if (clearErrorsStep2) {
        clearErrorsStep2('gender');
      }
    }
    
    // Force validation to pass for gender field
    setTimeout(() => {
      if (triggerStep2) {
        triggerStep2('gender');
      }
    }, 50);
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
    handleFinalSubmit();
  };
  
  // Initialize our custom hook for registration
  const { registerUser, isLoading, error: registrationError } = useRegister();
  
  // Handle final form submission
  const handleFinalSubmit = async () => {
    console.log('Form submitted:', formData);
    try {
      // Prepare user data including the profile image preview (base64 data)
      const userData = {
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        twitter: formData.twitter,
        role: formData.role,
        project: formData.project,
        bio: formData.bio,
        event: formData.event,
        profileImagePreview: formData.profileImagePreview,
      };
      
      // Call the register API through our custom hook
      const data = await registerUser(userData);
      
      // Registration successful, redirect to the main app
      alert('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        window.location.href = '/login';
      }, 1500);
    } catch (error) {
      console.error('Registration error:', error);
      alert(`Registration failed: ${error.message}`);
    }
  };
  
  // Navigate to next step
  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 1));
  };
  
  // Navigate to previous step
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };
  
  // Helper function to scroll to element
  const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  // Check if current step is valid to proceed
  const isCurrentStepValid = async () => {
    switch (currentStep) {
      case 0:
        const step1Valid = await triggerStep1(['fullName', 'email', 'twitter', 'password']);
        return step1Valid && formData.profileImagePreview !== null;
      case 1:
        const step2Valid = await triggerStep2(['role', 'project', 'bio', 'event']);
        return step2Valid;
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
  
  // Track dropdown state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const customNextStep = async () => {
    const isValid = await isCurrentStepValid();
    
    if (isValid) {
      setDirection(1);
      nextStep();
      
      // Smooth scroll to top of container
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
      
      // Scroll to the appropriate form based on next step
      setTimeout(() => {
        const nextStepId = `step${currentStep + 2 > 1 ? 2 : currentStep + 2}Form`;
        scrollToElement(nextStepId);
      }, 100);
    }
  };
  
  const customPrevStep = () => {
    setDirection(-1);
    prevStep();
    
    // Smooth scroll to top of container
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
    
    // Scroll to the appropriate form based on prev step
    setTimeout(() => {
      const prevStepId = `step${currentStep > 0 ? currentStep : 1}Form`;
      scrollToElement(prevStepId);
    }, 100);
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
            id="step1Form"
            key="step1"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'tween', duration: 0.4 }}
            className="w-full max-w-md mx-auto px-6 py-8 pb-32 overflow-y-auto scrollbar-hide min-h-full"
          >
            <form onSubmit={handleSubmitStep1(onSubmitStep1)}>
              <h1 className="text-3xl font-bold mb-2">Welcome to REVENSO</h1>
              <p className="text-gray-600 mb-8">Let's set up your profile to get you connected.</p>
              
              <div className="space-y-6 mt-8">
                <div className="space-y-2">
                  <label className="block text-lg font-medium">Full Name</label>
                  <input
                    {...registerStep1('fullName', { 
                      required: 'Full name is required'
                    })}
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full p-4 border-2 ${errorsStep1?.fullName ? 'border-red-500' : 'border-gray-300'} rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                    placeholder="Your full name"
                  />
                  {errorsStep1?.fullName && <ErrorMessage message={errorsStep1.fullName.message} />}
                </div>
                
                <div className="space-y-2">
                  <label className="block text-lg font-medium">Email address</label>
                  <input
                    {...registerStep1('email', { 
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
                    className={`w-full p-4 border-2 ${errorsStep1?.email ? 'border-red-500' : 'border-gray-300'} rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                    placeholder="your.email@example.com"
                  />
                  {errorsStep1?.email && <ErrorMessage message={errorsStep1.email.message} />}
                </div>
                
                <div className="space-y-2">
                  <label className="block text-lg font-medium">Password</label>
                  <input
                    {...registerStep1('password', { 
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters'
                      }
                    })}
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full p-4 border-2 ${errorsStep1?.password ? 'border-red-500' : 'border-gray-300'} rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                    placeholder="••••••••"
                  />
                  {errorsStep1?.password && <ErrorMessage message={errorsStep1.password.message} />}
                </div>
                
                <div className="space-y-2">
                  <label className="block text-lg font-medium">Twitter handle</label>
                  <input
                    {...registerStep1('twitter', { 
                      required: 'Twitter handle is required' 
                    })}
                    type="text"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    className={`w-full p-4 border-2 ${errorsStep1?.twitter ? 'border-red-500' : 'border-gray-300'} rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                    placeholder="@username"
                  />
                  {errorsStep1?.twitter && <ErrorMessage message={errorsStep1.twitter.message} />}
                </div>
                
                {/* Profile Avatar */}
                <div className="space-y-2">
                  <label className="block text-lg font-medium">Profile Avatar</label>
                  <div 
                    className="aspect-square w-full max-w-[200px] rounded-2xl border-2 border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden"
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
                  {!formData.profileImagePreview && <p className="text-sm text-gray-500">Please upload a profile picture</p>}
                </div>
                
              </div>
            </form>
          </motion.div>
        );
        
      case 1:
        return (
          <motion.div 
            id="step2Form"
            key="step2"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'tween', duration: 0.4 }}
            className="w-full max-w-md mx-auto px-6 py-8 pb-32 overflow-y-auto scrollbar-hide min-h-full"
          >
            <form onSubmit={handleSubmitStep2(onSubmitStep2)}>
              <h1 className="text-3xl font-bold mb-2">Tell us about your professional self</h1>
              <p className="text-gray-600 mb-8">Let others know what you do and what you're passionate about.</p>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-lg font-medium">Role</label>
                  <input
                    {...registerStep2('role', { 
                      required: 'Role is required'
                    })}
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={`w-full p-4 border-2 ${errorsStep2?.role ? 'border-red-500' : 'border-gray-300'} rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                    placeholder="Your professional role"
                  />
                  {errorsStep2?.role && <ErrorMessage message={errorsStep2.role.message} />}
                </div>
                <div className="space-y-2">
                  <label className="block text-lg font-medium">Project</label>
                  <input
                    {...registerStep2('project', { 
                      required: 'Project is required'
                    })}
                    type="text"
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    className={`w-full p-4 border-2 ${errorsStep2?.project ? 'border-red-500' : 'border-gray-300'} rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                    placeholder="Your current project"
                  />
                  {errorsStep2?.project && <ErrorMessage message={errorsStep2.project.message} />}
                </div>
                
                <div className="space-y-2">
                  <label className="block text-lg font-medium">Looking to meet</label>
                  <textarea
                    {...registerStep2('bio', { 
                      required: 'Looking to meet is required',
                      minLength: {
                        value: 5,
                        message: 'Must be at least 5 characters'
                      },
                      maxLength: {
                        value: 100,
                        message: 'Must be less than 100 characters'
                      }
                    })}
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className={`w-full p-4 border-2 ${errorsStep2?.bio ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                    placeholder="Who are you hoping to meet at this event?"
                    rows={3}
                  />
                  {errorsStep2?.bio && <ErrorMessage message={errorsStep2.bio.message} />}
                  <div className="flex justify-end">
                    <span className="text-sm text-gray-500">{formData.bio ? formData.bio.length : 0}/100</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-lg font-medium">Are you Attending?</label>
                  <div className="mb-4">
                    <input
                      {...registerStep2('event', { 
                        required: 'Please select an event'
                      })}
                      type="hidden"
                      name="event"
                      value={formData.event}
                    />
                    
                    <div className={`p-4 border-2 ${errorsStep2?.event ? 'border-red-500' : 'border-gray-300'} rounded-xl`}>
                      <div className="relative">
                        <div 
                          className="flex items-center justify-between cursor-pointer"
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                          {formData.event ? (
                            <div className="flex items-center">
                              {formData.event === "TOKEN 2049" && (
                                <div className="w-8 h-8 rounded-md overflow-hidden bg-blue-600 mr-3">
                                  <img 
                                    src="/events/token2049.jpg" 
                                    alt="TOKEN 2049" 
                                    className="w-full h-full object-cover"
                                    onError={(e) => e.target.src = 'https://via.placeholder.com/150?text=Token2049'}
                                  />
                                </div>
                              )}
                              <span>{formData.event}</span>
                            </div>
                          ) : (
                            <span className="text-gray-500">Select an event</span>
                          )}
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </div>
                        
                        {dropdownOpen && (
                          <div className="absolute z-10 w-full bg-white mt-2 rounded-xl border-2 border-gray-300 overflow-hidden">
                            <div 
                              className="flex items-center p-3 hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                handleChange({ target: { name: 'event', value: 'TOKEN 2049' } });
                                // Also update the React Hook Form state and clear errors
                                setValueStep2('event', 'TOKEN 2049');
                                clearErrorsStep2('event');
                                setDropdownOpen(false);
                              }}
                            >
                              <div className="w-8 h-8 rounded-md overflow-hidden bg-blue-600 mr-3">
                                <img 
                                  src="/events/token2049.jpg" 
                                  alt="TOKEN 2049" 
                                  className="w-full h-full object-cover"
                                  onError={(e) => e.target.src = 'https://via.placeholder.com/150?text=Token2049'}
                                />
                              </div>
                              <span>TOKEN 2049</span>
                            </div>
                            <div 
                              className="p-3 hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                handleChange({ target: { name: 'event', value: 'ETH Denver' } });
                                // Also update the React Hook Form state and clear errors
                                setValueStep2('event', 'ETH Denver');
                                clearErrorsStep2('event');
                                setDropdownOpen(false);
                              }}
                            >
                              ETH Denver
                            </div>
                            <div 
                              className="p-3 hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                handleChange({ target: { name: 'event', value: 'Solana Breakpoint' } });
                                // Also update the React Hook Form state and clear errors
                                setValueStep2('event', 'Solana Breakpoint');
                                clearErrorsStep2('event');
                                setDropdownOpen(false);
                              }}
                            >
                              Solana Breakpoint
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {errorsStep2?.event && <ErrorMessage message={errorsStep2.event.message} />}
                </div>
                
                {currentStep === 1 && (
                  <button
                    type="submit"
                    className="w-full py-3 bg-yellow-500 text-white font-bold rounded-full hover:bg-yellow-600 transition-colors mt-8"
                  >
                    Complete Profile
                  </button>
                )}
              </div>
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
      
      <div className="min-h-screen bg-white overflow-y-auto h-full" ref={containerRef}>
        {/* Form content */}
        <div className="relative pb-28 overflow-y-auto">
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
          
          {currentStep < 1 && (
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