import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faHeart } from '@fortawesome/free-solid-svg-icons';
import { profiles } from '../data/profiles';

const SwipeableCardStack = () => {
  // State for managing profiles
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleProfiles, setVisibleProfiles] = useState([]);
  const [exitDirection, setExitDirection] = useState(null);
  
  // Set up visible profiles when currentIndex changes
  useEffect(() => {
    // Load next 3 profiles to show in stack (or less if near the end of the array)
    const newVisibleProfiles = [];
    for (let i = 0; i < 3; i++) {
      const index = currentIndex + i;
      if (index < profiles.length) {
        newVisibleProfiles.push(profiles[index]);
      }
    }
    setVisibleProfiles(newVisibleProfiles);
  }, [currentIndex]);

  // Handle swipe actions
  const handleSwipe = (direction) => {
    setExitDirection(direction);
    
    // Move to next profile after a short delay
    setTimeout(() => {
      setCurrentIndex(currentIndex + 1);
      setExitDirection(null);
    }, 300);
  };

  return (
    <div className="card-stack-container relative h-full flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-md mx-auto h-full pt-4 pb-4">
        <AnimatePresence initial={false}>
          {visibleProfiles.length > 0 ? (
            visibleProfiles.map((profile, index) => (
              <SwipeableCard 
                key={profile.id} 
                profile={profile} 
                onSwipe={handleSwipe}
                index={index}
                totalCards={visibleProfiles.length}
              />
            ))
          ) : (
            <motion.div 
              key="empty"
              className="empty-state text-center p-8 absolute inset-0 flex flex-col items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4">No more profiles</h2>
              <p className="mb-6 text-gray-600">You've seen everyone for now</p>
              <button 
                className="bg-yellow-400 text-white px-6 py-3 rounded-full font-semibold shadow-md"
                onClick={() => setCurrentIndex(0)}
              >
                Start Over
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Individual swipeable card component
const SwipeableCard = ({ profile, onSwipe, index, totalCards }) => {
  const zIndex = totalCards - index;
  const [isDragging, setIsDragging] = useState(false);
  
  // Controls for card position and rotation
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Transform x position to rotation and indicators
  const rotate = useTransform(x, [-200, 0, 200], [-20, 0, 20]);
  const leftIndicatorOpacity = useTransform(x, [-100, -10], [1, 0]);
  const rightIndicatorOpacity = useTransform(x, [10, 100], [0, 1]);
  
  // Calculate card scale and position based on index in stack
  const getStackStyles = () => {
    // Base values for the top card
    if (index === 0) return { scale: 1, y: 0, opacity: 1 };
    
    // For cards underneath, create a stacked appearance
    const scale = 1 - index * 0.05; // Each card is slightly smaller
    const y = index * 8; // Each card is slightly lower
    const opacity = 1 - index * 0.2; // Each card is slightly more transparent
    
    return { scale, y, opacity };
  };
  
  const stackStyles = getStackStyles();
  
  // Handle drag end to determine swipe direction
  const handleDragEnd = (_, info) => {
    setIsDragging(false);
    
    // Only the top card can be swiped
    if (index !== 0) return;
    
    const swipeThreshold = 80;
    const swipeVelocityThreshold = 0.5;
    
    // Calculate swipe force (combination of velocity and distance)
    const swipeForce = Math.abs(info.velocity.x) * (Math.abs(info.offset.x) / 100);
    
    // Determine swipe direction based on velocity for quick swipes
    if (info.velocity.x > swipeVelocityThreshold || (swipeForce > 0.3 && info.offset.x > 0)) {
      onSwipe('right');
      return;
    }
    
    if (info.velocity.x < -swipeVelocityThreshold || (swipeForce > 0.3 && info.offset.x < 0)) {
      onSwipe('left');
      return;
    }
    
    // Or based on distance for slower swipes
    if (info.offset.x > swipeThreshold) {
      onSwipe('right');
    } else if (info.offset.x < -swipeThreshold) {
      onSwipe('left');
    }
  };
  
  return (
    <motion.div
      className="absolute w-full px-3"
      style={{
        x: index === 0 ? x : 0,
        y: index === 0 ? y : stackStyles.y,
        zIndex: isDragging ? 999 : zIndex,
        rotate: index === 0 ? rotate : 0,
        top: '0',
        left: '0',
        right: '0',
        pointerEvents: index === 0 ? 'auto' : 'none',
        willChange: 'transform',
      }}
      animate={{
        scale: stackStyles.scale,
        opacity: stackStyles.opacity,
      }}
      initial={{
        scale: stackStyles.scale,
        opacity: stackStyles.opacity,
      }}
      exit={direction => ({
        x: direction === 'left' ? -500 : direction === 'right' ? 500 : 0,
        opacity: 0,
        transition: { duration: 0.2 }
      })}
      transition={{
        scale: { duration: 0.2 },
        opacity: { duration: 0.2 }
      }}
      drag={index === 0 ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
    >
      <div 
        className="bg-white rounded-xl overflow-hidden shadow-lg"
        style={{
          height: 'calc(100vh - 200px)',
          maxHeight: '700px',
        }}
      >
        {/* Card Content */}
        <div className="h-full flex flex-col overflow-hidden">
          {/* Image Section */}
          <div className="relative h-3/5 overflow-hidden">
            <img 
              src={profile.imageUrl || profile.image} 
              alt={profile.name}
              className="w-full h-full object-cover"
              draggable="false"
            />
            
            {/* Swipe Indicators (only on top card) */}
            {index === 0 && (
              <>
                <motion.div 
                  className="absolute top-6 left-6 bg-white rounded-full p-4 shadow-md"
                  style={{ opacity: leftIndicatorOpacity }}
                >
                  <FontAwesomeIcon icon={faXmark} className="text-red-500 text-xl" />
                </motion.div>
                
                <motion.div 
                  className="absolute top-6 right-6 bg-white rounded-full p-4 shadow-md"
                  style={{ opacity: rightIndicatorOpacity }}
                >
                  <FontAwesomeIcon icon={faHeart} className="text-green-500 text-xl" />
                </motion.div>
              </>
            )}
            
            {/* Name and Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              <h2 className="text-white text-xl font-bold">{profile.name}</h2>
              <p className="text-white/80 text-sm">
                {profile.occupation || profile.jobTitle} 
                {profile.company && ` at ${profile.company}`}
              </p>
            </div>
          </div>
          
          {/* Scrollable Content Section */}
          <div className="flex-1 p-4 overflow-y-auto scrollbar-hide">
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <p className="text-gray-700 mb-4">{profile.bio || "No bio available"}</p>
            
            {/* Additional Content */}
            <h3 className="text-lg font-semibold mb-2">Interests</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.interests ? (
                profile.interests.map((interest, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {interest}
                  </span>
                ))
              ) : (
                <>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Crypto</span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Blockchain</span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">NFTs</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SwipeableCardStack;