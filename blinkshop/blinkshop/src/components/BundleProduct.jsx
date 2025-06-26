// import React from 'react';

// const BundleProduct = ({ product1, product2}) => {
//   const containerStyle = {
    
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     padding: "20px",
//     fontFamily: "sans-serif",
//     background: "#f9f9f9"
//   };

//   const titleStyle = {
//     // border:"2px solid red",
//     fontSize: "18px",
//     fontWeight: "lighter",
//     marginBottom: "150px",
//     textAlign: "start"
//   };

//   const imagesWrapperStyle = {
//     border:"2px solid red",
//     width:"100vw",
//     height:"400px",
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "start",
//     position: "relative",
//     flexWrap: "wrap",
//     gap: "20px",
   
//   };

//   const imageBoxStyle = {
    
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center"
    
//   };

//   const imageStyle = {
//     width: "150px",
//     height: "200px",
//     objectFit: "cover",
//     borderRadius: "10px",
//     boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//   };

//   const connectorLineStyle = {
//     position: "absolute",
//     top: "30%",
//     left: "50%",
//     width: "25px",
//     height: "2px",
//     backgroundColor: "#000",
//     transform: "translateX(-50%)",
//     zIndex: 0
//   };

//   const offerTextStyle = {
    
//     fontSize: "14px",
//     color: "#333",
//     textAlign: "center"
//   };

//   const sizesWrapperStyle = {
//     display: "flex",
//     gap: "8px",
//     marginTop: "6px",
//     flexWrap: "wrap",
//     justifyContent: "center"
//   };

//   const sizeStyle = {
//     padding: "4px 10px",
//     border: "1px solid #888",
//     borderRadius: "4px",
//     fontSize: "13px",
//     backgroundColor: "#fff"
//   };
//   if(product1 ){
//   console.log("prd1 or prd2 agye",product1,product2)
//   }

//   return (
//     <div style={containerStyle}>
//      <div style={titleStyle}>
//            Perfect Bundle
//       </div>

//       <div style={imagesWrapperStyle}>
//         <div style={imageBoxStyle}>
//           <img src={product1?.image} alt="Product 1" style={imageStyle} />
//           <div style={sizesWrapperStyle}>
//             {product1?.sizes?.map((size, index) => (
//               <div key={index} style={sizeStyle}>{size.size}</div>
//             ))}
//           </div>
//         </div>

//         <div style={connectorLineStyle}></div>

//         <div style={imageBoxStyle}>
//           <img src={product2[0]?.sizes[0].image[0]} alt="Product 2" style={imageStyle} />
//           <div style={sizesWrapperStyle}>
//             {product2[0]?.sizes?.map((size, index) => (
//               <div key={index} style={sizeStyle}>{size.size}</div>
//             ))}
//           </div>
          
//         </div>
       
//         <div style={titleStyle}>
//             Total Price <span className='original-price'>
//             ₹{product1.discountprice + (product2[0].discountprice || 100)}
//         </span>
//         <span>
//         ₹{product1.discountprice + (product2[0].discountprice || 100)}
//         </span>
//         <span></span>
//       </div>
//       </div>

      
//     </div>
//     // <h1>hello</h1>
//   );
// };

// export default BundleProduct;

// import React from "react";
// import { useBio } from "./BioContext";


// const BundleProduct = ({ products, totalPrice, originalPrice }) => {

