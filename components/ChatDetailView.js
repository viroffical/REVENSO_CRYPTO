import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faVideo, faPhone, faPlus, faPaperPlane, faMicrophone } from '@fortawesome/free-solid-svg-icons';

const ChatDetailView = ({ chat, onBack }) => {
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Sample messages for the chat
  const messages = [
    {
      id: 1,
      sender: 'them',
      message: 'Hi, Asal!',
      time: '10:30 AM',
      isReply: false
    },
    {
      id: 2,
      sender: 'them',
      message: 'How do you buy "nice" stuff?',
      time: '10:31 AM',
      isReply: false
    },
    {
      id: 3,
      sender: 'them',
      message: 'Please help me find a good monitor for the design',
      time: '10:32 AM',
      isReply: false
    },
    {
      id: 4,
      sender: 'me',
      message: 'What should I call it?',
      time: '10:33 AM',
      isReply: true,
      replyTo: {
        name: chat.name,
        message: 'Please help me find a good monitor for the design'
      }
    },
    {
      id: 5,
      sender: 'me',
      message: 'I usually buy directly to the shop to reduce the risk of damaged travel, and prevent any damage',
      time: '10:34 AM',
      isReply: true,
      replyTo: {
        name: chat.name,
        message: 'Please help me find a good monitor for the design'
      }
    }
  ];

  const handleSendMessage = () => {
    // Handle sending a new message
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Chat Header */}
      <div className="px-4 py-3 border-b border-gray-200 flex items-center">
        <button 
          onClick={onBack}
          className="mr-3"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-gray-600" />
        </button>
        
        <div className="flex-1">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
              <img 
                src={chat.avatar} 
                alt={chat.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-semibold text-base">{chat.name}</h2>
              <p className="text-xs text-green-500">Online</p>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button>
            <FontAwesomeIcon icon={faVideo} className="text-gray-600" />
          </button>
          <button>
            <FontAwesomeIcon icon={faPhone} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 scrollbar-hide">
        <div className="text-center text-xs text-gray-500 my-2">Today</div>
        
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`mb-3 flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[75%] ${
                msg.sender === 'me' 
                  ? 'bg-yellow-400 text-black' 
                  : 'bg-gray-200 text-black'
              } rounded-2xl p-3 ${msg.isReply ? 'pt-8' : ''} relative`}
            >
              {msg.isReply && (
                <div className="absolute top-0 left-0 right-0 bg-yellow-500 px-3 py-1 text-xs text-white rounded-t-2xl">
                  <span className="font-semibold">{msg.replyTo.name}</span>
                  <div className="truncate">{msg.replyTo.message}</div>
                </div>
              )}
              <p className="text-sm">{msg.message}</p>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center my-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
        
        {/* Delivered indicator */}
        <div className="text-right text-xs text-gray-500 mt-1">Delivered</div>
      </div>

      {/* Input Area */}
      <div className="px-4 py-3 border-t border-gray-200 flex items-center">
        <button className="mr-2">
          <FontAwesomeIcon icon={faPlus} className="text-gray-600" />
        </button>
        
        <div className="flex-1 bg-gray-100 rounded-full overflow-hidden px-4 py-2 flex items-center">
          <input 
            type="text" 
            className="flex-1 bg-transparent border-none outline-none text-sm"
            placeholder="New Chat"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        
        <button className="ml-2">
          {newMessage ? (
            <FontAwesomeIcon 
              icon={faPaperPlane} 
              className="text-yellow-400"
              onClick={handleSendMessage}
            />
          ) : (
            <FontAwesomeIcon icon={faMicrophone} className="text-gray-600" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatDetailView;