

//   import React, { useEffect, useState } from "react";
// import { NavLink, useNavigate, useParams } from "react-router-dom";
// import { useBio } from "./BioContext";

// import { FaChevronDown } from "react-icons/fa";
// import img from "./image/img3.jpg";
// import { useDashboard } from "./dashboardforadmin/DashboardContext";

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
  // {
  //   label: "Cashback",
  //   subReasons: [
  //     "Lewkout Wallet",
  //     "Cashback",
  //   ],
  // },
// ];

// const ReturnRequest = () => {
//   const navigate = useNavigate();
//   const [reason, setReason] = useState("");
//   const [subReason, setSubReason] = useState("");
//   const [cashbackMethod, setCashbackMethod] = useState("");
//   const [returnprd, setReturnPrd] = useState([]);

//   let { id } = useParams();
//   let { userorder, orderreturn} = useBio();
//   let {updateOrdersWithReturnDetails}=useDashboard()  

//   useEffect(() => {
//     if (userorder) {
//       let matchedOrders = userorder.filter(order => 
//         order?.products?.some(product => product._id === id)
//       );
//       setReturnPrd(matchedOrders);
//     }
//   }, [userorder, id]);

//   const handleSave = async() => {
//     if (!reason || !subReason) {
//       alert("Please select reason and sub-reason!");
//       return;
//     }
//     if (!cashbackMethod) {
//       alert("Please select a cashback method!");
//       return;
//     }
    
//     await orderreturn(reason, subReason,cashbackMethod, returnprd);
    
//     await  updateOrdersWithReturnDetails(),
      
//     navigate("/")
  
    
//   };

//   const currentReasonObj = REASONS.find((r) => r.label === reason);
//   const subReasonOptions = currentReasonObj ? currentReasonObj.subReasons : [];

//   if (!returnprd.length) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
//       <h2 className="text-xl font-bold mb-4">Return Request</h2>
//       <div className="flex items-center gap-3 mb-4">
//         <img src={img} alt="Product" style={{width:"30vw"}} className="w-20 h-28 object-cover border" />
//         <div className="flex-1">
//           <h3 className="font-semibold">{returnprd[0].products[0]?.tag}</h3>
//           <p className="text-sm text-gray-600">{returnprd[0].products[0].discription}</p>
//           <p className="text-sm mt-1">₹{returnprd[0].products[0].totalAmount} <span className="text-gray-500">(Includes Convenience Fee)</span></p>
//         </div>
//       </div>
//       <div className="mb-4">
//         <div className="flex justify-between text-sm">
//           <span>Total Refund</span>
//           <span className="font-semibold">₹{returnprd[0].products[0].totalAmount}</span>
//         </div>
//       <NavLink className='navlink' to={'/faq'}>
//         <button style={{ background: "black", color: "white" }} type="button" className="underline">Read policy</button>
//         </NavLink>
//       </div>
//       <div className="mb-4">
//         <h4 className="text-sm font-semibold mb-2">Enter Return Details</h4>
//         <label className="block text-sm text-gray-600 mb-1">Reason</label>
//         <select value={reason} onChange={(e) => { setReason(e.target.value); setSubReason(""); }} className="w-full border rounded p-2 text-sm focus:ring-1 focus:ring-blue-500">
//           <option value="">Select Reason</option>
//           {REASONS.map((r) => <option key={r.label} value={r.label}>{r.label}</option>)}
//         </select>
//         {reason && (
//           <div className="mt-3">
//             <label className="block text-sm text-gray-600 mb-1">Sub Reason</label>
//             <select value={subReason} onChange={(e) => setSubReason(e.target.value)} className="w-full border rounded p-2 text-sm focus:ring-1 focus:ring-blue-500">
//               <option value="">Select Sub Reason</option>
//               {subReasonOptions.map((sub, idx) => <option key={idx} value={sub}>{sub}</option>)}
//             </select>
//           </div>
//         )}
//         {/* <div className="mt-3">
//           <label className="block text-sm text-gray-600 mb-1">Select Cashback Method</label>
//           <select value={cashbackMethod} onChange={(e) => setCashbackMethod(e.target.value)} className="w-full border rounded p-2 text-sm focus:ring-1 focus:ring-blue-500">
//             <option value="">Select Cashback Method</option>
//             <option value="Wallet">Wallet</option>
//             <option value="Account">Account</option>
//           </select>
//         </div> */}
//       </div>
//       <button  style={{ background: "black", color: "white" }} className="w-full text-white rounded py-2 mt-4 text-sm font-semibold">Next</button>
//     </div>
//   );
// };

// export default ReturnRequest;






















