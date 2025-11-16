// import React, { useState } from "react";
// import { useDashboard } from "./DashboardContext";
// import { FaEdit, FaSave } from "react-icons/fa";
// import { NavLink } from "react-router-dom";

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

    
//       let role=newRole
//       let shopname=newRole === "shopkeeper" ? shopDetails.shopname : ""
//       let shopaddress= newRole === "shopkeeper" ? shopDetails.shopaddress : ""
    

//     await updateUserRole(user._id, role,shopname,shopaddress);
//     setEditUserId(null);
//     setNewRole("");
//     setShopDetails({ shopname: "", shopaddress: "" });
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
//             <th className="px-4 py-2 border">Shop Name</th>
//             <th className="px-4 py-2 border">Shop Address</th>
//             <th className="px-4 py-2 border">Address</th>
//             <th className="px-4 py-2 border">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//               <NavLink to={`/admin/useractivity/${user._id}`}>
//             <tr key={user._id} className="hover:bg-gray-50">
             
//               <td className="px-4 py-2 border">{user._id}</td>
//               <td className="px-4 py-2 border">{user.name}</td>
//               <td className="px-4 py-2 border">{user.email}</td>
//               <td className="px-4 py-2 border">{user.phone}</td>
              
//               <td className="px-4 py-2 border">
//                 {editUserId === user._id ? (
//                   <select
//                     value={newRole}
//                     onChange={(e) => setNewRole(e.target.value)}
//                     className="border p-1"
//                   >
//                     <option value="user">User</option>
//                     <option value="shopkeeper">Shopkeeper</option>
//                     <option value="admin">Admin</option>
//                   </select>
//                 ) : (
//                   user.role
//                 )}
//               </td>
//               <td className="px-4 py-2 border">
//                 {editUserId === user._id && newRole === "shopkeeper" ? (
//                   <input
//                     type="text"
//                     placeholder="Enter Shop Name"
//                     value={shopDetails.shopname}
//                     onChange={(e) => setShopDetails({ ...shopDetails, shopname: e.target.value })}
//                     className="border p-1 w-full"
//                   />
//                 ) : (
//                   user.shopname || "--"
//                 )}
//               </td>
//               <td className="px-4 py-2 border">
//                 {editUserId === user._id && newRole === "shopkeeper" ? (
//                   <input
//                     type="text"
//                     placeholder="Enter Shop Address"
//                     value={shopDetails.shopaddress}
//                     onChange={(e) => setShopDetails({ ...shopDetails, shopaddress: e.target.value })}
//                     className="border p-1 w-full"
//                   />
//                 ) : (
//                   user.shopaddress || "--"
//                 )}
//               </td>
//               <td className="px-4 py-2 border">
//                  {user.address.map((addr, index) => (
//                 <div key={index} className="mb-2 border-b pb-2">
//                      <strong>Building:</strong> {addr.building}, <strong>Locality:</strong> {addr.locality}, <strong>City:</strong> {addr.city}, <strong>State:</strong> {addr.state}, <strong>Pincode:</strong> {addr.pincode} 
//                      {addr.phone?.length > 0 && (
//                        <div><strong>Phone:</strong> {addr.phone.join(", ")}</div>
//                      )}
//                    </div>
//                  ))}
//                </td>
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
//             </NavLink>
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

    let role = newRole;
    let shopname = newRole === "shopkeeper" ? shopDetails.shopname : "";
    let shopaddress = newRole === "shopkeeper" ? shopDetails.shopaddress : "";

    await updateUserRole(user._id, role, shopname, shopaddress);
    setEditUserId(null);
    setNewRole("");
    setShopDetails({ shopname: "", shopaddress: "" });
  };

  return (
    <div style={{ overflowX: "auto", padding: 16 }}>
      <h2 style={{ fontSize: 22, fontWeight: "bold", marginBottom: 16 }}>User Data</h2>

      <table
        style={{
          minWidth: "900px",
          width: "100%",
          background: "#fff",
          border: "1px solid #ddd",
          borderRadius: 8,
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <thead style={{ background: "#f1f1f1" }}>
          <tr>
            {[
              "ID",
              "Name",
              "Email",
              "Phone",
              "Role",
              "Shop Name",
              "Shop Address",
              "Address",
              "Action",
            ].map((head, i) => (
              <th
                key={i}
                style={{
                  padding: 10,
                  border: "1px solid #ddd",
                  fontSize: 14,
                  textAlign: "left",
                  whiteSpace: "nowrap",
                }}
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              style={{
                background: "#fff",
                transition: "0.2s",
                cursor: "default",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
            >
               <NavLink to={`/admin/useractivity/${user._id}`} style={{ textDecoration: "none" }}>
              <td style={tdStyle}>{user._id}</td>
</NavLink>
              {/* ONLY NAME COLUMN IS CLICKABLE */}
              <td style={{ ...tdStyle, color: "#007bff", fontWeight: 600 }}>
                <NavLink to={`/admin/useractivity/${user._id}`} style={{ textDecoration: "none" }}>
                  {user.name}
                </NavLink>
              </td>

              <td style={tdStyle}>{user.email}</td>
              <td style={tdStyle}>{user.phone}</td>

              <td style={tdStyle}>
                {editUserId === user._id ? (
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    style={inputStyle}
                  >
                    <option value="user">User</option>
                    <option value="shopkeeper">Shopkeeper</option>
                    <option value="admin">Admin</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>

              <td style={tdStyle}>
                {editUserId === user._id && newRole === "shopkeeper" ? (
                  <input
                    type="text"
                    value={shopDetails.shopname}
                    placeholder="Shop Name"
                    onChange={(e) =>
                      setShopDetails({ ...shopDetails, shopname: e.target.value })
                    }
                    style={inputStyle}
                  />
                ) : (
                  user.shopname || "--"
                )}
              </td>

              <td style={tdStyle}>
                {editUserId === user._id && newRole === "shopkeeper" ? (
                  <input
                    type="text"
                    value={shopDetails.shopaddress}
                    placeholder="Shop Address"
                    onChange={(e) =>
                      setShopDetails({ ...shopDetails, shopaddress: e.target.value })
                    }
                    style={inputStyle}
                  />
                ) : (
                  user.shopaddress || "--"
                )}
              </td>

              <td style={{ ...tdStyle, minWidth: 200 }}>
                {user.address?.map((addr, index) => (
                  <div key={index} style={{ marginBottom: 8, borderBottom: "1px solid #eee" }}>
                    <strong>Building:</strong> {addr.building}, <strong>Locality:</strong>{" "}
                    {addr.locality}, <strong>City:</strong> {addr.city}
                    <br />
                    <strong>State:</strong> {addr.state}, <strong>Pincode:</strong>{" "}
                    {addr.pincode}
                    {addr.phone?.length > 0 && (
                      <div>
                        <strong>Phone:</strong> {addr.phone.join(", ")}
                      </div>
                    )}
                  </div>
                ))}
              </td>

              <td style={tdStyle}>
                {editUserId === user._id ? (
                  <FaSave
                    onClick={() => handleSaveClick(user)}
                    style={{ cursor: "pointer", color: "green" }}
                  />
                ) : (
                  <FaEdit
                    onClick={() => handleEditClick(user)}
                    style={{ cursor: "pointer", color: "blue" }}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tdStyle = {
  padding: 10,
  border: "1px solid #ddd",
  fontSize: 14,
  verticalAlign: "top",
};

const inputStyle = {
  border: "1px solid #ccc",
  padding: 6,
  width: "100%",
  borderRadius: 4,
  fontSize: 14,
};
 