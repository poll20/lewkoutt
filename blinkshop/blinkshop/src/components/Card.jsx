// import React, { useState, useEffect } from "react";

//   import "./Card.css";
//   import { NavLink, useParams,useSearchParams  } from "react-router-dom";
//   // import { FaChevronDown, FaChevronUp } from "react-icons/fa";
//   import { useBio } from "./BioContext";
//   import { useMemo } from "react";
//   import { IoIosArrowDown } from "react-icons/io";
//   import { RxCross1 } from "react-icons/rx";
//   import HeartButton from "./HeartButton";
//   import { AiOutlineDelete } from "react-icons/ai";
//   import EmptyCart from './EmptyCart';
// import { useLoading } from "./LoadingContext";
// import OtpLogin from "./OtpLogin";
// import SlideUpModal from "./SlideupModel";
// import { slugify } from "./Slugify";
// import CatlogPriceFilter from "./CatlogPriceFilter";
//   import { BsFilterLeft } from "react-icons/bs";
//   // import FaChevronDown from "react-icons/fa";
// const Card = (props) => {
//   const apiUrl = import.meta.env.VITE_API_URL;
//     const[prdallsizes,setprdallsizes]=useState([])
//     // const [products, setProducts] = useState([]);
// const [page, setPage] = useState(1);
// const [hasMore, setHasMore] = useState(true);
//     const[prdqqty,setprdqqty]=useState([])
//     const [addtocartkeliyeid,setaddtocartkeliyeid]=useState("") 
//     const[sizesshow,setsizesshow]=useState(false)
//     const [products, setProducts] = useState([]);
//     const [originalproducts, setoriginalProducts] = useState([]);
//     // const [isLoading, setIsLoading] = useState(true);
//     const {setIsLoading}=useLoading()
//     const { section, category ,bestsale,store,rent,wish} = useParams();
//     console.log("bsee",section)
//     console.log("rentpoint",rent)
//   console.log("wish",wish)
//     // console.log("storeee",store)
//     const { bestsellingdata, wearsdata, rentdata,filters,wishlistdata,handleClick,productdata,newarrival,productdataonlydetail,handleAddToCart,searchvalue,removewishlistonly,showloginpage,setshowloginpage,sortOption, setSortOption,fetchCoupons,coupons} = useBio();
//  const [params] = useSearchParams();
//   const query = params.get("q");
//     const a = useMemo(() => {
//       return productdataonlydetail.filter((e) =>
//         bestsellingdata.some(
//           (item) => e._id.toString().trim() === item.productId.toString().trim()
//         )
//       );
//     }, [bestsellingdata]);
    
//     console.log("Wearsdata:", wearsdata);
//     console.log("Bestsellingdata:", bestsellingdata);
//     console.log("Filtered data (a):", a);
    
      

//     const [showSortPanel, setShowSortPanel] = useState(false);
//     const [showSizePanel, setShowSizePanel] = useState(false);
//     const [selectedSortOption, setSelectedSortOption] = useState("");
//     const [bestseller,setbestseller]=useState([])
//     const [selectedSizes, setSelectedSizes] = useState({
//       "Top Wear": [],
//       "Bottom Wear": [],
//     });

//     const sortOptions = [
//       "Price: Low to High",
//       "Price: High to Low",
//       "Price Range",
//       "Sizes"
//       // "New Arrival",
//       // "Best Seller",
//       // "Discount",
//     ];

//     const sizeOptions = {
//       "Top Wear": ["S", "M", "L"],
//       // "Bottom Wear": ["24", "26", "28", "30", "32", "34"],
//     };

//     const handleSizeSelection = (category, size) => {
//       setSelectedSizes((prev) => {
//         const updated = { ...prev };
//         console.log("updatepccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccrd",updated)
//         if (updated[category].includes(size)) {
//           updated[category] = updated[category].filter((s) => s !== size);
//         } else {
//           updated[category] = [...updated[category], size];
//         }
//         return updated;
//       });
//     };

//     const removeSizeFilter = (category, size) => {
//       setSelectedSizes((prev) => ({
//         ...prev,
//         [category]: prev[category].filter((s) => s !== size),
//       }));
//       // Reapply filters after removing size filter
//       const filteredData = applyFilters(products);
//       setProducts(originalproducts);
//     };
    
    

//     const removeSortFilter = () => {
//       setSelectedSortOption(""); // Reset selected sort option
//       const filteredData = applyFilters(products); // Reapply filters without sorting
//       console.log("  o",originalproducts)
//       if(bestsale){
//         setProducts(a)
//       }
//       else{
//       setProducts(originalproducts); // Update products
//       }
//     };
    
  

//     const togglePanel = (type) => {
//       if (type === "sort") {
//         setShowSortPanel(!showSortPanel);
//         setShowSizePanel(false);
//       } else if (type === "size") {
//         setShowSizePanel(!showSizePanel);
//         setShowSortPanel(false);
//       }
//     };

//     const handleSortSelection = (option) => {
//       console.log("sort option is",option)
//       if (option === "") {
//         removeSortFilter(); // Handle case where sort is cleared
//       } else {
//         setSelectedSortOption(option);
//         const filteredData = applyFilters(products); // Apply sorting
//         setProducts(filteredData);
//       }
//       // setShowSortPanel(false);
//     };
//     useEffect(() => {
//       if (products.length > 0) {
//         const filteredData = applyFilters(products);
//         setProducts(filteredData);
//       }
//     }, [selectedSortOption, selectedSizes,sortOption, filters,originalproducts]);
    
//     useEffect(() => {
//       const timer = setTimeout(() => {
//         console.log("🍿 Checking if product has category and tag (delayed):",productdataonlydetail);
    
//           console.log("📢 Calling fetchCoupons with:", productdataonlydetail?.cate, productdataonlydetail.tag);
//           fetchCoupons("all","all");
//         // console.log("copuen",coupons) 
//       }, 200);
    
//       return () => clearTimeout(timer);
//     }, [productdataonlydetail]);

//     if(coupons){  
//       console.log("coupons in card",coupons)
//     }
//     const applyFilters = (data) => {  
//         if (!Array.isArray(data)) {
//     console.warn("applyFilters expected an array but got:", data);
//     return [];
//   }

