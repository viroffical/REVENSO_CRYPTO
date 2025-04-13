import React, { useState, useCallback, useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faCalendarAlt, faClock, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import events from '../data/events';

const containerStyle = {
  width: '100%',
  height: '100%'
};

// Default center (San Francisco)
const defaultCenter = {
  lat: 37.7749,
  lng: -122.4194
};

const EventMapView = () => {
  const [map, setMap] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeEventId, setActiveEventId] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const carouselRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
  });

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          console.log('Error getting location');
        }
      );
    }
  }, []);

  // Format date for display
  const formatDate = (dateString, timeString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const weekday = date.toLocaleString('en-US', { weekday: 'short' }).toUpperCase();
    
    // Format time (assuming timeString is in 24h format like "18:00")
    const [hours, minutes] = timeString.split(':');
    const formattedTime = `${hours}:${minutes}`;
    
    return {
      dateFormatted: `${weekday}, ${month} ${day}`,
      timeFormatted: formattedTime
    };
  };

  const handleEventSelect = (eventId) => {
    const event = events.find(e => e.id === eventId);
    setSelectedEvent(event);
    setActiveEventId(eventId);
    
    // Scroll carousel to the selected event
    if (carouselRef.current) {
      const eventElement = document.getElementById(`event-card-${eventId}`);
      if (eventElement) {
        carouselRef.current.scrollTo({
          left: eventElement.offsetLeft - 20,
          behavior: 'smooth'
        });
      }
    }

    // Pan map to event location
    if (map && event) {
      map.panTo(event.location);
      map.setZoom(15);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white relative">
      <div className="h-full w-full relative">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={userLocation || defaultCenter}
            zoom={13}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              fullscreenControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              zoomControl: false,
              styles: [
                {
                  featureType: 'poi',
                  elementType: 'labels',
                  stylers: [{ visibility: 'off' }]
                },
                {
                  featureType: 'transit',
                  elementType: 'labels',
                  stylers: [{ visibility: 'off' }]
                }
              ]
            }}
          >
            {/* User location marker */}
            {userLocation && (
              <Marker
                position={userLocation}
                icon={{
                  path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
                  fillColor: '#4285F4',
                  fillOpacity: 1,
                  strokeWeight: 1,
                  strokeColor: '#FFFFFF',
                  scale: 2,
                  anchor: { x: 12, y: 22 }
                }}
              />
            )}

            {/* Event markers */}
            {events.map(event => (
              <Marker
                key={event.id}
                position={event.location}
                onClick={() => handleEventSelect(event.id)}
                icon={{
                  path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
                  fillColor: event.location.color || '#FF5A5F',
                  fillOpacity: 1,
                  strokeWeight: 1,
                  strokeColor: '#FFFFFF',
                  scale: activeEventId === event.id ? 2.5 : 2,
                  anchor: { x: 12, y: 22 }
                }}
                animation={activeEventId === event.id ? window.google?.maps?.Animation?.BOUNCE : null}
              />
            ))}

            {/* Info window for selected event */}
            {selectedEvent && (
              <InfoWindow
                position={selectedEvent.location}
                onCloseClick={() => setSelectedEvent(null)}
              >
                <div className="p-2 max-w-[200px]">
                  <h3 className="font-bold text-sm">{selectedEvent.event_name}</h3>
                  <p className="text-xs text-gray-600">{selectedEvent.location.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{selectedEvent.location.address}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-400 mx-auto mb-2"></div>
              <p className="text-gray-500">Loading map...</p>
            </div>
          </div>
        )}

        {/* Search and filter bar */}
        <div className="absolute top-4 left-4 right-4 flex space-x-2">
          <div className="bg-white p-2 rounded-lg shadow-lg flex-1 flex items-center">
            <FontAwesomeIcon icon={faSearch} className="text-gray-400 ml-1 mr-2" />
            <input 
              type="text" 
              placeholder="Search events nearby" 
              className="flex-1 border-none outline-none text-sm"
            />
          </div>
          <button className="bg-white p-3 rounded-lg shadow-lg">
            <FontAwesomeIcon icon={faFilter} className="text-gray-600" />
          </button>
        </div>

        {/* Event cards carousel */}
        <div 
          ref={carouselRef}
          className="absolute bottom-4 left-0 right-0 overflow-x-auto pb-4 px-4 scrollbar-hide"
        >
          <div className="flex space-x-4">
            {events.map(event => {
              const { dateFormatted, timeFormatted } = formatDate(event.date, event.start_time);
              return (
                <motion.div
                  key={event.id}
                  id={`event-card-${event.id}`}
                  className={`flex-shrink-0 bg-white rounded-xl shadow-lg w-[280px] overflow-hidden 
                    ${activeEventId === event.id ? 'ring-2' : ''}
                  `}
                  style={{
                    boxShadow: activeEventId === event.id 
                      ? `0 10px 25px -5px ${event.location.color}40, 0 8px 10px -6px ${event.location.color}30`
                      : '',
                    borderColor: activeEventId === event.id ? event.location.color : ''
                  }}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleEventSelect(event.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.3,
                    delay: event.id * 0.05
                  }}
                >
                  <div className="relative">
                    <div 
                      className="absolute top-0 left-0 w-1 h-full" 
                      style={{ backgroundColor: event.location.color }}
                    ></div>
                    
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="bg-gray-50 rounded-lg px-2 py-1">
                          <div className="flex items-center space-x-1">
                            <span className="text-xs font-bold text-gray-800">{dateFormatted}</span>
                          </div>
                          <div className="flex items-center space-x-1 mt-1">
                            <span className="text-xs font-medium text-gray-600">• {timeFormatted}</span>
                          </div>
                        </div>
                        
                        <div 
                          className="w-4 h-4 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: event.location.color }}
                        >
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                      
                      <h3 className="font-bold text-base leading-tight mb-1">{event.event_name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{event.subtitle}</p>
                      
                      <div className="flex items-center text-xs text-gray-500 mt-2">
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center mr-2"
                          style={{ backgroundColor: `${event.location.color}15` }}
                        >
                          <FontAwesomeIcon 
                            icon={faLocationDot} 
                            className="text-xs"
                            style={{ color: event.location.color }}
                          />
                        </div>
                        <span className="truncate">{event.location.name}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventMapView;