import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheckCircle, 
  faBriefcase,
  faXmark, 
  faHeart
} from '@fortawesome/free-solid-svg-icons';

const ProfileCardBizz = ({ profile, dragProgress }) => {
  // Default profile data if none provided (for testing)
  const defaultProfile = {
    name: "Arya",
    verified: true,
    occupation: "Teaching Expert/Curriculum Developer at Ed Tech",
    company: "Ed Tech Co.",
    bio: "Hey there! I am into Lead Generation. Apart from this, I am a highly skilled teacher who can teach you about speed mathematics within an hour!",
    imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6"
  };

  // Use provided profile or default
  const profileData = profile || defaultProfile;
  
  // Split bio into two lines
  const bioLines = profileData.bio.split('. ');
  
  return (
    <div 
      className="relative w-full h-full bg-gray-100 rounded-2xl overflow-hidden shadow-md will-change-transform"
      style={{
        maxWidth: '100%',
        height: '100%',
        touchAction: 'pan-y',
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'contain',
      }}
    >
      {/* Badge at top left */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white px-4 py-1.5 rounded-full font-medium text-sm">
          bizz
        </div>
      </div>
      
      {/* Swipe indicators overlaid on image */}
      {dragProgress && (
        <>
          <motion.div 
            className="absolute top-1/3 left-6 bg-white rounded-full p-3 border-2 border-red-500 transform -rotate-12 z-20"
            style={{ opacity: dragProgress.left, scale: dragProgress.left }}
          >
            <FontAwesomeIcon icon={faXmark} className="h-8 w-8 text-red-500" />
          </motion.div>
          
          <motion.div 
            className="absolute top-1/3 right-6 bg-white rounded-full p-3 border-2 border-green-500 transform rotate-12 z-20"
            style={{ opacity: dragProgress.right, scale: dragProgress.right }}
          >
            <FontAwesomeIcon icon={faHeart} className="h-8 w-8 text-green-500" />
          </motion.div>
        </>
      )}

      {/* Main content container */}
      <div className="flex flex-col h-full">
        {/* Profile Image - takes up most of the card */}
        <div className="relative w-full flex-grow overflow-hidden">
          <img
            src={profileData.imageUrl}
            alt={profileData.name}
            className="w-full h-full object-cover object-center"
            style={{ 
              minHeight: "calc(100vh - 200px)",
              maxHeight: "75vh"
            }}
            loading="eager"
            draggable="false"
          />
          
          {/* Gradient overlay to ensure text visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70"></div>
          
          {/* Profile info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-center mb-2">
              <h2 className="text-3xl font-bold mr-2">{profileData.name}</h2>
              {profileData.verified && (
                <FontAwesomeIcon 
                  icon={faCheckCircle} 
                  className="h-5 w-5 text-white"
                  style={{ filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.4))' }}
                />
              )}
            </div>
            
            {/* Job title with icon */}
            <div className="flex items-center mb-4">
              <FontAwesomeIcon 
                icon={faBriefcase} 
                className="h-4 w-4 mr-2 text-white" 
                style={{ filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.4))' }}
              />
              <p className="text-base font-medium" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.4)' }}>
                {profileData.occupation}
              </p>
            </div>
            
            {/* Bio split into two lines */}
            <div className="space-y-1">
              <p className="text-base" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.4)' }}>
                {bioLines[0]}.
              </p>
              {bioLines.length > 1 && (
                <p className="text-base" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.4)' }}>
                  {bioLines[1]}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCardBizz;