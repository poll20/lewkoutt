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

//     let role = newRole;
//     let shopname = newRole === "shopkeeper" ? shopDetails.shopname : "";
//     let shopaddress = newRole === "shopkeeper" ? shopDetails.shopaddress : "";

//     await updateUserRole(user._id, role, shopname, shopaddress);
//     setEditUserId(null);
//     setNewRole("");
//     setShopDetails({ shopname: "", shopaddress: "" });
//   };

//   return (
//     <div style={{ overflowX: "auto", padding: 16 }}>
//       <h2 style={{ fontSize: 22, fontWeight: "bold", marginBottom: 16 }}>User Data</h2>

//       <table
//         style={{
//           minWidth: "900px",
//           width: "100%",
//           background: "#fff",
//           border: "1px solid #ddd",
//           borderRadius: 8,
//           boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//         }}
//       >
//         <thead style={{ background: "#f1f1f1" }}>
//           <tr>
//             {[
//               "ID",
//               "Name",
//               "Email",
//               "Phone",
//               "Role",
//               "Shop Name",
//               "Shop Address",
//               "Address",
//               "Action",
//             ].map((head, i) => (
//               <th
//                 key={i}
//                 style={{
//                   padding: 10,
//                   border: "1px solid #ddd",
//                   fontSize: 14,
//                   textAlign: "left",
//                   whiteSpace: "nowrap",
//                 }}
//               >
//                 {head}
//               </th>
//             ))}
//           </tr>
//         </thead>

//         <tbody>
//           {users.map((user) => (
//             <tr
//               key={user._id}
//               style={{
//                 background: "#fff",
//                 transition: "0.2s",
//                 cursor: "default",
//               }}
//               onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
//               onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
//             >
//                <NavLink to={`/admin/useractivity/${user._id}`} style={{ textDecoration: "none" }}>
//               <td style={tdStyle}>{user._id}</td>
// </NavLink>
//               {/* ONLY NAME COLUMN IS CLICKABLE */}
//               <td style={{ ...tdStyle, color: "#007bff", fontWeight: 600 }}>
//                 <NavLink to={`/admin/useractivity/${user._id}`} style={{ textDecoration: "none" }}>
//                   {user.name}
//                 </NavLink>
//               </td>

//               <td style={tdStyle}>{user.email}</td>
//               <td style={tdStyle}>{user.phone}</td>

//               <td style={tdStyle}>
//                 {editUserId === user._id ? (
//                   <select
//                     value={newRole}
//                     onChange={(e) => setNewRole(e.target.value)}
//                     style={inputStyle}
//                   >
//                     <option value="user">User</option>
//                     <option value="shopkeeper">Shopkeeper</option>
//                     <option value="admin">Admin</option>
//                   </select>
//                 ) : (
//                   user.role
//                 )}
//               </td>

//               <td style={tdStyle}>
//                 {editUserId === user._id && newRole === "shopkeeper" ? (
//                   <input
//                     type="text"
//                     value={shopDetails.shopname}
//                     placeholder="Shop Name"
//                     onChange={(e) =>
//                       setShopDetails({ ...shopDetails, shopname: e.target.value })
//                     }
//                     style={inputStyle}
//                   />
//                 ) : (
//                   user.shopname || "--"
//                 )}
//               </td>

//               <td style={tdStyle}>
//                 {editUserId === user._id && newRole === "shopkeeper" ? (
//                   <input
//                     type="text"
//                     value={shopDetails.shopaddress}
//                     placeholder="Shop Address"
//                     onChange={(e) =>
//                       setShopDetails({ ...shopDetails, shopaddress: e.target.value })
//                     }
//                     style={inputStyle}
//                   />
//                 ) : (
//                   user.shopaddress || "--"
//                 )}
//               </td>

//               <td style={{ ...tdStyle, minWidth: 200 }}>
//                 {user.address?.map((addr, index) => (
//                   <div key={index} style={{ marginBottom: 8, borderBottom: "1px solid #eee" }}>
//                     <strong>Building:</strong> {addr.building}, <strong>Locality:</strong>{" "}
//                     {addr.locality}, <strong>City:</strong> {addr.city}
//                     <br />
//                     <strong>State:</strong> {addr.state}, <strong>Pincode:</strong>{" "}
//                     {addr.pincode}
//                     {addr.phone?.length > 0 && (
//                       <div>
//                         <strong>Phone:</strong> {addr.phone.join(", ")}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </td>

//               <td style={tdStyle}>
//                 {editUserId === user._id ? (
//                   <FaSave
//                     onClick={() => handleSaveClick(user)}
//                     style={{ cursor: "pointer", color: "green" }}
//                   />
//                 ) : (
//                   <FaEdit
//                     onClick={() => handleEditClick(user)}
//                     style={{ cursor: "pointer", color: "blue" }}
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

// const tdStyle = {
//   padding: 10,
//   border: "1px solid #ddd",
//   fontSize: 14,
//   verticalAlign: "top",
// };

// const inputStyle = {
//   border: "1px solid #ccc",
//   padding: 6,
//   width: "100%",
//   borderRadius: 4,
//   fontSize: 14,
// };
 
import React, { useState } from "react";
import { useDashboard } from "./DashboardContext";
import { NavLink } from "react-router-dom";

const ROLE_META = {
  admin:      { bg: "#fae8ff", color: "#7e22ce", label: "Admin" },
  shopkeeper: { bg: "#fef9c3", color: "#854d0e", label: "Shopkeeper" },
  user:       { bg: "#e0f2fe", color: "#075985", label: "User" },
};

function RoleBadge({ role }) {
  const meta = ROLE_META[role] || { bg: "#f1f5f9", color: "#475569", label: role };
  return (
    <span style={{
      display: "inline-block",
      padding: "2px 10px",
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: 0.3,
      background: meta.bg,
      color: meta.color,
    }}>
      {meta.label}
    </span>
  );
}

