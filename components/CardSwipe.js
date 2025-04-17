"use client";
import React, { useEffect, useRef, useState } from "react";
import Hammer from "hammerjs";
import styles from './CardSwipe.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTimes } from "@fortawesome/free-solid-svg-icons";

const CardSwipe = ({ profile, onSwipeLeft, onSwipeRight }) => {
  const cardRef = useRef(null);
  const [direction, setDirection] = useState(null);
  
  useEffect(() => {
    if (!cardRef.current) return;
    
    // Initialize Hammer on the card element
    const hammer = new Hammer(cardRef.current);
    
    // Only detect horizontal pan gestures
    hammer.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });
    
    // Handle pan movement
    hammer.on('pan', (e) => {
      const card = cardRef.current;
      if (!card) return;
      
      // Move the card horizontally based on pan distance
      const xPos = e.deltaX;
      const rotationDeg = xPos / 10; // Subtle rotation
      
      card.style.transform = `translateX(${xPos}px) rotate(${rotationDeg}deg)`;
      
      // Show appropriate indicator based on direction
      if (xPos > 50) {
        setDirection('right');
      } else if (xPos < -50) {
        setDirection('left');
      } else {
        setDirection(null);
      }
      
      // On pan end, decide if it's a swipe or return to center
      if (e.isFinal) {
        const threshold = card.offsetWidth / 3;
        
        if (xPos > threshold) {
          // Swipe right (like)
          completeSwipe('right');
        } else if (xPos < -threshold) {
          // Swipe left (dislike)
          completeSwipe('left');
        } else {
          // Return to center
          card.style.transform = 'translateX(0) rotate(0deg)';
          setDirection(null);
        }
      }
    });
    
    // Event listeners for manual button swipes
    const handleManualSwipeLeft = () => {
      handleSwipeLeft();
    };
    
    const handleManualSwipeRight = () => {
      handleSwipeRight();
    };
    
    // Add event listeners
    document.addEventListener('manual-swipe-left', handleManualSwipeLeft);
    document.addEventListener('manual-swipe-right', handleManualSwipeRight);
    
    return () => {
      // Clean up
      hammer.destroy();
      document.removeEventListener('manual-swipe-left', handleManualSwipeLeft);
      document.removeEventListener('manual-swipe-right', handleManualSwipeRight);
    };
  }, [onSwipeLeft, onSwipeRight]);
  
  const completeSwipe = (dir) => {
    const card = cardRef.current;
    if (!card) return;
    
    const endX = dir === 'right' ? window.innerWidth + 200 : -window.innerWidth - 200;
    card.style.transition = 'transform 0.5s ease';
    card.style.transform = `translateX(${endX}px) rotate(${dir === 'right' ? 45 : -45}deg)`;
    
    setTimeout(() => {
      if (dir === 'right' && onSwipeRight) {
        onSwipeRight(profile);
      } else if (dir === 'left' && onSwipeLeft) {
        onSwipeLeft(profile);
      }
    }, 300);
  };
  
  // Manual swipe functions for buttons
  const handleSwipeLeft = () => {
    setDirection('left');
    completeSwipe('left');
  };
  
  const handleSwipeRight = () => {
    setDirection('right');
    completeSwipe('right');
  };
  
  return (
    <div className="relative w-full h-full">
      <div 
        ref={cardRef} 
        className={styles.card}
      >
        <div className={styles.cardContent}>
          {/* Card image */}
          <img 
            src={profile?.imageUrl || "https://via.placeholder.com/400x600"} 
            alt={profile?.name || "Profile"} 
            className={styles.cardImage}
          />
          
          {/* Card info overlay */}
          <div className={styles.cardInfo}>
            <h2>{profile?.name || "Name"}, {profile?.age || "Age"}</h2>
            <p>{profile?.occupation || "Occupation"}{profile?.company ? ` at ${profile?.company}` : ''}</p>
            <p className="mt-2">{profile?.bio || "No bio available"}</p>
          </div>
          
          {/* Badge (if verified) */}
          {profile?.verified && (
            <div className={styles.cardBadge}>
              {profile.badge}
            </div>
          )}
        </div>
      </div>
      
      {/* Swipe indicators */}
      <div className={`${styles.swipeIndicator} ${styles.likeIndicator} ${direction === 'right' ? styles.visible : ''}`}>
        <FontAwesomeIcon icon={faHeart} />
      </div>
      <div className={`${styles.swipeIndicator} ${styles.dislikeIndicator} ${direction === 'left' ? styles.visible : ''}`}>
        <FontAwesomeIcon icon={faTimes} />
      </div>
    </div>
  );
};

export default CardSwipe;