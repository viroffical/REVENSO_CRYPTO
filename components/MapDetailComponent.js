import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap, faLocationDot, faBullseye } from '@fortawesome/free-solid-svg-icons';

const MapDetailComponent = () => {
  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="bg-gray-100 h-2/3 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <FontAwesomeIcon icon={faMap} className="text-gray-400 text-7xl" />
        </div>
        <div className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-md">
          <FontAwesomeIcon icon={faLocationDot} className="text-red-500 text-xl" />
        </div>
        <div className="absolute bottom-4 left-4 bg-white p-2 rounded-lg shadow-md">
          <div className="flex items-center">
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
            <div className="flex-shrink-0 w-36 mr-3 bg-white rounded-lg shadow">
              <div className="h-24 bg-gray-200 rounded-t-lg"></div>
              <div className="p-2">
                <p className="font-medium">Downtown</p>
                <p className="text-xs text-gray-500">2.3 miles away</p>
              </div>
            </div>
            <div className="flex-shrink-0 w-36 mr-3 bg-white rounded-lg shadow">
              <div className="h-24 bg-gray-200 rounded-t-lg"></div>
              <div className="p-2">
                <p className="font-medium">City Center</p>
                <p className="text-xs text-gray-500">1.5 miles away</p>
              </div>
            </div>
            <div className="flex-shrink-0 w-36 bg-white rounded-lg shadow">
              <div className="h-24 bg-gray-200 rounded-t-lg"></div>
              <div className="p-2">
                <p className="font-medium">Park District</p>
                <p className="text-xs text-gray-500">3.7 miles away</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-5">
          <h2 className="font-semibold mb-3">Recent Activities</h2>
          <div className="bg-white rounded-lg shadow p-4 mb-3">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                <FontAwesomeIcon icon={faLocationDot} className="text-yellow-500" />
              </div>
              <div>
                <p className="font-medium">Downtown Coffee Shop</p>
                <p className="text-xs text-gray-500">Visited yesterday</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                <FontAwesomeIcon icon={faLocationDot} className="text-yellow-500" />
              </div>
              <div>
                <p className="font-medium">Central Park</p>
                <p className="text-xs text-gray-500">Visited last week</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapDetailComponent;