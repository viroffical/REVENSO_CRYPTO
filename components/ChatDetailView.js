import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faPaperPlane, faSmile, faPaperclip } from '@fortawesome/free-solid-svg-icons';

const ChatDetailView = ({ chat, onBack }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    
    // In a real app, you would send the message to a server
    // and then update the chat with the new message
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center p-3 bg-white shadow-sm">
        <button onClick={onBack} className="p-2 mr-2">
          <FontAwesomeIcon icon={faChevronLeft} className="text-gray-600" />
        </button>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img 
              src={chat.avatar}
              alt={chat.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-3">
            <h2 className="font-semibold">{chat.name}</h2>
            <span className="text-xs text-gray-500">Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {chat.messages.map((message) => (
          <div 
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                message.sender === 'me' 
                  ? 'bg-yellow-500 text-white rounded-br-none' 
                  : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <span className={`text-xs ${message.sender === 'me' ? 'text-yellow-100' : 'text-gray-500'} mt-1.5 block text-right`}>
                {message.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-3 bg-white border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <button type="button" className="p-2 text-gray-500">
            <FontAwesomeIcon icon={faSmile} />
          </button>
          <button type="button" className="p-2 text-gray-500">
            <FontAwesomeIcon icon={faPaperclip} />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 py-2 px-4 bg-gray-100 rounded-full mx-2 focus:outline-none"
          />
          <button 
            type="submit" 
            className={`p-2 rounded-full ${newMessage.trim() ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-500'}`}
            disabled={!newMessage.trim()}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatDetailView;