import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { stories, chats } from '../data/chats';
import ChatDetailView from './ChatDetailView';

const ChatsComponent = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

  const handleBackToChats = () => {
    setSelectedChat(null);
  };

  // If a chat is selected, show the chat detail view
  if (selectedChat) {
    return <ChatDetailView chat={selectedChat} onBack={handleBackToChats} />;
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Chats</h1>
          <button className="p-2">
            <FontAwesomeIcon icon={faSearch} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Stories */}
      <div className="py-3 px-1 border-b border-gray-100">
        <div className="flex overflow-x-auto space-x-4 px-3 pb-1 scrollbar-hide">
          {/* Add Story Button */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center relative border-2 border-gray-200">
              <FontAwesomeIcon icon={faPlus} className="text-gray-500 text-xl" />
            </div>
            <span className="text-xs mt-1 text-center">Add story</span>
          </div>

          {/* User Stories */}
          {stories.map(story => (
            <div key={story.id} className="flex flex-col items-center flex-shrink-0">
              <div className={`w-16 h-16 rounded-full overflow-hidden relative ${story.hasNewStory ? 'border-2 border-yellow-500' : ''}`}>
                <img 
                  src={story.avatar} 
                  alt={story.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs mt-1 text-center">{story.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chats Header */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">Chats</h2>
          <button className="p-1">
            <FontAwesomeIcon icon={faEllipsisVertical} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {chats.map(chat => (
          <div 
            key={chat.id}
            className="flex items-center px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
            onClick={() => handleChatClick(chat)}
          >
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <img 
                src={chat.avatar}
                alt={chat.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Message Content */}
            <div className="ml-3 flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-sm truncate">{chat.name}</h3>
                <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{chat.time}</span>
              </div>
              <p className="text-xs text-gray-600 truncate mt-1">
                {chat.lastMessage}
              </p>
            </div>

            {/* Unread Badge */}
            {chat.unread > 0 && (
              <div className="ml-3 flex-shrink-0">
                <span className="flex items-center justify-center w-5 h-5 bg-yellow-500 rounded-full text-xs text-white font-medium">
                  {chat.unread}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatsComponent;