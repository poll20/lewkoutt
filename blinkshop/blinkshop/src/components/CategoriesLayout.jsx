import React from "react";
import "./CategoriesLayout.css";
import { NavLink } from "react-router-dom";
import Cardforall from "./Cardforall";
import { useBio } from "./BioContext";
const CtegoriesLayout = () => {
  const {productdata}=useBio()
  if(!productdata){
    return 
  }
  
  

  return (
    <>
    {
      productdata?.map((e,idx)=>(
        <div key={idx} className="horizontal-card-layout">
      <h1 style={{textAlign:"start"}} ><span  style={{
    textAlign: "start",
    fontFamily: "'Great Vibes', cursive",
    fontWeight: 800,
    color: "rgb(131, 241, 131)",
  }}>{e.category.slice(0,1).toUpperCase()+ e.category.slice(1)}</span></h1>
      {/* Parent Card */}
      <div className="parent-card" style={{borderRadius:'20px'}}>
        <NavLink to={`/productmodel/${e.category}`}>
        <img
          src={e.image}
          alt={e.title || "product"}
          className="parent-image"
          // loading="lazy" // Lazy loading for better performance
          fetchpriority="high" // ✅ suggest browser to prioritize
  decoding="async"
        />
        </NavLink>
      </div>

      {/* Child Cards Section */}
      <div className="child-cards-wrapper">
        <div className="child-cards">
          {
            e.productdetails.slice(1, 8).map((e,i)=>(
         
          <div key={i} className="cate-card-done">
            <Cardforall id={e} discription={e.description} price={e.price} discountprice={e.discountprice} image={e.image[0]} discount={e.discount} defaultcolor={e.defaultColor}/>
          </div>
          ))
          
           
    
              }


        </div>

      </div>
      
      <NavLink to={`/productmodel/${e.category}`} ><button className="catebtn" style={{width: '100%',
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
      ))
    }
    
    </>
  );
};

export default CtegoriesLayout;