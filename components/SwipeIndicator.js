import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faHeart } from '@fortawesome/free-solid-svg-icons';

const SwipeIndicator = ({ direction, isVisible }) => {
  const isLeft = direction === 'left';
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      className={`absolute ${isLeft ? 'left-10' : 'right-10'} top-1/3 pointer-events-none`}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
      transition={{ duration: 0.2 }}
    >
      <div 
        className={`rounded-full p-5 flex items-center justify-center
        ${isLeft ? 'bg-red-500' : 'bg-green-500'} shadow-lg`}
      >
        {isLeft ? (
          <FontAwesomeIcon icon={faXmark} className="h-10 w-10 text-white" />
        ) : (
          <FontAwesomeIcon icon={faHeart} className="h-10 w-10 text-white" />
        )}
      </div>
    </motion.div>
  );
};

export default SwipeIndicator;