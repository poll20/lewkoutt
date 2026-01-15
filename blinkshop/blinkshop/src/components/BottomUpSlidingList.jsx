
import React, { useState, useEffect } from "react";
import "./BottomUpSlidingList.css";
import { NavLink, useNavigate } from "react-router-dom";

const BottomUpSlidingList = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isOpen, setIsOpen] = useState(true); // Controls panel visibility
  const [activeCategory, setActiveCategory] = useState(null); // Tracks active dropdown
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  // Get unique categories
  const uniqueCategories = [...new Set(categories.map((e) => e.category))];

  // Fetch categories from the API
  const rentData = async () => {
    try {
      let rentRes = await fetch(`${apiUrl}/rent?operation=all`);
      let finalRes = await rentRes.json();
      setCategories(finalRes);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    rentData();
  }, []);

  // Toggle sliding panel
  const togglePanel = () => {
    setIsOpen(!isOpen);
    setActiveCategory(null); // Close all dropdowns
    navigate(-1); // Go back to previous route
  };

  // Toggle category dropdown and set tags
  const toggleDropdown = (categoryTitle) => {
    if (activeCategory === categoryTitle) {
      setActiveCategory(null);
      setTags([]); // Clear tags when dropdown is closed
    } else {
      setActiveCategory(categoryTitle);
      // Filter and set tags for the active category
      const filteredTags = categories
        .filter((e) => e.category === categoryTitle)
        .map((e) => e.tag)
        .filter((tag) => tag); // Remove null or undefined
      setTags(filteredTags);
    }
  };

  return (
    <div className="btm_up-container">
      {isOpen && (
        <div className="btm_up-sliding-panel">
          <div className="btm_up-panel-header">
            <h4>Select Category</h4>
            <button className="btm_up-close-btn" onClick={togglePanel}>
              ✕
            </button>
          </div>
          <div className="btm_up-panel-content">
            {uniqueCategories.map((category, index) => (
              <div key={index} className="btm_up-category" style={{ margin: "5% 0" }}>
                <div
                  style={{ marginLeft: "5%", borderBottom: "1px solid gray" }}
                  onClick={() => toggleDropdown(category)}
                  className="btm_up-category-title"
                >
                  {category}
                </div>
                {activeCategory === category && (
                  <div className="btm_up-dropdown">
                    {tags.map((option, idx) => (
                      <div key={idx} className="btm_up-dropdown-option">
                       <NavLink to={`/rent/${option}`} className="navlink">{option}</NavLink> 
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomUpSlidingList;
