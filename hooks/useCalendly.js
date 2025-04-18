import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

export function useCalendly() {
  const [isConnected, setIsConnected] = useState(false);
  const [calendlyUser, setCalendlyUser] = useState(null);
  const [eventTypes, setEventTypes] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Check if the user is connected to Calendly
  const checkConnection = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/calendly/status');
      
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
  }, []);

  // Connect to Calendly
  const connect = useCallback(() => {
    window.location.href = '/api/calendly/auth';
  }, []);

  // Disconnect from Calendly
  const disconnect = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/calendly/disconnect', {
        method: 'POST',
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
  }, []);

  // Get Calendly event types
  const getEventTypes = useCallback(async () => {
    if (!isConnected) return [];
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/calendly/event-types');
      
      if (!response.ok) {
        throw new Error('Failed to fetch Calendly event types');
      }
      
      const data = await response.json();
      setEventTypes(data.collection);
      
      return data.collection;
    } catch (err) {
      console.error('Error fetching Calendly event types:', err);
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [isConnected]);

  // Get Calendly events
  const getEvents = useCallback(async () => {
    if (!isConnected) return [];
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/calendly/events');
      
      if (!response.ok) {
        throw new Error('Failed to fetch Calendly events');
      }
      
      const data = await response.json();
      setEvents(data.collection);
      
      return data.collection;
    } catch (err) {
      console.error('Error fetching Calendly events:', err);
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [isConnected]);

  // Check connection status on component mount
  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

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
  };
}