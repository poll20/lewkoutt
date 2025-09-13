

// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { NavLink } from "react-router-dom";
// import "./Carousel.css";

// const Carousel = ({ images = [], interval = 4000 }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const timeoutRef = useRef(null);
//   const touchStartX = useRef(0);
//   const touchEndX = useRef(0);

//   const nextSlide = useCallback(() => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === images.length - 1 ? 0 : prevIndex + 1
//     );
//   }, [images.length]);

//   const prevSlide = useCallback(() => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? images.length - 1 : prevIndex - 1
//     );
//   }, [images.length]);

//   // Reset index if images change
//   useEffect(() => {
//     if (currentIndex >= images.length) {
//       setCurrentIndex(0);
//     }
//   }, [images.length, currentIndex]);

//   // Auto slide
//   useEffect(() => {
//     if (images.length > 1) {
//       timeoutRef.current = setTimeout(nextSlide, interval);
//     }
//     return () => clearTimeout(timeoutRef.current);
//   }, [currentIndex, images.length, nextSlide, interval]);

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

//   if (images.length === 0) {
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
//       <NavLink to={`/productmodel/${current?.category || ""}`} className="carousel-slide">
//         <img
//           src={current?.image}
//           alt={current?.category || "carousel image"}
//           className="carousel-image"
//           // First slide eager load + high priority for LCP
//           loading={currentIndex === 0 ? "eager" : "lazy"}
//           fetchpriority={currentIndex === 0 ? "high" : "auto"}
//         />
//       </NavLink>

//       <div className="carousel-indicators" style={{ margin: "auto" }}>
//         {images.map((_, index) => (
//           <span
//             key={index}
//             className={`indicator ${currentIndex === index ? "active" : ""}`}
//             onClick={() => setCurrentIndex(index)}
//           />
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

  // ✅ Cloudinary optimization (w=1200, auto format, auto quality)
  const getOptimizedUrl = (url) => {
    if (!url) return "";
    if (url.includes("/upload/")) {
      return url.replace("/upload/", "/upload/w_1200,f_auto,q_auto/");
    }
    return url;
  };

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
      >
       <img
  src={current?.image}
  alt={current?.category || "carousel image"}
  className="carousel-image"
  loading={index <= 1 ? "eager" : "lazy"}   // ✅ first 2 slides eager
  fetchpriority={index === 0 ? "high" : "auto"} // ✅ first slide high priority
  decoding="async"
/>

      </NavLink>

      <div className="carousel-indicators" style={{ margin: "auto" }}>
        {images.map((img, index) => (
  <img
    key={index}
    src={img.image}
    alt={img.category || "carousel image"}
    className="carousel-image"
    loading={index <= 1 ? "eager" : "lazy"}
    fetchpriority={index === 0 ? "high" : "auto"}
  />
))}

      </div>
    </div>
  );
};

export default Carousel;
