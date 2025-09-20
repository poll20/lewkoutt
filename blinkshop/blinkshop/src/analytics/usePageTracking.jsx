// src/analytics/usePageTracking.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "./ga4";

export default function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);
}
