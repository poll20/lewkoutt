import React, { useState, useEffect } from "react";
import "./SearchComponent.css";
// import img1 from "./image/img3.jpg";
import { useBio } from "./BioContext";
import { NavLink, useNavigate } from "react-router-dom";
import { Typewriter } from 'react-simple-typewriter';
import { LoadingProvider, useLoading } from "./LoadingContext";
import useDebounce from "./useDeboune";
import { FaArrowLeft } from "react-icons/fa6";
import { slugify } from "./Slugify";
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
                    <img src={product.image[0]} alt={product.title} loading="lazy"/>
                    <div style={{ width: "79%", height: "50px", display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                      <NavLink className='navlink' to={`/productdescription/${slugify(product?.title)}/${product._id}/${product?.color}`}>
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
