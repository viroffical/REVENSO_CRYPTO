import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers, faHeart, faCommentDots } from '@fortawesome/free-solid-svg-icons';

const BottomNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'profile', icon: faUser, label: 'Profile' },
    { id: 'people', icon: faUsers, label: 'People' },
    { id: 'likes', icon: faHeart, label: 'Likes' },
    { id: 'chats', icon: faCommentDots, label: 'Chats' }
  ];
  
  return (
    <div className="flex justify-around items-center w-full h-[60px] bg-white border-t border-gray-200 px-2">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`flex flex-col items-center justify-center py-1 px-3 ${activeTab === tab.id ? 'text-yellow-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab(tab.id)}
          aria-label={tab.label}
        >
          <FontAwesomeIcon 
            icon={tab.icon} 
            className={`h-6 w-6 mb-1 ${activeTab === tab.id ? 'text-yellow-500' : 'text-gray-500'}`} 
          />
          <span className="text-xs font-medium">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNavigation;