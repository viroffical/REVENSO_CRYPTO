import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faXmark, faHeart, faCheckCircle, faBriefcase, faCircle, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from 'react';

const Card = ({ profile, dragProgress }) => {
  const [userProfile, setUserProfile] = useState(null);
  
  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem('revenso_user');
      if (storedProfile) {
        setUserProfile(JSON.parse(storedProfile));
      }
    } catch (error) {
      console.error('Error parsing user profile:', error);
    }
  }, []);
  
  // If user profile hasn't loaded yet, show a loading state
  if (!userProfile) {
    return (
      <div className="relative w-full h-full bg-white rounded-3xl flex items-center justify-center">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }
  
  console.log(userProfile, 'userProfile');
  
  return (
    <div 
      className="relative w-full h-full bg-white rounded-3xl overflow-y-auto scrollbar-hide overscroll-y-contain will-change-scroll"
      style={{
        WebkitOverflowScrolling: 'touch',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        overscrollBehavior: 'contain',
        touchAction: 'pan-y', // Only allow vertical touch actions
        WebkitTouchCallout: 'none', // Prevent callouts
        WebkitUserSelect: 'none', // Prevent selection
        userSelect: 'none',
      }}
    >
      <div className="relative h-[120%] min-h-[90%]">
        
        {/* Profile Image */}
        <div className="w-full h-full bg-white flex-grow will-change-transform">
          <img
            src={userProfile.image_url}
            alt={userProfile.full_name}
            className="w-full h-full object-cover object-center will-change-transform"
            style={{ 
              minHeight: "calc(100vh - 120px)",
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
            }}
            loading="eager"
            draggable="false"
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
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/75 to-transparent text-white">
          <div className="flex items-center mb-1">
            <h2 className="text-xl font-bold mr-2 drop-shadow-md">{userProfile.full_name}</h2>
            <FontAwesomeIcon 
              icon={faXTwitter} 
              style={{
                height:'1.2rem', 
                color: 'white', 
                fontWeight: 'bolder', 
                cursor: "pointer",
                filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5))'
              }} 
            />
          </div>
          
          {/* Job & Company */}
          <div className="flex items-center mb-1">
            <FontAwesomeIcon 
              icon={faBriefcase} 
              className="h-4 w-4 mr-2" 
              style={{filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5))'}}
            />
            <p className="text-sm font-medium drop-shadow-md">
              {userProfile.profile?.role || 'Developer'} {userProfile.profile?.project ? `at ${userProfile.profile.project}` : ''}
            </p>
          </div>
          
          {/* Bio */}
          <p className="text-sm text-white mb-2 drop-shadow-md">
            {userProfile.profile?.description ? `Looking to meet ${userProfile.profile.description}` : 'Looking to meet developers and designers'}
          </p>
          
          {/* Attending Section */}
          <div>
            <h3 className="text-sm font-bold drop-shadow-md">Attending</h3>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-teal-500 text-white rounded-full w-3 h-3 mr-2 shadow-sm"></div>
                <span className="font-medium drop-shadow-md">
                  {userProfile.profile?.event_attending || 'TOKEN 2049'}
                </span>
              </div>
              <button className="p-2">
                <FontAwesomeIcon 
                  icon={faCommentDots} 
                  style={{
                    height:'1.3rem', 
                    color: 'white',
                    filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5))'
                  }} 
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Profile Content */}
      <div className="p-5 bg-white pt-6 pb-20">
        <h3 className="text-xl font-bold mb-3">About {profile.name}</h3>
        <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel sapien ut massa sagittis fringilla. Nullam fringilla, justo eget fermentum volutpat, nibh metus scelerisque dolor, sed fermentum nibh nibh vitae nisi.</p>
        
        <h3 className="text-xl font-bold mb-3">Interests</h3>
        <div className="flex flex-wrap gap-2 mb-5">
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Travel</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Photography</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Food</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Movies</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Music</span>
        </div>
        
        {/* Events Section */}
        {profile.events && profile.events.length > 0 && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Events Attending</h3>
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 text-white text-sm font-medium">
                <FontAwesomeIcon icon={faCalendar} className="h-4 w-4" />
                <span>Date</span>
              </button>
            </div>
            
            <div className="overflow-x-auto -mx-5 px-5 hide-scrollbar">
              <div className="flex space-x-4 pb-2">
                {profile.events.map(event => (
                  <a 
                    key={event.id} 
                    href={event.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block flex-shrink-0 w-64 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-200 bg-white border border-gray-100"
                  >
                    <div className="h-32 w-full">
                      <img src={event.image} alt={event.event_name} className="h-full w-full object-cover" />
                    </div>
                    <div className="p-3">
                      <h4 className="font-semibold text-base mb-1 overflow-hidden text-ellipsis whitespace-nowrap">{event.event_name}</h4>
                      <div className="flex items-center text-gray-500 text-sm">
                        <FontAwesomeIcon icon={faCalendar} className="h-4 w-4 mr-1" />
                        <span>{event.date}, {event.start_time}</span>
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{event.category}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          event.status === 'Going' ? 'bg-green-100 text-green-800' : 
                          event.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-blue-100 text-blue-800'
                        }`}>{event.status}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
        
        <h3 className="text-xl font-bold mb-3">More information</h3>
        <p className="mb-5">Donec pretium purus eget urna tincidunt, at commodo sem vestibulum. Sed mattis nibh vel tristique faucibus. Cras a velit vitae massa varius tincidunt. Aliquam erat volutpat. Curabitur rhoncus nibh sed magna feugiat cursus.</p>
        
        <p className="mb-4">Duis fermentum nulla quis ante faucibus, sit amet iaculis arcu volutpat. Phasellus dui arcu, interdum in metus at, finibus vestibulum massa. Suspendisse potenti. Morbi vel fermentum felis.</p>
        
        <h3 className="text-xl font-bold mb-3">Additional Information</h3>
        <p className="mb-5">Mauris auctor neque a nibh posuere, ut aliquam magna pulvinar. Suspendisse malesuada libero ac eros ultrices, in vehicula libero condimentum. Sed tincidunt eros at mi molestie, ac aliquam massa consequat.</p>
      </div>
    </div>
  );
};

export default Card;