// import React, { useEffect, useState } from "react";
// import { NavLink, useNavigate, useParams } from "react-router-dom";
// import { useBio } from "./BioContext";
// import img from "./image/img3.jpg";
// import { useDashboard } from "./dashboardforadmin/DashboardContext";

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
// ];

// const ReturnRequest = () => {
//   const navigate = useNavigate();
//   const [reason, setReason] = useState("");
//   const [subReason, setSubReason] = useState("");
//   const [returnprd, setReturnPrd] = useState([]);
//   const [step, setStep] = useState(1);
//   const [uploadedUrls, setUploadedUrls] = useState([]);
//   const [isUploading, setIsUploading] = useState(false);

//   let { id } = useParams();
//   let { userorder, orderreturn } = useBio();
//   let { updateOrdersWithReturnDetails } = useDashboard();

//   useEffect(() => {
//     if (userorder) {
//       let matchedOrders = userorder.filter(order =>
//         order?.products?.some(product => product._id === id)
//       );
//       setReturnPrd(matchedOrders);
//     }
//   }, [userorder, id]);

//   const currentReasonObj = REASONS.find((r) => r.label === reason);
//   const subReasonOptions = currentReasonObj ? currentReasonObj.subReasons : [];

//   const handleNext = () => {
//     if (!reason || !subReason) {
//       alert("Please select reason and sub-reason!");
//       return;
//     }
//     setStep(2);
//   };

//   const handlePhotoUpload = async (e) => {
//     const files = Array.from(e.target.files);
//     if (uploadedUrls.length + files.length > 6) {
//       alert("You can upload up to 6 photos only.");
//       return;
//     }

//     setIsUploading(true);

//     for (let file of files) {
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("upload_preset", "lewkout");
//       formData.append("cloud_name", "ddbz9m39a");

//       try {
//         const res = await fetch("https://api.cloudinary.com/v1_1/ddbz9m39a/image/upload", {
//           method: "POST",
//           body: formData,
//         });

//         const data = await res.json();
//         setUploadedUrls((prev) => [...prev, data.secure_url]);
//       } catch (err) {
//         console.error("Upload failed:", err);
//         alert("Failed to upload image. Please try again.");
//       }
//     }

//     setIsUploading(false);
//   };

//   const handleSave = async () => {
//     if (uploadedUrls.length < 6) {
//       alert("Please upload at least 6 photos.");
//       return;
//     }

//     // Tu yaha uploadedUrls ko backend me bhej sakta hai agar required ho
//     await orderreturn(reason, subReason, "Wallet", returnprd, uploadedUrls);
//     await updateOrdersWithReturnDetails();
//     navigate("/");
//   };

//   if (!returnprd.length) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
//       <h2 className="text-xl font-bold mb-4">Return Request</h2>

//       {/* Product Info */}
//       <div className="flex items-center gap-3 mb-4">
//         <img src={img} alt="Product" style={{ width: "30vw" }} className="w-20 h-28 object-cover border" />
//         <div className="flex-1">
//           <h3 className="font-semibold">{returnprd[0].products[0]?.tag}</h3>
//           <p className="text-sm text-gray-600">{returnprd[0].products[0].discription}</p>
//           <p className="text-sm mt-1">₹{returnprd[0].products[0].totalAmount} <span className="text-gray-500">(Includes Convenience Fee)</span></p>
//         </div>
//       </div>

//       <div className="mb-4">
//         <div className="flex justify-between text-sm">
//           <span>Total Refund</span>
//           <span className="font-semibold">₹{returnprd[0].products[0].totalAmount}</span>
//         </div>
//         <NavLink className='navlink' to={'/faq'}>
//           <button style={{ background: "black", color: "white" }} type="button" className="underline">Read policy</button>
//         </NavLink>
//       </div>

//       {/* Step 1: Reason Selection */}
//       {step === 1 && (
//         <div className="mb-4">
//           <h4 className="text-sm font-semibold mb-2">Enter Return Details</h4>
//           <label className="block text-sm text-gray-600 mb-1">Reason</label>
//           <select value={reason} onChange={(e) => { setReason(e.target.value); setSubReason(""); }} className="w-full border rounded p-2 text-sm focus:ring-1 focus:ring-blue-500">
//             <option value="">Select Reason</option>
//             {REASONS.map((r) => <option key={r.label} value={r.label}>{r.label}</option>)}
//           </select>

//           {reason && (
//             <div className="mt-3">
//               <label className="block text-sm text-gray-600 mb-1">Sub Reason</label>
//               <select value={subReason} onChange={(e) => setSubReason(e.target.value)} className="w-full border rounded p-2 text-sm focus:ring-1 focus:ring-blue-500">
//                 <option value="">Select Sub Reason</option>
//                 {subReasonOptions.map((sub, idx) => <option key={idx} value={sub}>{sub}</option>)}
//               </select>
//             </div>
//           )}

