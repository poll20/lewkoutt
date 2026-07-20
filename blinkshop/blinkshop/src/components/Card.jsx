import React,{useEffect} from "react";
import "./Card.css";
import { useLocation } from "react-router-dom";
import { NavLink, useParams } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineDelete } from "react-icons/ai";
import { BsFilterLeft } from "react-icons/bs";
import HeartButton from "./HeartButton";
import EmptyCart from "./EmptyCart";
import OtpLogin from "./OtpLogin";
import SlideUpModal from "./SlideupModel";
import CatlogPriceFilter from "./CatlogPriceFilter";
import { slugify } from "./Slugify";
import { useBio } from "./BioContext";
import { cloudinaryImg } from "../utils/cloudinariimg";

import { useRawProducts } from "../hooks/useRawProducts";
import { useFilteredProducts } from "../hooks/useFilteredProducts";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useSizeSelector } from "../hooks/useSizeSelector";
import { useCouponPrefetch } from "../hooks/useCouponPrefetch";

const SIZE_OPTIONS = ["S", "M", "L"];
const SORT_OPTIONS = ["Price: Low to High", "Price: High to Low", "Price Range", "Sizes"];

const Card = (props) => {
  const { wish } = useParams();
  const { handleClick, handleAddToCart, showloginpage, setshowloginpage, removewishlistonly } = useBio();
const location = useLocation();
  useCouponPrefetch();

  // 1) fetch the right raw list for this view (search / category / section / wish / etc.)
  const rawProducts = useRawProducts(props);

  // 2) derive the filtered + sorted list (memoized — no extra render pass)
  const {
    products,
    listKey,
    selectedSizes,
    handleSizeSelection,
    showSortPanel,
    setShowSortPanel,
    selectedSortOption,
    handleSortSelection,
  } = useFilteredProducts(rawProducts);

  // 3) infinite scroll — resets to the first batch whenever the underlying
  // filtered list actually changes (new category/search/filter/sort),
  // NOT on every render. `listKey` is a stable string, unlike `products` itself.
  const { visibleCount, loaderRef, hasMore } = useInfiniteScroll(products.length, {
    initialBatch: 4,
    step: 4,
    resetKey: listKey,
  });

  // 4) size bottom-sheet (wishlist "Add to Bag")
  const { prdallsizes, addtocartkeliyeid, sizesshow, setSizesShow, setShowSize } = useSizeSelector();

  const visibleProducts = products.slice(0, visibleCount);
useEffect(() => {
  const data = sessionStorage.getItem("catalogRestore");

  if (!data) return;

  const restore = JSON.parse(data);

  // दूसरी category/search/filter होने पर restore मत करो
  if (restore.listKey !== listKey) return;

  // पहले products render होने दो
  if (visibleProducts.length < restore.visibleCount) return;

  requestAnimationFrame(() => {
    window.scrollTo({
      top: restore.scrollY,
      behavior: "auto",
    });

    sessionStorage.removeItem("catalogRestore");
  });
}, [visibleProducts.length, listKey]);
  return (
    <>
      {/* Filter / Sort header */}
      <div
        className={!props.category ? "filter-containerrr" : "hidefiltersec"}
        style={{ borderBottom: "1px solid gray", backgroundColor: "white" }}
      >
        <div className="filter-row" style={{ display: "flex", alignItems: "start", justifyContent: "start" }}>
          <div className="filter-btn">
            <NavLink
              className="navlink"
              to="/filter"
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <BsFilterLeft size={20} />
              <span style={{ color: "black", fontFamily: "Oswald", fontSize: "15px", fontWeight: "bold" }}>
                Filter and sort
              </span>
            </NavLink>
          </div>
        </div>

        {showSortPanel && (
          <div
            className="bottom-panel"
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              width: "100%",
              backgroundColor: "#fff",
              borderTopLeftRadius: "15px",
              borderTopRightRadius: "15px",
              boxShadow: "0 -4px 10px rgba(0,0,0,0.1)",
              padding: "15px",
              zIndex: 1000,
              minHeight: "50vh",
              overflowY: "auto",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <h4 style={{ fontSize: "16px", fontWeight: "bold", margin: 0, color: "#333" }}>Sort Options</h4>
              <span style={{ cursor: "pointer", color: "#666" }} onClick={() => setShowSortPanel(false)}>
                <RxCross1 size={22} />
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {SORT_OPTIONS.map((option) => (
                <div
                  key={option}
                  onClick={() => handleSortSelection(option)}
                  style={{
                    border: selectedSortOption === option ? "1px solid #F15A29" : "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "10px",
                    cursor: "pointer",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      color: selectedSortOption === option ? "#F15A29" : "#333",
                      fontWeight: selectedSortOption === option ? "600" : "400",
                    }}
                  >
                    {option}
                  </p>
                  {option === "Price Range" && (
                    <div style={{ marginTop: "14px", paddingRight: "40%", backgroundColor: "#fff" }}>
                      <CatlogPriceFilter />
                    </div>
                  )}
                  {option === "Sizes" && (
                    <div>
                      {Object.keys(selectedSizes).map((category) => (
                        <div key={category} className="size-pnll">
                          <h5 style={{ padding: "10px 0", fontSize: "14px", fontWeight: "600" }}>{category}</h5>
                          {SIZE_OPTIONS.map((size) => (
                            <button
                              key={size}
                              style={{
                                margin: "3px",
                                padding: "6px 10px",
                                borderRadius: "5px",
                                border: selectedSizes[category]?.includes(size) ? "1px solid #F15A29" : "1px solid #ccc",
                                backgroundColor: selectedSizes[category]?.includes(size) ? "#FFF5F2" : "#fff",
                                color: selectedSizes[category]?.includes(size) ? "#F15A29" : "#333",
                              }}
                              onClick={() => handleSizeSelection(category, size)}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product grid */}
      <div className="unique-product-container" style={{ marginTop: !props.category ? "" : "0px" }}>
        {visibleProducts.length > 0
          ? visibleProducts.map((product) => (
              <div
                key={product._id || product.itemid || product.productId}
                className="product-card"
                style={{ boxShadow: "none", margin: "1px auto" }}
              >
                <div className="image-container" style={{ position: "relative", marginBottom: "0" }}>
                  {/* <NavLink
                    to={`/productdescription/${slugify(product.title)}/${
                      !wish ? product._id : product?.itemid ?? product.productId
                    }/${product?.color || product?.defaultColor}`}
                  > */}
                  <NavLink
  to={`/productdescription/${slugify(product.title)}/${
    !wish ? product._id : product?.itemid ?? product.productId
  }/${product?.color || product?.defaultColor}`}
  onClick={() => {
    sessionStorage.setItem(
      "catalogRestore",
      JSON.stringify({
        scrollY: window.scrollY,
        visibleCount,
        listKey,
      })
    );
  }}
>
                    <div
                      className="product-image-wrapper"
                      style={{ position: "relative", width: "100%", height: "300px", borderRadius: "6px", overflow: "hidden" }}
                    >
                      <img
                        src={cloudinaryImg(product.image?.[0], 500)}
                        alt={product?.title || "Product"}
                        className="product-image"
                        loading="lazy"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />

                      {product?.colors?.some((color) => color?.sizes?.some((s) => s.quantity === 0)) && (
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "18px",
                            borderRadius: "6px",
                            zIndex: 2,
                          }}
                        >
                          SOLD OUT
                        </div>
                      )}
                    </div>
                  </NavLink>

                  <div className="heart-icon" style={{ position: "absolute", top: "10px", right: "10px", zIndex: 3 }}>
                    {!wish ? (
                      product.colors && product.colors.length > 0 ? (
                        <div onClick={() => handleClick(product, product.colors?.[0]?._id)}>
                          <HeartButton cardid={product.colors?.[0]?._id} dw={30} dh={30} dmt={-8} dml={-8} />
                        </div>
                      ) : null
                    ) : (
                      <AiOutlineDelete
                        onClick={() => removewishlistonly(product?.itemid || product?.productId)}
                        style={{ color: "black", position: "relative", left: "-3px", bottom: "2px" }}
                        size={15}
                      />
                    )}
                  </div>
                </div>

                <div className="product-details">
                  <span className="product-title" style={{ fontFamily: "Oswald", fontWeight: "600", fontSize: "15px" }}>
                    {product.description?.length > 10 ? `${product.description.slice(0, 17)}...` : product.description}
                  </span>

                  <div className="product-pricing">
                    <span className="original-price" style={{ fontFamily: "Oswald" }}>
                      ₹{product?.price}
                    </span>
                    <span className="current-price" style={{ fontFamily: "Oswald" }}>
                      ₹{product?.discountprice}
                    </span>
                    <span className="discount" style={{ fontFamily: "Oswald", color: "red" }}>
                      {product?.discount}% off
                    </span>
                  </div>

                  {wish && (
                    <button
                      className="delivery-info"
                      style={{
                        padding: "10px",
                        background: "black",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        marginBottom: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onClick={() => setShowSize(product?.itemid || product?.productId)}
                    >
                      Add to Bag
                    </button>
                  )}
                </div>
              </div>
            ))
          : wish && (
              <div style={{ width: "90vw", padding: "0", margin: "0" }}>
                <EmptyCart endpoint="wishlist" />
              </div>
            )}

        {/* Infinite-scroll sentinel — only rendered while more items remain */}
        {hasMore && (
          <div
            ref={loaderRef}
            style={{ width: "100%", textAlign: "center", padding: "20px", gridColumn: "1 / -1" }}
          >
            Loading more products...
          </div>
        )}
      </div>

      {/* Size bottom sheet */}
      <div className={`abhayraj-bottom-sheet ${sizesshow ? "abhayraj-show" : ""}`}>
        <div className="abhayraj-sheet-header">
          <span>Select Size</span>
          <button onClick={() => setSizesShow(false)} className="abhayraj-close-button">
            ✖
          </button>
        </div>
        <div className="abhayraj-size-buttons-wrapper">
          {prdallsizes.map((size, index) => (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} key={index}>
              <button
                className="abhayraj-size-button"
                onClick={() => handleAddToCart(addtocartkeliyeid, 1, size.size)}
              >
                <span style={{ textAlign: "center" }}>{size.size}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {showloginpage && (
        <SlideUpModal show={showloginpage} onClose={() => setshowloginpage(false)}>
          <OtpLogin />
        </SlideUpModal>
      )}
    </>
  );
};

export default Card;