//     const {handleAddToCart}=useBio()
//   const styles = {
//     container: {
//       maxWidth: "500px",
//       margin: "auto",
//       padding: "20px",
//       border: "1px solid #ddd",
//       fontFamily: "sans-serif",
//     },
//     title: {
//       textAlign: "center",
//       fontWeight: "bold",
//       fontSize: "20px",
//       marginBottom: "20px",
//     },
//     imageRow: {
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       gap: "10px",
//       marginBottom: "10px",
//       flexWrap: "wrap"
//     },
//     image: {
//       width: "100px",
//       height: "120px",
//       objectFit: "cover",
//       borderRadius: "6px",
//     },
//     plus: {
//       fontSize: "24px",
//       fontWeight: "bold",
//     },
//     priceRow: {
//       textAlign: "center",
//       marginBottom: "15px",
//     },
//     strike: {
//       textDecoration: "line-through",
//       marginRight: "10px",
//       color: "#999",
//     },
//     finalPrice: {
//       fontWeight: "bold",
//       fontSize: "18px",
//       color: "#111",
//     },
//     button: {
//       width: "100%",
//       padding: "10px",
//       backgroundColor: "#fff",
//       border: "1px solid #000",
//       fontWeight: "bold",
//       marginBottom: "20px",
//       cursor: "pointer",
//     },
//     itemRow: {
//         // border:"2px solid red",
//       display: "flex",
//     //   flexDirection:"col"
      
//       alignItems: "flex-start",
//       gap: "1px",
//       marginBottom: "15px",
//     },
//     checkbox: {
        
//       marginTop: "37px",
//     },
//     productDetails: {
        
//         width:"300px",
//       flexGrow: 1,
//     },
//     productTitle: {
//       fontWeight: "bold",
//       fontSize: "14px",
//       marginBottom: "4px",
//     },
//     select: {
        
//       padding: "6px",
//       fontSize: "13px",
//       marginBottom: "5px",
//       width: "100%",
//     },
//     itemPriceRow: {
//       fontSize: "13px",
//       display: "flex",
//       gap: "8px",
//       alignItems: "center",
//     },
//     itemStrike: {
//       textDecoration: "line-through",
//       color: "#999",
//     },
//     itemFinal: {
//       color: "#000",
//       fontWeight: "600",
//     },
//   };
// if(products){
//     console.log("bundel m kya bundel mila",products )
// }
//   return (
//     <div style={styles.container}>
//       <div style={styles.title}>POPULAR BUNDLES</div>

//       <div style={styles.imageRow}>
//         {products?.map((p, index) => (
//           <React.Fragment key={index}>
//             {/* <span>{p.productId}</span> */}
//             <img src={p.image} alt="product" style={styles.image} />
//             {index < products.length - 1 && <div style={styles.plus}>+</div>}
//           </React.Fragment>
//         ))}
//       </div>

//       <div style={styles.priceRow}>
//         <span style={styles.strike}>₹{originalPrice}</span>
//         <span style={styles.finalPrice}>₹{totalPrice}</span>
//       </div>

//       <button style={styles.button} onClick={()=>{ handleAddToCart(products,products[0])}}>ADD SELECTED TO CART</button>

//       {products?.map((p, idx) => (
//         <div style={styles.itemRow} key={idx}>
//           <input type="checkbox" defaultChecked style={styles.checkbox} />
//           <div style={styles.productDetails}>
//             <div style={styles.productTitle}>{p.title}</div>
//             <select style={styles.select}>
//               {p.sizes?.map((s, i) => (
//                 <option key={i} value={s.size}>
//                   {s.size} / {p.color}
//                 </option>
//               ))}
//             </select>
//             <div style={styles.itemPriceRow}>
//               <span style={styles.itemStrike}>₹{p.original}</span>
//               <span style={styles.itemFinal}>₹{p.price}</span>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BundleProduct;

import React, { useState } from "react";
import { useBio } from "./BioContext";

