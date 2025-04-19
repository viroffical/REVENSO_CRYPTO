import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faClock,
  faVideo,
  faLink,
  faUnlink,
  faSpinner,
  faExternalLinkAlt,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useCalendly } from "../hooks/useCalendly";
import {
  formatCalendlyEvent,
  formatCalendlyEventType,
} from "../utils/calendlyService";

const MeetingsComponent = () => {
  const {
    isConnected,
    calendlyUser,
    events,
    eventTypes,
    loading,
    error,
    connect,
    disconnect,
    getEvents,
    getEventTypes,
  } = useCalendly();

  const [activeTab, setActiveTab] = useState("upcoming");
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [formattedEvents, setFormattedEvents] = useState([]);
  const [formattedEventTypes, setFormattedEventTypes] = useState([]);

  // Load events and event types when connection status changes
  useEffect(() => {
    if (isConnected) {
      const loadData = async () => {
        setLoadingEvents(true);
        try {
          // Fetch events and event types in parallel
          const [eventsData, eventTypesData] = await Promise.all([
            getEvents(),
            getEventTypes(),
          ]);

          console.log("Fetched Calendly events:", eventsData);
          console.log("Fetched Calendly event types:", eventTypesData);

          // Format the data for display
          if (eventsData && Array.isArray(eventsData)) {
            setFormattedEvents(eventsData.map(formatCalendlyEvent));
          } else if (
            eventsData &&
            eventsData.collection &&
            Array.isArray(eventsData.collection)
          ) {
            setFormattedEvents(eventsData.collection.map(formatCalendlyEvent));
          } else {
            console.error("Unexpected events data format:", eventsData);
            setFormattedEvents([]);
          }

          if (eventTypesData && Array.isArray(eventTypesData)) {
            setFormattedEventTypes(eventTypesData.map(formatCalendlyEventType));
          } else if (
            eventTypesData &&
            eventTypesData.collection &&
            Array.isArray(eventTypesData.collection)
          ) {
            setFormattedEventTypes(
              eventTypesData.collection.map(formatCalendlyEventType),
            );
          } else {
            console.error(
              "Unexpected event types data format:",
              eventTypesData,
            );
            setFormattedEventTypes([]);
          }
        } catch (err) {
          console.error("Error loading Calendly data:", err);
        } finally {
          setLoadingEvents(false);
        }
      };

      loadData();
    } else {
      // Reset data when disconnected
      setFormattedEvents([]);
      setFormattedEventTypes([]);
    }
  }, [isConnected, getEvents, getEventTypes]);
  const CALENDLY_AUTH_URL = "https://auth.calendly.com/oauth/authorize";
  // Handle connection status changes
  const handleConnect = () => {
    try {
      // Show loading state during connection
      setLoadingEvents(true);
      
      // Use the connect function from useCalendly hook
      connect();
      
      console.log("Initiating Calendly connection...");
    } catch (error) {
      console.error("Error connecting to Calendly:", error);
      setLoadingEvents(false);
    }
  };

  const handleDisconnect = async () => {
    if (
      window.confirm(
        "Are you sure you want to disconnect your Calendly account?",
      )
    ) {
      await disconnect();
    }
  };

  // Display loading state while checking connection
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <FontAwesomeIcon
          icon={faSpinner}
          spin
          className="text-yellow-500 text-4xl mb-4"
        />
        <p className="text-gray-500">Loading Calendly integration...</p>
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <div className="text-red-500 mb-4 text-xl">
          <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
          Error loading Calendly
        </div>
        <p className="text-gray-700 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Display connect button if not connected
  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 text-center">
          <h2 className="text-2xl font-semibold mb-4">Connect Your Calendar</h2>
          <p className="text-gray-600 mb-6">
            Connect your Calendly account to manage your meetings and schedule
            directly from this app.
          </p>
          <button
            onClick={handleConnect}
            className="bg-[#ee6e73] hover:bg-[#e8575d] text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center mx-auto transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faLink} className="mr-2" />
            Connect with Calendly
          </button>
        </div>
      </div>
    );
  }

  // Connected state with events and event types
  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header with connection status */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Meetings</h1>
            <div className="flex items-center">
              <span className="mr-2 text-sm text-green-600 flex items-center">
                <FontAwesomeIcon icon={faCheckCircle} className="mr-1" />
                Connected to Calendly
              </span>
              <button
                onClick={handleDisconnect}
                className="text-sm text-gray-600 hover:text-red-500 flex items-center"
              >
                <FontAwesomeIcon icon={faUnlink} className="mr-1" />
                Disconnect
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === "upcoming"
                  ? "border-b-2 border-yellow-500 text-yellow-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming Meetings
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === "eventTypes"
                  ? "border-b-2 border-yellow-500 text-yellow-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("eventTypes")}
            >
              Event Types
            </button>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto px-4 space-y-4 pb-40 scrollbar-hide">
        {loadingEvents ? (
          <div className="flex flex-col items-center justify-center h-64">
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              className="text-yellow-500 text-4xl mb-4"
            />
            <p className="text-gray-500">Loading events...</p>
          </div>
        ) : activeTab === "upcoming" ? (
          // Upcoming meetings list
          <>
            {formattedEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64">
                <p className="text-gray-500 mb-2">No upcoming meetings found</p>
                <a
                  href="https://calendly.com/app/scheduled_events/upcoming"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-500 hover:text-yellow-600 flex items-center"
                >
                  <span>Go to Calendly Dashboard</span>
                  <FontAwesomeIcon
                    icon={faExternalLinkAlt}
                    className="ml-1 text-xs"
                  />
                </a>
              </div>
            ) : (
              <>
                {formattedEvents.map((event) => (
                  <MeetingCard key={event.id} meeting={event} />
                ))}
              </>
            )}
          </>
        ) : (
          // Event types list
          <>
            {formattedEventTypes.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64">
                <p className="text-gray-500 mb-2">No event types found</p>
                <a
                  href="https://calendly.com/event_types/user/me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-500 hover:text-yellow-600 flex items-center"
                >
                  <span>Create Event Types in Calendly</span>
                  <FontAwesomeIcon
                    icon={faExternalLinkAlt}
                    className="ml-1 text-xs"
                  />
                </a>
              </div>
            ) : (
              <>
                {formattedEventTypes.map((eventType) => (
                  <EventTypeCard key={eventType.id} eventType={eventType} />
                ))}
              </>
            )}
          </>
        )}

        {/* Bottom spacer */}
        <div className="h-28 w-full"></div>
      </div>
    </div>
  );
};