//       // console.log("lolo",data)
//   //     if (!Array.isArray(data)) {
//   //   console.log("😑 applyFilters को array चाहिए था, मिला:", data);
//   //   return [];
//   // }
//       let filteredProducts = [...data];
    
//       // Apply filters from context
//       const { pricerangemin, pricerangemax, sizes, bottomsizes, color, categories } = filters;
 
//  if(sizes){    
//     console.log("rimnu",sizes)
//  }
//  console.log("sled",selectedSizes)
//       // Filter by price range
//       // if (pricerangemin || pricerangemax) {
//       //   filteredProducts = filteredProducts.filter(
//       //     (product) =>
//       //       product.discountprice >= (pricerangemin || 0) &&
//       //       product.discountprice <= (pricerangemax || Infinity)
            
//       //   );
//       // }
//       if (pricerangemin || pricerangemax) {
//   filteredProducts = filteredProducts.filter((product) =>
//     (
//       console.log("gotty",product.discountprice),
//       product.discountprice >= (pricerangemin || 0) &&
//       product.discountprice <= (pricerangemax || Infinity)
//     ) );
// }

    
//     //  Filter by sizes
//       if (sizes.length > 0) {
//         console.log("aa to gya")
//         filteredProducts = filteredProducts.filter((product) =>
//           sizes.some((size) => product.colors.some((color) =>
//             color.sizes.some((e) => e.size === size)
//           ))
//         );
//         console.log("fpd",filteredProducts)
//       }
    
//       // Filter by color
//       if (color.length > 0) {
//         console.log("filterpp",filteredProducts)
//         filteredProducts = filteredProducts?.filter((product) =>
//           color?.includes(product.defaultColor.toLowerCase())
//         );
//         console.log("coloring",color,filteredProducts)
//       }
    
//       // Filter by categories
//       if (categories.length > 0) {
//         filteredProducts = filteredProducts.filter((product) =>
//           categories.includes(product.category)
//         );
//       }
//     console.log("selectedsize",selectedSizes)


//      // ✅ Apply sorting from Filter.js
//  // ✅ Apply sorting from Filter.js
// if (filters.sortBy === "Price: Low to High") {
//   filteredProducts.sort((a, b) => a.discountprice - b.discountprice);
// } else if (filters.sortBy === "Price: High to Low") {
//   filteredProducts.sort((a, b) => b.discountprice - a.discountprice);
// }


//       // Filter by size

//       filteredProducts.forEach((product, index) => {
//         console.log(`Product ${index + 1}:`, product);
//         product?.colors?.forEach((color, colorIndex) => {
//           console.log(`  Color ${colorIndex + 1}:`, color);
//           console.log(`    Sizes:`, color.sizes.map(s => s.size));
//         });
//       });
      
//       if (Object.values(selectedSizes).flat().length > 0) {
//         filteredProducts = filteredProducts.filter((product) =>
//           Object.keys(selectedSizes).some((category) =>
//             selectedSizes[category].some((size) =>
//               product.colors.some((color) =>
//                 color.sizes.some((e) => e.size === size)
//               )
//             )
//           )
//         );
//         console.log("chleedddddddddo",filteredProducts)
//       }
    
// // Filter by price range
// if (filters.pricerangemin || filters.pricerangemax) {
//   filteredProducts = filteredProducts.filter(product =>
//     product.discountprice >= (filters.pricerangemin || 0) &&
//     product.discountprice <= (filters.pricerangemax || Infinity)
//   );
// }

//       // Apply sorting
//       switch (sortOption) {
//         case "Price: Low to High":
//           filteredProducts.sort((a, b) => a.discountprice - b.discountprice);
//           console.log("lh",filteredProducts)
//           break;
//         case "Price: High to Low":
//           filteredProducts.sort((a, b) => b.discountprice - a.discountprice);
//           break;
//         case "New Arrival":
//           // filteredProducts.sort(
//           //   (a, b) => new Date(b.arrivalDate) - new Date(a.arrivalDate)
//           // );
//           if(!newarrival || !productdata){
//             return(<p>loading...</p>)
//           }
//           console.log("new arrival",newarrival)
//           let targetId = newarrival.map((e) => e.ProductId.toString());  // Convert to string if needed
//           console.log("tra", targetId);
//           const filteredProduct = filteredProducts.filter(product => targetId.find(targetIds => product._id.toString() === targetIds)); 
//             return filteredProduct
//         case "Discount":
//           filteredProducts.sort((a, b) => b.discount - a.discount);
//           break;
//         case "Best Seller":
//           console.log("hello yaarrrrrrrrrr")
//           if(bestsale){
//             setProducts(a)
//           }
//         else if(store){
//           return  a
//           }
//           else
//           {
//         filteredProducts = a.filter((product) => product.tag == section);
//         console.log("iloo",filteredProducts)
//           }
          
//   break;
//         default:
//           break;
//       }
//     console.log("rnadi",filteredProducts)
//       return filteredProducts;
//     };



  

//   const setShowSize = (id) => {
//     console.log("iid", id);

//     let prd = productdataonlydetail
//         .map(product => {
//             const matchingColor = product.colors.find(color => color._id === id);
//             if (matchingColor) {
//                 return {
//                     ...product,  // Product ka pura data
//                     colors: [{ 
//                         ...matchingColor,  // Matching color ka pura data
//                         price: product.price, // Price ko color object me add kiya
//                         discountprice: product.discountprice, // Discounted price
//                         shopname: product.shopname, // Shop Name
//                         shopaddress: product.shopaddress, // Shop Address
//                         discount: product.discount // Discount
//                     }]
//                 };
//             }
//             return null;
//         })
//         .filter(product => product !== null); // Sirf valid products rakho

//     console.log("prddd", prd);

//     if (prd.length > 0) {
//         let siz = prd[0].colors[0].sizes.map(e => e);
//         //  let qqty = prd[0].colors[0].sizes.map(e => e.quantity);
//         setprdallsizes(siz);  
//         // setprdqqty(qqty)
//         setaddtocartkeliyeid(prd[0].colors[0]); // Sirf ek object assign karo
//         setsizesshow(true);
//     }
// };

// const chlodekhe = (s, i) => {
//     console.log("dekhte h", s, i);
// };

//   //   const fetchProducts = async (url) => {  
      
