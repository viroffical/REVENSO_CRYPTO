const SwipeButtons = ({ onSwipeLeft, onSwipeRight, onUndo, canUndo }) => {
  return (
    <div className="swipe-buttons">
      <button 
        onClick={onSwipeLeft}
        className="swipe-button dislike-button"
        aria-label="Dislike"
      >
        <i className="fas fa-times"></i>
      </button>
      
      {canUndo && (
        <button 
          onClick={onUndo}
          className="swipe-button undo-button"
          aria-label="Undo"
        >
          <i className="fas fa-undo"></i>
        </button>
      )}
      
      <button 
        onClick={onSwipeRight}
        className="swipe-button like-button"
        aria-label="Like"
      >
        <i className="fas fa-heart"></i>
      </button>
    </div>
  );
};

export default SwipeButtons;