function Avatar({ name }) {
  const initials = name
    ? name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase()
    : "?";
  const colors = [
    ["#dbeafe","#1e40af"],["#fce7f3","#9d174d"],["#d1fae5","#065f46"],
    ["#fef3c7","#92400e"],["#ede9fe","#5b21b6"],["#fee2e2","#991b1b"],
  ];
  const idx = name ? name.charCodeAt(0) % colors.length : 0;
  const [bg, fg] = colors[idx];
  return (
    <div style={{
      width: 36, height: 36, borderRadius: "50%",
      background: bg, color: fg,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 13, fontWeight: 700, flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

function CopyPhoneButton({ phone }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(phone).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };
  return (
    <button
      onClick={handleCopy}
      title="Copy phone number"
      style={{
        marginLeft: 6,
        padding: "1px 7px",
        fontSize: 11,
        fontWeight: 600,
        borderRadius: 5,
        border: copied ? "1px solid #86efac" : "1px solid #cbd5e1",
        background: copied ? "#f0fdf4" : "#f8fafc",
        color: copied ? "#16a34a" : "#64748b",
        cursor: "pointer",
        transition: "all 0.2s",
        verticalAlign: "middle",
        lineHeight: 1.6,
      }}
    >
      {copied ? "✓ Copied" : "Copy"}
    </button>
  );
}

function AddressBlock({ addresses }) {
  if (!addresses?.length) return <span style={{ color: "#94a3b8", fontSize: 12 }}>—</span>;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {addresses.map((addr, i) => (
        <div key={i} style={{
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: 8,
          padding: "8px 10px",
          fontSize: 12,
          color: "#475569",
          lineHeight: 1.7,
        }}>
          {/* Full address line */}
          <div style={{ color: "#334155", marginBottom: 2 }}>
            {[addr.building, addr.locality, addr.city].filter(Boolean).join(", ")}
          </div>
          <div style={{ color: "#64748b" }}>
            {[addr.state, addr.pincode].filter(Boolean).join(" – ")}
          </div>

          {/* Phone with copy button */}
          {addr.phone?.length > 0 && (
            <div style={{ marginTop: 5, display: "flex", flexWrap: "wrap", gap: 4, alignItems: "center" }}>
              <span style={{ color: "#475569" }}>📞</span>
              {addr.phone.map((ph, pi) => (
                <span key={pi} style={{
                  display: "inline-flex", alignItems: "center",
                  background: "#fff", border: "1px solid #e2e8f0",
                  borderRadius: 6, padding: "1px 8px",
                  fontSize: 12, color: "#334155",
                }}>
                  {ph}
                  <CopyPhoneButton phone={ph} />
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// FIX: Removed whiteSpace/textOverflow that was hiding text on narrow columns
function InfoField({ label, value }) {
  return (
    <div style={{ minWidth: 0 }}>
      <div style={labelStyle}>{label}</div>
      <div style={{
        fontSize: 13,
        color: value ? "#334155" : "#cbd5e1",
        wordBreak: "break-word",  // <-- FIX: was cutting off long emails/phones
        lineHeight: 1.4,
      }}>
        {value || "—"}
      </div>
    </div>
  );
}

export default function RegisterUser() {
  const { users, updateUserRole } = useDashboard();
  const [editUserId, setEditUserId] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [shopDetails, setShopDetails] = useState({ shopname: "", shopaddress: "" });
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);

  const filtered = (users || []).filter(u =>
    !search ||
    (u.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (u.email || "").toLowerCase().includes(search.toLowerCase()) ||
    (u.role || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleEditClick = (user) => {
    setEditUserId(user._id);
    setNewRole(user.role || "user");
    setShopDetails({ shopname: user.shopname || "", shopaddress: user.shopaddress || "" });
  };

  const handleCancel = () => {
    setEditUserId(null);
    setNewRole("");
    setShopDetails({ shopname: "", shopaddress: "" });
  };

  const handleSaveClick = async (user) => {
    if (newRole === "shopkeeper" && (!shopDetails.shopname || !shopDetails.shopaddress)) {
      alert("Shop Name and Shop Address are required for Shopkeepers!");
      return;
    }
    setSaving(true);
    await updateUserRole(
      user._id,
      newRole,
      newRole === "shopkeeper" ? shopDetails.shopname : "",
      newRole === "shopkeeper" ? shopDetails.shopaddress : ""
    );
    setSaving(false);
    handleCancel();
  };

  return (
    <div style={{
      padding: "24px 16px",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      maxWidth: 1200,
      margin: "0 auto",
    }}>
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12,
        marginBottom: 24,
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#0f172a" }}>
            User Management
          </h2>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "#64748b" }}>
            {filtered.length} of {(users || []).length} users
          </p>
        </div>
        <input
          type="text"
          placeholder="Search name, email or role…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            padding: "9px 14px",
            border: "1.5px solid #e2e8f0",
            borderRadius: 10,
            fontSize: 14,
            outline: "none",
            width: "100%",
            maxWidth: 280,
            color: "#0f172a",
            background: "#fff",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {filtered.map(user => {
          const isEditing = editUserId === user._id;
          return (
            <div key={user._id} style={{
              background: "#fff",
              border: isEditing ? "2px solid #38bdf8" : "1.5px solid #e2e8f0",
              borderRadius: 16,
              padding: "16px 18px",
              boxShadow: isEditing
                ? "0 0 0 3px #e0f2fe"
                : "0 1px 3px rgba(0,0,0,0.04)",
              transition: "border 0.2s, box-shadow 0.2s",
            }}>

              {/* ── Row 1: Avatar + Name + ID + Role badge ── */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <Avatar name={user.name} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <NavLink to={`/admin/useractivity/${user._id}`} style={{ textDecoration: "none" }}>
                    <div style={{
                      fontWeight: 700, fontSize: 15, color: "#0f172a",
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                    }}>
                      {user.name || <span style={{ color: "#94a3b8" }}>No name</span>}
                    </div>
                  </NavLink>
                  <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 1, fontFamily: "monospace" }}>
                    {user._id}
                  </div>
                </div>
                {!isEditing && <RoleBadge role={user.role} />}
              </div>

              {/* ── Row 2: Email + Phone ── */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: 12,
                marginBottom: 12,
                padding: "10px 12px",
                background: "#f8fafc",
                borderRadius: 10,
                border: "1px solid #f1f5f9",
              }}>
                <InfoField label="Email" value={user.email} />
                <InfoField label="Phone" value={user.phone} />
              </div>

              {/* ── Row 3: Role selector (edit mode) ── */}
              {isEditing && (
                <div style={{ marginBottom: 12 }}>
                  <label style={labelStyle}>Role</label>
                  <select
                    value={newRole}
                    onChange={e => setNewRole(e.target.value)}
                    style={{ ...selectStyle, width: "100%" }}
                  >
                    <option value="user">User</option>
                    <option value="shopkeeper">Shopkeeper</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              )}

              {/* ── Row 4: Shop info ── */}
              {isEditing && newRole === "shopkeeper" ? (
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                  gap: 10,
                  marginBottom: 12,
                }}>
                  <div>
                    <label style={labelStyle}>Shop Name</label>
                    <input
                      type="text"
                      value={shopDetails.shopname}
                      placeholder="e.g. Fresh Mart"
                      onChange={e => setShopDetails({ ...shopDetails, shopname: e.target.value })}
                      style={{ ...inputStyle, width: "100%", boxSizing: "border-box" }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Shop Address</label>
                    <input
                      type="text"
                      value={shopDetails.shopaddress}
                      placeholder="e.g. MG Road, Block 4"
                      onChange={e => setShopDetails({ ...shopDetails, shopaddress: e.target.value })}
                      style={{ ...inputStyle, width: "100%", boxSizing: "border-box" }}
                    />
                  </div>
                </div>
              ) : user.shopname ? (
                <div style={{
                  display: "flex", alignItems: "flex-start", gap: 8,
                  background: "#fefce8",
                  border: "1px solid #fde68a",
                  borderRadius: 9,
                  padding: "8px 12px",
                  fontSize: 13,
                  marginBottom: 12,
                  color: "#78350f",
                }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>🏪</span>
                  <div>
                    <div style={{ fontWeight: 600 }}>{user.shopname}</div>
                    {user.shopaddress && (
                      <div style={{ fontSize: 12, color: "#92400e", marginTop: 1 }}>{user.shopaddress}</div>
                    )}
                  </div>
                </div>
              ) : null}

              {/* ── Row 5: Saved addresses ── */}
              {user.address?.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  <label style={labelStyle}>
                    Saved Addresses ({user.address.length})
                  </label>
                  <AddressBlock addresses={user.address} />
                </div>
              )}

              {/* ── Row 6: Action buttons ── */}
              <div style={{
                display: "flex",
                gap: 8,
                justifyContent: "flex-end",
                borderTop: "1px solid #f1f5f9",
                paddingTop: 12,
                marginTop: 4,
              }}>
                {isEditing ? (
                  <>
                    <button onClick={handleCancel} style={btnSecondary}>
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSaveClick(user)}
                      disabled={saving}
                      style={{ ...btnPrimary, opacity: saving ? 0.7 : 1 }}
                    >
                      {saving ? "Saving…" : "Save Changes"}
                    </button>
                  </>
                ) : (
                  <button onClick={() => handleEditClick(user)} style={btnSecondary}>
                    ✏️ Edit Role
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div style={{
            textAlign: "center",
            padding: "48px 24px",
            color: "#94a3b8",
            fontSize: 14,
            border: "1.5px dashed #e2e8f0",
            borderRadius: 16,
          }}>
            {search ? `No users match "${search}"` : "No users found."}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Shared style constants ── */

const labelStyle = {
  fontSize: 11,
  fontWeight: 600,
  color: "#94a3b8",
  letterSpacing: 0.6,
  textTransform: "uppercase",
  marginBottom: 4,
  display: "block",
};

const inputStyle = {
  border: "1.5px solid #e2e8f0",
  padding: "8px 10px",
  borderRadius: 8,
  fontSize: 13,
  color: "#0f172a",
  outline: "none",
  background: "#fff",
};

const selectStyle = {
  border: "1.5px solid #e2e8f0",
  padding: "8px 10px",
  borderRadius: 8,
  fontSize: 13,
  color: "#0f172a",
  background: "#fff",
  outline: "none",
  cursor: "pointer",
};

const btnPrimary = {
  padding: "8px 20px",
  background: "#0ea5e9",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
};

const btnSecondary = {
  padding: "8px 18px",
  background: "#fff",
  color: "#475569",
  border: "1.5px solid #e2e8f0",
  borderRadius: 8,
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
};