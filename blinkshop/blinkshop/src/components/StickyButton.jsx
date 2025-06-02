// // import React, { useEffect, useState, useRef } from 'react';
// // import './StickyButton.css';

// // const StickyButton = ({ onAddToCart, onBuyNow, targetRef }) => {
// //   const [isSticky, setIsSticky] = useState(false);

// //   useEffect(() => {
// //     const observer = new IntersectionObserver(
// //       ([entry]) => {
// //         setIsSticky(!entry.isIntersecting);
// //       },
// //       {
// //         root: null,
// //         threshold: 0,
// //       }
// //     );

// //     if (targetRef?.current) {
// //       observer.observe(targetRef.current);
// //     }

// //     return () => {
// //       if (targetRef?.current) {
// //         observer.unobserve(targetRef.current);
// //       }
// //     };
// //   }, [targetRef]);

// //   return (
// //     <>
// //       <div className={`sticky-button-container ${isSticky ? 'sticky' : 'non-sticky'}`} >
// //         {/* <button onClick={onAddToCart}>Add to Cart</button>
// //         <button onClick={onBuyNow}>Buy Now</button> */}
// //         <button className="add-to-cart" onClick={onAddToCart} style={{backgroundColor:"#F15A29",padding:"12px 10px",width:"150px"}}>Add to Cart</button>
// //                  <button className="add-to-cart" onClick={onBuyNow}style={{backgroundColor:"#F15A29",padding:"12px 10px",width:"150px"}}>Buy Now</button>
// //       </div>
// //     </>
// //   );
// // };

// // export default StickyButton;

// import React, { useEffect, useState } from 'react';
// import './StickyButton.css';

// const StickyButton = ({ onAddToCart, onBuyNow, targetRef }) => {
//   const [isSticky, setIsSticky] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setIsSticky(!entry.isIntersecting);
//       },
//       {
//         root: null,
//         threshold: 0,
//       }
//     );

//     if (targetRef?.current) {
//       observer.observe(targetRef.current);
//     }

//     return () => {
//       if (targetRef?.current) {
//         observer.unobserve(targetRef.current);
//       }
//     };
//   }, [targetRef]);

//   return (
//     <div className={`sticky-button-container ${isSticky ? 'sticky' : 'non-sticky'}`}>
//      <button className="add-to-cart" onClick={onAddToCart} style={{backgroundColor:"#F15A29",padding:"12px 10px",width:"150px"}}>Add to Cart</button>
//        <button className="add-to-cart" onClick={onBuyNow}style={{backgroundColor:"#F15A29",padding:"12px 10px",width:"150px"}}>Buy Now</button>
//     </div>
//   );
// };

// export default StickyButton;
import React, { useEffect, useState } from 'react';
import './StickyButton.css';

const StickyButton = ({ targetRef, onAddToCart, onBuyNow }) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    if (targetRef?.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef?.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [targetRef]);

  return (
    <>
      {/* Regular Button (in flow) */}
      <div className={`normal-button-container ${!isSticky ? 'visible' : 'hidden'}`}>
        <button className="add-to-cart" onClick={onAddToCart} style={{backgroundColor:"white",color:"black",padding:"12px 10px",width:"150px",borderRadius:"30px",border:"2px solid #F15A29",color:"#F15A29"}}>ADD TO CART</button>
        <button className="add-to-cart" onClick={onBuyNow}style={{backgroundColor:"#F15A29",padding:"12px 10px",width:"150px",borderRadius:"30px"}}>BUY NOW</button>
      </div>

      {/* Sticky Button (fixed at bottom) */}
      <div className={`sticky-button-container ${isSticky ? 'visible' : 'hidden'}`}>
         <button className="add-to-cart" onClick={onAddToCart} style={{backgroundColor:"white",color:"black",padding:"12px 10px",width:"150px",borderRadius:"30px",border:"2px solid #F15A29",color:"#F15A29"}}>ADD TO CART</button>
        <button className="add-to-cart" onClick={onBuyNow}style={{backgroundColor:"#F15A29",padding:"12px 10px",width:"150px",borderRadius:"30px"}}>BUY NOW</button>
      </div>
    </>
  );
};

export default StickyButton;
