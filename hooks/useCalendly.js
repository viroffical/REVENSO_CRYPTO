import { useState, useEffect, useCallback } from 'react';

export function useCalendly() {
  const [isConnected, setIsConnected] = useState(false);
  const [calendlyUser, setCalendlyUser] = useState(null);
  const [eventTypes, setEventTypes] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  
  // Get the current user ID from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('revenso_user');
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        setUserId(userObj.id);
      } catch (err) {
        console.error('Error parsing user from localStorage:', err);
      }
    }
  }, []);
  
  // Check if the user is connected to Calendly
  const checkConnection = useCallback(async () => {
    if (!userId) return false;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/calendly/status?user_id=${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to check Calendly connection status');
      }
      
      const data = await response.json();
      setIsConnected(data.connected);
      
      if (data.connected) {
        setCalendlyUser({
          uid: data.calendlyUid,
          connectedSince: data.connectedSince,
        });
      } else {
        setCalendlyUser(null);
      }
      
      return data.connected;
    } catch (err) {
      console.error('Error checking Calendly connection:', err);
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Connect to Calendly
  const connect = useCallback(() => {
    if (!userId) {
      setError('User is not logged in');
      return;
    }
    window.location.href = `/api/calendly/auth?user_id=${userId}`;
  }, [userId]);

  // Disconnect from Calendly
  const disconnect = useCallback(async () => {
    if (!userId) return false;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/calendly/disconnect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to disconnect from Calendly');
      }
      
      setIsConnected(false);
      setCalendlyUser(null);
      setEventTypes([]);
      setEvents([]);
      
      return true;
    } catch (err) {
      console.error('Error disconnecting from Calendly:', err);
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Get Calendly event types
  const getEventTypes = useCallback(async () => {
    if (!isConnected || !userId) return [];
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/calendly/event-types?user_id=${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch Calendly event types');
      }
      
      const data = await response.json();
      console.log('Event types data from API:', data);
      
      // Handle the data structure correctly
      const typesCollection = data.collection || [];
      setEventTypes(typesCollection);
      
      return typesCollection;
    } catch (err) {
      console.error('Error fetching Calendly event types:', err);
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [isConnected, userId]);

  // Get Calendly events
  const getEvents = useCallback(async () => {
    if (!isConnected || !userId) return [];
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/calendly/events?user_id=${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch Calendly events');
      }
      
      const data = await response.json();
      console.log('Events data from API:', data);
      
      // Handle the data structure correctly
      const eventsCollection = data.collection || [];
      setEvents(eventsCollection);
      
      return eventsCollection;
    } catch (err) {
      console.error('Error fetching Calendly events:', err);
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [isConnected, userId]);

  // Check connection status when userId changes
  useEffect(() => {
    if (userId) {
      checkConnection();
    }
  }, [userId, checkConnection]);

  return {
    isConnected,
    calendlyUser,
    eventTypes,
    events,
    loading,
    error,
    connect,
    disconnect,
    checkConnection,
    getEventTypes,
    getEvents,
    userId,
  };
}