import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Card.css";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
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
import { useLoading } from "./LoadingContext";
import { cloudinaryImg } from "../utils/cloudinariimg";

// === Optimized Card component ===
// Key improvements:
// 1) Clear separation of fetching vs local filtering/sorting
// 2) AbortController + fetchId to avoid race conditions (outdated responses ignored)
// 3) Single source-of-truth: originalProducts (raw normalized array) and derived products (filtered)
// 4) Minimal and stable effect dependencies
// 5) Defensive normalization of API response

const normalizeProductDetails = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.products)) {
    // common shape: { products: [ { productdetails: [...] }, ... ] }
    const byDetails = data.products.flatMap((p) => (Array.isArray(p.productdetails) ? p.productdetails : Array.isArray(p) ? p : []));
    if (byDetails.length) return byDetails;
    return data.products;
  }
  if (Array.isArray(data.products?.productdetails)) return data.products.productdetails;
  if (Array.isArray(data.productdetails)) return data.productdetails;
  return [];
};

const applyFiltersAndSort = ({ items = [], filters = {}, selectedSizes = {}, sortOption = "", externalSortOption = "", newarrival = [], bestsellingIds = [] }) => {
  if (!Array.isArray(items)) return [];
  let filtered = [...items];

  const { pricerangemin = 0, pricerangemax = Infinity, sizes = [], color = [], categories = [], sortBy } = filters || {};

  // price filter (defensive)
  if (filters.pricerangemin || filters.pricerangemax) {
    filtered = filtered.filter((p) => typeof p.discountprice === 'number' && p.discountprice >= pricerangemin && p.discountprice <= pricerangemax);
  }

  // sizes filter (from Filter context)
  if (Array.isArray(sizes) && sizes.length > 0) {
    filtered = filtered.filter((product) =>
      product.colors?.some((c) => c.sizes?.some((s) => sizes.includes(s.size)))
    );
  }

  // color filter
  if (Array.isArray(color) && color.length > 0) {
    filtered = filtered.filter((p) => color.includes((p.defaultColor || "").toLowerCase()));
  }

  // categories filter
  if (Array.isArray(categories) && categories.length > 0) {
    filtered = filtered.filter((p) => categories.includes(p.category));
  }

  // selectedSizes (UI size panel) - selectedSizes = { "Top Wear": ["S"], ... }
  if (Object.values(selectedSizes).flat().length > 0) {
    const sizeList = Object.values(selectedSizes).flat();
    filtered = filtered.filter((product) => product.colors?.some((c) => c.sizes?.some((s) => sizeList.includes(s.size))));
  }

  // External sort flags (sortOption / sortBy)
  const effectiveSort = externalSortOption || sortBy || sortOption;
  switch (effectiveSort) {
    case "Price: Low to High":
      filtered.sort((a, b) => (a.discountprice || 0) - (b.discountprice || 0));
      break;
    case "Price: High to Low":
      filtered.sort((a, b) => (b.discountprice || 0) - (a.discountprice || 0));
      break;
    case "New Arrival":
      // newarrival passed as array of ProductId strings
      if (Array.isArray(newarrival) && newarrival.length > 0) {
        const ids = newarrival.map((n) => n?.ProductId?.toString());
        filtered = filtered.filter((p) => ids.includes(p._id?.toString()));
      }
      break;
    case "Best Seller":
      if (Array.isArray(bestsellingIds) && bestsellingIds.length > 0) {
        filtered = filtered.filter((p) => bestsellingIds.includes(p._id?.toString()));
      }
      break;
    default:
      break;
  }

  return filtered;
};

