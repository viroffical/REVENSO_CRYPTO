// Add passive touch event listeners for mobile performance
document.addEventListener('DOMContentLoaded', function() {
  // Add passive listeners to improve touch performance
  const supportsPassive = (() => {
    let passive = false;
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get: function() { passive = true; return true; }
      });
      window.addEventListener('test', null, opts);
      window.removeEventListener('test', null, opts);
    } catch (e) {}
    return passive;
  })();

  const touchOptions = supportsPassive ? { passive: false } : false;
  
  // Apply touch listeners to all card elements once they're in the DOM
  function applyTouchListeners() {
    const cards = document.querySelectorAll('.card-stack *');
    cards.forEach(card => {
      card.addEventListener('touchstart', function(e) {
        // Allow vertical scrolling but prevent horizontal scrolling interference
        if (Math.abs(e.touches[0].clientX) > 10) {
          e.preventDefault();
        }
      }, touchOptions);
    });
  }
  
  // Apply listeners initially
  applyTouchListeners();
  
  // And periodically to catch any new elements
  setInterval(applyTouchListeners, 2000);
});