//   //     // setIsLoading(true);
//   //     try {
//   //       setIsLoading(true)
//   //       const response = await fetch(url);
//   //       console.log("resofsec",response)
//   //       const data = await response.json();
//   //       console.log("jpbr",data)
//   //       console.log("querykilen",query)
//   //   const productdetails = query?.length == null? data :(data.products?.[0]?.productdetails || []);
//   // //   const productdetails = Array.isArray(data)
//   // // ? data
//   // // : Array.isArray(data?.products?.[0]?.productdetails)
//   // // ? data.products[0].productdetails
//   // // : [];

//   //       console.log("my ka gdata",productdetails)
//   //       const filteredData = applyFilters(productdetails);
//   //       setProducts(filteredData);
//   //       setoriginalProducts(productdetails)
//   //       if(originalproducts){
//   //         console.log("origi",originalproducts)
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching products:", error);
//   //     }
//   //     finally{
//   //     setIsLoading(false);
//   //     }
//   //   };

//   // --- normalize + fetchProducts (replace your existing fetchProducts) ---
// const normalizeProductDetails = (data) => {
//   // अगर data खुद array है तो वही लें
//   if (Array.isArray(data)) return data;

//   // common shapes:
//   // 1) { products: [ { productdetails: [...] }, ... ] }
//   if (Array.isArray(data?.products)) {
//     //अगर products के अंदर productdetails हैं, flatten कर लो
//     const byDetails = data.products.flatMap(p => Array.isArray(p.productdetails) ? p.productdetails : []);
//     if (byDetails.length) return byDetails;
//     // अगर products खुद products array जैसा ही है (containing product objects)
//     return data.products;
//   }

//   // 2) { products: { productdetails: [...] } } या { productdetails: [...] }
//   if (Array.isArray(data?.products?.productdetails)) return data.products.productdetails;
//   if (Array.isArray(data?.productdetails)) return data.productdetails;

//   // fallback: अगर data has items under some other key, try to extract arrays generically
//   // (you can expand this as per your API shapes)
//   return [];
// };

// const fetchProducts = async (url) => {
//   try {
//     setIsLoading(true);
//     const response = await fetch(url);
//     const data = await response.json();

//     // Normalize response -> always an array (or empty array)
//     // NOTE: when user is doing a search, ensure the search endpoint returns expected shape
//     const productdetails = normalizeProductDetails(data);

//     // keep originalProducts as raw normalized array
//     setoriginalProducts(productdetails);

//     // apply filters on the normalized array
//     const filteredData = applyFilters(productdetails);
//     setProducts(filteredData);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     setProducts([]); // safe fallback
//     setoriginalProducts([]);
//   } finally {
//     setIsLoading(false);
//   }
// };

//   useEffect(() => {
//     setProducts([]); // Clear the current product list
//     // setoriginalProducts([])

//   if(section=="newarrivals")
//   {

//     if(!newarrival || !productdata){
//       return(<p>loading...</p>)
//     }
//     console.log("new arrival",newarrival)
//     let targetId = newarrival.map((e) => e.ProductId.toString());  // Convert to string if needed
//     console.log("tra", targetId);
    
//     const filteredProducts = productdata
//       .map(item => item.productdetails) // Get productdetails from each category
//       .flat() // Flatten the nested arrays
//       .filter(product => targetId.find(targetIds => product._id.toString() === targetIds)); // Compare as strings
    
//     if (filteredProducts.length > 0) {
//       console.log('Filtered Products:', filteredProducts);
//       let filterpro=applyFilters(filteredProducts)
//       setProducts(filteredProducts)
//     } else {
//       console.log('No products found');
//     }

//   }

//     if (section && section!="newarrivals") { 
//       fetchProducts(
//         `${apiUrl}/productmodel?operation=filtered&section=${section?(section):(props.section)}`
//       );

//   }
//   if (props.category) { 
//     console.log("first",props.category)
//     fetchProducts(
//       `${apiUrl}/productmodel?operation=filtered&section=${props.category}`
//     );

// }
// if(query){
//   console.log("quesry mili",query)
//   fetchProducts(
//       `${apiUrl}/search?q=${query}`
//     );
// }
//   else if (category) {
//     console.lof("second",category)
//       fetchProducts(
//         `${apiUrl}/rent?operation=filtered&category=${category}`,
//         "rent"
//       );
//     } else if (store && productdataonlydetail.length > 0) {
//       const filteredData = applyFilters(productdataonlydetail);
//       console.log("ajanioi",wishlistdata,coupons)

//       setProducts(productdataonlydetail);
//       setoriginalProducts(productdataonlydetail)
//     } else if (rent && rentdata.length > 0) {
//       const filteredData = applyFilters(rentdata);
//       setProducts(rentdata);
//       setoriginalProducts(rentdata)
//     } else if (wish && wishlistdata.length > 0) {
//       // const filteredData = applyFilters(wishlistdata);
//       console.log("ajani",wishlistdata,coupons)
//       setProducts(wishlistdata);
//     }
//     else if (bestsale && a.length > 0) {
//       // const filteredData = applyFilters(a);
//       setProducts(a);
//     }
//     // setIsLoading(false);
//   }, [section, category, store,props.category, wish, productdataonlydetail,filters, wishlistdata,productdata,a,query]);


//   // console.log("kdod",prdallsizes)

//   if(!wishlistdata){
//   return(<p>loading...</p>)
//   }
//   if(wishlistdata){
//   console.log("wishlist in wishs=list",wishlistdata)
//   }
// if(searchvalue){
//   console.log("sv",searchvalue)
// }

//     return (
//       <>
//       {
//         !wish?(<div className={!props.category?("filter-containerrr"):("hidefiltersec")} style={{borderBottom:"1px solid gray",backgroundColor:' white'}}>
//           <div className="filter-row" style={{display:"flex",alignItems:"start",justifyContent:"start"}}>
          
           



//             <div className="filter-btn">
//             <NavLink className='navlink' to={`/filter`}style={{display:"flex",alignItems:"center",gap:"5px"}} ><BsFilterLeft size={20}/><span>{filters.pricerangemax!=3000 || filters.pricerangemin!=300 || filters.sizes.length!=0 || filters.color.length!=0 || filters.categories.length!=0  ?( <span style={{color:"red",fontWeight:"bolder"}}><span style={{color:"black",fontFamily: "Oswald",fontSize:"15px"}}>Filter</span> *</span>):(<span style={{color:"black",fontFamily: "Oswald",fontSize:"15px",fontWeight:"bold"}}>Filter and sort</span>)}</span> </NavLink> 
//             </div>
            
