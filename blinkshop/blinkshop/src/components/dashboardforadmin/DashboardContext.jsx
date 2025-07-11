import React, { createContext, useContext, useState,useEffect } from "react";
import { useAuth } from "../AuthContext";
import { User } from "@auth0/auth0-react";
import { useFirebaseAuth } from "../FirebaseContext";
import axios from "axios";
import { useLoading } from "../LoadingContext";
import { faL } from "@fortawesome/free-solid-svg-icons";

// ✅ 1️⃣ Create the context
const DashboardContext = createContext();

// ✅ 2️⃣ Create the provider component
export const DashboardProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
    // const{user,userDetails}=useAuth()
    const{user,userDetails}=useFirebaseAuth()
    
    const [users, setUsers] = useState([]);
    
    const [userorder,setuserorder]=useState([])
    const[shopkeeperprd,setshopkeeperprd]=useState([])
    const[productonlydetails,setproductonlydetails]=useState([])
    const[shopkeepersale,setshopkepersale]=useState([])
    const[returndata,setreturndata]=useState([])
    const [dis, setdis] = useState({
        dismin:2,
        dismax:50,
    });
    const [alertMessage, setAlertMessage] = useState("");
    const[moodmsgs,setmoodmsg]=useState('')
    const[addtocartdata,setaddtocartdata]=useState([])
    const[addtocartdataonly,setaddtocartdataonly]=useState([])
    const[wishlistdata,setwishlistdata]=useState([])
    const[wishlist,setWishlist]=useState([])
    const[userorderr,setuserorderr]=useState([])
    const [productdata,setproductdata]=useState([])
    const [productdataonlydetail, setproductdataonlydetail]=useState([])
    const [refetch,setRefetch]=useState(false)
     const [slots, setSlots] = useState([]);
     const [slotVersion, setSlotVersion] = useState(0);
    // const [loading ,setIsLoading]=useState(false)
    const{setIsLoading}=useLoading()
    let showalert=()=>{
        alert("low stock alert")
    }
    let adddatatoexistingcategory = async (data, id) => {
        try {
            console.log("data m cate h kya ",data)
          let response = await fetch(`${apiUrl}/productmodel/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
                Authorization: `Bearer ${user.accessToken}`,
            },
            //  Authorization: `Bearer ${user.accessToken}`,
            
            body: JSON.stringify(data), // Convert object to JSON string
          });
      
          if (!response.ok) {
            throw new Error("Failed to update product");
          }
         
          let result = await response.json();
          
          console.log("ye h resultssss",result._id)  
          postNewArrival(result.data.productdetails[result.data.productdetails.length-1]._id);  // Call the function here
          console.log("Product updated successfully:", result);
          alert("Product updated successfully!");
        } catch (error) {
          console.error("Error updating product:", error);
          alert("Failed to update product. Please try again.");     
        }
      };


      let  editordeleteinexisitingcategory = async (data, id) => {
        try {
            if(data && Object.keys(data).length > 0){
          let response = await fetch(`${apiUrl}/editordeleteproduct/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
                Authorization: `Bearer ${user.accessToken}`,
            },
            //  Authorization: `Bearer ${user.accessToken}`,

            body: JSON.stringify(data), // Convert object to JSON string
          });
      
          if (!response.ok) {
            throw new Error("Failed to update product");
          }
      
          let result = await response.json();
          console.log("Product updated successfully:", result);
          alert("Product updated successfully!");
        }
        
        //       if(!response.ok){
        //         throw new Error("Failed to update product");
        //       }
        //      let result = await response.json();
        //   console.log("Product updated successfully:", result);
        //   alert("Product updated successfully!");
        
        } catch (error) {
          console.error("Error updating product:", error);
          alert("Failed to update product. Please try again.");
        }
      };

      useEffect(() => {
        const checkAlert = () => {
          const alertMessage = localStorage.getItem("lowStockAlert");
          if (alertMessage) {
            alert(alertMessage); // ✅ JavaScript Alert Show Karega
            localStorage.removeItem("lowStockAlert");
          }
        };
    
        window.addEventListener("lowStockAlertEvent", checkAlert);
        checkAlert();
    
        return () => {
          window.removeEventListener("lowStockAlertEvent", checkAlert);
        };
      }, []);
   
let deletefromexistingproduct=async(id)=>{
    try{
        if(id){
            let response = await fetch(`${apiUrl}/deleteproductfromcate/${id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                    Authorization: `Bearer ${user.accessToken}`,
                },
           
                 // Convert object to JSON string
              });
          
              if (!response.ok) {
                throw new Error("Failed to update product");
              }
          
              let result = await response.json();
              console.log("Product updated successfully:", result);
              alert("Product updated successfully!");
        }
    }
    catch (error) {
        console.error("Error updating product:", error);
        alert("Failed to update product. Please try again.");
      }
}



      let addnewcategory = async (data) => {
        try {
          let response = await fetch(`${apiUrl}/productmodel`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
                Authorization: `Bearer ${user.accessToken}`,
            },
            //  Authorization: `Bearer ${user.accessToken}`,

            body: JSON.stringify(data), // Convert object to JSON string
          });
      
          if (!response.ok) {
            throw new Error("Failed to add new collection");
          }
      
          let result = await response.json();
          console.log("collection add successfully:", result);
          alert("collection add successfully!");
        } catch (error) {
          console.error("Error updating product:", error);
          alert("Failed to add collection. Please try again.");
        }
      };


      
      const fetchUsers = async () => {
        try {
          let response = await fetch(`${apiUrl}/user`); // ✅ GET Request
          if (!response.ok) {
            throw new Error("Failed to fetch users");
          }
          let data = await response.json();
          setUsers(data); // ✅ Set users in state
        } catch (err) {
          setError(err.message); // ✅ Store error in state
        } 
      };
    
      // ✅ Call fetchUsers on Component Mount
      useEffect(() => {
        fetchUsers();
      }, []);
      
const fetchuserorder= async()=>{    
try{
    let res=await fetch(`${apiUrl}/orders`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
        // "Content-Type": "application/json", // optional, if needed
      },
    })
    if(!res.ok){
        throw new Error("Failed to fetch order");
    }
    let data=await res.json()
    setuserorder(data)
}
catch(err){
console.log(err)
}
}

useEffect(()=>{
    
    fetchuserorder()


    const eventSource = new EventSource(`${apiUrl}/events`);

    eventSource.onmessage = () => {
    fetchuserorder(); // 🟢 Jab bhi event aaye, orders fetch karo
    };

    return () => {
        eventSource.close();
    };
    
},[])


  

      const postNewArrival = async (productId) => {
        try {
          const response = await fetch(`${apiUrl}/newarrival`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Sending JSON data
            },
            body: JSON.stringify({ ProductId: productId }), // Convert object to JSON string
          });
      
          const result = await response.json();
          if (response.ok) {
            console.log("New arrival created successfully:", result);
            alert("New arrival added successfully!");
          } else {
            console.error("Error creating new arrival:", result.message);
            alert(result.message);
          }
        } catch (error) {
          console.error("Error during fetch:", error);
          alert("An error occurred. Please try again.");
        }


      };

      
      const markAsDelivered = async (orderId) => {
        if(userDetails)
        {
        try {
            const response = await fetch(`${apiUrl}/order/deliver/${orderId}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json", // Sending JSON data
                    Authorization: `Bearer ${user.accessToken}`,
                },
            //  Authorization: `Bearer ${user.accessToken}`,
                
                body: JSON.stringify({userDetails}), // Convert object to JSON string
                
            });
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error("Error:", error);
        }
      }
    };
 

    // const updateUserRole = async (userId, newRole) => {
    //     try {
    //       const response = await fetch(`${apiUrl}/user/update-role/${userId}`, {
    //         method: "PUT",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             role: newRole,  // Make sure `newRole` is a string
    //             ...(newRole === "shopkeeper" && { shopname, shopaddress }) // Add shop details only if needed
    //           }),
    //       });
      
    //       const data = await response.json();
      
    //       if (!response.ok) {
    //         throw new Error(data.message || "Failed to update role");
    //       }
      
    //       alert(`User role updated to ${newRole} successfully!`);
    //       console.log("Updated User:", data.updatedUser);
    //     } catch (error) {
    //       console.error("Error updating role:", error.message);
    //       alert("Failed to update role!");
    //     }
    //   };
    const updateUserRole = async (userId, role,shopname,shopaddress) => {
        try {
            const requestBody = role === "shopkeeper"
                ? { role: role, shopname, shopaddress }
                : { role: role }; // Only send role if not a shopkeeper
    
                console.log("Sending Data:", requestBody); // ✅ Debugging log

            const response = await fetch(`${apiUrl}/user/update-role/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                      Authorization: `Bearer ${user.accessToken}`,
                },

            //  Authorization: `Bearer ${user.accessToken}`,
                
                body: JSON.stringify({role,shopname,shopaddress}),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || "Failed to update role");
            }
    
            alert(`User role updated to ${role} successfully!`);
            console.log("Updated User:");
        } catch (error) {
            console.error("Error updating role:", error.message);
            alert("Failed to update role!");
        }
    };
    
    useEffect(() => {
        const fetchShopkeeperData = async () => {
            if (!userDetails?.shopname) return; 
            
            try {
                const shopname = userDetails.shopname.trim();  // 🔥 Trimmed before sending
                console.log("🟡 Fetching for shopname:", `"${shopname}"`);  
    
                const response = await fetch(`${apiUrl}/products/shop/${encodeURIComponent(shopname)}`);
                
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
                const data = await response.json();
                console.log("✅ Shopkeeper products fetched:", data);
                setshopkeeperprd(data);
            } catch (error) {
                console.error("❌ Error fetching shopkeeper products:", error);
            }
        };
    
        fetchShopkeeperData();
    }, [userDetails?.shopname]); 
    

    
    if(shopkeeperprd){
        console.log("prdshopkeeperka mila ",shopkeeperprd)
    }
    const recordMultipleSales = async (sales) => {
        console.log("sales",sales)
        try {
            const response = await fetch(`${apiUrl}/sales`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                
                body: JSON.stringify({ sales }), // Send an array
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("✅ Multiple sales recorded successfully:", data);
            return data;
        } catch (error) {
            console.error("❌ Error recording multiple sales:", error);
        }
    };
    
useEffect(()=>{
    const getShopDailySales = async () => {

        if(user || userDetails)
        try {
            let response = await fetch(`${apiUrl}/sales/daily/${userDetails.shopname}`);
            let data = await response.json();
            console.log("✅ Shopkeeper Sales Data:", data);
            setshopkepersale(data)
        } catch (error) {
            console.error("❌ Error fetching sales:", error);
        }
    }
    getShopDailySales()
},[user,userDetails])
    
    const updateOrdersWithReturnDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/return`);
        // Check if the response is okay even if no records are found
        const data = await response.json();
        console.log('Updated Orders:', data);
        setreturndata(data.updatedOrders || []); // use updatedOrders from response
      } catch (error) {
        console.error('Error updating orders:', error);
      }
    };
    
    // Call the function when the component mounts
    useEffect(() => {
      updateOrdersWithReturnDetails();
    }, []);
    
   
    // useEffect(() => {
    //   const getMoodMessages = async () => {
    //     if (!user) return;
    
    //     try {
    //       const res = await fetch(`${apiUrl}/moodmessage`);
    
    //       if (!res.ok) {
    //         throw new Error(`HTTP error! Status: ${res.status}`);
    //       }
    
    //       const data = await res.json();
    //       setmoodmsg(data); // Assuming backend returns mood messages directly
    //     } catch (error) {
    //       console.error("❌ Failed to fetch mood messages:", error);
    //     }
    //   };
    
    //   getMoodMessages();
    // }, [user]);
    // 🔁 Reusable Fetch Function
  const getMoodMessages = async () => {
    if (!user) return;
    try {
      
      const res = await fetch(`${apiUrl}/moodmessage`);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();
      setmoodmsg(data);
    } catch (error) {
      console.error("❌ Failed to fetch mood messages:", error);
    }
  };

  useEffect(() => {
    getMoodMessages();
  }, [user]);
    let moodmsg=async(data)=>{
      try{
      let response=await fetch(`${apiUrl}/moodmsg`,{
        method:'POST',
        headers: {
          "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
      },
            //  Authorization: `Bearer ${user.accessToken}`,

      body: JSON.stringify({moodemoji:data.moodemoji,moodcolor:data.moodcolor,moodtype:data.moodtype,msgwithoffer:data.msgwithoffer,msgwithoutoffer:data.msgwithoutoffer }), // Send an array
      })
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const dataa = await response.json();
    await getMoodMessages()
    console.log("✅ Multiple sales recorded successfully:", dataa);
    }
    catch(e){
      console.log("error",e)
    }
    }
    
    
    // DELETE mood message
const deleteMoodMsg = async (id) => {
  try {
    let res = await fetch(`${apiUrl}/moodmsg/${id}`, {
      method: 'DELETE',
      headers:{
             Authorization: `Bearer ${user.accessToken}`,
      }

    });
    if (!res.ok) throw new Error("Delete failed");
  await  getMoodMessages() // refresh
  } catch (err) {
    console.error("Delete error:", err);
  }
};

// UPDATE mood message
const updateMoodMsg = async (id, updatedData) => {
  try {
    let res = await fetch(`${apiUrl}/moodmsg/${id}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
       },
            //  Authorization: `Bearer ${user.accessToken}`,

      body: JSON.stringify(updatedData)
    });
    if (!res.ok) throw new Error("Update failed");
    await getMoodMessages(); // refresh
  } catch (err) {
    console.error("Update error:", err);
  }
};
    
    

const fetchCartItems = async (id) => {
  try {
    // setIsLoading(true)
    let response = await fetch(`${apiUrl}/addtocart/${userDetails._id}`
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
    setaddtocartdata(data)
    let cartItemIds = data.map(item => item.id); // Collect the ids of the items in the cart
    setaddtocartdataonly(cartItemIds);  // Set the ids in the state to keep the icons red
  } catch (error) {
    console.error("Error fetching cart items:", error);
  }
  // finally{
  //   setIsLoading(false)
  // }
};


const fetchCartItemss = async (id) => {
  try {
    // setIsLoading(true)
    let response = await fetch(`${apiUrl}/cart/${userDetails._id}`, 
    //   {
    //   headers: {
    //     Authorization: `Bearer ${user.accessToken}`,
    //   },
    // }
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
  // finally{
  //   setIsLoading(false)
  // }
};


const fetchUserOrders = async (userId) => {
  try {
    // setIsLoading(true)
      if (!userDetails._id) {
          console.error("❌ User ID is missing!");
          return;
      }
      let res = await fetch(`${apiUrl}/orders/user/${userDetails._id}`
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
      setuserorderr(data);
  } catch (err) {
      console.log(err);
  }
  // finally{
  //   setIsLoading(false)
  // }
};
const createCoupon = async (cpn) => {
  console.log("here com data come",cpn)
  const couponData = {
    name: "WELCOME10",              // Coupon code
    type: "all",                    // "all", "category", or "special"
    category: "",                   // Leave empty if type !== "category"
    discountPercentage: 10,
    minAmount: 1000,
    maxDiscount: 200,
    messageSend: false,
    expiresAt: "2025-12-31",
  };

  try {
    const response = await fetch(`${apiUrl}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
      },
            //  Authorization: `Bearer ${user.accessToken}`,

      body: JSON.stringify(cpn),
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.message); // "Coupon created successfully"
    } else {
      alert(result.error); // Error message
    }
  } catch (error) {
    console.log("cpn err",error)
    alert("Something went wrong while creating the coupon.");
    console.error(error);
  }
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

const createBundle = async (ids,val) => {

  console.log("bundleprice",val)
  if (ids.length !== 2) {
    alert("Please select exactly 2 items to bundle.");
    return;
  }

  try {
    setIsLoading(true)
    const response = await fetch(`${apiUrl}/bundle`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
      },
            //  Authorization: `Bearer ${user.accessToken}`,

      body: JSON.stringify({ ids,val}) // e.g. [colorId1, colorId2]
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Bundle created successfully", data);
      alert("Bundle created successfully");
    } else {
      alert("Error creating bundle");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Server error");
  }
  finally{
    setIsLoading(false)
  }
};


  const fetchSlots = async () => {
  console.log("call ho rha hu maiii babyyy");
  try {
    setIsLoading(true);
    
    const res = await fetch(`${apiUrl}/slots`);
    if (!res.ok) throw new Error("Failed to fetch slots");
    
    const data = await res.json();
    setSlots(data);

  } catch (err) {
    console.error("❌ Error fetching slots:", err);
  } finally {
    setIsLoading(false);
  }
};

const toggleSlot = async (label) => {
  try {
    setIsLoading(true);

    const res = await fetch(`${apiUrl}/slot-status/toggle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
      },
            //  Authorization: `Bearer ${user.accessToken}`,

      body: JSON.stringify({ label })
    });

    if (!res.ok) throw new Error("Failed to toggle slot");

     
    await fetchSlots(); // Refresh list
setSlotVersion((prev) => prev + 1);
   
  } catch (err) {
    console.error("❌ Error toggling slot:", err);
  } finally {
    setIsLoading(false);
  }
};


  return (
    <DashboardContext.Provider
      value={{adddatatoexistingcategory , addnewcategory ,users,editordeleteinexisitingcategory,deletefromexistingproduct,dis, 
        setdis,showalert, userorder,markAsDelivered,updateUserRole,shopkeeperprd,recordMultipleSales,
        shopkeepersale,updateOrdersWithReturnDetails,
        returndata,moodmsg,moodmsgs,deleteMoodMsg,updateMoodMsg,
        addtocartdata,addtocartdataonly,fetchCartItems,wishlistdata,wishlist,fetchCartItemss,userorderr,fetchUserOrders,createCoupon,productdata,productdataonlydetail,createBundle,slots,fetchSlots,toggleSlot}}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// ✅ 3️⃣ Custom hook to use the context
export const useDashboard = () => {
  return useContext(DashboardContext);
};
