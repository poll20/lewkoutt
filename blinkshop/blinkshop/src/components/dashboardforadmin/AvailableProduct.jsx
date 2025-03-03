import React, { useEffect, useState } from "react";
import "./AvailableProduct.css"; // Importing external CSS
import { useBio } from "../BioContext";
import { FaEdit, FaSave, FaTrash } from "react-icons/fa"; // Importing Icons
import { useDashboard } from "./DashboardContext";




const AvailableProduct = () => {
  const [products, setProducts] = useState([]); // State to hold products
  const { productdataonlydetail } = useBio(); // Accessing product details from context
  const { editordeleteinexisitingcategory,deletefromexistingproduct,dis } = useDashboard(); // Accessing the edit/delete function
  const [editingIndex, setEditingIndex] = useState(null); // To track which row is being edited
  const [searchQuery, setSearchQuery] = useState(""); // Search state
   // Sort states for Price and Discount
   const [sortPrice, setSortPrice] = useState(""); // "lowToHigh" or "highToLow"
   const [sortDiscount, setSortDiscount] = useState(""); // "lowToHigh" or "highToLow"
   
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products state
  
  useEffect(() => {
    if (productdataonlydetail) {
      setProducts(productdataonlydetail);
    }
  }, [productdataonlydetail]);



  // Filter and sort products based on search query and sort options
  useEffect(() => {
    let temp = products.filter((product) => {
      const cate = product.cate ? product.cate.toLowerCase() : "";
      const title = product.title ? product.title.toLowerCase() : "";
      // We assume product.discount is numeric or can be parsed; if not, convert appropriately.
      const discount = product.discount ? parseFloat(product.discount) : 0;
      const query = searchQuery.toLowerCase();
      return cate.includes(query) || title.includes(query) || discount.toString().includes(query);
    });

    // If both sortPrice and sortDiscount are selected, combine them.
    if (sortPrice && sortDiscount) {
      temp.sort((a, b) => {
        const priceA = a.price || 0;
        const priceB = b.price || 0;
        const discountA = a.discount ? parseFloat(a.discount) : 0;
        const discountB = b.discount ? parseFloat(b.discount) : 0;
        // Sort by price first
        const priceDiff =
          sortPrice === "lowToHigh" ? priceA - priceB : priceB - priceA;
        if (priceDiff !== 0) return priceDiff;
        // If price is same, sort by discount
        return sortDiscount === "lowToHigh"
          ? discountA - discountB
          : discountB - discountA;
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
        return sortDiscount === "lowToHigh"
          ? discountA - discountB
          : discountB - discountA;
      });
    }
    setFilteredProducts(temp);
  }, [searchQuery, products, sortPrice, sortDiscount]);

  // Handle Edit click to enter editing mode
  const handleEdit = (index) => {
    setEditingIndex(index);
  };



  // Handle input changes for all text fields
  const handleInputChange = (e, index, field) => {
    const value = e.target.value;
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  // Handle image uploads (multiple images)
  const handleImageUpload = (e, index) => {
    const files = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
    const updatedProducts = [...products];
    updatedProducts[index].image = [...updatedProducts[index].image, ...files];
    setProducts(updatedProducts);
  };

  // Handle color change for a particular color field
  const handleColorChange = (e, pIndex, cIndex) => {
    const value = e.target.value;
    const updatedProducts = [...products];
    updatedProducts[pIndex].colors[cIndex].color = value;
    setProducts(updatedProducts);
  };

  // Handle size, quantity, and size image changes for each size inside a color field
  const handleSizeChange = (e, pIndex, cIndex, sIndex, field) => {
    const value = e.target.value;
    const updatedProducts = [...products];
    updatedProducts[pIndex].colors[cIndex].sizes[sIndex][field] = value;
    setProducts(updatedProducts);
  };

  // Handle size image upload for each size inside color
  const handleSizeImageUpload = (e, pIndex, cIndex, sIndex) => {
    const files = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
    const updatedProducts = [...products];
    updatedProducts[pIndex].colors[cIndex].sizes[sIndex].image = [...files];
    setProducts(updatedProducts);
  };

  // Handle save action
  const handleSave = (id, index) => {
    const updatedProduct = products[index];
    editordeleteinexisitingcategory(updatedProduct, id);
    setEditingIndex(null); // Exit edit mode
  };

  // Handle Delete product action
  const handleDelete = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1); // Remove the selected product
    setProducts(updatedProducts);
  };

  // Search functionality
  useEffect(() => {
    const filtered = products.filter((product) =>
      (product.cate && product.cate.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.title && product.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.discount&& product.discount.includes(searchQuery))
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  return (
    <>
    
    <input
    type="text"
    placeholder="Search by Category, Title, or Discount Price..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="search-bar"



  />

   {/* Dropdown for Sorting by Price */}
   <select
          value={sortPrice}
          onChange={(e) => setSortPrice(e.target.value)}
          className="sort-dropdown"
        >
          <option value="">Sort by Price</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>

        {/* Dropdown for Sorting by Discount */}
        <select
          value={sortDiscount}
          onChange={(e) => setSortDiscount(e.target.value)}
          className="sort-dropdown"
        >
          <option value="">Sort by Discount</option>
          <option value="lowToHigh">Discount: Low to High</option>
          <option value="highToLow">Discount: High to Low</option>
        </select>
    <div className="admin-ka-dashtable-container">
         {/* ✅ Search Bar Added */}
         
      <h2 className="admin-ka-dashtable-title">Available Products</h2>
    
      <h2 className="admin-ka-dashtable-title">
        Number Of Products: {products.length}
      </h2>
      <table className="admin-ka-dashtable-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Category</th>
            <th>Title</th>
            <th>Tag</th>
            <th>Description</th>
            <th>Images</th>
            <th>Price</th>
            <th>Discount Price</th>
            <th>Colors & Sizes</th>
            <th>Discount</th>
            <th>Actions</th> {/* New Column for Edit/Delete */}
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={index}>
              <td>{product._id}</td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={product.cate}
                    onChange={(e) => handleInputChange(e, index, "cate")}
                  />
                ) : (
                  product.cate
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={product.title}
                    onChange={(e) => handleInputChange(e, index, "title")}
                  />
                ) : (
                  product.title
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={product.tag}
                    onChange={(e) => handleInputChange(e, index, "tag")}
                  />
                ) : (
                  product.tag
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <textarea
                    value={product.description}
                    onChange={(e) => handleInputChange(e, index, "description")}
                  />
                ) : (
                  product.description
                )}
              </td>
              <td>
                {product.image.map((img, i) => (
                  <img key={i} src={img} alt="Product" width="50" />
                ))}
                {editingIndex === index && (
                  <input type="file" multiple onChange={(e) => handleImageUpload(e, index)} />
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="number"
                    value={product.price}
                    onChange={(e) => handleInputChange(e, index, "price")}
                  />
                ) : (
                  `₹${product.price}`
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="number"
                    value={product.discountprice}
                    onChange={(e) => handleInputChange(e, index, "discountprice")}
                  />
                ) : (
                  `₹${product.discountprice}`
                )}
              </td>
              {/* Colors and Sizes Section */}
              <td>
                {product.colors.map((color, cIndex) => (
                  <div key={cIndex}>
                    <strong>
                      {editingIndex === index ? (
                        <input
                          type="text"
                          value={color.color}
                          onChange={(e) => handleColorChange(e, index, cIndex)}
                        />
                      ) : (
                        color.color
                      )}
                    </strong>
                    {color.sizes.map((size, sIndex) => (
                      <div key={sIndex}>
                        {editingIndex === index ? (
                          <>
                            <input
                              type="text"
                              placeholder="Size"
                              value={size.size}
                              onChange={(e) => handleSizeChange(e, index, cIndex, sIndex, "size")}
                            />
                            <input
                              type="number"
                              placeholder="Qty"
                              value={size.quantity}
                              onChange={(e) => handleSizeChange(e, index, cIndex, sIndex, "quantity")}
                            />
                            <input
                              type="file"
                              multiple
                              onChange={(e) => handleSizeImageUpload(e, index, cIndex, sIndex)}
                            />
                          </>
                        ) : (
                          <>
                            {size.size} ({size.quantity})
                            {size.image.map((img, i) => (
                              <img key={i} src={img} width="30" />
                            ))}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={product.discount}
                    onChange={(e) => handleInputChange(e, index, "discount")}
                  />
                ) : (
                  product.discount
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <button onClick={() => handleSave(product._id, index)} className="action-button save">
                    <FaSave />
                  </button>
                ) : (
                  <button onClick={() => handleEdit(index)} className="action-button edit">
                    <FaEdit />
                  </button>
                )}
                <button onClick={() => deletefromexistingproduct(product._id)} className="action-button delete">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default AvailableProduct;


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
