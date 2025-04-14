import React, { useState, useCallback, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLocationDot, 
  faFilter, 
  faSearch, 
  faArrowLeft, 
  faEllipsisVertical,
  faCalendarAlt,
  faMapMarkerAlt,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { motion } from 'framer-motion';
import { eventData } from '../data/events';

const containerStyle = {
  width: '100%',
  height: '100%'
};

// Default center (San Francisco)
const defaultCenter = {
  lat: 37.7749,
  lng: -122.4194
};

const MapDetailComponent = () => {
  const [map, setMap] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const carouselRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
  });

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
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

  const handleEventSelect = (event, index) => {
    setSelectedEvent(event);
    setActiveEventIndex(index);
    
    if (map) {
      map.panTo(event.position);
      map.setZoom(15);
    }
  };

  const handleMarkerClick = (event) => {
    setSelectedEvent(event);
    
    // Find the index of the clicked event in the eventData array
    const index = eventData.findIndex(e => e.id === event.id);
    if (index !== -1) {
      setActiveEventIndex(index);
      
      // Scroll to the corresponding card in the carousel
      if (carouselRef.current) {
        const card = carouselRef.current.children[index];
        if (card) {
          card.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        }
      }
    }
    
    if (map) {
      map.panTo(event.position);
    }
  };

  // Filter events by category
  const filteredEvents = activeCategory === 'all' 
    ? eventData 
    : eventData.filter(event => event.category === activeCategory);

  return (
    <div className="flex flex-col h-screen bg-gray-100 relative">
      {/* Full-screen map */}
      <div className="absolute inset-0 z-0">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={selectedEvent ? selectedEvent.position : userLocation || defaultCenter}
            zoom={selectedEvent ? 15 : 13}
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
                },
                {
                  featureType: 'water',
                  elementType: 'geometry',
                  stylers: [{ color: '#e9f5f8' }]
                },
                {
                  featureType: 'landscape',
                  elementType: 'geometry',
                  stylers: [{ color: '#f5f5f5' }]
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
                  fillColor: '#3B82F6',
                  fillOpacity: 1,
                  strokeWeight: 1,
                  strokeColor: '#1E3A8A',
                  scale: 2,
                  anchor: { x: 12, y: 22 }
                }}
              />
            )}

            {/* Event markers */}
            {filteredEvents.map(event => (
              <Marker
                key={event.id}
                position={event.position}
                onClick={() => handleMarkerClick(event)}
                icon={{
                  path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
                  fillColor: event.color,
                  fillOpacity: 1,
                  strokeWeight: 1,
                  strokeColor: '#FFFFFF',
                  scale: selectedEvent && selectedEvent.id === event.id ? 3 : 2,
                  anchor: { x: 12, y: 22 }
                }}
                animation={selectedEvent && selectedEvent.id === event.id ? 1 : null}
              />
            ))}

            {/* Info window for selected event */}
            {selectedEvent && (
              <InfoWindow
                position={selectedEvent.position}
                onCloseClick={() => setSelectedEvent(null)}
              >
                <div className="p-2 max-w-xs">
                  <p className="text-xs font-medium text-gray-500">{selectedEvent.date}</p>
                  <h3 className="font-bold text-sm mt-1">{selectedEvent.title}</h3>
                  <p className="text-xs text-gray-600 mt-1">{selectedEvent.location}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto mb-2"></div>
              <p className="text-gray-500">Loading map...</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Bottom event cards carousel */}
      <div className="absolute bottom-0 left-0 right-0 z-50 mb-28"> {/* Increased margin-bottom to appear well above bottom navigation */}
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto pb-2 pt-2 px-4 hide-scrollbar"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {filteredEvents.map((event, index) => (
            <motion.div 
              key={event.id}
              className={`flex-shrink-0 w-72 mr-4 bg-white rounded-xl shadow-xl overflow-hidden cursor-pointer ${
                selectedEvent && selectedEvent.id === event.id ? 'ring-2 ring-indigo-500 border border-indigo-200' : 'border border-gray-100'
              }`}
              onClick={() => handleEventSelect(event, index)}
              style={{ scrollSnapAlign: 'start' }}
              animate={{
                scale: selectedEvent && selectedEvent.id === event.id ? 1.02 : 1,
                y: selectedEvent && selectedEvent.id === event.id ? -5 : 0
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="h-24 relative">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${event.imageUrl})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black opacity-60"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-white">
                        {event.date}
                      </p>
                    </div>
                    <div>
                      <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-opacity-90 bg-white text-gray-800">
                        {event.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3">
                <h3 className="font-bold text-gray-900">{event.title}</h3>
                <p className="text-xs text-gray-600 mt-1">{event.subtitle}</p>
                
                <div className="mt-3">
                  <div className="flex items-center text-xs text-gray-500 mb-1">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-gray-400" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <FontAwesomeIcon icon={faUsers} className="mr-2 text-gray-400" />
                    <span>{event.attendees} people attending</span>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between">
                  <button 
                    className="px-3 py-1 text-xs font-medium rounded-full"
                    style={{ backgroundColor: event.color, color: 'white' }}
                  >
                    View Details
                  </button>
                  <button className="px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full">
                    RSVP
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapDetailComponent;