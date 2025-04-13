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
    <div className="flex flex-col h-full bg-gray-50 p-4">
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
      <div className="mt-6 bg-white rounded-xl shadow-md p-5">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex items-center p-2 hover:bg-gray-50 rounded-lg">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                <FontAwesomeIcon icon={faUsers} className="text-gray-500 text-xs" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {index === 0 ? 'New connection request' : index === 1 ? 'Upcoming meeting' : 'Event reminder'}
                </p>
                <p className="text-xs text-gray-500">{index === 0 ? '2 hours ago' : index === 1 ? 'Tomorrow, 3:00 PM' : 'Saturday, 7:00 PM'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;