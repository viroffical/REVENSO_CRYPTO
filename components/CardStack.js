import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence, animate } from 'framer-motion';
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
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef(null);
  
  // Motion values for card position and rotation
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Make rotation more responsive with higher values
  const rotate = useTransform(x, [-150, 0, 150], [-20, 0, 20]);
  
  // Transform x position to opacity for the indicators
  const leftIndicatorOpacity = useTransform(x, [-80, -10], [1, 0]);
  const rightIndicatorOpacity = useTransform(x, [10, 80], [0, 1]);
  
  // Touch handling state
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchDelta, setTouchDelta] = useState({ x: 0, y: 0 });
  const velocityTracker = useRef({ x: 0, time: 0, positions: [] });
  
  // Smoothly animate card back to center when needed
  useEffect(() => {
    if (!isTop) {
      // Reset position when card is not on top
      x.set(0);
      y.set(0);
    }
  }, [isTop, x, y]);
  
  // Handle spring-back animation when releasing the card
  const resetCardPosition = () => {
    animate(x, 0, {
      type: "spring",
      stiffness: 400,
      damping: 20,
      velocity: 0
    });
  };
  
  // Direct touch event handlers for more responsive mobile experience
  const handleTouchStart = (e) => {
    if (!isTop) return;
    setIsDragging(true);
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    velocityTracker.current = { 
      x: touch.clientX, 
      time: Date.now(), 
      positions: [{ x: touch.clientX, time: Date.now() }] 
    };
    
    // Prevent default to ensure we have smooth tracking
    e.preventDefault();
  };
  
  const handleTouchMove = (e) => {
    if (!isTop || !isDragging) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStart.x;
    
    // Track positions for velocity calculation
    velocityTracker.current.positions.push({
      x: touch.clientX,
      time: Date.now()
    });
    
    // Only keep the last 5 positions for performance
    if (velocityTracker.current.positions.length > 5) {
      velocityTracker.current.positions.shift();
    }
    
    // Update motion values directly for smooth visual feedback
    x.set(deltaX);
    setTouchDelta({ x: deltaX, y: touch.clientY - touchStart.y });
    
    // Prevent default to avoid scroll interference
    e.preventDefault();
  };
  
  const handleTouchEnd = (e) => {
    if (!isTop || !isDragging) return;
    setIsDragging(false);
    
    // Calculate velocity based on the last few touch events
    const positions = velocityTracker.current.positions;
    let velocity = 0;
    
    if (positions.length >= 2) {
      const first = positions[0];
      const last = positions[positions.length - 1];
      const deltaTime = last.time - first.time;
      
      if (deltaTime > 0) {
        velocity = (last.x - first.x) / deltaTime; // pixels per ms
      }
    }
    
    // Normalize velocity to match Framer Motion scale
    velocity = velocity * 1000; // Convert to pixels per second
    
    const deltaX = touchDelta.x;
    const swipeThreshold = 40;
    const swipeVelocityThreshold = 0.4;
    
    // Apply the same swipe logic
    if (velocity > swipeVelocityThreshold || (Math.abs(velocity) > 0.2 && deltaX > 0)) {
      onSwipe('right');
    } else if (velocity < -swipeVelocityThreshold || (Math.abs(velocity) > 0.2 && deltaX < 0)) {
      onSwipe('left');
    } else if (deltaX > swipeThreshold) {
      onSwipe('right');
    } else if (deltaX < -swipeThreshold) {
      onSwipe('left');
    } else {
      // Reset position with spring animation
      resetCardPosition();
    }
    
    // Reset touch tracking
    setTouchDelta({ x: 0, y: 0 });
    
    // Prevent default 
    e.preventDefault();
  };
  
  // Framer Motion drag handlers as fallback for desktop
  const handleDragEnd = (_, info) => {
    if (!isTop) return;
    setIsDragging(false);
    const swipeThreshold = 40;
    const swipeVelocityThreshold = 0.15;
    
    const swipeForce = Math.abs(info.velocity.x) * (Math.abs(info.offset.x) / 100);
    
    if (info.velocity.x > swipeVelocityThreshold || (swipeForce > 0.1 && info.offset.x > 0)) {
      onSwipe('right');
    } else if (info.velocity.x < -swipeVelocityThreshold || (swipeForce > 0.1 && info.offset.x < 0)) {
      onSwipe('left');
    } else if (info.offset.x > swipeThreshold) {
      onSwipe('right');
    } else if (info.offset.x < -swipeThreshold) {
      onSwipe('left');
    } else {
      // Reset position smoothly
      resetCardPosition();
    }
  };

  const handleDragStart = () => {
    if (!isTop) return;
    setIsDragging(true);
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
      x: direction === 'left' ? -600 : direction === 'right' ? 600 : 0,
      opacity: 1,
      transition: { 
        duration: 0.2,
        ease: [0.32, 0.72, 0, 1], // Custom ease curve for smoother animation
        opacity: { duration: 0.1 }
      },
      zIndex: 10
    }),
  };

  return (
    <motion.div
      ref={cardRef}
      className="absolute w-full h-full px-2 pt-2 pb-0 cursor-grab active:cursor-grabbing touch-manipulation bg-white will-change-transform"
      style={{ 
        x, 
        y, 
        rotate, 
        zIndex: isDragging ? 999 : (zIndex + 10),
        touchAction: 'none', // Disable browser touch actions entirely for our custom handling
        WebkitTapHighlightColor: 'transparent',
        WebkitUserSelect: 'none',
        userSelect: 'none',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        WebkitPerspective: '1000',
        perspective: '1000',
        WebkitTransformStyle: 'preserve-3d',
        transformStyle: 'preserve-3d',
        WebkitTransform: 'translate3d(0,0,0)',
        transform: 'translate3d(0,0,0)',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      drag={isTop ? "x" : false} // Limit to horizontal dragging only for better control
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={1} // Full elastic movement for natural touch feel
      dragMomentum={true} // Enable momentum for more natural movement
      dragPropagation={false} // Prevent drag propagation to parent elements
      dragTransition={{ 
        bounceStiffness: 450, // Stiffer bounce for faster response
        bounceDamping: 20, // Less damping for more responsive bounce
        power: 0.1, // Lower power for smoother movement
        timeConstant: 120, // Lower time constant for faster response
        restDelta: 0.005, // Smaller rest delta for more precise stopping
        restSpeed: 0.005, // Smaller rest speed for more precise stopping
        modifyTarget: target => Math.abs(target) < 5 ? 0 : target, // Eliminate small movements
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
      <div className="h-[calc(100vh-170px)] shadow-xl rounded-xl overflow-hidden">
        <Card profile={profile} dragProgress={{ left: leftIndicatorOpacity, right: rightIndicatorOpacity }} />
      </div>
    </motion.div>
  );
};

export default CardStack;