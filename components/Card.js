import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faXmark, faHeart, faCheckCircle, faBriefcase, faCircle, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';

const Card = ({ profile, dragProgress }) => {
  return (
    <div className="relative w-full h-full bg-white rounded-3xl overflow-hidden">
      <div className="relative h-full">
        {/* Tag on top (e.g., "bizz") */}
        {profile.badge && (
          <div className="absolute top-5 left-5 z-10">
            <div className="bg-orange-500 text-white px-4 py-1 rounded-full font-medium text-sm">
              {profile.badge}
            </div>
          </div>
        )}
        
        {/* Profile Image */}
        <div className="w-full h-full bg-white">
          <img
            src={profile.imageUrl || profile.image}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Swipe indicators overlaid on image */}
        {dragProgress && (
          <>
            <motion.div 
              className="absolute top-1/3 left-6 bg-white rounded-full p-3 border-2 border-red-500 transform -rotate-12"
              style={{ opacity: dragProgress.left, scale: dragProgress.left }}
            >
              <FontAwesomeIcon icon={faXmark} className="h-8 w-8 text-red-500" />
            </motion.div>
            
            <motion.div 
              className="absolute top-1/3 right-6 bg-white rounded-full p-3 border-2 border-green-500 transform rotate-12"
              style={{ opacity: dragProgress.right, scale: dragProgress.right }}
            >
              <FontAwesomeIcon icon={faHeart} className="h-8 w-8 text-green-500" />
            </motion.div>
          </>
        )}
        
        {/* Profile Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white">
          <div className="flex items-center mb-0.5">
            <h2 className="text-2xl font-bold mr-2">{profile.name}</h2>
            {profile.verified && (
              <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-white" />
            )}
          </div>
          
          {/* Job & Company */}
          <div className="flex items-center mb-1">
            <FontAwesomeIcon icon={faBriefcase} className="h-5 w-5 mr-2" />
            <p className="text-base font-medium">
              {profile.occupation} {profile.company && `at ${profile.company}`}
            </p>
          </div>
          
          {/* Bio */}
          <p className="text-base text-gray-100 mb-2">{profile.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;