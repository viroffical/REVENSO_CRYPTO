import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay, faClock, faSpinner, faFilter } from '@fortawesome/free-solid-svg-icons';
import { supabase } from '../lib/supabaseClient';
import { formatDate } from '../lib/utils';

const EventsComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDate, setSelectedDate] = useState('All');
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [dates, setDates] = useState(['All']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Status badge color mapping
  const statusColors = {
    'Going': 'bg-green-500 text-white',
    'Pending': 'bg-yellow-500 text-white',
    'Invited': 'bg-blue-500 text-white'
  };
  
  // Fetch events from Supabase
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        
        // Fetch all events from the "event" table
        const { data, error } = await supabase
          .from('event')
          .select('*');
        const sorted = data.sort((a, b) => {
          const parse = d => new Date(Date.parse(d));
          return parse(a.date) - parse(b.date);
        })
        if (error) throw error;
        
        // If we got data, set the events
        if (sorted) {
          setEvents(sorted);
          
          // Extract unique categories
          const uniqueCategories = [...new Set(data.map(event => event.type))];
          setCategories(['All', ...uniqueCategories]);
          
          // Extract unique dates
          const uniqueDates = [...new Set(data.map(event => event.date))];
          setDates(['All', ...uniqueDates]);
        }
        
      } catch (error) {
        console.error('Error fetching events:', error);
        if (error.message === 'Supabase not configured') {
          setError('Please configure your Supabase credentials to load events.');
        } else {
          setError('Failed to load events. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);
  
  // Filter events by selected category and date
  const filteredEvents = events.filter(event => {
    // Filter by category first
    const categoryMatch = selectedCategory === 'All' || event.type === selectedCategory;
    
    // Then filter by date
    const dateMatch = selectedDate === 'All' || event.date === selectedDate;
    
    // Return true only if both filters match
    return categoryMatch && dateMatch;
  });

  // Render attendees with count
  const renderAttendees = (attendees) => {
    if (!attendees || !Array.isArray(attendees) || attendees.length === 0) {
      return null;
    }
    
    const displayCount = Math.min(3, attendees.length);
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
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/40?text=User';
              }}
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
            <h1 className="text-2xl font-bold">Events</h1>
          </div>

          {/* Category Filters */}
          <div className="mb-3">
            <div className="flex items-center mb-2 px-1">
              <FontAwesomeIcon icon={faFilter} className="text-yellow-500 mr-2 w-3.5" />
              <span className="text-sm font-medium text-gray-700">Filter by Category</span>
            </div>
            <div className="flex overflow-x-auto -mx-4 px-4 pb-2 scrollbar-hide">
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
          
          {/* Date Filters */}
          <div className="mb-2">
            <div className="flex items-center mb-2 px-1">
              <FontAwesomeIcon icon={faCalendarDay} className="text-yellow-500 mr-2 w-3.5" />
              <span className="text-sm font-medium text-gray-700">Filter by Date</span>
            </div>
            <div className="flex overflow-x-auto -mx-4 px-4 pb-2 scrollbar-hide">
              {dates.map(date => (
                <button 
                  key={date}
                  className={`flex-shrink-0 px-4 py-2 rounded-full mr-2 text-sm ${
                    selectedDate === date 
                      ? 'bg-yellow-500 text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => setSelectedDate(date)}
                >
                  {date === 'All' ? 'All Dates' : formatDate(date)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto px-4 space-y-4 pb-40 scrollbar-hide">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <FontAwesomeIcon icon={faSpinner} spin className="text-yellow-500 text-4xl mb-4" />
            <p className="text-gray-500">Loading events...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-red-500 mb-2">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-yellow-500 text-white rounded-full text-sm"
            >
              Try Again
            </button>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-gray-500 mb-2">No events found with the selected filters</p>
            <div className="flex space-x-2">
              {(selectedCategory !== 'All' || selectedDate !== 'All') && (
                <button 
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedDate('All');
                  }} 
                  className="px-4 py-2 bg-yellow-500 text-white rounded-full text-sm"
                >
                  Show All Events
                </button>
              )}
              {selectedCategory !== 'All' && (
                <button 
                  onClick={() => setSelectedCategory('All')}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm"
                >
                  Clear Category Filter
                </button>
              )}
              {selectedDate !== 'All' && (
                <button 
                  onClick={() => setSelectedDate('All')}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm"
                >
                  Clear Date Filter
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            {filteredEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex min-h-[140px]">
                  <div className="w-36 bg-gray-200 flex-shrink-0">
                    <img 
                      src={event.cover_url} 
                      alt={event.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-base line-clamp-1">{event.name}</h3>
                      
                      <div className="flex flex-col mt-1.5 space-y-0.5">
                        <div className="flex items-center text-xs text-gray-500">
                          <FontAwesomeIcon icon={faCalendarDay} className="mr-1 text-yellow-500 w-3.5" />
                          <span>{formatDate(event.date)}</span>
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
                          {event.type}
                        </span>
                        <span className="text-xs text-green-500 font-medium inline-block">
                          {event.price === "Free" ? "Free" : `$${event.price}`}
                        </span>
                      </div>

                      {/* <div className="flex justify-between items-center mt-2">
                        {event.invited_users && (() => {
                          try {
                            const attendees = typeof event.invited_users === 'string' 
                              ? JSON.parse(event.invited_users) 
                              : event.invited_users;
                            return renderAttendees(attendees);
                          } catch (error) {
                            console.error('Error parsing invited_users:', error);
                            return null;
                          }
                        })()}
                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusColors[event.status] || 'bg-gray-500 text-white'}`}>
                          {event.status}
                        </span>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Bottom spacer to ensure last element is fully visible above the navigation bar */}
            <div className="h-28 w-full"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default EventsComponent;