import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo, faXmark, faStar, faHeart, faBolt } from '@fortawesome/free-solid-svg-icons';

const SwipeButtons = ({ onSwipeLeft, onSwipeRight, onUndo, canUndo }) => {
  return (
    <div className="flex justify-center items-center space-x-4 py-4 bg-white">
      <button 
        className={`flex items-center justify-center w-12 h-12 rounded-full border ${canUndo ? 'border-yellow-500 text-yellow-500' : 'border-gray-300 text-gray-300'} hover:bg-gray-50`}
        onClick={onUndo} 
        disabled={!canUndo}
        aria-label="Undo last swipe"
      >
        <FontAwesomeIcon icon={faUndo} className="h-5 w-5" />
      </button>
      
      <button 
        className="flex items-center justify-center w-16 h-16 rounded-full bg-white border border-red-500 text-red-500 hover:bg-red-50"
        onClick={onSwipeLeft}
        aria-label="Dislike profile"
      >
        <FontAwesomeIcon icon={faXmark} className="h-7 w-7" />
      </button>
      
      <button 
        className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-blue-500 text-blue-500 hover:bg-blue-50"
        onClick={() => {}}
        aria-label="Super like profile"
      >
        <FontAwesomeIcon icon={faStar} className="h-5 w-5" />
      </button>
      
      <button 
        className="flex items-center justify-center w-16 h-16 rounded-full bg-white border border-green-500 text-green-500 hover:bg-green-50"
        onClick={onSwipeRight}
        aria-label="Like profile"
      >
        <FontAwesomeIcon icon={faHeart} className="h-7 w-7" />
      </button>
      
      <button 
        className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-purple-500 text-purple-500 hover:bg-purple-50"
        onClick={() => {}}
        aria-label="Boost profile"
      >
        <FontAwesomeIcon icon={faBolt} className="h-5 w-5" />
      </button>
    </div>
  );
};

export default SwipeButtons;