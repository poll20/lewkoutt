import React from 'react';
import { useState,useEffect } from 'react';

import './CardLayout.css';
import ImageSlider from './ImageSlider';
import CardSlider from './HorizontalScrollContainer';
import HorizontalScrollContainer from './HorizontalScrollContainer';
import ProductDescription from './ProductDescription';
import { CiShoppingCart } from "react-icons/ci";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import img1 from "./image/img1.jpg"
import img2 from "./image/img2.webp"
import img3 from "./image/img3.jpg"
import img4 from "./image/img4.jpeg"  
import { useBio } from './BioContext';
import { NavLink } from 'react-router-dom';
import Card from './Card';
import CategoriesLayout from './CategoriesLayout';
import Cardforall from './Cardforall';


const CardLayout = () => {

  const [cartItems, setCartItems] = useState([]);  
  const {handleClick,wishlist,newarrival,productdata}=useBio()

  if(!newarrival || !productdata){
    return(<p>loading...</p>)
  }
  console.log("new arrival",newarrival)
  let targetId = newarrival.map((e) => e.ProductId);  // Convert to string if needed
  console.log("tra", targetId);
  
  const filteredProducts = productdata
    .map(item => item.productdetails) // Get productdetails from each category
    .flat() // Flatten the nested arrays
    .filter(product => targetId.find(targetIds => product._id=== targetIds)); // Compare as strings pehle ._id.toString() tha
  console.log("egergegrbrtnttynr",filteredProducts  )
  if (filteredProducts.length > 0) {
    console.log('Filtered Products:', filteredProducts);
  } else {
    console.log('No products found');
  }
  const limitedProductData = filteredProducts.slice(0, 7); // 👈 limit to 7 items
  const cards = [
    {
      id: 1,
      title: 'Card 1',
      description: 'This is the description for card 1.',
      image: img1, 
      category:"top"
    },
    {
      id: 2,
      title: 'Card 2',
      description: 'This is the description for card 2.',
      image: img1,
      category:"top"
    },
    {
      id: 3,
      title: 'Card 3',
      description: 'This is the description for card 3.',
      image: img1,
      category:"bottom"
    },
    {
      id: 4,
      title: 'Card 4',
      description: 'This is the description for card 4.',
      image: img1,
      category:"bottom"
    },
    {
      id: 5,
      title: 'Card 5',
      description: 'This is the description for card 5.',
      image: img1,
    },
    {
      id: 6,
      title: 'Card 6',
      description: 'This is the description for card 6.',
      image: img1,
    },
  ];

 
  // useEffect(() => {
  //   const fetchCartItems = async () => {
  //     try {
  //       let response = await fetch("http://localhost:3000/cart");
  //       let data = await response.json();
  //       let cartItemIds = data.map(item => item.id); // Collect the ids of the items in the cart
  //       setCartItems(cartItemIds);  // Set the ids in the state to keep the icons red
  //     } catch (error) {
  //       console.error("Error fetching cart items:", error);
  //     }
  //   };

  //   fetchCartItems();
  // }, []); // Empty dependency array to run this effect only on the first render

  // // Handle adding/removing items to/from the cart
  // let handleClick = async (id) => {
  //   try {
  //     let matchItem = cards.find((e) => e.id === id);  // Find the clicked card
  //  console.log("rotla",matchItem)
  //     let getCartItem = await fetch("http://localhost:3000/cart");
  //     let cartItemJson = await getCartItem.json();

  //     let itemInCart = cartItemJson.find(cartItem => cartItem.title === matchItem.title);

  //     if (!itemInCart) {
  //       // If item is not in the cart, add it
  //       await fetch("http://localhost:3000/cart", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(matchItem),
  //       });
  //       setCartItems([...cartItems, matchItem.id]);  // Add the item to the cart and set the icon to red
  //     } else {
  //       // If item is in the cart, delete it
  //       await fetch(`http://localhost:3000/cart/${itemInCart._id}`, {
  //         method: "DELETE",
  //       });
  //       setCartItems(cartItems.filter(itemId => itemId !== matchItem.id));  // Remove from the cart and set icon to gray
  //     }
  //   } catch (error) {
  //     console.error("Error handling click:", error);
  //   }
  // };

let Clickcard=(id)=>{
  handleClick(id)
}
  return (
    <>
    <h2 className='om-newarrival ' style={{display:"flex",alignItems:"end",justifyContent:"start",marginTop:"15px",fontFamily: "'Poppins', sans-serif",fontSize:"25px",height:"50px",marginLeft:"12px"}}  >NEW ARRIVAL</h2>
    
    <div className="om-card-container">
      {filteredProducts.slice(0, 7).map((card) => (
        
        // <div key={card.id} className="om-card" style={{borderRadius:"0px"}}>
        // <NavLink to={`/productdescription/${card.id}`} className="om-a"> 
        //   <img src={card.image} alt={card.title} className="om-card-image" />
        //   </NavLink>
        //   <div className="om-align" style={{display:"flex",alignItems:"center", justifyContent:"space-between",border:"2px solid red"}}>
            
        //   <h3 >{card.title}</h3>
        //   <div style={{width:"40%", display:"flex",alignItems:"center",
        //     justifyContent:"space-evenly"
        //   }}>
        //   {/* <CiShoppingCart size={20}  /> */}

        //   {/* <CiHeart size={20} onClick={()=>handleClick(card.id)} style={{ color: cartItems.includes(card.id) ? "red" : "gray" }}/> */}
        //   <FontAwesomeIcon
        //           icon={faHeart}
        //           onClick={()=>{Clickcard(card.id)}}
        //           style={{
        //             color: wishlist.includes(card.id) ? "red" : "gray",
        //             cursor: "pointer",
        //             transition: "all .1s ease-in",
        //           }}
        //         />
        //   </div>

        //   </div>
        //   <p>{card.description}</p>
          
        // </div>
        <div key={card._id} className='om-card'  style={{borderRadius:"0px"}}>
        <Cardforall id={card} discription={card.description} price={card.price} discountprice={card.discountprice} image={card.image[0]} discount={card.discount}/>
        {/* <h3>{card._id}</h3> */}
        </div>
      ))}
      
      
    </div>
    
    

    
    <div className="om-btnnn">
               
        <NavLink to="/productmodel/newarrivals">
        <button style={{width:"100%",margin:"auto",width:"90vw",padding:"10px 0",borderRadius:"8px", border:"1px solid rgb(190, 190, 190)",backgroundColor:"white"}}>
          VIEW ALL</button>
          </NavLink>
      </div>

      {/* <CategoriesLayout/> */}









     {/* <div className="viewall">
        <h3 className='h'>SHOP WHAT YOU LOVE</h3>
    </div>  */}
     {/* <div className="responsive-background">
      <div className="static-bg"></div>
        
      <div className="mobile-bg">
        
        <ImageSlider images={[img1,img2,img1,img3]}/>
      </div>
    </div> */}
    
    {/* <div className="foryou">
        <div className="dress">
        </div>
        <div className="discrep">
<h1>FOR YOU</h1>
<ul>
    <li>Dream-like dresses that fit perfectly!</li>
    <li>Great fabric quality excellent durability and craftsmanship </li>
    <li><NavLink to="/productDescription/7"><button>SHOP NOW</button></NavLink></li>
</ul>
        </div>
    </div> */}

    
    </>

  );
};

export default CardLayout;
