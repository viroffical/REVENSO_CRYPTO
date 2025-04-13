const BottomNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'profile', icon: 'fa-user', label: 'Profile' },
    { id: 'people', icon: 'fa-users', label: 'People' },
    { id: 'likes', icon: 'fa-heart', label: 'Likes' },
    { id: 'chats', icon: 'fa-comment', label: 'Chats' }
  ];
  
  return (
    <div className="bottom-navigation">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
          aria-label={tab.label}
        >
          <i className={`fas ${tab.icon} nav-icon`}></i>
          <span className="nav-label">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNavigation;