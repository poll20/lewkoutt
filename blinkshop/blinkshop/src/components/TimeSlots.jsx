// import React, { useState } from 'react';
// import { useBio } from './BioContext';

// const timeSlots = [
//   { label: 'Within 60 minutes', start: 0, end: 1 },
//   { label: '11:00 AM – 1:00 PM', start: 11, end: 13 },
//   { label: '1:00 PM – 3:00 PM', start: 13, end: 15 },
//   { label: '3:00 PM – 5:00 PM', start: 15, end: 17 },
//   { label: '5:00 PM – 7:00 PM', start: 17, end: 19 },
//   { label: '7:00 PM – 9:00 PM', start: 19, end: 21 },
// ];

// export default function DeliveryTimeSlot() {
//   const [selectedSlot, setSelectedSlot] = useState(null);
// //   const [selectedDate, setSelectedDate] = useState(null);
// const [selectedDate, setSelectedDate] = useState(() => {
//     const tomorrow = new Date();
//     tomorrow.setDate(tomorrow.getDate() );
//     return tomorrow.toISOString().split("T")[0];
//   });
  
// const { settimeslotlelo,distance } = useBio();
// const [allOtherSlotsDisabled, setAlldisabled] = useState(false);

// const isDisabled = (slot) => {
//   const now = new Date();
//   const selected = new Date(selectedDate);
//   const distanceInKm = parseFloat(distance?.replace("km", "").trim());


//  // ✅ Special case: Tomorrow ke liye "Within 60 minutes" hamesha disable
//   const tomorrow = new Date();
//   tomorrow.setDate(now.getDate() + 1);

//   if (
//     slot.label === "Within 60 minutes" &&
//     selected.toDateString() === tomorrow.toDateString()
//   ) {
//     return true;
//   }



//   // ✅ For "Within 60 minutes" slot
//   if (slot.label === 'Within 60 minutes') {
//     // ❌ Disable if distance > 10 km for any day
//     if (!isNaN(distanceInKm) && distanceInKm > 10) return true;

//     // ✅ Disable if it's past 9 PM today
//     if (
//       selected.toDateString() === now.toDateString() &&
//       now.getHours() >= 21
//     ) {
//       return true;
//     }

//     // ✅ Disable if all other slots are disabled
//     const otherSlots = timeSlots.filter(s => s.label !== 'Within 60 minutes');
//     const allOtherSlotsDisabled = otherSlots.every(s => isDisabled(s));

//     if (allOtherSlotsDisabled){
//       setAlldisabled(allOtherSlotsDisabled)
//     return true;
//     }

//     return false;
//   }

//   // ✅ For future dates (like tomorrow), don't disable normal slots
//   if (selected > now) return false;

//   // ✅ For normal slots today, check time
//   const slotEndTime = new Date(now);
//   slotEndTime.setHours(slot.end, 0, 0, 0);
//   const minutesRemaining = (slotEndTime - now) / (1000 * 60);

//   if (minutesRemaining <= 0 || minutesRemaining < 60) return true;

//   return false;
// };

// if(distance){
//   console.log("distance hai i",distance)
// }


//   const handleSelect = (slotLabel) => {
//     setSelectedSlot(slotLabel);
//   };



// // 📅 Handle Date Change
// const handleDateChange = (e) => {
//     const selected = new Date(e.target.value);
//     const today = new Date();
//     const tomorrow = new Date();
//     today.setHours(0, 0, 0, 0);
//     tomorrow.setDate(today.getDate() + 1);
//     tomorrow.setHours(0, 0, 0, 0);
  
//     // Allow only today and tomorrow
//     if (
//       selected.toDateString() !== today.toDateString() &&
//       selected.toDateString() !== tomorrow.toDateString()
//     ) {
//       alert("Please select either today or tomorrow only.");
  
//       // Reset to tomorrow
//       const formattedTomorrow = tomorrow.toISOString().split("T")[0];
//       setSelectedDate(formattedTomorrow);
      
//     } else {
//       setSelectedDate(e.target.value);
//     }

    
//   };
  
//   if (selectedSlot) {
//     settimeslotlelo(selectedSlot);
//   }
// const allDisabled = timeSlots.every((slot) => isDisabled(slot));
//   return (
// //     <div className="max-w-md mx-auto p-4 border rounded-lg shadow-sm">
// //       {parseFloat(distance?.replace("km", "").trim()) > 10 ? (
// //   <span>You’re a lil’ out of our speed zone 👀 So the 60-min ride won’t make it… but other slots are waiting to be picked 💅</span>
// // ) : (
// //   ''
// // )}
// //       <h2 className="text-xl font-bold mb-2">
// //         Delivery Time Slot <span className="text-gray-500 text-sm">(Required)</span>
// //       </h2>

