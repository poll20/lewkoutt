// import React, { useEffect, useState } from "react";
// import "./AvailableProduct.css"; // Importing external CSS
// import { useBio } from "../BioContext";
// import { FaEdit, FaSave, FaTrash } from "react-icons/fa"; // Importing Icons
// import { useDashboard } from "./DashboardContext";




// const AvailableProduct = () => {
//   const [products, setProducts] = useState([]); // State to hold products
//   const { productdataonlydetail } = useBio(); // Accessing product details from context
//   const { editordeleteinexisitingcategory,deletefromexistingproduct,dis } = useDashboard(); // Accessing the edit/delete function
//   const [editingIndex, setEditingIndex] = useState(null); // To track which row is being edited
//   const [searchQuery, setSearchQuery] = useState(""); // Search state
//    // Sort states for Price and Discount
//    const [sortPrice, setSortPrice] = useState(""); // "lowToHigh" or "highToLow"
//    const [sortDiscount, setSortDiscount] = useState(""); // "lowToHigh" or "highToLow"
   
//   const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products state
  
//   useEffect(() => {
//     if (productdataonlydetail) {
//       setProducts(productdataonlydetail);
//     }
//   }, [productdataonlydetail]);



//   // Filter and sort products based on search query and sort options
//   useEffect(() => {
//     let temp = products.filter((product) => {
//       const cate = product.cate ? product.cate.toLowerCase() : "";
//       const title = product.title ? product.title.toLowerCase() : "";
//       // We assume product.discount is numeric or can be parsed; if not, convert appropriately.
//       const discount = product.discount ? parseFloat(product.discount) : 0;
//       const query = searchQuery.toLowerCase();
//       return cate.includes(query) || title.includes(query) || discount.toString().includes(query);
//     });

//     // If both sortPrice and sortDiscount are selected, combine them.
//     if (sortPrice && sortDiscount) {
//       temp.sort((a, b) => {
//         const priceA = a.price || 0;
//         const priceB = b.price || 0;
//         const discountA = a.discount ? parseFloat(a.discount) : 0;
//         const discountB = b.discount ? parseFloat(b.discount) : 0;
//         // Sort by price first
//         const priceDiff =
//           sortPrice === "lowToHigh" ? priceA - priceB : priceB - priceA;
//         if (priceDiff !== 0) return priceDiff;
//         // If price is same, sort by discount
//         return sortDiscount === "lowToHigh"
//           ? discountA - discountB
//           : discountB - discountA;
//       });
//     } else if (sortPrice) {
//       temp.sort((a, b) => {
//         const priceA = a.price || 0;
//         const priceB = b.price || 0;
//         return sortPrice === "lowToHigh" ? priceA - priceB : priceB - priceA;
//       });
//     } else if (sortDiscount) {
//       temp.sort((a, b) => {
//         const discountA = a.discount ? parseFloat(a.discount) : 0;
//         const discountB = b.discount ? parseFloat(b.discount) : 0;
//         return sortDiscount === "lowToHigh"
//           ? discountA - discountB
//           : discountB - discountA;
//       });
//     }
//     setFilteredProducts(temp);
//   }, [searchQuery, products, sortPrice, sortDiscount]);

//   // Handle Edit click to enter editing mode
//   const handleEdit = (index) => {
//     setEditingIndex(index);
//   };



//   // Handle input changes for all text fields
//   const handleInputChange = (e, index, field) => {
//     const value = e.target.value;
//     const updatedProducts = [...products];
//     updatedProducts[index][field] = value;
//     setProducts(updatedProducts);
//   };

//   // Handle image uploads (multiple images)
//   const handleImageUpload = (e, index) => {
//     const files = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
//     const updatedProducts = [...products];
//     updatedProducts[index].image = [...updatedProducts[index].image, ...files];
//     setProducts(updatedProducts);
//   };

//   // Handle color change for a particular color field
//   const handleColorChange = (e, pIndex, cIndex) => {
//     const value = e.target.value;
//     const updatedProducts = [...products];
//     updatedProducts[pIndex].colors[cIndex].color = value;
//     setProducts(updatedProducts);
//   };

//   // Handle size, quantity, and size image changes for each size inside a color field
//   const handleSizeChange = (e, pIndex, cIndex, sIndex, field) => {
//     const value = e.target.value;
//     const updatedProducts = [...products];
//     updatedProducts[pIndex].colors[cIndex].sizes[sIndex][field] = value;
//     setProducts(updatedProducts);
//   };

//   // Handle size image upload for each size inside color
//   const handleSizeImageUpload = (e, pIndex, cIndex, sIndex) => {
//     const files = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
//     const updatedProducts = [...products];
//     updatedProducts[pIndex].colors[cIndex].sizes[sIndex].image = [...files];
//     setProducts(updatedProducts);
//   };

//   // Handle save action
//   const handleSave = (id, index) => {
//     const updatedProduct = products[index];
//     editordeleteinexisitingcategory(updatedProduct, id);
//     setEditingIndex(null); // Exit edit mode
//   };

//   // Handle Delete product action
//   const handleDelete = (index) => {
//     const updatedProducts = [...products];
//     updatedProducts.splice(index, 1); // Remove the selected product
//     setProducts(updatedProducts);
//   };

//   // Search functionality
//   useEffect(() => {
//     const filtered = products.filter((product) =>
//       (product.cate && product.cate.toLowerCase().includes(searchQuery.toLowerCase())) ||
//       (product.title && product.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
//       (product.discount&& product.discount.includes(searchQuery))
//     );
//     setFilteredProducts(filtered);
//   }, [searchQuery, products]);

// // Handle removing an image from a product
// const handleRemoveImage = (pIndex, imgIndex) => {
//   const updatedProducts = [...products];
//   updatedProducts[pIndex].image.splice(imgIndex, 1); // remove the clicked image
//   setProducts(updatedProducts);
// };

// // Handle removing an image from a size
// const handleRemoveSizeImage = (pIndex, cIndex, sIndex, imgIndex) => {
//   const updatedProducts = [...products];
//   updatedProducts[pIndex].colors[cIndex].sizes[sIndex].image.splice(imgIndex, 1);
//   setProducts(updatedProducts);
// };


//   return (
//     <>
    
//     <input
//     type="text"
//     placeholder="Search by Category, Title, or Discount Price..."
//     value={searchQuery}
//     onChange={(e) => setSearchQuery(e.target.value)}
//     className="search-bar"



//   />

//    {/* Dropdown for Sorting by Price */}
//    <select
//           value={sortPrice}
//           onChange={(e) => setSortPrice(e.target.value)}
//           className="sort-dropdown"
//         >
//           <option value="">Sort by Price</option>
//           <option value="lowToHigh">Price: Low to High</option>
//           <option value="highToLow">Price: High to Low</option>
//         </select>

//         {/* Dropdown for Sorting by Discount */}
//         <select
//           value={sortDiscount}
//           onChange={(e) => setSortDiscount(e.target.value)}
//           className="sort-dropdown"
//         >
//           <option value="">Sort by Discount</option>
//           <option value="lowToHigh">Discount: Low to High</option>
//           <option value="highToLow">Discount: High to Low</option>
//         </select>
//     <div className="admin-ka-dashtable-container">
//          {/* ✅ Search Bar Added */}
         
//       <h2 className="admin-ka-dashtable-title">Available Products</h2>
    
//       <h2 className="admin-ka-dashtable-title">
//         Number Of Products: {products.length}
//       </h2>
//       <table className="admin-ka-dashtable-table">
//         <thead>
//           <tr>
//             <th>Id</th>
//             <th>Category</th>
//             <th>Title</th>
//             <th>Tag</th>
//             <th>Description</th>
//             <th>Images</th>
//             <th>Price</th>
//             <th>Discount Price</th>
//             <th>Colors & Sizes</th>
//             <th>Discount</th>
//             <th>Actions</th> {/* New Column for Edit/Delete */}
//           </tr>
//         </thead>
//         <tbody>
//           {filteredProducts.map((product, index) => (
//             <tr key={index}>
//               <td>{product._id}</td>
//               <td>
//                 {editingIndex === index ? (
//                   <input
//                     type="text"
//                     value={product.cate}
//                     onChange={(e) => handleInputChange(e, index, "cate")}
//                   />
//                 ) : (
//                   product.cate
//                 )}
//               </td>
//               <td>
//                 {editingIndex === index ? (
//                   <input
//                     type="text"
//                     value={product.title}
//                     onChange={(e) => handleInputChange(e, index, "title")}
//                   />
//                 ) : (
//                   product.title
//                 )}
//               </td>
//               <td>
//                 {editingIndex === index ? (
//                   <input
//                     type="text"
//                     value={product.tag}
//                     onChange={(e) => handleInputChange(e, index, "tag")}
//                   />
//                 ) : (
//                   product.tag
//                 )}
//               </td>
//               <td>
//                 {editingIndex === index ? (
//                   <textarea
//                     value={product.description}
//                     onChange={(e) => handleInputChange(e, index, "description")}
//                   />
//                 ) : (
//                   product.description
//                 )}
//               </td>
//               {/* <td>
//                 {product.image.map((img, i) => (
//                   <img key={i} src={img} alt="Product" width="50" loading="lazy"/>
//                 ))}
//                 {editingIndex === index && (
//                   <input type="file" multiple onChange={(e) => handleImageUpload(e, index)} />
//                 )}
//               </td> */}
//               <td>
//   {product.image.map((img, i) => (
//     <div key={i} style={{ position: "relative", display: "inline-block", marginRight: "5px" }}>
//       <img src={img} alt="Product" width="50" height="50" loading="lazy" style={{ objectFit: "cover" }}/>
//       {editingIndex === index && (
//         <span
//           onClick={() => handleRemoveImage(index, i)}
//           style={{
//             position: "absolute",
//             top: "-5px",
//             right: "-5px",
//             background: "red",
//             color: "white",
//             borderRadius: "50%",
//             width: "18px",
//             height: "18px",
//             textAlign: "center",
//             lineHeight: "18px",
//             cursor: "pointer",
//             fontWeight: "bold",
//             fontSize: "12px",
//           }}
//         >
//           ×
//         </span>
//       )}
//     </div>
//   ))}
//   {editingIndex === index && (
//     <input type="file" multiple onChange={(e) => handleImageUpload(e, index)} />
//   )}
// </td>

