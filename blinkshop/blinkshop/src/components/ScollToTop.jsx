import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import "./universal.css"
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Always scroll to top on route change
  }, [pathname]);

  return null;
};

export default ScrollToTop;
