// import React, { useState, useRef, useEffect } from 'react';
// import { useBio } from './BioContext';
// // import { NavLink } from 'react-router-dom';
// // import { BiArrowBack } from "react-icons/bi";
// import { useNavigate } from 'react-router-dom';
// import "./Filter.css";
// import CatlogPriceFilter from './CatlogPriceFilter';
// import { MdCurrencyRupee } from "react-icons/md";

// export default function Filter() {

//     let { wearsdata,filters,setFilters, handleapplymyfilters } = useBio();
//     const [selectedFilter, setSelectedFilter] = useState('pricerange'); // Tracks selected filter
//     // const [filters, setFilters] = useState({
//     //     pricerange: [0, 1000],
//     //     sizes: [],
//     //     bottomsizes: [],
//     //     color: [],
//     //     categories: []
//     // });

//     const navigate=useNavigate()
//     // let { wearsdata } = useBio();
//     console.log(wearsdata);

//     const handleFilterClick = (filterName) => {
//         setSelectedFilter(filterName);
//     };

//     const [issOpen, ssetIsOpen] = useState(false);
//     const [subMenu, setSubMenu] = useState(null);
//     let [categorydata, setcategorydata] = useState([]);
//     let [applybtndisplay,setapplybtndisplay]=useState(true)
//     const dropdownRef = useRef(null);
//     const [tags, settags] = useState([]);

//     const toggleDropdown = () => {
//         ssetIsOpen(!issOpen);
//     };

//     const handleSubMenu = (category) => {
//         console.log("toto", category);
//         setSubMenu(category === subMenu ? null : category);

//         let taging = wearsdata.filter((tags) => {
//             return tags.category === category;
//         });
//         let alltags = taging.map((e) => {
//             return e.tag;
//         });
//         let distincttag = [...new Set(alltags)];
//         settags(distincttag);
//     };

//     let categoryy = wearsdata.map((cat) => {
//         return cat.category;
//     });

//     let distinctcat = [...new Set(categoryy)];
//     console.log("aaaa", distinctcat);

//     let closeslidecategorynav = () => {
//         setSideNavbarOpen(!sideNavbarOpen);
//     }

//     const handlePriceChange = (e) => { 
//         setFilters({ ...filters, pricerange: [0, e.target.value] });
//     };

//     const handleSizeChange = (type, size) => {
//         setFilters((prev) => {
//             const updatedSizes = [...prev[type]];
//             if (updatedSizes.includes(size)) {
//                 updatedSizes.splice(updatedSizes.indexOf(size, 1));
//             } else if (updatedSizes.length < 2) {
//                 updatedSizes.push(size);
//             }
//             return { ...prev, [type]: updatedSizes };
//         });
//     };

//     const handleColorChange = (color) => {
//         setFilters((prev) => {
//             const updatedColors = [...prev.color];
//             if (updatedColors.includes(color)) {
//                 updatedColors.splice(updatedColors.indexOf(color), 1);
//             } else {
//                 updatedColors.push(color);
//             }
//             return { ...prev, color: updatedColors };
//         });
//     };
//     const handleOccasionChange = (occasion) => {
//         setFilters((prev) => {
//             const updatedOccasion = [...prev.occasion];
//             if (updatedOccasion.includes(occasion)) {
//                 updatedOccasion.splice(updatedOccasion.indexOf(occasion), 1);
//             } else {
//                 updatedOccasion.push(occasion);
//             }
//             return { ...prev, occasion: updatedOccasion};
//         });
//     };

//     const handleNakelineChange = (occasion) => {
//         setFilters((prev) => {
//             const updatedOccasion = [...prev.nackline];
//             if (updatedOccasion.includes(occasion)) {
//                 updatedOccasion.splice(updatedOccasion.indexOf(occasion), 1);
//             } else {
//                 updatedOccasion.push(occasion);
//             }
//             return { ...prev, nackline: updatedOccasion};
//         });
//     };

//     const handleClothingmaterialChange = (occasion) => {
//         setFilters((prev) => {
//             const updatedOccasion = [...prev.clothingmaterial];
//             if (updatedOccasion.includes(occasion)) {
//                 updatedOccasion.splice(updatedOccasion.indexOf(occasion), 1);
//             } else {
//                 updatedOccasion.push(occasion);
//             }
//             return { ...prev, clothingmaterial: updatedOccasion};
//         });
//     };
//     const handlePrinttypeChange = (occasion) => {
//         setFilters((prev) => {
//             const updatedOccasion = [...prev.printtype];
//             if (updatedOccasion.includes(occasion)) {
//                 updatedOccasion.splice(updatedOccasion.indexOf(occasion), 1);
//             } else {
//                 updatedOccasion.push(occasion);
//             }
//             return { ...prev, printtype: updatedOccasion};
//         });
//     };

//     const handleStyletypeChange = (occasion) => {
//         setFilters((prev) => {
//             const updatedOccasion = [...prev.styletype];
//             if (updatedOccasion.includes(occasion)) {
//                 updatedOccasion.splice(updatedOccasion.indexOf(occasion), 1);
//             } else {
//                 updatedOccasion.push(occasion);
//             }
//             return { ...prev, styletype: updatedOccasion};
//         });
//     };
    

//     const handleCategoryChange = (category) => {
//         setFilters((prev) => {
//             const updatedCategories = [...prev.categories];
//             if (updatedCategories.includes(category)) {
//                 updatedCategories.splice(updatedCategories.indexOf(category), 1);
//             } else {
//                 updatedCategories.push(category);
//             }
//             return { ...prev, categories: updatedCategories };
//         });
//     };
//     const handleDiscountChange = (category) => {
//         setFilters((prev) => {
//             const updatedCategories = [...prev.discount];
//             if (updatedCategories.includes(category)) {
//                 updatedCategories.splice(updatedCategories.indexOf(category), 1);
//             } else {
//                 updatedCategories.push(category);
//             }
//             return { ...prev, discount: updatedCategories };
//         });
//     };

//         const handleSortChange = (option) => {
//         setFilters((prev) => ({
//             ...prev,
//             sortBy: option
//         }));
//     };

//     const sizeOptions = {
//         "Top Wear": ["s", "m", "l", "xl", "xxl", "xxxl"],
//         "Bottom Wear": ["24", "26", "28", "30", "32", "34", "36"],
//     };

//     const [selectedSizes, setSelectedSizes] = useState({
//         "Top Wear": [],
//         "Bottom Wear": [],
//     });

//     const handleSizeSelection = (category, size) => {
//         console.log(category,'tob')
//         setSelectedSizes((prev) => {
//             const updated = { ...prev };
//             if (updated[category].includes(size)) {
//                 updated[category] = updated[category].filter((s) => s !== size);
//             } else {
//                 updated[category] = [...updated[category], size];
//             }
//             return updated;
//         });
//     handleSizeChange(category === "Top Wear"||"Bottom Wear" ? "sizes" : "bottomsizes", size);
//     // console.log("rr",rr)
//     };

//     const handleremoveallfilter=()=>{
//         setFilters(
//             {
//                 pricerangemin:300,
//                 pricerangemax:3000,
//                  sizes: [],
//                 bottomsizes: [],
//                 color: [],
//                 categories: [],
//                 occasion: [],
//                 nackline: [],
//                 clothingmaterial: [],
//                 styletype: [],
//                 printtype: [],
//                 discount: [],
//                  sortBy: "" // reset sort too
//         })
//         navigate(-1)
       
//     }
// console.log(filters)

// const handleStapeBack=()=>{
// navigate(-1)
// }
// let {pricerangemin,pricerangemax,sizes,color,categories,occasion,nackline,clothingmaterial,styletype,printtype,discount, sortBy}=filters
// console.log(pricerangemax,sizes,color,categories,  "lollla")
// const handleApplyFilter=()=>{ 
//  navigate(-1)
// }
// useEffect(()=>{
//     if(pricerangemax==3000 && pricerangemin==300 && sizes.length==0 && color.length==0 && categories.length==0 && occasion.length==0 && nackline.length==0 && clothingmaterial.length==0 && styletype.length==0 && printtype.length==0 && discount.length==0 && sortBy === ""){
//     setapplybtndisplay(true)
// }
// else{
// setapplybtndisplay(false)
// }},[pricerangemin,pricerangemax,sizes,color,categories,occasion,nackline,printtype,styletype,discount])

//     return (
//         <>  
//             <div className="myfilter-container">
            