//               <td>
//                 {editingIndex === index ? (
//                   <input
//                     type="number"
//                     value={product.price}
//                     onChange={(e) => handleInputChange(e, index, "price")}
//                   />
//                 ) : (
//                   `₹${product.price}`
//                 )}
//               </td>
//               <td>
//                 {editingIndex === index ? (
//                   <input
//                     type="number"
//                     value={product.discountprice}
//                     onChange={(e) => handleInputChange(e, index, "discountprice")}
//                   />
//                 ) : (
//                   `₹${product.discountprice}`
//                 )}
//               </td>
//               {/* Colors and Sizes Section */}
//               <td>
//                 {product.colors.map((color, cIndex) => (
//                   <div key={cIndex}>
//                     <strong>
//                       {editingIndex === index ? (
//                         <input
//                           type="text"
//                           value={color.color}
//                           onChange={(e) => handleColorChange(e, index, cIndex)}
//                         />
//                       ) : (
//                         color.color
//                       )}
//                     </strong>
//                     {color.sizes.map((size, sIndex) => (
//                       <div key={sIndex}>
//                         {editingIndex === index ? (
//                           <>
//                             <input
//                               type="text"
//                               placeholder="Size"
//                               value={size.size}
//                               onChange={(e) => handleSizeChange(e, index, cIndex, sIndex, "size")}
//                             />
//                             <input
//                               type="number"
//                               placeholder="Qty"
//                               value={size.quantity}
//                               onChange={(e) => handleSizeChange(e, index, cIndex, sIndex, "quantity")}
//                             />
//                             <input
//                               type="file"
//                               multiple
//                               onChange={(e) => handleSizeImageUpload(e, index, cIndex, sIndex)}
//                             />
//                           </>
//                         ) : (
//                           <>
//                             {size.size} ({size.quantity})
//                             {size.image.map((img, i) => (
//                               <img key={i} src={img} width="30" loading="lazy"/>
//                             ))}
//                           </>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 ))}
//               </td>
//               <td>
//                 {editingIndex === index ? (
//                   <input
//                     type="text"
//                     value={product.discount}
//                     onChange={(e) => handleInputChange(e, index, "discount")}
//                   />
//                 ) : (
//                   product.discount
//                 )}
//               </td>
//               <td>
//                 {editingIndex === index ? (
//                   <button onClick={() => handleSave(product._id, index)} className="action-button save">
//                     <FaSave />
//                   </button>
//                 ) : (
//                   <button onClick={() => handleEdit(index)} className="action-button edit">
//                     <FaEdit />
//                   </button>
//                 )}
//                 <button onClick={() => deletefromexistingproduct(product._id)} className="action-button delete">
//                   <FaTrash />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     </>
//   );
// };

// export default AvailableProduct;



// import React, { useEffect, useState } from "react";
// import { useBio } from "../BioContext";
// import { FaEdit, FaSave, FaTrash, FaSearch, FaSort, FaImage, FaTimes } from "react-icons/fa";
// import { useDashboard } from "./DashboardContext";

// const AvailableProduct = () => {
//   const [products, setProducts] = useState([]);
//   const { productdataonlydetail } = useBio();
//   const { editordeleteinexisitingcategory, deletefromexistingproduct, dis } = useDashboard();
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortPrice, setSortPrice] = useState("");
//   const [sortDiscount, setSortDiscount] = useState("");
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   // Responsive breakpoints
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//       setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     if (productdataonlydetail) {
//       setProducts(productdataonlydetail);
//     }
//   }, [productdataonlydetail]);

//   // Filter and sort products
//   useEffect(() => {
//     let temp = products.filter((product) => {
//       const cate = product.cate ? product.cate.toLowerCase() : "";
//       const title = product.title ? product.title.toLowerCase() : "";
//       const discount = product.discount ? parseFloat(product.discount) : 0;
//       const query = searchQuery.toLowerCase();
//       return cate.includes(query) || title.includes(query) || discount.toString().includes(query);
//     });

//     if (sortPrice && sortDiscount) {
//       temp.sort((a, b) => {
//         const priceA = a.price || 0;
//         const priceB = b.price || 0;
//         const discountA = a.discount ? parseFloat(a.discount) : 0;
//         const discountB = b.discount ? parseFloat(b.discount) : 0;
//         const priceDiff = sortPrice === "lowToHigh" ? priceA - priceB : priceB - priceA;
//         if (priceDiff !== 0) return priceDiff;
//         return sortDiscount === "lowToHigh" ? discountA - discountB : discountB - discountA;
//       });
//     } else if (sortPrice) {
//       temp.sort((a, b) => {
//         const priceA = a.price || 0;
//         const priceB = b.price || 0;
//         return sortPrice === "lowToHigh" ? priceA - priceB : priceB - priceA;
//       });
//     } else if (sortDiscount) {
//       temp.sort((a, b) => {
//         const discountA = a.discount ? parseFloat(a.discount) : 0;
//         const discountB = b.discount ? parseFloat(b.discount) : 0;
//         return sortDiscount === "lowToHigh" ? discountA - discountB : discountB - discountA;
//       });
//     }
//     setFilteredProducts(temp);
//   }, [searchQuery, products, sortPrice, sortDiscount]);

//   const handleEdit = (index) => setEditingIndex(index);

//   const handleInputChange = (e, index, field) => {
//     const value = e.target.value;
//     const updatedProducts = [...products];
//     updatedProducts[index][field] = value;
//     setProducts(updatedProducts);
//   };

//   const handleImageUpload = (e, index) => {
//     const files = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
//     const updatedProducts = [...products];
//     updatedProducts[index].image = [...updatedProducts[index].image, ...files];
//     setProducts(updatedProducts);
//   };

//   const handleColorChange = (e, pIndex, cIndex) => {
//     const value = e.target.value;
//     const updatedProducts = [...products];
//     updatedProducts[pIndex].colors[cIndex].color = value;
//     setProducts(updatedProducts);
//   };

//   const handleSizeChange = (e, pIndex, cIndex, sIndex, field) => {
//     const value = e.target.value;
//     const updatedProducts = [...products];
//     updatedProducts[pIndex].colors[cIndex].sizes[sIndex][field] = value;
//     setProducts(updatedProducts);
//   };

//   const handleSizeImageUpload = (e, pIndex, cIndex, sIndex) => {
//     const files = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
//     const updatedProducts = [...products];
//     updatedProducts[pIndex].colors[cIndex].sizes[sIndex].image = [...files];
//     setProducts(updatedProducts);
//   };

//   const handleSave = (id, index) => {
//     const updatedProduct = products[index];
//     editordeleteinexisitingcategory(updatedProduct, id);
//     setEditingIndex(null);
//   };

//   const handleDelete = (index) => {
//     const updatedProducts = [...products];
//     updatedProducts.splice(index, 1);
//     setProducts(updatedProducts);
//   };

//   const handleRemoveImage = (pIndex, imgIndex) => {
//     const updatedProducts = [...products];
//     updatedProducts[pIndex].image.splice(imgIndex, 1);
//     setProducts(updatedProducts);
//   };

//   const handleRemoveSizeImage = (pIndex, cIndex, sIndex, imgIndex) => {
//     const updatedProducts = [...products];
//     updatedProducts[pIndex].colors[cIndex].sizes[sIndex].image.splice(imgIndex, 1);
//     setProducts(updatedProducts);
//   };

//   // Styles
//   const styles = {
//     container: {
//       backgroundColor: '#f8fafc',
//       minHeight: '100vh',
//       padding: isMobile ? '16px' : '24px',
//       fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
//     },
//     header: {
//       backgroundColor: 'white',
//       borderRadius: '16px',
//       padding: isMobile ? '20px' : '32px',
//       marginBottom: '24px',
//       boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
//       border: '1px solid #e2e8f0',
//     },
//     title: {
//       fontSize: isMobile ? '24px' : '32px',
//       fontWeight: '700',
//       color: '#1e293b',
//       marginBottom: '8px',
//       lineHeight: '1.2',
//     },
//     subtitle: {
//       fontSize: isMobile ? '16px' : '18px',
//       color: '#64748b',
//       fontWeight: '500',
//       marginBottom: '24px',
//     },
//     controlsContainer: {
//       display: 'flex',
//       flexDirection: isMobile ? 'column' : 'row',
//       gap: '16px',
//       marginBottom: '24px',
//       alignItems: isMobile ? 'stretch' : 'center',
//       flexWrap: 'wrap',
//     },
//     searchContainer: {
//       position: 'relative',
//       flex: isMobile ? '1' : '2',
//       minWidth: isMobile ? '100%' : '300px',
//     },
//     searchInput: {
//       width: '100%',
//       padding: '12px 16px 12px 44px',
//       border: '2px solid #e2e8f0',
//       borderRadius: '12px',
//       fontSize: '14px',
//       fontWeight: '400',
//       color: '#374151',
//       backgroundColor: '#ffffff',
//       transition: 'all 0.2s ease',
//       outline: 'none',
//       boxSizing: 'border-box',
//     },
//     searchIcon: {
//       position: 'absolute',
//       left: '16px',
//       top: '50%',
//       transform: 'translateY(-50%)',
//       color: '#9ca3af',
//       fontSize: '16px',
//     },
//     dropdown: {
//       padding: '12px 16px',
//       border: '2px solid #e2e8f0',
//       borderRadius: '12px',
//       fontSize: '14px',
//       fontWeight: '500',
//       color: '#374151',
//       backgroundColor: '#ffffff',
//       cursor: 'pointer',
//       transition: 'all 0.2s ease',
//       outline: 'none',
//       minWidth: isMobile ? '100%' : '180px',
//       appearance: 'none',
//       backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")',
//       backgroundPosition: 'right 12px center',
//       backgroundRepeat: 'no-repeat',
//       backgroundSize: '16px',
//       paddingRight: '40px',
//     },
//     tableContainer: {
//       backgroundColor: 'white',
//       borderRadius: '16px',
//       overflow: 'hidden',
//       boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
//       border: '1px solid #e2e8f0',
//     },
//     table: {
//       width: '100%',
//       borderCollapse: 'collapse',
//       fontSize: '14px',
//     },
//     tableHeader: {
//       backgroundColor: '#f8fafc',
//       borderBottom: '2px solid #e2e8f0',
//     },
//     th: {
//       padding: isMobile ? '12px 8px' : '16px 24px',
//       textAlign: 'left',
//       fontWeight: '600',
//       color: '#374151',
//       fontSize: isMobile ? '12px' : '14px',
//       textTransform: 'uppercase',
//       letterSpacing: '0.05em',
//       whiteSpace: 'nowrap',
//     },
//     td: {
//       padding: isMobile ? '12px 8px' : '16px 24px',
//       borderBottom: '1px solid #f1f5f9',
//       color: '#374151',
//       fontSize: isMobile ? '12px' : '14px',
//       verticalAlign: 'top',
//     },
//     tr: {
//       transition: 'background-color 0.2s ease',
//     },
//     input: {
//       width: '100%',
//       padding: '8px 12px',
//       border: '1px solid #d1d5db',
//       borderRadius: '8px',
//       fontSize: '14px',
//       color: '#374151',
//       backgroundColor: '#ffffff',
//       transition: 'border-color 0.2s ease',
//       outline: 'none',
//       boxSizing: 'border-box',
//     },
//     textarea: {
//       width: '100%',
//       padding: '8px 12px',
//       border: '1px solid #d1d5db',
//       borderRadius: '8px',
//       fontSize: '14px',
//       color: '#374151',
//       backgroundColor: '#ffffff',
//       transition: 'border-color 0.2s ease',
//       outline: 'none',
//       resize: 'vertical',
//       minHeight: '60px',
//       boxSizing: 'border-box',
//     },
//     imageContainer: {
//       display: 'flex',
//       flexWrap: 'wrap',
//       gap: '8px',
//       alignItems: 'center',
//     },
//     imageWrapper: {
//       position: 'relative',
//       display: 'inline-block',
//     },
//     image: {
//       width: isMobile ? '40px' : '50px',
//       height: isMobile ? '40px' : '50px',
//       objectFit: 'cover',
//       borderRadius: '8px',
//       border: '2px solid #e2e8f0',
//     },
//     removeImageBtn: {
//       position: 'absolute',
//       top: '-6px',
//       right: '-6px',
//       backgroundColor: '#ef4444',
//       color: 'white',
//       borderRadius: '50%',
//       width: '20px',
//       height: '20px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       cursor: 'pointer',
//       fontSize: '12px',
//       fontWeight: 'bold',
//       border: '2px solid white',
//       transition: 'all 0.2s ease',
//     },
//     fileInput: {
//       padding: '6px 12px',
//       border: '1px solid #d1d5db',
//       borderRadius: '6px',
//       fontSize: '12px',
//       backgroundColor: '#f9fafb',
//       cursor: 'pointer',
//       marginTop: '8px',
//     },
//     colorSection: {
//       marginBottom: '12px',
//       padding: '12px',
//       backgroundColor: '#f8fafc',
//       borderRadius: '8px',
//       border: '1px solid #e2e8f0',
//     },
//     sizeItem: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px',
//       marginBottom: '8px',
//       padding: '8px',
//       backgroundColor: 'white',
//       borderRadius: '6px',
//       border: '1px solid #e2e8f0',
//       flexWrap: 'wrap',
//     },
//     sizeInput: {
//       width: isMobile ? '60px' : '80px',
//       padding: '4px 8px',
//       border: '1px solid #d1d5db',
//       borderRadius: '4px',
//       fontSize: '12px',
//     },
//     actionButton: {
//       padding: '8px 12px',
//       border: 'none',
//       borderRadius: '8px',
//       fontSize: '14px',
//       fontWeight: '500',
//       cursor: 'pointer',
//       transition: 'all 0.2s ease',
//       display: 'inline-flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       gap: '6px',
//       marginRight: '8px',
//       marginBottom: '4px',
//     },
//     editButton: {
//       backgroundColor: '#3b82f6',
//       color: 'white',
//     },
//     saveButton: {
//       backgroundColor: '#10b981',
//       color: 'white',
//     },
//     deleteButton: {
//       backgroundColor: '#ef4444',
//       color: 'white',
//     },
//     noData: {
//       textAlign: 'center',
//       padding: '48px 24px',
//       color: '#6b7280',
//       fontSize: '16px',
//     },
//   };

