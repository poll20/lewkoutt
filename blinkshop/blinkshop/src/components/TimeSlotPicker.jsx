import React, { useState, useEffect } from "react";
import "./TimeSlotPicker.css";

const TimeSlotPicker = () => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [currentHour, setCurrentHour] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    // Generate time slots from 10 AM to 8 PM
    const slots = [];
    for (let hour = 10; hour <= 20; hour++) {
      const start = hour <= 12 ? hour : hour - 12;
      const end = hour + 1 <= 12 ? hour + 1 : hour - 11;
      const period = hour < 12 ? "AM" : "PM";
      const nextPeriod = hour + 1 < 12 ? "AM" : "PM";
      slots.push(`${start}${period} - ${end}${nextPeriod}`);
    }
    slots.push("Free Time")
    setTimeSlots(slots);

    // Get the current hour
    const now = new Date();
    setCurrentHour(now.getHours());
  }, []);

  // Handle slot selection
  const handleSlotSelection = (slot, index) => {
    if (index + 10 <= currentHour) {
      alert("You can't select a past time slot!");
      return;
    }
    setSelectedSlot(slot);
  };

  return (
    <div className="time-slot-picker">
      <h2>Select a Delivery Time Slot</h2>
      <div className="time-slots">
        {timeSlots.map((slot, index) => (
          <button
            key={index}
            className={`time-slot ${
              index + 10 <= currentHour ? "disabled" : ""
            } ${selectedSlot === slot ? "selected" : ""}`}
            onClick={() => handleSlotSelection(slot, index)}
            disabled={index + 10 <= currentHour}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSlotPicker;
