// Simple local-only analytics for CAREapp
// Stores visit count and recent events in localStorage.
// No external network calls.
// Usage: import { trackPageView, trackEvent, getStats } from './analytics';

const VISIT_KEY = 'careapp_visits';
const EVENTS_KEY = 'careapp_events';

export function incrementVisit() {
  try {
    const v = parseInt(localStorage.getItem(VISIT_KEY) || '0', 10) + 1;
    localStorage.setItem(VISIT_KEY, String(v));
    trackEvent('visit', { count: v, ts: Date.now() });
    return v;
  } catch (e) {
    return null;
  }
}

export function trackEvent(name, payload = {}) {
  try {
    const arr = JSON.parse(localStorage.getItem(EVENTS_KEY) || '[]');
    arr.unshift({ name, payload, ts: Date.now() });
    // keep only last 200 events to limit storage
    localStorage.setItem(EVENTS_KEY, JSON.stringify(arr.slice(0,200)));
  } catch (e) {
    // ignore
  }
}

export function getStats() {
  try {
    const visits = parseInt(localStorage.getItem(VISIT_KEY) || '0', 10);
    const events = JSON.parse(localStorage.getItem(EVENTS_KEY) || '[]');
    return { visits, events };
  } catch (e) {
    return { visits: 0, events: [] };
  }
}
