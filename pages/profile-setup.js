import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowRight, 
  faArrowLeft, 
  faCheck, 
  faImage, 
  faUser,
  faUpload
} from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const ProfileSetup = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    gender: '',
    email: '',
    twitter: '',
    profileImage: null,
    profileImagePreview: '',
    timelineImage: null,
    timelineImagePreview: ''
  });
  
  // References for file inputs
  const profileImageRef = useRef(null);
  const timelineImageRef = useRef(null);
  
  useEffect(() => {
    setMounted(true);
    
    // If user is already logged in, populate email field
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email || '',
        name: user.name || ''
      }));
    }
  }, [user]);
  
  // Handle Form Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle Gender Selection
  const handleGenderSelect = (gender) => {
    setFormData(prev => ({
      ...prev,
      gender
    }));
  };
  
  // Handle Image Upload
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
  
  // Handle Image Drop
  const handleDrop = (e, type) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
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
  
  // Handle Drag Events
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  // Navigate to Next Step
  const nextStep = () => {
    setStep(prevStep => prevStep + 1);
  };
  
  // Navigate to Previous Step
  const prevStep = () => {
    setStep(prevStep => Math.max(1, prevStep - 1));
  };
  
  // Calculate Progress Percentage
  const progressPercentage = (step / 4) * 100;
  
  // Validate Current Step
  const isCurrentStepValid = () => {
    switch (step) {
      case 1:
        return formData.name.trim() !== '' && 
               formData.birthDay !== '' && 
               formData.birthMonth !== '' && 
               formData.birthYear !== '';
      case 2:
        return formData.gender !== '';
      case 3:
        return formData.email.trim() !== '';
      case 4:
        return true; // Always allow proceeding from image upload step
      default:
        return false;
    }
  };
  
  // Submit Form
  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Here you would send the data to your backend or state management
    router.push('/'); // Redirect to home after completion
  };
  
  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -50 }
  };
  
  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.3
  };
  
  // Render appropriate form step
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div 
            key="step1"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="step-container"
          >
            <h2 className="step-title">Let's get started</h2>
            <p className="step-description">Tell us a bit about yourself</p>
            
            <div className="form-group">
              <label htmlFor="name" className="form-label">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Date of Birth</label>
              <div className="date-inputs">
                <div className="date-input-container">
                  <input
                    type="number"
                    name="birthDay"
                    value={formData.birthDay}
                    onChange={handleChange}
                    className="form-input date-input"
                    placeholder="DD"
                    min="1"
                    max="31"
                    required
                  />
                  <label className="mini-label">Day</label>
                </div>
                <div className="date-input-container">
                  <input
                    type="number"
                    name="birthMonth"
                    value={formData.birthMonth}
                    onChange={handleChange}
                    className="form-input date-input"
                    placeholder="MM"
                    min="1"
                    max="12"
                    required
                  />
                  <label className="mini-label">Month</label>
                </div>
                <div className="date-input-container">
                  <input
                    type="number"
                    name="birthYear"
                    value={formData.birthYear}
                    onChange={handleChange}
                    className="form-input date-input"
                    placeholder="YYYY"
                    min="1900"
                    max={new Date().getFullYear()}
                    required
                  />
                  <label className="mini-label">Year</label>
                </div>
              </div>
            </div>
          </motion.div>
        );
        
      case 2:
        return (
          <motion.div 
            key="step2"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="step-container"
          >
            <h2 className="step-title">Which gender best describes you?</h2>
            <p className="step-description">You can always update this later.</p>
            
            <div className="gender-options">
              <div 
                className={`gender-option ${formData.gender === 'Woman' ? 'selected' : ''}`}
                onClick={() => handleGenderSelect('Woman')}
              >
                <span className="gender-text">Woman</span>
                {formData.gender === 'Woman' && (
                  <span className="gender-check">
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                )}
              </div>
              <div 
                className={`gender-option ${formData.gender === 'Man' ? 'selected' : ''}`}
                onClick={() => handleGenderSelect('Man')}
              >
                <span className="gender-text">Man</span>
                {formData.gender === 'Man' && (
                  <span className="gender-check">
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                )}
              </div>
              <div 
                className={`gender-option ${formData.gender === 'Nonbinary' ? 'selected' : ''}`}
                onClick={() => handleGenderSelect('Nonbinary')}
              >
                <span className="gender-text">Nonbinary</span>
                {formData.gender === 'Nonbinary' && (
                  <span className="gender-check">
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        );
        
      case 3:
        return (
          <motion.div 
            key="step3"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="step-container"
          >
            <h2 className="step-title">Contact Information</h2>
            <p className="step-description">How can people connect with you?</p>
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="youremail@example.com"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="twitter" className="form-label">Twitter Handle (Optional)</label>
              <input
                type="text"
                id="twitter"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                className="form-input"
                placeholder="@yourhandle"
              />
            </div>
          </motion.div>
        );
        
      case 4:
        return (
          <motion.div 
            key="step4"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="step-container"
          >
            <h2 className="step-title">Profile Images</h2>
            <p className="step-description">Add a profile photo and cover image</p>
            
            <div className="upload-container">
              <div 
                className="profile-upload-area"
                onDrop={(e) => handleDrop(e, 'profileImage')}
                onDragOver={handleDragOver}
                onClick={() => profileImageRef.current.click()}
              >
                {formData.profileImagePreview ? (
                  <div className="profile-preview-container">
                    <img 
                      src={formData.profileImagePreview} 
                      alt="Profile Preview" 
                      className="profile-image-preview" 
                    />
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <FontAwesomeIcon icon={faUser} className="upload-icon" />
                    <p>Profile Photo</p>
                    <span>Click or drop image here</span>
                  </div>
                )}
                <input
                  type="file"
                  ref={profileImageRef}
                  onChange={(e) => handleImageChange(e, 'profileImage')}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </div>
              
              <div 
                className="timeline-upload-area"
                onDrop={(e) => handleDrop(e, 'timelineImage')}
                onDragOver={handleDragOver}
                onClick={() => timelineImageRef.current.click()}
              >
                {formData.timelineImagePreview ? (
                  <div className="timeline-preview-container">
                    <img 
                      src={formData.timelineImagePreview} 
                      alt="Timeline Preview" 
                      className="timeline-image-preview" 
                    />
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <FontAwesomeIcon icon={faImage} className="upload-icon" />
                    <p>Cover Image</p>
                    <span>Click or drop image here</span>
                  </div>
                )}
                <input
                  type="file"
                  ref={timelineImageRef}
                  onChange={(e) => handleImageChange(e, 'timelineImage')}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </div>
            </div>
          </motion.div>
        );
        
      case 5: // Confirmation screen
        return (
          <motion.div 
            key="step5"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="step-container confirmation-step"
          >
            <h2 className="step-title">Profile Complete!</h2>
            <p className="step-description">Here's a summary of your profile</p>
            
            <div className="profile-summary">
              <div className="summary-cover">
                {formData.timelineImagePreview ? (
                  <img 
                    src={formData.timelineImagePreview} 
                    alt="Timeline" 
                    className="summary-timeline" 
                  />
                ) : (
                  <div className="summary-timeline-placeholder">
                    <FontAwesomeIcon icon={faImage} />
                  </div>
                )}
                
                <div className="summary-profile-image-container">
                  {formData.profileImagePreview ? (
                    <img 
                      src={formData.profileImagePreview} 
                      alt="Profile" 
                      className="summary-profile-image" 
                    />
                  ) : (
                    <div className="summary-profile-placeholder">
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="summary-details">
                <h3 className="summary-name">{formData.name}</h3>
                <p className="summary-info">
                  <span className="summary-label">Birthday:</span> 
                  {formData.birthDay}/{formData.birthMonth}/{formData.birthYear}
                </p>
                <p className="summary-info">
                  <span className="summary-label">Gender:</span> 
                  {formData.gender}
                </p>
                <p className="summary-info">
                  <span className="summary-label">Email:</span> 
                  {formData.email}
                </p>
                {formData.twitter && (
                  <p className="summary-info">
                    <span className="summary-label">Twitter:</span> 
                    {formData.twitter}
                  </p>
                )}
              </div>
              
              <button 
                className="btn-complete"
                onClick={handleSubmit}
              >
                Start Using REVENSO
              </button>
            </div>
          </motion.div>
        );
        
      default:
        return null;
    }
  };
  
  if (!mounted) {
    return <div className="loading-screen">Loading...</div>;
  }
  
  return (
    <>
      <Head>
        <title>Complete Your Profile | REVENSO</title>
      </Head>
      
      <div className="profile-setup-container">
        {/* Progress Bar */}
        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        
        {/* Step Indicators */}
        <div className="step-indicators">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div 
              key={stepNumber}
              className={`step-indicator ${stepNumber <= step ? 'active' : ''} ${stepNumber < step ? 'completed' : ''}`}
            >
              {stepNumber < step ? (
                <FontAwesomeIcon icon={faCheck} />
              ) : (
                stepNumber
              )}
            </div>
          ))}
        </div>
        
        {/* Form Container */}
        <div className="form-container">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>
        
        {/* Navigation Buttons */}
        {step < 5 && (
          <div className="navigation-buttons">
            {step > 1 && (
              <button 
                className="nav-button back"
                onClick={prevStep}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
            )}
            
            <button 
              className={`nav-button next ${!isCurrentStepValid() ? 'disabled' : ''}`}
              onClick={step < 4 ? nextStep : () => setStep(5)}
              disabled={!isCurrentStepValid()}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .profile-setup-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          padding: 0;
          background-color: white;
          position: relative;
        }
        
        .progress-container {
          height: 4px;
          width: 100%;
          background-color: #E5E7EB;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 10;
        }
        
        .progress-bar {
          height: 100%;
          background-color: #F59E0B;
          transition: width 0.3s ease;
        }
        
        .step-indicators {
          display: flex;
          justify-content: center;
          margin-top: 24px;
          padding: 0 16px;
        }
        
        .step-indicator {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: white;
          border: 2px solid #E5E7EB;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          margin: 0 8px;
          transition: all 0.3s ease;
          color: #9CA3AF;
        }
        
        .step-indicator.active {
          border-color: #F59E0B;
          color: #F59E0B;
        }
        
        .step-indicator.completed {
          border-color: #F59E0B;
          background-color: #F59E0B;
          color: white;
        }
        
        .form-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 24px;
          overflow-y: auto;
          position: relative;
          margin-bottom: 80px;
        }
        
        .step-container {
          width: 100%;
          max-width: 480px;
          display: flex;
          flex-direction: column;
        }
        
        .step-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 8px;
          text-align: center;
          color: #1F2937;
        }
        
        .step-description {
          font-size: 1rem;
          color: #6B7280;
          margin-bottom: 32px;
          text-align: center;
        }
        
        .form-group {
          margin-bottom: 24px;
        }
        
        .form-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 8px;
          color: #4B5563;
        }
        
        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #D1D5DB;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        
        .form-input:focus {
          outline: none;
          border-color: #F59E0B;
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
        }
        
        .date-inputs {
          display: flex;
          gap: 12px;
        }
        
        .date-input-container {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .date-input {
          text-align: center;
        }
        
        .mini-label {
          font-size: 0.75rem;
          color: #6B7280;
          margin-top: 4px;
          text-align: center;
        }
        
        .gender-options {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .gender-option {
          padding: 16px;
          border: 1px solid #D1D5DB;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s ease;
        }
        
        .gender-option:hover {
          border-color: #F59E0B;
          background-color: rgba(245, 158, 11, 0.05);
        }
        
        .gender-option.selected {
          border-color: #F59E0B;
          background-color: rgba(245, 158, 11, 0.1);
        }
        
        .gender-text {
          font-weight: 500;
        }
        
        .gender-check {
          color: #F59E0B;
        }
        
        .upload-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        
        .profile-upload-area {
          height: 200px;
          border: 2px dashed #D1D5DB;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
        }
        
        .profile-upload-area:hover {
          border-color: #F59E0B;
          background-color: rgba(245, 158, 11, 0.05);
        }
        
        .timeline-upload-area {
          height: 120px;
          border: 2px dashed #D1D5DB;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
        }
        
        .timeline-upload-area:hover {
          border-color: #F59E0B;
          background-color: rgba(245, 158, 11, 0.05);
        }
        
        .upload-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: #6B7280;
        }
        
        .upload-icon {
          font-size: 2rem;
          color: #9CA3AF;
        }
        
        .upload-placeholder p {
          font-weight: 500;
          margin: 0;
        }
        
        .upload-placeholder span {
          font-size: 0.75rem;
        }
        
        .profile-preview-container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .profile-image-preview {
          width: 160px;
          height: 160px;
          object-fit: cover;
          border-radius: 50%;
        }
        
        .timeline-preview-container {
          width: 100%;
          height: 100%;
        }
        
        .timeline-image-preview {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .navigation-buttons {
          position: fixed;
          bottom: 24px;
          right: 24px;
          display: flex;
          gap: 16px;
          z-index: 10;
        }
        
        .nav-button {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .nav-button.next {
          background-color: #F59E0B;
          color: white;
        }
        
        .nav-button.next:hover {
          background-color: #D97706;
        }
        
        .nav-button.back {
          background-color: white;
          color: #4B5563;
        }
        
        .nav-button.back:hover {
          background-color: #F3F4F6;
        }
        
        .nav-button.disabled {
          background-color: #E5E7EB;
          color: #9CA3AF;
          cursor: not-allowed;
        }
        
        .nav-button.disabled:hover {
          background-color: #E5E7EB;
        }
        
        .confirmation-step {
          align-items: center;
        }
        
        .profile-summary {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .summary-cover {
          width: 100%;
          height: 120px;
          position: relative;
          background-color: #F3F4F6;
        }
        
        .summary-timeline {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .summary-timeline-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: #9CA3AF;
        }
        
        .summary-profile-image-container {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background-color: white;
          padding: 4px;
        }
        
        .summary-profile-image {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }
        
        .summary-profile-placeholder {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #F3F4F6;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: #9CA3AF;
        }
        
        .summary-details {
          margin-top: 48px;
          padding: 16px;
          width: 100%;
        }
        
        .summary-name {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 16px;
          text-align: center;
        }
        
        .summary-info {
          font-size: 0.875rem;
          margin-bottom: 8px;
          color: #4B5563;
        }
        
        .summary-label {
          font-weight: 500;
          color: #1F2937;
        }
        
        .btn-complete {
          margin-top: 24px;
          padding: 12px 24px;
          background-color: #F59E0B;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          width: calc(100% - 32px);
          margin-bottom: 16px;
        }
        
        .btn-complete:hover {
          background-color: #D97706;
        }
        
        .loading-screen {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        @media (max-width: 640px) {
          .step-title {
            font-size: 1.25rem;
          }
          
          .step-description {
            font-size: 0.875rem;
            margin-bottom: 24px;
          }
          
          .form-container {
            padding: 16px;
          }
          
          .profile-upload-area {
            height: 180px;
          }
          
          .timeline-upload-area {
            height: 100px;
          }
          
          .profile-image-preview {
            width: 140px;
            height: 140px;
          }
          
          .nav-button {
            width: 48px;
            height: 48px;
          }
        }
      `}</style>
    </>
  );
};

export default ProfileSetup;