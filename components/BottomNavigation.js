import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faMap, faCalendarCheck, faComments, faHandshake } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef } from 'react';

const BottomNavigation = ({ activeTab, setActiveTab }) => {
  const navRef = useRef(null);
  
  const tabs = [
    { id: 'people', icon: faUsers, label: 'People' },
    { id: 'maps', icon: faMap, label: 'Maps' },
    { id: 'meetings', icon: faHandshake, label: 'Meetings' },
    { id: 'events', icon: faCalendarCheck, label: 'Events' },
    { id: 'chats', icon: faComments, label: 'Chats' },
  ];
  
  // Ensure bottom nav has higher stacking order than all other elements
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Force repaint to ensure visibility on mobile
      if (navRef.current) {
        const nav = navRef.current;
        nav.style.display = 'none';
        setTimeout(() => {
          nav.style.display = 'block';
        }, 10);
      }
    }
  }, []);
  
  return (
    <div 
      ref={navRef}
      className="fixed bottom-0 left-0 right-0 z-[9999] bg-white shadow-xl border-t border-gray-200"
      style={{ 
        maxWidth: '28rem', 
        margin: '0 auto',
        WebkitTransform: 'translateZ(0)', // Force hardware acceleration
        transform: 'translateZ(0)'
      }}
    >
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className="flex flex-col items-center justify-center flex-1 h-full relative touch-manipulation py-2 active:bg-gray-100"
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
      
      {/* Safe area inset for notched devices */}
      <div className="h-[env(safe-area-inset-bottom)] bg-white"></div>
    </div>
  );
};

export default BottomNavigation;