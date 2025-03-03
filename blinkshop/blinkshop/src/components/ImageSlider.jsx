// // import React, { useState } from 'react';
// // import './ImageSlider.css';
// // import img1 from "./image/img1.jpg"
// // import img2 from "./image/img2.webp"
// // import img3 from "./image/img3.jpg"
// // import img4 from "./image/img4.jpeg"
// // import { NavLink } from 'react-router-dom';

// // const ImageSlider = () => {
// //   const images = [
// //    img1,img2,img3,img4
// //   ];

// //   const [currentIndex, setCurrentIndex] = useState(0);

// //   const handleNext = () => {
// //     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
// //   };

// //   const handlePrev = () => {
// //     setCurrentIndex((prevIndex) =>
// //       prevIndex === 0 ? images.length - 1 : prevIndex - 1
// //     );
// //   };

// //   return (
// //     <div className="slider-container">
      
// //       <div className="slider-background" style={{ backgroundImage: `url(${images[currentIndex]})` }}>
// //         <button className="prev-btn" onClick={handlePrev}>
// //           &#10094;
// //         </button>
// //         <NavLink to={`/card`} className="a"> <p>VIEW ALL</p></NavLink>
// //         <button className="next-btn" onClick={handleNext}>
// //           &#10095;
// //         </button>
// //       </div>
      
// //     </div>
// //   );
// // };

// // export default ImageSlider;

// // import React, { useState, useRef } from "react";
// // import "./ImageSlider.css";
// // import img1 from "./image/img1.jpg"
// // import img2 from "./image/img2.webp"
// // import img3 from "./image/img3.jpg"
// // import img4 from "./image/img4.jpeg"
// // import { IoIosArrowForward,IoIosArrowBack } from "react-icons/io";

// // const ImageSlider = () => {
// //   let images=[img1,img2,img3,img4]
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const sliderRef = useRef(null);
// //   const touchStartX = useRef(0);
// //   const touchEndX = useRef(0);

// //   const handleNext = () => {
// //     setCurrentIndex((prevIndex) =>
// //       prevIndex === images.length - 1 ? 0 : prevIndex + 1
// //     );
// //   };

// //   const handlePrev = () => {
// //     setCurrentIndex((prevIndex) =>
// //       prevIndex === 0 ? images.length - 1 : prevIndex - 1
// //     );
// //   };

// //   const handleTouchStart = (e) => {
// //     touchStartX.current = e.touches[0].clientX;
// //   };

// //   const handleTouchMove = (e) => {
// //     touchEndX.current = e.touches[0].clientX;
// //   };

// //   const handleTouchEnd = () => {
// //     if (touchStartX.current - touchEndX.current > 50) {
// //       handleNext(); // Swipe left to move to the next image
// //     }
// //     if (touchStartX.current - touchEndX.current < -50) {
// //       handlePrev(); // Swipe right to move to the previous image
// //     }
// //   };

// //   return (
// //     <div
// //       className="slider-container"
// //       ref={sliderRef}
// //       onTouchStart={handleTouchStart}
// //       onTouchMove={handleTouchMove}
// //       onTouchEnd={handleTouchEnd}
// //     >
// //       <div
// //         className="slider"
// //         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
// //       >
// //         {images.map((image, index) => (
// //           <div className="slide" key={index}>
// //             <img src={image} alt={`Slide ${index + 1}` }loading="lazy" />
// //           </div>
// //         ))}
// //       </div>

// //       <button className="prev-btn" onClick={handlePrev}>
// //       <IoIosArrowBack size={30}/>
// //       </button>


// //       <div className=".va" style={{position:"absolute", top:"46%", border:".5px solid black", padding:"5px"}}>VIEW ALL</div>


// //       <button className="next-btn" onClick={handleNext}>
// //       <IoIosArrowForward size={30}/></button>

    
// //     </div>
// //   );
// // };

// // export default ImageSlider;

// // import React, { useState, useRef } from "react";
// // import "./ImageSlider.css";
// // import img1 from "./image/img1.jpg";
// // import img2 from "./image/img2.webp";
// // import img3 from "./image/img3.jpg";
// // import img4 from "./image/img4.jpeg";
// // import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

// // const ImageSlider = () => {
// //   const images = [img1, img2, img3, img4];
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const sliderRef = useRef(null);
// //   const touchStartX = useRef(0);
// //   const touchEndX = useRef(0);

// //   const handleNext = () => {
// //     setCurrentIndex((prevIndex) =>
// //       prevIndex === images.length - 1 ? 0 : prevIndex + 1
// //     );
// //   };

