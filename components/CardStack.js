import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence, animate } from 'framer-motion';
import Card from './Card';
import SwipeIndicator from './SwipeIndicator';
import supabase from '../lib/supabaseClient';
import { profiles as dummyProfiles } from '../data/profiles';

const CardStack = () => {
  const [profiles, setProfiles] = useState(dummyProfiles || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitDirection, setExitDirection] = useState(null);
  const [swipedProfiles, setSwipedProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Fetch user profiles from Supabase when component mounts
  useEffect(() => {
    async function fetchUserProfiles() {
      setLoading(true);
      try {
        const { data, error } = await supabase.from("users").select("*");
        if (error) {
          console.log("Error fetching profiles:", error);
        } else if (data && data.length > 0) {
          console.log("Fetched profiles:", data);
          setProfiles(data);
        }
      } catch (error) {
        console.error("Error in fetch operation:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUserProfiles();
  }, []);
  
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

  // Function to restore the previous profile (could be used by custom buttons in the future)
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
      {/* Card container with background overlay to hide any UI behind it */}
      <div className="flex-1 relative flex items-center justify-center w-full bg-white">
        <div className="absolute inset-0 bg-white z-0"></div>
        
        <AnimatePresence mode="popLayout">
          {loading ? (
            // Loading state
            <motion.div 
              className="loading-state text-center p-8 z-10 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="animate-pulse flex flex-col items-center">
                <div className="rounded-xl bg-gray-200 h-64 w-full max-w-xs mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-64 mb-1"></div>
                <div className="h-4 bg-gray-200 rounded w-40"></div>
              </div>
            </motion.div>
          ) : visibleProfiles.length > 0 ? (
            // Show cards when data is loaded
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
            // Empty state when no profiles are left to show
            <motion.div 
              className="empty-state text-center p-8 z-10 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <h2 className="text-2xl mb-4">No more profiles</h2>
              <p className="mb-4">You've seen everyone for now</p>
              <motion.button 
                className="bg-purple-600 text-white px-4 py-2 rounded-full"
                onClick={() => setCurrentIndex(0)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Over
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
        
        <SwipeIndicator direction="left" isVisible={exitDirection === 'left'} />
        <SwipeIndicator direction="right" isVisible={exitDirection === 'right'} />
      </div>
    </div>
  );
};

const SwipeableCard = ({ profile, onSwipe, isTop, zIndex }) => {
  const cardRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // High performance motion values for smooth tracking
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-20, 0, 20]);
  
  // Indicators for swipe direction with wider range for smoother transition
  const leftIndicatorOpacity = useTransform(x, [-150, -20], [1, 0]);
  const rightIndicatorOpacity = useTransform(x, [20, 150], [0, 1]);
  
  // Reset card position with simple spring animation
  const resetCardPosition = () => {
    animate(x, 0, {
      type: "spring",
      stiffness: 500,
      damping: 50,
      duration: 0.2
    });
  };
  
  // Simple drag handlers that work well on both mobile and desktop
  const handleDragStart = () => {
    if (!isTop) return;
    setIsDragging(true);
  };

  const handleDragEnd = (_, info) => {
    if (!isTop) return;
    
    setIsDragging(false);
    
    // More responsive thresholds specifically for touch devices
    const swipeThreshold = 80;
    const velocityThreshold = 300;
    
    // Detect swipes based on velocity first (fastest response)
    if (info.velocity.x > velocityThreshold) {
      onSwipe('right');
    } 
    else if (info.velocity.x < -velocityThreshold) {
      onSwipe('left');
    }
    // Fallback to distance for slower swipes
    else if (info.offset.x > swipeThreshold) {
      onSwipe('right');
    } 
    else if (info.offset.x < -swipeThreshold) {
      onSwipe('left');
    } 
    else {
      resetCardPosition();
    }
  };

  // Animation variants for card appearance and exit
  const variants = {
    initial: {
      scale: isTop ? 1 : 0.95,
      y: isTop ? 0 : 15,
      opacity: isTop ? 1 : 0.8,
    },
    animate: {
      scale: isTop ? 1 : 0.95,
      y: isTop ? 0 : 15,
      opacity: isTop ? 1 : 0.8,
      transition: {
        scale: { duration: 0.2 },
        y: { duration: 0.2 },
        opacity: { duration: 0.4 }
      }
    },
    exit: (direction) => ({
      x: direction === 'left' ? -1000 : direction === 'right' ? 1000 : 0,
      opacity: 1,
      rotate: direction === 'left' ? -30 : direction === 'right' ? 30 : 0,
      transition: { 
        duration: 0.2,
        ease: "easeOut"
      }
    }),
  };

  return (
    <motion.div
      ref={cardRef}
      className="absolute w-full h-full px-2 pt-2 pb-0 cursor-grab active:cursor-grabbing"
      style={{ 
        x, 
        rotate, 
        zIndex: isDragging ? 999 : (zIndex + 10),
        touchAction: 'none',
        WebkitTapHighlightColor: 'transparent',
        WebkitUserSelect: 'none',
        userSelect: 'none',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        transform: 'translate3d(0,0,0)',
        WebkitTransform: 'translate3d(0,0,0)'
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      dragMomentum={true}
      dragTransition={{ 
        power: 0.2,
        timeConstant: 100,
        modifyTarget: target => Math.abs(target) < 5 ? 0 : target
      }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      custom={onSwipe}
      whileTap={{ scale: 1.02 }}
      layoutId={`card-${profile.id}`}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.8
      }}
    >
      <div className="h-[calc(100vh-180px)] shadow-xl rounded-xl overflow-hidden bg-white">
        <Card profile={profile} dragProgress={{ left: leftIndicatorOpacity, right: rightIndicatorOpacity }} />
      </div>
    </motion.div>
  );
};

export default CardStack;