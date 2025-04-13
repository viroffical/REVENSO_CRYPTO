import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faList, 
  faBookmark, 
  faBolt, 
  faGear, 
  faQuestionCircle,
  faTimes,
  faMoon,
  faGaugeHigh,
  faUserPlus,
  faGears,
  faHeadset
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const SideDrawer = ({ isOpen, onClose, userProfile }) => {
  const drawerVariants = {
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: '-100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  };

  const overlayVariants = {
    open: {
      opacity: 0.5,
      display: 'block'
    },
    closed: {
      opacity: 0,
      transitionEnd: {
        display: 'none'
      }
    }
  };

  // Default profile if none provided
  const profile = userProfile || {
    name: 'Your Name',
    username: '@username',
    following: 196,
    followers: 1176,
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
  };

  return (
    <>
      {/* Overlay to close drawer when clicking outside */}
      <motion.div
        className="fixed inset-0 bg-black z-30"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={overlayVariants}
        onClick={onClose}
      />

      {/* Drawer sidebar */}
      <motion.div 
        className="fixed top-0 left-0 h-full w-4/5 max-w-xs bg-white z-40 flex flex-col shadow-xl"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={drawerVariants}
      >
        {/* Close button for mobile */}
        <button 
          className="absolute top-2 right-2 p-2 block md:hidden" 
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faTimes} className="text-gray-600" />
        </button>

        {/* Profile section */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center mb-2">
            <img 
              src={profile.avatarUrl} 
              alt={profile.name} 
              className="w-12 h-12 rounded-full mr-3" 
            />
            <div className="flex-1">
              <h3 className="font-bold text-lg">{profile.name}</h3>
              <p className="text-sm text-gray-500">{profile.username}</p>
            </div>
            <button className="text-gray-400 p-1">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="5" cy="12" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="19" cy="12" r="2" />
              </svg>
            </button>
          </div>
          <div className="flex text-sm mt-2">
            <div className="mr-4">
              <span className="font-bold">{profile.following}</span> Following
            </div>
            <div>
              <span className="font-bold">{profile.followers}</span> Followers
            </div>
          </div>
        </div>

        {/* Navigation menu */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="py-2">
            <li>
              <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-100">
                <FontAwesomeIcon icon={faUser} className="text-gray-700 w-5 h-5 mr-3" />
                <span className="font-medium">Profile</span>
              </a>
            </li>
            <li>
              <button 
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('setActiveTab', { detail: 'dashboard' }));
                  onClose();
                }} 
                className="flex items-center w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors"
              >
                <FontAwesomeIcon icon={faGaugeHigh} className="text-gray-700 w-5 h-5 mr-3" />
                <span className="font-medium">Dashboard</span>
              </button>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-100">
                <FontAwesomeIcon icon={faUserPlus} className="text-gray-700 w-5 h-5 mr-3" />
                <span className="font-medium">Invite a friend</span>
              </a>
            </li>
          </ul>
          
          <div className="border-t border-gray-200 mt-2 pt-2">
            <ul>
              <li>
                <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-100">
                  <FontAwesomeIcon icon={faGears} className="text-gray-700 w-5 h-5 mr-3" />
                  <span className="font-medium">Settings and privacy</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-100">
                  <FontAwesomeIcon icon={faHeadset} className="text-gray-700 w-5 h-5 mr-3" />
                  <span className="font-medium">Help Center</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 flex justify-between items-center">
          <button className="p-2 text-blue-400">
            <FontAwesomeIcon icon={faMoon} />
          </button>
          <div className="text-blue-400">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
            </svg>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SideDrawer;