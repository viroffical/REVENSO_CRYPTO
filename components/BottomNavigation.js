import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faMap, faCalendarCheck, faComments, faHandshake, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useState } from 'react';

const BottomNavigation = () => {
  const [activeTab, setActiveTab] = useState('people');
  
  const tabs = [
    { id: 'people', icon: faUsers, label: 'People' },
    { id: 'maps', icon: faMap, label: 'Maps' },
    { id: 'meetings', icon: faHandshake, label: 'Meetings' },
    { id: 'events', icon: faCalendarCheck, label: 'Events' },
    { id: 'chats', icon: faComments, label: 'Chats' },
  ];
  
  return (
    <nav className="sticky bottom-0 z-20 w-full bg-white shadow-lg border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => {
          return (
            <button
              key={tab.id}
              className="flex flex-col items-center justify-center flex-1 h-full relative"
              onClick={() => setActiveTab(tab.id)}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
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
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;