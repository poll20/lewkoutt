// // Carousel.js
// import React, { useState, useEffect, useRef } from "react";
// import "./Carousel.css";

// const Carousel = ({ images }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const timeoutRef = useRef(null);
//   const touchStartX = useRef(0);
//   const touchEndX = useRef(0);

//   // Function to go to the next slide
//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === images.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   // Function to go to the previous slide
//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? images.length - 1 : prevIndex - 1
//     );
//   };

//   // Automatically change slides every 4 seconds
//   useEffect(() => {
//     timeoutRef.current = setTimeout(() => {
//       nextSlide();
//     }, 4000);

//     // Clear timeout on slide change or unmount
//     return () => clearTimeout(timeoutRef.current);
//   }, [currentIndex]);

//   // Function to handle the swipe on mobile
//   const handleTouchStart = (e) => {
//     touchStartX.current = e.touches[0].clientX;
//   };

//   const handleTouchMove = (e) => {
//     touchEndX.current = e.touches[0].clientX;
//   };

//   const handleTouchEnd = () => {
//     if (touchStartX.current - touchEndX.current > 50) {
//       // Swipe left
//       nextSlide();
//     }
//     if (touchEndX.current - touchStartX.current > 50) {
//       // Swipe right
//       prevSlide();
//     }
//   };

//   return (
//     <div
//       className="carousel-container"
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
//     >
//       <div
//         className="carousel-slide"
//         style={{
//           backgroundImage: `url(${images[currentIndex]})`,
//           backgroundRepeat: "no-repeat",
//           backgroundPosition: "center",
//           backgroundSize: "cover",
//         }}
//       >
//         {/* Left Arrow */}
//         <div className="carousel-arrow left-arrow" onClick={prevSlide}>
//           &#10094;
//         </div>

//         {/* Right Arrow */}
//         <div className="carousel-arrow right-arrow" onClick={nextSlide}>
//           &#10095;
//         </div>
//       </div>

//       <div className="carousel-indicators">
//         {images.map((_, index) => (
//           <span
//             key={index}
//             className={`indicator ${currentIndex === index ? "active" : ""}`}
//             onClick={() => setCurrentIndex(index)}
//           ></span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Carousel;
























// Carousel.js
import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./Carousel.css";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, 4000);
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextSlide();
    }
    if (touchEndX.current - touchStartX.current > 50) {
      prevSlide();
    }
  };

  return (
    <div
  
      className="carousel-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{borderRadius:"0"}}
    >
      <NavLink
        to={`/productmodel/${images[currentIndex].category}`}
        className="carousel-slide"
        style={{
          backgroundImage: `url(${images[currentIndex].image})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="carousel-arrow left-arrow" onClick={(e) => { e.preventDefault(); prevSlide(); }}>
          &#10094;
        </div>

        <div className="carousel-arrow right-arrow" onClick={(e) => { e.preventDefault(); nextSlide(); }}>
          &#10095;
        </div>
      </NavLink>

      <div className="carousel-indicators" >
        
        {images.map((_, index) => (
          <span
            key={index}
            className={`indicator ${currentIndex === index ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
