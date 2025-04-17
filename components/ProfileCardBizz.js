import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheckCircle, 
  faBriefcase,
  faXmark, 
  faHeart,
  faBars,
  faGear,
  faUser,
  faPeopleGroup,
  faComment,
  faThumbsUp
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
      {/* Bumble Navigation Header (for appearance) */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-4 py-3 text-black">
        <div className="w-8 h-8 flex items-center justify-center">
          <FontAwesomeIcon icon={faBars} className="h-5 w-5" />
        </div>
        <div className="text-center">
          <span className="font-bold text-lg">Bumble</span>
        </div>
        <div className="w-8 h-8 flex items-center justify-center">
          <FontAwesomeIcon icon={faGear} className="h-5 w-5" />
        </div>
      </div>
      
      {/* Badge at top left */}
      <div className="absolute top-14 left-4 z-10">
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
      
      {/* Bottom Navigation (for appearance) */}
      <div className="absolute bottom-0 left-0 right-0 bg-white px-4 py-2 flex justify-between items-center z-30">
        <div className="flex flex-col items-center text-gray-500">
          <div className="w-6 h-6 flex items-center justify-center mb-1">
            <FontAwesomeIcon icon={faUser} className="h-5 w-5" />
          </div>
          <span className="text-xs">Profile</span>
        </div>
        <div className="flex flex-col items-center text-gray-900">
          <div className="w-6 h-6 flex items-center justify-center mb-1">
            <FontAwesomeIcon icon={faPeopleGroup} className="h-5 w-5" />
          </div>
          <span className="text-xs font-medium">People</span>
        </div>
        <div className="flex flex-col items-center text-gray-500">
          <div className="w-6 h-6 flex items-center justify-center mb-1">
            <FontAwesomeIcon icon={faThumbsUp} className="h-5 w-5" />
          </div>
          <span className="text-xs">Liked You</span>
        </div>
        <div className="flex flex-col items-center text-gray-500">
          <div className="w-6 h-6 flex items-center justify-center mb-1">
            <FontAwesomeIcon icon={faComment} className="h-5 w-5" />
          </div>
          <span className="text-xs">Chats</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCardBizz;