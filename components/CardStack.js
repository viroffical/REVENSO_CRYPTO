"use client";
import React, { useState, useEffect } from "react";
import CardSwipe from "./CardSwipe";
import SwipeButtons from "./SwipeButtons";
import { profiles } from "../data/profiles";

const CardStack = () => {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [lastDirection, setLastDirection] = useState(null);
  const [availableProfiles, setAvailableProfiles] = useState([]);
  const [matchedProfiles, setMatchedProfiles] = useState([]);
  
  // Initialize with profiles data
  useEffect(() => {
    setAvailableProfiles([...profiles]);
  }, []);
  
  const currentProfile = availableProfiles[currentProfileIndex];
  
  const handleSwipeLeft = (profile) => {
    setLastDirection('left');
    advanceToNextProfile();
  };
  
  const handleSwipeRight = (profile) => {
    // When swiping right, add to matched profiles
    setMatchedProfiles(prev => [...prev, profile]);
    setLastDirection('right');
    advanceToNextProfile();
  };
  
  const advanceToNextProfile = () => {
    // Wait briefly to let the animation complete
    setTimeout(() => {
      if (currentProfileIndex < availableProfiles.length - 1) {
        setCurrentProfileIndex(prevIndex => prevIndex + 1);
      } else {
        // Reset or show empty state when all profiles are viewed
        // For demo purposes, we'll reset
        setCurrentProfileIndex(0);
      }
      setLastDirection(null);
    }, 300);
  };
  
  // Manual swipe button handlers
  const handleButtonSwipeLeft = () => {
    document.dispatchEvent(new CustomEvent('manual-swipe-left'));
  };
  
  const handleButtonSwipeRight = () => {
    document.dispatchEvent(new CustomEvent('manual-swipe-right'));
  };
  
  return (
    <div className="relative h-full flex flex-col">
      {/* Card container takes majority of space */}
      <div className="flex-1 relative overflow-hidden">
        {availableProfiles.length > 0 ? (
          <div className="absolute inset-0 p-4">
            {/* Only render current card for performance */}
            <CardSwipe
              key={currentProfile?.id || currentProfileIndex}
              profile={currentProfile}
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full p-4">
            <div className="text-center text-gray-500">
              <h3 className="text-xl font-semibold mb-2">No more profiles</h3>
              <p>Check back later for more matches!</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Bottom action buttons */}
      <div className="p-4 pt-2">
        <SwipeButtons
          onSwipeLeft={handleButtonSwipeLeft}
          onSwipeRight={handleButtonSwipeRight}
        />
      </div>
    </div>
  );
};

export default CardStack;