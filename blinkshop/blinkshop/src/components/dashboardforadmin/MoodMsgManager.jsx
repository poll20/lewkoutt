// import React, { useState, useEffect } from "react";
// import { useDashboard } from "./DashboardContext";

// const MoodMagManager = () => {
//   const { moodmsgs, moodmsg, deleteMoodMsg, updateMoodMsg } = useDashboard(); // moodmsg = add fn
//   const [form, setForm] = useState({ moodtype: "", msgwithoffer: "", msgwithoutoffer: "" });
//   const [editId, setEditId] = useState(null); // null means add mode

//   const handleEdit = (msg) => {
//     setForm({
//       moodtype: msg.moodtype,
//       msgwithoffer: msg.msgwithoffer,
//       msgwithoutoffer: msg.msgwithoutoffer,
//     });
//     setEditId(msg._id);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this message?")) {
//       await deleteMoodMsg(id);
//     }
//   };

//   return (
//     <div style={{ padding: "1rem", maxWidth: "600px", margin: "auto", fontFamily: "'Segoe UI', sans-serif" }}>
//       <h2 style={{ color: "#4F46E5", textAlign: "center" }}>Manage Mood Messages</h2>

//       {/* Form */}
//       <form onSubmit={handleSubmit} style={{ background: "#f9f9f9", padding: "1rem", borderRadius: "1rem", marginBottom: "2rem" }}>
//         <input
//           name="moodtype"
//           value={form.moodtype}
//           onChange={handleChange}
//           placeholder="Mood Type (e.g. sad, sleepy)"
//           required
//           style={inputStyle}
//         />
//         <textarea
//           name="msgwithoffer"
//           value={form.msgwithoffer}
//           onChange={handleChange}
//           placeholder="Message with offer"
//           rows={3}
//           required
//           style={inputStyle}
//         />
//         <textarea
//           name="msgwithoutoffer"
//           value={form.msgwithoutoffer}
//           onChange={handleChange}
//           placeholder="Message without offer"
//           rows={3}
//           required
//           style={inputStyle}
//         />
//         <button type="submit" style={btnStyle}>
//           {editId ? "Update Message" : "Add Message"}
//         </button>
//       </form>

//       {/* List */}
//       {moodmsgs && moodmsgs.length > 0 ? (
//         moodmsgs.map((msg) => (
//           <div
//             key={msg._id}
//             style={{
//               border: "1px solid #ccc",
//               borderRadius: "0.8rem",
//               padding: "1rem",
//               marginBottom: "1rem",
//               background: "#fff",
//             }}
//           >
//             <h4 style={{ marginBottom: "0.5rem" }}>
//               <span style={{ color: "#4F46E5" }}>Mood:</span> {msg.moodtype}
//             </h4>
//             <p><strong>With Offer:</strong> {msg.msgwithoffer}</p>
//             <p><strong>Without Offer:</strong> {msg.msgwithoutoffer}</p>

//             <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
//               <button onClick={() => handleEdit(msg)} style={{ ...btnStyle, background: "#06b6d4" }}>Edit</button>
//               <button onClick={() => handleDelete(msg._id)} style={{ ...btnStyle, background: "#ef4444" }}>Delete</button>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p style={{ textAlign: "center", color: "#888" }}>No mood messages found.</p>
//       )}
//     </div>
//   );
// };

// // 🔧 Styles
// const inputStyle = {
//   width: "100%",
//   padding: "0.6rem",
//   marginBottom: "1rem",
//   borderRadius: "0.5rem",
//   border: "1px solid #ccc",
// };

// const btnStyle = {
//   padding: "0.6rem 1rem",
//   backgroundColor: "#4F46E5",
//   color: "#fff",
//   border: "none",
//   borderRadius: "0.5rem",
//   fontWeight: "bold",
//   cursor: "pointer",
// };

// export default MoodMagManager;
import React, { useState } from "react";
import { useDashboard } from "./DashboardContext";