//                 <div className="myfilter-name">
//                     <h2 style={{color:"green",fontWeight:"bold"}} >Filter</h2>
//                     <div className="filter-list"style={{display:"flex",alignItems:"start",gap:"30px"}}>
//                         <div className={`filter-item ${selectedFilter === 'pricerange' ? 'active' : ''}`} onClick={() => handleFilterClick('pricerange')}>price range{filters.pricerangemax<3000||filters.pricerangemin>300?("*"):("")}</div>
//                         <div  className={`filter-item ${selectedFilter === 'sizes' ? 'active' : ''}`}onClick={() => handleFilterClick('sizes')}>sizes{filters.sizes.length>0?(" *"):("")}</div>
//                         <div className={`filter-item ${selectedFilter === 'colors' ? 'active' : ''}`} onClick={() => handleFilterClick('colors')}>colors{filters.color.length>0?(" *"):("")}</div>
//                         <div className={`filter-item ${selectedFilter === 'category' ? 'active' : ''}`} onClick={() => handleFilterClick('category')}>category{filters.categories.length>0?(" *"):("")}</div>
//                         {/* <div className={`filter-item ${selectedFilter === 'occasion' ? 'active' : ''}`} onClick={() => handleFilterClick('occasion')}>Occasion{filters.occasion.length>0?(" *"):("")}</div> */}
//                         {/* <div className={`filter-item ${selectedFilter === 'nakeline' ? 'active' : ''}`} onClick={() => handleFilterClick('nakeline')}>Neckline{filters.nackline.length>0?(" *"):("")}</div> */}
//                         {/* <div className={`filter-item ${selectedFilter === 'clothing material' ? 'active' : ''}`} onClick={() => handleFilterClick('clothing material')}>Material{filters.clothingmaterial.length>0?(" *"):("")}</div> */}
//                         {/* <div className={`filter-item ${selectedFilter === 'print type' ? 'active' : ''}`} onClick={() => handleFilterClick('print type')}>Print Type{filters.printtype.length>0?(" *"):("")}</div> */}
//                         {/* <div className={`filter-item ${selectedFilter === 'style type' ? 'active' : ''}`}onClick={() => handleFilterClick('style type')}>Style Type{filters.styletype.length>0?(" *"):("")}</div> */}
//                         {/* <div className={`filter-item ${selectedFilter === 'discount' ? 'active' : ''}`} onClick={() => handleFilterClick('discount')}>Discount{filters.discount.length>0?(" *"):("")}</div> */}
//                          <div className={`filter-item ${selectedFilter === 'sort' ? 'active' : ''}`} onClick={() => handleFilterClick('sort')}>Sort By{filters.sortBy ? " *" : ""}</div>
                        
                        

//                     </div>
//                 </div>
//                 <div className="myfilter-option">
//                     <h2 onClick={handleremoveallfilter} className='' style={{color:"green",fontWeight:"bold", fontSize:"18px"}}>Reset All</h2>
//                     {selectedFilter === "pricerange" ? (
//                         <div className="filter-value price-ranges">
//                             <span style={{color:'green'}}><MdCurrencyRupee/>{filters.pricerangemin}</span> - <span style={{color:'green'}}><MdCurrencyRupee/>{filters.pricerangemax}</span>
//                             {/* <input type="range" className="form-range" id="customRange2" min="0" max="3000"  value={filters.pricerange[1]} onChange={handlePriceChange} /> */}
//                             <CatlogPriceFilter/>
//                         </div>
//                     ) : ("")}

//                     {selectedFilter === "sizes" ? (
//                         <div className="filter-value sizess" style={{ height: '100%' }}>
//                             <div style={{  height: "100%" ,margin:"10px"}}>
//                                 {Object.keys(sizeOptions).map((category) => (
//                                     <div key={category} className="size-pnll" style={{height: "30%" }}>
//                                         <h5>{category}</h5>
//                                         {sizeOptions[category].map((size, index) => (
//                                             <button
//                                                 style={{ margin:"2.5px"}}
//                                                 key={index}
//                                                 className={`size-btn ${selectedSizes[category].includes(size) ? "selected" : ""}`}
//                                                 onClick={() => handleSizeSelection(category, size)}
//                                             >
//                                                 {size}
//                                             </button>
//                                         ))}
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     ) : ("")}

//                     {selectedFilter === "colors" ? (
//                         <div className="filter-value colorss">
//                             <div className="color-options">
//                                 {['red', 'blue', 'green', 'black', 'pink', 'gray', 'white', 'purple'].map((color) => (
//                                     <div key={color} style={{ width: "100%", display: "flex", justifyContent: "space-between", padding: '10px' }}>
//                                         <button style={{ backgroundColor: color.toLowerCase(), borderRadius: "50%", border:color=='white'?("1px solid black"):("none") }} className='color-btn'></button>
//                                         <input
//                                             type='checkbox'
//                                             className={`color-btn ${filters.color.includes(color) ? 'active' : ''}`}
//                                             style={{ backgroundColor: color.toLowerCase() }}
//                                             onClick={() => handleColorChange(color)}
//                                         />
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     ) : ("")}

