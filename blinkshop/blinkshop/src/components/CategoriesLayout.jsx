// import React from "react";
// import "./CategoriesLayout.css";
// import { NavLink } from "react-router-dom";
// import Cardforall from "./Cardforall";
// import { useBio } from "./BioContext";
// import { useEffect } from "react";
// import { cloudinaryImg } from "../utils/cloudinariimg";

// const CtegoriesLayout = () => {
//   const {productdata,fetchCoupons,coupons,productdataonlydetail}=useBio()

// useEffect(() => {
//       const timer = setTimeout(() => {
//         console.log("🍿 Checking if product has category and tag (delayed):",productdataonlydetail);
    
//           console.log("📢 Calling fetchCoupons with:", productdataonlydetail?.cate, productdataonlydetail.tag);
//           fetchCoupons("all","all");
//         // console.log("copuen",coupons)
//       }, 200);
    
//       return () => clearTimeout(timer);
//     }, [productdata]);

//     if(coupons){
//       console.log("Coupons in CategoriesLayout:", coupons);
//     }
//   if(!productdata || !coupons){
    
//     return 
//   }
  
  

//   return (
//     <>
//     {
//       [...productdata].reverse().map((e,idx)=>(
//         <div key={idx} className="horizontal-card-layout">
//       <span  style={{
//     textAlign: "start",
//     fontSize: "30px",
//     fontFamily: "'Great Vibes', cursive",
//     fontWeight: 800,
//     color: "blck",
//   }}>{e.category.slice(0,1).toUpperCase()+ e.category.slice(1)}</span>
//       {/* Parent Card */}
//       <div className="parent-card" style={{borderRadius:'20px'}}>
        
//         <NavLink to={`/productmodel/${e.category}`}>
//         <img
//           // src={e.image}
//           src={cloudinaryImg(e.image, 400)}
//           alt={e.title || "product"}
//           className="parent-image"
//           // loading="lazy" // Lazy loading for better performance
//           fetchpriority="low" // ✅ suggest browser to prioritize
//   decoding="async"
//         />
//         </NavLink>
//       </div>

//       {/* Child Cards Section */}
//       <div className="child-cards-wrapper">
//         <div className="child-cards">
//           {
//             e.productdetails.map((e,i)=>(
         
//           <div key={i} className="cate-card-done">
//             <Cardforall id={e} discription={e.description} price={e.price} discountprice={e.discountprice} color={e.colors} image={e.image[0]} discount={e.discount} defaultcolor={e.defaultColor} coupons={coupons}/>
//           </div>
//           ))
          
           
    
//               }


//         </div>

//       </div>
      
//       <NavLink to={`/productmodel/${e.category}`} ><button className="catebtn" style={{width: '100%',
//     padding: '16px 0',
//     borderRadius: '12px',
//     background: 'white',
//     color: 'black',
//     border: 'none',
//     fontSize: '16px',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'all 0.3s ease-in-out',
//     textTransform: 'uppercase',
//     letterSpacing: '0.5px',
//     boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
//     marginTop: '10px'}}>View All</button></NavLink>
//     </div>
//       ))
//     }
    
//     </>
//   );
// };

// export default CtegoriesLayout;
import React, { useEffect, useRef, useState } from "react";
import "./CategoriesLayout.css";
import { NavLink } from "react-router-dom";
import Cardforall from "./Cardforall";
import { useBio } from "./BioContext";
import { cloudinaryImg } from "../utils/cloudinariimg";

const CategoriesLayout = () => {
  const {
    productdata,
    fetchCategories,     // 🔥 paginated categories
    hasMore,
    fetchCoupons,
    coupons,
  } = useBio();

  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);

  /* =============================
     1️⃣ Fetch categories (pagination)
  ============================== */
  useEffect(() => {
    fetchCategories(page);
  }, [page]);

  /* =============================
     2️⃣ Fetch coupons (once)
  ============================== */
  useEffect(() => {
    fetchCoupons("all", "all");
  }, []);

  /* =============================
     3️⃣ Intersection Observer
  ============================== */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [hasMore]);

  if (!productdata || !coupons) return null;

  return (
    <>
      {[...productdata].map((cat, idx) => (
        <div key={idx} className="horizontal-card-layout">
          
          {/* Category Title */}
          <span
            style={{
              textAlign: "start",
              fontSize: "30px",
              fontFamily: "'Great Vibes', cursive",
              fontWeight: 800,
            }}
          >
            {cat.category.charAt(0).toUpperCase() + cat.category.slice(1)}
          </span>

          {/* Parent Card */}
          <div className="parent-card" style={{ borderRadius: "20px" }}>
            <NavLink to={`/productmodel/${cat.category}`}>
              <img
                src={cloudinaryImg(cat.image, 400)}
                alt={cat.title || "product"}
                className="parent-image"
                decoding="async"
                fetchpriority="low"
              />
            </NavLink>
          </div>

          {/* Child Cards */}
          <div className="child-cards-wrapper">
            <div className="child-cards">
              {cat.productdetails.map((p, i) => (
                <div key={i} className="cate-card-done">
                  <Cardforall
                    id={p}
                    discription={p.description}
                    price={p.price}
                    discountprice={p.discountprice}
                    color={p.colors}
                    image={p.image[0]}
                    discount={p.discount}
                    defaultcolor={p.defaultColor}
                    coupons={coupons}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* View All Button */}
          <NavLink to={`/productmodel/${cat.category}`} ><button className="catebtn" style={{width: '100%',
    padding: '16px 0',
    borderRadius: '12px',
    background: 'white',
    color: 'black',
    border: 'none',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    marginTop: '10px'}}>View All</button></NavLink>
        </div>
      ))}

      {/* 🔥 Observer Target */}
      <div ref={loaderRef} style={{ height: "1px" }} />
    </>
  );
};

export default CategoriesLayout;
