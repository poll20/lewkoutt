import React, { useState, useRef, useEffect } from 'react';
import { useBio } from './BioContext';
import { NavLink } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import "./Filter.css";
import CatlogPriceFilter from './CatlogPriceFilter';
import { MdCurrencyRupee } from "react-icons/md";

export default function Filter() {

    let { wearsdata,filters,setFilters, handleapplymyfilters } = useBio();
    const [selectedFilter, setSelectedFilter] = useState('pricerange'); // Tracks selected filter
    // const [filters, setFilters] = useState({
    //     pricerange: [0, 1000],
    //     sizes: [],
    //     bottomsizes: [],
    //     color: [],
    //     categories: []
    // });

    const navigate=useNavigate()
    // let { wearsdata } = useBio();
    console.log(wearsdata);

    const handleFilterClick = (filterName) => {
        setSelectedFilter(filterName);
    };

    const [issOpen, ssetIsOpen] = useState(false);
    const [subMenu, setSubMenu] = useState(null);
    let [categorydata, setcategorydata] = useState([]);
    let [applybtndisplay,setapplybtndisplay]=useState(true)
    const dropdownRef = useRef(null);
    const [tags, settags] = useState([]);

    const toggleDropdown = () => {
        ssetIsOpen(!issOpen);
    };

    const handleSubMenu = (category) => {
        console.log("toto", category);
        setSubMenu(category === subMenu ? null : category);

        let taging = wearsdata.filter((tags) => {
            return tags.category === category;
        });
        let alltags = taging.map((e) => {
            return e.tag;
        });
        let distincttag = [...new Set(alltags)];
        settags(distincttag);
    };

    let categoryy = wearsdata.map((cat) => {
        return cat.category;
    });

    let distinctcat = [...new Set(categoryy)];
    console.log("aaaa", distinctcat);

    let closeslidecategorynav = () => {
        setSideNavbarOpen(!sideNavbarOpen);
    }

    const handlePriceChange = (e) => { 
        setFilters({ ...filters, pricerange: [0, e.target.value] });
    };

    const handleSizeChange = (type, size) => {
        setFilters((prev) => {
            const updatedSizes = [...prev[type]];
            if (updatedSizes.includes(size)) {
                updatedSizes.splice(updatedSizes.indexOf(size, 1));
            } else if (updatedSizes.length < 2) {
                updatedSizes.push(size);
            }
            return { ...prev, [type]: updatedSizes };
        });
    };

    const handleColorChange = (color) => {
        setFilters((prev) => {
            const updatedColors = [...prev.color];
            if (updatedColors.includes(color)) {
                updatedColors.splice(updatedColors.indexOf(color), 1);
            } else {
                updatedColors.push(color);
            }
            return { ...prev, color: updatedColors };
        });
    };
    const handleOccasionChange = (occasion) => {
        setFilters((prev) => {
            const updatedOccasion = [...prev.occasion];
            if (updatedOccasion.includes(occasion)) {
                updatedOccasion.splice(updatedOccasion.indexOf(occasion), 1);
            } else {
                updatedOccasion.push(occasion);
            }
            return { ...prev, occasion: updatedOccasion};
        });
    };

    const handleNakelineChange = (occasion) => {
        setFilters((prev) => {
            const updatedOccasion = [...prev.nackline];
            if (updatedOccasion.includes(occasion)) {
                updatedOccasion.splice(updatedOccasion.indexOf(occasion), 1);
            } else {
                updatedOccasion.push(occasion);
            }
            return { ...prev, nackline: updatedOccasion};
        });
    };

    const handleClothingmaterialChange = (occasion) => {
        setFilters((prev) => {
            const updatedOccasion = [...prev.clothingmaterial];
            if (updatedOccasion.includes(occasion)) {
                updatedOccasion.splice(updatedOccasion.indexOf(occasion), 1);
            } else {
                updatedOccasion.push(occasion);
            }
            return { ...prev, clothingmaterial: updatedOccasion};
        });
    };
    const handlePrinttypeChange = (occasion) => {
        setFilters((prev) => {
            const updatedOccasion = [...prev.printtype];
            if (updatedOccasion.includes(occasion)) {
                updatedOccasion.splice(updatedOccasion.indexOf(occasion), 1);
            } else {
                updatedOccasion.push(occasion);
            }
            return { ...prev, printtype: updatedOccasion};
        });
    };

    const handleStyletypeChange = (occasion) => {
        setFilters((prev) => {
            const updatedOccasion = [...prev.styletype];
            if (updatedOccasion.includes(occasion)) {
                updatedOccasion.splice(updatedOccasion.indexOf(occasion), 1);
            } else {
                updatedOccasion.push(occasion);
            }
            return { ...prev, styletype: updatedOccasion};
        });
    };
    

    const handleCategoryChange = (category) => {
        setFilters((prev) => {
            const updatedCategories = [...prev.categories];
            if (updatedCategories.includes(category)) {
                updatedCategories.splice(updatedCategories.indexOf(category), 1);
            } else {
                updatedCategories.push(category);
            }
            return { ...prev, categories: updatedCategories };
        });
    };
    const handleDiscountChange = (category) => {
        setFilters((prev) => {
            const updatedCategories = [...prev.discount];
            if (updatedCategories.includes(category)) {
                updatedCategories.splice(updatedCategories.indexOf(category), 1);
            } else {
                updatedCategories.push(category);
            }
            return { ...prev, discount: updatedCategories };
        });
    };

    const sizeOptions = {
        "Top Wear": ["s", "m", "l", "xl", "xxl", "xxxl"],
        "Bottom Wear": ["24", "26", "28", "30", "32", "34", "36"],
    };

    const [selectedSizes, setSelectedSizes] = useState({
        "Top Wear": [],
        "Bottom Wear": [],
    });

    const handleSizeSelection = (category, size) => {
        console.log(category,'tob')
        setSelectedSizes((prev) => {
            const updated = { ...prev };
            if (updated[category].includes(size)) {
                updated[category] = updated[category].filter((s) => s !== size);
            } else {
                updated[category] = [...updated[category], size];
            }
            return updated;
        });
    handleSizeChange(category === "Top Wear"||"Bottom Wear" ? "sizes" : "bottomsizes", size);
    // console.log("rr",rr)
    };

    const handleremoveallfilter=()=>{
        setFilters(
            {
                pricerangemin:300,
                pricerangemax:3000,
                 sizes: [],
                bottomsizes: [],
                color: [],
                categories: [],
                occasion: [],
                nackline: [],
                clothingmaterial: [],
                styletype: [],
                printtype: [],
                discount: []
        })
        navigate(-1)
       
    }
console.log(filters)

const handleStapeBack=()=>{
navigate(-1)
}
let {pricerangemin,pricerangemax,sizes,color,categories,occasion,nackline,clothingmaterial,styletype,printtype,discount}=filters
console.log(pricerangemax,sizes,color,categories,  "lollla")
const handleApplyFilter=()=>{ 
 navigate(-1)
}
useEffect(()=>{
    if(pricerangemax==3000 && pricerangemin==300 && sizes.length==0 && color.length==0 && categories.length==0 && occasion.length==0 && nackline.length==0 && clothingmaterial.length==0 && styletype.length==0 && printtype.length==0 && discount.length==0){
    setapplybtndisplay(true)
}
else{
setapplybtndisplay(false)
}},[pricerangemin,pricerangemax,sizes,color,categories,occasion,nackline,printtype,styletype,discount])

    return (
        <>  
            <div className="myfilter-container">
            
                <div className="myfilter-name">
                    <h2 style={{color:"green",fontWeight:"bold"}} >Filter</h2>
                    <div className="filter-list"style={{display:"flex",alignItems:"start",gap:"30px"}}>
                        <div className={`filter-item ${selectedFilter === 'pricerange' ? 'active' : ''}`} onClick={() => handleFilterClick('pricerange')}>price range{filters.pricerangemax<3000||filters.pricerangemin>300?("*"):("")}</div>
                        <div  className={`filter-item ${selectedFilter === 'sizes' ? 'active' : ''}`}onClick={() => handleFilterClick('sizes')}>sizes{filters.sizes.length>0?(" *"):("")}</div>
                        <div className={`filter-item ${selectedFilter === 'colors' ? 'active' : ''}`} onClick={() => handleFilterClick('colors')}>colors{filters.color.length>0?(" *"):("")}</div>
                        <div className={`filter-item ${selectedFilter === 'category' ? 'active' : ''}`} onClick={() => handleFilterClick('category')}>category{filters.categories.length>0?(" *"):("")}</div>
                        {/* <div className={`filter-item ${selectedFilter === 'occasion' ? 'active' : ''}`} onClick={() => handleFilterClick('occasion')}>Occasion{filters.occasion.length>0?(" *"):("")}</div> */}
                        {/* <div className={`filter-item ${selectedFilter === 'nakeline' ? 'active' : ''}`} onClick={() => handleFilterClick('nakeline')}>Neckline{filters.nackline.length>0?(" *"):("")}</div> */}
                        {/* <div className={`filter-item ${selectedFilter === 'clothing material' ? 'active' : ''}`} onClick={() => handleFilterClick('clothing material')}>Material{filters.clothingmaterial.length>0?(" *"):("")}</div> */}
                        {/* <div className={`filter-item ${selectedFilter === 'print type' ? 'active' : ''}`} onClick={() => handleFilterClick('print type')}>Print Type{filters.printtype.length>0?(" *"):("")}</div> */}
                        {/* <div className={`filter-item ${selectedFilter === 'style type' ? 'active' : ''}`}onClick={() => handleFilterClick('style type')}>Style Type{filters.styletype.length>0?(" *"):("")}</div> */}
                        <div className={`filter-item ${selectedFilter === 'discount' ? 'active' : ''}`} onClick={() => handleFilterClick('discount')}>Discount{filters.discount.length>0?(" *"):("")}</div>
                        
                        

                    </div>
                </div>
                <div className="myfilter-option">
                    <h2 onClick={handleremoveallfilter} style={{color:"green",fontWeight:"bold"}}>Reset All</h2>
                    {selectedFilter === "pricerange" ? (
                        <div className="filter-value price-ranges">
                            <span style={{color:'green'}}><MdCurrencyRupee/>{filters.pricerangemin}</span> - <span style={{color:'green'}}><MdCurrencyRupee/>{filters.pricerangemax}</span>
                            {/* <input type="range" className="form-range" id="customRange2" min="0" max="3000"  value={filters.pricerange[1]} onChange={handlePriceChange} /> */}
                            <CatlogPriceFilter/>
                        </div>
                    ) : ("")}

                    {selectedFilter === "sizes" ? (
                        <div className="filter-value sizess" style={{ height: '100%' }}>
                            <div style={{  height: "100%" ,margin:"10px"}}>
                                {Object.keys(sizeOptions).map((category) => (
                                    <div key={category} className="size-pnll" style={{height: "30%" }}>
                                        <h5>{category}</h5>
                                        {sizeOptions[category].map((size, index) => (
                                            <button
                                                style={{ margin:"2.5px"}}
                                                key={index}
                                                className={`size-btn ${selectedSizes[category].includes(size) ? "selected" : ""}`}
                                                onClick={() => handleSizeSelection(category, size)}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : ("")}

                    {selectedFilter === "colors" ? (
                        <div className="filter-value colorss">
                            <div className="color-options">
                                {['red', 'blue', 'green', 'black', 'pink', 'gray', 'white', 'purple'].map((color) => (
                                    <div key={color} style={{ width: "100%", display: "flex", justifyContent: "space-between", padding: '10px' }}>
                                        <button style={{ backgroundColor: color.toLowerCase(), borderRadius: "50%", border:"none" }} className='color-btn'></button>
                                        <input
                                            type='checkbox'
                                            className={`color-btn ${filters.color.includes(color) ? 'active' : ''}`}
                                            style={{ backgroundColor: color.toLowerCase() }}
                                            onClick={() => handleColorChange(color)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : ("")}

                    {selectedFilter === "category" ? (
                        <div className="filter-value categoriess">
                            <div>
                                <ul className="categories">
                                    {distinctcat.map((category, id) => (
                                        <li key={id} className="category-item" style={{ borderBottom: "1px solid white" }}>
                                            <span onClick={() => handleSubMenu(category)}>{category}</span>
                                            <ul
                                                style={{ width: '100%', overflowY: 'auto',background:"none" }}
                                                className={`subcategories ${subMenu === category ? "slide-down" : "slide-up"}`}
                                            >
                                                {tags.map((subCategory, id) => (
                                                    <li key={id} className="subcategory-item" style={{ display: "flex", justifyContent: 'space-between' }}>
                                                        <div to={`/wear/${subCategory}`} onClick={closeslidecategorynav}>{subCategory}</div>
                                                        <input type="radio" onClick={() => handleCategoryChange(subCategory)} />
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ) : ("")}

                       {/* {selectedFilter === "occasion" ? (
                        <div className="filter-value occasionss">
                            <div className="color-options">
                                {['Casual', 'Party', 'Lounge', 'Outgoing', 'Formal'].map((occasion) => (
                                    <div key={occasion} style={{ width: "100%", display: "flex", justifyContent: "space-between", padding: '10px' }}>
                                        <p style={{ backgroundColor: occasion.toLowerCase(), }} className='occasion-btn'>{occasion}</p>
                                        <input
                                            type='checkbox'
                                            className={`occasion-btn ${filters.occasion.includes(occasion) ? 'active' : ''}`}
                                            style={{ backgroundColor: occasion.toLowerCase() }}
                                            onClick={() => handleOccasionChange(occasion)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : ("")} */}

{/* {selectedFilter === "nakeline" ? (
                        <div className="filter-value occasionss">
                            <div className="color-options">
                                {['Round Neck', 'V Neck', 'Crew Neck', 'Square Neck', 'Tube Neck','Halter Neck'].map((occasion) => (
                                    <div key={occasion} style={{ width: "100%", display: "flex", justifyContent: "space-between", padding: '10px' }}>
                                        <p style={{ backgroundColor: occasion.toLowerCase()}} className='nackline-btn'>{occasion}</p>
                                        <input
                                            type='checkbox'
                                            className={`occasion-btn ${filters.nackline.includes(occasion) ? 'active' : ''}`}
                                            style={{ backgroundColor: occasion.toLowerCase() }}
                                            onClick={() => handleNakelineChange(occasion)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : ("")} */}


{/* {selectedFilter === "clothing material" ? (
                        <div className="filter-value occasionss">
                            <div className="color-options">
                                {['Polyester Blend', 'Acrylic', 'Polyester', 'Cotton'].map((occasion) => (
                                    <div key={occasion} style={{ width: "100%", display: "flex", justifyContent: "space-between", padding: '10px' }}>
                                        <p style={{ backgroundColor: occasion.toLowerCase()}} className='nackline-btn'>{occasion}</p>
                                        <input
                                            type='checkbox'
                                            className={`occasion-btn ${filters.clothingmaterial.includes(occasion) ? 'active' : ''}`}
                                            style={{ backgroundColor: occasion.toLowerCase() }}
                                            onClick={() => handleClothingmaterialChange(occasion)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : ("")} */}


{/* {selectedFilter === "print type" ? (
                        <div className="filter-value occasionss">
                            <div className="color-options">
                                {['Solid', 'Floral', 'Graphic', 'Printed', 'Abstract'].map((occasion) => (
                                    <div key={occasion} style={{ width: "100%", display: "flex", justifyContent: "space-between", padding: '10px' }}>
                                        <p style={{ backgroundColor: occasion.toLowerCase()}} className='nackline-btn'>{occasion}</p>
                                        <input
                                            type='checkbox'
                                            className={`occasion-btn ${filters.printtype.includes(occasion) ? 'active' : ''}`}
                                            style={{ backgroundColor: occasion.toLowerCase() }}
                                            onClick={() => handlePrinttypeChange(occasion)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : ("")} */}


{/* {selectedFilter === "style type" ? (
                        <div className="filter-value occasionss">
                            <div className="color-options">
                                {['Fitted', 'Regular', 'Bodycon', 'Oversized', 'Regular Fit'].map((occasion) => (
                                    <div key={occasion} style={{ width: "100%", display: "flex", justifyContent: "space-between", padding: '10px' }}>
                                        <p style={{ backgroundColor: occasion.toLowerCase()}} className='nackline-btn'>{occasion}</p>
                                        <input
                                            type='checkbox'
                                            className={`occasion-btn ${filters.styletype.includes(occasion) ? 'active' : ''}`}
                                            style={{ backgroundColor: occasion.toLowerCase() }}
                                            onClick={() => handleStyletypeChange(occasion)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : ("")} */}


{selectedFilter === "discount" ? (
                        <div className="filter-value occasionss">
                            <div className="color-options">
                                {['40% and above', '30% and above', '20% and above', '10% and above'].map((occasion) => (
                                    <div key={occasion} style={{ width: "100%", display: "flex", justifyContent: "space-between", padding: '10px' }}>
                                        <p style={{ backgroundColor: occasion.toLowerCase()}} className='nackline-btn'>{occasion}</p>
                                        <input
                                            type='checkbox'
                                            className={`occasion-btn ${filters.discount.includes(occasion) ? 'active' : ''}`}
                                            style={{ backgroundColor: occasion.toLowerCase() }}
                                            onClick={() => handleDiscountChange(occasion)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : ("")}
                    <div className="btnnn">
                        <button onClick={()=>{setFilters({
    pricerangemin:300,
    pricerangemax:3000,
     sizes: [],
    bottomsizes: [],
    color: [],
    categories: [],
    occasion: [],
    nackline: [],
    clothingmaterial: [],
    styletype: [],
    printtype: [],
    discount: []
})}}>
                        Clear Filter
                    </button>
                        <button  onClick={handleApplyFilter} disabled={applybtndisplay==true} >Apply Filter</button>
                        
                        {/* <button>Back</button> */}
                    </div>
                </div>
            </div>
        </>
    );
}