// //   const handlePrev = () => {
// //     setCurrentIndex((prevIndex) =>
// //       prevIndex === 0 ? images.length - 1 : prevIndex - 1
// //     );
// //   };

// //   const handleTouchStart = (e) => {
// //     touchStartX.current = e.touches[0].clientX;
// //   };

// //   const handleTouchMove = (e) => {
// //     touchEndX.current = e.touches[0].clientX;
// //   };

// //   const handleTouchEnd = () => {
// //     if (touchStartX.current - touchEndX.current > 50) {
// //       handleNext(); // Swipe left
// //     }
// //     if (touchStartX.current - touchEndX.current < -50) {
// //       handlePrev(); // Swipe right
// //     }
// //   };

// //   return (
// //     <div
// //       className="slider-container"
// //       ref={sliderRef}
// //       onTouchStart={handleTouchStart}
// //       onTouchMove={handleTouchMove}
// //       onTouchEnd={handleTouchEnd}
// //     >
// //       <div
// //         className="slider"
// //         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
// //       >
// //         {images.map((image, index) => (
// //           <div className="slide" key={index}>
// //             <img src={image} alt={`Slide ${index + 1}`} />
// //           </div>
// //         ))}
// //       </div>

// //       <button className="prev-btn" onClick={handlePrev}>
// //         <IoIosArrowBack size={30} />
// //       </button>

// //       <div className="va">VIEW ALL</div>

// //       <button className="next-btn" onClick={handleNext}>
// //         <IoIosArrowForward size={30} />
// //       </button>
// //     </div>
// //   );
// // };

// // export default ImageSlider;

// import React, { useState, useRef, useCallback, useMemo } from "react";
// import "./ImageSlider.css";
// import img1 from "./image/img1.jpg";
// import img2 from "./image/img2.webp";
// import img3 from "./image/img3.jpg";
// import img4 from "./image/img4.jpeg";
// import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

// // Memoize the ImageSlider component to prevent unnecessary re-renders
// const ImageSlider = React.memo(() => {
//   const images = useMemo(() => [img1, img2, img3, img4], []); // Memoized images array
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const sliderRef = useRef(null);
//   const touchStartX = useRef(0);
//   const touchEndX = useRef(0);

//   // Memoize event handlers to prevent re-creation on each render
//   const handleNext = useCallback(() => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === images.length - 1 ? 0 : prevIndex + 1
//     );
//   }, [images.length]);

//   const handlePrev = useCallback(() => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? images.length - 1 : prevIndex - 1
//     );
//   }, [images.length]);

//   const handleTouchStart = useCallback((e) => {
//     touchStartX.current = e.touches[0].clientX;
//   }, []);

//   const handleTouchMove = useCallback((e) => {
//     touchEndX.current = e.touches[0].clientX;
//   }, []);

//   const handleTouchEnd = useCallback(() => {
//     const swipeDistance = touchStartX.current - touchEndX.current;
//     if (swipeDistance > 50) {
//       handleNext(); // Swipe left to move to the next image
//     } else if (swipeDistance < -50) {
//       handlePrev(); // Swipe right to move to the previous image
//     }
//   }, [handleNext, handlePrev]);

//   return (
//     <div
//       className="slider-container"
//       ref={sliderRef}
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
//       style={{border:"2px solid red"}}
//     >
//       <div
//         className="slider"
//         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//       >
//         {images.map((image, index) => (
//           <div className="slide" key={index} style={{ minWidth: "100%" }}>
//             <img src={image} alt={`Slide ${index + 1}`} loading="lazy" />
//           </div>
//         ))}
//       </div>

//       <button className="prev-btn" onClick={handlePrev}>
//         <IoIosArrowBack size={30} />
//       </button>

//       <button className="next-btn" onClick={handleNext}>
//         <IoIosArrowForward size={30} />
//       </button>

//       <div
//         className="va"
//         style={{
//           position: "absolute",
//           top: "46%",
//           border: ".5px solid black",
//           padding: "5px",
//         }}
//       >
//         VIEW ALLll
//       </div>
//     </div>
//   );
// });

// export default ImageSlider;
import React, { useState, useEffect } from "react";
import "./ImageSlider.css"; // Create and import CSS file
import Carousel from "./Carasoul";

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Automatically change slides every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval); // Cleanup the interval
  }, [currentIndex]);

  return (
   
      
      <Carousel images={images}/>
    
  );
};

export default ImageSlider;