// //       {/* Calendar button & input */}
// //       <button
// //         className="mb-3 bg-green-600 hover:bg-green-700 text-black py-2 px-4 rounded w-full"
// //         onClick={() => document.getElementById('datePicker').showPicker()}
// //       >
// //         Select Delivery Date
// //       </button>
   
// //       <input
// //   id="datePicker"
// //   type="date"
// //   value={selectedDate}
// //   onChange={handleDateChange}
// //   className="mb-4 w-full p-2 border rounded"
// //   min={new Date().toISOString().split('T')[0]}
// //   max={new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]}
// // />

// //       <p className="font-semibold mb-2">Select Time Window:</p>

// //       {timeSlots.map((slot, index) => {
// //         const disabled = isDisabled(slot);
// //         return (
       
// //         <label
// //   key={index}
// //   style={{
// //     display: 'flex',
// //     alignItems: 'center',
// //     marginBottom: '8px',
// //     cursor: disabled ? 'not-allowed' : 'pointer',
// //     padding: '8px',
// //     borderRadius: '4px',
// //     backgroundColor: disabled ? '#fee2e2' : 'transparent', // light red background
// //     border: disabled ? '1px solid #dc2626' : '1px solid #d1d5db', // red or gray border
// //     color: disabled ? '#b91c1c' : '#000000', // red text for disabled
// //     opacity: disabled ? 0.7 : 1,
// //     transition: 'background-color 0.3s',
// //   }}
// //   onMouseEnter={(e) => {
// //     if (!disabled) e.currentTarget.style.backgroundColor = '#f3f4f6'; // light gray on hover
// //   }}
// //   onMouseLeave={(e) => {
// //     if (!disabled) e.currentTarget.style.backgroundColor = 'transparent';
// //   }}
// // >
// //   <input
// //     type="radio"
// //     name="delivery-slot"
// //     value={slot.label}
// //     disabled={disabled}
// //     checked={selectedSlot === slot.label}
// //     onChange={() => handleSelect(slot.label)}
// //     style={{ marginRight: '8px' }}
// //   />
// //   <span style={{ marginLeft: '4px', fontWeight: '300' }}>{slot.label}</span>
// // </label>

// //         );
// //       })}

// //       <button
// //         style={{ width: '100%'}}
// //         className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
// //         disabled={!selectedSlot}
// //         onClick={() => alert(`Slot confirmed: ${selectedSlot}`)}
// //       >
// //         Confirm Slot
// //       </button>
// //     </div>
// <div
//   style={{
//     border:"2px solid blue",
//     maxWidth: "28rem", // max-w-md
//     marginLeft: "auto", // mx-auto
//     marginRight: "auto",
//     padding: "1rem", // p-4
//     border: "1px solid #e5e7eb", // border gray-200
//     borderRadius: "0.5rem", // rounded-lg
//     boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)", // shadow-sm
//   }}
// >
//   {parseFloat(distance?.replace("km", "").trim()) > 10 ? (
//     <span>
//       You’re a lil’ out of our speed zone 👀 So the 60-min ride won’t make it… but
//       other slots are waiting to be picked 💅
//     </span>
//   ) : (
//     ""
//   )}

//   <h2
//     style={{
//       fontSize: "1.25rem", // text-xl
//       fontWeight: "700", // font-bold
//       marginBottom: "0.5rem", // mb-2
//     }}
//   >
//     Delivery Time Slot{" "}
//     <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
//       (Required)
//     </span>
//   </h2>

//   {/* Calendar button */}
//   <button
//     style={{
//       marginBottom: "0.75rem", // mb-3
//       backgroundColor: "black", // bg-green-600
//       color: "white",
//       paddingTop: "0.5rem", // py-2
//       paddingBottom: "0.5rem",
//       paddingLeft: "1rem", // px-4
//       paddingRight: "1rem",
//       borderRadius: "0.25rem", // rounded
//       width: "100%", // w-full
//       cursor: "pointer",
//     }}
//     onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#15803d")} // hover:bg-green-700
//     onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#16a34a")}
//     onClick={() => document.getElementById("datePicker").showPicker()}
//   >
//     Select Delivery Date
//   </button>

//   <input
//     id="datePicker"
//     type="date"
//     value={selectedDate}
//     onChange={handleDateChange}
//     min={new Date().toISOString().split("T")[0]}
//     max={new Date(
//       new Date().setDate(new Date().getDate() + 1)
//     ).toISOString().split("T")[0]}
//     style={{
//       marginBottom: "1rem", // mb-4
//       width: "100%", // w-full
//       padding: "0.5rem", // p-2
//       border: "1px solid #d1d5db", // border
//       borderRadius: "0.25rem", // rounded
//     }}
//   />

