import React from "react";
import "./CategoriesLayout.css";
import img1 from "./image/img1.jpg"
import newme1 from "./image/newme.jpg"
import newme2 from "./image/newme2.jpg"
import newme3 from "./image/newme3.jpg"
import newme4 from "./image/newme4.jpg"
import { NavLink } from "react-router-dom";
import Cardforall from "./Cardforall";
import { useBio } from "./BioContext";
const CtegoriesLayout = () => {
  const {productdata}=useBio()
  if(!productdata){
    return <p>loading....</p>
  }
  console.log("yha bhi mil gya",productdata)
  // const limitedProductData = productdata?.slice(0, 7); // 👈 limit to 7 items
  // const cards = [
  //   {
  //     id: 1,
  //     cate:"shirt",
  //     title: 'Top Wear',
  //     description: 'This is the description for card 1.',
  //     image: newme1,
  //   },
  //   {
  //     id: 2,
  //     cate:"shirt",
  //     title: 'Formals',
  //     description: 'This is the description for card 2.',
  //     image: newme2,
  //   },
  //   {
  //     id: 3,
  //     cate:"gown",
  //     title: 'Dress',
  //     description: 'This is the description for card 3.',
  //     image: newme3,
  //   },
  //   {
  //     id: 4,
  //     cate:"t-shirt",
  //     title: 'Top Wear',
  //     description: 'This is the description for card 4.',
  //     image: newme4,
  //   },
  //   {
  //     id: 5,
  //     cate:"jeans",
  //     title: 'Bottom Wear',
  //     description: 'This is the description for card 5.',
  //     image: newme1,
  //   },
  //   {
  //     id: 6,
  //     cate:"midi dress",
  //     title: 'Gowns',
  //     description: 'This is the description for card 6.',
  //     image: newme2,
  //   },
  // ];

  return (
    <>
    {
      productdata?.map((e,idx)=>(
        <div key={idx} className="horizontal-card-layout">
      <h1 style={{textAlign:"start"}} ><span style={{color:"rgb(131, 241, 131)"}}>{e.category.slice(0,1).toUpperCase()+ e.category.slice(1)}</span></h1>
      {/* Parent Card */}
      <div className="parent-card" style={{borderRadius:'20px'}}>
        <NavLink to={`/productmodel/${e.category}`}>
        <img
          src={e.image}
          alt="Parent Card"
          className="parent-image"
          loading="lazy" // Lazy loading for better performance
        />
        </NavLink>
      </div>

      {/* Child Cards Section */}
      <div className="child-cards-wrapper">
        <div className="child-cards">
          {
            e.productdetails.slice(0, 7).map((e,i)=>(
         
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