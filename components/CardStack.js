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
  const [forceRender, setForceRender] = useState(false); // Force re-render to ensure proper state updates
  
  // Motion values for card position and rotation with optimized defaults
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Make rotation more responsive with more direct values
  const rotate = useTransform(x, [-100, 0, 100], [-15, 0, 15]);
  
  // Transform x position to opacity for the indicators with more immediate feedback
  const leftIndicatorOpacity = useTransform(x, [-50, -5], [1, 0]);
  const rightIndicatorOpacity = useTransform(x, [5, 50], [0, 1]);
  
  // Touch handling state with optimized defaults
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchDelta, setTouchDelta] = useState({ x: 0, y: 0 });
  const velocityTracker = useRef({ 
    x: 0, 
    time: 0, 
    positions: [],
    lastDelta: 0,
    lastMove: 0
  });
  
  // Optimize animation by only rendering when card is visible
  useEffect(() => {
    if (!isTop) {
      // Reset position when card is not on top
      x.set(0);
      y.set(0);
    }
  }, [isTop, x, y]);
  
  // Performance optimization - use RAF for smoother motion
  const requestRef = useRef();
  const previousTimeRef = useRef();

  // Use RAF for smoother motion updates
  const animateCard = (time) => {
    if (previousTimeRef.current !== undefined) {
      // Only update if we're actively dragging
      if (isDragging && isTop) {
        const deltaX = velocityTracker.current.lastDelta;
        
        // Use motion values for smoother updates
        x.set(deltaX);
      }
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animateCard);
  };

  // Start/stop animation loop based on drag state
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateCard);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isDragging, isTop]);
  
  // Handle spring-back animation when releasing the card - optimized for mobile
  const resetCardPosition = () => {
    // Use more responsive springs for mobile
    animate(x, 0, {
      type: "spring",
      stiffness: 350,
      damping: 25,
      mass: 0.5, // Lower mass for more responsive feel
      velocity: 0
    });
  };
  
  // Optimized direct touch handler with less overhead
  const handleTouchStart = (e) => {
    if (!isTop) return;
    
    setIsDragging(true);
    const touch = e.touches[0];
    
    // Keep it simple for better performance
    const touchX = touch.clientX;
    const touchY = touch.clientY;
    
    setTouchStart({ x: touchX, y: touchY });
    
    // Reset velocity tracker
    velocityTracker.current = { 
      x: touchX, 
      time: Date.now(), 
      positions: [{ x: touchX, time: Date.now() }],
      lastDelta: 0,
      lastMove: Date.now()
    };
    
    // Prevent default behaviors and propagation
    e.preventDefault();
    e.stopPropagation();
  };
  
  // Optimized touch move with minimal processing
  const handleTouchMove = (e) => {
    if (!isTop || !isDragging) return;
    
    const touch = e.touches[0];
    const touchX = touch.clientX;
    const currentTime = Date.now();
    
    // Calculate delta from original touch
    const deltaX = touchX - touchStart.x;
    
    // Don't track every single tiny movement (optimized)
    if (currentTime - velocityTracker.current.lastMove > 16) { // ~60fps
      // Track positions for velocity calculation - limit data points
      velocityTracker.current.positions.push({
        x: touchX,
        time: currentTime
      });
      
      // Only keep recent positions for better performance
      while (velocityTracker.current.positions.length > 3) {
        velocityTracker.current.positions.shift();
      }
      
      velocityTracker.current.lastMove = currentTime;
    }
    
    // Store last delta for RAF updates
    velocityTracker.current.lastDelta = deltaX;
    
    // Update with RequestAnimationFrame handled in the animate loop
    // This improves performance by batching updates
    
    // Update state less frequently - improves performance
    // We're using RAF for visual updates instead
    setTouchDelta({ x: deltaX, y: touch.clientY - touchStart.y });
    
    // Prevent default to avoid scroll interference
    e.preventDefault();
    e.stopPropagation();
  };
  
  // Optimized touch end handling
  const handleTouchEnd = (e) => {
    if (!isTop || !isDragging) return;
    
    setIsDragging(false);
    
    // Calculate velocity based on the stored positions
    const positions = velocityTracker.current.positions;
    let velocity = 0;
    
    if (positions.length >= 2) {
      // Calculate velocity with most recent positions for better responsiveness
      const first = positions[0];
      const last = positions[positions.length - 1];
      const deltaTime = last.time - first.time;
      
      // Avoid division by zero and ensure we have valid time difference
      if (deltaTime > 5) {
        velocity = (last.x - first.x) / deltaTime; // pixels per ms
      }
    }
    
    // Faster velocity multiplier for more sensitive swipes on mobile
    velocity = velocity * 1200; // Increase multiplier for mobile
    
    const deltaX = touchDelta.x;
    // Lower thresholds for mobile
    const swipeThreshold = 30; // Even lower for mobile
    const swipeVelocityThreshold = 0.3; // Lower for more sensitive swipes
    
    // More sensitive swipe detection for mobile
    if (velocity > swipeVelocityThreshold || (deltaX > swipeThreshold)) {
      onSwipe('right');
    } else if (velocity < -swipeVelocityThreshold || (deltaX < -swipeThreshold)) {
      onSwipe('left');
    } else {
      // Reset position with optimized spring animation
      resetCardPosition();
    }
    
    // Reset tracking
    setTouchDelta({ x: 0, y: 0 });
    velocityTracker.current = { 
      x: 0, 
      time: 0, 
      positions: [],
      lastDelta: 0,
      lastMove: 0
    };
    
    // Cancel events
    e.preventDefault();
    e.stopPropagation();
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
      x: direction === 'left' ? -1200 : direction === 'right' ? 1200 : 0, // Fixed values to avoid SSR issues
      opacity: 1,
      rotate: direction === 'left' ? -30 : direction === 'right' ? 30 : 0,
      transition: { 
        duration: 0.15, // Faster exit for more responsive feel
        ease: [0.1, 0.6, 0.1, 1], // Optimized ease curve specifically for mobile
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