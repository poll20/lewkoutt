// import React, { useState } from "react";
// import "./FilterComponent.css";

// const FilterComponent = () => {
//   const [showSortPanel, setShowSortPanel] = useState(false);
//   const [showSizePanel, setShowSizePanel] = useState(false);
//   const [selectedSortOption, setSelectedSortOption] = useState("Sort By");
//   const [selectedSizeOption, setSelectedSizeOption] = useState("Size");
//   const [currentCategory, setCurrentCategory] = useState("Top Wear");

//   const sortOptions = [
//     "Price: Low to High",
//     "Price: High to Low",
//     "New Arrival",
//     "Best Seller",
//     "Discount",
//   ];

//   const sizeOptions = {
//     "Top Wear": ["S", "M", "L", "XL", "XXL", "XXXL"],
//     "Bottom Wear": ["S", "M", "L", "XL", "XXL", "XXXL"],
//   };

//   const handleSortSelection = (option) => {
//     setSelectedSortOption(option);
//     setShowSortPanel(false); // Close the panel
//   };

//   const handleSizeSelection = (option) => {
//     setSelectedSizeOption(option);
//     setShowSizePanel(false); // Close the panel
//   };

//   return (
//     <div className="filter-container">
//       <div className="filter-row">
//         <button className="filter-btn" onClick={() => setShowSortPanel(true)}>
//           {selectedSortOption}
//         </button>
//         <button className="filter-btn" onClick={() => setShowSizePanel(true)}>
//           {selectedSizeOption}
//         </button>
//       </div>

//       {/* Sort Panel */}
//       {showSortPanel && (
//         <div className="bottom-panel">
//           <div className="panel-header">
//             <h4>Sort Options</h4>
//             <button className="close-btn" onClick={() => setShowSortPanel(false)}>
//               ✕
//             </button>
//           </div>
//           <div className="panel-options">
//             {sortOptions.map((option, index) => (
//               <button
//                 key={index}
//                 className={`panel-option-btn ${
//                   selectedSortOption === option ? "selected" : ""
//                 }`}
//                 onClick={() => handleSortSelection(option)}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Size Panel */}
//       {showSizePanel && (
//         <div className="bottom-panel">
//           <div className="panel-header">
//             <h4>Size Options</h4>
//             <button className="close-btn" onClick={() => setShowSizePanel(false)}>
//               ✕
//             </button>
//           </div>
//           {/* Category Toggle */}
//           <div className="category-toggle">
//             {Object.keys(sizeOptions).map((category) => (
//               <button
//                 key={category}
//                 className={`category-btn ${
//                   currentCategory === category ? "active" : ""
//                 }`}
//                 onClick={() => setCurrentCategory(category)}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>
//           <div className="panel-options">
//             {sizeOptions[currentCategory].map((size, index) => (
//               <button
//                 key={index}
//                 className={`panel-option-btn ${
//                   selectedSizeOption === size ? "selected" : ""
//                 }`}
//                 onClick={() => handleSizeSelection(size)}
//               >
//                 {size}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FilterComponent;

import React, { useState } from "react";
import "./FilterComponent.css";

const FilterComponent = () => {
  const [showSortPanel, setShowSortPanel] = useState(false);
  const [showSizePanel, setShowSizePanel] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [selectedSizes, setSelectedSizes] = useState({
    "Top Wear": [],
    "Bottom Wear": [],
  });

  const sortOptions = [
    "Price: Low to High",
    "Price: High to Low",
    "New Arrival",
    "Best Seller",
    "Discount",
  ];

  const sizeOptions = {
    "Top Wear": ["S", "M", "L", "XL", "XXL", "XXXL","Free Size"],
    "Bottom Wear": ["S", "M", "L", "XL", "XXL", "XXXL","Free Size"],
  };

  const handleSortSelection = (option) => {
    setSelectedSortOption(option);
    setShowSortPanel(false);
  };

  const handleSizeSelection = (category, size) => {
    setSelectedSizes((prevSizes) => {
      const updatedSizes = { ...prevSizes };
      if (updatedSizes[category].includes(size)) {
        // Remove the size if already selected
        updatedSizes[category] = updatedSizes[category].filter(
          (item) => item !== size
        );
      } else {
        // Add the size if not selected
        updatedSizes[category].push(size);
      }
      return updatedSizes;
    });
  };

  const removeSortFilter = () => {
    setSelectedSortOption("");
  };

  const removeSizeFilter = (category, size) => {
    setSelectedSizes((prevSizes) => {
      const updatedSizes = { ...prevSizes };
      updatedSizes[category] = updatedSizes[category].filter(
        (item) => item !== size
      );
      return updatedSizes;
    });
  };

  const togglePanel = (type) => {
    if (type === "sort") {
      setShowSortPanel(!showSortPanel);
      setShowSizePanel(false);
    } else if (type === "size") {
      setShowSizePanel(!showSizePanel);
      setShowSortPanel(false);
    }
  };

  return (
    <div className="filter-container">
      <div className="filter-row">
        {/* Sort Button with Selected Option */}
        <button className="filter-btn" onClick={() => togglePanel("sort")}>
          {selectedSortOption ? (
            <div className="selected-filter">
              {selectedSortOption}{" "}
              <span
                className="remove-filter"
                onClick={(e) => {
                  e.stopPropagation();
                  removeSortFilter();
                }}
              >
                ✕
              </span>
            </div>
          ) : (
            "Sort By"
          )}
        </button>

        {/* Size Button with Selected Sizes */}
        <button className="filter-btn" onClick={() => togglePanel("size")}>
          {Object.entries(selectedSizes)
            .flatMap(([category, sizes]) =>
              sizes.map((size) => (
                <span className="selected-filter" key={`${category}-${size}`}>
                  {category}: {size}{" "}
                  <span
                    className="remove-filter"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSizeFilter(category, size);
                    }}
                  >
                    ✕
                  </span>
                </span>
              ))
            )
            .reduce(
              (acc, cur) => (acc.length ? [...acc, " | ", cur] : [cur]),
              []
            )}
          {!Object.values(selectedSizes).flat().length && "Size"}
        </button>
      </div>

      {/* Sort Panel */}
      {showSortPanel && (
        <div className="bottom-panel">
          <div className="panel-header">
            <h4>Sort Options</h4>
            <button className="close-btn" onClick={() => setShowSortPanel(false)}>
              ✕
            </button>
          </div>
          <div className="panel-options">
            {sortOptions.map((option, index) => (
              <div
                key={index}
                className={`panel-option-btn ${
                  selectedSortOption === option ? "selected" : ""
                }`}
                onClick={() => handleSortSelection(option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Size Panel */}
      {showSizePanel && (
        <div className="bottom-panel">
          <div className="panel-header">
            <h4>Size Options</h4>
            <button className="close-btn" onClick={() => setShowSizePanel(false)}>
              ✕
            </button>
          </div>
          <div className="panel-options">
            {Object.keys(sizeOptions).map((category) => (
              <div key={category}>
                <h5 className="category-title">{category}</h5>
                <div className="size-options">
                  {sizeOptions[category].map((size, index) => (
                    <button
                      key={index}
                      className={`size-btn ${
                        selectedSizes[category].includes(size) ? "selected" : ""
                      }`}
                      onClick={() => handleSizeSelection(category, size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
