
import React, { createContext, useContext, useState, useEffect ,useRef} from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Import AuthContext for Authentication
import { useLoading } from './LoadingContext';
import { useFirebaseAuth } from "./FirebaseContext";
import { Navigate, useFetcher, useNavigate } from 'react-router-dom';
import { useDashboard } from './dashboardforadmin/DashboardContext';
import { color } from 'framer-motion';
import { nanoid } from "nanoid";

import { trackViewItem, trackAddToCart, trackAddToWishlist,trackPurchase } from "../analytics/g4a";
export const BioContext = createContext();
export const BioProvider = ({children,addtocartitem,showPopup,navigate }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  
  console.log("urll",apiUrl)
  // const { user,userDetails } = useAuth();
    const {user, userDetails, } = useFirebaseAuth();
    const isLoggedIn = !!user && !!userDetails?._id;

    // const { playAudio } = OrderAlertProvider();
    // const {slots,toggleSlot,fetchSlots,slotVersion }=useDashboard()
  const { setIsLoading } = useLoading();
  // const navigate=useNavigate()
  const [cart, setCart] = useState([]);
  const[searchvalue,setsearchvalue]=useState("")
  const [wishlist, setWishlist] = useState([]);
  const [wishlistdata,setwishlistdata]=useState([])
  const [bestsellingdata,setbestsellingdata]=useState([])
  const [wearsdata,setwearsdata]=useState([])
  const [productdata,setproductdata]=useState([])
  const[rentdata,setrentdata]=useState([])
  const[newarrival,setnewarrival]=useState([])
 const [addtocartdatas,setaddtocartdata]=useState([])
 const [addtocartdataonly,setaddtocartdataonly]=useState([])
 const [productdataonlydetail,setproductdataonlydetail]=useState([])
 const[catecate,setcatehicate]=useState([])
 const[buydata,setbuydata]=useState([])
 const[newaddressofuser,setnewaddresofuser]=useState({})
 const[addresssetkro,setaddress]=useState([])
 const [isFetched, setIsFetched] = useState(false); // ✅ Naya state variable
 const [refetch, setRefetch] = useState(false); // ✅ Track re-fetch status
 const[userorder,setuserorder]=useState([])
 const[rating,setrating]=useState([]) 
 const[timeslotlelo,settimeslotlelo]=useState("")
 const[walletkapesa,setwalletkapesa]=useState(0)
 const[toastmsg,settoastmsg]=useState("")
 const toastRef = useRef(null);
 const[alluser,setalluser]=useState([])
 const [coupons, setCoupons] = useState([]);
 const[karocode,setkarocode]=useState("")
 const[prdreviewdata,setprdreviewdata]=useState([])
 const [getbundeldata,setbundeldata]=useState([])
 const [showmeaddress,setshowmeaddress]=useState(false)
 const [showloginpage,setshowloginpage]=useState(false)
 const [distance,setdistance]=useState('')
    const [recommendations, setRecommendations] = useState([]);
    const[topproducts,setTopProducts]=useState([])
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);
    const [navigateFn, setNavigateFn] = useState(null);
    const [sortOption, setSortOption] = useState("");
    const [guestWishlist, setGuestWishlist] = useState([]);
const [guestCart, setGuestCart] = useState([]);
const [guestAddress, setGuestAddress] = useState([]);

  const [filters, setFilters] = useState({
    pricerangemin:300,
    pricerangemax:3000,
     sizes: [],
    bottomsizes: [],
    color: [],
    categories: [],
    occasion: [],
    nackline: [],
    clothingmaterial: [],
    styletype: [],
    printtype: [],
    discount: []
});
console.log("myfil",filters)
const backendURL = `${apiUrl}:3000`;
// const notify = () => toast("Plese Login For Add Items In Wishlist");
 const itemsPerPage = 10;
 
  
  let allproductdata=productdata.map((e)=>(e.productdetails)).flat()
  // allproductdata.map((e)=>{
  //   console.log("hurraaa",e._id)
  // })
  // Fetch Cart and Wishlist from API on login
  
      
   
// Empty dependency array to run this effect only on the first render
// useEffect(() => {
//   if(user && userDetails._id){
//   console.log("userdetails in bio",userDetails)
//     const fetchCartItems = async () => {
//       try {
//         setIsLoading(true)
//         let response = await fetch(`${apiUrl}/cart/${userDetails?._id}`, 
//           {
//           credentials: 'include', // important: allow cookies to be set
//         }
//       );
//         let data = await response.json();
//         // console.log("data in cart",data)
//         // if(data)
//         //   {
//         //    console.log("data kokoin cart",data)
//         //   }
//         if (!Array.isArray(data)) {  // ✅ Handle unexpected API response
//           console.error("Invalid response format:", data);
//           return;
//         }
//         // console.log("data kokoin cart",data)
//         setwishlistdata(data)
//         let cartItemIds = data.map(item => item.itemid); // Collect the ids of the items in the cart
//         setWishlist(cartItemIds);  // Set the ids in the state to keep the icons red
//       } catch (error) {
//         console.error("Error fetching cart items:", error);
//       }
//       finally{
//         setIsLoading(false)
//       }
//     };
//     fetchCartItems()
  