//   // Mobile Card Component
//   const MobileCard = ({ product, index }) => (
//     <div style={{
//       backgroundColor: 'white',
//       borderRadius: '12px',
//       padding: '20px',
//       marginBottom: '16px',
//       boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.1)',
//       border: '1px solid #e2e8f0',
//     }}>
//       <div style={{ marginBottom: '16px' }}>
//         <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
//           {editingIndex === index ? (
//             <input
//               type="text"
//               value={product.title}
//               onChange={(e) => handleInputChange(e, index, "title")}
//               style={styles.input}
//             />
//           ) : (
//             product.title
//           )}
//         </h3>
//         <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>
//           <strong>ID:</strong> {product._id}
//         </p>
//         <p style={{ fontSize: '14px', color: '#64748b' }}>
//           <strong>Category:</strong> {editingIndex === index ? (
//             <input
//               type="text"
//               value={product.cate}
//               onChange={(e) => handleInputChange(e, index, "cate")}
//               style={styles.input}
//             />
//           ) : (
//             product.cate
//           )}
//         </p>
//       </div>

//       {/* Price Section */}
//       <div style={{
//         display: 'flex',
//         gap: '16px',
//         marginBottom: '16px',
//         backgroundColor: '#f8fafc',
//         padding: '12px',
//         borderRadius: '8px',
//       }}>
//         <div>
//           <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Price</p>
//           <p style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>
//             {editingIndex === index ? (
//               <input
//                 type="number"
//                 value={product.price}
//                 onChange={(e) => handleInputChange(e, index, "price")}
//                 style={styles.input}
//               />
//             ) : (
//               `₹${product.price}`
//             )}
//           </p>
//         </div>
//         <div>
//           <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Discount Price</p>
//           <p style={{ fontSize: '16px', fontWeight: '600', color: '#10b981' }}>
//             {editingIndex === index ? (
//               <input
//                 type="number"
//                 value={product.discountprice}
//                 onChange={(e) => handleInputChange(e, index, "discountprice")}
//                 style={styles.input}
//               />
//             ) : (
//               `₹${product.discountprice}`
//             )}
//           </p>
//         </div>
//       </div>

//       {/* Images */}
//       <div style={{ marginBottom: '16px' }}>
//         <p style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Images</p>
//         <div style={styles.imageContainer}>
//           {product.image.map((img, i) => (
//             <div key={i} style={styles.imageWrapper}>
//               <img src={img} alt="Product" style={styles.image} loading="lazy" />
//               {editingIndex === index && (
//                 <span
//                   onClick={() => handleRemoveImage(index, i)}
//                   style={styles.removeImageBtn}
//                 >
//                   <FaTimes />
//                 </span>
//               )}
//             </div>
//           ))}
//           {editingIndex === index && (
//             <input
//               type="file"
//               multiple
//               onChange={(e) => handleImageUpload(e, index)}
//               style={styles.fileInput}
//             />
//           )}
//         </div>
//       </div>

//       {/* Colors and Sizes */}
//       <div style={{ marginBottom: '16px' }}>
//         <p style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Colors & Sizes</p>
//         {product.colors.map((color, cIndex) => (
//           <div key={cIndex} style={styles.colorSection}>
//             <div style={{ marginBottom: '8px' }}>
//               <strong style={{ fontSize: '14px', color: '#374151' }}>
//                 {editingIndex === index ? (
//                   <input
//                     type="text"
//                     value={color.color}
//                     onChange={(e) => handleColorChange(e, index, cIndex)}
//                     style={styles.input}
//                   />
//                 ) : (
//                   color.color
//                 )}
//               </strong>
//             </div>
//             {color.sizes.map((size, sIndex) => (
//               <div key={sIndex} style={styles.sizeItem}>
//                 {editingIndex === index ? (
//                   <>
//                     <input
//                       type="text"
//                       placeholder="Size"
//                       value={size.size}
//                       onChange={(e) => handleSizeChange(e, index, cIndex, sIndex, "size")}
//                       style={styles.sizeInput}
//                     />
//                     <input
//                       type="number"
//                       placeholder="Qty"
//                       value={size.quantity}
//                       onChange={(e) => handleSizeChange(e, index, cIndex, sIndex, "quantity")}
//                       style={styles.sizeInput}
//                     />
//                     <input
//                       type="file"
//                       multiple
//                       onChange={(e) => handleSizeImageUpload(e, index, cIndex, sIndex)}
//                       style={styles.fileInput}
//                     />
//                   </>
//                 ) : (
//                   <>
//                     <span style={{ fontSize: '14px', fontWeight: '500' }}>{size.size}</span>
//                     <span style={{ fontSize: '12px', color: '#64748b' }}>({size.quantity})</span>
//                     {size.image.map((img, i) => (
//                       <img key={i} src={img} style={{ width: '30px', height: '30px', borderRadius: '4px' }} loading="lazy" />
//                     ))}
//                   </>
//                 )}
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>

//       {/* Actions */}
//       <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
//         {editingIndex === index ? (
//           <button
//             onClick={() => handleSave(product._id, index)}
//             style={{ ...styles.actionButton, ...styles.saveButton }}
//           >
//             <FaSave /> Save
//           </button>
//         ) : (
//           <button
//             onClick={() => handleEdit(index)}
//             style={{ ...styles.actionButton, ...styles.editButton }}
//           >
//             <FaEdit /> Edit
//           </button>
//         )}
//         <button
//           onClick={() => deletefromexistingproduct(product._id)}
//           style={{ ...styles.actionButton, ...styles.deleteButton }}
//         >
//           <FaTrash /> Delete
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <div style={styles.container}>
//       <div style={styles.header}>
//         <h1 style={styles.title}>Available Products</h1>
//         <p style={styles.subtitle}>Total Products: {products.length}</p>
        
//         <div style={styles.controlsContainer}>
//           <div style={styles.searchContainer}>
//             <FaSearch style={styles.searchIcon} />
//             <input
//               type="text"
//               placeholder="Search by Category, Title, or Discount Price..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               style={{
//                 ...styles.searchInput,
//                 ':focus': {
//                   borderColor: '#3b82f6',
//                   boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
//                 }
//               }}
//             />
//           </div>
          
//           <select
//             value={sortPrice}
//             onChange={(e) => setSortPrice(e.target.value)}
//             style={styles.dropdown}
//           >
//             <option value="">Sort by Price</option>
//             <option value="lowToHigh">Price: Low to High</option>
//             <option value="highToLow">Price: High to Low</option>
//           </select>

//           <select
//             value={sortDiscount}
//             onChange={(e) => setSortDiscount(e.target.value)}
//             style={styles.dropdown}
//           >
//             <option value="">Sort by Discount</option>
//             <option value="lowToHigh">Discount: Low to High</option>
//             <option value="highToLow">Discount: High to Low</option>
//           </select>
//         </div>
//       </div>

