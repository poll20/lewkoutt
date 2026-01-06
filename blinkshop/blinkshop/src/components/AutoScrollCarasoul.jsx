import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

const AutoScrollCarasoul = ({ data = [], height = "180px" }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const scrollSpeed = .5;
    let animationFrame;

    const scroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += scrollSpeed;

        const totalScrollWidth = scrollContainer.scrollWidth / 2;
        if (scrollContainer.scrollLeft >= totalScrollWidth) {
          scrollContainer.scrollLeft = 0;
        }

        animationFrame = requestAnimationFrame(scroll);
      }
    };

    animationFrame = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const loopedData = [...data, ...data]; // clone for loop

  return (
    <div style={styles.wrapper}>
        <h3>Viral Search</h3>
      <div ref={scrollRef} style={{ ...styles.scrollContainer}}>
        {loopedData.map((item, idx) => (
          <div key={`${item._id}-${idx}`} style={{ ...styles.card}}>
            <NavLink className='navlink' to={`/productdescription/${item._id}/${item.color}`}>
            <img
              src={item.image}
              alt={`product-${item._id}`}
              style={styles.image}
            />
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    // border:"2px solid black",
    marginTop:"23px",
    width: "100%",
    overflow: "hidden",
    padding: "10px",
    boxSizing: "border-box",
  },
  scrollContainer: {
    display: "flex",
    overflowX: "hidden", // prevent scrollbar
    scrollBehavior: "auto",
    gap: "25px",
    scrollbarWidth: "none", // Firefox
msOverflowStyle: "none", // IE/Edge
  },
  card: {
    border:"1px solid gray",
    width:"45px",
    height:"45px",
    borderRadius: "100%",
    overflow: "scroll",
    flex: "0 0 auto",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  
};


export default AutoScrollCarasoul;
