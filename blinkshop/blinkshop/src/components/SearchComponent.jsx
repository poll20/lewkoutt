

// import React, { useState, useEffect } from "react";
// import "./SearchComponent.css";
// import img1 from "./image/img3.jpg";
// import { useBio } from "./BioContext";
// import { NavLink } from "react-router-dom";
// import { Typewriter } from 'react-simple-typewriter';
// const SearchCoponent = () => {
//   let { bestsellingdata, productdataonlydetail, getsearchinput,catecate } = useBio();
//   let [bestsale, setbestsale] = useState([]);
//   let [search, setsearch] = useState("");
//   let [filteredProducts, setFilteredProducts] = useState([]);
//  let [section,setsection]=useState('')

//  if(catecate){
//     console.log("catetete",catecate)
//  }
//   useEffect(() => {
//     if (bestsellingdata && productdataonlydetail) {
//       let bst = productdataonlydetail.filter((pd) =>
//         bestsellingdata.some((e) => e.productId === pd._id)
//       );
//       setbestsale(bst);
//     }
//   }, [bestsellingdata, productdataonlydetail]);

//   useEffect(() => {
//     if (search) {
//       // Filter products based on search input
//       const results = productdataonlydetail.filter((product) =>
//         product.tag.toLowerCase().includes(search.toLowerCase())
//       );
//       setFilteredProducts(results);
//     } else {
//       setFilteredProducts([]);
//     }
//   }, [search, productdataonlydetail]);

//   let handleChange = (e) => {
//     setsearch(e.target.value);
//     getsearchinput(e.target.value);
//   };
// if(filteredProducts){
//     console.log("fp",filteredProducts)
// }
//   return (
//     <div className="trending-container">
//       {/* Search Bar */}
//       {/* <div className="search-barrrrr">
//         <input
//           className="inppp"
//           type="text"
//           placeholder="Search Here..."
//           value={search}
//           onChange={handleChange}
//         />
//       </div> */}
//    <div className="search-barrrrr">
//   <input
//     className="inppp"
//     type="text"
//     value={search}
//     onChange={handleChange}
//   />

//   {search === '' && (
//     <div className="fake-placeholder">
//       <Typewriter
//         words={['Search here...', 'Search by tag...', 'Search by title...']}
//         loop={true}
//         cursor
//         cursorStyle="|"
//         typeSpeed={80}
//         deleteSpeed={60}
//         delaySpeed={1500}
//       />
//     </div>
//   )}
// </div>

//       {/* Search Results */}
//       {search && filteredProducts.length > 0 && (
//         <div className="search-results" style={{marginTop:'20px'}}>
//           {/* <h2>Search Results</h2> */}
//           {filteredProducts.slice(0, 4).map((product, index) => (
        
//             <div key={index} className="search-item"style={{borderBottom:'1px solid gray'}}>
//               <img src={img1} alt={product.name} />
              
//               <div style={{width:"79%",height:"50px",display:'flex',flexDirection:'column',alignItems:'start'}}>
//               <NavLink style={{width:"79%",height:"50px",display:'flex',flexDirection:'column',alignItems:'start'}} className='navlink' to={`/productdescription/${product._id}`}>
//                 <span className="product-name" style={{fontWeight:"lighter"}}>{product.tag}</span>
//                 <span className="product-price" style={{fontWeight:"lighter",fontSize:'small'}}>₹{product.discountprice}</span>
//                 </NavLink>
//               </div>
              
//               <p className="view-more">
//                 ↗
//               </p>
//             </div>
//           ))}
//           <div className="view-all">
//             <NavLink to={`/productmodel/${filteredProducts[0].cate}`}>View All({filteredProducts.length})</NavLink>
//           </div>
//         </div>
//       )}

//       {/* Trending Searches Section */}
//       {/* <div className="section" style={{ marginTop: "60px" }}>
//         <h2>Trending Searches 🔥</h2>
//         <div className="trending-tags" style={{ marginTop: "13px" }}>
//           {[
//             "Top",
//             "Skirt",
//             "Bodi",
//             "Crop",
//             "Co Ord",
//             "Floral",
//             "White",
//             "Pink Dress",
//             "Off Should",
//             "Crop Top",
//             "Maxi Dress",
//             "Jacket",
//           ].map((tag, index) => (
//             <span key={index} className="tag">
//               {tag}
//             </span>
//           ))}
//           <span className="tag more-tag">+More</span>
//         </div>
//       </div> */}