//           <button
//             onClick={handleNext}
//             style={{ background: "black", color: "white" }}
//             className="w-full text-white rounded py-2 mt-4 text-sm font-semibold"
//           >
//             Next
//           </button>
//         </div>
//       )}

//       {/* Step 2: Upload Photos */}
//       {step === 2 && (
//         <div>
//           <h4 className="text-md font-semibold mb-2">Upload Return Proof</h4>
//           <p className="text-sm text-gray-600 mb-2">Including issue, label, package and invoice.</p>

//           <div className="border border-dashed border-gray-400 p-6 text-center rounded-md">
//             <label className="cursor-pointer flex flex-col items-center space-y-2">
//               <span className="text-gray-500 text-sm">📷 Upload Photos (Up to 6)</span>
//               <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="hidden" />
//             </label>
//           </div>

//           {/* Preview Uploaded Photos */}
//           <div className="mt-4 flex flex-wrap gap-2">
//             {uploadedUrls.map((url, index) => (
//               <div key={index} className="w-16 h-16 border">
//                 <img src={url} alt={`proof-${index}`} style={{width:"200px",height:"200px"}} />
//               </div>
//             ))}
//           </div>

//           {/* Submit Button */}
//           <button
//             disabled={uploadedUrls.length < 6 || isUploading}
//             onClick={handleSave}
//             style={{
//               background: uploadedUrls.length < 6 ? "gray" : "black",
//               color: "white",
//               cursor: uploadedUrls.length < 6 ? "not-allowed" : "pointer"
//             }}
//             className="w-full text-white rounded py-2 mt-4 text-sm font-semibold"
//           >
//             {isUploading ? "Uploading..." : "Submit"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReturnRequest;

// import React, { useEffect, useState } from "react";
// import { NavLink, useNavigate, useParams } from "react-router-dom";
// import { useBio } from "./BioContext";
// import { useLocation } from "react-router-dom";
// import img from "./image/img3.jpg";
// import { useDashboard } from "./dashboardforadmin/DashboardContext";
// import AddressList from "./AddressList";

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
// ];


// const ReturnRequest = () => {
//   const navigate = useNavigate();
//   const [reason, setReason] = useState("");
//   const [subReason, setSubReason] = useState("");
//   const [returnprd, setReturnPrd] = useState([]);
//   const [step, setStep] = useState(1);
//   const [uploadedUrls, setUploadedUrls] = useState([]);
//   const [isUploading, setIsUploading] = useState(false);
//   const [refundMode, setRefundMode] = useState("");
// const [refundModeConfirmed, setRefundModeConfirmed] = useState(false);
// // const[showmeaddress,setshowmeaddress]=useState(false)

//   let { id } = useParams();
//   let { userorder, orderreturn,addresssetkro,showmeaddress,setshowmeaddress} = useBio();
//   let { updateOrdersWithReturnDetails } = useDashboard();

//   useEffect(() => {
//     if (userorder) {
//       let matchedOrders = userorder.filter(order =>
//         order?.products?.some(product => product._id === id)
//       );
//       setReturnPrd(matchedOrders);
//     }
//   }, [userorder, id]);

//   const currentReasonObj = REASONS.find(r => r.label === reason);
//   const subReasonOptions = currentReasonObj ? currentReasonObj.subReasons : [];

//   const handleNext = () => {
//     if (step === 1 && (!reason || !subReason)) {
//       alert("Please select reason and sub-reason.");
//       return;
//     }

//     if (step === 2 && uploadedUrls.length < 6) {
//       alert("Please upload at least 6 photos.");
//       return;
//     }

//     setStep(step + 1);
//   };

//   const handlePhotoUpload = async (e) => {
//     const files = Array.from(e.target.files);
//     if (uploadedUrls.length + files.length > 6) {
//       alert("You can upload up to 6 photos only.");
//       return;
//     }

//     setIsUploading(true);
//     for (let file of files) {
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("upload_preset", "lewkout");
//       formData.append("cloud_name", "ddbz9m39a");

//       try {
//         const res = await fetch("https://api.cloudinary.com/v1_1/ddbz9m39a/image/upload", {
//           method: "POST",
//           body: formData,
//         });
//         const data = await res.json();
//         console.log("images are uploaded",data.secure_url)
//         setUploadedUrls(prev => [...prev, data.secure_url]);
//       } catch (err) {
//         console.error("Upload failed:", err);
//         alert("Image upload failed.");
//       }
//     }
//     setIsUploading(false);
//   };

