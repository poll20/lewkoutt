import React from 'react';
import './HorizontalScrollContainer.css';
// import img1 from "./image/img1.jpg"
import img2 from "./image/img2.webp"
// import img3 from "./image/img3.jpg"
// import img4 from "./image/img4.jpeg"
import { NavLink } from 'react-router-dom';
const HorizontalScrollContainer = () => {
  const cards = [
    { id: 1, image: img2, description: 'Card 1 Description' },
    { id: 2, image: img2, description: 'Card 2 Description' },
    { id: 3, image: img2, description: 'Card 3 Description' },
    { id: 4, image: img2, description: 'Card 4 Description' },
    { id: 5, image: img2, description: 'Card 5 Description' },
    { id: 6, image: img2, description: 'Card 6 Description' },
  ];

  return (
    <>
    <div className="scroll-container">
      <div className="scroll-content">
        {cards.map((card) => (
          <div key={card.id} className="scroll-card">
            <img src={card.image} alt={card.description} className="card-image" loading="lazy"/>
            <div className="card-description">{card.description}</div>
          </div>
        ))}
      </div>
    </div>
    <div className="btn">
     <NavLink to="/wear/jeans"> <button>SHOW MORE</button></NavLink>
    </div>
    </>
  );
};

export default HorizontalScrollContainer;
