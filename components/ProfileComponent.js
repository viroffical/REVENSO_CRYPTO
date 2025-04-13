import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEdit, 
  faCrown, 
  faChevronRight, 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt, 
  faArrowRightFromBracket,
  faStar,
  faShield,
  faGem
} from '@fortawesome/free-solid-svg-icons';

const ProfileComponent = ({ userProfile }) => {
  const [activeTab, setActiveTab] = useState('info');
  
  // Default user profile if none provided
  const profile = userProfile || {
    name: 'Alex Johnson',
    username: '@alexj',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    address: 'San Francisco, CA',
    isPremium: true,
    role: 'Gold Member',
    profileImgUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
  };

  const tabVariants = {
    active: {
      borderBottomColor: "#60a5fa",
      color: "#2563eb",
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 30
      }
    },
    inactive: {
      borderBottomColor: "transparent",
      color: "#4b5563",
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 30
      }
    }
  };

  return (
    <div className="flex flex-col h-full overflow-auto bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 text-white">
      {/* Glass Header */}
      <div className="relative backdrop-blur-lg bg-white/10 p-8 rounded-b-3xl shadow-lg">
        <div className="flex flex-col items-center">
          {/* Profile Image with Premium Badge */}
          <div className="relative">
            <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-indigo-300 shadow-inner">
              <img 
                src={profile.profileImgUrl} 
                alt={profile.name} 
                className="h-full w-full object-cover"
              />
            </div>
            
            {profile.isPremium && (
              <motion.div 
                className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-yellow-600 p-1.5 rounded-full shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
              >
                <FontAwesomeIcon icon={faCrown} className="text-white text-sm" />
              </motion.div>
            )}
          </div>
          
          {/* Name and Username */}
          <h1 className="mt-4 text-2xl font-bold">{profile.name}</h1>
          <p className="text-indigo-300">{profile.username}</p>
          
          {/* Role/Status Badge */}
          <div className="mt-3 bg-indigo-500/20 backdrop-blur-sm px-3 py-1 rounded-full inline-flex items-center">
            <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-2 text-xs" />
            <span className="text-sm font-medium">{profile.role}</span>
          </div>

          {/* Quick Stats */}
          <div className="w-full flex justify-center mt-6 space-x-6">
            <div className="text-center">
              <p className="text-xl font-bold">248</p>
              <p className="text-xs text-indigo-300">Connections</p>
            </div>
            <div className="text-center border-l border-r border-indigo-500/30 px-6">
              <p className="text-xl font-bold">35</p>
              <p className="text-xs text-indigo-300">Events</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">12</p>
              <p className="text-xs text-indigo-300">Meetings</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs Navigation */}
      <div className="flex border-b border-indigo-500/20 mx-4 mt-6">
        <motion.button
          variants={tabVariants}
          animate={activeTab === 'info' ? 'active' : 'inactive'}
          className="flex-1 py-3 border-b-2 text-center font-medium"
          onClick={() => setActiveTab('info')}
        >
          Profile Info
        </motion.button>
        <motion.button
          variants={tabVariants}
          animate={activeTab === 'activity' ? 'active' : 'inactive'}
          className="flex-1 py-3 border-b-2 text-center font-medium"
          onClick={() => setActiveTab('activity')}
        >
          Activity
        </motion.button>
        <motion.button
          variants={tabVariants}
          animate={activeTab === 'settings' ? 'active' : 'inactive'}
          className="flex-1 py-3 border-b-2 text-center font-medium"
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </motion.button>
      </div>
      
      {/* Tab Content */}
      <div className="flex-1 p-4 overflow-auto">
        {activeTab === 'info' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Contact Info Section */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
              <h3 className="text-lg font-semibold mb-4 text-indigo-300">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center mr-3">
                    <FontAwesomeIcon icon={faEnvelope} className="text-indigo-300" />
                  </div>
                  <div>
                    <p className="text-sm text-indigo-300">Email</p>
                    <p className="font-medium">{profile.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center mr-3">
                    <FontAwesomeIcon icon={faPhone} className="text-indigo-300" />
                  </div>
                  <div>
                    <p className="text-sm text-indigo-300">Phone</p>
                    <p className="font-medium">{profile.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center mr-3">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-indigo-300" />
                  </div>
                  <div>
                    <p className="text-sm text-indigo-300">Location</p>
                    <p className="font-medium">{profile.address}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Membership Section */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
              <h3 className="text-lg font-semibold mb-4 text-indigo-300">Membership</h3>
              
              <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl p-4 border border-indigo-400/20">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faGem} className="mr-2 text-yellow-400" />
                      <span className="font-semibold">Gold Plan</span>
                    </div>
                    <p className="text-xs text-indigo-300 mt-1">Valid until Dec 31, 2025</p>
                  </div>
                  <motion.button 
                    className="bg-indigo-600 hover:bg-indigo-700 rounded-full px-4 py-1.5 text-sm font-medium shadow-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Upgrade
                  </motion.button>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faShield} className="text-indigo-300 text-xs mr-2" />
                    <span className="text-xs">Premium Support</span>
                  </div>
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faShield} className="text-indigo-300 text-xs mr-2" />
                    <span className="text-xs">Ad-Free Experience</span>
                  </div>
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faShield} className="text-indigo-300 text-xs mr-2" />
                    <span className="text-xs">Priority Matching</span>
                  </div>
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faShield} className="text-indigo-300 text-xs mr-2" />
                    <span className="text-xs">Exclusive Events</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col space-y-3">
              <motion.button 
                className="bg-indigo-600 hover:bg-indigo-700 py-3 rounded-xl font-medium shadow-lg transition-colors flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FontAwesomeIcon icon={faEdit} className="mr-2" />
                Edit Profile
              </motion.button>
              
              <motion.button 
                className="bg-white/10 hover:bg-white/15 py-3 rounded-xl font-medium shadow-lg transition-colors flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FontAwesomeIcon icon={faArrowRightFromBracket} className="mr-2" />
                Log Out
              </motion.button>
            </div>
          </motion.div>
        )}
        
        {activeTab === 'activity' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-4"
          >
            <h3 className="text-lg font-semibold mb-4 text-indigo-300">Recent Activity</h3>
            
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <div key={index} className="border-b border-indigo-500/20 pb-4 last:border-0">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                      <FontAwesomeIcon 
                        icon={index % 3 === 0 ? faStar : index % 3 === 1 ? faEdit : faGem} 
                        className="text-indigo-300" 
                      />
                    </div>
                    <div>
                      <p className="font-medium">
                        {index % 3 === 0 ? 'You connected with Jamie Smith' : 
                         index % 3 === 1 ? 'Updated your profile information' : 
                         'Received a premium feature badge'}
                      </p>
                      <p className="text-xs text-indigo-300 mt-1">
                        {index === 0 ? 'Just now' : 
                         index === 1 ? '2 hours ago' : 
                         index === 2 ? 'Yesterday at 3:45 PM' : 
                         index === 3 ? '2 days ago' : 
                         'Last week'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
        
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
              <h3 className="text-lg font-semibold mb-4 text-indigo-300">Account Settings</h3>
              
              {['Privacy', 'Notifications', 'Appearance', 'Security', 'Linked Accounts'].map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between py-3 border-b border-indigo-500/20 last:border-0"
                >
                  <span>{item}</span>
                  <FontAwesomeIcon icon={faChevronRight} className="text-indigo-300" />
                </div>
              ))}
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
              <h3 className="text-lg font-semibold mb-4 text-indigo-300">Support</h3>
              
              {['Help Center', 'Report a Problem', 'Terms of Service', 'Privacy Policy'].map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between py-3 border-b border-indigo-500/20 last:border-0"
                >
                  <span>{item}</span>
                  <FontAwesomeIcon icon={faChevronRight} className="text-indigo-300" />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProfileComponent;