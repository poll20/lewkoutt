// import React, { useState,useEffect } from "react";
// import "./SearchComponent.css";
// import img1 from "./image/img3.jpg"
// import { useBio } from "./BioContext";

// const SearchCoponent = () => {

//     let {bestsellingdata,productdataonlydetail,getsearchinput}=useBio()
//    let [bestsale,setbestsale]=useState([])
//    let [search,setsearch]=useState("")

//    useEffect(() => {
//     if(bestsellingdata && productdataonlydetail)
//     {
//         let bst=productdataonlydetail.filter((pd)=>(bestsellingdata.some((e)=>(e.productId==pd._id))))
//         console.log("lallu",bst)
//         setbestsale(bst)
       
//     }

// },[bestsellingdata, productdataonlydetail])
// if(bestsale){
//     console.log("rang,",bestsale)
// }

// let handleChange=(e)=>{
// setsearch(e.target.value)
// }

// if(search){
//     console.log("search",search)
//     getsearchinput(search)
//     }
    
//   return (
//     <div className="trending-container">
//       <div className="search-bar" >
//         <input className="inppp" type="text" placeholder="Search Hear..." value={search}  onChange={handleChange}/>
//       </div>

//       <div className="section" style={{marginTop:'60px'}}>
//         <h2>Trending Searches 🔥</h2>
//         <div className="trending-tags" style={{marginTop:'13px'}}>
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
//       </div>

//       <div className="section" >
//         <h2>Trending Products 🔥</h2>
//         <div className="trending-products">
//           {
//             bestsale.map((product, index) => (
//             <div key={index} className="product-cardsm">
//               <img src={img1} alt={`Product ${index}`} />
//               <p>₹{product.discountprice}</p>
//             </div>
//           ))
//           }
//         </div>
//       </div>

//       <div className="section">
//         <h2>Popular Categories</h2>
//         <div className="categories-sme">
//           {[
//             { img: img1, title: "Summer Fits" },
//             { img: img1, title: "Meeting Classics" },
//             { img: img1, title: "Dark Romance" },
//             { img: img1, title: "Graphic Tees" },
//           ].map((category, index) => (
//             <div key={index} className="category-cardsme">
//               <img src={category.img} alt={`Category ${index}`} />
//               <p>{category.title}</p>
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
import { NavLink } from "react-router-dom";
import { Typewriter } from 'react-simple-typewriter';
const SearchCoponent = () => {
  let { bestsellingdata, productdataonlydetail, getsearchinput,catecate } = useBio();
  let [bestsale, setbestsale] = useState([]);
  let [search, setsearch] = useState("");
  let [filteredProducts, setFilteredProducts] = useState([]);
 let [section,setsection]=useState('')

 if(catecate){
    console.log("catetete",catecate)
 }
  useEffect(() => {
    if (bestsellingdata && productdataonlydetail) {
      let bst = productdataonlydetail.filter((pd) =>
        bestsellingdata.some((e) => e.productId === pd._id)
      );
      setbestsale(bst);
    }
  }, [bestsellingdata, productdataonlydetail]);

  useEffect(() => {
    if (search) {
      // Filter products based on search input
      const results = productdataonlydetail.filter((product) =>
        product.tag.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [search, productdataonlydetail]);

  let handleChange = (e) => {
    setsearch(e.target.value);
    getsearchinput(e.target.value);
  };
if(filteredProducts){
    console.log("fp",filteredProducts)
}
  return (
    <div className="trending-container">
      {/* Search Bar */}
      {/* <div className="search-barrrrr">
        <input
          className="inppp"
          type="text"
          placeholder="Search Here..."
          value={search}
          onChange={handleChange}
        />
      </div> */}
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
      {search && filteredProducts.length > 0 && (
        <div className="search-results" style={{marginTop:'20px'}}>
          {/* <h2>Search Results</h2> */}
          {filteredProducts.slice(0, 4).map((product, index) => (
        
            <div key={index} className="search-item"style={{borderBottom:'1px solid gray'}}>
              <img src={img1} alt={product.name} />
              
              <div style={{width:"79%",height:"50px",display:'flex',flexDirection:'column',alignItems:'start'}}>
              <NavLink style={{width:"79%",height:"50px",display:'flex',flexDirection:'column',alignItems:'start'}} className='navlink' to={`/productdescription/${product._id}`}>
                <span className="product-name" style={{fontWeight:"lighter"}}>{product.tag}</span>
                <span className="product-price" style={{fontWeight:"lighter",fontSize:'small'}}>₹{product.discountprice}</span>
                </NavLink>
              </div>
              
              <p className="view-more">
                ↗
              </p>
            </div>
          ))}
          <div className="view-all">
            <NavLink to={`/productmodel/${filteredProducts[0].cate}`}>View All({filteredProducts.length})</NavLink>
          </div>
        </div>
      )}

      {/* Trending Searches Section */}
      {/* <div className="section" style={{ marginTop: "60px" }}>
        <h2>Trending Searches 🔥</h2>
        <div className="trending-tags" style={{ marginTop: "13px" }}>
          {[
            "Top",
            "Skirt",
            "Bodi",
            "Crop",
            "Co Ord",
            "Floral",
            "White",
            "Pink Dress",
            "Off Should",
            "Crop Top",
            "Maxi Dress",
            "Jacket",
          ].map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
          <span className="tag more-tag">+More</span>
        </div>
      </div> */}

      {/* Trending Products Section */}
      <div className="section" style={{ marginTop: "30px" }}>
        <h2>Trending Products 🔥</h2>
        <div className="trending-products">
          {bestsale.map((product, index) => (
            <div key={index} className="product-cardsm">
                <NavLink to={`/productdescription/${product._id}`}>
              <img src={img1} alt={`Product ${index}`} />
              </NavLink>
              <p style={{fontWeight:"lighter"}}>₹{product.discountprice}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Categories Section */}
      <div className="section">
        <h2>Popular Categories</h2>
        <div className="categories-sme">
          {catecate.map((category, index) => (

            <div key={index} className="category-cardsme" style={{textAlign:'center'}}>
                <NavLink className='navlink' to={`/productmodel/${category}`}>
              <img src={img1} alt={`Category ${index}`} />
              <p>{category}</p>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchCoponent;
