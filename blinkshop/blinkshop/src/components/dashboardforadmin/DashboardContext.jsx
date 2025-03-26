import React, { createContext, useContext, useState,useEffect } from "react";
import { useAuth } from "../AuthContext";
import { User } from "@auth0/auth0-react";

// ✅ 1️⃣ Create the context
const DashboardContext = createContext();

// ✅ 2️⃣ Create the provider component
export const DashboardProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
    const{user,userDetails}=useAuth()
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
            },
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
            },
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
                } // Convert object to JSON string
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
            },
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
    let res=await fetch(`${apiUrl}/orders`)
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
                },
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
                },
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
    
    
    
    
  return (
    <DashboardContext.Provider
      value={{adddatatoexistingcategory , addnewcategory ,users,editordeleteinexisitingcategory,deletefromexistingproduct,dis, setdis,showalert, userorder,markAsDelivered,updateUserRole,shopkeeperprd,recordMultipleSales,shopkeepersale,updateOrdersWithReturnDetails,returndata}}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// ✅ 3️⃣ Custom hook to use the context
export const useDashboard = () => {
  return useContext(DashboardContext);
};