//                     {selectedFilter === "category" ? (
//                         <div className="filter-value categoriess">
//                             <div>
//                                 <ul className="categories">
//                                     {distinctcat.map((category, id) => (
//                                         <li key={id} className="category-item" style={{ borderBottom: "1px solid white" }}>
//                                             <span onClick={() => handleSubMenu(category)}>{category}</span>
//                                             <ul
//                                                 style={{ width: '100%', overflowY: 'auto',background:"none" }}
//                                                 className={`subcategories ${subMenu === category ? "slide-down" : "slide-up"}`}
//                                             >
//                                                 {tags.map((subCategory, id) => (
//                                                     <li key={id} className="subcategory-item" style={{ display: "flex", justifyContent: 'space-between' }}>
//                                                         <div to={`/wear/${subCategory}`} onClick={closeslidecategorynav}>{subCategory}</div>
//                                                         <input type="radio" onClick={() => handleCategoryChange(subCategory)} />
//                                                     </li>
//                                                 ))}
//                                             </ul>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         </div>
//                     ) : ("")}

                      


// {selectedFilter === "discount" ? (
//                         <div className="filter-value occasionss">
//                             <div className="color-options">
//                                 {['40% and above', '30% and above', '20% and above', '10% and above'].map((occasion) => (
//                                     <div key={occasion} style={{ width: "100%", display: "flex", justifyContent: "space-between", padding: '10px' }}>
//                                         <p style={{ backgroundColor: occasion.toLowerCase()}} className='nackline-btn'>{occasion}</p>
//                                         <input
//                                             type='checkbox'
//                                             className={`occasion-btn ${filters.discount.includes(occasion) ? 'active' : ''}`}
//                                             style={{ backgroundColor: occasion.toLowerCase() }}
//                                             onClick={() => handleDiscountChange(occasion)}
//                                         />
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     ) : ("")}
//                     {/* ✅ Sort Section */}
//                     {selectedFilter === "sort" && (
//                         <div className="filter-value sort-options">
//                             {["Price: Low to High", "Price: High to Low"].map((option) => (
//                                 <div key={option} style={{ display: "flex", justifyContent: "space-between", padding: '10px' }}>
//                                     <p>{option}</p>
//                                     <input
//                                         type="radio"
//                                         name="sort"
//                                         checked={filters.sortBy === option}
//                                         onChange={() => handleSortChange(option)}
//                                     />
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                     <div className="btnnn">
//                         <button onClick={()=>{setFilters({
//     pricerangemin:300,
//     pricerangemax:3000,
//      sizes: [],
//     bottomsizes: [],
//     color: [],
//     categories: [],
//     occasion: [],
//     nackline: [],
//     clothingmaterial: [],
//     styletype: [],
//     printtype: [],
//     discount: [],
//     sortBy: ""
// })}}>
//                         Clear Filter
//                     </button>
//                         <button  onClick={handleApplyFilter} disabled={applybtndisplay==true} >Apply Filter</button>
                        
//                         {/* <button>Back</button> */}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// import React, { useState, useRef, useEffect } from "react";
// import { useBio } from "./BioContext";
// import { useNavigate } from "react-router-dom";
// import { RxCross1 } from "react-icons/rx";
// import { MdCurrencyRupee } from "react-icons/md";
// import CatlogPriceFilter from "./CatlogPriceFilter";
// import "./Filter.css";

// export default function Filter() {
//   const { wearsdata, filters, setFilters } = useBio();
//   const navigate = useNavigate();

//   const [showPanel, setShowPanel] = useState(true);
//   const [selectedFilter, setSelectedFilter] = useState("Price Range");
//   const [applybtndisplay, setapplybtndisplay] = useState(true);
//   const [subMenu, setSubMenu] = useState(null);
//   const [tags, settags] = useState([]);
//   const [selectedSizes, setSelectedSizes] = useState({
//     "Top Wear": [],
//     "Bottom Wear": [],
//   });

//   const sizeOptions = {
//     "Top Wear": ["S", "M", "L", "XL", "XXL", "XXXL"],
//     "Bottom Wear": ["24", "26", "28", "30", "32", "34", "36"],
//   };