//       {/* Trending Products Section */}
//       <div className="section" style={{ marginTop: "30px" }}>
//         <h2>Trending Products 🔥</h2>
//         <div className="trending-products">
//           {bestsale.map((product, index) => (
//             <div key={index} className="product-cardsm">
//                 <NavLink to={`/productdescription/${product._id}`}>
//               <img src={img1} alt={`Product ${index}`} />
//               </NavLink>
//               <p style={{fontWeight:"lighter"}}>₹{product.discountprice}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Popular Categories Section */}
//       <div className="section">
//         <h2>Popular Categories</h2>
//         <div className="categories-sme">
//           {catecate.map((category, index) => (

//             <div key={index} className="category-cardsme" style={{textAlign:'center'}}>
//                 <NavLink className='navlink' to={`/productmodel/${category}`}>
//               <img src={img1} alt={`Category ${index}`} />
//               <p>{category}</p>
//               </NavLink>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchCoponent;



import React, { useState, useEffect } from "react";
import "./SearchComponent.css";
import img1 from "./image/img3.jpg";
import { useBio } from "./BioContext";
import { NavLink, useNavigate } from "react-router-dom";
import { Typewriter } from 'react-simple-typewriter';
import { LoadingProvider, useLoading } from "./LoadingContext";
import useDebounce from "./useDeboune";
import AutoScrollCarasoul from "./AutoScrollCarasoul";

