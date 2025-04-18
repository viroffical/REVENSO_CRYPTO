/**
 * Utility functions for interacting with the Calendly API
 */

/**
 * Formats a Calendly event for display
 * @param {Object} event - The Calendly event object
 * @returns {Object} Formatted event object
 */
export const formatCalendlyEvent = (event) => {
  if (!event) return null;
  
  const uri = event.uri;
  const eventId = uri.split('/').pop();
  
  const startTime = new Date(event.start_time);
  const endTime = new Date(event.end_time);
  
  const formattedDate = startTime.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  const formattedStartTime = startTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  
  const formattedEndTime = endTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  
  return {
    id: eventId,
    title: event.name,
    startTime: startTime,
    endTime: endTime,
    date: formattedDate,
    time: `${formattedStartTime} - ${formattedEndTime}`,
    duration: event.duration,
    location: event.location?.type || 'Web conferencing',
    status: event.status,
    cancellation: event.cancellation,
    uri: uri,
    invitees: event.invitees_counter?.total || 0,
    eventType: {
      name: event.event_type_name,
      id: (event.event_type || '').split('/').pop()
    }
  };
};

/**
 * Formats a Calendly event type for display
 * @param {Object} eventType - The Calendly event type object
 * @returns {Object} Formatted event type object
 */
export const formatCalendlyEventType = (eventType) => {
  if (!eventType) return null;
  
  const uri = eventType.uri;
  const id = uri.split('/').pop();
  
  return {
    id,
    name: eventType.name,
    description: eventType.description,
    duration: eventType.duration,
    uri: uri,
    slug: eventType.slug,
    active: eventType.active,
    color: eventType.color,
    schedulingUrl: eventType.scheduling_url,
    secret: eventType.secret
  };
};

/**
 * Parses a Calendly webhook event
 * @param {Object} webhook - The webhook event from Calendly
 * @returns {Object} Parsed webhook event
 */
export const parseCalendlyWebhook = (webhook) => {
  if (!webhook || !webhook.payload) return null;
  
  const { event, payload } = webhook;
  
  return {
    eventName: event,
    payload: {
      event: payload.event ? formatCalendlyEvent(payload.event) : null,
      invitee: payload.invitee || null,
      scheduling_url: payload.scheduling_url || null,
      cancel_url: payload.cancel_url || null,
      reschedule_url: payload.reschedule_url || null
    }
  };
};