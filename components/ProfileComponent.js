import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEdit, 
  faCrown, 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt, 
  faCalendarAlt, 
  faBriefcase,
  faLink,
  faUsers,
  faCalendarCheck,
  faHandshake,
  faStar,
  faShield,
  faBullseye,
  faGem,
  faBell,
  faMoon,
  faEye,
  faLock,
  faTrophy,
  faMedal,
  faAward,
  faThumbsUp
} from '@fortawesome/free-solid-svg-icons';

const ProfileComponent = ({ userProfile }) => {
  // Default user profile if none provided
  const profile = userProfile || {
    name: 'Alex Johnson',
    username: '@alexj',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    address: 'San Francisco, CA',
    dateOfBirth: 'June 15, 1992',
    occupation: 'Senior Product Designer',
    bio: 'Creative designer with a passion for user experience and innovative solutions.',
    isPremium: true,
    role: 'Gold Member',
    profileImgUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    socialLinks: [
      { platform: 'Twitter', handle: '@alexjohnson' },
      { platform: 'LinkedIn', handle: 'alex-johnson' },
      { platform: 'Instagram', handle: '@alex.creates' }
    ]
  };

  const stats = [
    {
      title: 'Connections',
      value: '248',
      icon: faUsers,
      color: 'bg-blue-50 text-blue-600 border-blue-100'
    },
    {
      title: 'Events',
      value: '35',
      icon: faCalendarCheck,
      color: 'bg-purple-50 text-purple-600 border-purple-100'
    },
    {
      title: 'Meetings',
      value: '12',
      icon: faHandshake,
      color: 'bg-yellow-50 text-yellow-600 border-yellow-100'
    },
    {
      title: 'Score',
      value: '87',
      icon: faBullseye,
      color: 'bg-green-50 text-green-600 border-green-100'
    }
  ];

  const achievements = [
    {
      title: 'Top Networker',
      icon: faTrophy,
      color: 'bg-amber-50 text-amber-600 border-amber-100'
    },
    {
      title: 'Event Organizer',
      icon: faMedal,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100'
    },
    {
      title: 'Rising Star',
      icon: faStar,
      color: 'bg-rose-50 text-rose-600 border-rose-100'
    },
    {
      title: 'Verified Pro',
      icon: faAward,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100'
    },
    {
      title: 'Trend Setter',
      icon: faThumbsUp,
      color: 'bg-cyan-50 text-cyan-600 border-cyan-100'
    }
  ];

  const settings = [
    { name: 'Push Notifications', icon: faBell, enabled: true },
    { name: 'Dark Mode', icon: faMoon, enabled: false },
    { name: 'Profile Privacy', icon: faEye, enabled: true },
    { name: 'Two-Factor Auth', icon: faLock, enabled: false }
  ];

  return (
    <div className="flex flex-col h-full overflow-auto hide-scrollbar bg-white text-gray-800">
      {/* App Header */}
      <div className="px-4 py-4 border-b border-gray-100">
        <h1 className="text-xl font-semibold text-yellow-500">REVENSO</h1>
      </div>
      {/* Profile Header */}
      <div className="relative p-6 border-b border-gray-100">
        <div className="flex flex-col items-center">
          {/* Profile Image with Premium Badge */}
          <div className="relative">
            <div className="h-28 w-28 rounded-full overflow-hidden border-4 border-white shadow-lg">
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
          <h1 className="mt-4 text-2xl font-bold text-gray-900">{profile.name}</h1>
          <p className="text-blue-600 font-medium text-sm">{profile.username}</p>
          
          {/* Bio */}
          <p className="mt-1 text-gray-600 text-center text-sm max-w-xs">{profile.bio}</p>
          
          {/* Role/Status Badge */}
          <div className="mt-3 bg-yellow-50 px-3 py-1 rounded-full inline-flex items-center border border-yellow-200">
            <FontAwesomeIcon icon={faGem} className="text-yellow-600 mr-2 text-xs" />
            <span className="text-sm font-medium text-yellow-800">{profile.role}</span>
          </div>
          
          {/* Action Buttons */}
          <div className="flex w-full gap-3 mt-4">
            <motion.button 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium shadow-sm transition-colors flex items-center justify-center"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <FontAwesomeIcon icon={faEdit} className="mr-2" />
              Edit Profile
            </motion.button>
            
            <motion.button 
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2.5 rounded-lg font-medium shadow-sm transition-colors flex items-center justify-center"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <FontAwesomeIcon icon={faCrown} className="mr-2" />
              Upgrade Plan
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="px-4 py-5">
        <h2 className="text-lg font-semibold mb-3 px-2 text-gray-800">Stats</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 px-2 hide-scrollbar">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`flex-shrink-0 rounded-xl p-4 border shadow-sm flex flex-col items-center w-24 ${stat.color}`}
            >
              <FontAwesomeIcon icon={stat.icon} className="mb-1" />
              <span className="text-lg font-bold">{stat.value}</span>
              <span className="text-xs">{stat.title}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Profile Details */}
      <div className="px-6 py-5 border-t border-gray-100">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Profile Details</h2>
        
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-3 flex-shrink-0">
              <FontAwesomeIcon icon={faEnvelope} className="text-blue-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="font-medium">{profile.email}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-3 flex-shrink-0">
              <FontAwesomeIcon icon={faPhone} className="text-blue-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Phone</p>
              <p className="font-medium">{profile.phone}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-3 flex-shrink-0">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Date of Birth</p>
              <p className="font-medium">{profile.dateOfBirth}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-3 flex-shrink-0">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Location</p>
              <p className="font-medium">{profile.address}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-3 flex-shrink-0">
              <FontAwesomeIcon icon={faBriefcase} className="text-blue-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Occupation</p>
              <p className="font-medium">{profile.occupation}</p>
            </div>
          </div>
        </div>
        
        {/* Social Links */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2 text-gray-700">Social Profiles</h3>
          <div className="space-y-2">
            {profile.socialLinks.map((link, index) => (
              <div key={index} className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mr-3 flex-shrink-0 border border-gray-100">
                  <FontAwesomeIcon icon={faLink} className="text-gray-500 text-xs" />
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium">{link.platform}</span>
                  <span className="text-xs text-gray-500 ml-2">{link.handle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Membership Section */}
      <div className="px-6 py-5 border-t border-gray-100">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Membership</h2>
        
        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-5 border border-yellow-100 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faGem} className="mr-2 text-yellow-600" />
                <span className="font-semibold text-gray-900">Gold Plan</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">Valid until Dec 31, 2025</p>
            </div>
            <motion.button 
              className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full px-4 py-1.5 text-sm font-medium shadow-sm transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Manage
            </motion.button>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faShield} className="text-yellow-600 text-xs mr-2" />
              <span className="text-xs text-gray-700">Premium Support</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faShield} className="text-yellow-600 text-xs mr-2" />
              <span className="text-xs text-gray-700">Ad-Free Experience</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faShield} className="text-yellow-600 text-xs mr-2" />
              <span className="text-xs text-gray-700">Priority Matching</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faShield} className="text-yellow-600 text-xs mr-2" />
              <span className="text-xs text-gray-700">Exclusive Events</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Achievements Section */}
      <div className="px-6 py-5 border-t border-gray-100">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Achievements</h2>
        
        <div className="grid grid-cols-3 gap-3">
          {achievements.map((achievement, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center p-3 rounded-lg border shadow-sm ${achievement.color}`}
            >
              <div className="p-2 rounded-full bg-white shadow-sm mb-2">
                <FontAwesomeIcon icon={achievement.icon} className={`${achievement.color.split(' ')[1]}`} />
              </div>
              <span className="text-xs font-medium text-center">{achievement.title}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Settings Section */}
      <div className="px-6 py-5 border-t border-gray-100 mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Quick Settings</h2>
        
        <div className="space-y-3">
          {settings.map((setting, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={setting.icon} className="text-gray-500 text-xs" />
                </div>
                <span className="font-medium text-sm">{setting.name}</span>
              </div>
              
              <div className="relative">
                <input 
                  type="checkbox" 
                  defaultChecked={setting.enabled}
                  className="sr-only peer" 
                  id={`setting-${index}`} 
                />
                <label 
                  htmlFor={`setting-${index}`}
                  className="flex items-center h-6 w-11 bg-gray-300 rounded-full cursor-pointer peer-checked:bg-blue-500 after:content-[''] after:absolute after:h-5 after:w-5 after:rounded-full after:bg-white after:left-0.5 after:top-0.5 after:transition-all peer-checked:after:translate-x-5 peer-checked:after:bg-white after:shadow-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;