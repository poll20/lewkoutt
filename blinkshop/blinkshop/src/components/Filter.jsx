import React, { useState } from "react";
import { useBio } from "./BioContext";
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import CatlogPriceFilter from "./CatlogPriceFilter";
import "./Filter.css";

export default function Filter() {
  const { wearsdata, filters, setFilters } = useBio();
  const navigate = useNavigate();

  const [showPanel, setShowPanel] = useState(true);
  const [selectedSizes, setSelectedSizes] = useState({
    "": [],
    "Bottom Wear": [],
  });

  const sizeOptions = {
    "": ["S", "M", "L","XS"],
  
  };

  const categoryList = [...new Set(wearsdata.map((cat) => cat.category))];
  const sortOptions = ["Price: High to Low", "Price: Low to High"];

  const handleSizeSelection = (category, size) => {
    setSelectedSizes((prev) => {
      const updated = { ...prev };
      if (updated[category].includes(size)) {
        updated[category] = updated[category].filter((s) => s !== size);
      } else {
        updated[category] = [...updated[category], size];
      }
      return updated;
    });

    setFilters((prev) => ({
      ...prev,
      sizes:
        category === "" || category === "Bottom Wear"
          ? [...new Set([...prev.sizes, size])]
          : prev.sizes,
    }));
  };

  const handleColorChange = (color) => {
    setFilters((prev) => {
      const updated = [...prev.color];
      if (updated.includes(color)) {
        updated.splice(updated.indexOf(color), 1);
      } else {
        updated.push(color);
      }
      return { ...prev, color: updated };
    });
  };

  const handleCategoryChange = (category) => {
    setFilters((prev) => {
      const updated = [...prev.categories];
      if (updated.includes(category)) {
        updated.splice(updated.indexOf(category), 1);
      } else {
        updated.push(category);
      }
      return { ...prev, categories: updated };
    });
  };

  const handleSortChange = (option) => {
    setFilters((prev) => ({ ...prev, sortBy: option }));
  };

  const handleApplyFilter = () => {
    setShowPanel(false);
    navigate(-1);
  };

  const handleReset = () => {
    setFilters({
      pricerangemin: 300,
      pricerangemax: 3000,
      sizes: [],
      bottomsizes: [],
      color: [],
      categories: [],
      occasion: [],
      nackline: [],
      clothingmaterial: [],
      styletype: [],
      printtype: [],
      discount: [],
      sortBy: "",
    });
    navigate(-1);
  };

  return (
    <>
      {showPanel && (
        <div
          className="bottom-panel"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            backgroundColor: "#fff",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            boxShadow: "0 -4px 15px rgba(0,0,0,0.15)",
            padding: "20px",
            zIndex: 1000,
            minHeight: "60vh",
            overflowY: "auto",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <h4
              style={{
                fontSize: "18px",
                fontWeight: "700",
                margin: 0,
                color: "#222",
              }}
            >
              Filters
            </h4>
            <span
              style={{
                cursor: "pointer",
                color: "#666",
                transition: "color 0.3s ease",
                
              }}
              onMouseEnter={(e) => (e.target.style.color = "#000")}
              onMouseLeave={(e) => (e.target.style.color = "#666")}
              onClick={() => {setShowPanel(false),navigate(-1)}}
            >
              <RxCross1 size={22} />
            </span>
          </div>

          {/* SORT BY */}
          <div style={{ marginBottom: "20px" }}>
            <h5 style={{ fontSize: "15px", fontWeight: "600" }}>Sort By</h5>
            {sortOptions.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSortChange(option)}
                style={{
                  border:
                    filters.sortBy === option
                      ? "1px solid #F15A29"
                      : "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "10px",
                  cursor: "pointer",
                  marginBottom: "8px",
                  backgroundColor:
                    filters.sortBy === option ? "#FFF5F2" : "transparent",
                  transition: "all 0.2s ease",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "14px",
                    color: filters.sortBy === option ? "#F15A29" : "#333",
                    fontWeight: filters.sortBy === option ? "600" : "400",
                  }}
                >
                  {option}
                </p>
              </div>
            ))}
          </div>

          {/* PRICE RANGE */}
          <div style={{ marginBottom: "20px" }}>
            <h5 style={{ fontSize: "15px", fontWeight: "600" }}>Price Range</h5>
            <CatlogPriceFilter />
          </div>

          {/* SIZES */}
          <div style={{ marginBottom: "20px" }}>
            <h5 style={{ fontSize: "15px", fontWeight: "600" }}>Sizes</h5>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              {Object.keys(sizeOptions).map((category) => (
                <div key={category}>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      marginBottom: "6px",
                    }}
                  >
                    {category}
                  </p>
                  <div>
                    {sizeOptions[category].map((size, index) => (
                      <button
                        key={index}
                        style={{
                          margin: "3px",
                          padding: "6px 10px",
                          borderRadius: "5px",
                          border: selectedSizes[category].includes(size)
                            ? "1px solid #F15A29"
                            : "1px solid #ccc",
                          backgroundColor: selectedSizes[category].includes(size)
                            ? "#FFF5F2"
                            : "#fff",
                          color: selectedSizes[category].includes(size)
                            ? "#F15A29"
                            : "#333",
                          fontSize: "12px",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
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

          {/* CATEGORY */}
          {/* <div style={{ marginBottom: "20px" }}>
            <h5 style={{ fontSize: "15px", fontWeight: "600" }}>Category</h5>
            {categoryList.map((category, id) => (
              <div
                key={id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <p style={{ margin: 0, fontSize: "14px" }}>{category}</p>
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
              </div>
            ))}
          </div> */}

          {/* FOOTER BUTTONS */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "25px",
            }}
          >
            <button
              onClick={handleReset}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                backgroundColor: "#fff",
                color: "#444",
                fontWeight: "500",
              }}
            >
              Reset
            </button>
            <button
              onClick={handleApplyFilter}
              style={{
                flex: 1,
                marginLeft: "10px",
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "black",
                color: "#fff",
                fontWeight: "600",
              }}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </>
  );
}