//       {filteredProducts.length === 0 ? (
//         <div style={styles.tableContainer}>
//           <div style={styles.noData}>
//             <FaSearch style={{ fontSize: '48px', marginBottom: '16px', color: '#d1d5db' }} />
//             <p>No products found matching your criteria.</p>
//           </div>
//         </div>
//       ) : isMobile ? (
//         // Mobile Card View
//         <div>
//           {filteredProducts.map((product, index) => (
//             <MobileCard key={index} product={product} index={index} />
//           ))}
//         </div>
//       ) : (
//         // Desktop Table View
//         <div style={styles.tableContainer}>
//           <table style={styles.table}>
//             <thead style={styles.tableHeader}>
//               <tr>
//                 <th style={styles.th}>ID</th>
//                 <th style={styles.th}>Category</th>
//                 <th style={styles.th}>Title</th>
//                 <th style={styles.th}>Tag</th>
//                 <th style={styles.th}>Description</th>
//                 <th style={styles.th}>Images</th>
//                 <th style={styles.th}>Price</th>
//                 <th style={styles.th}>Discount Price</th>
//                 <th style={styles.th}>Colors & Sizes</th>
//                 <th style={styles.th}>Discount</th>
//                 <th style={styles.th}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredProducts.map((product, index) => (
//                 <tr key={index} style={{
//                   ...styles.tr,
//                   ':hover': { backgroundColor: '#f8fafc' }
//                 }}>
//                   <td style={styles.td}>{product._id}</td>
//                   <td style={styles.td}>
//                     {editingIndex === index ? (
//                       <input
//                         type="text"
//                         value={product.cate}
//                         onChange={(e) => handleInputChange(e, index, "cate")}
//                         style={styles.input}
//                       />
//                     ) : (
//                       product.cate
//                     )}
//                   </td>
//                   <td style={styles.td}>
//                     {editingIndex === index ? (
//                       <input
//                         type="text"
//                         value={product.title}
//                         onChange={(e) => handleInputChange(e, index, "title")}
//                         style={styles.input}
//                       />
//                     ) : (
//                       product.title
//                     )}
//                   </td>
//                   <td style={styles.td}>
//                     {editingIndex === index ? (
//                       <input
//                         type="text"
//                         value={product.tag}
//                         onChange={(e) => handleInputChange(e, index, "tag")}
//                         style={styles.input}
//                       />
//                     ) : (
//                       product.tag
//                     )}
//                   </td>
//                   <td style={styles.td}>
//                     {editingIndex === index ? (
//                       <textarea
//                         value={product.description}
//                         onChange={(e) => handleInputChange(e, index, "description")}
//                         style={styles.textarea}
//                       />
//                     ) : (
//                       <div style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
//                         {product.description}
//                       </div>
//                     )}
//                   </td>
//                   <td style={styles.td}>
//                     <div style={styles.imageContainer}>
//                       {product.image.map((img, i) => (
//                         <div key={i} style={styles.imageWrapper}>
//                           <img src={img} alt="Product" style={styles.image} loading="lazy" />
//                           {editingIndex === index && (
//                             <span
//                               onClick={() => handleRemoveImage(index, i)}
//                               style={styles.removeImageBtn}
//                             >
//                               <FaTimes />
//                             </span>
//                           )}
//                         </div>
//                       ))}
//                       {editingIndex === index && (
//                         <input
//                           type="file"
//                           multiple
//                           onChange={(e) => handleImageUpload(e, index)}
//                           style={styles.fileInput}
//                         />
//                       )}
//                     </div>
//                   </td>
//                   <td style={styles.td}>
//                     {editingIndex === index ? (
//                       <input
//                         type="number"
//                         value={product.price}
//                         onChange={(e) => handleInputChange(e, index, "price")}
//                         style={styles.input}
//                       />
//                     ) : (
//                       <span style={{ fontWeight: '600', color: '#1e293b' }}>₹{product.price}</span>
//                     )}
//                   </td>
//                   <td style={styles.td}>
//                     {editingIndex === index ? (
//                       <input
//                         type="number"
//                         value={product.discountprice}
//                         onChange={(e) => handleInputChange(e, index, "discountprice")}
//                         style={styles.input}
//                       />
//                     ) : (
//                       <span style={{ fontWeight: '600', color: '#10b981' }}>₹{product.discountprice}</span>
//                     )}
//                   </td>
//                   <td style={styles.td}>
//                     {product.colors.map((color, cIndex) => (
//                       <div key={cIndex} style={styles.colorSection}>
//                         <div style={{ marginBottom: '8px' }}>
//                           <strong>
//                             {editingIndex === index ? (
//                               <input
//                                 type="text"
//                                 value={color.color}
//                                 onChange={(e) => handleColorChange(e, index, cIndex)}
//                                 style={styles.input}
//                               />
//                             ) : (
//                               color.color
//                             )}
//                           </strong>
//                         </div>
//                         {color.sizes.map((size, sIndex) => (
//                           <div key={sIndex} style={styles.sizeItem}>
//                             {editingIndex === index ? (
//                               <>
//                                 <input
//                                   type="text"
//                                   placeholder="Size"
//                                   value={size.size}
//                                   onChange={(e) => handleSizeChange(e, index, cIndex, sIndex, "size")}
//                                   style={styles.sizeInput}
//                                 />
//                                 <input
//                                   type="number"
//                                   placeholder="Qty"
//                                   value={size.quantity}
//                                   onChange={(e) => handleSizeChange(e, index, cIndex, sIndex, "quantity")}
//                                   style={styles.sizeInput}
//                                 />
//                                 <input
//                                   type="file"
//                                   multiple
//                                   onChange={(e) => handleSizeImageUpload(e, index, cIndex, sIndex)}
//                                   style={styles.fileInput}
//                                 />
//                               </>
//                             ) : (
//                               <>
//                                 <span style={{ fontWeight: '500' }}>{size.size}</span>
//                                 <span style={{ fontSize: '12px', color: '#64748b' }}>({size.quantity})</span>
//                                 {size.image.map((img, i) => (
//                                   <img key={i} src={img} style={{ width: '30px', height: '30px', borderRadius: '4px', marginLeft: '4px' }} loading="lazy" />
//                                 ))}
//                               </>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     ))}
//                   </td>
//                   <td style={styles.td}>
//                     {editingIndex === index ? (
//                       <input
//                         type="text"
//                         value={product.discount}
//                         onChange={(e) => handleInputChange(e, index, "discount")}
//                         style={styles.input}
//                       />
//                     ) : (
//                       <span style={{ fontWeight: '600', color: '#ef4444' }}>{product.discount}</span>
//                     )}
//                   </td>
//                   <td style={styles.td}>
//                     <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
//                       {editingIndex === index ? (
//                         <button
//                           onClick={() => handleSave(product._id, index)}
//                           style={{ ...styles.actionButton, ...styles.saveButton }}
//                         >
//                           <FaSave />
//                         </button>
//                       ) : (
//                         <button
//                           onClick={() => handleEdit(index)}
//                           style={{ ...styles.actionButton, ...styles.editButton }}
//                         >
//                           <FaEdit />
//                         </button>
//                       )}
//                       <button
//                         onClick={() => deletefromexistingproduct(product._id)}
//                         style={{ ...styles.actionButton, ...styles.deleteButton }}
//                       >
//                         <FaTrash />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AvailableProduct;



import React, { useEffect, useState } from "react";
import { useBio } from "../BioContext";
import { FaEdit, FaSave, FaTrash, FaSearch, FaSort, FaImage, FaTimes } from "react-icons/fa";
import { useDashboard } from "./DashboardContext";

