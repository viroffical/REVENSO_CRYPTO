import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay, faClock } from '@fortawesome/free-solid-svg-icons';
import events from '../data/eventData';

const EventsComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Get unique categories
  const getUniqueCategories = () => {
    const categories = events.map(event => event.category);
    return ['All', ...new Set(categories)];
  };
  
  const categories = getUniqueCategories();
  
  // Filter events by selected category
  const filteredEvents = selectedCategory === 'All' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  // Status badge color mapping
  const statusColors = {
    'Going': 'bg-green-500 text-white',
    'Pending': 'bg-yellow-500 text-white',
    'Invited': 'bg-blue-500 text-white'
  };

  // Render attendees with count
  const renderAttendees = (attendees) => {
    const displayCount = 3;
    const hasMore = attendees.length > displayCount;
    
    return (
      <div className="flex items-center">
        <div className="flex -space-x-2">
          {attendees.slice(0, displayCount).map((avatar, index) => (
            <img 
              key={index}
              src={avatar} 
              alt="Attendee" 
              className="w-6 h-6 rounded-full border-2 border-white object-cover"
            />
          ))}
          {hasMore && (
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-800 text-white text-xs border-2 border-white">
              +{attendees.length - displayCount}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Fixed header with filters */}
      <div className="sticky top-0 z-10 bg-white pb-2">
        <div className="p-4 pb-2">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-yellow-500">REVENSO</h1>
          </div>

          {/* Category Filters */}
          <div className="mb-2 flex overflow-x-auto -mx-4 px-4 pb-2 scrollbar-hide">
            {categories.map(category => (
              <button 
                key={category}
                className={`flex-shrink-0 px-4 py-2 rounded-full mr-2 text-sm ${
                  selectedCategory === category 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-gray-100 text-gray-700'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto px-4 space-y-4 pb-16 scrollbar-hide">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex min-h-[140px]">
              <div className="w-28 bg-gray-200 flex-shrink-0">
                <img 
                  src={event.image} 
                  alt={event.event_name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-base line-clamp-1">{event.event_name}</h3>
                  
                  <div className="flex flex-col mt-1.5 space-y-0.5">
                    <div className="flex items-center text-xs text-gray-500">
                      <FontAwesomeIcon icon={faCalendarDay} className="mr-1 text-yellow-500 w-3.5" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <FontAwesomeIcon icon={faClock} className="mr-1 text-yellow-500 w-3.5" />
                      <span>{event.start_time} - {event.end_time}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <div className="mt-1.5">
                    <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-md inline-block mr-2">
                      {event.category}
                    </span>
                    <span className="text-xs text-green-500 font-medium inline-block">
                      {event.entry}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    {event.invitedUsers && renderAttendees(event.invitedUsers)}
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusColors[event.status] || 'bg-gray-500 text-white'}`}>
                      {event.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsComponent;