// import React from 'react'
// import { useDashboard } from './DashboardContext'
// export default function RegisterUser() {
//     let {users}=useDashboard()
//   return (
//     <>
//       <div>
//       <h2>User Data</h2>
//       <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse" }}>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Created At</th>
//             <th>Address</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user._id}>
//               <td>{user._id}</td>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td>{user.phone}</td>
//               <td>{new Date(user.created_at).toLocaleString()}</td>
//               <td>
//                 {user.address.map((addr, index) => (
//                   <div key={index} style={{ marginBottom: "8px", borderBottom: "1px solid #ccc", paddingBottom: "5px" }}>
//                     <strong>Building:</strong> {addr.building}, <strong>Locality:</strong> {addr.locality}, <strong>City:</strong> {addr.city}, <strong>State:</strong> {addr.state}, <strong>Pincode:</strong> {addr.pincode} 
//                     {addr.phone && addr.phone.length > 0 && (
//                       <div><strong>Phone:</strong> {addr.phone.join(", ")}</div>
//                     )}
//                   </div>
//                 ))}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     </>
//   )
// }

// import React from 'react';
// import { useDashboard } from './DashboardContext';
// import { FaEdit, FaSave, FaTrash } from "react-icons/fa"; // Importing Icons
// export default function RegisterUser() {
//   let { users } = useDashboard();

//   return (
//     <div className="overflow-x-auto p-4">
//       <h2 className="text-xl font-bold mb-4">User Data</h2>
//       <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="px-4 py-2 border">ID</th>
//             <th className="px-4 py-2 border">Name</th>
//             <th className="px-4 py-2 border">Email</th>
//             <th className="px-4 py-2 border">Phone</th>
//             <th className="px-4 py-2 border">Role</th>
//             <th className="px-4 py-2 border">Created At</th>
//             <th className="px-4 py-2 border">Address</th>
//             <th className="px-4 py-2 border">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user._id} className="hover:bg-gray-50">
//               <td className="px-4 py-2 border">{user._id}</td>
//               <td className="px-4 py-2 border">{user.name}</td>
//               <td className="px-4 py-2 border">{user.email}</td>
//               <td className="px-4 py-2 border">{user.phone}</td>
//               <td className="px-4 py-2 border font-semibold text-blue-600">{user.role || "User"}</td>
//               <td className="px-4 py-2 border">{new Date(user.created_at).toLocaleString()}</td>
//               <td className="px-4 py-2 border">
//                 {user.address.map((addr, index) => (
//                   <div key={index} className="mb-2 border-b pb-2">
//                     <strong>Building:</strong> {addr.building}, <strong>Locality:</strong> {addr.locality}, <strong>City:</strong> {addr.city}, <strong>State:</strong> {addr.state}, <strong>Pincode:</strong> {addr.pincode} 
//                     {addr.phone?.length > 0 && (
//                       <div><strong>Phone:</strong> {addr.phone.join(", ")}</div>
//                     )}
//                   </div>
//                 ))}
//               </td>
//               <td>
// <FaEdit/>
//               </td>

//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// import React, { useState } from 'react';
// import { useDashboard } from './DashboardContext';
// import { FaEdit, FaSave, FaTrash } from "react-icons/fa";

// export default function RegisterUser() {
//   let { users, updateUserRole } = useDashboard(); // updateUserRole: a function to update role in your context/API
//   const [editUserId, setEditUserId] = useState(null);
//   const [newRole, setNewRole] = useState("");

//   const handleEditClick = (user) => {
//     setEditUserId(user._id);
//     setNewRole(user.role || "User");
//   };

//   const handleSaveClick = (user) => {
//     // Call your update function here (for example, from context)
//     if (updateUserRole) {
//       updateUserRole(user._id, newRole);
//     }
//     // Clear editing state after saving
//     setEditUserId(null);
//     setNewRole("");
//   };

//   return (
//     <div className="overflow-x-auto p-4">
//       <h2 className="text-xl font-bold mb-4">User Data</h2>
//       <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="px-4 py-2 border">ID</th>
//             <th className="px-4 py-2 border">Name</th>
//             <th className="px-4 py-2 border">Email</th>
//             <th className="px-4 py-2 border">Phone</th>
//             <th className="px-4 py-2 border">Role</th>
//             <th className="px-4 py-2 border">Created At</th>
//             <th className="px-4 py-2 border">Address</th>
//             <th className="px-4 py-2 border">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user._id} className="hover:bg-gray-50">
//               <td className="px-4 py-2 border">{user._id}</td>
//               <td className="px-4 py-2 border">{user.name}</td>
//               <td className="px-4 py-2 border">{user.email}</td>
//               <td className="px-4 py-2 border">{user.phone}</td>
//               <td className="px-4 py-2 border font-semibold text-blue-600">
//                 {editUserId === user._id ? (
//                   <input 
//                     type="text" 
//                     value={newRole} 
//                     onChange={(e) => setNewRole(e.target.value)} 
//                     className="border p-1"
//                   />
//                 ) : (
//                   user.role || "User"
//                 )}
//               </td>
//               <td className="px-4 py-2 border">{new Date(user.created_at).toLocaleString()}</td>
//               <td className="px-4 py-2 border">
//                 {user.address.map((addr, index) => (
//                   <div key={index} className="mb-2 border-b pb-2">
//                     <strong>Building:</strong> {addr.building}, <strong>Locality:</strong> {addr.locality}, <strong>City:</strong> {addr.city}, <strong>State:</strong> {addr.state}, <strong>Pincode:</strong> {addr.pincode} 
//                     {addr.phone?.length > 0 && (
//                       <div><strong>Phone:</strong> {addr.phone.join(", ")}</div>
//                     )}
//                   </div>
//                 ))}
//               </td>
//               <td className="px-4 py-2 border">
//                 {editUserId === user._id ? (
//                   <FaSave 
//                     onClick={() => handleSaveClick(user)} 
//                     className="cursor-pointer text-green-600" 
//                   />
//                 ) : (
//                   <FaEdit 
//                     onClick={() => handleEditClick(user)} 
//                     className="cursor-pointer text-blue-600" 
//                   />
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }










import React, { useState } from "react";
import { useDashboard } from "./DashboardContext";
import { FaEdit, FaSave } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function RegisterUser() {
  let { users, updateUserRole } = useDashboard();
  const [editUserId, setEditUserId] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [shopDetails, setShopDetails] = useState({ shopname: "", shopaddress: "" });

  const handleEditClick = (user) => {
    setEditUserId(user._id);
    setNewRole(user.role || "user");
    setShopDetails({
      shopname: user.shopname || "",
      shopaddress: user.shopaddress || "",
    });
  };

  const handleSaveClick = async (user) => {
    if (newRole === "shopkeeper" && (!shopDetails.shopname || !shopDetails.shopaddress)) {
      alert("Shop Name and Shop Address are required for Shopkeepers!");
      return;
    }

    
      let role=newRole
      let shopname=newRole === "shopkeeper" ? shopDetails.shopname : ""
      let shopaddress= newRole === "shopkeeper" ? shopDetails.shopaddress : ""
    

    await updateUserRole(user._id, role,shopname,shopaddress);
    setEditUserId(null);
    setNewRole("");
    setShopDetails({ shopname: "", shopaddress: "" });
  };

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-xl font-bold mb-4">User Data</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Phone</th>
            <th className="px-4 py-2 border">Role</th>
            <th className="px-4 py-2 border">Shop Name</th>
            <th className="px-4 py-2 border">Shop Address</th>
            <th className="px-4 py-2 border">Address</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
              <NavLink to={`/admin/useractivity/${user._id}`}>
            <tr key={user._id} className="hover:bg-gray-50">
             
              <td className="px-4 py-2 border">{user._id}</td>
              <td className="px-4 py-2 border">{user.name}</td>
              <td className="px-4 py-2 border">{user.email}</td>
              <td className="px-4 py-2 border">{user.phone}</td>
              
              <td className="px-4 py-2 border">
                {editUserId === user._id ? (
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="border p-1"
                  >
                    <option value="user">User</option>
                    <option value="shopkeeper">Shopkeeper</option>
                    <option value="admin">Admin</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td className="px-4 py-2 border">
                {editUserId === user._id && newRole === "shopkeeper" ? (
                  <input
                    type="text"
                    placeholder="Enter Shop Name"
                    value={shopDetails.shopname}
                    onChange={(e) => setShopDetails({ ...shopDetails, shopname: e.target.value })}
                    className="border p-1 w-full"
                  />
                ) : (
                  user.shopname || "--"
                )}
              </td>
              <td className="px-4 py-2 border">
                {editUserId === user._id && newRole === "shopkeeper" ? (
                  <input
                    type="text"
                    placeholder="Enter Shop Address"
                    value={shopDetails.shopaddress}
                    onChange={(e) => setShopDetails({ ...shopDetails, shopaddress: e.target.value })}
                    className="border p-1 w-full"
                  />
                ) : (
                  user.shopaddress || "--"
                )}
              </td>
              <td className="px-4 py-2 border">
                 {user.address.map((addr, index) => (
                <div key={index} className="mb-2 border-b pb-2">
                     <strong>Building:</strong> {addr.building}, <strong>Locality:</strong> {addr.locality}, <strong>City:</strong> {addr.city}, <strong>State:</strong> {addr.state}, <strong>Pincode:</strong> {addr.pincode} 
                     {addr.phone?.length > 0 && (
                       <div><strong>Phone:</strong> {addr.phone.join(", ")}</div>
                     )}
                   </div>
                 ))}
               </td>
              <td className="px-4 py-2 border">
                {editUserId === user._id ? (
                  <FaSave
                    onClick={() => handleSaveClick(user)}
                    className="cursor-pointer text-green-600"
                  />
                ) : (
                  <FaEdit
                    onClick={() => handleEditClick(user)}
                    className="cursor-pointer text-blue-600"
                  />
                )}
              </td>
            </tr>
            </NavLink>
          ))}
        </tbody>
      </table>
    </div>
  );
}








// import React, { useState } from "react";
// import { useDashboard } from "./DashboardContext";
// import { FaEdit, FaSave } from "react-icons/fa";
// import { GoogleMap, LoadScript, Autocomplete } from "@react-google-maps/api"; // ✅ Google Maps API Import

// const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_API_KEY"; // 🔴 Replace with your Google API Key

// export default function RegisterUser() {
//   let { users, updateUserRole } = useDashboard();
//   const [editUserId, setEditUserId] = useState(null);
//   const [newRole, setNewRole] = useState("");
//   const [shopDetails, setShopDetails] = useState({ shopname: "", shopaddress: "" });

//   const handleEditClick = (user) => {
//     setEditUserId(user._id);
//     setNewRole(user.role || "user");
//     setShopDetails({
//       shopname: user.shopname || "",
//       shopaddress: user.shopaddress || "",
//     });
//   };

//   const handleSaveClick = async (user) => {
//     if (newRole === "shopkeeper" && (!shopDetails.shopname || !shopDetails.shopaddress)) {
//       alert("Shop Name and Shop Address are required for Shopkeepers!");
//       return;
//     }

//     let role = newRole;
//     let shopname = newRole === "shopkeeper" ? shopDetails.shopname : "";
//     let shopaddress = newRole === "shopkeeper" ? shopDetails.shopaddress : "";

//     await updateUserRole(user._id, role, shopname, shopaddress);
//     setEditUserId(null);
//     setNewRole("");
//     setShopDetails({ shopname: "", shopaddress: "" });
//   };

