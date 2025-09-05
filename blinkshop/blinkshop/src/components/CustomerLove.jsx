// import React, { useState } from 'react';
// import './CustomerLove.css';
// import img1 from "./image/img1.jpg"
// const   CustomerLove = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const cards = [
//     { id: 1, image: img1  , description: 'Description for Card 1' },
//     { id: 2, image: img1  , description: 'Description for Card 2' },
//     { id: 3, image: img1  , description: 'Description for Card 3' },
//     { id: 4, image: img1  , description: 'Description for Card 4' },
//     { id: 5, image: img1  , description: 'Description for Card 5' },
//     { id: 6, image: img1  , description: 'Description for Card 6' },
//     { id: 7, image: img1  , description: 'Description for Card 7' },
//     { id: 8, image: img1  , description: 'Description for Card 8' },
//     { id: 9, image: img1  , description: 'Description for Card 9' },
//   ];

//   const cardsPerPage = 3; // Number of cards to show per slide

//   const handleNext = () => {
//     if (currentIndex < cards.length - cardsPerPage) {
//       setCurrentIndex(currentIndex + cardsPerPage);
//     }
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - cardsPerPage);
//     }
//   };

//   return (
//     <>
  
//     <div className="customer-slider-container">
//     <h2 style={{textAlign:"start"}}>OUR CUSTOMER LOVE</h2>
//       <button className="customer-nav-button prevbtn" onClick={handlePrev} disabled={currentIndex === 0}>Previous</button>

//       <div className="customer-cards-wrapper">
//         <div
//           className="customer-cards-container"
//           style={{ transform: `translateX(-${currentIndex * (100 / cardsPerPage)}%)` }}
//         >
//           {cards.map((card) => (
//             <div key={card.id} className="customer-card" >
//               <img className="customer-card-image" src={card.image} alt={`Card ${card.id}`} />
//               <div className="customer-card-description">{card.description}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <button className="customer-nav-button nextbtn" onClick={handleNext} disabled={currentIndex >= cards.length - cardsPerPage}>
//         Next
//       </button>
//     </div>
//     </>
//   );
// };

// export default CustomerLove;

import React, { useState, useMemo } from "react";
import "./CustomerLove.css";
import img1 from "./image/img1.jpg";

const CustomerLove = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerPage = 3; // responsive ke liye prop banaya jaa sakta hai

  // Memoized cards (har render pe dobara create nahi honge)
  const cards = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => ({
        id: i + 1,
        image: img1,
        description: `Description for Card ${i + 1}`,
      })),
    []
  );

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev < cards.length - cardsPerPage ? prev + cardsPerPage : prev
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - cardsPerPage : 0));
  };

  return (
    <div className="customer-slider-container">
      <h2 style={{ textAlign: "start" }}>OUR CUSTOMER LOVE</h2>

      <button
        className="customer-nav-button prevbtn"
        onClick={handlePrev}
        disabled={currentIndex === 0}
      >
        Previous
      </button>

      <div className="customer-cards-wrapper">
        <div
          className="customer-cards-container"
          style={{
            transform: `translateX(-${
              (currentIndex / cardsPerPage) * 100
            }%)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {cards.map((card) => (
            <div key={card.id} className="customer-card">
              <img
                className="customer-card-image"
                src={card.image}
                alt={`Card ${card.id}`}
              />
              <div className="customer-card-description">
                {card.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className="customer-nav-button nextbtn"
        onClick={handleNext}
        disabled={currentIndex >= cards.length - cardsPerPage}
      >
        Next
      </button>
    </div>
  );
};

export default CustomerLove;