const AvailableProduct = () => {
  const [products, setProducts] = useState([]);
  const { productdataonlydetail } = useBio();
  const { editordeleteinexisitingcategory, deletefromexistingproduct, dis } = useDashboard();
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  const [sortDiscount, setSortDiscount] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Responsive breakpoints
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (productdataonlydetail) {
      setProducts(productdataonlydetail);
    }
  }, [productdataonlydetail]);

  // Filter and sort products
  useEffect(() => {
    let temp = products.filter((product) => {
      const cate = product.cate ? product.cate.toLowerCase() : "";
      const title = product.title ? product.title.toLowerCase() : "";
      const discount = product.discount ? parseFloat(product.discount) : 0;
      const query = searchQuery.toLowerCase();
      return cate.includes(query) || title.includes(query) || discount.toString().includes(query);
    });

    if (sortPrice && sortDiscount) {
      temp.sort((a, b) => {
        const priceA = a.price || 0;
        const priceB = b.price || 0;
        const discountA = a.discount ? parseFloat(a.discount) : 0;
        const discountB = b.discount ? parseFloat(b.discount) : 0;
        const priceDiff = sortPrice === "lowToHigh" ? priceA - priceB : priceB - priceA;
        if (priceDiff !== 0) return priceDiff;
        return sortDiscount === "lowToHigh" ? discountA - discountB : discountB - discountA;
      });
    } else if (sortPrice) {
      temp.sort((a, b) => {
        const priceA = a.price || 0;
        const priceB = b.price || 0;
        return sortPrice === "lowToHigh" ? priceA - priceB : priceB - priceA;
      });
    } else if (sortDiscount) {
      temp.sort((a, b) => {
        const discountA = a.discount ? parseFloat(a.discount) : 0;
        const discountB = b.discount ? parseFloat(b.discount) : 0;
        return sortDiscount === "lowToHigh" ? discountA - discountB : discountB - discountA;
      });
    }
    setFilteredProducts(temp);
  }, [searchQuery, products, sortPrice, sortDiscount]);

  const handleEdit = (index) => setEditingIndex(index);

  const handleInputChange = (e, index, field) => {
    const value = e.target.value;
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const handleImageUpload = (e, index) => {
    const files = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
    const updatedProducts = [...products];
    updatedProducts[index].image = [...updatedProducts[index].image, ...files];
    setProducts(updatedProducts);
  };

  const handleColorChange = (e, pIndex, cIndex) => {
    const value = e.target.value;
    const updatedProducts = [...products];
    updatedProducts[pIndex].colors[cIndex].color = value;
    setProducts(updatedProducts);
  };

  const handleSizeChange = (e, pIndex, cIndex, sIndex, field) => {
    const value = e.target.value;
    const updatedProducts = [...products];
    updatedProducts[pIndex].colors[cIndex].sizes[sIndex][field] = value;
    setProducts(updatedProducts);
  };

  const handleSizeImageUpload = (e, pIndex, cIndex, sIndex) => {
    const files = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
    const updatedProducts = [...products];
    updatedProducts[pIndex].colors[cIndex].sizes[sIndex].image = [...files];
    setProducts(updatedProducts);
  };

  const handleSave = (id, index) => {
    const updatedProduct = products[index];
    editordeleteinexisitingcategory(updatedProduct, id);
    setEditingIndex(null);
  };

  const handleDelete = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const handleRemoveImage = (pIndex, imgIndex) => {
    const updatedProducts = [...products];
    updatedProducts[pIndex].image.splice(imgIndex, 1);
    setProducts(updatedProducts);
  };

  const handleRemoveSizeImage = (pIndex, cIndex, sIndex, imgIndex) => {
    const updatedProducts = [...products];
    updatedProducts[pIndex].colors[cIndex].sizes[sIndex].image.splice(imgIndex, 1);
    setProducts(updatedProducts);
  };

  // Styles
  const styles = {
    container: {
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      padding: isMobile ? '16px' : '24px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    header: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: isMobile ? '20px' : '32px',
      marginBottom: '24px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      border: '1px solid #e2e8f0',
    },
    title: {
      fontSize: isMobile ? '24px' : '32px',
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: '8px',
      lineHeight: '1.2',
    },
    subtitle: {
      fontSize: isMobile ? '16px' : '18px',
      color: '#64748b',
      fontWeight: '500',
      marginBottom: '24px',
    },
    controlsContainer: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: '16px',
      marginBottom: '24px',
      alignItems: isMobile ? 'stretch' : 'center',
      flexWrap: 'wrap',
    },
    searchContainer: {
      position: 'relative',
      flex: isMobile ? '1' : '2',
      minWidth: isMobile ? '100%' : '300px',
    },
    searchInput: {
      width: '100%',
      padding: '12px 16px 12px 44px',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '400',
      color: '#374151',
      backgroundColor: '#ffffff',
      transition: 'all 0.2s ease',
      outline: 'none',
      boxSizing: 'border-box',
    },
    searchIcon: {
      position: 'absolute',
      left: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9ca3af',
      fontSize: '16px',
    },
    dropdown: {
      padding: '12px 16px',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      backgroundColor: '#ffffff',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      outline: 'none',
      minWidth: isMobile ? '100%' : '180px',
      appearance: 'none',
      backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")',
      backgroundPosition: 'right 12px center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '16px',
      paddingRight: '40px',
    },
    tableContainer: {
      backgroundColor: 'white',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      border: '1px solid #e2e8f0',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '14px',
    },
    tableHeader: {
      backgroundColor: '#f8fafc',
      borderBottom: '2px solid #e2e8f0',
    },
    th: {
      padding: isMobile ? '12px 8px' : '16px 24px',
      textAlign: 'left',
      fontWeight: '600',
      color: '#374151',
      fontSize: isMobile ? '12px' : '14px',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      whiteSpace: 'nowrap',
    },
    td: {
      padding: isMobile ? '12px 8px' : '16px 24px',
      borderBottom: '1px solid #f1f5f9',
      color: '#374151',
      fontSize: isMobile ? '12px' : '14px',
      verticalAlign: 'top',
    },
    tr: {
      transition: 'background-color 0.2s ease',
    },
    input: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
      color: '#374151',
      backgroundColor: '#ffffff',
      transition: 'border-color 0.2s ease',
      outline: 'none',
      boxSizing: 'border-box',
    },
    textarea: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
      color: '#374151',
      backgroundColor: '#ffffff',
      transition: 'border-color 0.2s ease',
      outline: 'none',
      resize: 'vertical',
      minHeight: '60px',
      boxSizing: 'border-box',
    },
    imageContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      alignItems: 'center',
    },
    imageWrapper: {
      position: 'relative',
      display: 'inline-block',
    },
    image: {
      width: isMobile ? '40px' : '50px',
      height: isMobile ? '40px' : '50px',
      objectFit: 'cover',
      borderRadius: '8px',
      border: '2px solid #e2e8f0',
    },
    removeImageBtn: {
      position: 'absolute',
      top: '-6px',
      right: '-6px',
      backgroundColor: '#ef4444',
      color: 'white',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: 'bold',
      border: '2px solid white',
      transition: 'all 0.2s ease',
    },
    fileInput: {
      padding: '6px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '12px',
      backgroundColor: '#f9fafb',
      cursor: 'pointer',
      marginTop: '8px',
    },
    colorSection: {
      marginBottom: '12px',
      padding: '12px',
      backgroundColor: '#f8fafc',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
    },
    sizeItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '8px',
      padding: '8px',
      backgroundColor: 'white',
      borderRadius: '6px',
      border: '1px solid #e2e8f0',
      flexWrap: 'wrap',
    },
    sizeInput: {
      width: isMobile ? '60px' : '80px',
      padding: '4px 8px',
      border: '1px solid #d1d5db',
      borderRadius: '4px',
      fontSize: '12px',
    },
    actionButton: {
      padding: '8px 12px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
      marginRight: '8px',
      marginBottom: '4px',
    },
    editButton: {
      backgroundColor: '#3b82f6',
      color: 'white',
    },
    saveButton: {
      backgroundColor: '#10b981',
      color: 'white',
    },
    deleteButton: {
      backgroundColor: '#ef4444',
      color: 'white',
    },
    noData: {
      textAlign: 'center',
      padding: '48px 24px',
      color: '#6b7280',
      fontSize: '16px',
    },
  };

  // Mobile Card Component
  const MobileCard = ({ product, index }) => (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '16px',
      boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e2e8f0',
    }}>
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
          {editingIndex === index ? (
            <input
              type="text"
              value={product.title}
              onChange={(e) => handleInputChange(e, index, "title")}
              style={styles.input}
            />
          ) : (
            product.title
          )}
        </h3>
        <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>
          <strong>ID:</strong> {product._id}
        </p>
        <p style={{ fontSize: '14px', color: '#64748b' }}>
          <strong>Category:</strong> {editingIndex === index ? (
            <input
              type="text"
              value={product.cate}
              onChange={(e) => handleInputChange(e, index, "cate")}
              style={styles.input}
            />
          ) : (
            product.cate
          )}
        </p>
      </div>

      {/* Price Section */}
      <div style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '16px',
        backgroundColor: '#f8fafc',
        padding: '12px',
        borderRadius: '8px',
      }}>
        <div>
          <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Price</p>
          <p style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>
            {editingIndex === index ? (
              <input
                type="number"
                value={product.price}
                onChange={(e) => handleInputChange(e, index, "price")}
                style={styles.input}
              />
            ) : (
              `₹${product.price}`
            )}
          </p>
        </div>
        <div>
          <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Discount Price</p>
          <p style={{ fontSize: '16px', fontWeight: '600', color: '#10b981' }}>
            {editingIndex === index ? (
              <input
                type="number"
                value={product.discountprice}
                onChange={(e) => handleInputChange(e, index, "discountprice")}
                style={styles.input}
              />
            ) : (
              `₹${product.discountprice}`
            )}
          </p>
        </div>
      </div>

      {/* Images */}
      <div style={{ marginBottom: '16px' }}>
        <p style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Images</p>
        <div style={styles.imageContainer}>
          {product.image.map((img, i) => (
            <div key={i} style={styles.imageWrapper}>
              <img src={img} alt="Product" style={styles.image} loading="lazy" />
              {editingIndex === index && (
                <span
                  onClick={() => handleRemoveImage(index, i)}
                  style={styles.removeImageBtn}
                >
                  <FaTimes />
                </span>
              )}
            </div>
          ))}
          {editingIndex === index && (
            <input
              type="file"
              multiple
              onChange={(e) => handleImageUpload(e, index)}
              style={styles.fileInput}
            />
          )}
        </div>
      </div>

      {/* Colors and Sizes */}
      <div style={{ marginBottom: '16px' }}>
        <p style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Colors & Sizes</p>
        {product.colors.map((color, cIndex) => (
          <div key={cIndex} style={styles.colorSection}>
            <div style={{ marginBottom: '8px' }}>
              <strong style={{ fontSize: '14px', color: '#374151' }}>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={color.color}
                    onChange={(e) => handleColorChange(e, index, cIndex)}
                    style={styles.input}
                  />
                ) : (
                  color.color
                )}
              </strong>
            </div>
            {color.sizes.map((size, sIndex) => (
              <div key={sIndex} style={styles.sizeItem}>
                {editingIndex === index ? (
                  <>
                    <input
                      type="text"
                      placeholder="Size"
                      value={size.size}
                      onChange={(e) => handleSizeChange(e, index, cIndex, sIndex, "size")}
                      style={styles.sizeInput}
                    />
                    <input
                      type="number"
                      placeholder="Qty"
                      value={size.quantity}
                      onChange={(e) => handleSizeChange(e, index, cIndex, sIndex, "quantity")}
                      style={styles.sizeInput}
                    />
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', alignItems: 'center' }}>
                      {size.image && size.image.map((img, i) => (
                        <div key={i} style={{ position: 'relative', display: 'inline-block' }}>
                          <img 
                            src={img} 
                            style={{ 
                              width: '30px', 
                              height: '30px', 
                              borderRadius: '4px', 
                              objectFit: 'cover',
                              border: '1px solid #e2e8f0'
                            }} 
                            loading="lazy" 
                          />
                          <span
                            onClick={() => handleRemoveSizeImage(index, cIndex, sIndex, i)}
                            style={{
                              position: 'absolute',
                              top: '-6px',
                              right: '-6px',
                              backgroundColor: '#ef4444',
                              color: 'white',
                              borderRadius: '50%',
                              width: '16px',
                              height: '16px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              fontSize: '10px',
                              fontWeight: 'bold',
                              border: '1px solid white',
                              transition: 'all 0.2s ease',
                            }}
                          >
                            <FaTimes />
                          </span>
                        </div>
                      ))}
                    </div>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => handleSizeImageUpload(e, index, cIndex, sIndex)}
                      style={styles.fileInput}
                    />
                  </>
                ) : (
                  <>
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>{size.size}</span>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>({size.quantity})</span>
                    {size.image && size.image.map((img, i) => (
                      <img key={i} src={img} style={{ width: '30px', height: '30px', borderRadius: '4px' }} loading="lazy" />
                    ))}
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        {editingIndex === index ? (
          <button
            onClick={() => handleSave(product._id, index)}
            style={{ ...styles.actionButton, ...styles.saveButton }}
          >
            <FaSave /> Save
          </button>
        ) : (
          <button
            onClick={() => handleEdit(index)}
            style={{ ...styles.actionButton, ...styles.editButton }}
          >
            <FaEdit /> Edit
          </button>
        )}
        <button
          onClick={() => deletefromexistingproduct(product._id)}
          style={{ ...styles.actionButton, ...styles.deleteButton }}
        >
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Available Products</h1>
        <p style={styles.subtitle}>Total Products: {products.length}</p>
        
        <div style={styles.controlsContainer}>
          <div style={styles.searchContainer}>
            <FaSearch style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by Category, Title, or Discount Price..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                ...styles.searchInput,
                ':focus': {
                  borderColor: '#3b82f6',
                  boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
                }
              }}
            />
          </div>
          
          <select
            value={sortPrice}
            onChange={(e) => setSortPrice(e.target.value)}
            style={styles.dropdown}
          >
            <option value="">Sort by Price</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>

          <select
            value={sortDiscount}
            onChange={(e) => setSortDiscount(e.target.value)}
            style={styles.dropdown}
          >
            <option value="">Sort by Discount</option>
            <option value="lowToHigh">Discount: Low to High</option>
            <option value="highToLow">Discount: High to Low</option>
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div style={styles.tableContainer}>
          <div style={styles.noData}>
            <FaSearch style={{ fontSize: '48px', marginBottom: '16px', color: '#d1d5db' }} />
            <p>No products found matching your criteria.</p>
          </div>
        </div>
      ) : isMobile ? (
        // Mobile Card View
        <div>
          {filteredProducts.map((product, index) => (
            <MobileCard key={index} product={product} index={index} />
          ))}
        </div>
      ) : (
        // Desktop Table View
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Title</th>
                <th style={styles.th}>Tag</th>
                <th style={styles.th}>Description</th>
                <th style={styles.th}>Images</th>
                <th style={styles.th}>Price</th>
                <th style={styles.th}>Discount Price</th>
                <th style={styles.th}>Colors & Sizes</th>
                <th style={styles.th}>Discount</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr key={index} style={{
                  ...styles.tr,
                  ':hover': { backgroundColor: '#f8fafc' }
                }}>
                  <td style={styles.td}>{product._id}</td>
                  <td style={styles.td}>
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={product.cate}
                        onChange={(e) => handleInputChange(e, index, "cate")}
                        style={styles.input}
                      />
                    ) : (
                      product.cate
                    )}
                  </td>
                  <td style={styles.td}>
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={product.title}
                        onChange={(e) => handleInputChange(e, index, "title")}
                        style={styles.input}
                      />
                    ) : (
                      product.title
                    )}
                  </td>
                  <td style={styles.td}>
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={product.tag}
                        onChange={(e) => handleInputChange(e, index, "tag")}
                        style={styles.input}
                      />
                    ) : (
                      product.tag
                    )}
                  </td>
                  <td style={styles.td}>
                    {editingIndex === index ? (
                      <textarea
                        value={product.description}
                        onChange={(e) => handleInputChange(e, index, "description")}
                        style={styles.textarea}
                      />
                    ) : (
                      <div style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {product.description}
                      </div>
                    )}
                  </td>
                  <td style={styles.td}>
                    <div style={styles.imageContainer}>
                      {product.image.map((img, i) => (
                        <div key={i} style={styles.imageWrapper}>
                          <img src={img} alt="Product" style={styles.image} loading="lazy" />
                          {editingIndex === index && (
                            <span
                              onClick={() => handleRemoveImage(index, i)}
                              style={styles.removeImageBtn}
                            >
                              <FaTimes />
                            </span>
                          )}
                        </div>
                      ))}
                      {editingIndex === index && (
                        <input
                          type="file"
                          multiple
                          onChange={(e) => handleImageUpload(e, index)}
                          style={styles.fileInput}
                        />
                      )}
                    </div>
                  </td>
                  <td style={styles.td}>
                    {editingIndex === index ? (
                      <input
                        type="number"
                        value={product.price}
                        onChange={(e) => handleInputChange(e, index, "price")}
                        style={styles.input}
                      />
                    ) : (
                      <span style={{ fontWeight: '600', color: '#1e293b' }}>₹{product.price}</span>
                    )}
                  </td>
                  <td style={styles.td}>
                    {editingIndex === index ? (
                      <input
                        type="number"
                        value={product.discountprice}
                        onChange={(e) => handleInputChange(e, index, "discountprice")}
                        style={styles.input}
                      />
                    ) : (
                      <span style={{ fontWeight: '600', color: '#10b981' }}>₹{product.discountprice}</span>
                    )}
                  </td>
                  <td style={styles.td}>
                    {product.colors.map((color, cIndex) => (
                      <div key={cIndex} style={styles.colorSection}>
                        <div style={{ marginBottom: '8px' }}>
                          <strong>
                            {editingIndex === index ? (
                              <input
                                type="text"
                                value={color.color}
                                onChange={(e) => handleColorChange(e, index, cIndex)}
                                style={styles.input}
                              />
                            ) : (
                              color.color
                            )}
                          </strong>
                        </div>
                        {color.sizes.map((size, sIndex) => (
                          <div key={sIndex} style={styles.sizeItem}>
                            {editingIndex === index ? (
                              <>
                                <input
                                  type="text"
                                  placeholder="Size"
                                  value={size.size}
                                  onChange={(e) => handleSizeChange(e, index, cIndex, sIndex, "size")}
                                  style={styles.sizeInput}
                                />
                                <input
                                  type="number"
                                  placeholder="Qty"
                                  value={size.quantity}
                                  onChange={(e) => handleSizeChange(e, index, cIndex, sIndex, "quantity")}
                                  style={styles.sizeInput}
                                />
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', alignItems: 'center', width: '100%' }}>
                                  {size.image && size.image.map((img, i) => (
                                    <div key={i} style={{ position: 'relative', display: 'inline-block' }}>
                                      <img 
                                        src={img} 
                                        style={{ 
                                          width: '30px', 
                                          height: '30px', 
                                          borderRadius: '4px', 
                                          objectFit: 'cover',
                                          border: '1px solid #e2e8f0'
                                        }} 
                                        loading="lazy" 
                                      />
                                      <span
                                        onClick={() => handleRemoveSizeImage(index, cIndex, sIndex, i)}
                                        style={{
                                          position: 'absolute',
                                          top: '-6px',
                                          right: '-6px',
                                          backgroundColor: '#ef4444',
                                          color: 'white',
                                          borderRadius: '50%',
                                          width: '16px',
                                          height: '16px',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          cursor: 'pointer',
                                          fontSize: '10px',
                                          fontWeight: 'bold',
                                          border: '1px solid white',
                                          transition: 'all 0.2s ease',
                                        }}
                                      >
                                        <FaTimes />
                                      </span>
                                    </div>
                                  ))}
                                </div>
                                <input
                                  type="file"
                                  multiple
                                  onChange={(e) => handleSizeImageUpload(e, index, cIndex, sIndex)}
                                  style={styles.fileInput}
                                />
                              </>
                            ) : (
                              <>
                                <span style={{ fontWeight: '500' }}>{size.size}</span>
                                <span style={{ fontSize: '12px', color: '#64748b' }}>({size.quantity})</span>
                                {size.image && size.image.map((img, i) => (
                                  <img key={i} src={img} style={{ width: '30px', height: '30px', borderRadius: '4px', marginLeft: '4px' }} loading="lazy" />
                                ))}
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </td>
                  <td style={styles.td}>
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={product.discount}
                        onChange={(e) => handleInputChange(e, index, "discount")}
                        style={styles.input}
                      />
                    ) : (
                      <span style={{ fontWeight: '600', color: '#ef4444' }}>{product.discount}</span>
                    )}
                  </td>
                  <td style={styles.td}>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {editingIndex === index ? (
                        <button
                          onClick={() => handleSave(product._id, index)}
                          style={{ ...styles.actionButton, ...styles.saveButton }}
                        >
                          <FaSave />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(index)}
                          style={{ ...styles.actionButton, ...styles.editButton }}
                        >
                          <FaEdit />
                        </button>
                      )}
                      <button
                        onClick={() => deletefromexistingproduct(product._id)}
                        style={{ ...styles.actionButton, ...styles.deleteButton }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AvailableProduct;


// import React, { useEffect, useState } from "react";
// import { FaEdit, FaSave, FaTrash, FaSearch, FaSortAmountDown, FaImage } from "react-icons/fa";
// import { useBio } from "../BioContext";

// // Mock context providers for demonstration
// // const useBio = () => ({
// //   productdataonlydetail: [
// //     {
// //       _id: "1",
// //       cate: "Electronics",
// //       title: "Wireless Headphones",
// //       tag: "audio",
// //       description: "Premium quality wireless headphones with noise cancellation",
// //       image: ["https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg", "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg"],
// //       price: 2999,
// //       discountprice: 2399,
// //       colors: [
// //         {
// //           color: "Black",
// //           sizes: [
// //             { size: "Standard", quantity: 50, image: ["https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg"] }
// //           ]
// //         }
// //       ],
// //       discount: "20%"
// //     },
// //     {
// //       _id: "2",
// //       cate: "Fashion",
// //       title: "Designer T-Shirt",
// //       tag: "clothing",
// //       description: "Comfortable cotton t-shirt with modern design",
// //       image: ["https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg"],
// //       price: 899,
// //       discountprice: 699,
// //       colors: [
// //         {
// //           color: "Blue",
// //           sizes: [
// //             { size: "M", quantity: 25, image: ["https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg"] },
// //             { size: "L", quantity: 30, image: ["https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg"] }
// //           ]
// //         }
// //       ],
// //       discount: "22%"
// //     }
// //   ]
// // });

// const useDashboard = () => ({
//   editordeleteinexisitingcategory: (product, id) => console.log("Edit product:", product, id),
//   deletefromexistingproduct: (id) => console.log("Delete product:", id),
//   dis: false
// });

// const AvailableProduct = () => {
//   const [products, setProducts] = useState([]);
//   const { productdataonlydetail } = useBio();
//   const { editordeleteinexisitingcategory, deletefromexistingproduct, dis } = useDashboard();
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortPrice, setSortPrice] = useState("");
//   const [sortDiscount, setSortDiscount] = useState("");
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   useEffect(() => {
//     if (productdataonlydetail) {
//       setProducts(productdataonlydetail);
//     }
//   }, [productdataonlydetail]);

//   // Filter and sort products based on search query and sort options
//   useEffect(() => {
//     let temp = products.filter((product) => {
//       const cate = product.cate ? product.cate.toLowerCase() : "";
//       const title = product.title ? product.title.toLowerCase() : "";
//       const discount = product.discount ? parseFloat(product.discount) : 0;
//       const query = searchQuery.toLowerCase();
//       return cate.includes(query) || title.includes(query) || discount.toString().includes(query);
//     });

//     if (sortPrice && sortDiscount) {
//       temp.sort((a, b) => {
//         const priceA = a.price || 0;
//         const priceB = b.price || 0;
//         const discountA = a.discount ? parseFloat(a.discount) : 0;
//         const discountB = b.discount ? parseFloat(b.discount) : 0;
//         const priceDiff = sortPrice === "lowToHigh" ? priceA - priceB : priceB - priceA;
//         if (priceDiff !== 0) return priceDiff;
//         return sortDiscount === "lowToHigh" ? discountA - discountB : discountB - discountA;
//       });
//     } else if (sortPrice) {
//       temp.sort((a, b) => {
//         const priceA = a.price || 0;
//         const priceB = b.price || 0;
//         return sortPrice === "lowToHigh" ? priceA - priceB : priceB - priceA;
//       });
//     } else if (sortDiscount) {
//       temp.sort((a, b) => {
//         const discountA = a.discount ? parseFloat(a.discount) : 0;
//         const discountB = b.discount ? parseFloat(b.discount) : 0;
//         return sortDiscount === "lowToHigh" ? discountA - discountB : discountB - discountA;
//       });
//     }
//     setFilteredProducts(temp);
//   }, [searchQuery, products, sortPrice, sortDiscount]);

//   const handleEdit = (index) => {
//     setEditingIndex(index);
//   };

//   const handleInputChange = (e, index, field) => {
//     const value = e.target.value;
//     const updatedProducts = [...products];
//     updatedProducts[index][field] = value;
//     setProducts(updatedProducts);
//   };

//   const handleImageUpload = (e, index) => {
//     const files = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
//     const updatedProducts = [...products];
//     updatedProducts[index].image = [...updatedProducts[index].image, ...files];
//     setProducts(updatedProducts);
//   };

//   const handleColorChange = (e, pIndex, cIndex) => {
//     const value = e.target.value;
//     const updatedProducts = [...products];
//     updatedProducts[pIndex].colors[cIndex].color = value;
//     setProducts(updatedProducts);
//   };

//   const handleSizeChange = (e, pIndex, cIndex, sIndex, field) => {
//     const value = e.target.value;
//     const updatedProducts = [...products];
//     updatedProducts[pIndex].colors[cIndex].sizes[sIndex][field] = value;
//     setProducts(updatedProducts);
//   };

//   const handleSizeImageUpload = (e, pIndex, cIndex, sIndex) => {
//     const files = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
//     const updatedProducts = [...products];
//     updatedProducts[pIndex].colors[cIndex].sizes[sIndex].image = [...files];
//     setProducts(updatedProducts);
//   };

//   const handleSave = (id, index) => {
//     const updatedProduct = products[index];
//     editordeleteinexisitingcategory(updatedProduct, id);
//     setEditingIndex(null);
//   };

//   const handleDelete = (index) => {
//     const updatedProducts = [...products];
//     updatedProducts.splice(index, 1);
//     setProducts(updatedProducts);
//   };

//   const containerStyle = {
//     minHeight: '100vh',
//     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//     padding: '2rem',
//     fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
//   };

//   const mainContainerStyle = {
//     maxWidth: '1400px',
//     margin: '0 auto',
//     background: 'rgba(255, 255, 255, 0.95)',
//     borderRadius: '24px',
//     padding: '2.5rem',
//     boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
//     backdropFilter: 'blur(10px)'
//   };

//   const headerStyle = {
//     textAlign: 'center',
//     marginBottom: '2.5rem'
//   };

//   const titleStyle = {
//     fontSize: '2.5rem',
//     fontWeight: '700',
//     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//     backgroundClip: 'text',
//     color: 'transparent',
//     marginBottom: '0.5rem',
//     letterSpacing: '-0.025em'
//   };

//   const subtitleStyle = {
//     fontSize: '1.125rem',
//     color: '#6b7280',
//     fontWeight: '500'
//   };

//   const controlsContainerStyle = {
//     display: 'flex',
//     flexWrap: 'wrap',
//     gap: '1rem',
//     marginBottom: '2rem',
//     alignItems: 'center',
//     justifyContent: 'space-between'
//   };

//   const searchContainerStyle = {
//     position: 'relative',
//     minWidth: '300px',
//     flex: '1'
//   };

//   const searchInputStyle = {
//     width: '100%',
//     padding: '0.875rem 1rem 0.875rem 3rem',
//     border: '2px solid #e5e7eb',
//     borderRadius: '12px',
//     fontSize: '1rem',
//     transition: 'all 0.2s ease',
//     background: '#ffffff',
//     outline: 'none'
//   };

//   const searchIconStyle = {
//     position: 'absolute',
//     left: '1rem',
//     top: '50%',
//     transform: 'translateY(-50%)',
//     color: '#9ca3af',
//     fontSize: '1.125rem'
//   };

//   const sortContainerStyle = {
//     display: 'flex',
//     gap: '1rem',
//     flexWrap: 'wrap'
//   };

//   const selectStyle = {
//     padding: '0.875rem 1rem',
//     border: '2px solid #e5e7eb',
//     borderRadius: '12px',
//     fontSize: '1rem',
//     background: '#ffffff',
//     cursor: 'pointer',
//     transition: 'all 0.2s ease',
//     outline: 'none',
//     minWidth: '180px'
//   };

//   const tableContainerStyle = {
//     background: '#ffffff',
//     borderRadius: '16px',
//     overflow: 'hidden',
//     boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
//     border: '1px solid #f3f4f6'
//   };

//   const tableStyle = {
//     width: '100%',
//     borderCollapse: 'separate',
//     borderSpacing: '0'
//   };

//   const theadStyle = {
//     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
//   };

//   const thStyle = {
//     padding: '1rem 1.25rem',
//     textAlign: 'left',
//     fontSize: '0.875rem',
//     fontWeight: '600',
//     color: '#ffffff',
//     textTransform: 'uppercase',
//     letterSpacing: '0.05em',
//     borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
//   };

//   const trStyle = (index) => ({
//     background: index % 2 === 0 ? '#ffffff' : '#f8fafc',
//     transition: 'all 0.2s ease',
//     borderBottom: '1px solid #f1f5f9'
//   });

//   const tdStyle = {
//     padding: '1rem 1.25rem',
//     verticalAlign: 'top',
//     fontSize: '0.875rem',
//     color: '#374151',
//     maxWidth: '200px'
//   };

//   const inputStyle = {
//     width: '100%',
//     padding: '0.5rem 0.75rem',
//     border: '2px solid #e5e7eb',
//     borderRadius: '8px',
//     fontSize: '0.875rem',
//     transition: 'all 0.2s ease',
//     outline: 'none'
//   };

//   const textareaStyle = {
//     ...inputStyle,
//     resize: 'vertical',
//     minHeight: '80px'
//   };

//   const buttonStyle = (type) => {
//     const baseStyle = {
//       padding: '0.625rem 0.625rem',
//       borderRadius: '8px',
//       border: 'none',
//       cursor: 'pointer',
//       fontSize: '0.875rem',
//       fontWeight: '500',
//       transition: 'all 0.2s ease',
//       display: 'inline-flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       marginRight: '0.5rem'
//     };

//     const styles = {
//       edit: {
//         ...baseStyle,
//         background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
//         color: '#ffffff'
//       },
//       save: {
//         ...baseStyle,
//         background: 'linear-gradient(135deg, #10b981, #047857)',
//         color: '#ffffff'
//       },
//       delete: {
//         ...baseStyle,
//         background: 'linear-gradient(135deg, #ef4444, #dc2626)',
//         color: '#ffffff'
//       }
//     };

//     return styles[type] || baseStyle;
//   };

//   const imageStyle = {
//     borderRadius: '6px',
//     marginRight: '0.5rem',
//     marginBottom: '0.5rem',
//     border: '1px solid #e5e7eb',
//     objectFit: 'cover'
//   };

//   const colorSizeContainerStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '0.75rem'
//   };

//   const colorGroupStyle = {
//     background: '#f8fafc',
//     padding: '0.75rem',
//     borderRadius: '8px',
//     border: '1px solid #e2e8f0'
//   };

//   const sizeItemStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '0.5rem',
//     margin: '0.25rem 0',
//     padding: '0.5rem',
//     background: '#ffffff',
//     borderRadius: '6px',
//     fontSize: '0.8rem'
//   };

//   const fileInputStyle = {
//     padding: '0.25rem',
//     fontSize: '0.75rem',
//     border: '1px dashed #d1d5db',
//     borderRadius: '4px',
//     background: '#f9fafb'
//   };

//   const priceStyle = {
//     fontWeight: '600',
//     color: '#059669',
//     fontSize: '1rem'
//   };

//   const discountBadgeStyle = {
//     background: 'linear-gradient(135deg, #f59e0b, #d97706)',
//     color: '#ffffff',
//     padding: '0.25rem 0.5rem',
//     borderRadius: '12px',
//     fontSize: '0.75rem',
//     fontWeight: '600'
//   };

//   return (
//     <div style={containerStyle}>
//       <div style={mainContainerStyle}>
//         <div style={headerStyle}>
//           <h1 style={titleStyle}>Product Management</h1>
//           <p style={subtitleStyle}>Total Products: {products.length}</p>
//         </div>

//         <div style={controlsContainerStyle}>
//           <div style={searchContainerStyle}>
//             <FaSearch style={searchIconStyle} />
//             <input
//               type="text"
//               placeholder="Search by Category, Title, or Discount..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               style={{
//                 ...searchInputStyle,
//                 ':focus': {
//                   borderColor: '#667eea',
//                   boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
//                 }
//               }}
//             />
//           </div>

//           <div style={sortContainerStyle}>
//             <select
//               value={sortPrice}
//               onChange={(e) => setSortPrice(e.target.value)}
//               style={selectStyle}
//             >
//               <option value="">Sort by Price</option>
//               <option value="lowToHigh">Price: Low to High</option>
//               <option value="highToLow">Price: High to Low</option>
//             </select>

//             <select
//               value={sortDiscount}
//               onChange={(e) => setSortDiscount(e.target.value)}
//               style={selectStyle}
//             >
//               <option value="">Sort by Discount</option>
//               <option value="lowToHigh">Discount: Low to High</option>
//               <option value="highToLow">Discount: High to Low</option>
//             </select>
//           </div>
//         </div>

//         <div style={tableContainerStyle}>
//           <table style={tableStyle}>
//             <thead style={theadStyle}>
//               <tr>
//                 <th style={thStyle}>ID</th>
//                 <th style={thStyle}>Category</th>
//                 <th style={thStyle}>Title</th>
//                 <th style={thStyle}>Tag</th>
//                 <th style={thStyle}>Description</th>
//                 <th style={thStyle}>Images</th>
//                 <th style={thStyle}>Price</th>
//                 <th style={thStyle}>Discount Price</th>
//                 <th style={thStyle}>Colors & Sizes</th>
//                 <th style={thStyle}>Discount</th>
//                 <th style={thStyle}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredProducts.map((product, index) => (
//                 <tr key={index} style={trStyle(index)}>
//                   <td style={tdStyle}>
//                     <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#6b7280' }}>
//                       {product._id}
//                     </span>
//                   </td>
//                   <td style={tdStyle}>
//                     {editingIndex === index ? (
//                       <input
//                         type="text"
//                         value={product.cate}
//                         onChange={(e) => handleInputChange(e, index, "cate")}
//                         style={inputStyle}
//                       />
//                     ) : (
//                       <span style={{ fontWeight: '500', color: '#4f46e5' }}>{product.cate}</span>
//                     )}
//                   </td>
//                   <td style={tdStyle}>
//                     {editingIndex === index ? (
//                       <input
//                         type="text"
//                         value={product.title}
//                         onChange={(e) => handleInputChange(e, index, "title")}
//                         style={inputStyle}
//                       />
//                     ) : (
//                       <span style={{ fontWeight: '600' }}>{product.title}</span>
//                     )}
//                   </td>
//                   <td style={tdStyle}>
//                     {editingIndex === index ? (
//                       <input
//                         type="text"
//                         value={product.tag}
//                         onChange={(e) => handleInputChange(e, index, "tag")}
//                         style={inputStyle}
//                       />
//                     ) : (
//                       <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>{product.tag}</span>
//                     )}
//                   </td>
//                   <td style={tdStyle}>
//                     {editingIndex === index ? (
//                       <textarea
//                         value={product.description}
//                         onChange={(e) => handleInputChange(e, index, "description")}
//                         style={textareaStyle}
//                       />
//                     ) : (
//                       <span style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>
//                         {product.description?.substring(0, 100)}...
//                       </span>
//                     )}
//                   </td>
//                   <td style={tdStyle}>
//                     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
//                       {product.image?.map((img, i) => (
//                         <img key={i} src={img} alt="Product" width="40" height="40" style={imageStyle} />
//                       ))}
//                     </div>
//                     {editingIndex === index && (
//                       <input
//                         type="file"
//                         multiple
//                         onChange={(e) => handleImageUpload(e, index)}
//                         style={fileInputStyle}
//                       />
//                     )}
//                   </td>
//                   <td style={tdStyle}>
//                     {editingIndex === index ? (
//                       <input
//                         type="number"
//                         value={product.price}
//                         onChange={(e) => handleInputChange(e, index, "price")}
//                         style={inputStyle}
//                       />
//                     ) : (
//                       <span style={priceStyle}>₹{product.price}</span>
//                     )}
//                   </td>
//                   <td style={tdStyle}>
//                     {editingIndex === index ? (
//                       <input
//                         type="number"
//                         value={product.discountprice}
//                         onChange={(e) => handleInputChange(e, index, "discountprice")}
//                         style={inputStyle}
//                       />
//                     ) : (
//                       <span style={{ ...priceStyle, color: '#dc2626' }}>₹{product.discountprice}</span>
//                     )}
//                   </td>
//                   <td style={tdStyle}>
//                     <div style={colorSizeContainerStyle}>
//                       {product.colors?.map((color, cIndex) => (
//                         <div key={cIndex} style={colorGroupStyle}>
//                           <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
//                             {editingIndex === index ? (
//                               <input
//                                 type="text"
//                                 value={color.color}
//                                 onChange={(e) => handleColorChange(e, index, cIndex)}
//                                 style={{ ...inputStyle, marginBottom: '0.5rem' }}
//                               />
//                             ) : (
//                               <span style={{ color: '#4338ca' }}>{color.color}</span>
//                             )}
//                           </div>
//                           {color.sizes?.map((size, sIndex) => (
//                             <div key={sIndex} style={sizeItemStyle}>
//                               {editingIndex === index ? (
//                                 <>
//                                   <input
//                                     type="text"
//                                     placeholder="Size"
//                                     value={size.size}
//                                     onChange={(e) => handleSizeChange(e, index, cIndex, sIndex, "size")}
//                                     style={{ ...inputStyle, width: '60px', margin: 0 }}
//                                   />
//                                   <input
//                                     type="number"
//                                     placeholder="Qty"
//                                     value={size.quantity}
//                                     onChange={(e) => handleSizeChange(e, index, cIndex, sIndex, "quantity")}
//                                     style={{ ...inputStyle, width: '50px', margin: 0 }}
//                                   />
//                                   <input
//                                     type="file"
//                                     multiple
//                                     onChange={(e) => handleSizeImageUpload(e, index, cIndex, sIndex)}
//                                     style={fileInputStyle}
//                                   />
//                                 </>
//                               ) : (
//                                 <>
//                                   <span style={{ fontWeight: '500' }}>{size.size}</span>
//                                   <span style={{ color: '#6b7280' }}>({size.quantity})</span>
//                                   {size.image?.map((img, i) => (
//                                     <img key={i} src={img} width="20" height="20" style={imageStyle} />
//                                   ))}
//                                 </>
//                               )}
//                             </div>
//                           ))}
//                         </div>
//                       ))}
//                     </div>
//                   </td>
//                   <td style={tdStyle}>
//                     {editingIndex === index ? (
//                       <input
//                         type="text"
//                         value={product.discount}
//                         onChange={(e) => handleInputChange(e, index, "discount")}
//                         style={inputStyle}
//                       />
//                     ) : (
//                       <span style={discountBadgeStyle}>{product.discount}</span>
//                     )}
//                   </td>
//                   <td style={tdStyle}>
//                     <div style={{ display: 'flex', gap: '0.5rem' }}>
//                       {editingIndex === index ? (
//                         <button
//                           onClick={() => handleSave(product._id, index)}
//                           style={buttonStyle('save')}
//                         >
//                           <FaSave />
//                         </button>
//                       ) : (
//                         <button
//                           onClick={() => handleEdit(index)}
//                           style={buttonStyle('edit')}
//                         >
//                           <FaEdit />
//                         </button>
//                       )}
//                       <button
//                         onClick={() => deletefromexistingproduct(product._id)}
//                         style={buttonStyle('delete')}
//                       >
//                         <FaTrash />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AvailableProduct;































// import React, { useEffect, useState } from "react";
// import "./AvailableProduct.css"; // Importing external CSS
// import { useBio } from "../BioContext";
// import { FaEdit, FaSave, FaTrash } from "react-icons/fa"; // Importing Icons
// import { useDashboard } from "./DashboardContext";
// import CatlogPriceFilter from "../CatlogPriceFilter";

// const AvailableProduct = () => {
//   const [products, setProducts] = useState([]); // State to hold products
//   const { productdataonlydetail } = useBio(); // Accessing product details from context
//   const { editordeleteinexisitingcategory, deletefromexistingproduct } = useDashboard();
//   const [editingIndex, setEditingIndex] = useState(null); // To track which row is being edited
  
//   // Search state
//   const [searchQuery, setSearchQuery] = useState("");
//   // Sort states for Price and Discount
//   const [sortPrice, setSortPrice] = useState(""); // "lowToHigh" or "highToLow"
//   const [sortDiscount, setSortDiscount] = useState(""); // "lowToHigh" or "highToLow"
  
//   // Local state for filtered (and sorted) products
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   // When productdataonlydetail changes, update products and filteredProducts
//   useEffect(() => {
//     if (productdataonlydetail) {
//       setProducts(productdataonlydetail);
//       setFilteredProducts(productdataonlydetail);
//     }
//   }, [productdataonlydetail]);

//   // Filter and sort products based on search query and sort options
//   useEffect(() => {
//     let temp = products.filter((product) => {
//       const cate = product.cate ? product.cate.toLowerCase() : "";
//       const title = product.title ? product.title.toLowerCase() : "";
//       // We assume product.discount is numeric or can be parsed; if not, convert appropriately.
//       const discount = product.discount ? parseFloat(product.discount) : 0;
//       const query = searchQuery.toLowerCase();
//       return cate.includes(query) || title.includes(query) || discount.toString().includes(query);
//     });

//     // If both sortPrice and sortDiscount are selected, combine them.
//     if (sortPrice && sortDiscount) {
//       temp.sort((a, b) => {
//         const priceA = a.price || 0;
//         const priceB = b.price || 0;
//         const discountA = a.discount ? parseFloat(a.discount) : 0;
//         const discountB = b.discount ? parseFloat(b.discount) : 0;
//         // Sort by price first
//         const priceDiff =
//           sortPrice === "lowToHigh" ? priceA - priceB : priceB - priceA;
//         if (priceDiff !== 0) return priceDiff;
//         // If price is same, sort by discount
//         return sortDiscount === "lowToHigh"
//           ? discountA - discountB
//           : discountB - discountA;
//       });
//     } else if (sortPrice) {
//       temp.sort((a, b) => {
//         const priceA = a.price || 0;
//         const priceB = b.price || 0;
//         return sortPrice === "lowToHigh" ? priceA - priceB : priceB - priceA;
//       });
//     } else if (sortDiscount) {
//       temp.sort((a, b) => {
//         const discountA = a.discount ? parseFloat(a.discount) : 0;
//         const discountB = b.discount ? parseFloat(b.discount) : 0;
//         return sortDiscount === "lowToHigh"
//           ? discountA - discountB
//           : discountB - discountA;
//       });
//     }
//     setFilteredProducts(temp);
//   }, [searchQuery, products, sortPrice, sortDiscount]);

//   // --- Existing edit, delete, update functions (unchanged) ---
//   const handleEdit = (index) => {
//     setEditingIndex(index);
//   };

//   const handleInputChange = (e, index, field) => {
//     const value = e.target.value;
//     const updatedProducts = [...products];
//     updatedProducts[index][field] = value;
//     setProducts(updatedProducts);
//   };

//   const handleImageUpload = (e, index) => {
//     const files = Array.from(e.target.files).map((file) =>
//       URL.createObjectURL(file)
//     );
//     const updatedProducts = [...products];
//     updatedProducts[index].image = [
//       ...updatedProducts[index].image,
//       ...files,
//     ];
//     setProducts(updatedProducts);
//   };

//   const handleColorChange = (e, pIndex, cIndex) => {
//     const value = e.target.value;
//     const updatedProducts = [...products];
//     updatedProducts[pIndex].colors[cIndex].color = value;
//     setProducts(updatedProducts);
//   };

//   const handleSizeChange = (e, pIndex, cIndex, sIndex, field) => {
//     const value = e.target.value;
//     const updatedProducts = [...products];
//     updatedProducts[pIndex].colors[cIndex].sizes[sIndex][field] = value;
//     setProducts(updatedProducts);
//   };

//   const handleSizeImageUpload = (e, pIndex, cIndex, sIndex) => {
//     const files = Array.from(e.target.files).map((file) =>
//       URL.createObjectURL(file)
//     );
//     const updatedProducts = [...products];
//     updatedProducts[pIndex].colors[cIndex].sizes[sIndex].image = [...files];
//     setProducts(updatedProducts);
//   };

//   const handleSave = (id, index) => {
//     const updatedProduct = products[index];
//     editordeleteinexisitingcategory(updatedProduct, id);
//     setEditingIndex(null);
//   };

//   return (
//     <>
//       {/* Search Bar and Sort Dropdowns */}
//       <div className="search-container" style={{border:"2px solid red",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
//         <input
//           type="text"
//           placeholder="Search by Category, Title, or Discount Price..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="search-bar"
//         />

//         {/* Dropdown for Sorting by Price */}
//         <select
//           value={sortPrice}
//           onChange={(e) => setSortPrice(e.target.value)}
//           className="sort-dropdown"
//         >
//           <option value="">Sort by Price</option>
//           <option value="lowToHigh">Price: Low to High</option>
//           <option value="highToLow">Price: High to Low</option>
//         </select>

//         {/* Dropdown for Sorting by Discount */}
//         <select
//           value={sortDiscount}
//           onChange={(e) => setSortDiscount(e.target.value)}
//           className="sort-dropdown"
//         >
//           <option value="">Sort by Discount</option>
//           <option value="lowToHigh">Discount: Low to High</option>
//           <option value="highToLow">Discount: High to Low</option>
//         </select>
//       </div>

//       <div className="admin-ka-dashtable-container">
//         <h2 className="admin-ka-dashtable-title">Available Products</h2>
//         <h2 className="admin-ka-dashtable-title">
//           Number Of Products: {filteredProducts.length}
//         </h2>
//         <table className="admin-ka-dashtable-table">
//           <thead>
//             <tr>
//               <th>Id</th>
//               <th>Category</th>
//               <th>Title</th>
//               <th>Tag</th>
//               <th>Description</th>
//               <th>Images</th>
//               <th>Price</th>
//               <th>Discount Price</th>
//               <th>Colors & Sizes</th>
//               <th>Discount</th>
//               <th>Actions</th> {/* New Column for Edit/Delete */}
//             </tr>
//           </thead>
//           <tbody>
//             {filteredProducts.map((product, index) => (
//               <tr key={index}>
//                 <td>{product._id}</td>
//                 <td>
//                   {editingIndex === index ? (
//                     <input
//                       type="text"
//                       value={product.cate}
//                       onChange={(e) => handleInputChange(e, index, "cate")}
//                     />
//                   ) : (
//                     product.cate
//                   )}
//                 </td>
//                 <td>
//                   {editingIndex === index ? (
//                     <input
//                       type="text"
//                       value={product.title}
//                       onChange={(e) => handleInputChange(e, index, "title")}
//                     />
//                   ) : (
//                     product.title
//                   )}
//                 </td>
//                 <td>{product.tag}</td>
//                 <td>{product.description}</td>
//                 <td>
//                   {product.image.map((img, i) => (
//                     <img key={i} src={img} alt="Product" width="50" />
//                   ))}
//                 </td>
//                 <td>₹{product.price}</td>
//                 <td>₹{product.discountprice}</td>
//                 <td>
//                   {product.colors.map((color, cIndex) => (
//                     <div key={cIndex}>
//                       <strong>{color.color}</strong>
//                       {color.sizes.map((size, sIndex) => (
//                         <div key={sIndex}>
//                           {size.size} ({size.quantity})
//                           {size.image.map((img, i) => (
//                             <img key={i} src={img} width="30" />
//                           ))}
//                         </div>
//                       ))}
//                     </div>
//                   ))}
//                 </td>
//                 <td>{product.discount}%</td>
//                 <td>
//                   {editingIndex === index ? (
//                     <button
//                       onClick={() => handleSave(product._id, index)}
//                       className="action-button save"
//                     >
//                       <FaSave />
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => handleEdit(index)}
//                       className="action-button edit"
//                     >
//                       <FaEdit />
//                     </button>
//                   )}
//                   <button
//                     onClick={() => deletefromexistingproduct(product._id)}
//                     className="action-button delete"
//                   >
//                     <FaTrash />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default AvailableProduct;
