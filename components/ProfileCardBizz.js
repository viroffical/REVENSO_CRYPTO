import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheckCircle, 
  faBriefcase,
  faXmark, 
  faHeart,
  faBars,
  faGear
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
  const firstBioLine = bioLines[0];
  const secondBioLine = bioLines.length > 1 ? bioLines.slice(1).join('. ') : '';
  
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
          
          {/* Bottom gradient overlay for text visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
          
          {/* Profile info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-center mb-2">
              <h2 className="text-4xl font-bold mr-2">{profileData.name}</h2>
              {profileData.verified && (
                <FontAwesomeIcon 
                  icon={faCheckCircle} 
                  className="h-6 w-6 text-white"
                />
              )}
            </div>
            
            {/* Job title with icon */}
            <div className="flex items-center mb-5">
              <FontAwesomeIcon 
                icon={faBriefcase} 
                className="h-5 w-5 mr-2 text-white" 
              />
              <p className="text-lg font-medium">
                {profileData.occupation}
              </p>
            </div>
            
            {/* Bio split into two lines */}
            <div className="space-y-2">
              <p className="text-lg">
                {firstBioLine}
              </p>
              {secondBioLine && (
                <p className="text-lg">
                  {secondBioLine}
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