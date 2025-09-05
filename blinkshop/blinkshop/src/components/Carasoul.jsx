
// import React, { useState, useEffect, useRef } from "react";
// import { NavLink } from "react-router-dom";
// import "./Carousel.css";

// const Carousel = ({ images }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const timeoutRef = useRef(null);
//   const touchStartX = useRef(0);
//   const touchEndX = useRef(0);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === images.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? images.length - 1 : prevIndex - 1
//     );
//   };

//   // Reset currentIndex if images change or are shorter
//   useEffect(() => {
//     if (currentIndex >= images.length) {
//       setCurrentIndex(0);
//     }
//   }, [images]);

//   // Auto slide
//   useEffect(() => {
//     if (images.length > 1) {
//       timeoutRef.current = setTimeout(() => {
//         nextSlide();
//       }, 4000);
//     }
//     return () => clearTimeout(timeoutRef.current);
//   }, [currentIndex, images]);

//   const handleTouchStart = (e) => {
//     touchStartX.current = e.touches[0].clientX;
//   };

//   const handleTouchMove = (e) => {
//     touchEndX.current = e.touches[0].clientX;
//   };

//   const handleTouchEnd = () => {
//     const diff = touchStartX.current - touchEndX.current;
//     if (diff > 50) nextSlide();
//     else if (diff < -50) prevSlide();
//   };

//   // Guard clause
//   if (!images || images.length === 0) {
//     return <div className="carousel-container">No images to show</div>;
//   }

//   const current = images[currentIndex];

//   return (
//     <div
//       className="carousel-container"
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
//     >
//       <NavLink
//         to={`/productmodel/${current?.category || ""}`}
//         className="carousel-slide"
//         style={{
//           backgroundImage: current?.image ? `url(${current.image})` : "none",
//           backgroundRepeat: "no-repeat",
//           backgroundPosition: "center",
//           backgroundSize: "cover",
//         }}
//       >
//         {/* <div
//           className="carousel-arrow left-arrow"
//           onClick={(e) => {
//             e.preventDefault();
//             prevSlide();
//           }}
//         >
//           &#10094;
//         </div>

//         <div
//           className="carousel-arrow right-arrow"
//           onClick={(e) => {
//             e.preventDefault();
//             nextSlide();
//           }}
//         >
//           &#10095;
//         </div> */}
//       </NavLink>

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
import React, { useState, useEffect, useRef, useCallback } from "react";
import { NavLink } from "react-router-dom";
import "./Carousel.css";

const Carousel = ({ images = [], interval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  // Reset index if images change
  useEffect(() => {
    if (currentIndex >= images.length) {
      setCurrentIndex(0);
    }
  }, [images.length, currentIndex]);

  // Auto slide
  useEffect(() => {
    if (images.length > 1) {
      timeoutRef.current = setTimeout(nextSlide, interval);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, images.length, nextSlide, interval]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) nextSlide();
    else if (diff < -50) prevSlide();
  };

  if (images.length === 0) {
    return <div className="carousel-container">No images to show</div>;
  }

  const current = images[currentIndex];

  return (
    <div
      className="carousel-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <NavLink
        to={`/productmodel/${current?.category || ""}`}
        className="carousel-slide"
        style={{
          backgroundImage: current?.image ? `url(${current.image})` : "none",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />

      <div className="carousel-indicators">
        {images.map((_, index) => (
          <span
            key={index}
            className={`indicator ${currentIndex === index ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
