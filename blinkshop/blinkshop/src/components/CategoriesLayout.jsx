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
  console.log("yha bhi mil gya",productdata)
  const cards = [
    {
      id: 1,
      cate:"shirt",
      title: 'Top Wear',
      description: 'This is the description for card 1.',
      image: newme1,
    },
    {
      id: 2,
      cate:"shirt",
      title: 'Formals',
      description: 'This is the description for card 2.',
      image: newme2,
    },
    {
      id: 3,
      cate:"gown",
      title: 'Dress',
      description: 'This is the description for card 3.',
      image: newme3,
    },
    {
      id: 4,
      cate:"t-shirt",
      title: 'Top Wear',
      description: 'This is the description for card 4.',
      image: newme4,
    },
    {
      id: 5,
      cate:"jeans",
      title: 'Bottom Wear',
      description: 'This is the description for card 5.',
      image: newme1,
    },
    {
      id: 6,
      cate:"midi dress",
      title: 'Gowns',
      description: 'This is the description for card 6.',
      image: newme2,
    },
  ];

  return (
    <>
    {
      productdata.map((e)=>(
        <div className="horizontal-card-layout">
      <h1 style={{textAlign:"center"}} >{e.category}</h1>
      {/* Parent Card */}
      <div className="parent-card" style={{borderRadius:'20px'}}>
        <NavLink to={`wear/${e.cate}`}>
        <img
          src={cards[0].image}
          alt="Parent Card"
          className="parent-image"
        />
        </NavLink>
      </div>

      {/* Child Cards Section */}
      <div className="child-cards-wrapper">
        <div className="child-cards">
          {
            e.productdetails.map((e)=>(
         
          <div className="cate-card-done">
            <Cardforall id={e._id} discription={e.description} price={e.price} discountprice={e.discountprice} image={e.image[0]} discount={e.discount}/>
          </div>
          ))
          
           
    
              }


        </div>

      </div>
      
      <NavLink to={`/productmodel/${e.category}`} style={{margin:"auto"}}><button className="catebtn" style={{width:"100%",margin:"auto",width:"90vw",padding:"10px 0",borderRadius:"8px"}}>View All</button></NavLink>
    </div>
      ))
    }
    
    </>
  );
};

export default CtegoriesLayout;
