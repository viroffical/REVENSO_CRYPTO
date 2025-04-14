import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay, faClock, faVideo } from '@fortawesome/free-solid-svg-icons';
import meetings from '../data/meetings';

const MeetingCard = ({ meeting }) => {
  const getBgColor = (color) => {
    switch (color) {
      case 'mint':
        return 'bg-green-100';
      case 'beige':
        return 'bg-yellow-100';
      case 'lavender':
        return 'bg-indigo-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className={`relative rounded-xl mb-4 overflow-hidden ${getBgColor(meeting.color)}`}>
      {/* Wavy top border - using CSS mask for a subtle wave effect */}
      <div 
        className="absolute top-0 left-0 right-0 h-3 bg-white bg-opacity-40"
        style={{
          maskImage: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'10\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0,5 C15,2.5 35,7.5 50,5 C65,2.5 85,7.5 100,5 L100,0 L0,0 Z\' fill=\'%23FFFFFF\'/%3E%3C/svg%3E")',
          maskSize: '100% 100%',
          WebkitMaskImage: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'10\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0,5 C15,2.5 35,7.5 50,5 C65,2.5 85,7.5 100,5 L100,0 L0,0 Z\' fill=\'%23FFFFFF\'/%3E%3C/svg%3E")',
          WebkitMaskSize: '100% 100%'
        }}
      ></div>
      
      <div className="p-4">
        {/* Meeting Title */}
        <h3 className="font-semibold text-base mb-1">{meeting.title}</h3>
        
        {/* Host Info */}
        <div className="text-sm text-gray-600 mb-2">
          <span className="font-medium">{meeting.host}</span> - <span className="text-gray-500">{meeting.email}</span>
        </div>
        
        {/* Date and Time */}
        <div className="flex items-center text-sm text-gray-600 mb-1">
          <FontAwesomeIcon icon={faCalendarDay} className="mr-2 text-gray-500" />
          <span>{meeting.date}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faClock} className="mr-2 text-gray-500" />
            <span>{meeting.time}</span>
          </div>
          
          {/* Video Call Button */}
          <button className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50">
            <FontAwesomeIcon icon={faVideo} className="text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

const MeetingsComponent = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="px-4 py-4">
        <h1 className="text-xl font-semibold">Meetings</h1>
      </div>
      
      {/* Tabs - 50-50 split */}
      <div className="px-4 pt-4 pb-2 flex w-full">
        <button
          className={`w-1/2 pb-2 font-medium text-sm text-center ${
            activeTab === 'upcoming'
              ? 'text-yellow-500 border-b-2 border-yellow-500'
              : 'text-gray-500'
          }`}
          onClick={() => handleTabChange('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={`w-1/2 pb-2 font-medium text-sm text-center ${
            activeTab === 'past'
              ? 'text-yellow-500 border-b-2 border-yellow-500'
              : 'text-gray-500'
          }`}
          onClick={() => handleTabChange('past')}
        >
          Past
        </button>
      </div>
      
      {/* Meeting Cards List - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-32 scrollbar-hide">
        {activeTab === 'upcoming' ? (
          meetings.upcoming.map(meeting => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))
        ) : (
          meetings.past.map(meeting => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))
        )}
      </div>
    </div>
  );
};

export default MeetingsComponent;