//   <p style={{ fontWeight: "600", marginBottom: "0.5rem" }}>
//     Select Time Window:
//   </p>

//   {timeSlots.map((slot, index) => {
//     const disabled = isDisabled(slot);
//     return (
//       <label
//         key={index}
//         style={{
//           display: "flex",
//           alignItems: "center",
//           // justifyContent:"center",
//           marginBottom: "8px",
//           cursor: disabled ? "not-allowed" : "pointer",
//           padding: "8px",
//           borderRadius: "4px",
//           backgroundColor: disabled ? "#fee2e2" : "transparent", // light red if disabled
//           border: disabled ? "1px solid #dc2626" : "1px solid #d1d5db", // red or gray
//           color: disabled ? "#b91c1c" : "#000000",
//           opacity: disabled ? 0.7 : 1,
//           transition: "background-color 0.3s",
//           // border:"2px solid blue"
//         }}
//         onMouseEnter={(e) => {
//           if (!disabled) e.currentTarget.style.backgroundColor = "#f3f4f6"; // gray-100
//         }}
//         onMouseLeave={(e) => {
//           if (!disabled) e.currentTarget.style.backgroundColor = "transparent";
//         }}
//       >
//         <span style={{ marginLeft: "4px", fontWeight: "300",width:"500px" }}>
//           {slot.label}
//         </span>
//         <input
//           type="radio"
//           name="delivery-slot"
//           value={slot.label}
//           disabled={disabled}
//           checked={selectedSlot === slot.label}
//           onChange={() => handleSelect(slot.label)}
//           style={{ marginRight: "2px" ,width:"100%"}}
//         />
        
//       </label>
//     );
//   })}

//   {/* ✅ Pretty Message When All Slots Disabled */}
//       {allDisabled && (
//         <div
//           style={{
//             marginTop: "1rem",
//             marginBottom: "10px",
//             padding: "5px",
//             backgroundColor: "white",
//             // border: "1px solid red",
//             borderRadius: "0.5rem",
//             textAlign: "center",
//             // fontFamily: "'Dancing Script', cursive",
//             fontSize: "12px",
            
//             color: "black",
//           }}
//         >
//           <span>Fashion never sleeps, but our riders do 💤</span><br></br>
//           <span>Please select Tomorrow's date</span>
//         </div>
//       )}

//   <button
//     style={{
//       marginTop: "1rem", // mt-4
//       backgroundColor: "black", // bg-blue-600
//       color: "white",
//       paddingTop: "0.5rem",
//       paddingBottom: "0.5rem",
//       paddingLeft: "1rem",
//       paddingRight: "1rem",
//       borderRadius: "0.25rem",
//       width: "100%",
//       cursor: "pointer",
//     }}
//     onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1d4ed8")} // hover:bg-blue-700
//     onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
//     disabled={!selectedSlot}
//     onClick={() => alert(`Slot confirmed: ${selectedSlot}`)}
//   >
//     Confirm Slot
//   </button>
// </div>

//   );
// }

import React, { useState } from "react";
import { useBio } from "./BioContext";

const timeSlots = [
  { label: "Within 60 minutes", start: 0, end: 1 },
  { label: "11:00 AM – 1:00 PM", start: 11, end: 13 },
  { label: "1:00 PM – 3:00 PM", start: 13, end: 15 },
  { label: "3:00 PM – 5:00 PM", start: 15, end: 17 },
  { label: "5:00 PM – 7:00 PM", start: 17, end: 19 },
  { label: "7:00 PM – 9:00 PM", start: 19, end: 21 },
];