//   const categoryList = [...new Set(wearsdata.map((cat) => cat.category))];

//   const handleSizeSelection = (category, size) => {
//     setSelectedSizes((prev) => {
//       const updated = { ...prev };
//       if (updated[category].includes(size)) {
//         updated[category] = updated[category].filter((s) => s !== size);
//       } else {
//         updated[category] = [...updated[category], size];
//       }
//       return updated;
//     });

//     setFilters((prev) => ({
//       ...prev,
//       sizes:
//         category === "Top Wear" || category === "Bottom Wear"
//           ? [...new Set([...prev.sizes, size])]
//           : prev.sizes,
//     }));
//   };

//   const handleColorChange = (color) => {
//     setFilters((prev) => {
//       const updated = [...prev.color];
//       if (updated.includes(color)) {
//         updated.splice(updated.indexOf(color), 1);
//       } else {
//         updated.push(color);
//       }
//       return { ...prev, color: updated };
//     });
//   };

//   const handleCategoryChange = (category) => {
//     setFilters((prev) => {
//       const updated = [...prev.categories];
//       if (updated.includes(category)) {
//         updated.splice(updated.indexOf(category), 1);
//       } else {
//         updated.push(category);
//       }
//       return { ...prev, categories: updated };
//     });
//   };

//   const handleSortChange = (option) => {
//     setFilters((prev) => ({ ...prev, sortBy: option }));
//   };

//   const handleApplyFilter = () => {
//     setShowPanel(false);
//     navigate(-1);
//   };

//   const handleReset = () => {
//     setFilters({
//       pricerangemin: 300,
//       pricerangemax: 3000,
//       sizes: [],
//       bottomsizes: [],
//       color: [],
//       categories: [],
//       occasion: [],
//       nackline: [],
//       clothingmaterial: [],
//       styletype: [],
//       printtype: [],
//       discount: [],
//       sortBy: "",
//     });
//   };

//   const filterOptions = [
//     "Price Range",
//     "Sizes",
//     "Colors",
//     "Category",
//     "Sort By",
//   ];

//   const sortOptions = ["Price: Low to High", "Price: High to Low"];

//   return (
//     <>
//       {showPanel && (
//         <div
//           className="bottom-panel"
//           style={{
//             position: "fixed",
//             bottom: 0,
//             left: 0,
//             width: "100%",
//             backgroundColor: "#fff",
//             borderTopLeftRadius: "20px",
//             borderTopRightRadius: "20px",
//             boxShadow: "0 -4px 15px rgba(0,0,0,0.15)",
//             padding: "20px",
//             zIndex: 1000,
//             minHeight: "65vh",
//             overflowY: "auto",
//           }}
//         >
//           {/* Header */}
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginBottom: "15px",
//             }}
//           >
//             <h4
//               style={{
//                 fontSize: "18px",
//                 fontWeight: "700",
//                 margin: 0,
//                 color: "#222",
//               }}
//             >
//               Filters
//             </h4>
//             <span
//               style={{
//                 cursor: "pointer",
//                 color: "#666",
//                 transition: "color 0.3s ease",
//               }}
//               onMouseEnter={(e) => (e.target.style.color = "#000")}
//               onMouseLeave={(e) => (e.target.style.color = "#666")}
//               onClick={() => setShowPanel(false)}
//             >
//               <RxCross1 size={22} />
//             </span>
//           </div>

//           {/* Filter Buttons */}
//           <div
//             style={{
//               display: "flex",
//               gap: "8px",
//               flexWrap: "wrap",
//               marginBottom: "15px",
//             }}
//           >
//             {filterOptions.map((f) => (
//               <button
//                 key={f}
//                 onClick={() => setSelectedFilter(f)}
//                 style={{
//                   border:
//                     selectedFilter === f
//                       ? "1px solid #F15A29"
//                       : "1px solid #ddd",
//                   borderRadius: "20px",
//                   padding: "8px 14px",
//                   backgroundColor:
//                     selectedFilter === f ? "#FFF5F2" : "transparent",
//                   color: selectedFilter === f ? "#F15A29" : "#444",
//                   fontWeight: "500",
//                   cursor: "pointer",
//                   transition: "all 0.2s ease",
//                 }}
//               >
//                 {f}
//               </button>
//             ))}
//           </div>

