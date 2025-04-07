import React, { useState, useEffect } from "react";
  import "./Card.css";
  import { NavLink, useParams } from "react-router-dom";
  import { FaChevronDown, FaChevronUp } from "react-icons/fa";
  import { useBio } from "./BioContext";
  import img1 from "./image/img1.jpg";
  import img2 from "./image/img3.jpg";
  import { useMemo } from "react";
  import { IoIosArrowDown } from "react-icons/io";
  import { RxCross1 } from "react-icons/rx";
  import HeartButton from "./HeartButton";
  import { AiOutlineDelete } from "react-icons/ai";
  // import FaChevronDown from "react-icons/fa";
const Card = (props) => {
  const apiUrl = import.meta.env.VITE_API_URL;
    const[prdallsizes,setprdallsizes]=useState([])
    const [addtocartkeliyeid,setaddtocartkeliyeid]=useState("")
    const[sizesshow,setsizesshow]=useState(false)
    const [products, setProducts] = useState([]);
    const [originalproducts, setoriginalProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { section, category ,bestsale,store,rent,wish} = useParams();
    console.log("bsee",bestsale)
    console.log("rentpoint",rent)
  console.log("wish",wish)
    // console.log("storeee",store)
    const { bestsellingdata, wearsdata, rentdata,filters,wishlistdata,handleClick,productdata,newarrival,productdataonlydetail,handleAddToCart,searchvalue,removewishlistonly} = useBio();

    const a = useMemo(() => {
      return productdataonlydetail.filter((e) =>
        bestsellingdata.some(
          (item) => e._id.toString().trim() === item.productId.toString().trim()
        )
      );
    }, [bestsellingdata]);
    
    console.log("Wearsdata:", wearsdata);
    console.log("Bestsellingdata:", bestsellingdata);
    console.log("Filtered data (a):", a);
    
      

    const [showSortPanel, setShowSortPanel] = useState(false);
    const [showSizePanel, setShowSizePanel] = useState(false);
    const [selectedSortOption, setSelectedSortOption] = useState("");
    const [bestseller,setbestseller]=useState([])
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
      "Top Wear": ["s", "m", "l", "xl", "xl", "xxl","xxl"],
      "Bottom Wear": ["24", "26", "28", "30", "32", "34"],
    };

    const handleSizeSelection = (category, size) => {
      setSelectedSizes((prev) => {
        const updated = { ...prev };
        console.log("updatepccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccrd",updated)
        if (updated[category].includes(size)) {
          updated[category] = updated[category].filter((s) => s !== size);
        } else {
          updated[category] = [...updated[category], size];
        }
        return updated;
      });
    };

    const removeSizeFilter = (category, size) => {
      setSelectedSizes((prev) => ({
        ...prev,
        [category]: prev[category].filter((s) => s !== size),
      }));
      // Reapply filters after removing size filter
      const filteredData = applyFilters(products);
      setProducts(originalproducts);
    };
    
    

    const removeSortFilter = () => {
      setSelectedSortOption(""); // Reset selected sort option
      const filteredData = applyFilters(products); // Reapply filters without sorting
      console.log("  o",originalproducts)
      if(bestsale){
        setProducts(a)
      }
      else{
      setProducts(originalproducts); // Update products
      }
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

    const handleSortSelection = (option) => {
      if (option === "") {
        removeSortFilter(); // Handle case where sort is cleared
      } else {
        setSelectedSortOption(option);
        const filteredData = applyFilters(products); // Apply sorting
        setProducts(filteredData);
      }
      setShowSortPanel(false);
    };
    useEffect(() => {
      if (products.length > 0) {
        const filteredData = applyFilters(products);
        setProducts(filteredData);
      }
    }, [selectedSortOption, selectedSizes, filters,originalproducts]);
    
    
    const applyFilters = (data) => {  
      console.log("lolo",data)
      let filteredProducts = [...data];
    
      // Apply filters from context
      const { pricerangemin, pricerangemax, sizes, bottomsizes, color, categories } = filters;
 
 if(sizes){    
    console.log("rimnu",sizes)
 }
 console.log("sled",selectedSizes)
      // Filter by price range
      if (pricerangemin || pricerangemax) {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.price >= (pricerangemin || 0) &&
            product.price <= (pricerangemax || Infinity)
        );
      }
    
    //  Filter by sizes
      if (sizes.length > 0) {
        console.log("aa to gya")
        filteredProducts = filteredProducts.filter((product) =>
          sizes.some((size) => product.colors.some((color) =>
            color.sizes.some((e) => e.size === size)
          ))
        );
        console.log("fpd",filteredProducts)
      }
    
      // Filter by color
      if (color.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          color.includes(product.defaultColor)
        );
      }
    
      // Filter by categories
      if (categories.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          categories.includes(product.category)
        );
      }
    console.log("selectedsize",selectedSizes)
      // Filter by size

      filteredProducts.forEach((product, index) => {
        console.log(`Product ${index + 1}:`, product);
        product.colors.forEach((color, colorIndex) => {
          console.log(`  Color ${colorIndex + 1}:`, color);
          console.log(`    Sizes:`, color.sizes.map(s => s.size));
        });
      });
      
      if (Object.values(selectedSizes).flat().length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          Object.keys(selectedSizes).some((category) =>
            selectedSizes[category].some((size) =>
              product.colors.some((color) =>
                color.sizes.some((e) => e.size === size)
              )
            )
          )
        );
        console.log("chleedddddddddo",filteredProducts)
      }
    
      // Apply sorting
      switch (selectedSortOption) {
        case "Price: Low to High":
          filteredProducts.sort((a, b) => a.price - b.price);
          console.log("lh",filteredProducts)
          break;
        case "Price: High to Low":
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case "New Arrival":
          // filteredProducts.sort(
          //   (a, b) => new Date(b.arrivalDate) - new Date(a.arrivalDate)
          // );
          if(!newarrival || !productdata){
            return(<p>loading...</p>)
          }
          console.log("new arrival",newarrival)
          let targetId = newarrival.map((e) => e.ProductId.toString());  // Convert to string if needed
          console.log("tra", targetId);
          const filteredProduct = filteredProducts.filter(product => targetId.find(targetIds => product._id.toString() === targetIds)); 
            return filteredProduct
        case "Discount":
          filteredProducts.sort((a, b) => b.discount - a.discount);
          break;
        case "Best Seller":
          console.log("hello yaarrrrrrrrrr")
          if(bestsale){
            setProducts(a)
          }
        else if(store){
          return  a
          }
          else
          {
        filteredProducts = a.filter((product) => product.tag == section);
        console.log("iloo",a)
          }
          
  break;
        default:
          break;
      }
    console.log("rnadi",filteredProducts)
      return filteredProducts;
    };


  // const applyFilters = (data) => {
  //   console.log("Filtering data:", data);
  //   let filteredProducts = [...data];
  
  //   const { pricerangemin, pricerangemax, sizes, bottomsizes, color, categories } = filters;
  
  //   // Filter by price range
  //   if (pricerangemin || pricerangemax) {
  //     filteredProducts = filteredProducts.filter(
  //       (product) =>
  //         product.price >= (pricerangemin || 0) &&
  //         product.price <= (pricerangemax || Infinity)
  //     );
  //   }
  
  //   // Filter by sizes
  //   if (sizes.length > 0 || bottomsizes.length > 0) {
  //     filteredProducts = filteredProducts.filter((product) =>
  //       sizes.some((size) => product.sizes.includes(size)) ||
  //       bottomsizes.some((size) => product.sizes.includes(size))
  //     );
  //   }
  
  //   // Filter by color
  //   if (color.length > 0) {
  //     filteredProducts = filteredProducts.filter((product) =>
  //       color.includes(product.color)
  //     );
  //   }
  
  //   // Filter by categories
  //   if (categories.length > 0) {
  //     filteredProducts = filteredProducts.filter((product) =>
  //       categories.includes(product.category)
  //     );
  //   }
  
  //   // Filter by selected sizes
  //   if (Object.values(selectedSizes).flat().length > 0) {
  //     filteredProducts = filteredProducts.filter((product) =>
  //       Object.keys(selectedSizes).some((category) =>
  //         selectedSizes[category].some((size) =>
  //           product.colors.some((color) =>
  //             color.sizes.some((e) => e.size === size)
  //           )
  //         )
  //       )
  //     );
  //   }
  
  //   // Apply sorting
  //   switch (selectedSortOption) {
  //     case "Price: Low to High":
  //       filteredProducts.sort((a, b) => a.price - b.price);
  //       break;
  //     case "Price: High to Low":
  //       filteredProducts.sort((a, b) => b.price - a.price);
  //       break;
  //     case "New Arrival":
  //       // Sort logic for New Arrival (implement as needed)
  //       break;
  //     case "Discount":
  //       filteredProducts.sort((a, b) => b.discount - a.discount);
  //       break;
  //     case "Best Seller":
  //       // Sorting logic for Best Seller (implement as needed)
  //       break;
  //     default:
  //       break;
  //   }
  
  //   return filteredProducts;
  // };
  
    
    

  //     const setShowSize=(id)=>{
  //       console.log("iid",id)
  //       // let prd=productdataonlydetail.filter((e)=>(e._id==id))
  // //       let prd = productdataonlydetail
  // // .flatMap(e => e.colors) // Sare products ke colors ko ek array bana diya
  // // .filter(color => color._id == id); // Colors ke andar se specific _id match kiya
  // let prd=productdataonlydetail
  // .map(product => {
  //   const matchingColor = product.colors.find(color => color._id === id);
  //   if (matchingColor) {
  //     return {
  //       ...product,  // Saara product data
  //       colors: [matchingColor] // Sirf matching color object ek array me
  //     };
  //   }
  //   return null; // Agar matching color na mile toh null return karo
  // }).filter(product => product !== null); // Sirf valid products rakho
  // console.log("prddd",prd)
  // let siz=prd[0].colors[0].sizes.map((e)=>e.size)
  
  // if (Array.isArray(prd)) {
  //   prd = prd[0]; // Take the first object if it's an array
  // }
  //     setprdallsizes(siz)  
  //     setaddtocartkeliyeid(prd)
  //     setsizesshow(true)
  //     }

  // let chlodekhe=(s,i)=>{
  //   console.log("dekhte h",s,i)
  // }

  const setShowSize = (id) => {
    console.log("iid", id);

    let prd = productdataonlydetail
        .map(product => {
            const matchingColor = product.colors.find(color => color._id === id);
            if (matchingColor) {
                return {
                    ...product,  // Product ka pura data
                    colors: [{ 
                        ...matchingColor,  // Matching color ka pura data
                        price: product.price, // Price ko color object me add kiya
                        discountprice: product.discountprice, // Discounted price
                        shopname: product.shopname, // Shop Name
                        shopaddress: product.shopaddress, // Shop Address
                        discount: product.discount // Discount
                    }]
                };
            }
            return null;
        })
        .filter(product => product !== null); // Sirf valid products rakho

    console.log("prddd", prd);

    if (prd.length > 0) {
        let siz = prd[0].colors[0].sizes.map(e => e.size);
        setprdallsizes(siz);  
        setaddtocartkeliyeid(prd[0].colors[0]); // Sirf ek object assign karo
        setsizesshow(true);
    }
};