//   const handleSubmit = async () => {
//     if (!refundMode) {
//       alert("Please select a refund mode.");
//       return;
//     }

//     await orderreturn(reason, subReason, refundMode, returnprd, uploadedUrls,addresssetkro);
//     await updateOrdersWithReturnDetails();
//     navigate("/");
//   };

    

// if(addresssetkro){
//   console.log("addresset hua kya",addresssetkro) 
// }
     

//   if (!returnprd.length) return <p>Loading...</p>;

//   return (
//     <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
//       <h2 className="text-xl font-bold mb-4">Return Request</h2>

//       {/* Product Info */}
//       <div className="flex items-center gap-3 mb-4">
//          <img src={returnprd[0]?.products[0]?.image} alt="Product" style={{ width: "30vw" }} className="w-20 h-28 object-cover border" />
//         <div className="flex-1">
//           <h3 className="font-semibold">{returnprd[0].products[0]?.tag}</h3>
//           <p className="text-sm text-gray-600">{returnprd[0].products[0].discription}</p>
//           <p className="text-sm mt-1">₹{returnprd[0].products[0].totalAmount} <span className="text-gray-500">(Includes Fee)</span></p>
//         </div>
//       </div>

//       {/* Step 1 */}
//       {step === 1 && (
//         <>
//           <label className="block mb-1 text-sm">Reason</label>
//           <select value={reason} onChange={e => { setReason(e.target.value); setSubReason(""); }} className="w-full border rounded p-2 mb-3">
//             <option value="">Select Reason</option>
//             {REASONS.map(r => <option key={r.label} value={r.label}>{r.label}</option>)}
//           </select>

//           {reason && (
//             <>
//               <label className="block mb-1 text-sm">Sub Reason</label>
//               <select value={subReason} onChange={e => setSubReason(e.target.value)} className="w-full border rounded p-2">
//                 <option value="">Select Sub Reason</option>
//                 {subReasonOptions.map((sub, idx) => <option key={idx} value={sub}>{sub}</option>)}
//               </select>
//             </>
//           )}

//           <button onClick={handleNext} className="w-full bg-black text-white mt-4 py-2 rounded">Next</button>
//         </>
//       )}

//       {/* Step 2 */}
//       {step === 2 && (
//         <>
//           <p className="text-sm mb-2">Upload Return Proof (Min 6 photos)</p>
//           <div className="border border-dashed p-4 text-center rounded mb-4">
//             <label className="cursor-pointer text-gray-500 text-sm">
//               📷 Upload Photos
//               <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} className="hidden" />
//             </label>
//           </div>

//           <div className="flex gap-2 flex-wrap">
//             {uploadedUrls.map((url, idx) => (
//               <img key={idx} src={url} style={{width:"200px",height:"200px"}} />
//             ))}
//           </div>

//           <button disabled={uploadedUrls.length < 6 || isUploading}
//             onClick={handleNext}
//             className="w-full bg-black text-white mt-4 py-2 rounded disabled:bg-gray-400"
//           >
//             {isUploading ? "Uploading..." : "Next"}
//           </button>
//         </>
//       )}

//       {/* Step 3: Refund Mode */}
//       {step === 3 && (
//   <>
//     <h3 className="text-md font-bold mb-3">Confirm and Submit Request</h3>

//     <div className="text-sm mb-3 flex justify-between items-center">
//       <span>Refund Amount</span>
//       <span className="text-red-600 font-semibold">₹{returnprd[0].products[0]?.totalAmount}</span>
//     </div>

//     <div className="mb-5">
//       <p className="text-sm font-semibold mb-2">Choose Refund Mode</p>

//       <div className="border p-3 rounded-md mb-2">
//         <label className="flex items-start gap-2">
//           <input
//             type="radio"
//             name="refund"
//             value="Lewkout Wallet"
//             checked={refundMode === "Lewkout Wallet"}
//             onChange={e => setRefundMode(e.target.value)}
//             className="mt-1"
//           />
//           <div className="text-sm">
//             <span className="font-bold">Lewkout Wallet</span>
//             <span className="ml-2 px-1 py-0.5 text-xs bg-green-100 text-green-600 rounded">⚡ INSTANT</span>
//             <div className="text-gray-600 mt-1">After quality check is passed, ₹{returnprd[0].products[0]?.totalAmount} will be returned to your Lewkout Wallet instantly.</div>
//             <div className="text-xs mt-2 bg-red-100 text-red-600 p-2 rounded">
//               <strong>Note:</strong> The amount paid by the wallet can only be returned to the wallet and does not support withdrawals.
//             </div>
//           </div>
//         </label>
//       </div>

//       <div className="border p-3 rounded-md">
//         <label className="flex items-start gap-2">
//           <input
//             type="radio"
//             name="refund"
//             value="Back to Source"
//             checked={refundMode === "Back to Source"}
//             onChange={e => setRefundMode(e.target.value)}
//             className="mt-1"
//           />
//           <div className="text-sm">
//             <span className="font-bold">Back to source</span>
//             <div className="text-gray-600 mt-1">
//               After quality check is passed, ₹78 will be returned to your Lewkout Wallet instantly, ₹446 will be returned to your original UPI account 8955**00@ybl within 2 days.
//             </div>
//           </div>
//         </label>
//       </div>
//     </div>

//     {/* Pickup Address */}
//     <div className="mb-5 text-sm">
//       <p className="font-semibold mb-1">📍 Pick Up Address</p>
//       {/* <div className="border p-2 rounded-md bg-gray-50">
//         117 Geetanjali colony, Geetanjali colony Salasar enclave Mangyawas<br />
//         Jaipur, Rajasthan, 302020<br />
//         Tanushree Goyal +91 8955345400
//       </div> */}
       
//             <div className="address-section-checkoutbuy">
//             <span>
//         {addresssetkro.length > 0
//           ? `${addresssetkro[0].uname}/${addresssetkro[0].building}/${addresssetkro[0].locality}, ${addresssetkro[0].city}`
//           : "No address available"}
//           {/* <IoIosArrowForward onClick={()=>{setShowSheet(true)}}></IoIosArrowForward> */}
//       </span>
//       <span onClick={()=>{setshowmeaddress(true)}}>{`->`}</span>
//             </div>
            
//     </div>

//     {/* Check & Confirm */}
//     <div className="mb-4 text-sm">
//       <p className="font-semibold">Please check & confirm that the following items are in the same condition as when the order was delivered:</p>
//       <ul className="list-disc ml-5 mt-2 text-xs text-gray-600">
//         <li>The MRP & SKU ID tag along with the plastic seal</li>
//         <li>Brand tag stitched to product which specifies the size</li>
//       </ul>
//     </div>

//     {/* Policy & checkbox */}
//     <div className="text-xs text-gray-600 mt-4">
//       In accordance with <span className="text-blue-600 underline cursor-pointer">Lewkout's return policy</span>, we may deny refunds for ineligible items at the time of return.
//     </div>

//     <div className="mt-3 mb-5 text-sm">
//       <label className="flex items-center gap-2">
//         {/* <input type="checkbox" className="accent-black"
//           onChange={(e) => setRefundModeConfirmed(e.target.checked)}
//         /> */}
//         I have understood and confirmed the above terms
//          <input type="checkbox" className="accent-black"
//           onChange={(e) => setRefundModeConfirmed(e.target.checked)}
//         />
//       </label>
//     </div>

//    <button
//   onClick={handleSubmit}
//   disabled={!refundModeConfirmed}
//   className={`w-full py-2 rounded ${refundModeConfirmed ? 'bg-black text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
// >
//   Submit
// </button>

//   </>
// )}
// {
//   showmeaddress === true ? (
//     <div
//       style={{
//         position: "fixed",
//         top: "50%",
//         left: "50%",
//         transform: "translate(-50%, -50%)",
//         width: "100vw",
//         height: "100vh",
//         backgroundColor: "white",
//         boxShadow: "0 0 10px rgba(0,0,0,0.2)",
//         zIndex: 9999,
//         overflow: "auto",
//         borderRadius: "12px",
//         padding: "20px"
//       }}
//     >
//       <AddressList loc="return" />
//     </div>
//   ) : null
// }


//     </div>
//   );
// };

// export default ReturnRequest;


import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useBio } from "./BioContext";
// import { useLocation } from "react-router-dom";
// import img from "./image/img3.jpg";
import { useDashboard } from "./dashboardforadmin/DashboardContext";
import AddressList from "./AddressList";

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
];


