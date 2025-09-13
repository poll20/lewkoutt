

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

//   // ✅ Cloudinary optimization (w=1200, auto format, auto quality)
//   const getOptimizedUrl = (url) => {
//     if (!url) return "";
//     if (url.includes("/upload/")) {
//       return url.replace("/upload/", "/upload/w_1200,f_auto,q_auto/");
//     }
//     return url;
//   };

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
//       >
//         <img
//           src={getOptimizedUrl(current?.image)}
//           alt={current?.category || "carousel image"}
//           className="carousel-image"
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

const Carousel = ({ images = [], interval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
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

  // Optimized image URL generation
  const getOptimizedUrl = (url, width = 1200) => {
    if (!url) return "";
    if (url.includes("/upload/")) {
      // More aggressive optimization for faster loading
      return url.replace("/upload/", `/upload/w_${width},f_webp,q_80,c_fill,ar_16:9/`);
    }
    return url;
  };

  // Get responsive srcSet
  const getSrcSet = (url) => {
    if (!url) return "";
    const sizes = [480, 768, 1024, 1200];
    return sizes
      .map(size => `${getOptimizedUrl(url, size)} ${size}w`)
      .join(", ");
  };

  if (images.length === 0) {
    return //<div style={containerStyle}>No images to show</div>;
  }

  const current = images[currentIndex];
  const firstImage = images[0];

  // Inline critical CSS for better LCP
  const containerStyle = {
    position: "relative",
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    overflow: "hidden",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f8f9fa"
  };

  const slideStyle = {
    display: "block",
    width: "100%",
    textDecoration: "none"
  };

  const imageStyle = {
    width: "100%",
    height: "auto",
    aspectRatio: "16/9",
    objectFit: "cover",
    display: "block",
    transition: "opacity 0.3s ease-in-out",
    backgroundColor: "#f8f9fa"
  };

  const indicatorsStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    padding: "16px 0",
    margin: "auto"
  };

  const indicatorStyle = {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "#cbd5e0",
    cursor: "pointer",
    transition: "all 0.2s ease",
    border: "none"
  };

  const activeIndicatorStyle = {
    ...indicatorStyle,
    backgroundColor: "#4299e1",
    transform: "scale(1.2)"
  };

  return (
    <>
      {/* Preconnect to Cloudinary for faster DNS resolution */}
      <link rel="preconnect" href="https://res.cloudinary.com" />
      <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      
      {/* Preload the first image for better LCP */}
      {firstImage?.image && (
        <>
          <link
            rel="preload"
            as="image"
            href={getOptimizedUrl(firstImage.image)}
            imageSizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1200px"
            imageSrcSet={getSrcSet(firstImage.image)}
          />
          {/* Also preload WebP version */}
          <link
            rel="preload"
            as="image"
            href={getOptimizedUrl(firstImage.image).replace('f_webp', 'f_auto')}
            imageSizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1200px"
          />
        </>
      )}

      <div
        style={containerStyle}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <NavLink
          to={`/productmodel/${current?.category || ""}`}
          style={slideStyle}
        >
          <img
            src={getOptimizedUrl(current?.image)}
            srcSet={getSrcSet(current?.image)}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1200px"
            alt={current?.category || "carousel image"}
            style={imageStyle}
            // Critical optimizations for LCP
            loading={currentIndex === 0 ? "eager" : "lazy"}
            fetchPriority={currentIndex === 0 ? "high" : "auto"}
            decoding={currentIndex === 0 ? "sync" : "async"}
            // Prevent layout shift
            width="1200"
            height="675"
            onLoad={() => currentIndex === 0 && setIsLoaded(true)}
            onError={(e) => {
              // Fallback to original image if optimized version fails
              e.target.src = current?.image;
            }}
          />
        </NavLink>

        <div style={indicatorsStyle}>
          {images.map((_, index) => (
            <button
              key={index}
              style={currentIndex === index ? activeIndicatorStyle : indicatorStyle}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              type="button"
            />
          ))}
        </div>
      </div>

      {/* Preload next few images for smoother transitions */}
      {images.slice(1, 4).map((image, index) => (
        <link
          key={`preload-${index}`}
          rel="prefetch"
          as="image"
          href={getOptimizedUrl(image?.image, 1200)}
        />
      ))}
    </>
  );
};

export default Carousel;