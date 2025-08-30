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
import StickyButton from "./StickyButton";
import CouponCard from "./CouponCard";
import BundleProduct from "./BundleProduct";
import { useLoading } from "./LoadingContext";
import SlideUpModal from "./SlideupModel";
import OtpLogin from "./OtpLogin";

// import { api } from "../../../backend/server/cloudinary";


// import { BioContext } from "./CartContext";
// import { useContext } from "react";
// const {addtocartitem,cartitem} = useContext(BioContext);
const ProductDescription = (prop) => {
   
 const apiUrl = import.meta.env.VITE_API_URL;
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
  const [colorid,setcolorid]=useState()
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
   const [isOpen, setIsOpen] = useState(false);
const[product,setproduct]=useState([])

const[mainProductt,setmainprodutt]=useState([])

const imageRef = useRef();
// const cartRef = useRef();
// const [isSticky, setIsSticky] = useState(true);
//   const targetRef = useRef(null);
const targetRef = useRef(null);
  let { id,coloring} = useParams();
  console.log("fwff",id,coloring)
  let navigate=useNavigate()
  let {handleClick,productdata,handleAddToCart,takebuydata, productdataonlydetail,fetchCoupons,coupons,getbundeldata,getBundleColorData,showloginpage,setshowloginpage}=useBio()
  let {setIsLoading}=useLoading()
  // const { user,userDetails } = useAuth();
  const { user,userDetails } = useFirebaseAuth()
  const [showModal, setShowModal] = useState(false);

  const visibleCoupons = coupons.slice(0, 2);
  const hasMore = coupons.length > 2;
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





// useEffect(() => {
//   console.log("🔥 useEffect Triggered! Checking for Data Update");
//   if (!productdataonlydetail || productdataonlydetail.length === 0) {
//     // return <p>Loading...</p>;
//     console.log("no ddata")
//   }
  
//   const mainProductt = productdataonlydetail.find((e) => e._id === id);
//   console.log("mainprdd",mainProductt)
//   setmainprodutt(mainProductt)
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
//         ...varientprd[0]?.colors[0],
//         price: varientprd[0]?.price,
//         discountprice: varientprd[0]?.discountprice,
//         shopname: varientprd[0]?.shopname,
//         shopaddress: varientprd[0]?.shopaddress,
//         discount: varientprd[0]?.discount,
//         cate: varientprd[0]?.cate,
//         image:varientprd[0]?.image[0]
//       });

//     }
    
//   }
// }, [id,productdataonlydetail,Selectedcolor]);  // ✅ Ensuring it runs only when data is available



// useEffect(() => {
//   const fetchProductFromBackend = async (clr) => {
//     console.log("miliid",id)
//     console.log("colorid",colorid)
//     console.log("clrchange",clr)
    
//     try {
//       setIsLoading(true)
//       const res = await fetch(`${apiUrl}/product/${colorid!=undefined?(colorid):(id) }`);
//       const data = await res.json();

//       console.log("🔥 Product data from backend:", data);

//       // Set the full product object (including all productdetails/colors)
//       setmainprodutt(data);

//       let mainProduct;
//       let variantProduct;

//       // CASE 1: Direct match (e.g., _id === productdetails._id)
//       if (data.productdetails && data.productdetails.length > 0) {
//         mainProduct = data.productdetails[0];

//         // Try finding matching color
//         const defaultVariant =
//           mainProduct.colors.find((e) => e.color === Selectedcolor) ||
//           mainProduct.colors.find((e) => e.color === data.defaultColor) ||
//           mainProduct.colors[0];
//   console.log("samosa varient",defaultVariant)
//           console.log("default varient",defaultVariant.color)
//             // 👇 yeh dono line add karo
           
          
//            if(clr==undefined){
//            setSelectedcolor(coloring);
//   setcolorid(defaultVariant._id);  
//            }
//            else{
//   setSelectedcolor(defaultVariant.color);
//   setcolorid(defaultVariant._id);
//            }
           
//         if (defaultVariant) {
//           setproduct({
//             ...defaultVariant,
//             price: mainProduct.price,
//             discountprice: mainProduct.discountprice,
//             shopname: data.shopname,
//             shopaddress: data.shopaddress,
//             discount: mainProduct.discount,
//             cate: mainProduct.cate,
//             image: mainProduct?.image?.length>0?(mainProduct?.image[0]):(mainProduct?.image)
//           });
//         }
//         console.log("if defprd",product)
//       } 
      
//       // CASE 2: Match via colors._id (subvariant match)
//       else if (data.productdetails && data.productdetails.length === 0 && data.colors) {
//         variantProduct = {  
//           ...data,
//           colors: [data.colors[0]], // assuming server returned only matched color
//         };
// console.log("varientrd",variantProduct)
//         setproduct({
//           ...variantProduct.colors[0],
//           price: variantProduct.price,
//           discountprice: variantProduct.discountprice,
//           shopname: variantProduct.shopname,
//           shopaddress: variantProduct.shopaddress,
//           discount: variantProduct.discount,
//           cate: variantProduct.cate,
//           image: variantProduct?.image?.length>0?(variantProduct?.image[0]):(variantProduct?.image) ,
//         });
//       } else {
//         console.warn("⚠️ Unexpected data shape from server");
//       }
//     } catch (err) {
//       console.error("❌ Error fetching product:", err);
//     }
//     finally{
//       setIsLoading(false)
//     }
//   };
// console.log("Effect triggered:", { id, Selectedcolor });
//   fetchProductFromBackend();
// }, [id, Selectedcolor,colorid]);

const fetchProductFromBackend = async (clr) => {
  console.log("🔥 clrchange", clr); // ✅ yahan value milegi

  try {
    setIsLoading(true);
    const res = await fetch(`${apiUrl}/product/${colorid !== undefined ? colorid : id}`);
    const data = await res.json();

    console.log("🔥 Product data from backend:", data);
    setmainprodutt(data);

    let mainProduct;
    let variantProduct;

    if (data.productdetails && data.productdetails.length > 0) {
      mainProduct = data.productdetails[0];

      const defaultVariant =
        mainProduct.colors.find((e) => e.color === clr) ||
        mainProduct.colors.find((e) => e.color === data.defaultColor) ||
        mainProduct.colors[0];

      console.log("samosa variant", defaultVariant);

      setSelectedcolor(defaultVariant.color);
      setcolorid(defaultVariant._id);

      if (defaultVariant) {
        setproduct({
          ...defaultVariant,
          price: mainProduct.price,
          discountprice: mainProduct.discountprice,
          shopname: data.shopname,
          shopaddress: data.shopaddress,
          discount: mainProduct.discount,
          cate: mainProduct.cate,
          material: mainProduct.material,
          neckline: mainProduct.neckline,
          occasion: mainProduct.occasion,


          printtype: mainProduct.printtype,
          ratingCount: mainProduct.ratingCount,
          // cate: mainProduct.cate,

          image:
            mainProduct?.image?.length > 0
              ? mainProduct?.image[0]
              : mainProduct?.image,
        });
      }
    } else if (data.productdetails.length === 0 && data.colors) {
      variantProduct = {
        ...data,
        colors: [data.colors[0]],
      };

      setproduct({
        ...variantProduct.colors[0],
        price: variantProduct.price,
        discountprice: variantProduct.discountprice,
        shopname: variantProduct.shopname,
        shopaddress: variantProduct.shopaddress,
        discount: variantProduct.discount,
        cate: variantProduct.cate,
         material: mainProduct.material,
          neckline: mainProduct.neckline,
          occasion: mainProduct.occasion,


          printtype: mainProduct.printtype,
        image:
          variantProduct?.image?.length > 0
            ? variantProduct?.image[0]
            : variantProduct?.image,
      });
    }
  } catch (err) {
    console.error("❌ Error fetching product:", err);
  } finally {
    setIsLoading(false);
  }
};
useEffect(() => {
  fetchProductFromBackend(coloring); // pass default coloring
}, [id]);


useEffect(() => {
  const timer = setTimeout(() => {
    console.log("🍿 Checking if product has category and tag (delayed):", product);
    if (product?.cate && product?.tag) {
      console.log("📢 Calling fetchCoupons with:", product.cate, product.tag);
      fetchCoupons(product.cate, product.tag);
    }

   
  }, 200);  // Delay by 200ms

  return () => clearTimeout(timer);
}, [product]);

useEffect(() => {
  const timer = setTimeout(() => {
    if (product?.bundel?.length>0) {
      console.log("📢 Calling getBundleColorData:", product.bundel);
      getBundleColorData(product.bundel);
    }
  
    
  }, 1000);
  return () => clearTimeout(timer);
}, [product]); // ✅ Correct dependency!





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

  // if(user)
  // {
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
  // }
  // else{
  //   notify()
  // }
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
    return <p>Loadingkoko...</p>;
  }

