 // export default ProductDescription;
import React, { useState, useEffect ,useRef } from "react";
import { useAuth } from "./AuthContext";
import "./ProductDescription.css";
import img1 from "./image/img1.jpg";
import img2 from "./image/img2.webp";
import img3 from "./image/img3.jpg";
import img4 from "./image/img4.jpeg";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useBio } from "./BioContext";
import { NavLink } from "react-router-dom";
// import ProductReview from "./ProductReview";
import { date } from "yup";
import HeartButton from "./HeartButton";
import { ToastContainer, toast } from 'react-toastify';
import { FaIndianRupeeSign } from "react-icons/fa6";
import Card from "./Card";
import { useFirebaseAuth } from "./FirebaseContext";
import { FaArrowLeft } from "react-icons/fa6";
import RatingBadge from "./RatingBadge";


// import { BioContext } from "./CartContext";
// import { useContext } from "react";
// const {addtocartitem,cartitem} = useContext(BioContext);
const ProductDescription = (prop) => {
   
  const [loading, setLoading] = useState(true);
const [cartData, setCartData] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [qty, setqty] = useState(1);
  const [count, setCount] = useState(1);
  const [cartItems, setCartItems] = useState([]);  
  const [wishlist, setWishlist] = useState([]); // Track wishlist items
  const [quantity, setQuantity] = useState(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for popup visibility
  const [popupImage, setPopupImage] = useState(""); // State to store the clicked image
  const [Selectedcolor,setSelectedcolor]=useState([])
const[product,setproduct]=useState([])
const[mainProductt,setmainprodutt]=useState([])
const imageRef = useRef();
const cartRef = useRef();
  let { id } = useParams();
  console.log("fwff",id)
  let navigate=useNavigate()
  let {handleClick,productdata,handleAddToCart,takebuydata, productdataonlydetail}=useBio()
  // const { user,userDetails } = useAuth();
  const { user,userDetails } = useFirebaseAuth()
  // useEffect(() => {
  //   const fetchCartData = async () => {
  //     if(userDetails || userDetails._id )
  //     {
  //     try {
  //       let res = await fetch(`http://localhost:3000/addtocart/${userDetails._id}`);

  //       let data = await res.json();
  //       console.log("iuiu",data)
  //       setCartData(data); // This will contain items already in the cart
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  //   };
  //   fetchCartData();
  // }, [userDetails]);

  // useEffect(() => {
  //   const fetchCartItems = async () => {
  //     if(userDetails){
  //     try {
  //       let response = await fetch(`http://localhost:3000/cart/${userDetails._id}`);
  //       let data = await response.json();
  //       let cartItemIds = data.map(item => item.id); // Collect the ids of the items in the cart
  //       setWishlist(cartItemIds);  // Set the ids in the state to keep the icons red
  //       setCartItems(data)
  //     } catch (error) {
  //       console.error("Error fetching cart items:", error);
  //     }
  //   }
  //   };

  //   fetchCartItems();
  // }, [userDetails]);

  
  
  // if (loading) {
  //   return <p>Loading...</p>;
  // }
  // console.log(id,"bvn",typeof(id))
  // console.log("aaaaaaaaaaaaaa",typeof(id));
 



//  if(productdata.length==0){
//   return(<p>loading...</p>)
//  }
//  console.log("koko",productdata)



useEffect(() => {
  console.log("🔥 useEffect Triggered! Checking for Data Update");
  if (!productdataonlydetail || productdataonlydetail.length === 0) {
    // return <p>Loading...</p>;
    console.log("no ddata")
  }
  
  const mainProductt = productdataonlydetail.find((e) => e._id === id);
  console.log("mainprdd",mainProductt)
  setmainprodutt(mainProductt)
  if (productdataonlydetail.length > 0) {
    console.log("✅ Product Data Loaded, Running useEffect");
    const mainProduct = productdataonlydetail.find((e) => e._id === id);
    const varientprd = productdataonlydetail
    .map(product => {
      const matchingColor = product.colors.find(color => color._id === id);
      if (matchingColor) {
        return {
          ...product,  // Saara product data
          colors: [matchingColor] // Sirf matching color object ek array me
        };
      }
      return null; // Agar matching color na mile toh null return karo
    }).filter(product => product !== null); // Sirf valid products rakho
    console.log("mainProduct inside useEffect:", mainProduct);
    console.log("vareintProduct inside useEffect:", varientprd);
    console.log("selected color",Selectedcolor)
    if (mainProduct) {
      
      const defaultVariant =mainProduct.colors.find(
        (e) => e.color === Selectedcolor
      ) || mainProduct.colors.find((e) => e.color === mainProduct.defaultColor) || mainProduct.colors[0];

      if (defaultVariant) {
        console.log("defaultVariant:", defaultVariant);
        setproduct({
          ...defaultVariant,
          price: mainProduct.price,
          discountprice: mainProduct.discountprice,
          shopname: mainProduct.shopname,
          shopaddress: mainProduct.shopaddress,
          discount: mainProduct.discount,
          cate: mainProduct.cate,
          image:mainProduct.image[0]
        });
      }
    }
    else{
      setproduct({
        ...varientprd[0].colors[0],
        price: varientprd[0].price,
        discountprice: varientprd[0].discountprice,
        shopname: varientprd[0].shopname,
        shopaddress: varientprd[0].shopaddress,
        discount: varientprd[0].discount,
        cate: varientprd[0].cate,
        image:varientprd[0].image[0]
      });

    }
    
  }
}, [id,productdataonlydetail,Selectedcolor]);  // ✅ Ensuring it runs only when data is available

 

  const cards = [
    {
      id: 1,
      title: "Card 1",
      price:500+'Rs',
      description: "This is the description for card 1.",
      image: [img1, img2, img3, img4],
      category:"top"
    },
    {
      id: 2,
      title: "Card 2",
      price:500+'Rs',
      description: "This is the description for card 2.",
      image: [img1, img2, img3, img4],
      category:"top"
    },
    {
      id: 3,
      title: "Card 3",
      price:500+'Rs',
      description: "This is the description for card 3.",
      image: [img1, img2, img3, img4],
      category:"bottom"
    },
    {
      id: 4,
      title: "Card 4",
      price:500+'Rs',
      description: "This is the description for card 4.",
      image: [img1, img2, img3, img4],
      category:"bottom"
    },
    {
      id: 5,
      title: "Card 5",
      price:500+'Rs',
      description: "This is the description for card 5.",
      image: [img1, img2, img3, img4],
    },
    {
      id: 6,
      title: "Card 6",
      price:500+'Rs',
      description: "This is the description for card 6.",
      image: [img1, img2, img3, img4],
    },
    {
      id: 7,
      title: "LO'NIS",
      price:500+'Rs',
      description: "Great fabric quality excellent durability and craftsmanship",
      image: [img1, img2, img3, img4],
    },
    { id: 8, name: "Shirt 1", section: "shirts", description: "A cool shirt", price: 19.99, image: "blinkshop\src\components\image\img1.jpg" },
  { id: 9, name: "Shirt 2", section: "shirts", description: "Another cool shirt", price: 24.99, image: "blinkshop\src\components\image\img1.jpg" },
  ];
 
  const notify = () => toast("Plese Login For Add Items In Cart");
  
  
  

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => quantity > 1 && setQuantity(quantity - 1);

 
  let handleclick = async (id,quantity,selectedSize) => {

   console.log("oi3nt",id,quantity,selectedSize)

  //  const image = imageRef.current;
  //  const cart = cartRef.current;
 
  //  if (!image || !cart) return;
 
  //  const imageRect = image.getBoundingClientRect();
  //  const cartRect = cart.getBoundingClientRect();
 
  //  const clone = image.cloneNode(true);
 
  //  // Style the clone
  //  clone.style.position = 'fixed';
  //  clone.style.left = `${imageRect.left}px`;
  //  clone.style.top = `${imageRect.top}px`;
  //  clone.style.width = `${imageRect.width}px`;
  //  clone.style.height = `${imageRect.height}px`;
  //  clone.style.transition = 'all 0.7s ease-in-out';
  //  clone.style.zIndex = '9999';
  //  clone.style.pointerEvents = 'none';
  //  clone.style.borderRadius = '12px';
 
  //  document.body.appendChild(clone);
 
  //  // Force reflow before animation
  //  requestAnimationFrame(() => {
  //    clone.style.left = `${cartRect.left}px`;
  //    clone.style.top = `${cartRect.top}px`;
  //    clone.style.width = '40px';
  //    clone.style.height = '40px';
  //    clone.style.opacity = '0.5';
  //  });
 
  //  // Remove clone after animation ends
  //  setTimeout(() => {
  //    clone.remove();
  //  }, 800);

  if(user)
  {
 if (selectedSize.length==0) {
  prop.showPopup("Please Selete a Size")
      return;
    }
   try {
    if (Array.isArray(id)) {
      id = id[0]; // Take the first object if it's an array
    }
  
      handleAddToCart(id,quantity,selectedSize)
    } catch (e) {
      console.log(e);
    }
  }
  else{
    notify()
  }
  };


  
//   let handleclickwish = async (id) => {
//     const numericId = parseInt(id); // Ensure `id` is a number
//     console.log("sss", numericId);
  
//     if (selectedSize.length === 0) {
//       alert("Please select a size before adding to the wishlist.");
//       return;
//     }
    
//     console.log("randd",cartItems)
//     console.log("randd",wishlist)
//   //   if(wishlist.id==id){
//   //  console.log("dono match hai ")
//   //   }
//   //   else{
//   //     console.log("mhi hai lody")
//   //   }

//   let ids=wishlist.filter((e)=>(
//       e==numericId
//   ))
// if(ids.length>0){
//   navigate("/wishlist")
// }
//   console.log("name of id",ids)
  
//     try {
//       let data = cards.find((e) => e.id === numericId);
//       console.log(data);
  
//       data["id"] = data.id;
//       data["title"] = data.title;
//       data["description"] = data.description;
//       data["image"] = data.image[0];
//       data["size"] = selectedSize;
//       data["qty"] = count;
  
//       let res = await fetch("http://localhost:3000/cart", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });
  
//       if (res.ok) {
//         console.log("Item added to wishlist successfully");
  
//         // Update wishlist state
//         setWishlist((prev) => [...prev, numericId]); // Add the ID to wishlist state
//       } else {
//         console.log("Failed to add item to wishlist");
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };
  
// if(productdata)
// {
// productdata.map((e)=>{  
// e.productdetails.map((ee)=>{
//   console.log("wsw",ee)
// })
// })
// }

  // let idss=[]
  // let drl=productdata.map((e)=>(e.productdetails))
  // drl.map((e)=>{
  //   e.map((r)=>{
  //     idss.push(r)
  //   })
  // })
  // console.log("allid",idss)
// const productdescription=productdata.map((e)=>(e.productdetails))
  // let pokl=productdescription.map((e)=>{
  //   console.log("ioi",e)
  // })

  // console.log("Component Rendered! productdataonlydetail:", productdataonlydetail);
  // console.log("Component Rendered! id:", id);

  // if (!productdataonlydetail || productdataonlydetail.length === 0) {
  //   return <p>Loading...</p>;
  // }
  
  // const mainProductt = productdataonlydetail.find((e) => e._id === id);
  // console.log("mainprdd",mainProductt)
  // useEffect(() => {
  //   console.log("🔥 useEffect Triggered! Checking for Data Update");
  
  //   if (productdataonlydetail.length > 0) {
  //     console.log("✅ Product Data Loaded, Running useEffect");
  //     const mainProduct = productdataonlydetail.find((e) => e._id === id);
  //     const varientprd = productdataonlydetail
  //     .map(product => {
  //       const matchingColor = product.colors.find(color => color._id === id);
  //       if (matchingColor) {
  //         return {
  //           ...product,  // Saara product data
  //           colors: [matchingColor] // Sirf matching color object ek array me
  //         };
  //       }
  //       return null; // Agar matching color na mile toh null return karo
  //     }).filter(product => product !== null); // Sirf valid products rakho
  //     console.log("mainProduct inside useEffect:", mainProduct);
  //     console.log("vareintProduct inside useEffect:", varientprd);
  //     console.log("selected color",Selectedcolor)
  //     if (mainProduct) {
        
  //       const defaultVariant =mainProduct.colors.find(
  //         (e) => e.color === Selectedcolor
  //       ) || mainProduct.colors.find((e) => e.color === mainProduct.defaultColor) || mainProduct.colors[0];
  
  //       if (defaultVariant) {
  //         console.log("defaultVariant:", defaultVariant);
  //         setproduct({
  //           ...defaultVariant,
  //           price: mainProduct.price,
  //           discountprice: mainProduct.discountprice,
  //           shopname: mainProduct.shopname,
  //           shopaddress: mainProduct.shopaddress,
  //           discount: mainProduct.discount,
  //           cate: mainProduct.cate,
  //           image:mainProduct.image[0]
  //         });
  //       }
  //     }
  //     else{
  //       setproduct({
  //         ...varientprd[0].colors[0],
  //         price: varientprd[0].price,
  //         discountprice: varientprd[0].discountprice,
  //         shopname: varientprd[0].shopname,
  //         shopaddress: varientprd[0].shopaddress,
  //         discount: varientprd[0].discount,
  //         cate: varientprd[0].cate,
  //         image:varientprd[0].image[0]
  //       });

  //     }
      
  //   }
  // }, [id,productdataonlydetail,Selectedcolor]);  // ✅ Ensuring it runs only when data is available
  

  
  // let product=productofreview[0].colors.filter((e)=>(e.color == productofreview[0].defaultColor)) 
  // product[0].price=productofreview[0].price
  // product[0].discountprice=productofreview[0].discountprice
  // product[0].shopname=productofreview[0].shopname
  // product[0].shopaddress=productofreview[0].shopaddress
  // product[0].discount=productofreview[0].discount
  // product[0].cate=productofreview[0].cate
  if (!product || product.length === 0) {
    return <p>Loading...</p>;
  }

// console.log("lplp",product)


  let ar = cards.map((e) => {
    return e.image;
  });

  
  

  // const sizes = ["S", "M", "L", "XL", "XXL", "XXXL"];
  const sizes=product.sizes.map((e)=>(e.size)) 

  let handleqty=(e)=>{
    // console.log(e.target.value)
setqty(e.target.value)
console.log("qty is",qty)
  }
  

  // Function to open the popup with the clicked image
  const handleImageClick = (image) => {
    setPopupImage(image);
    setIsPopupOpen(true);
  };

  // Function to close the popup
  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupImage(""); // Clear the image when closing
  };
// console.log("eee",product[0].colors[0].sizes[0])\
console.log("sq",selectedSize,quantity)


let buydata=(data,siz,qtys)=>{  
console.log("kop",data,siz,qtys)
  if(user){
    if(siz){
    console.log("buydatanini",data,siz,qtys)
    data.size=siz
    data.qty=qtys
    console.log("buydata",data)
    let finalData = Array.isArray(data) ? data : [data];
    takebuydata(finalData)
navigate("/address")
    }
    else{
      prop.showPopup("Please Selete a Size")
    }
  }
  else{
    alert("please login in")
  }



}
let cate=product.cate
  return (
    <>
    <ToastContainer 
            position="top-center" // You can set the position of the toast
            autoClose={3000} // Automatically close after 3 seconds
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light" // You can change the theme: light or dark
          />
          
    <div className="container">
      
      <div className="product-page">
        
        {/* Image Slider Section */}
        
        <div className="image-slider">
          
          {ar.map((image, index) => (
            <div key={index} className="image-slide" >
              
              <img
              //  ref={imageRef}
                src={image[2]}
                alt={`Product ${index + 1}`}
                onClick={() => handleImageClick(image[0])} // Open popup on image click
                style={{ cursor: "pointer" }} // Add pointer cursor to indicate clickability
              />
            </div>
          ))}
        </div>

        {/* Details Section */}
       
      </div>
     
      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="popup" onClick={closePopup} style={{backgroundColor:"black"}}>
          <div className="image-slider" >
          {ar.map((image, index) => (
            <div key={index} className="image-slide"  >
              <img
                src={image[0]}
                alt={`Product ${index + 1}`}
                onClick={() => handleImageClick(image[0])} // Open popup on image click
                style={{ cursor: "pointer" }} // Add pointer cursor to indicate clickability
              />
              
              
            </div>
          ))}
          
        </div>
 
        </div>
      )}
      {/* <TimeSlotPicker/> */}
    </div>
    <FaArrowLeft size={50} onClick={()=>{navigate(-1)}} style={{position:"absolute",top:"80px",left:"20px",width:"28px",height:"28px",borderRadius:"100%",padding:"5px",background:"white"}}/>
    <div className="details-sectionnn">
          <div style={{display:"flex",  justifyContent:"space-between"}}>
          <p className="product-description">{product.description}<p style={{fontWeight:"bold",gap:'5px',fontFamily: "'Inter', sans-serif"}}><FaIndianRupeeSign/><span>{product.discountprice} </span> <span style={{marginLeft:"2px"}}className="original-price"><FaIndianRupeeSign/> {product.price} </span><span style={{marginLeft:"3px"}}>{product.discount} discount</span></p></p>
          {/* <p style={{fontWeight:"bold"}}>{product[0].price}</p> */}
          <div className="icons" onClick={() => handleClick(product,product._id)} style={{display:"flex",alignItems:"center",justifyContent:"center", background:"white",width:"33px",height:"33px",borderRadius:"100%",position:"absolute",right:"22px",bottom:"157px"}}>
          