const ReturnRequest = () => {
  const navigate = useNavigate();
  const [reason, setReason] = useState("");
  const [subReason, setSubReason] = useState("");
  const [returnprd, setReturnPrd] = useState([]);
  const [step, setStep] = useState(1);
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [refundMode, setRefundMode] = useState("");
const [refundModeConfirmed, setRefundModeConfirmed] = useState(false);
// const[showmeaddress,setshowmeaddress]=useState(false)

  let { id } = useParams();
  let { userorder, orderreturn,addresssetkro,showmeaddress,setshowmeaddress} = useBio();
  let { updateOrdersWithReturnDetails } = useDashboard();

  useEffect(() => {
    if (userorder) {
      let matchedOrders = userorder.filter(order =>
        order?.products?.some(product => product._id === id)
      );
      setReturnPrd(matchedOrders);
    }
  }, [userorder, id]);

  const currentReasonObj = REASONS.find(r => r.label === reason);
  const subReasonOptions = currentReasonObj ? currentReasonObj.subReasons : [];

  const handleNext = () => {
    if (step === 1 && (!reason || !subReason)) {
      alert("Please select reason and sub-reason.");
      return;
    }

    if (step === 2 && uploadedUrls.length < 6) {
      alert("Please upload at least 6 photos.");
      return;
    }

    setStep(step + 1);
  };

  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (uploadedUrls.length + files.length > 6) {
      alert("You can upload up to 6 photos only.");
      return;
    }

    setIsUploading(true);
    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "lewkout");
      formData.append("cloud_name", "ddbz9m39a");

      try {
        const res = await fetch("https://api.cloudinary.com/v1_1/ddbz9m39a/image/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        console.log("images are uploaded",data.secure_url)
        setUploadedUrls(prev => [...prev, data.secure_url]);
      } catch (err) {
        console.error("Upload failed:", err);
        alert("Image upload failed.");
      }
    }
    setIsUploading(false);
  };

  const handleSubmit = async () => {
    if (!refundMode) {
      alert("Please select a refund mode.");
      return;
    }

    await orderreturn(reason, subReason, refundMode, returnprd, uploadedUrls,addresssetkro);
    await updateOrdersWithReturnDetails();
    navigate("/");
  };

    