console.log("lplp",product)


  let ar = cards.map((e) => {
    return e.image;
  });

  
  

  // const sizes = ["S", "M", "L", "XL", "XXL", "XXXL"];
  const sizes=product?.sizes?.map((e)=>(e.size)) 

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
navigate("/address/prd")
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


// useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setIsSticky(!entry.isIntersecting);
//       },
//       {
//         root: null,
//         threshold: 0,
//       }
//     );

//     if (targetRef.current) {
//       observer.observe(targetRef.current);
//     }

//     // return () => {
//     //   if (targetRef.current) {
//     //     observer.unobserve(targetRef.current);
//     //   }
//     // };
//   }, []);

if(getbundeldata){
  console.log("bundle data in prdd",getbundeldata)
}

  return (
    <>
    {/* <ToastContainer 
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
          /> */}
          
    <div className="container">
      
      <div className="product-page">
        
        {/* Image Slider Section */}
        
        <div className="image-slider">
          
          {product.sizes[0].image.map((image, index) => (
            <div key={index} className="image-slide" >
              
              <img
              //  ref={imageRef}
                src={product.sizes[0].image[currentImageIndex]} // Show only the current image
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
          {product.sizes[0].image.map((image, index) => (
            <div key={index} className="image-slide"  >
              <img
                src={image}
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
    <FaArrowLeft size={50} onClick={()=>{navigate(-1)}} style={{position:"absolute",top:"24px",left:"20px",width:"28px",height:"28px",borderRadius:"100%",padding:"5px", backgroundColor: "rgba(255, 255, 255, 0.5)" }}/>
       <svg xmlns="http://www.w3.org/2000/svg"onClick={()=>{navigate("/cart")}} style={{position:"absolute",top:"24px",right:"20px",width:"28px",height:"28px",borderRadius:"100%",padding:"5px", backgroundColor: "rgba(255, 255, 255, 0.5)" }} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>
<svg onClick={()=>{navigate('/searchme')}} style={{position:"absolute",top:"24px",right:"60px",width:"28px",height:"28px",borderRadius:"100%",padding:"5px", backgroundColor: "rgba(255, 255, 255, 0.5)" }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>

{/* Mobile Thumbnail Strip */}
          <div style={{ 
            display: 'flex', 
            gap: '0.5rem', 
            padding: '1rem',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}>
            {product.sizes[0].image.map((img, index) => (
              <div 
                key={index} 
                onClick={() => setCurrentImageIndex(index)}
                style={{
                  minWidth: '60px',
                  height: '80px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: currentImageIndex === index ? '2px solid #667eea' : '2px solid transparent',
                  opacity: currentImageIndex === index ? 1 : 0.7
                }}
              >
                <img 
                  src={img} 
                  alt={`Product view ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            ))}
          </div>
        

    <div className="details-sectionnn">
          <div style={{display:"flex"}}>
            <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"start"}}>
          <span className="product-description" style={{fontFamily: 'Nunito,sans-serif',fontSize:"24px",color:"black",marginTop:"5px",fontWeight:"bolder",}} >{product?.title?.slice(0,1).toUpperCase()+product?.title?.slice(1)}</span>
          <span style={{fontWeight:"bold",gap:'5px',fontFamily: "'Inter', sans-serif",display:"flex",alignItems:"center",justifyContent:"center"}}><FaIndianRupeeSign/><span  > {product.discountprice} </span> <span style={{marginLeft:"2px"}}className="original-price"><FaIndianRupeeSign/> {product.price} </span><span style={{marginLeft:"5px",color:"white",padding:"2px 5px",borderRadius:"90px",background:"rgb(241, 90, 41",fontSize:"11px"}}>{product.discount}% off</span></span>
          <span
      style={{
        
        display: 'flex',
        alignItems: 'stat',
        gap: '5px',
      marginTop:"5px",
      color:"orange",
      fontWeight: 'bold',
      paddingBottom: '4px ',
      fontSize: '18px',
      textAlign:"center"
     }}
    >
      {/* <span>{'★'.repeat(product?.avgRate!=0?(product?.avgRating):(5))}</span> */}
      {/* <span style={{color:"gray",fontWeight:"lighter"}}>{product?.avgRate!=null?(product?.avgRating):("")}</span> */}
     {/* {product.ratingCount!=null?(<span style={{color:"gray",fontWeight:"lighter"}}>-</span>):('')}  */}
       {/* <span style={{color:"gray",fontWeight:"lighter"}}>{product?.ratingCount!=null?(product?.ratingCount):("No")} Reviews</span> */}
      {/* <span></span> */}
    </span>
          </div>
          {/* <p style={{fontWeight:"bold"}}>{product[0].price}</p> */}
          <div className="icons" onClick={() => handleClick(product,product?._id)} style={{display:"flex",alignItems:"center",justifyContent:"center", background:"white",width:"33px",height:"33px",borderRadius:"100%",position:"absolute",right:"17px",bottom:"120px"}}>
          
<HeartButton   cardid={product?._id} w={23} h={23} mt={6} dw={45} dh={45} dmt={-7} dml={-7} pdml={4}

/>

</div>
{/* <RatingBadge rating={4}/> */}
        </div>
       
          
         <div className="webkitscroll" style={{ display: "flex", flexDirection: "row", alignItems: "start", justifyContent: "start",overflowX:"scroll",marginTop:"8px" }}>
      <div style={{ display: "flex", gap: "8px" }}>
        {visibleCoupons.map(coupon => (
          <CouponCard key={coupon._id} coupon={coupon} prdrate={product.discountprice} />
        ))}
        {hasMore && (
          <span 
            style={{ color: "blue", cursor: "pointer", fontSize: "14px", marginTop: "8px" }}
            onClick={() => setShowModal(true)}
          >
            Show More
          </span>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4 style={{marginBottom:"10px"}}>Available Coupons</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {coupons.map(coupon => (
                <CouponCard key={coupon._id} coupon={coupon} prdrate={product.discountprice} />
              ))}
            </div>
            <button onClick={() => setShowModal(false)} style={{ marginTop: "15px" }}>Close</button>
          </div>
        </div>
      )}
    </div>
          {/* <div className="size-options" style={{gap:"10px", borderTop:'1px solid black',padding:'10px 0', borderBottom:"1px solid black"}}> */}
          {/* <div className="size-options" style={{gap:"10px",padding:'10px 0', borderBottom:"1px solid black"}}> */}
          <div   className="size-options" style={{gap:"5px",padding:'2px 0',border:"1px solid white"}}>

          <label>Size</label>
          


            <div className="sizes">

              {sizes.map((size) => (
                
                <button
                style={{borderRadius:"30px",width:"50px"}}
                  key={size}
                  className={`size-btn ${selectedSize === size ? "active" : ""}` }
                  onClick={() => setSelectedSize(size)}>

                  <span>{size.toUpperCase()}</span>
                </button>
              ))}
            </div>
            {/* <label className="sizeguide"><NavLink style={{paddingLeft:"10px",color:"white",fontWeight:"lighter"}} className="navlink" to={`/sizechart/${product.cate}`}>Size Guide</NavLink></label> */}
          </div>

          {/* <div className="size-options" style={{gap:"10px", borderTop:'1px solid white',padding:'10px 0', borderBottom:"1px solid black",marginTop:"10px"}}> */}
          <div className="size-options" style={{gap:"5px", borderTop:'1px solid white',padding:'8px 0',marginBottom:"3px"}}>

          {/* <label>Colors:</label>
            <div className="sizes">
              {
                mainProductt?(mainProductt?.colors?.map((color) => (
                  <button
                    style={{background:color.color,borderRadius:"100%",width:"20px",height:"20px"}}
                    className={`colour-btn ${Selectedcolor === color.color ? "clractive"   : ""}`}
                     onClick={() =>{ setSelectedcolor(color.color), setcolorid(color._id)}}>
                    
                    
                  </button>
                ))):(<button className={`size-btn`}>{product.color}</button>)
              }
              
            </div> */}
            <label>Colors</label>
<div className="sizes" >
  {mainProductt && mainProductt.productdetails?.length > 0 ? (
    mainProductt.productdetails[0].colors?.map((color) => (
    <div style={{border: Selectedcolor === color.color? "1px solid black" : "1px solid #ccc" ,borderRadius: "100%",}}>
      <button
        key={color._id}
        style={{
          background: color.color,
          borderRadius: "100%",
          width: "20px",
          height: "20px",
          margin: "5px",
          border:Selectedcolor === color.color ? "2px solid black" : "1px solid #ccc",
        }}
        className={`colour-btn ${Selectedcolor === color.color ? "clractive" : ""}`}
        onClick={() => {
           const clr = color.color;
  const cid = color._id;
          // setSelectedcolor(color.color);
          // setcolorid(color._id);
          // console.log("clrrrrr",color.color)
          // fetchProductFromBackend(color.color) 
          setSelectedcolor(clr);
  setcolorid(cid);

  console.log("clrrrrr", clr); // ✅ yeh sahi dikhega
  fetchProductFromBackend(clr); // ✅ yeh bhi sahi value lega
          
           
        }}
      >
        {/* No text, just a color dot */}
      </button>
      </div>
    ))
  ) : (
    <p>No colors available</p>
  )}
</div>

            
            {/* <label className="sizeguide"><NavLink style={{paddingLeft:"10px"}} className="navlink" to={`/sizechart/${product[0].cate}`}>Size Guide</NavLink></label> */}
          </div>
    {/* <CouponCard coupon={{
  code: coupons[0]?.code,
  discountType: coupons[0]?.discountType,
  discountValue: coupons[0]?.discountValue,
  minOrderAmount: coupons[0]?.minOrderAmount,
  usageLimit: coupons[0]?.usageLimit,
  usageLimitPerUser: coupons[0]?.usageLimitPerUser,
  startDate: coupons[0]?.startDate,
  expiryDate: coupons[0]?.expiryDate,
  categories: coupons[0]?.categories,
  productNames: coupons[0]?.productNames,
  couponType: coupons[0]?.couponType,
  isActive: coupons[0]?.isActive,
  description: coupons[0]?.description,
  autoApply: coupons[0]?.autoApply,
  freeShipping: coupons[0]?.freeShipping,
  userGender: coupons[0]?.userGender,
}} /> */}
{/* <span style={{fontSize:"16px",fontWeight:"bold"}}>View Coupons</span> */}
{/* <div  style={{display:"flex",alignItems:"start",justifyContent:"start"}}>
        {coupons.map(coupon => (
          <div style={{marginTop:"8px",display:"flex",alignItems:"start",justifyContent:"start"}}> 
          <CouponCard key={coupon._id} coupon={coupon} prdrate={product.discountprice}/>
          </div>
        ))}
      </div> */}


       {/* <div style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "start" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {visibleCoupons.map(coupon => (
          <CouponCard key={coupon._id} coupon={coupon} prdrate={product.discountprice} />
        ))}
        {hasMore && (
          <span 
            style={{ color: "blue", cursor: "pointer", fontSize: "14px", marginTop: "8px" }}
            onClick={() => setShowModal(true)}
          >
            Show More
          </span>
        )}
      </div>

      
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4 style={{marginBottom:"10px"}}>Available Coupons</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {coupons.map(coupon => (
                <CouponCard key={coupon._id} coupon={coupon} prdrate={product.discountprice} />
              ))}
            </div>
            <button onClick={() => setShowModal(false)} style={{ marginTop: "15px" }}>Close</button>
          </div>
        </div>
      )}
    </div> */}

 <div className="prd-ka-dropdown-container" style={{marginTop:"4px"}}>
      {/* Description */}
      <div
        className="prd-ka-dropdown-item"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Description</span>
        <span className="prd-ka-dropdown-arrow">›</span>
      </div>
      {isOpen && (
        <div className="prd-ka-dropdown-description">
          <div className="prd-ka-dropdown-row">
            <span className="prd-ka-dropdown-label">Print type</span>
            <span className="prd-ka-dropdown-value">{product?.printtype}</span>
          </div>
          <div className="prd-ka-dropdown-row">
            <span className="prd-ka-dropdown-label">Color</span>
            <span className="prd-ka-dropdown-value">{product?.color}</span>
          </div>
          <div className="prd-ka-dropdown-row">
            <span className="prd-ka-dropdown-label">Fabric</span>
            <span className="prd-ka-dropdown-value">{product?.material?(product.material):("Cotton")}</span>
          </div>

          <div className="prd-ka-dropdown-row">
            <span className="prd-ka-dropdown-label">Occasion</span>
            <span className="prd-ka-dropdown-value">{product?.occasion?(product.occasion):("Party")}</span>
          </div>
        </div>
      )}

      {/* Size Guide */}
      <NavLink to={`/sizechart/${product.cate}`} className="prd-ka-dropdown-item navlink">
        <span>Size Guide</span>
        <span className="prd-ka-dropdown-arrow">›</span>
      </NavLink>

      {/* Customer Reviews */}
      {/* <NavLink to={`/prdreview/${product._id || colorid}/${product.avgRating}`} className="prd-ka-dropdown-item navlink">
        <span>Customer Reviews</span>
        <span className="prd-ka-dropdown-arrow">›</span>
      </NavLink> */}
    </div>
    {/* {
      getbundeldata?(    <BundleProduct
  product1={product}
  product2={getbundeldata}
  totalPrice={1000}
  offer="10%"
/>):('')
    } */}
    {
      getbundeldata && getbundeldata.length>0?( <BundleProduct
      source="productdescription"
  originalPrice={product.discountprice + (getbundeldata[0]?.discountprice || 300)}
  totalPrice={getbundeldata[0]?.bundelprice}
  products={[

    {  userid:userDetails?._id,
      productId:product._id,
      title:product.title,
      image: product.image,
      color: product.color,
      original: product.price,
      price: product.discountprice,
      sizes: product.sizes,
      bundelprice:getbundeldata[0]?.bundelprice
    },
    { userid:userDetails?._id,  
      productId:getbundeldata[0]?._id,
      title: getbundeldata[0]?.title,
      image: getbundeldata[0]?.sizes[0]?.image[0],
      color: getbundeldata[0]?.color,
      original: getbundeldata[0]?.price || 500,
      price: getbundeldata[0]?.discountprice || 300,
      sizes: getbundeldata[0]?.sizes,
      bundelprice:getbundeldata[0]?.bundelprice
    },
    
  ]}
/>
):('')
    }
   

          {/* <button className="add-to-cart" onClick={()=>{ handleclick(product,quantity,selectedSize)}}>Add to Cart</button>   */}
         
          {/* Quantity Selector */}
         {/* <div className="quantity-controls">
          <div>Qty:</div>
          
           <button className="quantity-btn" onClick={decrementQuantity}>
             -
           </button>
           <span className="quantity">{quantity}</span>
           <button className="quantity-btn" onClick={incrementQuantity}>
            +
           </button>
        </div> */}
        

          {/* Product Description */}
          
          {/* Buttons */}
          
          
          {/* <div className="button-group" style={{display:"flex",alignItems:"center",justifyContent:"start",marginBottom:"20px"}}>
           
          <button className="add-to-cart" onClick={()=>{ handleclick(product,quantity,selectedSize)}} style={{backgroundColor:"#F15A29"}}>Add to Cart</button>
         <button className="add-to-cart" onClick={()=>{buydata(product,selectedSize,quantity)}} style={{backgroundColor:"#F15A29"}}>Buy Now</button>
            
          </div> */}
  <StickyButton
  onAddToCart={() => handleclick(product, quantity, selectedSize)}
  onBuyNow={() => buydata(product, selectedSize, quantity)}
  targetRef={targetRef}
/>


{/* <div ref={targetRef} id="intimate-essentials-section" /> */}
        </div>
    
    {/* <ProductReview/> */}
    <div  ref={targetRef} style={{border:"1px solid gray",display:"flex",alignItems:"center",flexDirection:"column"}}>
    
     <div style={{display:"flex",width:"100%",alignItems:'center',gap:'10px'}}>  
      <p style={{fontSize:"20px",paddingLeft:"10px"}}>Similer To</p>
      <p style={{color:"green",marginTop:"3px"}}>{product.title}</p>
      </div>
    <Card  category={cate}/>

    
    </div>
    {showloginpage==true?(
      <div>
        {/* <button onClick={() => setShowModal(true)}>Open SlideUp</button> */}
    
        <SlideUpModal show={showloginpage} onClose={() => setshowloginpage(false)}>
          <OtpLogin/>
        </SlideUpModal>
      </div>
    ):('')}
    
    </>
  );
};

export default ProductDescription;
