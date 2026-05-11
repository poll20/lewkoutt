// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { NavLink } from "react-router-dom";
// import "./Carousel.css";
// import { cloudinaryImg } from "../utils/cloudinariimg";

// const Carousel = ({ images = [], interval = 4000 }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const timeoutRef = useRef(null);
//   const touchStartX = useRef(0);
//   const touchEndX = useRef(0);

//   const nextSlide = useCallback(() => {
//     setCurrentIndex((prev) =>
//       prev === images.length - 1 ? 0 : prev + 1
//     );
//   }, [images.length]);

//   const prevSlide = useCallback(() => {
//     setCurrentIndex((prev) =>
//       prev === 0 ? images.length - 1 : prev - 1
//     );
//   }, [images.length]);

//   // Reset index if images change
//   useEffect(() => {
//     if (currentIndex >= images.length) {
//       setCurrentIndex(0);
//     }
//   }, [images.length, currentIndex]);

//   // ✅ Autoplay AFTER first slide (LCP safe)
//   useEffect(() => {
//     if (images.length > 1 && currentIndex !== 0) {
//       timeoutRef.current = setTimeout(nextSlide, interval);
//     }
//     return () => clearTimeout(timeoutRef.current);
//   }, [currentIndex, images.length, nextSlide, interval]);

//   // Touch handlers
//   const handleTouchStart = (e) => {
//     touchStartX.current = e.touches[0].clientX;
//   };

//   const handleTouchMove = (e) => {
//     touchEndX.current = e.touches[0].clientX;
//   };

//   const handleTouchEnd = () => {
//     const diff = touchStartX.current - touchEndX.current;
//     if (diff > 50) nextSlide();
//     if (diff < -50) prevSlide();
//   };

//   if (!images.length) return null;

//   const current = images[currentIndex];
// console.log("current",current)
//   return (
//     <div
//       className="carousel-container"
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
//     >
//       <NavLink
//         to={`/store/store`}
//         className="carousel-slide"
//       >
//         <img
//           src={cloudinaryImg(current?.image, 800)}
//           alt={current?.category || "carousel image"}
//           className="carousel-image"
//           width="400"
//           height="225"
//           loading={currentIndex === 0 ? "eager" : "lazy"}
//           fetchpriority={currentIndex === 0 ? "high" : "low"}
//           decoding="async"
//           // style={{ backgroundColor: "#f0f0f0", width: "100%", height: "100%" }}
//         />
//       </NavLink>

//       {/* Indicators */}
//       <div className="carousel-indicators">
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
import { cloudinaryImg } from "../utils/cloudinariimg";

/* Optional: per-slide overlay text. If your carousel data has a `title` or
   `subtitle` field, swap the static OVERLAY_DATA for those. */
const OVERLAY_DATA = [
  { tag: "New collection", title: "Summer\nBloom",   cta: "Shop now" },
  { tag: "Trending now",   title: "Cool &\nCasual",  cta: "Explore" },
  { tag: "Limited drops",  title: "Edit\nSeason",    cta: "View looks" },
];

const Carousel = ({ images = [], interval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  useEffect(() => {
    if (currentIndex >= images.length) setCurrentIndex(0);
  }, [images.length, currentIndex]);

  useEffect(() => {
    if (images.length > 1) {
      timeoutRef.current = setTimeout(nextSlide, interval);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, images.length, nextSlide, interval]);

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove  = (e) => { touchEndX.current  = e.touches[0].clientX; };
  const handleTouchEnd   = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff >  50) nextSlide();
    if (diff < -50) prevSlide();
  };

  if (!images.length) return null;

  const current = images[currentIndex];
  const overlay = OVERLAY_DATA[currentIndex % OVERLAY_DATA.length];

  return (
    <div
      className="carousel-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <NavLink to="/store/store" className="carousel-slide">
        <img
          src={cloudinaryImg(current?.image, 800)}
          alt={current?.category || "carousel image"}
          className="carousel-image"
          width="400"
          height="225"
          loading={currentIndex === 0 ? "eager" : "lazy"}
          fetchpriority={currentIndex === 0 ? "high" : "low"}
          decoding="async"
        />

        {/* Dark gradient overlay */}
        <div className="carousel-gradient" />

        {/* Text overlay */}
        <div className="carousel-text">
          <span className="carousel-tag">{overlay.tag}</span>
          <h2 className="carousel-title">
            {overlay.title.split("\n").map((line, i) => (
              <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
            ))}
          </h2>
          <div className="carousel-cta">{overlay.cta} →</div>
        </div>
      </NavLink>

      {/* Dot indicators */}
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