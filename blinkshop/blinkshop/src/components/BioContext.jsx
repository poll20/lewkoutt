
import React, { createContext, useContext, useState, useEffect ,useRef} from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Import AuthContext for Authentication

import { useLoading } from './LoadingContext';
import { useFirebaseAuth } from "./FirebaseContext";
import { Navigate, useFetcher, useNavigate } from 'react-router-dom';
import { useDashboard } from './dashboardforadmin/DashboardContext';
import { color } from 'framer-motion';
// import { trackEvent } from '../analytics/ga4';
// import { OrderAlertProvider } from './dashboardforadmin/OrderAlertProvider';

// import { ToastContainer, toast } from 'react-toastify';
// import Toast from './Toast';

export const BioContext = createContext();


export const BioProvider = ({children,addtocartitem,showPopup,navigate }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  console.log("urll",apiUrl)
  // const { user,userDetails } = useAuth();
    const {user, userDetails, } = useFirebaseAuth();
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
useEffect(() => {
  if(user && userDetails._id){
  console.log("userdetails in bio",userDetails)
    const fetchCartItems = async () => {
      try {
        setIsLoading(true)
        let response = await fetch(`${apiUrl}/cart/${userDetails?._id}`, 
          {
          credentials: 'include', // important: allow cookies to be set
        }
      );
        let data = await response.json();
        // console.log("data in cart",data)
        // if(data)
        //   {
        //    console.log("data kokoin cart",data)
        //   }
        if (!Array.isArray(data)) {  // ✅ Handle unexpected API response
          console.error("Invalid response format:", data);
          return;
        }
        // console.log("data kokoin cart",data)
        setwishlistdata(data)
        let cartItemIds = data.map(item => item.itemid); // Collect the ids of the items in the cart
        setWishlist(cartItemIds);  // Set the ids in the state to keep the icons red
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
      finally{
        setIsLoading(false)
      }
    };
    fetchCartItems()
  
}
  
  
  }, [user, userDetails]);

  useEffect(() => {
    if(user&& userDetails._id){
      const fetchCartItems = async () => {
        try {
          setIsLoading(true)
          let response = await fetch(`${apiUrl}/addtocart/${userDetails._id}`
            , {
            credentials: 'include', // important: allow cookies to be set
          }
        );
          let data = await response.json();
          if (!Array.isArray(data)) {  // ✅ Handle unexpected API response
            console.error("Invalid response format:", data);
            return;
          }
          console.log("data in cart",data)
          setaddtocartdata(data)
          let cartItemIds = data.map(item => item.id); // Collect the ids of the items in the cart
          setaddtocartdataonly(cartItemIds);  // Set the ids in the state to keep the icons red
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
        finally{
          setIsLoading(false)
        }
      };
      fetchCartItems()
    }
    
    
    }, [user,userDetails]);
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
  // const handleClick = async (prd,id) => {
  //   try {
  //     // const matchItem = allproductdata.find((e) => e._id === id);
  //     const matchItem = productdataonlydetail
  //     .flatMap(product => product.colors)  // Sare products ke colors ko ek array bana diya
  //     .filter(color => color._id == id);
  //      console.log("matchiterm",matchItem)
  //     console.log("id",id)
  //     console.log("ui",userDetails._id )
  //     matchItem["userid"]=userDetails._id
  //     matchItem["productId"]=id
  //     matchItem["price"]=prd.price
  //     matchItem["discountprice"]=prd.discountprice
  //     matchItem["productId"]=id
  //     matchItem["image"]=prd.image
  //     matchItem["shopname"]=prd.shopname
  //     console.log(typeof(matchItem),"mit")
  //     console.log("match ho gyaa",matchItem)
  //     const itemInCart = wishlistdata.find((cartItem) => cartItem.itemid === id);
  //  console.log("delete",itemInCart)
  //     if (!itemInCart) {
  //       const response = await fetch('${apiUrl}/cart', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify(matchItem),
  //       });

  //       if (response.ok) {
  //         const addedItem = await response.json();
  //         setWishlist((prev) => [...prev, id]);
  //         setwishlistdata((prev) => [...prev, addedItem]);
  //       }
  //     } else {
  //       const response = await fetch(`${apiUrl}/cart/${itemInCart._id}`, {
  //         method: 'DELETE',
  //       });

  //       if (response.ok) {
  //         setWishlist((prev) => prev.filter((itemId) => itemId !== id));
  //         setwishlistdata((prev) => prev.filter((item) => item.itemid !== id));
  //         toast.success("data removed succesfully")
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error in handleClick:', error);
      
  //   }
  // };
  const handleClick = async (prd, id) => {
  //     trackEvent({
  //   category: "Wishlistr",
  //   action: "Add to Wishlist",
  //   label: prd.title,
  //   value: prd.price,
  // });

    console.log("iredandid",prd,id)
    
    
    try {
      setIsLoading(true)
      if(!user){
        setshowloginpage(true)
      }
      // Correcting the way matchItem is created
      // const matchedColors = productdataonlydetail
      //   .flatMap(product => product.colors)
      //   .filter(color => color._id == id);
      const matchedColors = productdataonlydetail
  .flatMap(product => product.colors || [])
  .filter(color => color._id == id);
  
      if (matchedColors.length === 0) {
        console.error("No matching item found!");
        return;
      }
  
      const matchItem = { ...matchedColors[0] }; // Convert array to object
      console.log("matchItem before adding data:", matchItem);
  
      // Adding necessary properties
      matchItem.userid = userDetails._id;
      matchItem.productId = id;
      matchItem.price = prd.price;
      matchItem.discountprice = prd.discountprice;
      matchItem.discount = prd.discount;

      matchItem.image = prd.image;
      matchItem.shopname = prd.shopname;
      // matchItem.color=prd?.colors[0]?.color || prd?.color
      matchItem.color = Array.isArray(prd?.colors) && prd.colors.length > 0 
  ? prd.colors[0].color 
  : prd?.color || "defaultColor";
      matchItem.title = prd.title;
      matchItem.description = prd.description;
      matchItem.size = prd.sizes;
  
      console.log("Final matchItem:", matchItem); // Debugging
  
      const itemInCart = wishlistdata.find(cartItem => cartItem.itemid === id);
      console.log("delete", itemInCart);
  
        if (!itemInCart) {
          const response = await fetch(`${apiUrl}/cart`, {
            method: "POST",
            credentials: 'include', // important: allow cookies to be set
            headers: { "Content-Type": "application/json",
              // Authorization: `Bearer ${user.accessToken}`,
            },
            body: JSON.stringify(matchItem),
          });
  
        if (response.ok) {
          const addedItem = await response.json();
          setWishlist(prev => [...prev, id]);
          setwishlistdata(prev => [...prev, addedItem]);
    //       const toast = new window.bootstrap.Toast(toastRef.current);
    // toast.show();
    //       settoastmsg("item added successfully")
    showPopup("Added to Wishlist")
        }
      } else {
        const response = await fetch(`${apiUrl}/cart/${itemInCart.itemid}`, {
          method: "DELETE",
          credentials: 'include', // important: allow cookies to be set
          // headers: {
          //   Authorization: `Bearer ${user.accessToken}`,
          // },
        });
  
        if (response.ok) {
          setWishlist(prev => prev.filter(itemId => itemId !== id));
          setwishlistdata(prev => prev.filter(item => item.itemid !== id));
          // toast.success("Data removed successfully");
    //       const toast = new window.bootstrap.Toast(toastRef.current);
    // toast.show();
    //       settoastmsg("item removed successfully")
    showPopup("Removed from Wishlist")
        }
      }
    } catch (error) {
      console.error("Error in handleClick:", error);
    }
    finally{
      setIsLoading(false)
    }
  
  };

  const removewishlistonly=async(id)=>{
    console.log("id",id)
    try{
      setIsLoading(true)
      const response = await fetch(`${apiUrl}/cart/${id}`, {
        method: "DELETE",
        credentials: 'include', // important: allow cookies to be set
        // headers: { 
        //   Authorization: `Bearer ${user.accessToken}`,
        // },
      });

      const data = await response.json(); // Server se response parse karo
    console.log("Server Response:", data); // Error ya success message dekho
      if (response.ok) {
        setWishlist(prev => prev.filter(itemId => itemId !== id));
        setwishlistdata(prev => prev.filter(item => item.itemid !== id));
       // toast.success("Data removed successfully");
    //    const toast = new window.bootstrap.Toast(toastRef.current);
    // toast.show();
    //    settoastmsg("item removed successfully")
    showPopup("Removed From Wishlist")
      }
      else {
    //     const toast = new window.bootstrap.Toast(toastRef.current);
    // toast.show();
    //     settoastmsg(data.message || "Error removing item");
    showPopup("error removing item")
      }
  
    }
    catch(e){
    //   const toast = new window.bootstrap.Toast(toastRef.current);
    // toast.show();
    //   settoastmsg(data.message || "Error removing item");
    showPopup("error removing item")
    }
    finally{
      setIsLoading(false)
    }

  }
  
const addtowishlistonly=async(id,prd)=>{
//   console.log("mili kya",id,prd)
//   try {
//     const matchItem = allproductdata.find((e) => e._id === id);
//     console.log("apd",allproductdata)
//     console.log("gyu",matchItem)
//     prd["userid"]=userDetails._id
//     prd["productId"]=id
//     const itemInCart = wishlistdata.find((cartItem) => cartItem.itemid === id);

    
//       const response = await fetch('${apiUrl}/cart', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(prd),
//       });

//       if (response.ok) {
//         const addedItem = await response.json();
//         setWishlist((prev) => [...prev, id]);
//         setwishlistdata((prev) => [...prev, addedItem]);
//         toast.success("item move to wishlist")
//         removefromaddtocart(id)
//       }
      
    
// }
console.log("iredandid",prd,id)
    try {
      setIsLoading(true)
      // Correcting the way matchItem is created
      const matchedColors = productdataonlydetail
        .flatMap(product => product.colors)
        .filter(color => color._id == id);
  
      if (matchedColors.length === 0) {
        console.error("No matching item found!");
        return;
      }
  
      const matchItem = { ...matchedColors[0] }; // Convert array to object
      console.log("matchItem before adding data:", matchItem);
  
      // Adding necessary properties
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
  
      console.log("Final matchItem:", matchItem); // Debugging
  
      // const itemInCart = wishlistdata.find(cartItem => cartItem.itemid === id);
      // console.log("delete", itemInCart);
  
      
        const response = await fetch(`${apiUrl}/cart`, {
          method: "POST",
          credentials: 'include', // important: allow cookies to be set
          headers: { "Content-Type": "application/json",
            // Authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify(matchItem),
        });
  
        if (response.ok) {
          const addedItem = await response.json();
          setWishlist(prev => [...prev, id]);
          setwishlistdata(prev => [...prev, addedItem]);
        //  toast.success("item move to wishlist")
    //     const toast = new window.bootstrap.Toast(toastRef.current);
    // toast.show();
    //     settoastmsg("item moved successfully")
    showPopup("Item Moved")
         removefromaddtocart(id)
        }
    }
catch(e){
  console.log(e)
}
finally{
  setIsLoading(false)
}
}


  // const handleAddToCart = async (prd,quantity,selectedSize) => {

  //   try {
      
  //     setIsLoading(true)
 
  //     console.log("iqs",prd,quantity,selectedSize)
  //     // const matchItem = productdataonlydetail.find((e) => e._id == id);
  //     // const matchItem = productdataonlydetail
  //     // .flatMap(product => product.colors)  // Sare products ke colors ko ek array bana diya
  //     // .filter(color => color._id == id);
  //     // console.log("dekhte h chlo yha kya milta hia",matchItem)
  //     prd.userid=userDetails?._id
  //     prd.productId=prd._id
  //     prd.size=selectedSize
  //     prd.qty=quantity
      
  //     // Object.assign(matchItem, { size: selectedSize });
  //     // Object.assign(matchItem, { qty: quantity });
  //     console.log("dekhte h chlo yha kya milta hia",prd)
  //     // const itemInCart = addtocartdatas.find((cartItem) => cartItem._id === id);
  //     // const itemInCart = addtocartdatas.find((cartItem) => cartItem.productid === id);

      
  //       const response = await fetch(`${apiUrl}/addtocart`, {
  //         method: 'POST',
  //         headers: { "Content-Type": "application/json",
  //           // Authorization: `Bearer ${user.accessToken}`,
  //         },
  //         body: JSON.stringify(prd),
  //       });

  //       if (response.ok) {
  //         const addedItem = await response.json();
  //         setaddtocartdata((prev) => [...prev, addedItem]);
  //         setaddtocartdataonly((prev) => [...prev, prd._id]);
  //       //  toast.success("data added successfully")
  //   //     const toast = new window.bootstrap.Toast(toastRef.current);
  //   // toast.show();
  //   //     settoastmsg("item added successfully")
  //   showPopup("item added")
          
  //       }
  //       else{
  //   //       const toast = new window.bootstrap.Toast(toastRef.current);
  //   // toast.show();
  //   //       settoastmsg("oopss....")
  //   showPopup("oopsss")
  //       }


  //   // else {
  //   //     const response = await fetch(`${apiUrl}/addtocart/${itemInCart._id}`, {
  //   //       method: 'DELETE',
  //   //     });

  //   //     if (response.ok) {
  //   //       setaddtocartdata((prev) => prev.filter((itemId) => itemId !== id));
  //   //       setaddtocartdataonly((prev) => prev.filter((item) => item._id !== id));
  //   //       toast.success("data removed successfully")
  //   //     }
  //   //   }
  //   } catch (error) {
  //     console.error('Error in handleClick:', error);
  //   }
  //   finally{
  //     setIsLoading(false)
  //   }
  // };

  const handleAddToCart = async (prd, quantity, selectedSize) => {
  //     trackEvent({
  //   category: "Cart",
  //   action: "Add to Cart",
  //   label: prd.title,
  //   value: prd.price,
  // });

    console.log("cartbundle,",prd)
    if(!user){
      setshowloginpage(true)
    }
    else{
  try {
    setIsLoading(true);

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

  const removefromaddtocart=async(id)=>{
    console.log("crt ki id",id)
    try{
      setIsLoading(true)
      const matchItem = allproductdata.find((e) => e._id === id);
      console.log("match ho gyaa crtid",matchItem)
      const itemInCart = addtocartdatas.find((cartItem) => cartItem.productid === id);
   console.log("deletecrtid",itemInCart)

   if(itemInCart)
   {
    const response = await fetch(`${apiUrl}/addtocart/${itemInCart._id}`, {
      method: 'DELETE',
      credentials: 'include', // important: allow cookies to be set
      // headers: { 
      //   Authorization: `Bearer ${user.accessToken}`,
      // },
       });
 
       if (response.ok) {
              //  setaddtocartdata((prev) => prev.filter((itemId) => itemId.productid !== id));
              setaddtocartdata((prev) => prev.filter((item) => item._id !== itemInCart._id));

               // setaddtocartdataonly((prev) => prev.filter((item) => item._id !== id));
               //toast.success("data removed successfully")
    //            const toast = new window.bootstrap.Toast(toastRef.current);
    // toast.show();
    //            settoastmsg("item removed successfully")
    showPopup("Removed From Bag")
             }
             else{
    //           const toast = new window.bootstrap.Toast(toastRef.current);
    // toast.show();
    //            settoastmsg("data not removed")
    showPopup("Not removed")
             }
   }
    // const response = await fetch(`${apiUrl}/addtocart/${id}`, {
    //  method: 'DELETE',
    //   });

    //   if (response.ok) {
    //           setaddtocartdata((prev) => prev.filter((itemId) => itemId._id !== id));
    //           // setaddtocartdataonly((prev) => prev.filter((item) => item._id !== id));
    //           toast.success("data removed successfully")
    //         }
    //         else{
    //           toast.error("data not removed")
    //         }
    }
    catch(e){
      console.error('Error in handleClick:', error);
    }
    finally{
      setIsLoading(false)
    }
    
  }

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
      //  toast.success("itme removed successfulyy")
    //   const toast = new window.bootstrap.Toast(toastRef.current);
    // toast.show();
    //   settoastmsg("item removed successfully")
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
//  const productfetch=async()=>{ 
//   try{
//   let data=await fetch("${apiUrl}/productmodel?operation=all")
//   let res=await data.json()
//   console.log("plz acche se ana ",res)
//   setproductdata(res)
//   let pdd=res.map((e)=>(e.productdetails)).flat()
//   setproductdataonlydetail(pdd)
//   setIsFetched(true); // ✅ Data fetch hone ke baad state update
//   }
//   catch(e){
//     console.log(e)
//   }
//  }
// useEffect(()=>{
//    // ✅ Infinite loop avoid karne ke liye check
//     productfetch();
  
  

// },[])




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

  if (!user?._id) {
    console.error("Error: User ID is undefined");
    alert("User ID is missing. Please try again.");
    return;
  }

  try {
    setIsLoading(true)
    const response = await fetch(`${apiUrl}/user/${user._id}/address`, {
      method: "PATCH",
    credentials: 'include', // important: allow cookies to be set
      headers: { "Content-Type": "application/json",
        // Authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(address),
    });

    const data = await response.json(); // Always parse the response

    if (response.ok) {
      // if (data.message === "OTP sent successfully") {
      //   // alert("OTP sent! Please enter the OTP to verify.");
      //   return;
      // } else {
      //   alert("Address added successfully!");
      // }
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


let deleteandeditaddrress=async(addresid,action,user,addr)=>{
console.log("sara add mil jaye",addresid,action,user,addr)
  if(action=="delete"){
 try{
  setIsLoading(true)
  const response = await fetch(`${apiUrl}/user/${user._id}/addressdoe`, {
    method: "PATCH",  // Using PATCH request to update the address
    credentials: 'include', // important: allow cookies to be set
    headers: { "Content-Type": "application/json",
      // Authorization: `Bearer ${user.accessToken}`,
    },
    body: JSON.stringify({addresid,action}),  // Convert newAddress to JSON
  });
  if(response.ok){
    console.log("good")
    // setaddress(prev => {
    //   console.log("Previous Address State", prev); // Debug check
    //   return prev.filter(a => a._id !== addresid);
    // });
    showPopup("Address Deleted")
  }
  else{
    console.log("issue")
  }
 } 
 catch(e){
  console.log(e)
 
}
finally{
  setIsLoading(false)
}
}

else{
  console.log("userid",user._id)
  console.log("userid",addr)
  try {
    setIsLoading(true)
    const response = await fetch(`${apiUrl}/user/${user._id}/addressdoe`, {
      method: "PATCH",  // Using PATCH request to update the address
      credentials: 'include', // important: allow cookies to be set
     
      headers: { "Content-Type": "application/json",
        // Authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify({addresid,action,addr}),  // Convert newAddress to JSON
    });
    if(response.ok){
      console.log("address edit")
      showPopup("Address Edited")
    }
    else{
      console.log("not edit")
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while adding the address.");
  }
  finally{
    setIsLoading(false)
  }

}
}


let handlechooseaddress=(add)=>{
  console.log("hello add")
  if(add){
    console.log("addresschoosed",add)
    setaddress(add)
  }

}


let orderplaced=async(order,address,walletUsed,payableAmount,slot)=>{
  console.log("userdetailsss",userDetails)
 console.log("orederrr",order)
 console.log("addre",address)
 console.log("addre",walletUsed)
 console.log("addre",payableAmount)

 console.log("addre",walletUsed)


if(user && userDetails){
  try{
    setIsLoading(true)
    let orderpost=await fetch(`${apiUrl}/order`,{
      method:"POST",
     credentials: 'include', // important: allow cookies to be set
      headers: { "Content-Type": "application/json",
        // Authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify({order,address,userDetails,distance,walletUsed,payableAmount}), 

    })
    if(orderpost.ok){
      showPopup("Your Order Has Been Confirmed")

      console.log("checkurl",orderpost)
       let data = await orderpost.json();
        console.log("order ka data",data)
          // 🔑 PhonePe Checkout URL redirect
        if (data.checkoutUrl) {
          window.location.href = data.checkoutUrl; // ✅ direct redirect to PhonePe
        } else {
          showPopup("Your Order Has Been Confirmed");
        }
      
      // navigate("/orderconfirm")
    }
     // ✅ New Order ko State me Add Karo
    
  }
  catch(e){
    console.log(e)
  }
  finally{
    setIsLoading(false)
  }
}
}
if(productdataonlydetail){
  console.log("prddd",productdataonlydetail)
}



// const fetchUserOrders = async (userId) => {
//   console.log("maaro mujhe maaro")
//   try {
//     setIsLoading(true)
//       if (!userDetails._id) {
//           console.error("❌ User ID is missing!");
//           return;
//       }
//       let res = await fetch(`${apiUrl}/orders/user/${userDetails._id}`, {
//         credentials: 'include', // important: allow cookies to be set
//       }
//       //   ,{
//       //   headers: { 
//       //     Authorization: `Bearer ${user.accessToken}`,
//       //   },
//       // }
//     );
//       if (!res.ok) {
//           throw new Error("Failed to fetch user orders");
//       }
//       let data = await res.json();
//       console.log("order ke data yhamilte",data)
//       setuserorder(data);
//   } catch (err) {
//       console.log(err);
//   }
//   finally{
//     setIsLoading(false)
//   }
// };

const fetchUserOrders = async () => { 
  try {
    setIsLoading(true);

    if (!userDetails?._id) {
      console.error("❌ User ID is missing!");
      return;
    }

    let res = await fetch(`${apiUrl}/orders/user/${userDetails._id}`, {
      credentials: 'include', // important: allow cookies
    });

    if (res.status === 401 || res.status === 403) {
      // 🔴 Old session expired
      alert("Your session has expired. Please login again.");
      // Clear old localStorage / cookiesg
      localStorage.clear();
      document.cookie.split(";").forEach(c => {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      // Redirect to login page
      navigate("/login");
      return;
    }

    if (!res.ok) throw new Error("Failed to fetch user orders");

    let data = await res.json();
    console.log("Order Data:", data);
    setuserorder(data);

  } catch (err) {
    console.error(err);
  } finally {
    setIsLoading(false);
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

  



// let orderreturn=async(reason,subreason,selectedOption,orderdata,uploadedUrls,address)=>{
//   console.log("slec",selectedOption,uploadedUrls,address)

//   try{
//     setIsLoading(true)
//     let orderpost=await fetch(`${apiUrl}/return`,{
//       method:"POST",
     
//       headers: { "Content-Type": "application/json",
//         // Authorization: `Bearer ${user.accessToken}`,
//       },
//       body: JSON.stringify({reason,subreason,selectedOption,orderdata,uploadedUrls,address}), 

//     })
//     if(orderpost.ok){
//     //   const toast = new window.bootstrap.Toast(toastRef.current);
//     // toast.show();
//     //   settoastmsg("order return process successfull")
//     showPopup("Return Requested...")
//     }
//      // ✅ New Order ko State me Add Karo
    
//   }
//   catch(e){
//     console.log(e)
//   }
//   finally{
//     setIsLoading(false)
//   }

// }
let orderreturn = async (reason, subreason, selectedOption, orderdata, uploadedUrls, address) => {
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
    const data = await res.json();
    console.log("Distance:", data.distance);
    setdistance(data.distance)
  } catch (err) {
    console.error("Error:", err);
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
    {
    
    /* <ToastContainer 
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
    

    <BioContext.Provider
      value={{
       
        cart,
        bestsellingdata,
        wearsdata,
        wishlist,
        filters,
        setFilters,
        rentdata,
        wishlistdata,
        addToCart,
        removeFromCart,
        addtocartitem,
        handleClick,
        handleAddToCart,
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