const MoodMagManager = () => {
    const { moodmsgs,deleteMoodMsg,updateMoodMsg } = useDashboard(); // moodmsg = add fn
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    moodemoji:"",
    moodcolor:"",
    moodtype: "",
    msgwithoffer: "",
    msgwithoutoffer: ""
  });
if(moodmsgs){
    console.log("msg agya naaa wha se ",moodmsgs)
}
  const handleEditClick = (msg) => {
    setEditingId(msg._id);
    setEditForm({
        moodemoji:msg.moodemoji,
        moodcolor:msg.moodcolor,
      moodtype: msg.moodtype,
      msgwithoffer: msg.msgwithoffer,
      msgwithoutoffer: msg.msgwithoutoffer
    });
  };

  const handleSave = (id)=> {
    console.log("Updated Message:", editForm);
    // TODO: Replace this console.log with an actual API call
    // axios.put(`/api/moodmsg/${editingId}`, editForm)

    setEditingId(null); // Exit edit mode
    updateMoodMsg(id,editForm)
  };

  const handleDelete = (id) => {
    console.log("Deleting message with ID:", id);
    deleteMoodMsg(id)
    // TODO: Replace this console.log with actual delete API
    // axios.delete(`/api/moodmsg/${id}`)
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "700px", margin: "auto", fontFamily: "'Segoe UI', sans-serif" }}>
      <h2 style={{ color: "#4F46E5", textAlign: "center" }}>Mood Messages</h2>

      {moodmsgs && moodmsgs.returns?.length > 0 ? (
        moodmsgs.returns?.map((msg) => (
          <div
            key={msg._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "0.8rem",
              padding: "1rem",
              marginBottom: "1rem",
              background: "#fff"
            }}
          >
            {editingId === msg._id ? (
              <>
               <input
                  name="moodemoji"
                  value={editForm.moodemoji}
                  onChange={handleChange}
                  style={inputStyle}
                />
                 <input
                  name="moodcolor"
                  value={editForm.moodcolor}
                  onChange={handleChange}
                  style={inputStyle}
                />
                <input
                  name="moodtype"
                  value={editForm.moodtype}
                  onChange={handleChange}
                  style={inputStyle}
                />
                <textarea
                  name="msgwithoffer"
                  value={editForm.msgwithoffer}
                  onChange={handleChange}
                  rows={3}
                  style={inputStyle}
                />
                <textarea
                  name="msgwithoutoffer"
                  value={editForm.msgwithoutoffer}
                  onChange={handleChange}
                  rows={3}
                  style={inputStyle}
                />
                <button onClick={()=>{handleSave(msg._id)}} style={{ ...btnStyle, backgroundColor: "#10b981" }}>
                  Save
                </button>
              </>
            ) : (
              <>
                <p><strong>Mood emoji:</strong> {msg.moodemoji}</p>
                <p><strong>Mood Color:</strong> {msg.moodcolor}</p>
                <h4><span style={{ color: "#4F46E5" }}>Mood:</span> {msg.moodtype}</h4>
                
                <p><strong>With Offer:</strong> {msg.msgwithoffer}</p>
                <p><strong>Without Offer:</strong> {msg.msgwithoutoffer}</p>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                  <button onClick={() => handleEditClick(msg)} style={{ ...btnStyle, backgroundColor: "#06b6d4" }}>Edit</button>
                  <button onClick={() => handleDelete(msg._id)} style={{ ...btnStyle, backgroundColor: "#ef4444" }}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center", color: "gray" }}>No mood messages found.</p>
      )}
    </div>
  );
};

// 🔧 Inline CSS
const inputStyle = {
  width: "100%",
  padding: "0.6rem",
  marginBottom: "1rem",
  borderRadius: "0.5rem",
  border: "1px solid #ccc",
};

const btnStyle = {
  padding: "0.6rem 1rem",
  color: "#fff",
  border: "none",
  borderRadius: "0.5rem",
  fontWeight: "bold",
  cursor: "pointer",
};

export default MoodMagManager;
