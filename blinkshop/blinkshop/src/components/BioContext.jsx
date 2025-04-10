
import React, { createContext, useContext, useState, useEffect ,useRef} from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Import AuthContext for Authentication
import img1 from "./image/img1.jpg"
// import { ToastContainer, toast } from 'react-toastify';
// import Toast from './Toast';

export const BioContext = createContext();


export const BioProvider = ({children,addtocartitem,showPopup }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  console.log("urll",apiUrl)
  const { user,userDetails } = useAuth();
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

  const cards = [
    {
      id:1,
      title: 'Card 1',
      description: 'This is the description for card 1.',
      image: img1,
    },
    {
      id:2,
      title: 'Card 2',
      description: 'This is the description for card 2.',
      image: img1,
    },
    {
      id:3,
      title: 'Card 3',
      description: 'This is the description for card 3.',
      image: img1,
    },
    {
      id:4,
      title: 'Card 4',
      description: 'This is the description for card 4.',
      image: img1,
    },
    {
      id:5,
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
  
  let allproductdata=productdata.map((e)=>(e.productdetails)).flat()
  // allproductdata.map((e)=>{
  //   console.log("hurraaa",e._id)
  // })
  // Fetch Cart and Wishlist from API on login
  
      
   
// Empty dependency array to run this effect only on the first render
useEffect(() => {
  if(user && userDetails._id){
  
    const fetchCartItems = async () => {
      try {
        let response = await fetch(`${apiUrl}/cart/${userDetails._id}`);
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
    };
    fetchCartItems()
  
}
  
  
  }, [user, userDetails]);

  useEffect(() => {
    if(user&& userDetails._id){
      const fetchCartItems = async () => {
        try {
          let response = await fetch(`${apiUrl}/addtocart/${userDetails._id}`);
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
      };
      fetchCartItems()
    }
    
    
    }, [user,userDetails]);

  
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
    console.log("iredandid",prd,id)
    try {
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
      matchItem.image = prd.image;
      matchItem.shopname = prd.shopname;
      matchItem.title = prd.title;
      matchItem.description = prd.description;
      matchItem.size = prd.sizes;
  
      console.log("Final matchItem:", matchItem); // Debugging
  
      const itemInCart = wishlistdata.find(cartItem => cartItem.itemid === id);
      console.log("delete", itemInCart);
  
      if (!itemInCart) {
        const response = await fetch(`${apiUrl}/cart`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(matchItem),
        });
  
        if (response.ok) {
          const addedItem = await response.json();
          setWishlist(prev => [...prev, id]);
          setwishlistdata(prev => [...prev, addedItem]);
    //       const toast = new window.bootstrap.Toast(toastRef.current);
    // toast.show();
    //       settoastmsg("item added successfully")
    showPopup("item added")
        }
      } else {
        const response = await fetch(`${apiUrl}/cart/${itemInCart.itemid}`, {
          method: "DELETE",
        });
  
        if (response.ok) {
          setWishlist(prev => prev.filter(itemId => itemId !== id));
          setwishlistdata(prev => prev.filter(item => item.itemid !== id));
          // toast.success("Data removed successfully");
    //       const toast = new window.bootstrap.Toast(toastRef.current);
    // toast.show();
    //       settoastmsg("item removed successfully")
    showPopup("item removed")
        }
      }
    } catch (error) {
      console.error("Error in handleClick:", error);
    }
  };

  const removewishlistonly=async(id)=>{
    console.log("id",id)
    try{
      const response = await fetch(`${apiUrl}/cart/${id}`, {
        method: "DELETE",
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
    showPopup("item removed")
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
          headers: { "Content-Type": "application/json" },
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
    showPopup("item moved")
         removefromaddtocart(id)
        }
    }
catch(e){
  console.log(e)
}
}


  const handleAddToCart = async (prd,quantity,selectedSize) => {
    try {
      console.log("iqs",prd,quantity,selectedSize)
      // const matchItem = productdataonlydetail.find((e) => e._id == id);
      // const matchItem = productdataonlydetail
      // .flatMap(product => product.colors)  // Sare products ke colors ko ek array bana diya
      // .filter(color => color._id == id);
      // console.log("dekhte h chlo yha kya milta hia",matchItem)
      prd.userid=userDetails._id
      prd.productId=prd._id
      prd.size=selectedSize
      prd.qty=quantity
      // Object.assign(matchItem, { size: selectedSize });
      // Object.assign(matchItem, { qty: quantity });
      console.log("dekhte h chlo yha kya milta hia",prd)
      // const itemInCart = addtocartdatas.find((cartItem) => cartItem._id === id);
      // const itemInCart = addtocartdatas.find((cartItem) => cartItem.productid === id);

      
        const response = await fetch(`${apiUrl}/addtocart`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(prd),
        });

        if (response.ok) {
          const addedItem = await response.json();
          setaddtocartdata((prev) => [...prev, addedItem]);
          setaddtocartdataonly((prev) => [...prev, prd._id]);
        //  toast.success("data added successfully")
    //     const toast = new window.bootstrap.Toast(toastRef.current);
    // toast.show();
    //     settoastmsg("item added successfully")
    showPopup("item added")
          
        }
        else{
    //       const toast = new window.bootstrap.Toast(toastRef.current);
    // toast.show();
    //       settoastmsg("oopss....")
    showPopup("oopsss")
        }


    // else {
    //     const response = await fetch(`${apiUrl}/addtocart/${itemInCart._id}`, {
    //       method: 'DELETE',
    //     });

    //     if (response.ok) {
    //       setaddtocartdata((prev) => prev.filter((itemId) => itemId !== id));
    //       setaddtocartdataonly((prev) => prev.filter((item) => item._id !== id));
    //       toast.success("data removed successfully")
    //     }
    //   }
    } catch (error) {
      console.error('Error in handleClick:', error);
    }
  };
  const removefromaddtocart=async(id)=>{
    console.log("crt ki id",id)
    try{
      const matchItem = allproductdata.find((e) => e._id === id);
      console.log("match ho gyaa crtid",matchItem)
      const itemInCart = addtocartdatas.find((cartItem) => cartItem.productid === id);
   console.log("deletecrtid",itemInCart)

   if(itemInCart)
   {
    const response = await fetch(`${apiUrl}/addtocart/${itemInCart._id}`, {
      method: 'DELETE',
       });
 
       if (response.ok) {
              //  setaddtocartdata((prev) => prev.filter((itemId) => itemId.productid !== id));
              setaddtocartdata((prev) => prev.filter((item) => item._id !== itemInCart._id));

               // setaddtocartdataonly((prev) => prev.filter((item) => item._id !== id));
               //toast.success("data removed successfully")
    //            const toast = new window.bootstrap.Toast(toastRef.current);
    // toast.show();
    //            settoastmsg("item removed successfully")
    showPopup("Item Removed")
             }
             else{
    //           const toast = new window.bootstrap.Toast(toastRef.current);
    // toast.show();
    //            settoastmsg("data not removed")
    showPopup("item not removed")
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
    
  }

  useEffect(()=>{
 
 let bestselling=async()=>{
  try{
let bestselingdata=await fetch(`${apiUrl}/bestselling`)

let resdata=await bestselingdata.json()
console.log("papapama",resdata)
setbestsellingdata(resdata)
}
catch(e){
  console.log(e)
}

 }
 bestselling()

  },[])

  useEffect(()=>{
 
    let wears=async()=>{
     try{
   let wearsdata=await fetch(`${apiUrl}/wear?operation=all`)
   console.log(wearsdata)
   let resdata=await wearsdata.json()
   console.log("ajana",resdata)
  setwearsdata(resdata)
   }
   catch(e){
     console.log(e)
   }
   
    }
    wears()
   
     },[])

     //rent data
     const rentData = async () => {
      try {
        let rentRes = await fetch(`${apiUrl}/rent?operation=all`);
        let finalRes = await rentRes.json();
        console.log("rentdress ka data",finalRes)
        setrentdata(finalRes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

    };
  
    useEffect(() => {
      rentData();
    }, []);
   

    useEffect(()=>{
      let newarrival=async()=>{
  let getdata=await fetch(`${apiUrl}/newarrival`)
  let resdata=await getdata.json()
   setnewarrival(resdata)
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
      let data =wishlistdata.find((e) => e.id === id);
      console.log("xdx",data)
      let res = await fetch(`${apiUrl}/cart/${data._id}`, {
        method: "DELETE",
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
  };


// Add to Cart
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
    const response = await fetch(`${apiUrl}/user/${user._id}/address`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
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
};


let deleteandeditaddrress=async(addresid,action,user,addr)=>{

  if(action=="delete"){
 try{
  const response = await fetch(`${apiUrl}/user/${user._id}/addressdoe`, {
    method: "PATCH",  // Using PATCH request to update the address
    headers: {
      "Content-Type": "application/json",  // Specify that we're sending JSON
    },
    body: JSON.stringify({addresid,action}),  // Convert newAddress to JSON
  });
  if(response.ok){
    console.log("good")
    // setaddress(prev => {
    //   console.log("Previous Address State", prev); // Debug check
    //   return prev.filter(a => a._id !== addresid);
    // });
  }
  else{
    console.log("issue")
  }
 } 
 catch(e){
  console.log(e)
 
}
}
else{
  console.log("useridf",user._id)
  try {
    const response = await fetch(`${apiUrl}/user/${user._id}/addressdoe`, {
      method: "PATCH",  // Using PATCH request to update the address
      headers: {
        "Content-Type": "application/json",  // Specify that we're sending JSON
      },
      body: JSON.stringify({addresid,action,addr}),  // Convert newAddress to JSON
    });
    if(response.ok){
      console.log("address edit")
    }
    else{
      console.log("not edit")
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while adding the address.");
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


let orderplaced=async(order,address)=>{
  console.log("userdetailsss",userDetails)
 console.log("orederrr",order)
 console.log("addre",address)
if(user && userDetails){
  try{
    let orderpost=await fetch(`${apiUrl}/order`,{
      method:"POST",
      headers: {
        "Content-Type": "application/json",  // Specify that we're sending JSON
      },
      body: JSON.stringify({order,address,userDetails}), 

    })
    if(orderpost.ok){
      console.log("address edit")
    }
     // ✅ New Order ko State me Add Karo
    
  }
  catch(e){
    console.log(e)
  }
}
}
if(productdataonlydetail){
  console.log("prddd",productdataonlydetail)
}



const fetchUserOrders = async (userId) => {
  try {
      if (!userDetails._id) {
          console.error("❌ User ID is missing!");
          return;
      }
      let res = await fetch(`${apiUrl}/orders/user/${userDetails._id}`);
      if (!res.ok) {
          throw new Error("Failed to fetch user orders");
      }
      let data = await res.json();
      setuserorder(data);
  } catch (err) {
      console.log(err);
  }
};

// useEffect me userId pass karo
useEffect(() => { 
  if (userDetails?._id) {
      fetchUserOrders(userDetails._id);
  }
}, [userDetails?._id]);


const submitRating = async (productId, userId, rating, review) => {
  console.log("rating",rating)
  try {
      const response = await fetch(`${apiUrl}/rate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, productId, rating, review })
      });

      const data = await response.json();
      console.log("Rating Submitted:", data);
  } catch (error) {
      console.error("Error submitting rating:", error);
  }
};
const fetchRatings = async (productId) => {
  try {
    if(!userDetails._id && user)
    {
      console.error("❌ User ID is missing!");
      return;
    }
    let res = await fetch(`${apiUrl}/ratings/${userDetails._id}/${productId}`);
    if (!res.ok) {
        throw new Error("Failed to fetch iusers rating");
    }
    let data = await res.json();
    console.log("rating of my prodduct",data)
    setrating(data);

     
  } catch (error) {
      console.error("Error fetching ratings:", error);
  }
};

useEffect(() => { 
  if (userDetails?._id) {
      fetchRatings(userDetails._id);
  }
}, [userDetails?._id, user]);



let orderreturn=async(reason,subreason,selectedOption,orderdata)=>{
  console.log("slec",selectedOption)

  try{
    let orderpost=await fetch(`${apiUrl}/return`,{
      method:"POST",
      headers: {
        "Content-Type": "application/json",  // Specify that we're sending JSON
      },
      body: JSON.stringify({reason,subreason,selectedOption,orderdata}), 

    })
    if(orderpost.ok){
    //   const toast = new window.bootstrap.Toast(toastRef.current);
    // toast.show();
    //   settoastmsg("order return process successfull")
    showPopup("order returning...")
    }
     // ✅ New Order ko State me Add Karo
    
  }
  catch(e){
    console.log(e)
  }

}

console.log("toastmsg",toastmsg)


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
        productfetch,
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
        
    
  }}
    >
      {children}
    </BioContext.Provider>
    </>
  );
};

export const useBio = () => useContext(BioContext);
