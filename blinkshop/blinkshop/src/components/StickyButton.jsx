import React, { useEffect, useState } from 'react';
import './StickyButton.css';

const StickyButton = ({ targetRef, onAddToCart, onBuyNow,qty }) => {
  const [isSticky, setIsSticky] = useState(false);
console.log("qty in sticky",qty)
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
      <div className={`normal-button-container ${!isSticky ? 'visible' : 'hidden'}`} >
        <button disabled={qty==0} className="add-to-cart" onClick={onAddToCart} style={{backgroundColor:"white",color:"black",padding:"12px 10px",width:"150px",borderRadius:"30px",border:"2px solid black"}}>ADD TO BAG</button>
        <button disabled={qty==0} className="add-to-cart" onClick={onBuyNow}style={{backgroundColor:"black",padding:"12px 10px",width:"150px",borderRadius:"30px"}}>BUY NOW</button>
      </div>

      {/* Sticky Button (fixed at bottom) */}
      <div className={`sticky-button-container ${isSticky ? 'visible' : 'hidden'}`}>
         <button disabled={qty==0} className="add-to-cart" onClick={onAddToCart} style={{backgroundColor:"white",color:"black",padding:"12px 10px",width:"150px",borderRadius:"30px",border:"2px solid black"}}>ADD TO BAG</button>
        <button disabled={qty==0} className="add-to-cart" onClick={onBuyNow}style={{backgroundColor:"black",padding:"12px 10px",width:"150px",borderRadius:"30px"}}>BUY NOW</button>
      </div>
    </>
  );
};

export default StickyButton;
