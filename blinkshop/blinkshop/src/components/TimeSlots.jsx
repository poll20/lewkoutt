// import React, { useState, useEffect } from 'react';

// const timeSlots = [
//     { label: 'Within 60 minutes', start: 0, end: 1 },
//     { label: '11:00 AM – 1:00 PM', start: 11, end: 13 },
//     { label: '1:00 PM – 3:00 PM', start: 13, end: 15 },
//     { label: '3:00 PM – 5:00 PM', start: 15, end: 17 },
//     { label: '5:00 PM – 7:00 PM', start: 17, end: 19 },
//     { label: '7:00 PM – 9:00 PM', start: 19, end: 21 },
//   ];

// export default function DeliveryTimeSlot() {
//     const [selectedSlot, setSelectedSlot] = useState(null);

//     const now = new Date();
//     const currentHour = now.getHours();
//     const currentMinutes = now.getMinutes();
  
//     const isDisabled = (slot) => {
//       const slotEnd = slot.end;
//       const slotStart = slot.start;
//       const currentTotalMinutes = currentHour * 60 + currentMinutes;
//       const slotStartMinutes = slotStart * 60;
  
//       // Condition 1: If current time is past the end of the slot
//       if (currentHour >= slotEnd) return true;
  
//       // Condition 2: If remaining time is less than 60 minutes
//       if ((slotStartMinutes - currentTotalMinutes) < 60) return true;
  
//       return false;
//     };
  
//     const handleSelect = (slotLabel) => {
//       setSelectedSlot(slotLabel);
//     };

//   return (
//     // <div className="max-w-md p-4 mx-auto mt-10 border rounded shadow">
//     //   <h2 className="text-xl font-bold mb-1">Delivery Time Slot <span className="text-gray-500 text-sm">(Required)</span></h2>
//     //   <p className="mb-2 font-semibold">Select Time Window:</p>

//     //   <div className="space-y-2">
//     //     {timeSlots.map((slot, idx) => (
//     //       <label key={idx} className="flex items-center space-x-2">
//     //         <input
//     //           type="radio"
//     //           value={slot.label}
//     //           checked={selectedSlot === slot.label}
//     //           onChange={handleChange}
//     //           disabled={disabledSlots.includes(slot.label)}
//     //           className="accent-blue-600"
//     //         />
//     //         <span style={{fontWeight:"lighter",marginLeft:"4px"}} className={disabledSlots.includes(slot.label) ? 'text-gray-400' : 'text-black'}>{slot.label}</span>
//     //       </label>
//     //     ))}
//     //   </div>

//     //   <button
//     //     onClick={handleConfirm}
//     //     style={{color:"white",width:"100%"}}
//     //     // className="w-full mt-6 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//     //   >
//     //     Confirm Slot
//     //   </button>
//     // </div>
//     <div className="max-w-md mx-auto p-4 border rounded-lg shadow-sm">
//     <h2 className="text-xl font-bold mb-2">Delivery Time Slot <span className="text-gray-500 text-sm">(Required)</span></h2>
//     <p className="font-semibold mb-4">Select Time Window:</p>
    
//     {timeSlots.map((slot, index) => {
//       const disabled = isDisabled(slot);
//       return (
//         <label key={index} className={`flex items-center mb-2 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
//           <input
//             type="radio"
//             name="delivery-slot"
//             value={slot.label}
//             disabled={disabled}
//             checked={selectedSlot === slot.label}
//             onChange={() => handleSelect(slot.label)}
//             className="mr-2"
//           />
//           {slot.label}
//         </label>
//       );
//     })}

//     <button
//       className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
//       disabled={!selectedSlot}
//       onClick={() => alert(`Slot confirmed: ${selectedSlot}`)}
//     >
//       Confirm Slot
//     </button>
//   </div>
//   );
// }

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
//   const {settimeslotlelo}=useBio()
//   const isDisabled = (slot) => {
//     const now = new Date();

//     if (slot.label === 'Within 60 minutes') return false;

//     const slotEndTime = new Date(now);
//     slotEndTime.setHours(slot.end, 0, 0, 0);

//     const minutesRemaining = (slotEndTime - now) / (1000 * 60);

//     if (minutesRemaining <= 0) return true;
//     if (minutesRemaining < 60) return true;

//     return false;
//   };

//   const handleSelect = (slotLabel) => {
//     setSelectedSlot(slotLabel);
//   };

