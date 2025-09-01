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
//   const [selectedDate, setSelectedDate] = useState(null);
const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() );
    return tomorrow.toISOString().split("T")[0];
  });
  
const { settimeslotlelo,distance } = useBio();


const isDisabled = (slot) => {
  const now = new Date();
  const selected = new Date(selectedDate);
  const distanceInKm = parseFloat(distance?.replace("km", "").trim());


 // ✅ Special case: Tomorrow ke liye "Within 60 minutes" hamesha disable
  const tomorrow = new Date();
  tomorrow.setDate(now.getDate() + 1);

  if (
    slot.label === "Within 60 minutes" &&
    selected.toDateString() === tomorrow.toDateString()
  ) {
    return true;
  }



  // ✅ For "Within 60 minutes" slot
  if (slot.label === 'Within 60 minutes') {
    // ❌ Disable if distance > 10 km for any day
    if (!isNaN(distanceInKm) && distanceInKm > 10) return true;

    // ✅ Disable if it's past 9 PM today
    if (
      selected.toDateString() === now.toDateString() &&
      now.getHours() >= 21
    ) {
      return true;
    }

    // ✅ Disable if all other slots are disabled
    const otherSlots = timeSlots.filter(s => s.label !== 'Within 60 minutes');
    const allOtherSlotsDisabled = otherSlots.every(s => isDisabled(s));

    if (allOtherSlotsDisabled) return true;

    return false;
  }

  // ✅ For future dates (like tomorrow), don't disable normal slots
  if (selected > now) return false;

  // ✅ For normal slots today, check time
  const slotEndTime = new Date(now);
  slotEndTime.setHours(slot.end, 0, 0, 0);
  const minutesRemaining = (slotEndTime - now) / (1000 * 60);

  if (minutesRemaining <= 0 || minutesRemaining < 60) return true;

  return false;
};

if(distance){
  console.log("distance hai i",distance)
}


  const handleSelect = (slotLabel) => {
    setSelectedSlot(slotLabel);
  };



// 📅 Handle Date Change
const handleDateChange = (e) => {
    const selected = new Date(e.target.value);
    const today = new Date();
    const tomorrow = new Date();
    today.setHours(0, 0, 0, 0);
    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
  
    // Allow only today and tomorrow
    if (
      selected.toDateString() !== today.toDateString() &&
      selected.toDateString() !== tomorrow.toDateString()
    ) {
      alert("Please select either today or tomorrow only.");
  
      // Reset to tomorrow
      const formattedTomorrow = tomorrow.toISOString().split("T")[0];
      setSelectedDate(formattedTomorrow);
      
    } else {
      setSelectedDate(e.target.value);
    }

    
  };
  
  if (selectedSlot) {
    settimeslotlelo(selectedSlot);
  }

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-sm">
      {parseFloat(distance?.replace("km", "").trim()) > 10 ? (
  <span>You’re a lil’ out of our speed zone 👀 So the 60-min ride won’t make it… but other slots are waiting to be picked 💅</span>
) : (
  ''
)}
      <h2 className="text-xl font-bold mb-2">
        Delivery Time Slot <span className="text-gray-500 text-sm">(Required)</span>
      </h2>

      {/* Calendar button & input */}
      <button
        className="mb-3 bg-green-600 hover:bg-green-700 text-black py-2 px-4 rounded w-full"
        onClick={() => document.getElementById('datePicker').showPicker()}
      >
        Select Delivery Date
      </button>
   
      <input
  id="datePicker"
  type="date"
  value={selectedDate}
  onChange={handleDateChange}
  className="mb-4 w-full p-2 border rounded"
  min={new Date().toISOString().split('T')[0]}
  max={new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]}
/>

      <p className="font-semibold mb-2">Select Time Window:</p>

      {timeSlots.map((slot, index) => {
        const disabled = isDisabled(slot);
        return (
       
        <label
  key={index}
  style={{
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    padding: '8px',
    borderRadius: '4px',
    backgroundColor: disabled ? '#fee2e2' : 'transparent', // light red background
    border: disabled ? '1px solid #dc2626' : '1px solid #d1d5db', // red or gray border
    color: disabled ? '#b91c1c' : '#000000', // red text for disabled
    opacity: disabled ? 0.7 : 1,
    transition: 'background-color 0.3s',
  }}
  onMouseEnter={(e) => {
    if (!disabled) e.currentTarget.style.backgroundColor = '#f3f4f6'; // light gray on hover
  }}
  onMouseLeave={(e) => {
    if (!disabled) e.currentTarget.style.backgroundColor = 'transparent';
  }}
>
  <input
    type="radio"
    name="delivery-slot"
    value={slot.label}
    disabled={disabled}
    checked={selectedSlot === slot.label}
    onChange={() => handleSelect(slot.label)}
    style={{ marginRight: '8px' }}
  />
  <span style={{ marginLeft: '4px', fontWeight: '300' }}>{slot.label}</span>
</label>

        );
      })}

      <button
        style={{ width: '100%'}}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
        disabled={!selectedSlot}
        onClick={() => alert(`Slot confirmed: ${selectedSlot}`)}
      >
        Confirm Slot
      </button>
    </div>
  );
}