const SearchComponent = () => {
  const { bestsellingdata, productdataonlydetail, getsearchinput, catecate,fetchTopSearched,topproducts } = useBio();
  const {setIsLoading}=useLoading()
  const [bestsale, setbestsale] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate=useNavigate()
   const debouncedSearch = useDebounce(search, 400); // 🟡 DEBOUNCE VALUE



  useEffect(()=>{
    fetchTopSearched()
  },[])
   // 🟡 Fetch on debouncedSearch, not on each keypress
  useEffect(() => {
    const fetchSearch = async () => {
      if (debouncedSearch.trim() === "") {
        setFilteredProducts([]);
        return;
      }

      try {
        setIsLoading(true);
        const res = await fetch(`${apiUrl}/search?q=${debouncedSearch}`);
        const data = await res.json();
        console.log("kone kone data",data.products)
        setFilteredProducts(data.products || []);
      } catch (err) {
        console.error("Error fetching search:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearch();
  }, [debouncedSearch]);

  const handleChange = async (e) => {
    const input = e.target.value;
    setSearch(input);
    getsearchinput(input); // optional

    if (input.trim() === "") {
      setFilteredProducts([]);
      return;
    }

//     try {
//       console.log("searchinggggg....",input)
//       setIsLoading(true);
//       const res = await fetch(`${apiUrl}/search?q=${input}`);

//    const data = await res.json();
//    console.log("searche",data)
// setFilteredProducts(data.products || []);
//     } catch (err) {
//       console.error("Error fetching search:", err);
//     } finally {
//       setIsLoading(false);
//     }
  };

  useEffect(() => {
    if (bestsellingdata && productdataonlydetail) {
      const bst = productdataonlydetail.filter((pd) =>
        bestsellingdata.some((e) => e.productId === pd._id)
      );
      setbestsale(bst);
    }
  }, [bestsellingdata, productdataonlydetail]);

  if(filteredProducts){
    console.log("search prd",filteredProducts)
  }

  const handleViewAllClick = () => {
 navigate(`/searchresults?q=${encodeURIComponent(search)}`);
};
  return (
    <div className="trending-container">
      {/* Search Input */}
      <div className="search-barrrrr">
        <input
          className="inppp"
          type="text"
          value={search}
          onChange={handleChange}
        />
        {search === '' && (
          <div className="fake-placeholder">
            <Typewriter
              words={['Search here...', 'Search by tag...', 'Search by title...']}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={80}
              deleteSpeed={60}
              delaySpeed={1500}
            />
          </div>
        )}
      </div>

      {/* Search Results */}
      {search && (
        <div className="search-results" style={{ marginTop: '20px' }}>
          {loading ? <p>Searching...</p> : (
            filteredProducts.length > 0 ? (
              <>
                {filteredProducts[0].productdetails.slice(0, 4).map((product, index) => (
                  <div key={index} className="search-item" style={{ borderBottom: '1px solid gray' }}>
                    <img src={product.image[0]} alt={product.name} loading="lazy"/>
                    <div style={{ width: "79%", height: "50px", display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                      <NavLink className='navlink' to={`/productdescription/${product._id}/${product?.color}`}>
                        <span className="product-name" style={{ fontWeight: "lighter" }}>{product.title}</span>
                        <span className="product-price" style={{ fontWeight: "lighter", fontSize: 'small' }}>₹{product.discountprice}</span>
                      </NavLink>
                    </div>
                    <p className="view-more">↗</p>
                  </div>
                ))}
                <div className="view-all">
                  <span onClick={()=>{handleViewAllClick()}}>View All({filteredProducts[0].productdetails.length})</span>
                </div>
              </>
            ) : (
              <p style={{ padding: "10px", color: "gray" }}>No results found.</p>
            )
          )}
        </div>
      )}

{/* {search && (
  <div className="search-results" style={{ marginTop: '20px' }}>
    {loading ? (
      <p>Searching...</p>
    ) : (
      filteredProducts.length > 0 ? (
        <>
          {filteredProducts[0].productdetails.slice(0, 4).flatMap((product, index) => (
            product.colors?.map((color, colorIndex) => (
              <div key={`${index}-${colorIndex}`} className="search-item" style={{ borderBottom: '1px solid gray' }}>
                <img src={product.image?.[0]} alt={color.title || product.title} />
                <div style={{ width: "79%", height: "50px", display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                  <NavLink className='navlink' to={`/productdescription/${color._id}`}>
                    <span className="product-name" style={{ fontWeight: "lighter" }}>{color.title || product.title}</span>
                    <span className="product-price" style={{ fontWeight: "lighter", fontSize: 'small' }}>₹{product.discountprice}</span>
                  </NavLink>
                </div>
                <p className="view-more">↗</p>
              </div>
            ))
          ))}
          <div className="view-all">
            <span onClick={handleViewAllClick}>
              View All({filteredProducts[0].productdetails.length})
            </span>
          </div>
        </>
      ) : (
        <p style={{ padding: "10px", color: "gray" }}>No results found.</p>
      )
    )}
  </div>
)} */}

      {/* Trending Products */}
      {/* <div className="section" style={{ marginTop: "30px" }}>
        <h2>Trending Products 🔥</h2>
        <div className="trending-products">
          {bestsale.map((product, index) => (
            <div key={index} className="product-cardsm">
              <NavLink to={`/productdescription/${product._id}`}>
                <img src={img1} alt={`Product ${index}`} />
              </NavLink>
              <p style={{ fontWeight: "lighter" }}>₹{product.discountprice}</p>
            </div>
          ))}
        </div>
      </div> */}
      {/* // UI Display */}
{/* {topproducts?.length > 0 && (
  <AutoScrollCarasoul
    images={topproducts.map((p) => p.image)}  // ✅ correct prop name
  />
)} */}
{topproducts?.length > 0 && (
  <AutoScrollCarasoul
    data={topproducts.map((p) => ({
      _id: p._id,
      image: p.image,
    }))}
  />
)}


      {/* Categories */}
      {/* <div className="section">
        <h2>Popular Categories</h2>
        <div className="categories-sme">
          {catecate.map((category, index) => (
            <div key={index} className="category-cardsme" style={{ textAlign: 'center' }}>
              <NavLink className='navlink' to={`/productmodel/${category}`}>
                <img src={img1} alt={`Category ${index}`} />
                <p>{category}</p>
              </NavLink>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default SearchComponent;