//   return (
//     <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
//       <div className="overflow-x-auto p-4">
//         <h2 className="text-xl font-bold mb-4">User Data</h2>
//         <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2 border">ID</th>
//               <th className="px-4 py-2 border">Name</th>
//               <th className="px-4 py-2 border">Email</th>
//               <th className="px-4 py-2 border">Phone</th>
//               <th className="px-4 py-2 border">Role</th>
//               <th className="px-4 py-2 border">Shop Name</th>
//               <th className="px-4 py-2 border">Shop Address</th>
//               <th className="px-4 py-2 border">Address</th>
//               <th className="px-4 py-2 border">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id} className="hover:bg-gray-50">
//                 <td className="px-4 py-2 border">{user._id}</td>
//                 <td className="px-4 py-2 border">{user.name}</td>
//                 <td className="px-4 py-2 border">{user.email}</td>
//                 <td className="px-4 py-2 border">{user.phone}</td>
//                 <td className="px-4 py-2 border">
//                   {editUserId === user._id ? (
//                     <select
//                       value={newRole}
//                       onChange={(e) => setNewRole(e.target.value)}
//                       className="border p-1"
//                     >
//                       <option value="user">User</option>
//                       <option value="shopkeeper">Shopkeeper</option>
//                       <option value="admin">Admin</option>
//                     </select>
//                   ) : (
//                     user.role
//                   )}
//                 </td>
//                 <td className="px-4 py-2 border">
//                   {editUserId === user._id && newRole === "shopkeeper" ? (
//                     <input
//                       type="text"
//                       placeholder="Enter Shop Name"
//                       value={shopDetails.shopname}
//                       onChange={(e) =>
//                         setShopDetails({ ...shopDetails, shopname: e.target.value })
//                       }
//                       className="border p-1 w-full"
//                     />
//                   ) : (
//                     user.shopname || "--"
//                   )}
//                 </td>
//                 <td className="px-4 py-2 border">
//                   {editUserId === user._id && newRole === "shopkeeper" ? (
//                     <Autocomplete
//                       onLoad={(autocomplete) => (window.autocomplete = autocomplete)}
//                       onPlaceChanged={() => {
//                         if (window.autocomplete) {
//                           const place = window.autocomplete.getPlace();
//                           if (place.formatted_address) {
//                             setShopDetails({ ...shopDetails, shopaddress: place.formatted_address });
//                           }
//                         }
//                       }}
//                     >
//                       <input
//                         type="text"
//                         placeholder="Enter Shop Address"
//                         value={shopDetails.shopaddress}
//                         onChange={(e) =>
//                           setShopDetails({ ...shopDetails, shopaddress: e.target.value })
//                         }
//                         className="border p-1 w-full"
//                       />
//                     </Autocomplete>
//                   ) : (
//                     user.shopaddress || "--"
//                   )}
//                 </td>
//                 <td className="px-4 py-2 border">
//                   {user.address.map((addr, index) => (
//                     <div key={index} className="mb-2 border-b pb-2">
//                       <strong>Building:</strong> {addr.building}, <strong>Locality:</strong>{" "}
//                       {addr.locality}, <strong>City:</strong> {addr.city}, <strong>State:</strong>{" "}
//                       {addr.state}, <strong>Pincode:</strong> {addr.pincode}
//                       {addr.phone?.length > 0 && (
//                         <div>
//                           <strong>Phone:</strong> {addr.phone.join(", ")}
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </td>
//                 <td className="px-4 py-2 border">
//                   {editUserId === user._id ? (
//                     <FaSave
//                       onClick={() => handleSaveClick(user)}
//                       className="cursor-pointer text-green-600"
//                     />
//                   ) : (
//                     <FaEdit
//                       onClick={() => handleEditClick(user)}
//                       className="cursor-pointer text-blue-600"
//                     />
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </LoadScript>
//   );
// }