//           </div>

//           {showSortPanel && (
            
//             <div
//   className="bottom-panel"
//   style={{
//     position: "fixed",
//     bottom: 0,
//     left: 0,
//     width: "100%",
//     backgroundColor: "#fff",
//     borderTopLeftRadius: "15px",
//     borderTopRightRadius: "15px",
//     boxShadow: "0 -4px 10px rgba(0,0,0,0.1)",
//     padding: "15px",
//     transition: "height 0.3s ease",
//     zIndex: 1000,
//     minHeight: "50vh",
//     overflowY: "auto",
//   }}
// >
//   {/* Header */}
//   <div
//     style={{
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       marginBottom: "10px",
//     }}
//   >
//     <h4
//       style={{
//         fontSize: "16px",
//         fontWeight: "bold",
//         margin: 0,
//         color: "#333",
//       }}
//     >
//       Sort Options
//     </h4>
//     <span
//       style={{
//         cursor: "pointer",
//         color: "#666",
//         transition: "color 0.3s ease",
//       }}
//       onMouseEnter={(e) => (e.target.style.color = "#000")}
//       onMouseLeave={(e) => (e.target.style.color = "#666")}
//       onClick={() => setShowSortPanel(false)}
//     >
//       <RxCross1 size={22} />
//     </span>
//   </div>

//   {/* Options */}
//   <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
//     {sortOptions.map((option, index) => (
//       <div
//         key={index}
//         onClick={() => handleSortSelection(option)}
//         style={{
//           border:
//             selectedSortOption === option
//               ? "1px solid #F15A29"
//               : "1px solid #ddd",
//           borderRadius: "10px",
//           padding: "10px",
//           cursor: "pointer",
//           transition: "all 0.2s ease",
//           backgroundColor:
//             selectedSortOption === option ? "#FFF5F2" : "transparent",
//         }}
//       >
//         <p
//           style={{
//             margin: 0,
//             fontSize: "14px",
//             color: selectedSortOption === option ? "#F15A29" : "#333",
//             fontWeight: selectedSortOption === option ? "600" : "400",
//           }}
//         >
//           {option}
//         </p>
//  {/* Filter just below text — no gap */}
//         {option === "Price Range" ? (
//           <div
//             style={{
//               marginTop: "14px",
              
//               borderRadius: "8px",
//               display: "flex",
//               justifyContent: "flex-start", // 👈 aligned to left
//               alignContent: "start",
//               // alignItems: "center",
//              paddingRight: "40%",
          
//               backgroundColor: "#fff",

//             }}
//           >
//             <CatlogPriceFilter />
//           </div>
//         ) : null}


//         {option === "Sizes" ? (
//   Object.keys(sizeOptions).map((category) => (
//     <div key={category} className="size-pnll">
//       <h5 style={{ padding: "10px 0", fontSize: "14px", fontWeight: "600" }}>
//         {category}
//       </h5>

//       {sizeOptions[category].map((size, index) => (
//         <button
//           key={index}
//           style={{
//             margin: "3px",
//             padding: "6px 10px",
//             borderRadius: "5px",
//             border: selectedSizes[category].includes(size)
//               ? "1px solid #F15A29"
//               : "1px solid #ccc",
//             backgroundColor: selectedSizes[category].includes(size)
//               ? "#FFF5F2"
//               : "#fff",
//             color: selectedSizes[category].includes(size) ? "#F15A29" : "#333",
//             fontSize: "12px",
//             cursor: "pointer",
//             transition: "all 0.2s ease",
//           }}
//           className={`size-btn ${
//             selectedSizes[category].includes(size) ? "selected" : ""
//           }`}
//           onClick={() => handleSizeSelection(category, size)}
//         >
//           {size}
//         </button>
//       ))}
//     </div>
//   ))
// ) : null}

//       </div>
//     ))}
//   </div>
// </div>

//           )}

//           {showSizePanel && (
//             <div className="bottom-panel" style={{padding:"10px"}}>
//               <div style={{display:"flex",justifyContent:"space-between"}}>
//               <h4>Size Options</h4>
              
//               <span><RxCross1 size={20} onClick={()=>{setShowSizePanel(false)}}/></span>
//               </div>
//               {Object.keys(sizeOptions).map((category) => (
//                 <div key={category} className="size-pnll">
//                   <h5 style={{padding:"10px 0"}}>{category}</h5>
//                   {sizeOptions[category].map((size, index) => (
                    
//                     <button
//                       style={{ margin:"2px"}}
//                       key={index}
//                       className={`size-btn ${
//                         selectedSizes[category].includes(size) ? "selected" : ""
//                       }`}
//                       onClick={() => handleSizeSelection(category, size)}
//                     >
//                       {size}
//                     </button>
                    
//                   ))}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>):(!wish?(<div className="filter-containerrr" style={{padding:"0",textAlign:'center'}} ><h2 style={{paddingTop:"3px",backgroundColor: 'white'}}>Your Wishlist</h2></div>):(''))
      

//       }

        

//         <div className="unique-product-container" style={{marginTop:!props.category?(''):('0px')}}>
//         {products.length > 0 ? (
//             products.map((product) => (
              
//               <div className="product-card" style={{boxShadow:"none",margin:"1px auto"}}>
        
//         {/* <div className="image-container">
//           <NavLink to={`/productdescription/${ slugify(product.title)}/${!wish?(product._id):(product?.itemid)}/${product?.color || product?.defaultColor}`}>
//           <img
//             src={product.image[0]} 
//             alt={product?.title || "Product"}
//             className="product-image"
//             loading="lazy"

//           />
//           </NavLink>
          
//           <div className="heart-icon">{!wish ? (
//     product.colors && product.colors.length > 0 ? (
//       <div onClick={() => handleClick(product, product.colors?.[0]?._id)}>
//         <HeartButton cardid={product.colors?.[0]?._id} dw={30} dh={30} dmt={-8} dml={-8}/>
//       </div>
//     ) : null
//   ) : (
//     <AiOutlineDelete onClick={() => removewishlistonly(product.itemid)} style={{ color: "black", position: 'relative', left: "-3px", bottom: "2px" }} size={15} />
//   )}</div>
        
