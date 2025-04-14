import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowUp, 
  faArrowDown, 
  faUsers, 
  faCalendarAlt, 
  faHandshake, 
  faStar 
} from '@fortawesome/free-solid-svg-icons';

const DashboardCard = ({ title, subtitle, value, percentage, icon, color }) => {
  const isPositive = percentage >= 0;
  
  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="p-5">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h3 className="font-medium text-gray-500 text-sm">{title}</h3>
            <p className="text-xs text-gray-400">{subtitle}</p>
          </div>
          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${color}`}>
            <FontAwesomeIcon icon={icon} className="text-white" />
          </div>
        </div>
        
        <div className="mt-2">
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          <div className="flex items-center mt-1">
            <FontAwesomeIcon 
              icon={isPositive ? faArrowUp : faArrowDown} 
              className={`mr-1 text-xs ${isPositive ? 'text-green-500' : 'text-red-500'}`}
            />
            <span className={`text-xs font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {Math.abs(percentage)}%
            </span>
            <span className="text-xs text-gray-400 ml-1">from last month</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const DashboardComponent = () => {
  const dashboardData = [
    {
      title: "All",
      subtitle: "Total Interactions",
      value: "245.15k",
      percentage: 12.5,
      icon: faStar,
      color: "bg-blue-500"
    },
    {
      title: "Meeting",
      subtitle: "Online - 50.5%",
      value: "45.3k",
      percentage: -2.7,
      icon: faCalendarAlt,
      color: "bg-purple-500"
    },
    {
      title: "Event",
      subtitle: "Average Attendance",
      value: "126.4k",
      percentage: 8.3,
      icon: faHandshake,
      color: "bg-yellow-500"
    },
    {
      title: "Connection",
      subtitle: "Active Users",
      value: "73.45k",
      percentage: 14.2,
      icon: faUsers,
      color: "bg-green-500"
    }
  ];

  return (
    <div className="flex flex-col h-full bg-white p-4 pb-40 overflow-auto scrollbar-hide">
      {/* Dashboard Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500">Analytics overview</p>
      </div>
      
      {/* Dashboard Cards Grid */}
      <div className="grid grid-cols-2 gap-4">
        {dashboardData.map((card, index) => (
          <DashboardCard 
            key={index}
            title={card.title}
            subtitle={card.subtitle}
            value={card.value}
            percentage={card.percentage}
            icon={card.icon}
            color={card.color}
          />
        ))}
      </div>
      
      {/* Additional Content Area */}
      <div className="mt-6 bg-white rounded-xl shadow-md p-5 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
            <div key={index} className="flex items-center p-2 hover:bg-gray-50 rounded-lg">
              <div className={`h-8 w-8 rounded-full ${
                index % 4 === 0 ? 'bg-blue-100' : 
                index % 4 === 1 ? 'bg-yellow-100' :
                index % 4 === 2 ? 'bg-green-100' : 'bg-purple-100'
              } flex items-center justify-center mr-3`}>
                <FontAwesomeIcon 
                  icon={
                    index % 4 === 0 ? faUsers : 
                    index % 4 === 1 ? faCalendarAlt : 
                    index % 4 === 2 ? faHandshake : faStar
                  } 
                  className={`text-xs ${
                    index % 4 === 0 ? 'text-blue-500' : 
                    index % 4 === 1 ? 'text-yellow-500' : 
                    index % 4 === 2 ? 'text-green-500' : 'text-purple-500'
                  }`} 
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">
                  {index % 4 === 0 ? 'New connection request from Alex' : 
                   index % 4 === 1 ? 'Upcoming meeting with team' : 
                   index % 4 === 2 ? 'Event reminder: Networking Lunch' : 
                   'Profile match: 85% compatibility'}
                </p>
                <p className="text-xs text-gray-500">
                  {index % 3 === 0 ? '2 hours ago' : 
                   index % 3 === 1 ? 'Tomorrow, 3:00 PM' : 
                   'Saturday, 7:00 PM'}
                </p>
              </div>
              <button className="text-xs font-medium text-blue-500 hover:text-blue-700 p-1">
                View
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="mt-6 bg-white rounded-xl shadow-md p-5 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Statistics</h2>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 rounded-lg bg-blue-50">
            <p className="text-xs text-blue-600 font-medium">Total Connections</p>
            <p className="text-lg font-bold text-gray-800">1,284</p>
            <div className="w-full h-2 bg-blue-100 rounded-full mt-2">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-purple-50">
            <p className="text-xs text-purple-600 font-medium">Meetings Completed</p>
            <p className="text-lg font-bold text-gray-800">42</p>
            <div className="w-full h-2 bg-purple-100 rounded-full mt-2">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-yellow-50">
            <p className="text-xs text-yellow-600 font-medium">Events Attended</p>
            <p className="text-lg font-bold text-gray-800">23</p>
            <div className="w-full h-2 bg-yellow-100 rounded-full mt-2">
              <div className="h-full bg-yellow-500 rounded-full" style={{ width: '42%' }}></div>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-green-50">
            <p className="text-xs text-green-600 font-medium">Messages Sent</p>
            <p className="text-lg font-bold text-gray-800">376</p>
            <div className="w-full h-2 bg-green-100 rounded-full mt-2">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '89%' }}></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Upcoming Events Section */}
      <div className="mt-6 mb-8 bg-white rounded-xl shadow-md p-5 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Events</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="border-b border-gray-100 pb-4 last:border-none last:pb-0">
              <div className="flex justify-between items-start">
                <div className="flex">
                  <div className="text-center mr-3 bg-gray-50 p-2 rounded-lg">
                    <p className="text-xs font-bold text-gray-700">{['MAY', 'JUN', 'JUL'][index]}</p>
                    <p className="text-lg font-bold text-gray-800">{[15, 22, 3][index]}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">
                      {index === 0 ? 'Tech Meetup San Francisco' : 
                       index === 1 ? 'Business Networking Event' : 
                       'Product Launch Party'}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {index === 0 ? 'SF Convention Center • 6:00 PM' : 
                       index === 1 ? 'Downtown Business Hub • 7:30 PM' : 
                       'Tech Campus Building C • 5:00 PM'}
                    </p>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  index === 0 ? 'bg-green-100 text-green-800' : 
                  index === 1 ? 'bg-blue-100 text-blue-800' : 
                  'bg-purple-100 text-purple-800'
                }`}>
                  {index === 0 ? 'Attending' : 
                   index === 1 ? 'Interested' : 
                   'Invited'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom spacer to ensure last element is fully visible above the navigation bar */}
      <div className="h-28 w-full"></div>
    </div>
  );
};

export default DashboardComponent;