export default function DeliveryTimeSlot() {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const { settimeslotlelo, distance } = useBio();

  const isDisabled = (slot) => {
    const now = new Date();
    const selected = new Date(selectedDate);
    const distanceInKm = parseFloat(distance?.replace("km", "").trim());
    const tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);

    // ✅ Disable "Within 60 minutes" for tomorrow always
    if (
      slot.label === "Within 60 minutes" &&
      selected.toDateString() === tomorrow.toDateString()
    ) {
      return true;
    }

    // ✅ For "Within 60 minutes" slot (special behavior)
    if (slot.label === "Within 60 minutes") {
      // ❌ Disable if distance > 10 km
      if (!isNaN(distanceInKm) && distanceInKm > 10) return true;

      // ✅ Only active exactly at 11 AM (between 11:00 AM and 11:59 AM)
      if (
        selected.toDateString() === now.toDateString() &&
        now.getHours() === 11
      ) {
        return false; // active only during 11 AM hour
      } else {
        return true; // disabled before or after 11 AM
      }
    }

    // ✅ For future dates (like tomorrow), normal slots are always active
    if (selected > now) return false;

    // ✅ For normal slots today
    const slotEndTime = new Date(now);
    slotEndTime.setHours(slot.end, 0, 0, 0);
    const minutesRemaining = (slotEndTime - now) / (1000 * 60);

    // Disable if time slot already passed or less than 60 min left
    if (minutesRemaining <= 0 || minutesRemaining < 60) return true;

    return false;
  };

  const handleSelect = (slotLabel) => setSelectedSlot(slotLabel);

  const handleDateChange = (e) => {
    const selected = new Date(e.target.value);
    const today = new Date();
    const tomorrow = new Date();
    today.setHours(0, 0, 0, 0);
    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    // Only allow today or tomorrow
    if (
      selected.toDateString() !== today.toDateString() &&
      selected.toDateString() !== tomorrow.toDateString()
    ) {
      alert("Please select either today or tomorrow only.");
      const formattedTomorrow = tomorrow.toISOString().split("T")[0];
      setSelectedDate(formattedTomorrow);
    } else {
      setSelectedDate(e.target.value);
    }
  };

  if (selectedSlot) settimeslotlelo(selectedSlot);

  const allDisabled = timeSlots.every((slot) => isDisabled(slot));

  return (
    <div
      style={{
        border: "2px solid blue",
        maxWidth: "28rem",
        margin: "auto",
        padding: "1rem",
        borderRadius: "0.5rem",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
      }}
    >
      {parseFloat(distance?.replace("km", "").trim()) > 10 && (
        <span>
          You’re a lil’ out of our speed zone 👀 So the 60-min ride won’t make
          it… but other slots are waiting to be picked 💅
        </span>
      )}

      <h2 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "0.5rem" }}>
        Delivery Time Slot{" "}
        <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>(Required)</span>
      </h2>

      <button
        style={{
          marginBottom: "0.75rem",
          backgroundColor: "black",
          color: "white",
          padding: "0.5rem 1rem",
          borderRadius: "0.25rem",
          width: "100%",
          cursor: "pointer",
        }}
        onClick={() => document.getElementById("datePicker").showPicker()}
      >
        Select Delivery Date
      </button>

      <input
        id="datePicker"
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        min={new Date().toISOString().split("T")[0]}
        max={new Date(
          new Date().setDate(new Date().getDate() + 1)
        ).toISOString().split("T")[0]}
        style={{
          marginBottom: "1rem",
          width: "100%",
          padding: "0.5rem",
          border: "1px solid #d1d5db",
          borderRadius: "0.25rem",
        }}
      />

      <p style={{ fontWeight: "600", marginBottom: "0.5rem" }}>
        Select Time Window:
      </p>

      {timeSlots.map((slot, index) => {
        const disabled = isDisabled(slot);
        return (
          <label
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
              cursor: disabled ? "not-allowed" : "pointer",
              padding: "8px",
              borderRadius: "4px",
              backgroundColor: disabled ? "#fee2e2" : "transparent",
              border: disabled ? "1px solid #dc2626" : "1px solid #d1d5db",
              color: disabled ? "#b91c1c" : "#000",
              opacity: disabled ? 0.7 : 1,
              transition: "background-color 0.3s",
            }}
          >
            <span style={{ marginLeft: "4px", fontWeight: "300", flex: 1 }}>
              {slot.label}
            </span>
            <input
              type="radio"
              name="delivery-slot"
              value={slot.label}
              disabled={disabled}
              checked={selectedSlot === slot.label}
              onChange={() => handleSelect(slot.label)}
            />
          </label>
        );
      })}

      {allDisabled && (
        <div
          style={{
            marginTop: "1rem",
            padding: "5px",
            backgroundColor: "white",
            borderRadius: "0.5rem",
            textAlign: "center",
            fontSize: "12px",
            color: "black",
          }}
        >
          <span>Fashion never sleeps, but our riders do 💤</span>
          <br />
          <span>Please select Tomorrow's date</span>
        </div>
      )}

      <button
        style={{
          marginTop: "1rem",
          backgroundColor: "black",
          color: "white",
          padding: "0.5rem 1rem",
          borderRadius: "0.25rem",
          width: "100%",
          cursor: "pointer",
        }}
        disabled={!selectedSlot}
        onClick={() => alert(`Slot confirmed: ${selectedSlot}`)}
      >
        Confirm Slot
      </button>
    </div>
  );
}