//         </div> */}
//         <div className="image-container" style={{ position: "relative",marginBottom: "0"  }}>
//   <NavLink
//     to={`/productdescription/${slugify(product.title)}/${
//       !wish ? product._id : product?.itemid
//     }/${product?.color || product?.defaultColor}`}
//   >
//     <div
//       className="product-image-wrapper"
//       style={{
//         position: "relative",
//         width: "100%",
//         height: "300px", // 👈 same height as before to keep layout stable
//         borderRadius: "6px",
//         overflow: "hidden",
//       }}
//     >
//       <img
//         src={product.image[0]}
//         alt={product?.title || "Product"}
//         className="product-image"
//         loading="lazy"
//         style={{
//           width: "100%",
//           height: "100%",
//           objectFit: "cover",
//           transition: "0.3s ease",
//           filter: product?.colors?.some((color) =>
//             color?.sizes?.some((size) => size.quantity === 0)
//           )
//             ? "brightness(50%)"
//             : "none",
//         }}
//       />

//       {/* 🔥 Sold Out Overlay */}
//       {product?.colors?.some((color) =>
//         color?.sizes?.some((size) => size.quantity === 0)
//       ) && (
//         <div
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0, 0, 0, 0.5)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             color: "white",
//             fontWeight: "bold",
//             fontSize: "18px",
//             letterSpacing: "1px",
//             fontFamily: "Oswald",
//             borderRadius: "6px",
//             zIndex: 2,
//           }}
//         >
//           SOLD OUT
//         </div>
//       )}
//     </div>
//   </NavLink>

//   {/* ❤️ Heart Icon - stays fixed at top corner */}
//   <div
//     className="heart-icon"
//     style={{
//       position: "absolute",
//       top: "10px",
//       right: "10px",
//       zIndex: 3,
//     }}
//   >
//     {!wish ? (
//       product.colors && product.colors.length > 0 ? (
//         <div onClick={() => handleClick(product, product.colors?.[0]?._id)}>
//           <HeartButton
//             cardid={product.colors?.[0]?._id}
//             dw={30}
//             dh={30}
//             dmt={-8}
//             dml={-8}
//           />
//         </div>
//       ) : null
//     ) : (
//       <AiOutlineDelete
//         onClick={() => removewishlistonly(product.itemid)}
//         style={{
//           color: "black",
//           position: "relative",
//           left: "-3px",
//           bottom: "2px",
//         }}
//         size={15}
//       />
//     )}
//   </div>
// </div>


//         {/* Details Section */}
//         <div className="product-details">
//           {/* fontFamily: "'Inter', sans-serif */}
//           <span className="product-title" style={{fontFamily: "Oswald",fontWeight:"600",fontSize:"15px"}}>{product.description?.length>10?(product.description?.slice(0,17)+`...`):(product.description)}</span>
//           {
//             coupons.length==0?( <div className="product-pricing">
//             <span className="original-price" style={{ fontFamily: "Oswald" }}>₹{product?.price}</span>

//             <span className="current-price" style={{ fontFamily: "Oswald" }}>₹{product?.discountprice}</span>
//             {/* <span className="original-price" style={{ fontFamily: "Oswald" }}>₹{product?.price}</span> */}
//             <span className="discount"style={{ fontFamily: "Oswald",color: "red" }}>{product?.discount}% off</span>
            
            
//           </div>):( 
//             <div className="product-pricing" style={{display:"flex",flexDirection:"column",alignItems:"start",justifyContent: 'start',gap:"0px"}}>
//               <div style={{display:"flex",flexDirection:"row",alignItems:"center",gap:"5px"}}> 
//             <span className="original-price" style={{ fontFamily: "Oswald" }}>₹{product?.price}</span>

//             <span className="current-price" style={{ fontFamily: "Oswald" }}>₹{product?.discountprice}</span>

//             {/* <span className="original-price" style={{ fontFamily: "Oswald" }}>₹{product?.price}</span> */}
//             <span className="discount"style={{ fontFamily: "Oswald",color: "red" }}>{product?.discount}% off</span>
// </div>

//             {/* <span
//   className="current-price"
//   style={{ fontFamily: "Oswald", color: "rgb(52 195 52)" }}
// >
//   Get it For ₹
//   {coupons[0]?.discountType === "fixed"
//     ? (product?.discountprice - coupons[0]?.discountValue).toFixed(0)
//     : (product?.discountprice -
//         (product?.discountprice * coupons[0]?.discountValue) / 100
//       ).toFixed(2)}
// </span> */}
// <span
//   className="current-price"
//   style={{ fontFamily: "Oswald", color: "rgb(52 195 52)" }}
// >
//   Get it For ₹
//   {coupons[0]?.discountType === "fixed"
//     ? Math.floor(product?.discountprice - coupons[0]?.discountValue)
//     : Math.floor(
//         product?.discountprice -
//         (product?.discountprice * coupons[0]?.discountValue) / 100
//       )}
// </span>


//             {/* <span className="current-price" style={{ fontFamily: "Oswald",color: "rgb(52 195 52)" }}>Get it For ₹{product?.discountprice - coupons[0]?.discountValue}</span> */}
//             {/* <span className="original-price" style={{ fontFamily: "Oswald" }}>₹{product?.price}</span> */}
//             {/* <span className="discount"style={{ fontFamily: "Oswald",color: "rgb(131, 241, 131)" }}>{product?.discount}% off</span> */}
            
            
//           </div>)
//           }
         
        
          
//         {/* {!wish?(<div className="delivery-info" style={{fontSize:'.7rem',marginBottom:'20px'}}>⚡Delivery in 60 min</div>):( <button className="delivery-info" style={{paddingBottom:"10px",textAlign:'center',background:"black",color:"white",border:"none",borderRadius:"5px",marginBottom:"20px",backgroundColor:"#F15A29"}}  onClick={()=>{setShowSize(product.itemid)}}>Add to Cart</button>)}  */}
//         {/* {!wish?(''):( <button className="delivery-info" style={{padding:"10px" ,  background:"black",color:"white",border:"none",borderRadius:"5px",marginBottom:coupons.length==0?("23px"):("37px"),backgroundColor:"black", display:"flex",alignItems:"center",justifyContent:"center"}}  onClick={()=>{setShowSize(product.itemid)}}>Add to Bag</button>)}  */}
//         {!wish ? (
//   ""
// ) : (
//   <button
//     className="delivery-info"
//     style={{
//       padding: "10px",
//       background: "black",
//       color: "white",
//       border: "none",
//       borderRadius: "5px",
//       marginBottom: coupons.length === 0 ? "40px" : "10px", // 👈 yahan spacing bada di
//       backgroundColor: "black",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//     }}
//     onClick={() => {
//       setShowSize(product.itemid);
//     }}
//   >
//     Add to Bag
//   </button>
// )}


