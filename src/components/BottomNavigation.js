import React from 'react';
import '../styles/BottomNavigation.css';

const BottomNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'profile', icon: 'fas fa-user', label: 'Profile' },
    { id: 'people', icon: 'fas fa-users', label: 'People' },
    { id: 'likes', icon: 'fas fa-heart', label: 'Liked You' },
    { id: 'chats', icon: 'fas fa-comment', label: 'Chats' }
  ];

  return (
    <nav className="bottom-navigation">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          <i className={`${tab.icon} nav-icon`}></i>
          <span className="nav-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNavigation;