//           {/* Dynamic Filter Content */}
//           <div>
//             {selectedFilter === "Price Range" && (
//               <div style={{ marginTop: "10px" }}>
//                 <h5 style={{ fontSize: "14px", marginBottom: "10px" }}>
//                   Select Range
//                 </h5>
//                 <CatlogPriceFilter />
//               </div>
//             )}

//             {selectedFilter === "Sizes" &&
//               Object.keys(sizeOptions).map((category) => (
//                 <div key={category} style={{ marginBottom: "15px" }}>
//                   <h5 style={{ fontSize: "14px", fontWeight: "600" }}>
//                     {category}
//                   </h5>
//                   {sizeOptions[category].map((size, index) => (
//                     <button
//                       key={index}
//                       style={{
//                         margin: "3px",
//                         padding: "6px 10px",
//                         borderRadius: "5px",
//                         border: selectedSizes[category].includes(size)
//                           ? "1px solid #F15A29"
//                           : "1px solid #ccc",
//                         backgroundColor: selectedSizes[category].includes(size)
//                           ? "#FFF5F2"
//                           : "#fff",
//                         color: selectedSizes[category].includes(size)
//                           ? "#F15A29"
//                           : "#333",
//                         fontSize: "12px",
//                         cursor: "pointer",
//                         transition: "all 0.2s ease",
//                       }}
//                       onClick={() => handleSizeSelection(category, size)}
//                     >
//                       {size}
//                     </button>
//                   ))}
//                 </div>
//               ))}

//             {selectedFilter === "Colors" && (
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "repeat(6, 1fr)",
//                   gap: "12px",
//                   marginTop: "10px",
//                 }}
//               >
//                 {["red", "blue", "green", "black", "pink", "gray", "white"].map(
//                   (color) => (
//                     <button
//                       key={color}
//                       onClick={() => handleColorChange(color)}
//                       style={{
//                         width: "35px",
//                         height: "35px",
//                         borderRadius: "50%",
//                         border: filters.color.includes(color)
//                           ? "2px solid #F15A29"
//                           : color === "white"
//                           ? "1px solid #999"
//                           : "none",
//                         backgroundColor: color,
//                         cursor: "pointer",
//                       }}
//                     />
//                   )
//                 )}
//               </div>
//             )}

//             {selectedFilter === "Category" && (
//               <div style={{ marginTop: "10px" }}>
//                 {categoryList.map((category, id) => (
//                   <div
//                     key={id}
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                       padding: "8px 0",
//                       borderBottom: "1px solid #eee",
//                     }}
//                   >
//                     <p style={{ margin: 0, fontSize: "14px" }}>{category}</p>
//                     <input
//                       type="checkbox"
//                       checked={filters.categories.includes(category)}
//                       onChange={() => handleCategoryChange(category)}
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}

//             {selectedFilter === "Sort By" && (
//               <div>
//                 {sortOptions.map((option, index) => (
//                   <div
//                     key={index}
//                     onClick={() => handleSortChange(option)}
//                     style={{
//                       border:
//                         filters.sortBy === option
//                           ? "1px solid #F15A29"
//                           : "1px solid #ddd",
//                       borderRadius: "10px",
//                       padding: "10px",
//                       cursor: "pointer",
//                       marginBottom: "8px",
//                       backgroundColor:
//                         filters.sortBy === option ? "#FFF5F2" : "transparent",
//                       transition: "all 0.2s ease",
//                     }}
//                   >
//                     <p
//                       style={{
//                         margin: 0,
//                         fontSize: "14px",
//                         color:
//                           filters.sortBy === option ? "#F15A29" : "#333",
//                         fontWeight:
//                           filters.sortBy === option ? "600" : "400",
//                       }}
//                     >
//                       {option}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Footer Buttons */}
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               marginTop: "25px",
//             }}
//           >
//             <button
//               onClick={handleReset}
//               style={{
//                 flex: 1,
//                 padding: "10px",
//                 borderRadius: "8px",
//                 border: "1px solid #ccc",
//                 backgroundColor: "#fff",
//                 color: "#444",
//                 fontWeight: "500",
//               }}
//             >
//               Reset
//             </button>
//             <button
//               onClick={handleApplyFilter}
//               style={{
//                 flex: 1,
//                 marginLeft: "10px",
//                 padding: "10px",
//                 borderRadius: "8px",
//                 border: "none",
//                 backgroundColor: "#F15A29",
//                 color: "#fff",
//                 fontWeight: "600",
//               }}
//             >
//               Apply
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }



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