// }
  
  
//   }, [user, userDetails]);
useEffect(() => {
  const fetchWishlist = async () => {
    try {
      setIsLoading(true);

      /* =======================
         👉 GUEST USER
      ======================= */
      if (!isLoggedIn) {
        const guestWishlist =
          JSON.parse(localStorage.getItem("guestWishlist")) || [];

        setwishlistdata(guestWishlist);

        const wishlistIds = guestWishlist.map(item => item.productId);
        setWishlist(wishlistIds);

        return;
      }

      /* =======================
         👉 LOGGED-IN USER
      ======================= */
      if (user && userDetails?._id) {
        console.log("userdetails in bio", userDetails);

        const response = await fetch(
          `${apiUrl}/cart/${userDetails._id}`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!Array.isArray(data)) {
          console.error("Invalid response format:", data);
          return;
        }

        setwishlistdata(data);

        const wishlistIds = data.map(item => item.itemid);
        setWishlist(wishlistIds);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchWishlist();
}, [isLoggedIn, user, userDetails]);




useEffect(() => {
  setGuestWishlist(
    JSON.parse(localStorage.getItem("guestWishlist")) || []
  );
  setGuestCart(
    JSON.parse(localStorage.getItem("guestCart")) || []
  );
  setGuestAddress(
    JSON.parse(localStorage.getItem("guestAddress")) || []
  );
}, []);

  // useEffect(() => {
  //   if(user&& userDetails._id){
  //     const fetchCartItems = async () => {
  //       try {
  //         setIsLoading(true)
  //         let response = await fetch(`${apiUrl}/addtocart/${userDetails._id}`
  //           , {
  //           credentials: 'include', // important: allow cookies to be set
  //         }
  //       );
  //         let data = await response.json();
  //         if (!Array.isArray(data)) {  // ✅ Handle unexpected API response
  //           console.error("Invalid response format:", data);
  //           return;
  //         }
  //         console.log("data in cart",data)
  //         setaddtocartdata(data)
  //         let cartItemIds = data.map(item => item.id); // Collect the ids of the items in the cart
  //         setaddtocartdataonly(cartItemIds);  // Set the ids in the state to keep the icons red
  //       } catch (error) {
  //         console.error("Error fetching cart items:", error);
  //       }
  //       finally{
  //         setIsLoading(false)
  //       }
  //     };
  //     fetchCartItems()
  //   }
    
    
  //   }, [user,userDetails]);
  useEffect(() => {
  const fetchCartItems = async () => {
    try {
      setIsLoading(true);

      /* =======================
         👉 GUEST USER
      ======================= */
      if (!isLoggedIn) {
        const guestCart =
          JSON.parse(localStorage.getItem("guestCart")) || [];

        setaddtocartdata(guestCart);

        const cartIds = guestCart.map(item => item.productId);
        setaddtocartdataonly(cartIds);

        return;
      }

      /* =======================
         👉 LOGGED-IN USER
      ======================= */
      if (user && userDetails?._id) {
        const response = await fetch(
          `${apiUrl}/addtocart/${userDetails._id}`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!Array.isArray(data)) {
          console.error("Invalid response format:", data);
          return;
        }

        console.log("data in cart", data);

        setaddtocartdata(data);

        // 🔴 for red cart icons / disable add button
        const cartItemIds = data.map(item => item.productid);
        setaddtocartdataonly(cartItemIds);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchCartItems();
}, [isLoggedIn, user, userDetails]);

//ise abhi dekhna h include krna h ya nhi
  useEffect(()=>{
    if(user&& userDetails._id){
      const fetchalluser = async () => {
        try {
          setIsLoading(true)
          let response = await fetch(`${apiUrl}/user`
          //   , {
          //   headers: {
          //     Authorization: `Bearer ${user.accessToken}`,
          //   },
          // }
        );
          let data = await response.json();
          if (!Array.isArray(data)) {  // ✅ Handle unexpected API response
            console.error("Invalid response format:", data);
            return;
          }
          console.log("data in cart",data)
          setalluser(data)
          
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
        finally{
          setIsLoading(false)
        }
      };
      fetchalluser()
    }
  },[user,userDetails])
  
//   const handleClick = async (prd, id) => {

//     console.log("iredandid",prd,id)
    
    
//     try {
//       setIsLoading(true)
//       // if(!user){
//       //   setshowloginpage(true)
//       // }
//       if (!isLoggedIn) {
//   const guestWishlist =
//     JSON.parse(localStorage.getItem("guestWishlist")) || [];

//   guestWishlist.push({
//     matchItem.productId = id;
//       matchItem.price = prd.price;
//       matchItem.discountprice = prd.discountprice;
//       matchItem.discount = prd.discount;

//       matchItem.image = prd.image;
//       matchItem.shopname = prd.shopname;
//       // matchItem.color=prd?.colors[0]?.color || prd?.color
//       matchItem.color = Array.isArray(prd?.colors) && prd.colors.length > 0 
//   ? prd.colors[0].color 
//   : prd?.color || "defaultColor";
//       matchItem.title = prd.title;
//       matchItem.description = prd.description;
//       matchItem.size = prd.sizes;
//   });

//   localStorage.setItem("guestWishlist", JSON.stringify(guestWishlist));
//   showPopup("Added to Wishlist");
//   return;
// }

//          if (window.fbq) {
//       window.fbq("track", "AddToWishlist", {
//         content_name: prd.title ,
//         content_ids: [prd._id],
//         content_type: "product",
//         value: prd.discountprice || prd.price,
//         currency: "INR",
//       });
//     }
//       // Correcting the way matchItem is created
//       // const matchedColors = productdataonlydetail
//       //   .flatMap(product => product.colors)

//       //   .filter(color => color._id == id);
//       trackAddToWishlist(prd)
//       const matchedColors = productdataonlydetail
//   .flatMap(product => product.colors || [])
//   .filter(color => color._id == id);
  
//       if (matchedColors.length === 0) {
//         console.error("No matching item found!");
//         return;
//       }
  
//       const matchItem = { ...matchedColors[0] }; // Convert array to object
//       console.log("matchItem before adding data:", matchItem);
  
//       // Adding necessary properties
//       matchItem.userid = userDetails._id;
//       matchItem.productId = id;
//       matchItem.price = prd.price;
//       matchItem.discountprice = prd.discountprice;
//       matchItem.discount = prd.discount;

//       matchItem.image = prd.image;
//       matchItem.shopname = prd.shopname;
//       // matchItem.color=prd?.colors[0]?.color || prd?.color
//       matchItem.color = Array.isArray(prd?.colors) && prd.colors.length > 0 
//   ? prd.colors[0].color 
//   : prd?.color || "defaultColor";
//       matchItem.title = prd.title;
//       matchItem.description = prd.description;
//       matchItem.size = prd.sizes;
  
//       console.log("Final matchItem:", matchItem); // Debugging
  
//       const itemInCart = wishlistdata.find(cartItem => cartItem.itemid === id);
//       console.log("delete", itemInCart);
  
//         if (!itemInCart) {
//           const response = await fetch(`${apiUrl}/cart`, {
//             method: "POST",
//             credentials: 'include', // important: allow cookies to be set
//             headers: { "Content-Type": "application/json",
//               // Authorization: `Bearer ${user.accessToken}`,
//             },
//             body: JSON.stringify(matchItem),
//           });
  
//         if (response.ok) {
//           const addedItem = await response.json();
//           setWishlist(prev => [...prev, id]);
//           setwishlistdata(prev => [...prev, addedItem]);
//     //       const toast = new window.bootstrap.Toast(toastRef.current);
//     // toast.show();
//     //       settoastmsg("item added successfully")
//     showPopup("Added to Wishlist")
//         }
//       } else {
//         const response = await fetch(`${apiUrl}/cart/${itemInCart.itemid}`, {
//           method: "DELETE",
//           credentials: 'include', // important: allow cookies to be set
//           // headers: {
//           //   Authorization: `Bearer ${user.accessToken}`,
//           // },
//         });
  
//         if (response.ok) {
//           setWishlist(prev => prev.filter(itemId => itemId !== id));
//           setwishlistdata(prev => prev.filter(item => item.itemid !== id));
//           // toast.success("Data removed successfully");
//     //       const toast = new window.bootstrap.Toast(toastRef.current);
//     // toast.show();
//     //       settoastmsg("item removed successfully")
//     showPopup("Removed from Wishlist")
//         }
//       }
//     } catch (error) {
//       console.error("Error in handleClick:", error);
//     }
//     finally{
//       setIsLoading(false)
//     }
  
//   };

const handleClick = async (prd, id) => {
  console.log("iredandid", prd, id);

  try {
    setIsLoading(true);

    /* =======================
       👉 GUEST USER FLOW
    ======================= */
    if (!isLoggedIn) {
      const guestWishlist =
        JSON.parse(localStorage.getItem("guestWishlist")) || [];

      const alreadyExists = guestWishlist.find(
        item => item.productId === id
      );

      // 🔁 TOGGLE
      if (alreadyExists) {
        const updatedWishlist = guestWishlist.filter(
          item => item.productId !== id
        );
setGuestWishlist(updatedWishlist);
        localStorage.setItem(
          "guestWishlist",
          JSON.stringify(updatedWishlist)
        );

        showPopup("Removed from Wishlist");
      } else {
        guestWishlist.push({
          productId: id,
          price: prd.price,
          discountprice: prd.discountprice,
          discount: prd.discount,
          image: prd.image,
          shopname: prd.shopname,
          color:
            Array.isArray(prd?.colors) && prd.colors.length > 0
              ? prd.colors[0].color
              : prd?.color || "defaultColor",
          title: prd.title,
          description: prd.description,
          size: prd.sizes,
        });
setGuestWishlist(guestWishlist);  
console.log("wdai",guestWishlist)
        localStorage.setItem(
          "guestWishlist",
          JSON.stringify(guestWishlist)
        );

        showPopup("Added to Wishlist");
      }

      return; // 🚨 important
    }

    /* =======================
       👉 LOGGED-IN USER FLOW
    ======================= */

    // FB Pixel
    if (window.fbq) {
      window.fbq("track", "AddToWishlist", {
        content_name: prd.title,
        content_ids: [prd._id],
        content_type: "product",
        value: prd.discountprice || prd.price,
        currency: "INR",
      });
    }

    trackAddToWishlist(prd);

    // Find matching color item
    const matchedColors = productdataonlydetail
      .flatMap(product => product.colors || [])
      .filter(color => color._id === id);

    if (matchedColors.length === 0) {
      console.error("No matching item found!");
      return;
    }

    const matchItem = { ...matchedColors[0] };

    matchItem.userid = userDetails._id;
    matchItem.productId = id;
    matchItem.price = prd.price;
    matchItem.discountprice = prd.discountprice;
    matchItem.discount = prd.discount;
    matchItem.image = prd.image;
    matchItem.shopname = prd.shopname;
    matchItem.color =
      Array.isArray(prd?.colors) && prd.colors.length > 0
        ? prd.colors[0].color
        : prd?.color || "defaultColor";
    matchItem.title = prd.title;
    matchItem.description = prd.description;
    matchItem.size = prd.sizes;

    const itemInWishlist = wishlistdata.find(
      item => item.itemid === id
    );

    /* ➕ ADD */
    if (!itemInWishlist) {
      const response = await fetch(`${apiUrl}/cart`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(matchItem),
      });

      if (response.ok) {
        const addedItem = await response.json();
        setWishlist(prev => [...prev, id]);
        setwishlistdata(prev => [...prev, addedItem]);
        showPopup("Added to Wishlist");
      }
    }
    /* ➖ REMOVE */
    else {
      const response = await fetch(
        `${apiUrl}/cart/${itemInWishlist.itemid}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        setWishlist(prev => prev.filter(itemId => itemId !== id));
        setwishlistdata(prev =>
          prev.filter(item => item.itemid !== id)
        );
        showPopup("Removed from Wishlist");
      }
    }
  } catch (error) {
    console.error("Error in handleClick:", error);
  } finally {
    setIsLoading(false);
  }
};


  // const removewishlistonly=async(id)=>{
  //   console.log("id",id)
  //   try{
  //     setIsLoading(true)
  //     const response = await fetch(`${apiUrl}/cart/${id}`, {
  //       method: "DELETE",
  //       credentials: 'include', // important: allow cookies to be set
  //       // headers: { 
  //       //   Authorization: `Bearer ${user.accessToken}`,
  //       // },
  //     });

  //     const data = await response.json(); // Server se response parse karo
  //   console.log("Server Response:", data); // Error ya success message dekho
  //     if (response.ok) {
  //       setWishlist(prev => prev.filter(itemId => itemId !== id));
  //       setwishlistdata(prev => prev.filter(item => item.itemid !== id));
  //      // toast.success("Data removed successfully");
  //   //    const toast = new window.bootstrap.Toast(toastRef.current);
  //   // toast.show();
  //   //    settoastmsg("item removed successfully")
  //   showPopup("Removed From Wishlist")
  //     }
  //     else {
  //   //     const toast = new window.bootstrap.Toast(toastRef.current);
  //   // toast.show();
  //   //     settoastmsg(data.message || "Error removing item");
  //   showPopup("error removing item")
  //     }
  
  //   }
  //   catch(e){
  //   //   const toast = new window.bootstrap.Toast(toastRef.current);
  //   // toast.show();
  //   //   settoastmsg(data.message || "Error removing item");
  //   showPopup("error removing item")
  //   }
  //   finally{
  //     setIsLoading(false)
  //   }

  // }
  const removewishlistonly = async (id) => {
  console.log("idoo", id);

  try {
    setIsLoading(true);

    /* =======================
       👉 GUEST USER REMOVE
    ======================= */
    if (!isLoggedIn) {
      const guestWishlist =
        JSON.parse(localStorage.getItem("guestWishlist")) || [];

      const updatedWishlist = guestWishlist.filter(
        item => item.productId !== id
      );
  
      localStorage.setItem(
        "guestWishlist",
        JSON.stringify(updatedWishlist)
      );
 setGuestWishlist(updatedWishlist);
      // UI state update
      // setWishlist(prev => prev.filter(itemId => itemId !== id));
      // setwishlistdata(prev =>
      //   prev.filter(item => item.productId !== id)
      // );

      showPopup("Removed From Wishlist");
      return; // 🚨 important
    }

    /* =======================
       👉 LOGGED-IN USER REMOVE
    ======================= */
    const response = await fetch(`${apiUrl}/cart/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await response.json();
    console.log("Server Response:", data);

    if (response.ok) {
      setWishlist(prev => prev.filter(itemId => itemId !== id));
      setwishlistdata(prev =>
        prev.filter(item => item.itemid !== id)
      );

      showPopup("Removed From Wishlist");
    } else {
      showPopup(data.message || "Error removing item");
    }
  } catch (e) {
    console.error("Remove wishlist error:", e);
    showPopup("Error removing item");
  } finally {
    setIsLoading(false);
  }
};

  
// const addtowishlistonly=async(id,prd)=>{

// console.log("iredandid",prd,id)
//     try {
//       setIsLoading(true)
//       // Correcting the way matchItem is created
//       const matchedColors = productdataonlydetail
//         .flatMap(product => product.colors)
//         .filter(color => color._id == id);
  
//       if (matchedColors.length === 0) {
//         console.error("No matching item found!");
//         return;
//       }
  
//       const matchItem = { ...matchedColors[0] }; // Convert array to object
//       console.log("matchItem before adding data:", matchItem);
  
//       // Adding necessary properties
//       matchItem.userid = userDetails._id;
//       matchItem.productId = id;
//       matchItem.price = prd.price;
//       matchItem.discountprice = prd.discountprice;
//       matchItem.discount = prd.discount;

//       matchItem.image = prd.image;
//       matchItem.shopname = prd.shopname;
//       matchItem.title = prd.title;
//       matchItem.description = prd.description;
//       matchItem.size = prd.sizes;
  
//       console.log("Final matchItem:", matchItem); // Debugging
  
//       // const itemInCart = wishlistdata.find(cartItem => cartItem.itemid === id);
//       // console.log("delete", itemInCart);
  
      
//         const response = await fetch(`${apiUrl}/cart`, {
//           method: "POST",
//           credentials: 'include', // important: allow cookies to be set
//           headers: { "Content-Type": "application/json",
//             // Authorization: `Bearer ${user.accessToken}`,
//           },
//           body: JSON.stringify(matchItem),
//         });
  
//         if (response.ok) {
//           const addedItem = await response.json();
//           setWishlist(prev => [...prev, id]);
//           setwishlistdata(prev => [...prev, addedItem]);
//         //  toast.success("item move to wishlist")
//     //     const toast = new window.bootstrap.Toast(toastRef.current);
//     // toast.show();
//     //     settoastmsg("item moved successfully")
//     showPopup("Item Moved")
//          removefromaddtocart(id)
//         }
//     }
// catch(e){
//   console.log(e)
// }
// finally{
//   setIsLoading(false)
// }
// }
const addtowishlistonly = async (id, prd) => {
  console.log("iredandid", prd, id);

  try {
    setIsLoading(true);

    /* =======================
       👉 GUEST USER ADD
    ======================= */
    if (!isLoggedIn) {
      const guestWishlist =
        JSON.parse(localStorage.getItem("guestWishlist")) || [];

      const alreadyExists = guestWishlist.find(
        item => item.productId === id
      );

      if (alreadyExists) {
        showPopup("Already in Wishlist");
        return;
      }

      guestWishlist.push({
        productId: id,
        price: prd.price,
        discountprice: prd.discountprice,
        discount: prd.discount,
        image: prd.image,
        shopname: prd.shopname,
        title: prd.title,
        description: prd.description,
        size: prd.sizes,
      });
setGuestWishlist(guestWishlist)
      localStorage.setItem(
        "guestWishlist",
        JSON.stringify(guestWishlist)
      );

      // UI sync
      setWishlist(prev => [...prev, id]);
      setwishlistdata(prev => [...prev, { productId: id }]);

      showPopup("Item Moved");
      removefromaddtocart(id); // optional
      return; // 🚨 important
    }

    /* =======================
       👉 LOGGED-IN USER ADD
    ======================= */

    const matchedColors = productdataonlydetail
      .flatMap(product => product.colors || [])
      .filter(color => color._id === id);

    if (matchedColors.length === 0) {
      console.error("No matching item found!");
      return;
    }

    const matchItem = { ...matchedColors[0] };

    matchItem.userid = userDetails._id;
    matchItem.productId = id;
    matchItem.price = prd.price;
    matchItem.discountprice = prd.discountprice;
    matchItem.discount = prd.discount;
    matchItem.image = prd.image;
    matchItem.shopname = prd.shopname;
    matchItem.title = prd.title;
    matchItem.description = prd.description;
    matchItem.size = prd.sizes;

    const response = await fetch(`${apiUrl}/cart`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(matchItem),
    });

    if (response.ok) {
      const addedItem = await response.json();
      setWishlist(prev => [...prev, id]);
      setwishlistdata(prev => [...prev, addedItem]);
      showPopup("Item Moved");
      removefromaddtocart(id);
    }
  } catch (e) {
    console.error("Add to wishlist error:", e);
    showPopup("Error adding to wishlist");
  } finally {
    setIsLoading(false);
  }
};



  

  const handleAddToCart = async (prd, quantity, selectedSize) => {  
 
   
    
    // 🔥 Facebook Pixel Event
    if (window.fbq) {
      window.fbq("track", "AddToCart", {
        content_name: prd.title ,
        content_ids: [prd._id],
        content_type: "product",
        value: prd.discountprice || prd.price,
        currency: "INR",
      });
    }
    // if(!user){
    //   setshowloginpage(true)
    // }

    if (!isLoggedIn) {
  // 👉 Guest cart
  const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];

  guestCart.push({
    _id: nanoid(), 
     productId: prd._id,
    
      productid: prd._id,
          color: prd?.color,
          image: prd.image || prd?.sizes?.[0]?.image?.[0] || "",
          title: prd.title,
          description: prd.description,
          qty: quantity,
          size: selectedSize,
          price: prd.price,
          discountprice: prd.discountprice,
          shopname: prd.shopname,
  });

  setGuestCart(guestCart)
  localStorage.setItem("guestCart", JSON.stringify(guestCart));
  showPopup("Added to Bag");
  return;
}

    else{
  try {
    setIsLoading(true);
 trackAddToCart(prd);

    const isBundle = Array.isArray(prd) && prd.length > 0;

    const payload = isBundle
      ? {
          userid: userDetails?._id,
          bundle: prd, // ✅ only send bundle data
        }
      : {
          userid: userDetails?._id,
          productId: prd._id,
          productid: prd._id,
          color: prd?.color,
          image: prd.image || prd?.sizes?.[0]?.image?.[0] || "",
          title: prd.title,
          description: prd.description,
          qty: quantity,
          size: selectedSize,
          price: prd.price,
          discountprice: prd.discountprice,
          shopname: prd.shopname,
        };

    console.log("🧾 Sending payload to cart:", payload);

    const response = await fetch(`${apiUrl}/addtocart`, {
      method: "POST",
      credentials: 'include', // important: allow cookies to be set
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const addedItem = await response.json();
      setaddtocartdata((prev) => [...prev, addedItem]);
      if (!isBundle) setaddtocartdataonly((prev) => [...prev, prd._id]);
      showPopup("Added to Bag");
    } else {
      showPopup("Oops...");
    }
  } catch (error) {
    console.error("❌ Error in handleAddToCart:", error);
  } finally {
    setIsLoading(false);
  }
}
};

  // const removefromaddtocart=async(id)=>{
  //   console.log("crt ki id",id)
  //   try{
  //     setIsLoading(true)
  //     const matchItem = allproductdata.find((e) => e._id === id);
  //     console.log("match ho gyaa crtid",matchItem)
  //     const itemInCart = addtocartdatas.find((cartItem) => cartItem.productid === id);
  //  console.log("deletecrtid",itemInCart)

  //  if(itemInCart)
  //  {
  //   const response = await fetch(`${apiUrl}/addtocart/${itemInCart._id}`, {
  //     method: 'DELETE',
  //     credentials: 'include', // important: allow cookies to be set
  //     // headers: { 
  //     //   Authorization: `Bearer ${user.accessToken}`,
  //     // },
  //      });
 
  //      if (response.ok) {
  //             //  setaddtocartdata((prev) => prev.filter((itemId) => itemId.productid !== id));
  //             setaddtocartdata((prev) => prev.filter((item) => item._id !== itemInCart._id));

              
  //   showPopup("Removed From Bag")
  //            }
  //            else{
    
  //   showPopup("Not removed")
  //            }
  //  }
   
  //   }
  //   catch(e){
  //     console.error('Error in handleClick:', error);
  //   }
  //   finally{
  //     setIsLoading(false)
  //   }
    
  // }
  const removefromaddtocart = async (id) => {
  console.log("crt ki id", id);

  try {
    setIsLoading(true);

    /* =======================
       👉 GUEST USER REMOVE
    ======================= */
    if (!isLoggedIn) {
      const guestCart =
        JSON.parse(localStorage.getItem("guestCart")) || [];

      const updatedCart = guestCart.filter(
        item => item.productId !== id
      );
       setGuestCart(updatedCart)
      localStorage.setItem(
        "guestCart",
        JSON.stringify(updatedCart)
      );

      // UI sync
      setaddtocartdata(prev =>
        prev.filter(item => item.productId !== id)
      );
      setaddtocartdataonly(prev =>
        prev.filter(itemId => itemId !== id)
      );

      showPopup("Removed From Bag");
      return; // 🚨 important
    }

    /* =======================
       👉 LOGGED-IN USER REMOVE
    ======================= */

    const itemInCart = addtocartdatas.find(
      cartItem => cartItem.productid === id
    );

    if (!itemInCart) {
      showPopup("Item not found");
      return;
    }

    const response = await fetch(
      `${apiUrl}/addtocart/${itemInCart._id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (response.ok) {
      setaddtocartdata(prev =>
        prev.filter(item => item._id !== itemInCart._id)
      );
      setaddtocartdataonly(prev =>
        prev.filter(itemId => itemId !== id)
      );

      showPopup("Removed From Bag");
    } else {
      showPopup("Not removed");
    }
  } catch (error) {
    console.error("Error in removefromaddtocart:", error);
    showPopup("Error removing item");
  } finally {
    setIsLoading(false);
  }
};


  useEffect(()=>{
 
 let bestselling=async()=>{
  try{
    setIsLoading(true)
let bestselingdata=await fetch(`${apiUrl}/bestselling`)

let resdata=await bestselingdata.json()
console.log("papapama",resdata)
setbestsellingdata(resdata)
}
catch(e){
  console.log(e)
}
finally{
  setIsLoading(false)
}

 }
 bestselling()

  },[])

  useEffect(()=>{
 
    let wears=async()=>{
     try{
      setIsLoading(true)
   let wearsdata=await fetch(`${apiUrl}/wear?operation=all`)
   console.log(wearsdata)
   let resdata=await wearsdata.json()
   console.log("ajana",resdata)
  setwearsdata(resdata)
   }
   catch(e){
     console.log(e)
   }
   finally{
    setIsLoading(false)
   }
   
    }
    wears()
   
     },[])

     //rent data
     const rentData = async () => {
      try {
        setIsLoading(true)
        let rentRes = await fetch(`${apiUrl}/rent?operation=all`);
        let finalRes = await rentRes.json();
        console.log("rentdress ka data",finalRes)
        setrentdata(finalRes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      finally{
        setIsLoading(false)
      }

    };
  
    useEffect(() => {
      rentData();
    }, []);
   

    useEffect(()=>{
      let newarrival=async()=>{
try{
  setIsLoading(true)
  let getdata=await fetch(`${apiUrl}/newarrival`)
  let resdata=await getdata.json()
   setnewarrival(resdata)
}
catch(e){
  console.log(e)
}
finally{
  setIsLoading(false)
}
      }
      newarrival()
    },[])

    console.log("new arrival in bio",newarrival)

  // Remove from Wishlist
  let handleRemoveClickwishlist = async (id) => {
    console.log(typeof(id))
    console.log("myid",id)
    console.log("wishid",wishlist)
    try {
      setIsLoading(true)
      let data =wishlistdata.find((e) => e.id === id);
      console.log("xdx",data)
      let res = await fetch(`${apiUrl}/cart/${data._id}`, {
        method: "DELETE",
        credentials: 'include', // important: allow cookies to be set
        // headers: { 
        //   Authorization: `Bearer ${user.accessToken}`,
        // },
      });
      if(res.ok){
    
    showPopup("item removed")
      }
      setWishlist(wishlist.filter(item => item.id !== id)); // Remove item from local state
    } catch (e) {
      console.log(e);
    }
    finally{
      setIsLoading(false)
    }
  };


//Add to Cart
  const addToCart = (item) => {
    axios.post('/api/cart/add', { productId: item.id }, { headers: { Authorization: `Bearer ${user.token}` } })
      .then(response => setCart(response.data.cart))
      .catch(err => console.log('Error adding to cart', err));
  };

  // Remove from Cart
  const removeFromCart = (itemId) => {
    axios.post('/api/cart/remove', { productId: itemId }, { headers: { Authorization: `Bearer ${user.token}` } })
      .then(response => setCart(response.data.cart))
      .catch(err => console.log('Error removing from cart', err));
  };




const productfetch = async () => {
  try {
    setIsLoading(true)
    let data = await fetch(`${apiUrl}/productmodel?operation=all`);
    let res = await data.json();
    
    console.log("✅ New data fetched:", res);
    if (!res || res.length === 0) return; // ✅ Empty response check
    
    setproductdata([...res]); // ✅ Spread operator to force state update
    let pdd = res.map((e) => e.productdetails).flat();
    setproductdataonlydetail([...pdd]); // ✅ Spread operator again
    console.log("📢 Updated productdataonlydetail:", pdd);

    setIsFetched(true);
    setRefetch(false);  
  } catch (e) {
    console.log("❌ Fetch Error:", e);
  }
  finally{
    setIsLoading(false)
  }
};


// ✅ Initial fetch on mount
useEffect(() => {
  productfetch();
}, []);



// ✅ Re-fetch when manually triggered
useEffect(() => {
  if (refetch) {
    console.log("🔄 Manually re-fetching data...");
    productfetch();
  }
}, [refetch]);

 
   


// ✅ Jab bhi naye product add ho, ye function call karo
const handleRefetch = () => {
  console.log("🔄 Refetch triggered...");
  setRefetch(true);
};


console.log("chlo ye bhi sahu hai",productdata)
let getsearchinput=(inp)=>{
  setsearchvalue(inp)
}

let takebuydata=(data)=>{
  console.log("yoyoy",data)
  setbuydata(data)
}

let catehicate=(catearr)=>{
setcatehicate(catearr)
}

// let handlenewaddress=async(address,user)=>{
//   console.log("useridf",user._id)
//   try {
//     const response = await fetch(`${apiUrl}/user/${user._id}/address`, {
//       method: "PATCH",  // Using PATCH request to update the address
//       headers: {
//         "Content-Type": "application/json",  // Specify that we're sending JSON
//       },
//       body: JSON.stringify(address),  // Convert newAddress to JSON
//     });

//   if (response.ok) {
//     if (response.ok) {
//       if (response.message === "OTP sent successfully") {
//         // alert("OTP sent! Please enter the OTP to verify.");
//         return;  // ✅ Stop execution and wait for OTP input
//       } else {
//         alert("Address added successfully!");
//       }
//     } else {
//       alert("Error:", response.message);
//     }
//   } 
//   } catch (error) {
//     console.error("Error:", error);
//     alert("An error occurred while adding the address.");
//   }
//   console.log("no data found")

// }
let handlenewaddress = async (address, user) => {
  console.log("helllo addresss",address)
  // console.log("helllo addresss",otp )
  console.log("useridf", user?._id);  // Check if user._id exists before using it

  // if (!user?._id) {
  //   console.error("Error: User ID is undefined");
  //   alert("User ID is missing. Please try again.");
  //   return;
  // }
  if (!isLoggedIn) {
  const guestAddress =
    JSON.parse(localStorage.getItem("guestAddress")) || [];

  const newAddress = {
      _id: crypto.randomUUID(), // 🔥 VERY IMPORTANT
      ...address,
    };


  guestAddress.push(newAddress);
  localStorage.setItem("guestAddress", JSON.stringify(guestAddress));
  
  showPopup("Address saved");
  return;
}


  try {
    setIsLoading(true)
    const response = await fetch(`${apiUrl}/user/${user._id}/address`, {
      method: "PATCH",
    // credentials: 'include', // important: allow cookies to be set
      headers: { "Content-Type": "application/json",
        // Authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(address),
    });

    const data = await response.json(); // Always parse the response

    if (response.ok) {
     
      console.log("address addedd goodly")
    } else {
      alert("Error: " + data.message);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while adding the address.");
  }
  finally{
    setIsLoading(false)
  }
};



// let deleteandeditaddrress=async(addresid,action,user,addr)=>{
// console.log("sara add mil jaye",addresid,action,user,addr)
//   if(action=="delete"){
//  try{
//   setIsLoading(true)
//   const response = await fetch(`${apiUrl}/user/${user._id}/addressdoe`, {
//     method: "PATCH",  // Using PATCH request to update the address
//     credentials: 'include', // important: allow cookies to be set
//     headers: { "Content-Type": "application/json",
//       // Authorization: `Bearer ${user.accessToken}`,
//     },
//     body: JSON.stringify({addresid,action}),  // Convert newAddress to JSON
//   });
//   if(response.ok){
//     console.log("good")
//     // setaddress(prev => {
//     //   console.log("Previous Address State", prev); // Debug check
//     //   return prev.filter(a => a._id !== addresid);
//     // });
//     showPopup("Address Deleted")
//   }
//   else{
//     console.log("issue")
//   }
//  } 
//  catch(e){
//   console.log(e)
 
// }
// finally{
//   setIsLoading(false)
// }
// }

// else{
//   console.log("userid",user._id)
//   console.log("userid",addr)
//   try {
//     setIsLoading(true)
//     const response = await fetch(`${apiUrl}/user/${user._id}/addressdoe`, {
//       method: "PATCH",  // Using PATCH request to update the address
//       credentials: 'include', // important: allow cookies to be set
     
//       headers: { "Content-Type": "application/json",
//         // Authorization: `Bearer ${user.accessToken}`,
//       },
//       body: JSON.stringify({addresid,action,addr}),  // Convert newAddress to JSON
//     });
//     if(response.ok){
//       console.log("address edit")
//       showPopup("Address Edited")
//     }
//     else{
//       console.log("not edit")
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     alert("An error occurred while adding the address.");
//   }
//   finally{
//     setIsLoading(false)
//   }

// }
// }
let deleteandeditaddrress = async (addresid, action, user, addr) => {
  console.log("sara add mil jaye", addresid, action, user, addr);

  try {
    setIsLoading(true);

    /* =======================
       👉 GUEST USER FLOW
    ======================= */
    if (!isLoggedIn) {
      const guestAddress =
        JSON.parse(localStorage.getItem("guestAddress")) || [];

      // 🗑️ DELETE
      if (action === "delete") {
        const updatedAddress = guestAddress.filter(
          a => a._id !== addresid
        );

        localStorage.setItem(
          "guestAddress",
          JSON.stringify(updatedAddress)
        );

        // UI sync
        setaddress(updatedAddress);
        showPopup("Address Deleted");
        return;
      }

      // ✏️ EDIT
      const updatedAddress = guestAddress.map(a =>
        a._id === addresid ? { ...a, ...addr } : a
      );

      localStorage.setItem(
        "guestAddress",
        JSON.stringify(updatedAddress)
      );

      setaddress(updatedAddress);
      showPopup("Address Edited");
      return;
    }

    /* =======================
       👉 LOGGED-IN USER FLOW
    ======================= */

    if (action === "delete") {
      const response = await fetch(
        `${apiUrl}/user/${user._id}/addressdoe`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ addresid, action }),
        }
      );

      if (response.ok) {
        showPopup("Address Deleted");
      } else {
        showPopup("Issue deleting address");
      }
    } else {
      const response = await fetch(
        `${apiUrl}/user/${user._id}/addressdoe`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ addresid, action, addr }),
        }
      );

      if (response.ok) {
        showPopup("Address Edited");
      } else {
        showPopup("Issue editing address");
      }
    }
  } catch (error) {
    console.error("Address delete/edit error:", error);
    showPopup("Something went wrong");
  } finally {
    setIsLoading(false);
  }
};



let handlechooseaddress=(add)=>{
  console.log("hello add")
  if(add){
    console.log("addresschoosed",add)
    setaddress(add)
  }

}

let orderplaced = async (
  order,
  address,
  walletUsed,
  payableAmount,
  timeslot,
  paymentmode
) => {
  trackPurchase(order, addtocartitem, payableAmount);

  if (user && userDetails) {
    try {
      setIsLoading(true);

      let orderpost = await fetch(`${apiUrl}/order`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order,
          address,
          userDetails,
          distance,
          walletUsed,
          payableAmount,
          timeslot,
          paymentmode,
        }),
      });

      if (!orderpost.ok) return;

      let data = await orderpost.json();
      console.log("order response", data);

      /* =======================
         🔹 COD FLOW
      ======================== */
      if (paymentmode === "cod") {
        showPopup("Your Order Has Been Confirmed");
        window.location.href = "/orderconfirm";
        return;
      }

      /* =======================
         🔹 PHONEPE ONLINE FLOW
      ======================== */
      if (paymentmode !== "cod" && data.tokenUrl) {
        window.PhonePeCheckout.transact({
          tokenUrl: data.tokenUrl,
          type: "IFRAME", // ✅ Recommended
          callback: function (response) {
            if (response === "USER_CANCEL") {
              console.log("User cancelled payment");
              showPopup("Payment cancelled");
            } else if (response === "CONCLUDED") {
              console.log("Payment finished");
              // ⚠️ Final status backend webhook / status API se hi aayega
              window.location.href = "/orderconfirm";
            }
          },
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }
};

if(productdataonlydetail){
  console.log("prddd",productdataonlydetail)
}



const fetchUserOrders = async (userId) => {
  console.log("maaro mujhe maaro")
  try {
    setIsLoading(true)
      if (!userDetails._id) {
          console.error("❌ User ID is missing!");
          return;
      }
      let res = await fetch(`${apiUrl}/orders/user/${userDetails._id}`, {
        credentials: 'include', // important: allow cookies to be set
      }
      //   ,{
      //   headers: { 
      //     Authorization: `Bearer ${user.accessToken}`,
      //   },
      // }
    );
      if (!res.ok) {
          throw new Error("Failed to fetch user orders");
      }
      let data = await res.json();
      console.log("order ke data yhamilte",data)
      setuserorder(data);
  } catch (err) {
      console.log(err);
  }
  finally{
    setIsLoading(false)
  }
};

// useEffect me userId pass karo
useEffect(() => { 
  if (userDetails?._id) {
      fetchUserOrders(userDetails._id);
       const eventSource = new EventSource(`${apiUrl}/events`);

    eventSource.onmessage = () => {
   fetchUserOrders(userDetails._id);; // 🟢 Jab bhi event aaye, orders fetch karo
    };

    return () => {
        eventSource.close();
    };
  }
}, [user, userDetails?._id,userorder?.status]);


// useEffect(()=>{
//   fetchSlots()
// },[slotVersion])
// const submitRating = async (productId, userId, rating, review,image) => {
//   console.log("rating",rating)
//   try {
//     setIsLoading(true)
//       const response = await fetch(`${apiUrl}/rate`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json",
//             // Authorization: `Bearer ${user.accessToken}`,
//           },
//           body: JSON.stringify({ userId, productId, rating, review,image})
//       });

//       const data = await response.json();
//       console.log("Rating Submitted:", data);
//   } catch (error) {
//       console.error("Error submitting rating:", error);
//   }
//   finally{
//     setIsLoading(false)
//   }
// };
const submitRating = async (productId, userId, rating, review, imageUrl) => {
  try {
    setIsLoading(true);
    const response = await fetch(`${apiUrl}/rate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        productId,
        rating,
        review,
        image: imageUrl, // URL from Cloudinary
      }),
    });

    const data = await response.json();
    console.log("Rating Submitted:", data);
  } catch (error) {
    console.error("Error submitting rating:", error);
  } finally {
    setIsLoading(false);
  }
};

const fetchRatings = async (productId) => {
  try {
    setIsLoading(true)
    if(!userDetails._id && user)
    {
      console.error("❌ User ID is missing!");
      return;
    }
    let res = await fetch(`${apiUrl}/ratings/${userDetails._id}/${productId}`,
    //   {
    //   headers: { 
    //     Authorization: `Bearer ${user.accessToken}`,
    //   },
    // }
  );
    if (!res.ok) {
        throw new Error("Failed to fetch iusers rating");
    }
    let data = await res.json();
    console.log("rating of my prodduct",data)
    setrating(data);

     
  } catch (error) {
      console.error("Error fetching ratings:", error);
  }
  finally{
    setIsLoading(false)
  }
};
// Function to fetch ratings from backend
  const  callreivewfunc= async (id) => {
    
    console.log("haa mujhe hi call ho rha hau",id)
    try {
      setIsLoading(true)
      const response = await fetch(`${apiUrl}/rate/${id}`);
      const data = await response.json();
      console.log("dekh mila kya",data)
      setprdreviewdata(data);
    } catch (error) {
      console.error("Error fetching ratings:", error);
    } finally {
       setIsLoading(false);
    }
  };

  let orderreturn = async (reason, subreason, selectedOption,transectionId, orderdata, uploadedUrls, address) => {
  console.log("📤 Preparing return request...");
  console.log("➡ reason:", reason);
  console.log("➡ subreason:", subreason);
  console.log("➡ selectedOption:", selectedOption);
  console.log("➡ orderdata:", orderdata);
  console.log("➡ uploadedUrls:", uploadedUrls);
  console.log("➡ address:", address);

  const bodyToSend = {
    reason,
    subreason,
    selectedOption,
    transectionId,
    orderdata,
    uploadedUrls,
    address,
  };

  try {
    setIsLoading(true);

    const orderpost = await fetch(`${apiUrl}/return`, {
      method: "POST",
      credentials: 'include', // important: allow cookies to be set
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyToSend),
    });

    if (orderpost.ok) {
      showPopup("Return Requested");
    } else {
      const errData = await orderpost.json();
      console.error("❌ Return failed (400 or 500):", errData);
      alert("Return Failed: " + (errData.error || "Unknown error"));
    }
  } catch (e) {
    console.error("❌ Fetch Error:", e);
    alert("Network or Server Error");
  } finally {
    setIsLoading(false);
  }
};



const fetchCoupons = async (cate, title) => {
  try {
    setIsLoading(true);

    const userId = userDetails?._id || "guest"; // Default to "guest" if userId is not available
    console.log("userikid",userId)
    // if (!userId || !cate || !title) {
    //   console.log("🚫 Missing params for fetchCoupons:", { userId, cate, title });
    //   return;
    // }
 if (!cate || !title) {
      console.log("🚫 Missing params for fetchCoupons:", { cate, title });
      return;
    }
    const queryParams = new URLSearchParams({
      userId: userId,
      category: cate ,
      productname: title,
    });

    console.log("📦 Fetching coupons with params:", queryParams.toString());

    const response = await fetch(`${apiUrl}/get-coupons?${queryParams.toString()}`);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const data = await response.json();
    console.log("🎁 Coupons received:", data);
    setCoupons(data);
  } catch (err) {
    console.error('❌ Error fetching coupons:', err);
  } finally {
    setIsLoading(false);
  }
};


const getBundleColorData = async (bundleId) => {
  console.log("bundle id dekhte h",bundleId)
  try {
    setIsLoading(true)
    const response = await fetch(`${apiUrl}/getbundle/${bundleId}`);
    const data = await response.json();
 setbundeldata([data])
    if (response.ok) {
      console.log("Bundle color found:", data);
      // setbundeldata(data)
      // Use data in UI
    } else {
      alert("No matching bundle found.");
    }
  } catch (err) {
    console.error("Error fetching bundle color:", err);
    alert("Server error");
  }
  finally{
    setIsLoading(false)
  }
};



    // if (product) {
    //   fetchCoupons();
    // }
  


console.log("toastmsg",toastmsg)

if(user && userDetails){
  console.log("plz dono bche ajao",user,userDetails)
}

// const userAddress = "shree gururkripa pg padam vihar colony rajatpath mansarovar, jaipur";

const fetchDistance = async (deleveryaddress) => {
  let userAddress=`${deleveryaddress[0].building} ${deleveryaddress[0].locality} ${deleveryaddress[0].city} ${deleveryaddress[0].pincode} `
  // let userAddress='shree gururkripa pg padam vihar colony rajatpath mansarovar, jaipur'
  console.log("userkaaddress",userAddress)
  try {
    const res = await fetch(`${apiUrl}/getdistance?userAddress=${encodeURIComponent(userAddress)}`);
    console.log("fetch distance called",res)
    const data = await res.json();
    console.log("Distanceoo:", data.distance);
    setdistance(data.distance)
  } catch (err) {
    console.error("Error distance:", err);
  }
};

// const getRecommendationsFromCart = async () => {
//   console.log("call ho rha hai na loduu")

//   try {
//    setIsLoading(true)
//     const res = await fetch(`${apiUrl}/cart/recommendations/${userDetails?._id}`);
      
//     const data = await res.json();
//     console.log("mixx cart",data)
//     setRecommendations(data.products || []);
//   } catch (error) {
//     console.error("Recommendation fetch error", error);
//     setRecommendations([]);
//   }
//   finally{
//     setIsLoading(false)
//   }
// };
const getRecommendationsFromCart = async () => {
  if (!userDetails?._id) {
    console.log("❌ User not logged in or userId missing");
    return;
  }

  try {
    setIsLoading(true);
    const res = await fetch(`${apiUrl}/cart/recommendations/${userDetails._id}`);
    const data = await res.json();
    console.log("mixx cart", data);
    setRecommendations(data.products || []);
  } catch (error) {
    console.error("Recommendation fetch error", error);
    setRecommendations([]);
  } finally {
    setIsLoading(false);
  }
};

useEffect(() => {
  if (userDetails?._id) {
    getRecommendationsFromCart();
  }
}, [userDetails]);

// somewhere in BioContext or useEffect in component
const fetchTopSearched = async () => {
  try {
    setIsLoading(true)
    const res = await fetch(`${apiUrl}/products/topsearched`);
    const data = await res.json();
    console.log("topsearch",data)
    setTopProducts(data.products || []);
  } catch (err) {
    console.error("Top searched fetch failed", err);
  }
  finally{
    setIsLoading(false)
  }
};



  return (
    <>
  
    

    <BioContext.Provider
      value={{
       
        cart,
        bestsellingdata,
        wearsdata,
        guestWishlist,
        isLoggedIn,
        wishlist,
        guestWishlist,
        filters,
        setFilters,
        rentdata,
        wishlistdata,
        addToCart,
        removeFromCart,
        addtocartitem,
        handleClick,
        handleAddToCart,
        guestCart,
        handleRemoveClickwishlist ,
        productdata,
        // productfetch,
        newarrival,
        productdataonlydetail,
        addtocartdatas,
        removefromaddtocart,
        addtowishlistonly,
        getsearchinput,
        searchvalue,
        setcatehicate,
        catecate,
        takebuydata,
        buydata,
        handlenewaddress,
        handlechooseaddress,
        addresssetkro,
        deleteandeditaddrress,
        productfetch,
        handleRefetch,
        orderplaced,
        userorder,
        submitRating,
        fetchRatings,
        rating,
        orderreturn,
        removewishlistonly,
        setwalletkapesa,
        walletkapesa,
        settimeslotlelo,
        timeslotlelo,
        alluser,
        fetchCoupons,
        coupons,
        setkarocode,
        karocode,
        prdreviewdata,
        callreivewfunc,
        getBundleColorData,
        getbundeldata,
        setshowmeaddress,
        showmeaddress,
        fetchDistance,
        distance,
        showloginpage,
        setshowloginpage,
        getRecommendationsFromCart,
        recommendations,
        fetchTopSearched,
        topproducts,
        userDetails,
        sortOption, 
        setSortOption
    }}
    >
      {children}
    </BioContext.Provider>
    </>
  );
};

export const useBio = () => useContext(BioContext);