const Card = (props) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { section, category, bestsale, store, rent, wish } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const { setIsLoading } = useLoading();
  const { filters, wishlistdata, productdataonlydetail, productdata, newarrival, bestsellingdata, handleClick, handleAddToCart, showloginpage, setshowloginpage, sortOption,fetchCoupons,coupons,removewishlistonly,guestWishlist,isLoggedIn,productfetch ,hasMore,
  page} = useBio();

  // local UI states
  const [originalProducts, setOriginalProducts] = useState([]); // canonical raw data from server (normalized)
  const [products, setProducts] = useState([]); // derived (filtered) list shown in UI
  const [selectedSizes, setSelectedSizes] = useState({ "Top Wear": [], "Bottom Wear": [] });
  const [showSortPanel, setShowSortPanel] = useState(false);
  const [showSizePanel, setShowSizePanel] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [prdallsizes, setPrdAllSizes] = useState([]);
  const [addtocartkeliyeid, setAddToCartKeliyeId] = useState(null);
  const [sizesshow, setSizesShow] = useState(false);

  // fetch control
  const latestFetchId = useRef(0);

  // Helper: selects a color id and prepares sizes (kept as original behavior)
  const setShowSize = (id) => {
    console.log("setshowsize",id)
    const prd = productdataonlydetail
      .map((product) => {
        const matchingColor = product.colors.find((color) => color._id === id);
        if (matchingColor) {
          return { ...product, colors: [{ ...matchingColor, price: product.price, discountprice: product.discountprice, shopname: product.shopname, shopaddress: product.shopaddress, discount: product.discount }] };
        }
        return null;
      })
      .filter(Boolean);

    if (prd.length > 0) {
      const siz = prd[0].colors[0].sizes.map((e) => e);
      setPrdAllSizes(siz);
      setAddToCartKeliyeId(prd[0].colors[0]);
      setSizesShow(true);
    }
  };

  const handleSizeSelection = (category, size) => {
    setSelectedSizes((prev) => {
      const updated = { ...prev };
      if (!Array.isArray(updated[category])) updated[category] = [];
      if (updated[category].includes(size)) {
        updated[category] = updated[category].filter((s) => s !== size);
      } else {
        updated[category] = [...updated[category], size];
      }
      return updated;
    });
  };

  // Fetch products based on route / props. This effect only runs when URL identifying params change.
  useEffect(() => {
    let active = true;
    const fetchId = ++latestFetchId.current; // bump fetchId
    const controller = new AbortController();

    const doSet = (items) => {
      console.log("itemofwish",items)
      // ignore outdated responses
      if (fetchId !== latestFetchId.current) return;
      setOriginalProducts(items);
      setProducts(() => applyFiltersAndSort({ items, filters, selectedSizes, sortOption: selectedSortOption, externalSortOption: sortOption, newarrival, bestsellingIds: (bestsellingdata || []).map(b => b.productId?.toString()) }));
    };



    const fetchProducts = async (url) => {
      try {
        setIsLoading(true);
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error("Network error");
        const data = await res.json();
        
        const productdetails = normalizeProductDetails(data);
        console.log("data comes in shoping",productdetails)

        doSet(productdetails);
      } catch (err) {
        if (err.name === "AbortError") return; // aborted
        console.error("fetchProducts error", err);
        doSet([]);
      } finally {
        if (fetchId === latestFetchId.current) setIsLoading(false);
      }
    };

    // Decide which source to load (priority order) — only one fetch decision per effect run.
    // Cases: search query -> props.category -> section -> rent -> others -> store/wishlist handled with local data
    (async () => {
      // clear current list while loading
      setProducts([]);
      setOriginalProducts([]);

      if (query) {
        await fetchProducts(`${apiUrl}/search?q=${encodeURIComponent(query)}`);
        return;
      }

      if (props.category) {
        await fetchProducts(`${apiUrl}/productmodel?operation=filtered&section=${encodeURIComponent(props.category)}`);
        return;
      }

      if (section && section !== "newarrivals") {
        await fetchProducts(`${apiUrl}/productmodel?operation=filtered&section=${encodeURIComponent(section)}`);
        return;
      }

      // newarrivals is a special case: we derive from productdata and newarrival index
      if (section === "newarrivals") {
        // rely on productdata being present in context
        const targetIds = (newarrival || []).map((e) => e.ProductId?.toString()).filter(Boolean);
        const flattened = (productdata || []).flatMap((p) => Array.isArray(p.productdetails) ? p.productdetails : []);
        const filteredProducts = flattened.filter((prod) => targetIds.includes(prod._id?.toString()));
        doSet(filteredProducts);
        return;
      }

      // if store (client-side data available), use it
//       if (store) {
//         productfetch("all")
//       // await fetchProducts(`${apiUrl}/productmodel?operation=all`);
// if(productdataonlydetail?.length > 0){
//         doSet(productdataonlydetail);
// }
//         return;
//       }
if (store) {
  // 🔥 sirf ek baar fetch karo
  if (originalProducts.length === 0) {
    productfetch("all");
  }

  // 🔥 context data aane ke baad UI set karo
  if (productdataonlydetail?.length > 0) {
    doSet(productdataonlydetail);
  }

  return;
}


      // rent data and wish handled similarly by parent/context; if they are present, use them
      if (rent && Array.isArray(productdata) && productdata.length > 0) {
        // assume rentdata passed in productdata or context; caller should supply rentdata accordingly
        doSet(productdata);
        return;
      }

      // if (wish && Array.isArray(wishlistdata) && wishlistdata.length > 0 ) {
      //   doSet(wishlistdata);
      //   return;
      // }
      if (wish) {
        
  doSet(isLoggedIn ? wishlistdata : guestWishlist);
  return;
}


      // default fallback: fetch a generic listing endpoint
      await fetchProducts(`${apiUrl}/productmodel?operation=list`);

    })();

    return () => {
      active = false;
      controller.abort();
    };

    // only when url-identifying params change
  }, [apiUrl, section, category, props.category, query, store, rent, wish, productdataonlydetail, productdata, newarrival, bestsellingdata,guestWishlist,wishlistdata
    
  ]);

  // Local filtering and sorting effect: runs when filters or UI sort/size selections change.
  // This DOES NOT trigger network fetch; it derives 'products' from originalProducts.
  useEffect(() => {
    const derived = applyFiltersAndSort({ items: originalProducts, filters, selectedSizes, sortOption: selectedSortOption, externalSortOption: sortOption, newarrival, bestsellingIds: (bestsellingdata || []).map(b => b.productId?.toString()) });
    setProducts(derived);
  }, [originalProducts, filters, selectedSizes, selectedSortOption, sortOption, newarrival, bestsellingdata]);


      useEffect(() => {
      const timer = setTimeout(() => {
        console.log("🍿 Checking if product has category and tag (delayed):",productdataonlydetail);
    
          console.log("📢 Calling fetchCoupons with:", productdataonlydetail?.cate, productdataonlydetail.tag);
          fetchCoupons("all","all");
        // console.log("copuen",coupons) 
      }, 200);
    
      return () => clearTimeout(timer);
    }, [productdataonlydetail]);
  // UI helpers
  const removeSortFilter = () => {
    setSelectedSortOption("");
    setProducts(applyFiltersAndSort({ items: originalProducts, filters, selectedSizes, externalSortOption: sortOption }));
  };

  const handleSortSelection = (option) => {
    setSelectedSortOption(option);
  };

  // quick debug-safe rendering protection
  if (!Array.isArray(products)) return null;

  return (
    <>
      {/* Filter / Sort header */}
      <div className={!props.category ? "filter-containerrr" : "hidefiltersec"} style={{ borderBottom: "1px solid gray", backgroundColor: "white" }}>
        <div className="filter-row" style={{ display: "flex", alignItems: "start", justifyContent: "start" }}>
          <div className="filter-btn">
            <NavLink className='navlink' to={`/filter`} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <BsFilterLeft size={20} />
              <span style={{ color: "black", fontFamily: "Oswald", fontSize: "15px", fontWeight: "bold" }}>Filter and sort</span>
            </NavLink>
          </div>
        </div>

        {showSortPanel && (
          <div className="bottom-panel" style={{ position: "fixed", bottom: 0, left: 0, width: "100%", backgroundColor: "#fff", borderTopLeftRadius: "15px", borderTopRightRadius: "15px", boxShadow: "0 -4px 10px rgba(0,0,0,0.1)", padding: "15px", zIndex: 1000, minHeight: "50vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <h4 style={{ fontSize: "16px", fontWeight: "bold", margin: 0, color: "#333" }}>Sort Options</h4>
              <span style={{ cursor: "pointer", color: "#666" }} onClick={() => setShowSortPanel(false)}><RxCross1 size={22} /></span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {["Price: Low to High", "Price: High to Low", "Price Range", "Sizes"].map((option) => (
                <div key={option} onClick={() => handleSortSelection(option)} style={{ border: selectedSortOption === option ? "1px solid #F15A29" : "1px solid #ddd", borderRadius: "10px", padding: "10px", cursor: "pointer" }}>
                  <p style={{ margin: 0, fontSize: "14px", color: selectedSortOption === option ? "#F15A29" : "#333", fontWeight: selectedSortOption === option ? "600" : "400" }}>{option}</p>
                  {option === "Price Range" && <div style={{ marginTop: "14px", paddingRight: "40%", backgroundColor: "#fff" }}><CatlogPriceFilter /></div>}
                  {option === "Sizes" && (
                    <div>
                      {Object.keys(selectedSizes).map((category) => (
                        <div key={category} className="size-pnll">
                          <h5 style={{ padding: "10px 0", fontSize: "14px", fontWeight: "600" }}>{category}</h5>
                          {["S", "M", "L"].map((size) => (
                            <button key={size} style={{ margin: "3px", padding: "6px 10px", borderRadius: "5px", border: selectedSizes[category]?.includes(size) ? "1px solid #F15A29" : "1px solid #ccc", backgroundColor: selectedSizes[category]?.includes(size) ? "#FFF5F2" : "#fff", color: selectedSizes[category]?.includes(size) ? "#F15A29" : "#333" }} onClick={() => handleSizeSelection(category, size)}>{size}</button>
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
        { console.log("productkesath",products)}
        {products.length > 0 ? (
         
          products.map((product) => (
            
           
            <div key={product._id || product.itemid || Math.random()} className="product-card" style={{ boxShadow: "none", margin: "1px auto" }}>

              <div className="image-container" style={{ position: "relative", marginBottom: "0" }}>
                <NavLink to={`/productdescription/${slugify(product.title)}/${!wish ? product._id : product?.itemid ?? product.productId}/${product?.color || product?.defaultColor}`}>
                  <div className="product-image-wrapper" style={{ position: "relative", width: "100%", height: "300px", borderRadius: "6px", overflow: "hidden" }}>
                    <img src={cloudinaryImg(product.image?.[0])} alt={product?.title || "Product"} className="product-image" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />

                    {product?.colors?.some((color) => color?.sizes?.some((s) => s.quantity === 0)) && (
                      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center", color: "white", fontWeight: "bold", fontSize: "18px", borderRadius: "6px", zIndex: 2 }}>SOLD OUT</div>
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
                    <AiOutlineDelete onClick={() => removewishlistonly(product?.itemid||product?.productId)} style={{ color: "black", position: 'relative', left: "-3px", bottom: "2px" }} size={15} />
                  )}
                </div>

              </div>

              <div className="product-details">
                <span className="product-title" style={{ fontFamily: "Oswald", fontWeight: "600", fontSize: "15px" }}>{product.description?.length > 10 ? (product.description?.slice(0, 17) + `...`) : (product.description)}</span>
             

                <div className="product-pricing">
             {/* <span className="current-price" style={{ fontFamily: "Oswald",color: "rgb(52 195 52)" }}>Get it For ₹{product?.discountprice - coupons[0]?.discountValue}</span> */}

                  <span className="original-price" style={{ fontFamily: "Oswald" }}>₹{product?.price}</span>
                  <span className="current-price" style={{ fontFamily: "Oswald" }}>₹{product?.discountprice}</span>
                  <span className="discount" style={{ fontFamily: "Oswald", color: "red" }}>{product?.discount}% off</span>
                </div>
             {/* <span className="current-price" style={{ fontFamily: "Oswald",color: "rgb(52 195 52)",fontSize:"12.8px" }}>Get it For ₹{product?.discountprice - coupons[0]?.discountValue}</span> */}
<span
  className="current-price"
  style={{
    fontFamily: "Oswald",
    color: "rgb(52 195 52)",
    fontSize: "12.8px",
  }}
>
  Get it For ₹
  {coupons?.[0]?.discountType === "fixed"
    ? Math.floor(product?.discountprice - coupons?.[0]?.discountValue)
    : Math.floor(
        product?.discountprice -
          (product?.discountprice * coupons?.[0]?.discountValue) / 100
      )}
</span>


                {!wish ? null : (
                  <button className="delivery-info" style={{ padding: "10px", background: "black", color: "white", border: "none", borderRadius: "5px", marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setShowSize(product?.itemid||product?.productId)}>Add to Bag</button>
                )}

              </div>

            </div>
          ))
        ) : (
          wish ? (
    <div style={{ width: "90vw", padding: "0", margin: "0" }}>
      <EmptyCart endpoint="wishlist" />
    </div>
  ) : null
        )}
      </div>

      {/* Size bottom sheet */}
      <div className={`abhayraj-bottom-sheet ${sizesshow ? 'abhayraj-show' : ''}`}>
        <div className="abhayraj-sheet-header">
          <span>Select Size</span>
          <button onClick={() => setSizesShow(false)} className="abhayraj-close-button">✖</button>
        </div>
        <div className="abhayraj-size-buttons-wrapper">
          {prdallsizes.map((size, index) => (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} key={index}>
              <button className="abhayraj-size-button" onClick={() => handleAddToCart(addtocartkeliyeid, 1, size.size)}><span style={{ textAlign: "center" }}>{size.size}</span></button>
            </div>
          ))}
        </div>
      </div>

      {showloginpage ? (
        <SlideUpModal show={showloginpage} onClose={() => setshowloginpage(false)}>
          <OtpLogin />
        </SlideUpModal>
      ) : null}

    </>
  );
};

export default Card;