//   if(selectedSlot){
//     settimeslotlelo(selectedSlot)
//   }
//   return (
//     <div className="max-w-md mx-auto p-4 border rounded-lg shadow-sm">
//       <h2 className="text-xl font-bold mb-2">
//         Delivery Time Slot <span className="text-gray-500 text-sm">(Required)</span>
//       </h2>
//       <p className="font-semibold mb-2">Select Time Window:</p>

//       {timeSlots.map((slot, index) => {
//         const disabled = isDisabled(slot);
//         return (
//           <label
          
//             key={index}
//             className={`flex items-center mb-2 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
//           >
//             <input
           
//               type="radio"
//               name="delivery-slot"
//               value={slot.label}
//               disabled={disabled}
//               checked={selectedSlot === slot.label}
//               onChange={() => handleSelect(slot.label)}
//               className="mr-2"
//             />
//             <span style={{marginLeft:"4px", fontWeight:"lighter"}}> {slot.label}</span>
//           </label>
//         );
//       })}

//       <button
//       style={{width:"100%"}}
//         className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
//         disabled={!selectedSlot}
//         onClick={() => alert(`Slot confirmed: ${selectedSlot}`)}
//       >
//         Confirm Slot
//       </button>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { useBio } from './BioContext';

const timeSlots = [
  { label: 'Within 60 minutes', start: 0, end: 1 },
  { label: '11:00 AM – 1:00 PM', start: 11, end: 13 },
  { label: '1:00 PM – 3:00 PM', start: 13, end: 15 },
  { label: '3:00 PM – 5:00 PM', start: 15, end: 17 },
  { label: '5:00 PM – 7:00 PM', start: 17, end: 19 },
  { label: '7:00 PM – 9:00 PM', start: 19, end: 21 },
];

export default function DeliveryTimeSlot() {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const { settimeslotlelo } = useBio();

  const isDisabled = (slot) => {
    const now = new Date();

    // If user selected tomorrow, none are disabled
    if (selectedDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const selected = new Date(selectedDate);
      if (
        selected.getDate() === tomorrow.getDate() &&
        selected.getMonth() === tomorrow.getMonth() &&
        selected.getFullYear() === tomorrow.getFullYear()
      ) {
        return false;
      }
    }

    // Otherwise, today: disable past slots
    if (slot.label === 'Within 60 minutes') return false;

    const slotEndTime = new Date(now);
    slotEndTime.setHours(slot.end, 0, 0, 0);

    const minutesRemaining = (slotEndTime - now) / (1000 * 60);

    if (minutesRemaining <= 0) return true;
    if (minutesRemaining < 60) return true;

    return false;
  };

  const handleSelect = (slotLabel) => {
    setSelectedSlot(slotLabel);
  };

  const handleDateChange = (e) => {
    const selected = new Date(e.target.value);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (
      selected.getDate() === tomorrow.getDate() &&
      selected.getMonth() === tomorrow.getMonth() &&
      selected.getFullYear() === tomorrow.getFullYear()
    ) {
      setSelectedDate(e.target.value);
      setSelectedSlot(null); // Reset previous selection
    } else {
      alert("You can only select tomorrow's date.");
      setSelectedDate(null);
    }
  };

  if (selectedSlot) {
    settimeslotlelo(selectedSlot);
  }

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-2">
        Delivery Time Slot <span className="text-gray-500 text-sm">(Required)</span>
      </h2>

      {/* Calendar button & input */}
      <button
        className="mb-3 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded w-full"
        onClick={() => document.getElementById('datePicker').showPicker()}
      >
        Select Delivery Date
      </button>
      <input
        id="datePicker"
        type="date"
        onChange={handleDateChange}
        className="mb-4 w-full p-2 border rounded"
        min={new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]}
      />

      <p className="font-semibold mb-2">Select Time Window:</p>

      {timeSlots.map((slot, index) => {
        const disabled = isDisabled(slot);
        return (
          <label
            key={index}
            className={`flex items-center mb-2 cursor-pointer ${
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <input
              type="radio"
              name="delivery-slot"
              value={slot.label}
              disabled={disabled}
              checked={selectedSlot === slot.label}
              onChange={() => handleSelect(slot.label)}
              className="mr-2"
            />
            <span style={{ marginLeft: '4px', fontWeight: 'lighter' }}>{slot.label}</span>
          </label>
        );
      })}

      <button
        style={{ width: '100%' }}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
        disabled={!selectedSlot}
        onClick={() => alert(`Slot confirmed: ${selectedSlot}`)}
      >
        Confirm Slot
      </button>
    </div>
  );
}
