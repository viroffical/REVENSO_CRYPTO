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
          <h1 className="text-xl font-semibold text-yellow-500">REVENSO</h1>
          <button className="p-2">
            <FontAwesomeIcon icon={faSearch} className="text-gray-600" />
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