import React from 'react';

const RatingBadge = ({ rating }) => {
  let bgColor = '#d4f8d4'; // default green shade
  let textColor = 'green';

  if (rating >= 4 && rating <= 5) {
    bgColor = '#d4f8d4'; // green
    textColor = 'green';
  } else if (rating >= 3 && rating < 4) {
    bgColor = '#fff9cc'; // yellow
    textColor = '#b59f00';
  } else if (rating >= 2 && rating < 3) {
    bgColor = '#ffe1e1'; // red
    textColor = 'red';
  }

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        width:"50px",
        height:"40px",
        marginTop:"10px",
        backgroundColor: bgColor,
        color: textColor,
        fontWeight: 'bold',
        padding: '4px 8px',
        borderRadius: '10px 0 10px 0',
        fontSize: '14px',
        border: '1px solid #ccc',
     textAlign:"center"
     }}
    >
      <span>★</span>
      <span>{rating}</span>
    </div>
  );
};

export default RatingBadge;
