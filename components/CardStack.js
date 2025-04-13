import { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import Card from './Card';
import SwipeIndicator from './SwipeIndicator';

const CardStack = ({ profiles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitDirection, setExitDirection] = useState(null);
  const [swipedProfiles, setSwipedProfiles] = useState([]);
  
  // Only show top 3 cards for performance
  const visibleProfiles = profiles.slice(currentIndex, currentIndex + 3);
  
  const handleSwipe = (direction) => {
    if (currentIndex >= profiles.length) return;
    
    // Set exit direction for animation
    setExitDirection(direction);
    
    // Add swiped profile to history
    setSwipedProfiles([...swipedProfiles, { id: profiles[currentIndex].id, direction }]);
    
    // Move to next card
    setTimeout(() => {
      setCurrentIndex(currentIndex + 1);
      setExitDirection(null);
    }, 300);
  };

  // Handle button clicks for swipe actions
  const handleButtonSwipe = (direction) => {
    if (currentIndex < profiles.length) {
      handleSwipe(direction);
    }
  };

  const restoreLastSwipedProfile = () => {
    if (swipedProfiles.length > 0 && currentIndex > 0) {
      // Remove the last swiped profile from history
      setSwipedProfiles(swipedProfiles.slice(0, -1));
      // Go back to the previous profile
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="card-stack flex flex-col h-full">
      <div className="flex-1 relative flex items-center justify-center w-full bg-white">
        <AnimatePresence>
          {visibleProfiles.length > 0 ? (
            visibleProfiles.map((profile, index) => (
              <SwipeableCard 
                key={profile.id} 
                profile={profile} 
                onSwipe={handleSwipe}
                isTop={index === 0}
                zIndex={visibleProfiles.length - index}
              />
            ))
          ) : (
            <div className="empty-state text-center p-8">
              <h2 className="text-2xl mb-4">No more profiles</h2>
              <p className="mb-4">You've seen everyone for now</p>
              <button 
                className="bg-purple-600 text-white px-4 py-2 rounded-full"
                onClick={() => setCurrentIndex(0)}
              >
                Start Over
              </button>
            </div>
          )}
        </AnimatePresence>
        
        <SwipeIndicator direction="left" isVisible={exitDirection === 'left'} />
        <SwipeIndicator direction="right" isVisible={exitDirection === 'right'} />
      </div>
    </div>
  );
};

const SwipeableCard = ({ profile, onSwipe, isTop, zIndex }) => {
  const [isDragging, setIsDragging] = useState(false);
  
  // Motion values for card position and rotation
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
  
  // Transform x position to opacity for the indicators
  const leftIndicatorOpacity = useTransform(x, [-100, -10], [1, 0]);
  const rightIndicatorOpacity = useTransform(x, [10, 100], [0, 1]);
  
  // Detect swipe direction and threshold
  const handleDragEnd = (_, info) => {
    setIsDragging(false);
    const swipeThreshold = 100;
    
    if (info.offset.x > swipeThreshold) {
      onSwipe('right');
    } else if (info.offset.x < -swipeThreshold) {
      onSwipe('left');
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  // Animation variants for card appearance and exit
  const variants = {
    initial: {
      scale: isTop ? 1 : 0.95,
      y: isTop ? 0 : 15,
    },
    exit: (direction) => ({
      x: direction === 'left' ? -500 : direction === 'right' ? 500 : 0,
      opacity: 1,
      transition: { duration: 0.3 },
      zIndex: 10
    }),
  };

  return (
    <motion.div
      className="absolute w-full h-full px-2 pt-2 pb-0 cursor-grab active:cursor-grabbing touch-manipulation"
      style={{ 
        x, 
        y, 
        rotate, 
        zIndex: isDragging ? 10 : zIndex,
        touchAction: 'none',
      }}
      drag={isTop}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.9}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      initial="initial"
      animate="initial"
      exit="exit"
      variants={variants}
      custom={onSwipe}
    >
      <div className="h-[calc(85vh-64px)] shadow-lg">
        <Card profile={profile} dragProgress={{ left: leftIndicatorOpacity, right: rightIndicatorOpacity }} />
      </div>
    </motion.div>
  );
};

export default CardStack;