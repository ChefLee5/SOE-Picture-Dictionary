import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { captureUtms, trackPageView } from '../utils/analytics';

/**
 * useAnalytics — Hook to capture UTM parameters and track page transitions automatically.
 */
export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // 1. Capture/persist any incoming UTM parameters
    captureUtms();

    // 2. Track page view with clean path & title
    const timer = setTimeout(() => {
      trackPageView(location.pathname + location.search, document.title);
    }, 150);

    return () => clearTimeout(timer);
  }, [location.pathname, location.search]);
};

export default useAnalytics;
