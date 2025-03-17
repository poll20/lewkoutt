  // import React, { useEffect, useState } from "react";
  // import { useNavigate, useParams } from "react-router-dom";
  // import { useBio } from "./BioContext";
  // import { FaChevronDown } from "react-icons/fa"
  // import img from "./image/img3.jpg"

  // /** Sample data: Main reasons + their sub-reasons */
  // const REASONS = [ 
  //   {
  //     label: "Did not like the product",
  //     subReasons: [
  //       "Does not look good on me",
  //       "Not happy with product quality (material)",
  //       "Did not like the color",
  //       "Did not like the product (please give details)",
  //     ],
  //   },
  //   {
  //     label: "Defective/Damage Product received",
  //     subReasons: [
  //       "Color faded/washed out",
  //       "Received damaged/open package",
  //       "Received Defective Merchandise",
  //       "Product is torn/ worn out (please give details)",
  //     ],
  //   },
  //   {
  //     label: "Size/Colour Issue",
  //     subReasons: [
  //       "Size too small",
  //       "Size too large",
  //       "Color not as expected",
  //     ],
  //   },
  //   {
  //     label: "Wrong Item Shipped",
  //     subReasons: [
  //       "Received completely different product",
  //       "Incorrect variant shipped",
  //     ],
  //   },
  //   {
  //     label: "Others",
  //     subReasons: [
  //       "Order delayed, no longer needed",
  //       "Found better alternative",
  //       "Other reasons",
  //     ],
  //   },

  //   {
  //     label: "cashback",
  //     subReasons: [
  //       "lewkout wallet",
  //       "cashback",
        
  //     ],
  //   },
  // ];

  // const ReturnRequest = () => {

  //   const navigate=useNavigate()
  //   /** States to manage selected reason and sub-reason */
  //   const [reason, setReason] = useState("");
  //   const [subReason, setSubReason] = useState("");
  // const[returnprd,setreturnprd]=useState([])
 


  // let { id } = useParams();
  //       let {userorder,orderreturn}=useBio()
  //       useEffect(()=>{
  //         if(userorder){
  //           console.log("eee",id)
  //           console.log("efrffer",userorder)
  //           let matchedOrders = userorder.filter(order => 
  //             order?.products?.some(product => product._id === id)
  //         );
              
  //             console.log("mil gya",matchedOrders);
  //             setreturnprd(matchedOrders)
  //         } 
  //       },[userorder,id])
      
  //   /** Sample product data (replicating screenshot) */
  //   const product = {
  //     title: "RIO BASIC",
  //     subtitle: "Women Terry Straight Fit Pants with Drawstring - Size XS",
  //     price: 607.5,
  //     convenienceFee: 9.5,
  //     totalRefund: 598.0,
  //     imageUrl: "https://via.placeholder.com/100x150.png?text=Product+Image", // placeholder
  //   };

  //   const handleSave = () => {
  //     if (!reason || !subReason) {
  //       alert("Please select reason and sub-reason!");
  //       return;
  //     }
  //     if(!selectedOption){
  //       alert("Please Select Cashback Option")
  //       return
  //     }
     
      
  //     // Perform your return request logic here
  //     orderreturn(reason,subReason,returnprd)

  //     setTimeout(()=>{navigate("/")},200)
  //   };
  

  //   /** Filter subReasons of the currently selected reason */
  //   const currentReasonObj = REASONS.find((r) => r.label === reason);
  //   const subReasonOptions = currentReasonObj ? currentReasonObj.subReasons : [];
  //   if (!returnprd.length) {
  //     return <p>Loading...</p>;
  //   }
  //   return (
  //     <div className="mera-return-container max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
  //       {/* Header */}
  //       <h2 className="mera-return-header text-xl font-bold mb-4">Return Request</h2>

  //       {/* Product Info Section */}
  //       <div className="mera-return-product-info flex items-center gap-3 mb-4">
  //         <img
  //           style={{width:"30vw"}}
  //           src={img}
  //           alt="Product"
  //           className="mera-return-product-img w-20 h-28 object-cover border"
  //         />
  //         <div className="mera-return-product-details flex-1">
  //           <h3 className="mera-return-product-title font-semibold">{returnprd[0].products[0]?.tag}</h3>
  //           <p className="mera-return-product-subtitle text-sm text-gray-600">
  //             {returnprd[0].products[0].discription}
  //           </p>
  //           <p className="mera-return-product-price text-sm mt-1">
  //             ₹{returnprd[0].products[0].totalAmount} <span className="text-gray-500">(Includes Convenience Fee)</span>
  //           </p>
  //         </div>
  //       </div>

  //       {/* Refund Info */}
  //       <div className="mera-return-refund-info mb-4">
  //         <div className="flex justify-between text-sm">
  //           <span>Total Refund</span>
  //           <span className="font-semibold">₹{returnprd[0].products[0].totalAmount}</span>
  //         </div>
  //         <p className="text-xs text-gray-500">
  //           Convenience Fee ₹{product.convenienceFee.toFixed(2)} is not refundable
  //         </p>
  //         <div  style={{width:"100%"}}>
  //           {/* <button type="button" className="underline">Refund Breakup</button> */}
  //           <button style={{background:"black",color:"white"}} type="button" className="underline">Read policy</button>
  //         </div>
  //       </div>

  //       {/* Enter Return Details */}
  //       <div className="mera-return-details mb-4">
  //         <h4 className="text-sm font-semibold mb-2">Enter Return Details</h4>

  //         {/* Reason Dropdown */}
  //         <div className="mera-return-reason-dropdown mb-3">
  //           <label className="block text-sm text-gray-600 mb-1">Reason</label>
  //           <div className="relative">
  //             <select
  //             required
  //               className="mera-return-select w-full border rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
  //               value={reason}
  //               onChange={(e) => {
  //                 setReason(e.target.value);
  //                 setSubReason(""); // reset subReason on reason change
  //               }}
  //             >
  //               <option value="">Select Reason</option>
  //               {REASONS.map((r) => (
  //                 <option key={r.label} value={r.label}>
  //                   {r.label}
  //                 </option>
  //               ))}
  //             </select>
  //           </div>
  //         </div>

  //         {/* Sub-Reason Dropdown */}
  //         {reason && (
  //           <div className="mera-return-subreason-dropdown mb-3" >
  //             <label className="block text-sm text-gray-600 mb-1">Sub Reason</label>
  //             <div className="relative" >
  //               <select
  //               required
  //                 style={{ width:"92%"}}
  //                 className="mera-return-select w-full border rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
  //                 value={subReason}
  //                 onChange={(e) => setSubReason(e.target.value)}
  //               >
  //                 <option  value="">Select Sub Reason</option>
  //                 {subReasonOptions.map((sub, idx) => (
  //                   <option  key={idx} value={sub}>
  //                     {sub}
  //                   </option>
  //                 ))}
  //               </select>


               
  //             </div>
  //           </div>
            
  //         )}
  //       </div>
       
  //       {/* Save Button */}
  //       <button
  //       style={{background:"black",color:'white'}}
  //         onClick={handleSave}
  //         className="mera-return-save-btn w-full bg-blue-600 text-white rounded py-2 mt-4 text-sm font-semibold"
  //       >
  //         Procced
  //       </button>
  //     </div>
  //   );
  // };

  // export default ReturnRequest;

  import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBio } from "./BioContext";

import { FaChevronDown } from "react-icons/fa";
import img from "./image/img3.jpg";
import { useDashboard } from "./dashboardforadmin/DashboardContext";

const REASONS = [ 
  {
    label: "Did not like the product",
    subReasons: [
      "Does not look good on me",
      "Not happy with product quality (material)",
      "Did not like the color",
      "Did not like the product (please give details)",
    ],
  },
  {
    label: "Defective/Damage Product received",
    subReasons: [
      "Color faded/washed out",
      "Received damaged/open package",
      "Received Defective Merchandise",
      "Product is torn/ worn out (please give details)",
    ],
  },
  {
    label: "Size/Colour Issue",
    subReasons: [
      "Size too small",
      "Size too large",
      "Color not as expected",
    ],
  },
  {
    label: "Wrong Item Shipped",
    subReasons: [
      "Received completely different product",
      "Incorrect variant shipped",
    ],
  },
  {
    label: "Others",
    subReasons: [
      "Order delayed, no longer needed",
      "Found better alternative",
      "Other reasons",
    ],
  },
  {
    label: "Cashback",
    subReasons: [
      "Lewkout Wallet",
      "Cashback",
    ],
  },
];

const ReturnRequest = () => {
  const navigate = useNavigate();
  const [reason, setReason] = useState("");
  const [subReason, setSubReason] = useState("");
  const [cashbackMethod, setCashbackMethod] = useState("");
  const [returnprd, setReturnPrd] = useState([]);

  let { id } = useParams();
  let { userorder, orderreturn} = useBio();
  let {updateOrdersWithReturnDetails}=useDashboard()  

  useEffect(() => {
    if (userorder) {
      let matchedOrders = userorder.filter(order => 
        order?.products?.some(product => product._id === id)
      );
      setReturnPrd(matchedOrders);
    }
  }, [userorder, id]);

  const handleSave = async() => {
    if (!reason || !subReason) {
      alert("Please select reason and sub-reason!");
      return;
    }
    if (!cashbackMethod) {
      alert("Please select a cashback method!");
      return;
    }
    
    await orderreturn(reason, subReason,cashbackMethod, returnprd);
    
    await  updateOrdersWithReturnDetails(),
      
    navigate("/")
  
    
  };

  const currentReasonObj = REASONS.find((r) => r.label === reason);
  const subReasonOptions = currentReasonObj ? currentReasonObj.subReasons : [];

  if (!returnprd.length) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Return Request</h2>
      <div className="flex items-center gap-3 mb-4">
        <img src={img} alt="Product" style={{width:"30vw"}} className="w-20 h-28 object-cover border" />
        <div className="flex-1">
          <h3 className="font-semibold">{returnprd[0].products[0]?.tag}</h3>
          <p className="text-sm text-gray-600">{returnprd[0].products[0].discription}</p>
          <p className="text-sm mt-1">₹{returnprd[0].products[0].totalAmount} <span className="text-gray-500">(Includes Convenience Fee)</span></p>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex justify-between text-sm">
          <span>Total Refund</span>
          <span className="font-semibold">₹{returnprd[0].products[0].totalAmount}</span>
        </div>
        <button style={{ background: "black", color: "white" }} type="button" className="underline">Read policy</button>
      </div>
      <div className="mb-4">
        <h4 className="text-sm font-semibold mb-2">Enter Return Details</h4>
        <label className="block text-sm text-gray-600 mb-1">Reason</label>
        <select value={reason} onChange={(e) => { setReason(e.target.value); setSubReason(""); }} className="w-full border rounded p-2 text-sm focus:ring-1 focus:ring-blue-500">
          <option value="">Select Reason</option>
          {REASONS.map((r) => <option key={r.label} value={r.label}>{r.label}</option>)}
        </select>
        {reason && (
          <div className="mt-3">
            <label className="block text-sm text-gray-600 mb-1">Sub Reason</label>
            <select value={subReason} onChange={(e) => setSubReason(e.target.value)} className="w-full border rounded p-2 text-sm focus:ring-1 focus:ring-blue-500">
              <option value="">Select Sub Reason</option>
              {subReasonOptions.map((sub, idx) => <option key={idx} value={sub}>{sub}</option>)}
            </select>
          </div>
        )}
        <div className="mt-3">
          <label className="block text-sm text-gray-600 mb-1">Select Cashback Method</label>
          <select value={cashbackMethod} onChange={(e) => setCashbackMethod(e.target.value)} className="w-full border rounded p-2 text-sm focus:ring-1 focus:ring-blue-500">
            <option value="">Select Cashback Method</option>
            <option value="Wallet">Wallet</option>
            <option value="Account">Account</option>
          </select>
        </div>
      </div>
      <button onClick={handleSave} style={{ background: "black", color: "white" }} className="w-full text-white rounded py-2 mt-4 text-sm font-semibold">Proceed</button>
    </div>
  );
};

export default ReturnRequest;