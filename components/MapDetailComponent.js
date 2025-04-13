import React, { useState, useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faBullseye, faSearch } from '@fortawesome/free-solid-svg-icons';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

// Default center (San Francisco)
const defaultCenter = {
  lat: 37.7749,
  lng: -122.4194
};

const locations = [
  { id: 1, name: 'Downtown', position: { lat: 37.7749, lng: -122.4194 }, distance: '2.3 miles away' },
  { id: 2, name: 'City Center', position: { lat: 37.7833, lng: -122.4167 }, distance: '1.5 miles away' },
  { id: 3, name: 'Park District', position: { lat: 37.7694, lng: -122.4862 }, distance: '3.7 miles away' }
];

const recentActivities = [
  { id: 1, name: 'Downtown Coffee Shop', time: 'Visited yesterday', position: { lat: 37.7749, lng: -122.4194 } },
  { id: 2, name: 'Central Park', time: 'Visited last week', position: { lat: 37.7694, lng: -122.4862 } }
];

const MapDetailComponent = () => {
  const [map, setMap] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

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

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    if (map) {
      map.panTo(location.position);
    }
  };

  const handleFindNearby = () => {
    if (userLocation && map) {
      map.panTo(userLocation);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="h-2/3 relative">
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
              zoomControl: false
            }}
          >
            {/* User location marker */}
            {userLocation && (
              <Marker
                position={userLocation}
                icon={{
                  path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
                  fillColor: '#FFCC00',
                  fillOpacity: 1,
                  strokeWeight: 1,
                  strokeColor: '#000000',
                  scale: 2,
                  anchor: { x: 12, y: 22 }
                }}
              />
            )}

            {/* Location markers */}
            {locations.map(location => (
              <Marker
                key={location.id}
                position={location.position}
                onClick={() => setSelectedLocation(location)}
              />
            ))}

            {/* Info window for selected location */}
            {selectedLocation && (
              <InfoWindow
                position={selectedLocation.position}
                onCloseClick={() => setSelectedLocation(null)}
              >
                <div className="p-1">
                  <h3 className="font-bold text-sm">{selectedLocation.name}</h3>
                  <p className="text-xs text-gray-500">{selectedLocation.distance}</p>
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

        {/* Map controls */}
        <div className="absolute top-4 left-4 right-4">
          <div className="bg-white p-2 rounded-lg shadow-md flex items-center">
            <FontAwesomeIcon icon={faSearch} className="text-gray-400 ml-1 mr-2" />
            <input 
              type="text" 
              placeholder="Search locations" 
              className="flex-1 border-none outline-none text-sm"
            />
          </div>
        </div>

        <div className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-md">
          <FontAwesomeIcon 
            icon={faLocationDot} 
            className="text-yellow-500 text-xl"
            onClick={() => userLocation && map && map.panTo(userLocation)} 
          />
        </div>

        <div className="absolute bottom-4 left-4 bg-white p-2 rounded-lg shadow-md">
          <div 
            className="flex items-center cursor-pointer"
            onClick={handleFindNearby}
          >
            <FontAwesomeIcon icon={faBullseye} className="text-yellow-500 mr-2" />
            <span className="text-sm font-medium">Find Nearby</span>
          </div>
        </div>
      </div>
      
      <div className="p-5 flex-1 overflow-y-auto scrollbar-hide">
        <h1 className="text-2xl font-bold mb-4">Explore Nearby</h1>
        
        <div className="mb-5">
          <h2 className="font-semibold mb-3">Popular Locations</h2>
          <div className="flex overflow-x-auto -mx-5 px-5 pb-2 scrollbar-hide">
            {locations.map(location => (
              <div 
                key={location.id}
                className="flex-shrink-0 w-36 mr-3 bg-white rounded-lg shadow cursor-pointer"
                onClick={() => handleLocationSelect(location)}
              >
                <div className="h-24 bg-gray-200 rounded-t-lg flex items-center justify-center">
                  <FontAwesomeIcon icon={faLocationDot} className="text-yellow-500 text-2xl" />
                </div>
                <div className="p-2">
                  <p className="font-medium">{location.name}</p>
                  <p className="text-xs text-gray-500">{location.distance}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-5">
          <h2 className="font-semibold mb-3">Recent Activities</h2>
          {recentActivities.map(activity => (
            <div 
              key={activity.id}
              className="bg-white rounded-lg shadow p-4 mb-3 cursor-pointer"
              onClick={() => handleLocationSelect(activity)}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                  <FontAwesomeIcon icon={faLocationDot} className="text-yellow-500" />
                </div>
                <div>
                  <p className="font-medium">{activity.name}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapDetailComponent;