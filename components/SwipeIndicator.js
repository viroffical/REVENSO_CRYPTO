import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faHeart } from '@fortawesome/free-solid-svg-icons';

const SwipeIndicator = ({ direction, isVisible }) => {
  const isLeft = direction === 'left';
  
  // Enhanced animation variants with scale for better visibility
  const containerVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      x: isLeft ? -20 : 20, 
    },
    visible: { 
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
        duration: 0.4
      }
    },
  };

  // Pulse animation for the icon
  const iconVariants = {
    visible: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <motion.div
      className={`absolute ${isLeft ? 'left-8' : 'right-8'} top-1/4 pointer-events-none z-50`}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.div 
        className={`rounded-full p-6 flex items-center justify-center
        ${isLeft ? 'bg-red-500' : 'bg-green-500'} shadow-xl`}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <motion.div
          variants={iconVariants}
          animate="visible"
        >
          {isLeft ? (
            <FontAwesomeIcon icon={faXmark} className="h-12 w-12 text-white drop-shadow-md" />
          ) : (
            <FontAwesomeIcon icon={faHeart} className="h-12 w-12 text-white drop-shadow-md" />
          )}
        </motion.div>
      </motion.div>
      
      {/* Text label for clearer indication */}
      <motion.div 
        className="text-center mt-2 font-bold text-white text-lg drop-shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {isLeft ? 'NOPE' : 'LIKE'}
      </motion.div>
    </motion.div>
  );
};

export default SwipeIndicator;