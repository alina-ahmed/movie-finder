// ScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top-left corner
  }, [pathname]); // Dependency array: effect runs when pathname changes

  return null; // This component doesn't render any UI
};

export default ScrollToTop;