//         </div>
//       </div>
//             ))
//           ) : (
            
//               !wish?(<p></p>):( <div style={{width:"90vw",padding:"0",margin:"0"}}><EmptyCart endpoint={window.location.pathname.substring(1)} /></div>)
            
            
//           )}
        
//         </div>
//         {/* {sizesshow==true?(<div className="showprdsizes">{prdallsizes.map((e)=>(<p onClick={()=>{handleAddToCart(addtocartkeliyeid,1,e)}}  className="ppsize">{e}</p>))}<RxCross1 style={{position:'fixed',right:'10px',top:'70px'}} onClick={()=>{setsizesshow(false)}}/></div>):('')}  */}
//         <div 
//   className={`abhayraj-bottom-sheet ${sizesshow ? 'abhayraj-show' : ''}`}
// >
//   <div className="abhayraj-sheet-header">
//     <span>Select Size</span>
//     <button onClick={() => setsizesshow(false)} className="abhayraj-close-button">
//       ✖
//     </button>
//   </div>

//   <div className="abhayraj-size-buttons-wrapper">
//     {prdallsizes.map((size, index) => (
//       <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
//       <button
//         key={index}
//         className="abhayraj-size-button"
//         onClick={() => handleAddToCart(addtocartkeliyeid, 1, size.size)}
        
//       >
//       <span style={{textAlign:"center"}}>{size.size}</span>
     
//       </button>
//       {/* <span>{size.quantity} Left</span> */}
//     </div>
//     ))}
       
//   </div>
//   {/* {showloginpage?(<OtpLogin/>):('')} */}
//   {showloginpage==true?(
//   <div>
//     {/* <button onClick={() => setShowModal(true)}>Open SlideUp</button> */}

//     <SlideUpModal show={showloginpage} onClose={() => setshowloginpage(false)}>
//       <OtpLogin/>
//     </SlideUpModal>
//   </div>
// ):('')}

// </div>

//       </>
//     );
//   };

//   export default Card;
import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Card.css";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineDelete } from "react-icons/ai";
import { BsFilterLeft } from "react-icons/bs";
import HeartButton from "./HeartButton";
import EmptyCart from "./EmptyCart";
import OtpLogin from "./OtpLogin";
import SlideUpModal from "./SlideupModel";
import CatlogPriceFilter from "./CatlogPriceFilter";
import { slugify } from "./Slugify";
import { useBio } from "./BioContext";
import { useLoading } from "./LoadingContext";

// === Optimized Card component ===
// Key improvements:
// 1) Clear separation of fetching vs local filtering/sorting
// 2) AbortController + fetchId to avoid race conditions (outdated responses ignored)
// 3) Single source-of-truth: originalProducts (raw normalized array) and derived products (filtered)
// 4) Minimal and stable effect dependencies
// 5) Defensive normalization of API response

const normalizeProductDetails = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.products)) {
    // common shape: { products: [ { productdetails: [...] }, ... ] }
    const byDetails = data.products.flatMap((p) => (Array.isArray(p.productdetails) ? p.productdetails : Array.isArray(p) ? p : []));
    if (byDetails.length) return byDetails;
    return data.products;
  }
  if (Array.isArray(data.products?.productdetails)) return data.products.productdetails;
  if (Array.isArray(data.productdetails)) return data.productdetails;
  return [];
};

const applyFiltersAndSort = ({ items = [], filters = {}, selectedSizes = {}, sortOption = "", externalSortOption = "", newarrival = [], bestsellingIds = [] }) => {
  if (!Array.isArray(items)) return [];
  let filtered = [...items];

  const { pricerangemin = 0, pricerangemax = Infinity, sizes = [], color = [], categories = [], sortBy } = filters || {};

  // price filter (defensive)
  if (filters.pricerangemin || filters.pricerangemax) {
    filtered = filtered.filter((p) => typeof p.discountprice === 'number' && p.discountprice >= pricerangemin && p.discountprice <= pricerangemax);
  }

  // sizes filter (from Filter context)
  if (Array.isArray(sizes) && sizes.length > 0) {
    filtered = filtered.filter((product) =>
      product.colors?.some((c) => c.sizes?.some((s) => sizes.includes(s.size)))
    );
  }

  // color filter
  if (Array.isArray(color) && color.length > 0) {
    filtered = filtered.filter((p) => color.includes((p.defaultColor || "").toLowerCase()));
  }

  // categories filter
  if (Array.isArray(categories) && categories.length > 0) {
    filtered = filtered.filter((p) => categories.includes(p.category));
  }

  // selectedSizes (UI size panel) - selectedSizes = { "Top Wear": ["S"], ... }
  if (Object.values(selectedSizes).flat().length > 0) {
    const sizeList = Object.values(selectedSizes).flat();
    filtered = filtered.filter((product) => product.colors?.some((c) => c.sizes?.some((s) => sizeList.includes(s.size))));
  }

  // External sort flags (sortOption / sortBy)
  const effectiveSort = externalSortOption || sortBy || sortOption;
  switch (effectiveSort) {
    case "Price: Low to High":
      filtered.sort((a, b) => (a.discountprice || 0) - (b.discountprice || 0));
      break;
    case "Price: High to Low":
      filtered.sort((a, b) => (b.discountprice || 0) - (a.discountprice || 0));
      break;
    case "New Arrival":
      // newarrival passed as array of ProductId strings
      if (Array.isArray(newarrival) && newarrival.length > 0) {
        const ids = newarrival.map((n) => n?.ProductId?.toString());
        filtered = filtered.filter((p) => ids.includes(p._id?.toString()));
      }
      break;
    case "Best Seller":
      if (Array.isArray(bestsellingIds) && bestsellingIds.length > 0) {
        filtered = filtered.filter((p) => bestsellingIds.includes(p._id?.toString()));
      }
      break;
    default:
      break;
  }

  return filtered;
};

