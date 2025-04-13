import { motion, useMotionValue, useTransform } from 'framer-motion';

const Card = ({ profile, onSwipe, index, active }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Calculate rotation based on drag distance
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  
  // Calculate opacity for the like/dislike indicators
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const dislikeOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleDragEnd = (event, info) => {
    const dragDistance = info.offset.x;
    
    if (dragDistance > 100) {
      onSwipe('right', profile.id);
    } else if (dragDistance < -100) {
      onSwipe('left', profile.id);
    }
  };

  if (!active) return null;

  return (
    <motion.div 
      className="card-container"
      style={{ 
        x, 
        y, 
        rotate,
        position: 'absolute',
        zIndex: index
      }}
      drag={active}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 1.05 }}
    >
      <div className="card">
        <div 
          className="card-image" 
          style={{ backgroundImage: `url(${profile.image})` }}
        >
          {/* Bumble-style badge */}
          <div className="bumble-badge">
            <span>{profile.badge}</span>
          </div>

          {/* Like indicator */}
          <motion.div className="like-indicator" style={{ opacity: likeOpacity }}>
            <div className="like-indicator-content">
              <i className="fas fa-heart"></i>
            </div>
          </motion.div>
          
          {/* Dislike indicator */}
          <motion.div className="dislike-indicator" style={{ opacity: dislikeOpacity }}>
            <div className="dislike-indicator-content">
              <i className="fas fa-times"></i>
            </div>
          </motion.div>
          
          {/* Card content overlay */}
          <div className="card-content-overlay">
            <div className="user-info">
              <h2 className="user-name">{profile.name} {profile.verified && 
                <i className="fas fa-check-circle text-blue-400 ml-1"></i>}
              </h2>
              <div className="user-occupation">
                <i className="fas fa-briefcase mr-2"></i>
                <span>{profile.occupation}</span>
              </div>
              <p className="user-bio">{profile.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;