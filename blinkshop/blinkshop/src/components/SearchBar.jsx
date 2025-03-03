import React, { useState, useEffect, useRef } from 'react';
import './SearchBar.css';
import { CiSearch } from "react-icons/ci";
 // Importing Search Icon

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle the search bar
  const [isMobile, setIsMobile] = useState(false); // State to track screen size
  const searchContainerRef = useRef(null); // Ref to track clicks outside

  // Function to handle screen size change
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768); // You can adjust the breakpoint as needed
  };

  useEffect(() => {
    // Check screen size on component mount
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Function to toggle search bar
  const handleSearchToggle = () => {
    setIsOpen(!isOpen); // Toggle search bar visibility
  };

  // Handle closing the search bar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the search bar is open and the click is outside the search container, close it
      if (isOpen && searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Add event listener for clicks outside
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Clean up the event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]); // Re-run this effect when `isOpen` changes

  return (
    <div ref={searchContainerRef}>
      {/* Full-screen overlay for mobile */}
      {isMobile && isOpen && <div className="mobile-overlay"></div>}

      {/* Container for the search bar and icon */}
      <div className="search-container">
        {!isMobile ? (
          <div className={`search-bar ${isOpen ? 'active' : ''}`}>
            <input
              type="text"
              placeholder="Search here..."
              className={`search-input ${isOpen ? 'show' : ''}`}
            />
          </div>
        ) : (
          // Mobile search bar
          <div className={`mobile-search-bar ${isOpen ? 'slide-down' : ''}`}>
            <input
              type="text"
              placeholder="Search here..."
              className="mobile-search-input"
            />
          </div>
        )}
        <CiSearch size={30} onClick={handleSearchToggle} />
      </div>
    </div>
  );
};

export default SearchBar;
