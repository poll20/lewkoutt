
import React, { useEffect, useRef, useState } from "react";
import "./CategoriesLayout.css";
import { NavLink } from "react-router-dom";
import Cardforall from "./Cardforall";
import { useBio } from "./BioContext";
import { cloudinaryImg } from "../utils/cloudinariimg";

const CategoriesLayout = () => {
  const {
    productdata,
    fetchCategories,     // 🔥 paginated categories
    hasMore,
    fetchCoupons,
    coupons,
  } = useBio();

  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);

  /* =============================
     1️⃣ Fetch categories (pagination)
  ============================== */
  useEffect(() => {
    fetchCategories(page);
  }, [page]);

  /* =============================
     2️⃣ Fetch coupons (once)
  ============================== */
  useEffect(() => {
    fetchCoupons("all", "all");
  }, []);

  /* =============================
     3️⃣ Intersection Observer
  ============================== */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [hasMore]);

  if (!productdata || !coupons) return null;

  return (
    <>
      {[...productdata].map((cat, idx) => (
        <div key={idx} className="horizontal-card-layout">
          
          {/* Category Title */}
          <span
            style={{
              textAlign: "start",
              fontSize: "30px",
              fontFamily: "'Great Vibes', cursive",
              fontWeight: 800,
            }}
          >
            {cat.category.charAt(0).toUpperCase() + cat.category.slice(1)}
          </span>

          {/* Parent Card */}
          <div className="parent-card" style={{ borderRadius: "20px" }}>
            <NavLink to={`/productmodel/${cat.category}`}>
              <img
                src={cloudinaryImg(cat.image, 400)}
                alt={cat.title || "product"}
                className="parent-image"
                decoding="async"
                fetchpriority="low"
              />
            </NavLink>
          </div>

          {/* Child Cards */}
          <div className="child-cards-wrapper">
            <div className="child-cards">
              {cat.productdetails.map((p, i) => (
                <div key={i} className="cate-card-done">
                  <Cardforall
                    id={p}
                    discription={p.description}
                    price={p.price}
                    discountprice={p.discountprice}
                    color={p.colors}
                    image={p.image[0]}
                    discount={p.discount}
                    defaultcolor={p.defaultColor}
                    coupons={coupons}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* View All Button */}
          <NavLink to={`/productmodel/${cat.category}`} ><button className="catebtn" style={{width: '100%',
    padding: '16px 0',
    borderRadius: '12px',
    background: 'white',
    color: 'black',
    border: 'none',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    marginTop: '10px'}}>View All</button></NavLink>
        </div>
      ))}

      {/* 🔥 Observer Target */}
      <div ref={loaderRef} style={{ height: "1px" }} />
    </>
  );
};

export default CategoriesLayout;