const chlodekhe = (s, i) => {
    console.log("dekhte h", s, i);
};

    const fetchProducts = async (url) => {  
      
      setIsLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("jpbr",data)
        
        const productdetails=data
        console.log("my ka gdata",productdetails)
        const filteredData = applyFilters(productdetails);
        setProducts(filteredData);
        setoriginalProducts(productdetails)
        if(originalproducts){
          console.log("origi",originalproducts)
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setIsLoading(false);
    };

  useEffect(() => {
    setProducts([]); // Clear the current product list
    // setoriginalProducts([])

  if(section=="newarrivals")
  {

    if(!newarrival || !productdata){
      return(<p>loading...</p>)
    }
    console.log("new arrival",newarrival)
    let targetId = newarrival.map((e) => e.ProductId.toString());  // Convert to string if needed
    console.log("tra", targetId);
    
    const filteredProducts = productdata
      .map(item => item.productdetails) // Get productdetails from each category
      .flat() // Flatten the nested arrays
      .filter(product => targetId.find(targetIds => product._id.toString() === targetIds)); // Compare as strings
    
    if (filteredProducts.length > 0) {
      console.log('Filtered Products:', filteredProducts);
      let filterpro=applyFilters(filteredProducts)
      setProducts(filteredProducts)
    } else {
      console.log('No products found');
    }

  }

    if (section && section!="newarrivals") { 
      fetchProducts(
        `${apiUrl}/productmodel?operation=filtered&section=${section}`
      );

  }
  if (props.category) { 
    fetchProducts(
      `${apiUrl}/productmodel?operation=filtered&section=${props.category}`
    );

}
  else if (category) {
      fetchProducts(
        `${apiUrl}/rent?operation=filtered&category=${category}`,
        "rent"
      );
    } else if (store && productdataonlydetail.length > 0) {
      const filteredData = applyFilters(productdataonlydetail);
      setProducts(productdataonlydetail);
      setoriginalProducts(productdataonlydetail)
    } else if (rent && rentdata.length > 0) {
      const filteredData = applyFilters(rentdata);
      setProducts(rentdata);
      setoriginalProducts(rentdata)
    } else if (wish && wishlistdata.length > 0) {
      // const filteredData = applyFilters(wishlistdata);
      console.log("ajani",wishlistdata)
      setProducts(wishlistdata);
    }
    else if (bestsale && a.length > 0) {
      // const filteredData = applyFilters(a);
      setProducts(a);
    }
    setIsLoading(false);
  }, [section, category, store, rent, wish, productdataonlydetail,filters, rentdata, wishlistdata,bestsale,productdata,a]);


  // console.log("kdod",prdallsizes)

  if(!wishlistdata){
  return(<p>loading...</p>)
  }
  if(wishlistdata){
  console.log("wishlist in wishs=list",wishlistdata)
  }
if(searchvalue){
  console.log("sv",searchvalue)
}

    return (
      <>
      {
        !wish?(<div className={!props.category?("filter-containerrr"):("hidefiltersec")} style={{borderBottom:"1px solid gray"}}>
          <div className="filter-row">
          
            <div className="filter-btn" onClick={() => togglePanel("sort")}>
            
              {selectedSortOption ? (
                <div className="selected-filter">
                  {selectedSortOption}{" "}
                  <span
                    className="remove-filter"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSortSelection("");
                    }}
                  >
                    ✕
                  </span>
                </div>
              ) : (
                <span>Sort By <IoIosArrowDown/></span>
                
              )}
            </div>

            <div className="filter-btn" onClick={() => togglePanel("size")}>
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
              {!Object.values(selectedSizes).flat().length &&   <span>Size <IoIosArrowDown/></span>}
            </div>
            <div className="filter-btn">
            <NavLink className='navlink' to={`/filter`}><span>Filter</span> <IoIosArrowDown /></NavLink> 
            </div>
            
          </div>

          {showSortPanel && (
            <div className="bottom-panel" style={{padding:"15px"}}>
              <div style={{display:"flex",justifyContent:"space-between"}}>
              <h4>Sort Options</h4>
              <span><RxCross1 size={20} onClick={()=>{setShowSortPanel(false)}}/></span>
              </div>
              <div style={{overflowY:"scroll"}}>
              {sortOptions.map((option, index) => (
                <div
                
                  key={index}
                  className={`panel-option-btn ${
                    selectedSortOption === option ? "selected" : ""
                  }`}
                  onClick={() => handleSortSelection(option)}
                >
                  <p>{option}</p>
                </div>
              ))}
              </div>
            </div>
          )}

          {showSizePanel && (
            <div className="bottom-panel" style={{padding:"10px"}}>
              <div style={{display:"flex",justifyContent:"space-between"}}>
              <h4>Size Options</h4>
              <span><RxCross1 size={20} onClick={()=>{setShowSizePanel(false)}}/></span>
              </div>
              {Object.keys(sizeOptions).map((category) => (
                <div key={category} className="size-pnll">
                  <h5 style={{padding:"10px 0"}}>{category}</h5>
                  {sizeOptions[category].map((size, index) => (
                    
                    <button
                      style={{ margin:"2px"}}
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
              ))}
            </div>
          )}
        </div>):(<div className="filter-containerrr" style={{padding:"0",textAlign:'center'}} ><h2 style={{paddingTop:"3px"}}>Your Wishlist</h2></div>)
      

      }

        

        <div className="unique-product-container" style={{marginTop:!props.category?(''):('0px')}}>
          {isLoading ? (
            <p>Loading products...</p>
          ) : products.length > 0 ? (
            products.map((product) => (
              <div className="product-card" style={{border:'none',boxShadow:"none"}}>
        {/* Image Section */}
        <div className="image-container">
          <NavLink to={`/productdescription/${!wish?(product._id):(product.itemid)}`}>
          <img
            src={img2} // Replace with real image
            alt="Product"
            className="product-image"
          />
          </NavLink>
          {/* Heart Icon */}
          <div className="heart-icon">{!wish ? (
    product.colors && product.colors.length > 0 ? (
      <div onClick={() => handleClick(product, product.colors?.[0]?._id)}>
        <HeartButton cardid={product.colors?.[0]?._id} />
      </div>
    ) : null
  ) : (
    <AiOutlineDelete onClick={() => removewishlistonly(product.itemid)} style={{ color: "black", position: 'relative', left: "-3px", bottom: "2px" }} size={15} />
  )}</div>
          {/* Rating */}
          <div className="rating">
            ⭐ 4.7 | 16
          </div>
        </div>

        {/* Details Section */}
        <div className="product-details">
          <p className="product-title">{product.description.length>19?(product.description.slice(0,18)+`...`):(product.description)}</p>
          <div className="product-pricing">
            <span className="current-price">₹{product.discountprice}</span>
            <span className="original-price">₹{product.price}</span>
            <span className="discount">{product.discount}off</span>
            
          </div>
          
        {!wish?(<div className="delivery-info" style={{fontSize:'.7rem',marginBottom:'20px'}}>⚡Delivery in 60 min</div>):( <button className="delivery-info" style={{paddingBottom:"10px",textAlign:'center',background:"green",color:"white"}}  onClick={()=>{setShowSize(product.itemid)}}>Add to Cart</button>)} 
        </div>
      </div>
            ))
          ) : (
            <p>No products available.</p>
          )}
        
        </div>
        {sizesshow==true?(<div className="showprdsizes">{prdallsizes.map((e)=>(<p onClick={()=>{handleAddToCart(addtocartkeliyeid,1,e)}}  className="ppsize">{e}</p>))}<RxCross1 style={{position:'fixed',right:'10px',top:'70px'}} onClick={()=>{setsizesshow(false)}}/></div>):('')} 
      </>
    );
  };

  export default Card;
