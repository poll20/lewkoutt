// // import React, { useState } from "react";
// // import "./BottomUpSlidingList.css";
// // import { useNavigate } from "react-router-dom";

// // const BottomUpSlidingList = () => {
// //   const [isOpen, setIsOpen] = useState(true); // Sliding panel visibility
// //   const [activeCategory, setActiveCategory] = useState(null); // Tracks active dropdown
// //   const navigate = useNavigate();

// //   // Categories and their options
// //   const categories = [
// //     {
// //       title: "Lehenga",
// //       options: ["Haldi Lehenga", "Bridal Lehenga", "Reception Lehenga"],
// //     },
// //     {
// //       title: "Gown",
// //       options: ["Pre-Wedding Gown", "Wedding Gown", "Evening Gown"],
// //     },
// //   ];

// //   // Toggle sliding panel
// //   const togglePanel = () => {
// //     setIsOpen(!isOpen);
// //     setActiveCategory(null); // Reset active dropdown
// //     navigate(-1);
// //   };

// //   // Toggle dropdown for a category
// //   const toggleDropdown = (categoryTitle) => {
// //     if (activeCategory === categoryTitle) {
// //       setActiveCategory(null); // Close if already active
// //     } else {
// //       setActiveCategory(categoryTitle); // Set the new active category
// //     }
// //   };

// //   return (
// //     <div className="container">
// //       {/* Bottom-Up Sliding Panel */}
// //       {isOpen && (
// //         <div className="sliding-panel">
// //           <div className="panel-header">
// //             <h4>Select Category</h4>
// //             <button className="close-btn" onClick={togglePanel}>
// //               ✕
// //             </button>
// //           </div>

// //           <div className="panel-options">
// //             {categories.map((category, index) => (
// //               <div key={index} className="option">
// //                 {/* Category Button */}
// //                 <button
// //                   className="option-btn"
// //                   onClick={() => toggleDropdown(category.title)}
// //                 >
// //                   {category.title}
// //                   <span className="arrow">
// //                     {activeCategory === category.title ? "▲" : "▼"}
// //                   </span>
// //                 </button>

// //                 {/* Dropdown Options */}
// //                 {activeCategory === category.title && (
// //                   <div className="dropdown">
// //                     {category.options.map((option, idx) => (
// //                       <div key={idx} className="dropdown-option">
// //                         {option}
// //                       </div>
// //                     ))}
// //                   </div>
// //                 )}
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default BottomUpSlidingList;

// import React, { useState,useEffect } from "react";
// import "./BottomUpSlidingList.css";
// import { useNavigate } from "react-router-dom";

// const BottomUpSlidingList = () => {
//   const [isOpen, setIsOpen] = useState(true); // Controls panel visibility
//   const [activeCategory, setActiveCategory] = useState(null); // Tracks active dropdown
//   const [categories,setCategories]=useState([])
//   const [tags,settags]=useState([])
//   const navigate = useNavigate();
// const dropcategory=categories.map((e)=>(
//     e.category
// ))

// let uniquecate=[... new Set(dropcategory)]
// console.log(uniquecate)

//   // Categories and their sub-options
// //   const categories = [
// //     {
// //       title: "Lehenga",
// //       options: ["Haldi Lehenga", "Bridal Lehenga", "Reception Lehenga"],
// //     },
// //     {
// //       title: "Gown",
// //       options: ["Pre-Wedding Gown", "Wedding Gown", "Evening Gown"],
// //     },
// //   ];

// let rentdata=async()=>{
//     let rentres=await fetch("http://localhost:3000/rent")
//     let finalres=await rentres.json()
//     console.log(finalres)
//     setCategories(finalres)
// }
// useEffect(()=>{
//     rentdata()
// },[])

//   // Toggle sliding panel
//   const togglePanel = () => {
//     setIsOpen(!isOpen);
//     setActiveCategory(null); // Close all dropdowns
//     navigate(-1); // Go back to previous route
//   };

//   // Toggle category dropdown
//   const toggleDropdown = (categoryTitle) => {
//     console.log("sex",categoryTitle)
//     console.log("orem"+uniquecate)
//     let tag=categories.map((e)=>{
//         if(e.category==categoryTitle){
//             return e.tag
//         }
       
//     })
//     console.log(tag)
//     settags(tag)
//     setActiveCategory((prev) => (prev === categoryTitle ? null : categoryTitle));
   
    
//   };

//   return (
//     <div className="btm_up-container">
//       {isOpen && (
//         <div className="btm_up-sliding-panel">
//           <div className="btm_up-panel-header">
//             <h4>Select Category</h4>
//             <button className="btm_up-close-btn" onClick={togglePanel}>
//               ✕
//             </button>
//           </div>
//           <div className="btm_up-panel-content">
//             {uniquecate.map((category, index) => (
//               <div key={index} className="btm_up-category"style={{margin:"5% 0"}} >
//                 <div style={{marginLeft:"5%",borderBottom:"1px solid gray"}}
//                   onClick={() => toggleDropdown(category)}
//                   className="btm_up-category-title"
//                 >
//                   {category}
//                 </div>
//                 {activeCategory === category && (
//                   <div className="btm_up-dropdown">
//                     {tags.map((option, idx) => (
//                       <div key={idx} className="btm_up-dropdown-option">
//                         {option}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BottomUpSlidingList;

import React, { useState, useEffect } from "react";
import "./BottomUpSlidingList.css";
import { NavLink, useNavigate } from "react-router-dom";

const BottomUpSlidingList = () => {
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
      let rentRes = await fetch("http://localhost:3000/rent?operation=all");
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
