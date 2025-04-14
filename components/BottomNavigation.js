import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faMap, faCalendarCheck, faComments, faHandshake } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';

const BottomNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'people', icon: faUsers, label: 'People' },
    { id: 'maps', icon: faMap, label: 'Maps' },
    { id: 'meetings', icon: faHandshake, label: 'Meetings' },
    { id: 'events', icon: faCalendarCheck, label: 'Events' },
    { id: 'chats', icon: faComments, label: 'Chats' },
  ];
  
  // Add a specific CSS class for the body to handle the bottom navigation
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.classList.add('has-bottom-nav');
      
      return () => {
        document.body.classList.remove('has-bottom-nav');
      };
    }
  }, []);
  
  return (
    <>
      {/* This is the actual navigation bar */}
      <div 
        className="nav-container fixed bottom-0 left-0 right-0 w-full bg-white border-t border-gray-200 shadow-lg"
        style={{
          zIndex: 999999, // extremely high z-index
          height: '72px', // Increased height
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%',
          paddingBottom: 'env(safe-area-inset-bottom, 8px)' // Safe area for notched phones
        }}
      >
        <div className="flex justify-around items-center h-full max-w-md mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className="flex flex-col items-center justify-center flex-1 h-full relative touch-manipulation py-2"
              onClick={() => setActiveTab(tab.id)}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute top-0 w-full h-1 bg-yellow-500"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <div className={`flex flex-col items-center ${activeTab === tab.id ? 'text-black' : 'text-gray-500'}`}>
                <FontAwesomeIcon 
                  icon={tab.icon}
                  className={`h-5 w-5 ${activeTab === tab.id ? 'text-yellow-500' : 'text-gray-400'}`} 
                />
                <span className={`text-xs mt-1 ${activeTab === tab.id ? 'font-medium' : ''}`}>{tab.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* This adds padding at the bottom of the page to ensure content isn't hidden behind nav */}
      <div className="h-16"></div>
    </>
  );
};

export default BottomNavigation;