// Card component for individual meetings
const MeetingCard = ({ meeting }) => {
  // Extract date components
  const eventDate = new Date(meeting.startTime);
  const formattedDate = meeting.date;
  const formattedTime = meeting.time;

  // Background color based on event type
  const getBgColor = () => {
    // You can customize this based on meeting types or statuses
    return "bg-blue-50";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-4">
      <div className="flex">
        {/* Left date column */}
        <div className="w-20 flex-shrink-0 flex flex-col items-center justify-center bg-gray-50 p-2">
          <div className="text-xs text-gray-500">
            {eventDate.toLocaleString("default", { month: "short" })}
          </div>
          <div className="text-xl font-bold">{eventDate.getDate()}</div>
          <div className="text-xs">
            {eventDate.toLocaleString("default", { weekday: "short" })}
          </div>
        </div>

        {/* Meeting details */}
        <div className="p-4 flex-1">
          <h3 className="font-semibold text-base mb-1">{meeting.title}</h3>

          <div className="flex flex-col space-y-1">
            <div className="flex items-center text-xs text-gray-500">
              <FontAwesomeIcon
                icon={faClock}
                className="mr-1 text-yellow-500 w-3.5"
              />
              <span>{formattedTime}</span>
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <FontAwesomeIcon
                icon={faVideo}
                className="mr-1 text-yellow-500 w-3.5"
              />
              <span>{meeting.location}</span>
            </div>
          </div>

          <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
            <span
              className={`text-xs px-2 py-0.5 ${getBgColor()} text-blue-800 rounded-md`}
            >
              {meeting.eventType.name}
            </span>
            <a
              href={meeting.uri}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-500 hover:text-blue-700 flex items-center"
            >
              <span>View Details</span>
              <FontAwesomeIcon
                icon={faExternalLinkAlt}
                className="ml-1 text-xs"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Card component for event types
const EventTypeCard = ({ eventType }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-4">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-base mb-1">{eventType.name}</h3>
            <div className="text-xs text-gray-500 mb-2">
              {eventType.duration} minute{eventType.duration !== 1 ? "s" : ""}
            </div>
            {eventType.description && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {eventType.description}
              </p>
            )}
          </div>
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: eventType.color || "#4945ef" }}
          ></div>
        </div>

        <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
          <span
            className={`text-xs px-2 py-0.5 ${eventType.active ? "bg-green-50 text-green-800" : "bg-gray-50 text-gray-600"} rounded-md`}
          >
            {eventType.active ? "Active" : "Inactive"}
          </span>
          <a
            href={eventType.schedulingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-500 hover:text-blue-700 flex items-center"
          >
            <span>Share Link</span>
            <FontAwesomeIcon
              icon={faExternalLinkAlt}
              className="ml-1 text-xs"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MeetingsComponent;
