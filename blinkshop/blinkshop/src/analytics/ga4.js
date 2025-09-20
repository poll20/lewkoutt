// src/analytics/ga4.js
import ReactGA from "react-ga4";

export const GA_MEASUREMENT_ID = "G-TKJCXLWJ3W"; // aapka GA4 ID

// Initialize GA4
export const initGA = () => {
  ReactGA.initialize(GA_MEASUREMENT_ID);
  console.log("GA4 Initialized");
};

// Track Pageview
export const trackPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

// Track Event
export const trackEvent = ({ category, action, label, value }) => {
  ReactGA.event({ category, action, label, value });
};

// Set User Properties
export const setUserProperties = ({ user_id, user_type, device_type }) => {
  ReactGA.set({ user_id, user_type, device_type });
};