if(addresssetkro){
  console.log("addresset hua kya",addresssetkro) 
}
     

  if (!returnprd.length) return <p>Loading...</p>;
  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
    padding: "16px",
    fontFamily: "system-ui, -apple-system, sans-serif"
  };

  const cardStyle = {
    maxWidth: "500px",
    margin: "0 auto",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    padding: "24px",
    "@media (maxWidth: 768px)": {
      padding: "16px",
      margin: "0"
    }
  };

  const headerStyle = {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "24px",
    color: "#111827",
    textAlign: "center"
  };

  const productCardStyle = {
    display: "flex",
    gap: "16px",
    marginBottom: "24px",
    padding: "16px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    backgroundColor: "#f9fafb"
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "14px",
    transition: "border-color 0.2s ease",
    outline: "none"
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151"
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#000000",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    marginTop: "16px"
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#9ca3af",
    cursor: "not-allowed"
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={headerStyle}>Return Request</h2>

        {/* Product Information */}
        <div style={productCardStyle}>
          <img 
            src={userorder[0].products[0].image[0]} 
            alt="Product" 
            style={{ 
              width: "80px", 
              height: "110px", 
              objectFit: "cover", 
              borderRadius: "6px",
              border: "1px solid #e5e7eb"
            }} 
            loading="lazy"
          />
          <div style={{ flex: 1 }}>
            <h3 style={{ 
              fontWeight: "600", 
              marginBottom: "8px",
              fontSize: "16px",
              color: "#111827"
            }}>
              {userorder[0].products[0]?.tag}
            </h3>
            <p style={{ 
              fontSize: "14px", 
              color: "#6b7280", 
              marginBottom: "8px",
              lineHeight: "1.4"
            }}>
              {userorder[0].products[0].discription}
            </p>
            <p style={{ 
              fontSize: "14px",
              fontWeight: "600",
              color: "#111827"
            }}>
              ₹{userorder[0].products[0].totalAmount} 
              <span style={{ 
                color: "#9ca3af", 
                fontWeight: "400",
                marginLeft: "4px"
              }}>
                (Includes Fee)
              </span>
            </p>
          </div>
        </div>

        {/* Step 1: Reason Selection */}
        {step === 1 && (
          <div>
            <label style={labelStyle}>Return Reason</label>
            <select 
              value={reason} 
              onChange={e => { 
                setReason(e.target.value); 
                setSubReason(""); 
              }} 
              style={{
                ...inputStyle,
                marginBottom: "16px"
              }}
              onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
              onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
            >
              <option value="">Select Reason</option>
              {REASONS.map(r => (
                <option key={r.label} value={r.label}>{r.label}</option>
              ))}
            </select>

            {reason && (
              <>
                <label style={labelStyle}>Specific Reason</label>
                <select 
                  value={subReason} 
                  onChange={e => setSubReason(e.target.value)} 
                  style={{
                    ...inputStyle,
                    marginBottom: "16px"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
                  onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
                >
                  <option value="">Select Specific Reason</option>
                  {subReasonOptions.map((sub, idx) => (
                    <option key={idx} value={sub}>{sub}</option>
                  ))}
                </select>
              </>
            )}

            <button 
              onClick={handleNext} 
              style={buttonStyle}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#1f2937"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#000000"}
            >
              Next
            </button>
          </div>
        )}

        {/* Step 2: Photo Upload */}
        {step === 2 && (
          <div>
            <p style={{
              fontSize: "16px",
              fontWeight: "600",
              marginBottom: "16px",
              color: "#111827"
            }}>
              Upload Return Proof (Minimum 6 photos)
            </p>
            
            <div style={{
              border: "2px dashed #d1d5db",
              borderRadius: "8px",
              padding: "32px",
              textAlign: "center",
              marginBottom: "20px",
              backgroundColor: "#f9fafb",
              transition: "all 0.2s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "#3b82f6";
              e.target.style.backgroundColor = "#eff6ff";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "#d1d5db";
              e.target.style.backgroundColor = "#f9fafb";
            }}
            >
              <label style={{
                cursor: "pointer",
                color: "#6b7280",
                fontSize: "14px",
                display: "block"
              }}>
                <div style={{
                  fontSize: "40px",
                  marginBottom: "8px"
                }}>📷</div>
                Click to Upload Photos
                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  onChange={handlePhotoUpload} 
                  style={{ display: "none" }} 
                />
              </label>
            </div>

            {uploadedUrls.length > 0 && (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
                gap: "8px",
                marginBottom: "20px"
              }}>
                {uploadedUrls.map((url, idx) => (
                  <img 
                    key={idx} 
                    src={url} 
                    alt={`Upload ${idx + 1}`}
                    style={{
                      width: "100%",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "6px",
                      border: "1px solid #e5e7eb"
                    }} 
                    loading="lazy"
                  />
                ))}
              </div>
            )}

            <div style={{
              fontSize: "12px",
              color: "#6b7280",
              marginBottom: "16px",
              textAlign: "center"
            }}>
              {uploadedUrls.length}/2 photos uploaded
            </div>

            <button 
              disabled={uploadedUrls.length < 2 || isUploading}
              onClick={handleNext}
              style={uploadedUrls.length >= 2 && !isUploading ? buttonStyle : disabledButtonStyle}
              onMouseEnter={(e) => {
                if (!e.target.disabled) {
                  e.target.style.backgroundColor = "#1f2937";
                }
              }}
              onMouseLeave={(e) => {
                if (!e.target.disabled) {
                  e.target.style.backgroundColor = "#000000";
                }
              }}
            >
              {isUploading ? "Uploading..." : "Next"}
            </button>
          </div>
        )}

        {/* Step 3: Refund Mode & Confirmation */}
        {step === 3 && (
          <div>
            <h3 style={{
              fontSize: "18px",
              fontWeight: "700",
              marginBottom: "20px",
              color: "#111827"
            }}>
              Confirm and Submit Request
            </h3>

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              padding: "12px",
              backgroundColor: "#fef2f2",
              borderRadius: "8px",
              border: "1px solid #fecaca"
            }}>
              <span style={{ fontSize: "14px", fontWeight: "600" }}>Refund Amount</span>
              <span style={{ 
                color: "#dc2626", 
                fontWeight: "700",
                fontSize: "16px"
              }}>
                ₹{userorder[0].products[0]?.totalAmount}
              </span>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <p style={{
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "12px",
                color: "#111827"
              }}>
                Choose Refund Mode
              </p>

              {/* Wallet Refund Option */}
              <div style={{
                border: "1px solid #e5e7eb",
                padding: "16px",
                borderRadius: "8px",
                marginBottom: "12px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                backgroundColor: refundMode === "Lewkout Wallet" ? "#eff6ff" : "white"
              }}
              onClick={() => setRefundMode("Lewkout Wallet")}
              >
                <label style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  cursor: "pointer"
                }}>
                  <input
                    type="radio"
                    name="refund"
                    value="Lewkout Wallet"
                    checked={refundMode === "Lewkout Wallet"}
                    onChange={e => setRefundMode(e.target.value)}
                    style={{ marginTop: "2px" }}
                  />
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontWeight: "600", fontSize: "14px" }}>Lewkout Wallet</span>
                      <span style={{
                        fontSize: "10px",
                        backgroundColor: "#dcfce7",
                        color: "#16a34a",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        fontWeight: "600"
                      }}>
                        ⚡ INSTANT
                      </span>
                    </div>
                    <div style={{
                      color: "#6b7280",
                      marginTop: "4px",
                      fontSize: "13px",
                      lineHeight: "1.4"
                    }}>
                      After quality check is passed, ₹{userorder[0].products[0]?.totalAmount} will be returned to your Lewkout Wallet instantly.
                    </div>
                    <div style={{
                      fontSize: "11px",
                      marginTop: "8px",
                      backgroundColor: "#fef2f2",
                      color: "#dc2626",
                      padding: "8px",
                      borderRadius: "6px",
                      lineHeight: "1.3"
                    }}>
                      <strong>Note:</strong> The amount paid by the wallet can only be returned to the wallet and does not support withdrawals.
                    </div>
                  </div>
                </label>
              </div>

              {/* Source Refund Option */}
              <div style={{
                border: "1px solid #e5e7eb",
                padding: "16px",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                backgroundColor: refundMode === "Back to Source" ? "#eff6ff" : "white"
              }}
              onClick={() => setRefundMode("Back to Source")}
              >
                <label style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  cursor: "pointer"
                }}>
                  <input
                    type="radio"
                    name="refund"
                    value="Back to Source"
                    checked={refundMode === "Back to Source"}
                    onChange={e => setRefundMode(e.target.value)}
                    style={{ marginTop: "2px" }}
                  />
                  <div>
                    <span style={{ fontWeight: "600", fontSize: "14px" }}>Back to source</span>
                    <div style={{
                      color: "#6b7280",
                      marginTop: "4px",
                      fontSize: "13px",
                      lineHeight: "1.4"
                    }}>
                      After quality check is passed, ₹78 will be returned to your Lewkout Wallet instantly, ₹446 will be returned to your original UPI account 8955**00@ybl within 2 days.
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Pickup Address */}
            <div style={{ marginBottom: "24px" }}>
              <p style={{
                fontWeight: "600",
                marginBottom: "8px",
                fontSize: "14px",
                color: "#111827"
              }}>
                📍 Pick Up Address
              </p>
              <div style={{
                border: "1px solid #e5e7eb",
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: "#f9fafb",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div style={{
                  fontSize: "13px",
                  lineHeight: "1.4",
                  color: "#374151"
                }}>
                  {addresssetkro.uname}<br />
                  {addresssetkro.building}<br />
                  {addresssetkro.locality}, {addresssetkro.city}
                </div>
                <button 
                  onClick={() => setshowmeaddress(true)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "18px",
                    cursor: "pointer",
                    color: "#3b82f6",
                    padding: "4px"
                  }}
                >
                  →
                </button>
              </div>
            </div>

            {/* Confirmation Items */}
            <div style={{ marginBottom: "20px" }}>
              <p style={{
                fontWeight: "600",
                fontSize: "14px",
                marginBottom: "12px",
                color: "#111827"
              }}>
                Please check & confirm that the following items are in the same condition as when the order was delivered:
              </p>
              <ul style={{
                marginLeft: "20px",
                fontSize: "12px",
                color: "#6b7280",
                lineHeight: "1.5"
              }}>
                <li style={{ marginBottom: "4px" }}>The MRP & SKU ID tag along with the plastic seal</li>
                <li>Brand tag stitched to product which specifies the size</li>
              </ul>
            </div>

            {/* Policy Notice */}
            <div style={{
              fontSize: "11px",
              color: "#6b7280",
              marginBottom: "16px",
              lineHeight: "1.4"
            }}>
              In accordance with{" "}
              <span style={{
                color: "#3b82f6",
                textDecoration: "underline",
                cursor: "pointer"
              }}>
                Lewkout's return policy
              </span>
              , we may deny refunds for ineligible items at the time of return.
            </div>

            {/* Confirmation Checkbox */}
            <div style={{
              marginBottom: "20px",
              fontSize: "14px"
            }}>
              <label style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer"
              }}>
                <span>I have understood and confirmed the above terms</span>
                <input 
                  type="checkbox" 
                  style={{
                    width: "16px",
                    height: "16px",
                    accentColor: "#000000"
                  }}
                  onChange={(e) => setRefundModeConfirmed(e.target.checked)}
                />
              </label>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!refundModeConfirmed}
              style={refundModeConfirmed ? buttonStyle : disabledButtonStyle}
              onMouseEnter={(e) => {
                if (!e.target.disabled) {
                  e.target.style.backgroundColor = "#1f2937";
                }
              }}
              onMouseLeave={(e) => {
                if (!e.target.disabled) {
                  e.target.style.backgroundColor = "#000000";
                }
              }}
            >
              Submit Return Request
            </button>
          </div>
        )}

        {/* Address Selection Modal */}
        {showmeaddress && (
          <div style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px"
          }}>
            <div style={{
              backgroundColor: "white",
              borderRadius: "12px",
              maxWidth: "500px",
              width: "100%",
              maxHeight: "80vh",
              overflow: "hidden",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}>
              <AddressList 
                loc="return" 
                onClose={() => setshowmeaddress(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  return <ReturnRequest />;
}

export default App;