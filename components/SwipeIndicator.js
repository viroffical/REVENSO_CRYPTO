import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faHeart } from '@fortawesome/free-solid-svg-icons';

const SwipeIndicator = ({ direction, isVisible }) => {
  const variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  };

  if (direction === 'left') {
    return (
      <motion.div 
        className="absolute left-6 z-20"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={variants}
      >
        <div className="bg-white rounded-full p-3 border-2 border-red-500 transform -rotate-12">
          <FontAwesomeIcon icon={faXmark} className="h-8 w-8 text-red-500" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="absolute right-6 z-20"
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants}
    >
      <div className="bg-white rounded-full p-3 border-2 border-green-500 transform rotate-12">
        <FontAwesomeIcon icon={faHeart} className="h-8 w-8 text-green-500" />
      </div>
    </motion.div>
  );
};

export default SwipeIndicator;