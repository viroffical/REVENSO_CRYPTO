import { useState, useEffect } from 'react';
import Card from './Card';
import SwipeButtons from './SwipeButtons';

const CardStack = ({ profiles }) => {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [lastDirection, setLastDirection] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [swipedProfiles, setSwipedProfiles] = useState([]);

  const handleSwipe = (direction, profileId) => {
    // Don't process swipe if already at the end
    if (currentProfileIndex >= profiles.length - 1) return;
    
    // Set the direction for feedback animation
    setLastDirection(direction);
    setShowFeedback(true);
    
    // Add the swiped profile to our history
    setSwipedProfiles([...swipedProfiles, { id: profileId, direction }]);
    
    // Wait for animation to complete before moving to next card
    setTimeout(() => {
      setCurrentProfileIndex(currentProfileIndex + 1);
      setShowFeedback(false);
    }, 300);
  };

  // Handle button clicks for swipe actions
  const handleButtonSwipe = (direction) => {
    if (currentProfileIndex < profiles.length) {
      handleSwipe(direction, profiles[currentProfileIndex].id);
    }
  };

  // Reset the stack if we've gone through all profiles
  useEffect(() => {
    if (currentProfileIndex >= profiles.length) {
      setTimeout(() => {
        setCurrentProfileIndex(0);
        setSwipedProfiles([]);
      }, 1000);
    }
  }, [currentProfileIndex, profiles.length]);

  const restoreLastSwipedProfile = () => {
    if (swipedProfiles.length > 0 && currentProfileIndex > 0) {
      // Remove the last swiped profile from history
      setSwipedProfiles(swipedProfiles.slice(0, -1));
      // Go back to the previous profile
      setCurrentProfileIndex(currentProfileIndex - 1);
    }
  };

  return (
    <div className="card-stack">
      <div className="cards-container">
        {/* Render a few cards ahead for better performance */}
        {profiles.slice(currentProfileIndex, currentProfileIndex + 3).map((profile, index) => (
          <Card 
            key={profile.id}
            profile={profile}
            onSwipe={handleSwipe}
            index={profiles.length - index}
            active={index === 0}
          />
        ))}
        
        {/* Feedback animation */}
        {showFeedback && (
          <div className={`swipe-feedback ${lastDirection === 'right' ? 'right' : 'left'}`}>
            {lastDirection === 'right' ? (
              <i className="fas fa-heart text-5xl text-pink-500"></i>
            ) : (
              <i className="fas fa-times text-5xl text-red-500"></i>
            )}
          </div>
        )}
        
        {/* Empty state when all cards are swiped */}
        {currentProfileIndex >= profiles.length && (
          <div className="empty-state">
            <h2 className="text-2xl mb-4">No more profiles</h2>
            <p className="mb-4">You've seen everyone for now</p>
            <button 
              className="bg-purple-600 text-white px-4 py-2 rounded-full"
              onClick={() => setCurrentProfileIndex(0)}
            >
              Start Over
            </button>
          </div>
        )}
      </div>
      
      <SwipeButtons 
        onSwipeLeft={() => handleButtonSwipe('left')}
        onSwipeRight={() => handleButtonSwipe('right')}
        onUndo={restoreLastSwipedProfile}
        canUndo={swipedProfiles.length > 0}
      />
    </div>
  );
};

export default CardStack;