const BundleProduct = ({ products, totalPrice, originalPrice, source }) => {
  const { handleAddToCart } = useBio();
console.log("source",source)
  if(products){
    console.log("bundleprd ke andr",products)
  }
const [selectedItems, setSelectedItems] = useState(
  products.map((p) => ({
    ...p,
    sizes: Array.isArray(p?.sizes) && p?.sizes?.length > 0 ? [p.sizes[0]] : [],
    selected: true,
  }))
);

  const handleCheckboxChange = (productId) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, selected: !item.selected }
          : item
      )
    );
  };

  const handleSizeChange = (productId, selectedSize) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, sizes: [{ size: selectedSize }] }
          : item
      )
    );
  };

  const finalSelectedItems = selectedItems.filter((item) => item.selected);
  console.log("dekhte h kese state selete hui",finalSelectedItems)

  const styles = {
    container: {
      maxWidth: "500px",
      margin: "auto",
      padding: "20px",
      border: "1px solid #ddd",
      fontFamily: "sans-serif",
    },
    title: {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: "20px",
      marginBottom: "20px",
      display:source=="productdescription" ?('flex'):('none')
    },
    imageRow: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
      marginBottom: "10px",
      flexWrap: "wrap",
    },
    image: {
      width: "100px",
      height: "120px",
      objectFit: "cover",
      borderRadius: "6px",
    },
    plus: {
      fontSize: "24px",
      fontWeight: "bold",
    },
    priceRow: {
      textAlign: "center",
      marginBottom: "15px",
    },
    strike: {
      textDecoration: "line-through",
      marginRight: "10px",
      color: "#999",
    },
    finalPrice: {
      fontWeight: "bold",
      fontSize: "18px",
      color: "#111",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#fff",
      border: "1px solid #000",
      fontWeight: "bold",
      marginBottom: "20px",
      cursor: "pointer",
      display:source=="productdescription" ?('flex'):('none')
    },
    itemRow: {
      display: "flex",
      alignItems: "flex-start",
      gap: "1px",
      marginBottom: "15px",
    },
    checkbox: {
      marginTop: "37px",
        display:source=="addtocart" || "checkout"?('none'):('flex') 
    },
    productDetails: {
        
      width: "300px",
      flexGrow: 1,
    },
    productTitle: {
      fontWeight: "bold",
      fontSize: "14px",
      marginBottom: "4px",
    },
    select: {
      padding: "6px",
      fontSize: "13px",
      marginBottom: "5px",
      width: "100%",
        display:source=="productdescription" ?('flex'):('none')
    },
    itemPriceRow: {
      fontSize: "13px",
      display: "flex",
      gap: "8px",
      alignItems: "center",
    },
    itemStrike: {
      textDecoration: "line-through",
      color: "#999",
    },
    itemFinal: {
      color: "#000",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>POPULAR BUNDLES</div>

      <div style={styles.imageRow}>
        {products?.map((p, index) => (
          <React.Fragment key={index}>
            <img src={p.image} alt="product" style={styles.image} />
            {index < products.length - 1 && <div style={styles.plus}>+</div>}
          </React.Fragment>
        ))}
      </div>

      <div style={styles.priceRow}>
        <span style={styles.strike}>₹{originalPrice}</span>
        <span style={styles.finalPrice}>₹{totalPrice}</span>
      </div>

      <button
        style={styles.button}
        // onClick={() => handleAddToCart(finalSelectedItems,1,'')}
         onClick={()=>{handleAddToCart(finalSelectedItems,1,'')}}
>
        ADD SELECTED TO CART
      </button>

      {selectedItems?.map((p, idx) => (
        <div style={styles.itemRow} key={idx}>
          <input
            type="checkbox"
            checked={p.selected}
            onChange={() => handleCheckboxChange(p.productId)}
            style={styles.checkbox}
          />
          <div style={styles.productDetails}>
            <div style={styles.productTitle}>{p.title}</div>
            <select
              style={styles.select}
              value={p.sizes?.[0]?.size}
              onChange={(e) => handleSizeChange(p.productId, e.target.value)}
            >
              {p.sizes?.map((s, i) => (
                <option key={i} value={s.size}>
                  {s.size} / {p.color}
                </option>
              ))}
            </select>
            <div style={styles.itemPriceRow}>
              <span style={styles.itemStrike}>₹{p.original}</span>
              <span style={styles.itemFinal}>₹{p.price}</span>
            </div>
          </div>
        </div>
      ))}

      {/* Debug */}
      {/* <pre>{JSON.stringify(finalSelectedItems, null, 2)}</pre> */}
    </div>
  );
};

export default BundleProduct;
