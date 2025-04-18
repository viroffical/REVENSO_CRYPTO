import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence, animate } from 'framer-motion';
import Card from './Card';
import SwipeIndicator from './SwipeIndicator';
// import supabase from '../lib/supabaseClient';
import { profiles as dummyProfiles } from '../data/profiles';
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://rjucgbzerztofpuotjgr.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqdWNnYnplcnp0b2ZwdW90amdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MzI2MTAsImV4cCI6MjA2MDIwODYxMH0.jf08hvHlAP5RAXqziUa8rytGR60xqRWnUAuhqfo-pek";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const CardStack = () => {
  const [profiles, setProfiles] = useState([]);
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
  const [touchStartX, setTouchStartX] = useState(0);
  
  // High performance motion values for smoother tracking
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-20, 0, 20]);
  
  // Indicators for swipe direction with wider range for smoother transition
  const leftIndicatorOpacity = useTransform(x, [-150, -20], [1, 0]);
  const rightIndicatorOpacity = useTransform(x, [20, 150], [0, 1]);
  
  // Enhanced spring animation for more natural card movement
  const resetCardPosition = () => {
    animate(x, 0, {
      type: "spring",
      stiffness: 400,  // Lower stiffness for smoother finish
      damping: 40,     // Lower damping for more natural bounce
      velocity: 0,     // Reset any existing velocity
      restDelta: 0.5,  // Smaller rest delta for more precision
      restSpeed: 0.5,  // Smaller rest speed for smoother finish
    });
  };
  
  // Direct touch event handlers for better control on mobile
  useEffect(() => {
    if (!isTop || !cardRef.current) return;
    
    const card = cardRef.current;
    
    const handleTouchStart = (e) => {
      setIsDragging(true);
      setTouchStartX(e.touches[0].clientX);
    };
    
    const handleTouchMove = (e) => {
      if (!isDragging) return;
      
      const currentX = e.touches[0].clientX;
      const deltaX = currentX - touchStartX;
      
      // Update the motion value directly for smoother movement
      x.set(deltaX);
    };
    
    const handleTouchEnd = (e) => {
      if (!isDragging) return;
      
      setIsDragging(false);
      
      // Get the final position and calculate swipe direction
      const currentX = x.get();
      const swipeThreshold = 80;
      
      if (currentX > swipeThreshold) {
        onSwipe('right');
      } else if (currentX < -swipeThreshold) {
        onSwipe('left');
      } else {
        resetCardPosition();
      }
    };
    
    // Add touch event listeners for mobile devices
    card.addEventListener('touchstart', handleTouchStart, { passive: true });
    card.addEventListener('touchmove', handleTouchMove, { passive: true });
    card.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      // Clean up event listeners
      card.removeEventListener('touchstart', handleTouchStart);
      card.removeEventListener('touchmove', handleTouchMove);
      card.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isTop, isDragging, touchStartX, x, onSwipe]);
  
  // Mouse drag handlers (for desktop)
  const handleDragStart = () => {
    if (!isTop) return;
    setIsDragging(true);
  };

  const handleDragEnd = (_, info) => {
    if (!isTop) return;
    
    setIsDragging(false);
    
    // More responsive thresholds
    const swipeThreshold = 80;
    const velocityThreshold = 200; // Lower threshold for easier swiping
    
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
      x: direction === 'left' ? -2000 : direction === 'right' ? 2000 : 0,
      y: direction === 'left' ? 100 : direction === 'right' ? 50 : 0,
      opacity: 0,
      rotate: direction === 'left' ? -45 : direction === 'right' ? 45 : 0,
      scale: 0.8,
      transition: { 
        duration: 0.5,
        ease: [0.32, 0.72, 0, 1], // Custom easing for smoother exit
        opacity: { duration: 0.3 }
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
        touchAction: 'none', // Disable browser touch actions for better swipe control
        WebkitTapHighlightColor: 'transparent',
        WebkitUserSelect: 'none',
        userSelect: 'none',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        willChange: 'transform', // Hint to browser for optimization
        transform: 'translate3d(0,0,0)',
        WebkitTransform: 'translate3d(0,0,0)',
        perspective: 1000, // Improve performance for 3D transforms
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: -1000, right: 1000 }} // Wider constraints for smoother drag
      dragElastic={0.9} // More elasticity for natural feeling
      dragMomentum={true}
      dragTransition={{ 
        power: 0.15, // Lower power for smoother deceleration
        timeConstant: 200, // Higher time constant for smoother movement
        restDelta: 1, // Smaller delta for more precise rest point
        modifyTarget: target => Math.abs(target) < 10 ? 0 : target, // More forgiving snap back
        bounceStiffness: 300, // Softer bounce for more natural feel
        bounceDamping: 40  // Lower damping for smoother bounce
      }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      custom={onSwipe}
      whileTap={{ scale: 1.01 }} // Smaller scale change for smoother feel
      layoutId={`card-${profile.id}`}
      transition={{
        type: "spring",
        stiffness: 400, // Lower stiffness for smoother animation
        damping: 35,   // Adjusted damping for natural movement
        mass: 0.9,     // Slightly higher mass feels more substantial
        restDelta: 0.5 // Smaller rest delta for smoother finish
      }}
    >
      <div className="h-[calc(100vh-180px)] shadow-xl rounded-xl overflow-hidden bg-white">
        <Card profile={profile} dragProgress={{ left: leftIndicatorOpacity, right: rightIndicatorOpacity }} />
      </div>
    </motion.div>
  );
};

export default CardStack;