const Card = (props) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { section, category, bestsale, store, rent, wish } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const { setIsLoading } = useLoading();
  const { filters, wishlistdata, productdataonlydetail, productdata, newarrival, bestsellingdata, handleClick, handleAddToCart, showloginpage, setshowloginpage, sortOption } = useBio();

  // local UI states
  const [originalProducts, setOriginalProducts] = useState([]); // canonical raw data from server (normalized)
  const [products, setProducts] = useState([]); // derived (filtered) list shown in UI
  const [selectedSizes, setSelectedSizes] = useState({ "Top Wear": [], "Bottom Wear": [] });
  const [showSortPanel, setShowSortPanel] = useState(false);
  const [showSizePanel, setShowSizePanel] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [prdallsizes, setPrdAllSizes] = useState([]);
  const [addtocartkeliyeid, setAddToCartKeliyeId] = useState(null);
  const [sizesshow, setSizesShow] = useState(false);

  // fetch control
  const latestFetchId = useRef(0);

  // Helper: selects a color id and prepares sizes (kept as original behavior)
  const setShowSize = (id) => {
    const prd = productdataonlydetail
      .map((product) => {
        const matchingColor = product.colors.find((color) => color._id === id);
        if (matchingColor) {
          return { ...product, colors: [{ ...matchingColor, price: product.price, discountprice: product.discountprice, shopname: product.shopname, shopaddress: product.shopaddress, discount: product.discount }] };
        }
        return null;
      })
      .filter(Boolean);

    if (prd.length > 0) {
      const siz = prd[0].colors[0].sizes.map((e) => e);
      setPrdAllSizes(siz);
      setAddToCartKeliyeId(prd[0].colors[0]);
      setSizesShow(true);
    }
  };

  const handleSizeSelection = (category, size) => {
    setSelectedSizes((prev) => {
      const updated = { ...prev };
      if (!Array.isArray(updated[category])) updated[category] = [];
      if (updated[category].includes(size)) {
        updated[category] = updated[category].filter((s) => s !== size);
      } else {
        updated[category] = [...updated[category], size];
      }
      return updated;
    });
  };

  // Fetch products based on route / props. This effect only runs when URL identifying params change.
  useEffect(() => {
    let active = true;
    const fetchId = ++latestFetchId.current; // bump fetchId
    const controller = new AbortController();

    const doSet = (items) => {
      // ignore outdated responses
      if (fetchId !== latestFetchId.current) return;
      setOriginalProducts(items);
      setProducts(() => applyFiltersAndSort({ items, filters, selectedSizes, sortOption: selectedSortOption, externalSortOption: sortOption, newarrival, bestsellingIds: (bestsellingdata || []).map(b => b.productId?.toString()) }));
    };

    const fetchProducts = async (url) => {
      try {
        setIsLoading(true);
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error("Network error");
        const data = await res.json();
        const productdetails = normalizeProductDetails(data);
        doSet(productdetails);
      } catch (err) {
        if (err.name === "AbortError") return; // aborted
        console.error("fetchProducts error", err);
        doSet([]);
      } finally {
        if (fetchId === latestFetchId.current) setIsLoading(false);
      }
    };

    // Decide which source to load (priority order) — only one fetch decision per effect run.
    // Cases: search query -> props.category -> section -> rent -> others -> store/wishlist handled with local data
    (async () => {
      // clear current list while loading
      setProducts([]);
      setOriginalProducts([]);

      if (query) {
        await fetchProducts(`${apiUrl}/search?q=${encodeURIComponent(query)}`);
        return;
      }

      if (props.category) {
        await fetchProducts(`${apiUrl}/productmodel?operation=filtered&section=${encodeURIComponent(props.category)}`);
        return;
      }

      if (section && section !== "newarrivals") {
        await fetchProducts(`${apiUrl}/productmodel?operation=filtered&section=${encodeURIComponent(section)}`);
        return;
      }

      // newarrivals is a special case: we derive from productdata and newarrival index
      if (section === "newarrivals") {
        // rely on productdata being present in context
        const targetIds = (newarrival || []).map((e) => e.ProductId?.toString()).filter(Boolean);
        const flattened = (productdata || []).flatMap((p) => Array.isArray(p.productdetails) ? p.productdetails : []);
        const filteredProducts = flattened.filter((prod) => targetIds.includes(prod._id?.toString()));
        doSet(filteredProducts);
        return;
      }

      // if store (client-side data available), use it
      if (store && productdataonlydetail?.length > 0) {
        doSet(productdataonlydetail);
        return;
      }

      // rent data and wish handled similarly by parent/context; if they are present, use them
      if (rent && Array.isArray(productdata) && productdata.length > 0) {
        // assume rentdata passed in productdata or context; caller should supply rentdata accordingly
        doSet(productdata);
        return;
      }

      if (wish && Array.isArray(wishlistdata) && wishlistdata.length > 0) {
        doSet(wishlistdata);
        return;
      }

      // default fallback: fetch a generic listing endpoint
      await fetchProducts(`${apiUrl}/productmodel?operation=list`);

    })();

    return () => {
      active = false;
      controller.abort();
    };

    // only when url-identifying params change
  }, [apiUrl, section, category, props.category, query, store, rent, wish, productdataonlydetail, productdata, newarrival, bestsellingdata]);

  // Local filtering and sorting effect: runs when filters or UI sort/size selections change.
  // This DOES NOT trigger network fetch; it derives 'products' from originalProducts.
  useEffect(() => {
    const derived = applyFiltersAndSort({ items: originalProducts, filters, selectedSizes, sortOption: selectedSortOption, externalSortOption: sortOption, newarrival, bestsellingIds: (bestsellingdata || []).map(b => b.productId?.toString()) });
    setProducts(derived);
  }, [originalProducts, filters, selectedSizes, selectedSortOption, sortOption, newarrival, bestsellingdata]);

  // UI helpers
  const removeSortFilter = () => {
    setSelectedSortOption("");
    setProducts(applyFiltersAndSort({ items: originalProducts, filters, selectedSizes, externalSortOption: sortOption }));
  };

  const handleSortSelection = (option) => {
    setSelectedSortOption(option);
  };

  // quick debug-safe rendering protection
  if (!Array.isArray(products)) return null;

  return (
    <>
      {/* Filter / Sort header */}
      <div className={!props.category ? "filter-containerrr" : "hidefiltersec"} style={{ borderBottom: "1px solid gray", backgroundColor: "white" }}>
        <div className="filter-row" style={{ display: "flex", alignItems: "start", justifyContent: "start" }}>
          <div className="filter-btn">
            <NavLink className='navlink' to={`/filter`} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <BsFilterLeft size={20} />
              <span style={{ color: "black", fontFamily: "Oswald", fontSize: "15px", fontWeight: "bold" }}>Filter and sort</span>
            </NavLink>
          </div>
        </div>

        {showSortPanel && (
          <div className="bottom-panel" style={{ position: "fixed", bottom: 0, left: 0, width: "100%", backgroundColor: "#fff", borderTopLeftRadius: "15px", borderTopRightRadius: "15px", boxShadow: "0 -4px 10px rgba(0,0,0,0.1)", padding: "15px", zIndex: 1000, minHeight: "50vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <h4 style={{ fontSize: "16px", fontWeight: "bold", margin: 0, color: "#333" }}>Sort Options</h4>
              <span style={{ cursor: "pointer", color: "#666" }} onClick={() => setShowSortPanel(false)}><RxCross1 size={22} /></span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {["Price: Low to High", "Price: High to Low", "Price Range", "Sizes"].map((option) => (
                <div key={option} onClick={() => handleSortSelection(option)} style={{ border: selectedSortOption === option ? "1px solid #F15A29" : "1px solid #ddd", borderRadius: "10px", padding: "10px", cursor: "pointer" }}>
                  <p style={{ margin: 0, fontSize: "14px", color: selectedSortOption === option ? "#F15A29" : "#333", fontWeight: selectedSortOption === option ? "600" : "400" }}>{option}</p>
                  {option === "Price Range" && <div style={{ marginTop: "14px", paddingRight: "40%", backgroundColor: "#fff" }}><CatlogPriceFilter /></div>}
                  {option === "Sizes" && (
                    <div>
                      {Object.keys(selectedSizes).map((category) => (
                        <div key={category} className="size-pnll">
                          <h5 style={{ padding: "10px 0", fontSize: "14px", fontWeight: "600" }}>{category}</h5>
                          {["S", "M", "L"].map((size) => (
                            <button key={size} style={{ margin: "3px", padding: "6px 10px", borderRadius: "5px", border: selectedSizes[category]?.includes(size) ? "1px solid #F15A29" : "1px solid #ccc", backgroundColor: selectedSizes[category]?.includes(size) ? "#FFF5F2" : "#fff", color: selectedSizes[category]?.includes(size) ? "#F15A29" : "#333" }} onClick={() => handleSizeSelection(category, size)}>{size}</button>
                          ))}
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

      {/* Product grid */}
      <div className="unique-product-container" style={{ marginTop: !props.category ? "" : "0px" }}>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id || product.itemid || Math.random()} className="product-card" style={{ boxShadow: "none", margin: "1px auto" }}>

              <div className="image-container" style={{ position: "relative", marginBottom: "0" }}>
                <NavLink to={`/productdescription/${slugify(product.title)}/${!wish ? product._id : product?.itemid}/${product?.color || product?.defaultColor}`}>
                  <div className="product-image-wrapper" style={{ position: "relative", width: "100%", height: "300px", borderRadius: "6px", overflow: "hidden" }}>
                    <img src={product.image?.[0]} alt={product?.title || "Product"} className="product-image" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />

                    {product?.colors?.some((color) => color?.sizes?.some((s) => s.quantity === 0)) && (
                      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center", color: "white", fontWeight: "bold", fontSize: "18px", borderRadius: "6px", zIndex: 2 }}>SOLD OUT</div>
                    )}
                  </div>
                </NavLink>

                <div className="heart-icon" style={{ position: "absolute", top: "10px", right: "10px", zIndex: 3 }}>
                  {!wish ? (
                    product.colors && product.colors.length > 0 ? (
                      <div onClick={() => handleClick(product, product.colors?.[0]?._id)}>
                        <HeartButton cardid={product.colors?.[0]?._id} dw={30} dh={30} dmt={-8} dml={-8} />
                      </div>
                    ) : null
                  ) : (
                    <AiOutlineDelete onClick={() => console.warn('remove from wishlist not implemented here')} style={{ color: "black", position: 'relative', left: "-3px", bottom: "2px" }} size={15} />
                  )}
                </div>

              </div>

              <div className="product-details">
                <span className="product-title" style={{ fontFamily: "Oswald", fontWeight: "600", fontSize: "15px" }}>{product.description?.length > 10 ? (product.description?.slice(0, 17) + `...`) : (product.description)}</span>

                <div className="product-pricing">
                  <span className="original-price" style={{ fontFamily: "Oswald" }}>₹{product?.price}</span>
                  <span className="current-price" style={{ fontFamily: "Oswald" }}>₹{product?.discountprice}</span>
                  <span className="discount" style={{ fontFamily: "Oswald", color: "red" }}>{product?.discount}% off</span>
                </div>

                {!wish ? null : (
                  <button className="delivery-info" style={{ padding: "10px", background: "black", color: "white", border: "none", borderRadius: "5px", marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setShowSize(product.itemid)}>Add to Bag</button>
                )}

              </div>

            </div>
          ))
        ) : (
          wish ? (
    <div style={{ width: "90vw", padding: "0", margin: "0" }}>
      <EmptyCart endpoint="wishlist" />
    </div>
  ) : null
        )}
      </div>

      {/* Size bottom sheet */}
      <div className={`abhayraj-bottom-sheet ${sizesshow ? 'abhayraj-show' : ''}`}>
        <div className="abhayraj-sheet-header">
          <span>Select Size</span>
          <button onClick={() => setSizesShow(false)} className="abhayraj-close-button">✖</button>
        </div>
        <div className="abhayraj-size-buttons-wrapper">
          {prdallsizes.map((size, index) => (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} key={index}>
              <button className="abhayraj-size-button" onClick={() => handleAddToCart(addtocartkeliyeid, 1, size.size)}><span style={{ textAlign: "center" }}>{size.size}</span></button>
            </div>
          ))}
        </div>
      </div>

      {showloginpage ? (
        <SlideUpModal show={showloginpage} onClose={() => setshowloginpage(false)}>
          <OtpLogin />
        </SlideUpModal>
      ) : null}

    </>
  );
};

export default Card;