<HeartButton   cardid={product._id} w={23} h={23} mt={6} dw={45} dh={45} dmt={-7} dml={-7} pdml={4}

/>

</div>
<RatingBadge rating={4}/>
        </div>
       
          
         
          <div className="size-options" style={{gap:"10px", borderTop:'1px solid black',padding:'10px 0', borderBottom:"1px solid black"}}>
          <label>Size Selected</label>
            <div className="sizes">

              {sizes.map((size) => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? "active" : ""}`}
                  onClick={() => setSelectedSize(size)}>
                  {size}
                </button>
              ))}
            </div>
            <label className="sizeguide"><NavLink style={{paddingLeft:"10px"}} className="navlink" to={`/sizechart/${product.cate}`}>Size Guide</NavLink></label>
          </div>

          <div className="size-options" style={{gap:"10px", borderTop:'1px solid white',padding:'10px 0', borderBottom:"1px solid black",marginTop:"10px"}}>
          <label>Colors Available</label>
            <div className="sizes">
              {
                mainProductt?(mainProductt?.colors?.map((color) => (
                  <button
                    
                    className={`size-btn ${selectedSize === color ? "active" : ""}`}
                     onClick={() => setSelectedcolor(color.color)}>
                    
                    {color.color}
                  </button>
                ))):(<button className={`size-btn`}>{product.color}</button>)
              }
              
            </div>
            {/* <label className="sizeguide"><NavLink style={{paddingLeft:"10px"}} className="navlink" to={`/sizechart/${product[0].cate}`}>Size Guide</NavLink></label> */}
          </div>

          {/* <button className="add-to-cart" onClick={()=>{ handleclick(product,quantity,selectedSize)}}>Add to Cart</button>   */}
         
          {/* Quantity Selector */}
         <div className="quantity-controls">
          <div>Qty:</div>
          
           <button className="quantity-btn" onClick={decrementQuantity}>
             -
           </button>
           <span className="quantity">{quantity}</span>
           <button className="quantity-btn" onClick={incrementQuantity}>
            +
           </button>
        </div>
        

          {/* Product Description */}
          
          {/* Buttons */}
          
          
          <div className="button-group" style={{display:"flex",alignItems:"center",justifyContent:"start",marginBottom:"20px"}}>
           
          <button className="add-to-cart" onClick={()=>{ handleclick(product,quantity,selectedSize)}} style={{backgroundColor:"#F15A29"}}>Add to Cart</button>
         <button className="add-to-cart" onClick={()=>{buydata(product,selectedSize,quantity)}} style={{backgroundColor:"#F15A29"}}>Buy Now</button>
            
          </div>
        </div>
    
    {/* <ProductReview/> */}
    <div style={{border:"1px solid gray",display:"flex",alignItems:"center",flexDirection:"column"}}>
    
     <div style={{display:"flex",width:"100%",alignItems:'center',gap:'10px'}}>  
      <p style={{fontSize:"20px",paddingLeft:"10px"}}>Similer To</p>
      <p style={{color:"green",marginTop:"3px"}}>{product.title}</p>
      </div>
    <Card  category={cate}/>
    </div>
    
    </>
  );
};

export default ProductDescription;
