import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo, faXmark, faStar, faHeart, faBolt } from '@fortawesome/free-solid-svg-icons';

const SwipeButtons = ({ onSwipeLeft, onSwipeRight, onUndo, canUndo }) => {
  return (
    <div className="flex justify-center items-center space-x-3 sm:space-x-6 py-4 bg-white px-2 shadow-inner">
      {/* Undo Button */}
      <button 
        className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 ${canUndo ? 'border-gray-300 text-gray-400' : 'border-gray-200 text-gray-300'} bg-white shadow active:shadow-sm touch-manipulation`}
        onClick={onUndo} 
        disabled={!canUndo}
        aria-label="Undo last swipe"
      >
        <FontAwesomeIcon icon={faUndo} className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
      
      {/* Dislike Button */}
      <button 
        className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border-2 border-red-500 text-red-500 shadow-md active:shadow-sm active:scale-95 transition-transform touch-manipulation"
        onClick={onSwipeLeft}
        aria-label="Dislike profile"
      >
        <FontAwesomeIcon icon={faXmark} className="h-7 w-7 sm:h-8 sm:w-8" />
      </button>
      
      {/* Super Like Button */}
      <button 
        className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white border-2 border-blue-500 text-blue-500 shadow active:shadow-sm touch-manipulation"
        onClick={() => {}}
        aria-label="Super like profile"
      >
        <FontAwesomeIcon icon={faStar} className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
      
      {/* Like Button */}
      <button 
        className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border-2 border-green-500 text-green-500 shadow-md active:shadow-sm active:scale-95 transition-transform touch-manipulation"
        onClick={onSwipeRight}
        aria-label="Like profile"
      >
        <FontAwesomeIcon icon={faHeart} className="h-7 w-7 sm:h-8 sm:w-8" />
      </button>
      
      {/* Boost Button */}
      <button 
        className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white border-2 border-purple-500 text-purple-500 shadow active:shadow-sm touch-manipulation"
        onClick={() => {}}
        aria-label="Boost profile"
      >
        <FontAwesomeIcon icon={faBolt} className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
    </div>
  );
};

export default SwipeButtons;