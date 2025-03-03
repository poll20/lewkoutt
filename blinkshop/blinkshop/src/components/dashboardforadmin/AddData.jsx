// // // import React, { useState } from "react";
// // // import "./AddData.css";

// // // const AddData = () => {
// // //   const [step, setStep] = useState(0); // Step 0: Show Options, Step 1: Select Category, Step 2: Show Form
// // //   const [selectedCategory, setSelectedCategory] = useState(""); // Stores selected category
// // //   const categories = ["Top Wear", "Bottom Wear", "Shoes", "Accessories"]; // Example categories

// // //   const [product, setProduct] = useState({
// // //     category: "",
// // //     productdetails: {
// // //       tag: "",
// // //       title: "",
// // //       description: "",
// // //       image: [],
// // //       price: "",
// // //       discountprice: "",
// // //       colors: [],
// // //       occasion: "",
// // //       neckline: "",
// // //       material: "",
// // //       printtype: "",
// // //       styletype: "",
// // //       discount: "",
// // //     },
// // //   });
// // //   const [newColor, setNewColor] = useState(""); // To store new color input
// // //   const [newSize, setNewSize] = useState({ size: "", quantity: "", image: [] });

// // //   // ✅ Handle input change for product details
// // //   const handleChange = (e) => {
// // //     setProduct({
// // //       ...product,
// // //       productdetails: {
// // //         ...product.productdetails,
// // //         [e.target.name]: e.target.value,
// // //       },
// // //     });
// // //   };

// // //   // ✅ Add color with empty sizes array
// // //   const addColor = () => {
// // //     if (newColor) {
// // //       setProduct((prev) => ({
// // //         ...prev,
// // //         productdetails: {
// // //           ...prev.productdetails,
// // //           colors: [...prev.productdetails.colors, { color: newColor, sizes: [] }],
// // //         },
// // //       }));
// // //       setNewColor("");
// // //     }
// // //   };

// // //   // ✅ Add size & quantity inside selected color
// // //   const addSize = (colorIndex) => {
// // //     const updatedColors = [...product.productdetails.colors];
// // //     updatedColors[colorIndex].sizes.push(newSize);
// // //     setProduct((prev) => ({
// // //       ...prev,
// // //       productdetails: {
// // //         ...prev.productdetails,
// // //         colors: updatedColors,
// // //       },
// // //     }));
// // //     setNewSize({ size: "", quantity: "", image: [] });
// // //   };

// // //   // ✅ Handle form submission
// // //   const handleSubmit = (e) => {
// // //     e.preventDefault();
// // //     console.log("Final Product Data:", product);
// // //     alert("Product Added Successfully!");
// // //   };

// // //   return (
// // //     <div className="admin-ka-adddata-containerrr">
// // //       {/* ✅ Step 1: Show Two Options */}
// // //       {step === 0 && (
// // //         <div className="admin-ka-adddata-options">
// // //           <button onClick={() => setStep(1)}>➕ Add New Category</button>
// // //           <button onClick={() => setStep(2)}>📂 Add Data to Existing Category</button>
// // //         </div>
// // //       )}

// // //       {/* ✅ Step 2: Select Category */}
// // //       {step === 2 && (
// // //         <div className="admin-ka-adddata-category">
// // //           <h3>Choose Category</h3>
// // //           <select
// // //             value={selectedCategory}
// // //             onChange={(e) => setSelectedCategory(e.target.value)}
// // //           >
// // //             <option value="">Select a Category</option>
// // //             {categories.map((category, index) => (
// // //               <option key={index} value={category}>
// // //                 {category}
// // //               </option>
// // //             ))}
// // //           </select>
// // //           <button disabled={!selectedCategory} onClick={() => setStep(3)}>
// // //             Proceed
// // //           </button>
// // //         </div>
// // //       )}

// // //       {/* ✅ Step 3: Show Form to Add Data */}
// // //       {step === 3 && (
// // //        <div className="admin-ka-adddata-container" >
// // //        <h2 className="admin-ka-adddata-title">Add New Product</h2>
// // //        <form onSubmit={handleSubmit} style={{border:"1px solid red"}}>
// // //          {/* ✅ Select Category */}
// // //          <label>Category:</label>
// // //          <select
// // //            value={product.category}
// // //            onChange={(e) => setProduct({ ...product, category: e.target.value })}
// // //          >
// // //            <option value="">Select Category</option>
// // //            <option value="Top Wear">Top Wear</option>
// // //            <option value="Bottom Wear">Bottom Wear</option>
// // //            <option value="Shoes">Shoes</option>
// // //            <option value="Accessories">Accessories</option>
// // //          </select>
 
// // //          {/* ✅ Basic Product Details */}
// // //          <label>Title:</label>
// // //          <input type="text" name="title" value={product.productdetails.title} onChange={handleChange} />
 
// // //          <label>Tag:</label>
// // //          <input type="text" name="tag" value={product.productdetails.tag} onChange={handleChange} />
 
// // //          <label>Description:</label>
// // //          <input type="text" name="description" value={product.productdetails.description} onChange={handleChange} />
 
// // //          <label>Price:</label>
// // //          <input type="number" name="price" value={product.productdetails.price} onChange={handleChange} />
 
// // //          <label>Discount Price:</label>
// // //          <input type="number" name="discountprice" value={product.productdetails.discountprice} onChange={handleChange} />
 
// // //          <label>Upload Images:</label>
// // //          <input type="file" multiple onChange={(e) => setProduct({ ...product, productdetails: { ...product.productdetails, image: [...e.target.files] } })} />
 
// // //          {/* ✅ Add Colors */}
// // //          <label>Add Color:</label>
// // //          <input type="text" value={newColor} onChange={(e) => setNewColor(e.target.value)} />
// // //          <button type="button" onClick={addColor}>Add Color</button>
 
// // //          {/* ✅ Add Sizes & Quantity */}
// // //          {product.productdetails.colors.map((color, index) => (
// // //            <div key={index} className="color-section">
// // //              <h4>{color.color}</h4>
// // //              <input type="text" placeholder="Size" value={newSize.size} onChange={(e) => setNewSize({ ...newSize, size: e.target.value })} />
// // //              <input type="number" placeholder="Quantity" value={newSize.quantity} onChange={(e) => setNewSize({ ...newSize, quantity: e.target.value })} />
// // //              <button type="button" onClick={() => addSize(index)}>Add Size</button>
// // //            </div>
// // //          ))}
 
// // //          <button type="submit">Submit Product</button>
// // //        </form>
// // //      </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default AddData;
// // import React, { useState } from "react";
// // import "./AddData.css";
// // import { useDashboard } from "./DashboardContext";

// // const AddData = () => {
// //     const{adddatatoexistingcategory}=useDashboard()
// //   const [step, setStep] = useState(0); // 0 = Options, 1 = Add New Category, 2 = Choose Category, 3 = Add Product
// //   const [selectedCategory, setSelectedCategory] = useState("");
// //   const categories = ["Top Wear", "Bottom Wear", "Shoes", "Accessories"];

// //   const [product, setProduct] = useState({
// //     category: "",
// //     productdetails: {
// //       tag: "",
// //       title: "",
// //       description: "",
// //       image: [],
// //       price: "",
// //       discountprice: "",
// //       colors: [],
// //       occasion: "",
// //       neckline: "",
// //       material: "",
// //       printtype: "",
// //       styletype: "",
// //       discount: "",
// //     },
// //   });

// //   const [newColor, setNewColor] = useState(""); 
// //   const [newSize, setNewSize] = useState({ size: "", quantity: "", image: [] });

// //   // ✅ Handle input change for product details
// //   const handleChange = (e) => {
// //     setProduct({
// //       ...product,
// //       productdetails: {
// //         ...product.productdetails,
// //         [e.target.name]: e.target.value,
// //       },
// //     });
// //   };

// //   // ✅ Add color with empty sizes array
// //   const addColor = () => {
// //     if (newColor.trim()) {
// //       setProduct((prev) => ({
// //         ...prev,
// //         productdetails: {
// //           ...prev.productdetails,
// //           colors: [...prev.productdetails.colors, { color: newColor, sizes: [] }],
// //         },
// //       }));
// //       setNewColor("");
// //     }
// //   };

// //   // ✅ Add size & quantity inside selected color
// //   const addSize = (colorIndex) => {
// //     const updatedColors = [...product.productdetails.colors];
// //     updatedColors[colorIndex].sizes.push(newSize);
// //     setProduct((prev) => ({
// //       ...prev,
// //       productdetails: {
// //         ...prev.productdetails,
// //         colors: updatedColors,
// //       },
// //     }));
// //     setNewSize({ size: "", quantity: "", image: [] });
// //   };

// //   // ✅ Handle form submission
// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     console.log("Final Product Data:", product);
// //     adddatatoexistingcategory(product)
// //     alert("Product Added Successfully!");
// //   };

// //   return (
// //     <div className="admin-adddata-container" >
      
// //       {/* ✅ Step 1: Show Two Options */}
// //       {step === 0 && (
// //         <div className="admin-adddata-options">
// //           <button onClick={() => setStep(1)}>➕ Add New Category</button>
// //           <button onClick={() => setStep(2)}>📂 Add Data to Existing Category</button>
// //         </div>
// //       )}

// //       {/* ✅ Step 2: Select Category */}
// //       {step === 2 && (
// //         <div className="admin-adddata-category">
// //           <h3>Choose Category</h3>
// //           <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
// //             <option value="">Select a Category</option>
// //             {categories.map((category, index) => (
// //               <option key={index} value={category}>
// //                 {category}
// //               </option>
// //             ))}
// //           </select>
// //           <button disabled={!selectedCategory} onClick={() => setStep(3)}>Proceed</button>
// //         </div>
// //       )}

// //       {/* ✅ Step 3: Show Form to Add Data */}
// //       {step === 3 && (
// //         <div className="admin-adddata-form" >
// //           <h2 className="admin-adddata-title">Add New Product</h2>
// //           <form onSubmit={handleSubmit}>
            
// //             {/* ✅ Select Category */}
// //             <label>Category:</label>
// //             <select value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })}>
// //               <option value="">Select Category</option>
// //               {categories.map((category, index) => (
// //                 <option key={index} value={category}>
// //                   {category}
// //                 </option>
// //               ))}
// //             </select>

// //             {/* ✅ Basic Product Details */}
// //             <label>Title:</label>
// //             <input type="text" name="title" value={product.productdetails.title} onChange={handleChange} />

// //             <label>Tag:</label>
// //             <input type="text" name="tag" value={product.productdetails.tag} onChange={handleChange} />

// //             <label>Description:</label>
// //             <textarea name="description" value={product.productdetails.description} onChange={handleChange}></textarea>

// //             <label>Price:</label>
// //             <input style={{widows:"120px"}} type="number" name="price" value={product.productdetails.price} onChange={handleChange} />

// //             <label>Discount Price:</label>
// //             <input style={{widows:"120px"}} type="number" name="discountprice" value={product.productdetails.discountprice} onChange={handleChange} />

// //             <label>Upload Images:</label>
// //             <input type="file" multiple onChange={(e) => setProduct({ ...product, productdetails: { ...product.productdetails, image: [...e.target.files] } })} />

// //             {/* ✅ Add Colors */}
// //             <label>Add Color:</label>
// //             <input type="text" value={newColor} onChange={(e) => setNewColor(e.target.value)} />
// //             <button type="button" onClick={addColor}>Add Color</button>

// //             {/* ✅ Add Sizes & Quantity */}
// //             {product.productdetails.colors.map((color, index) => (
// //               <div key={index} className="color-section">
// //                 <h4>{color.color}</h4>
// //                 <input type="text" placeholder="Size" value={newSize.size} onChange={(e) => setNewSize({ ...newSize, size: e.target.value })} />
// //                 <input type="number" placeholder="Quantity" value={newSize.quantity} onChange={(e) => setNewSize({ ...newSize, quantity: e.target.value })} />
// //                 <button type="button" onClick={() => addSize(index)}>Add Size</button>
// //               </div>
// //             ))}

// //             <button type="submit">Submit Product</button>
// //           </form>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default AddData;

// import React, { useEffect, useState } from "react";
// import "./AddData.css";
// import { useDashboard } from "./DashboardContext";
// import { useBio } from "../BioContext";
// const AddData = () => {
//   const { adddatatoexistingcategory } = useDashboard();
//   const {productdata}=useBio()
//   const [step, setStep] = useState(0); // 0 = Options, 1 = Add New Category, 2 = Choose Category, 3 = Add Product
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [categories,setcategories]=useState([])

//   useEffect(()=>{
//     if(productdata){
//         let caegory=productdata.map((e)=>(e.category))
//         console.log("all cate",caegory)
//         setcategories(caegory)
//     }
    
//   },[productdata])

//   const [product, setProduct] = useState({
//     // category: "",
//     productdetails: {
//       tag: "",
//       title: "",
//       cate: "",
//       description: "",
//       image: [], // ✅ Stores main product images
//       price: "",
//       discountprice: "",
//       colors: [],
//       occasion: "",
//       neckline: "",
//       material: "",
//       printtype: "",
//       styletype: "",
//       discount: "",
//     },
//   });


// //   const [product, newProduct] = useState({
// //     category: "",
// //     image:"",
// //     productdetails: {
// //       tag: "",
// //       title: "",
// //       cate: "",
// //       description: "",
// //       image: [], // ✅ Stores main product images
// //       price: "",
// //       discountprice: "",
// //       colors: [],
// //       occasion: "",
// //       neckline: "",
// //       material: "",
// //       printtype: "",
// //       styletype: "",
// //       discount: "",
// //     },
// //   });

//   const [newColor, setNewColor] = useState({ color: ""}); // ✅ Now stores image too
//   const [newSize, setNewSize] = useState({ size: "", quantity: "", image: [] });

//   // ✅ Handle input change for product details
//   const handleChange = (e) => {
//     setProduct({
//       ...product,
//       productdetails: {
//         ...product.productdetails,
//         [e.target.name]: e.target.value,
//       },
//     });
//   };

//   // ✅ Handle product image upload
//   const handleProductImageUpload = (e) => {
//     const files = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
//     setProduct((prev) => ({
//       ...prev,
//       productdetails: { ...prev.productdetails, image: [...prev.productdetails.image, ...files] },
//     }));
//   };

//   // ✅ Handle color image upload
//   const handleColorImageUpload = (e) => {
//     const file = URL.createObjectURL(e.target.files[0]);
//     setNewColor((prev) => ({ ...prev, image: file }));
//   };

//   // ✅ Handle size image upload
//   const handleSizeImageUpload = (e) => {
//     const files = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
//     setNewSize((prev) => ({ ...prev, image: [...prev.image, ...files] }));
//   };

//   // ✅ Add color with empty sizes array
//   const addColor = () => {
//     if (newColor.color.trim()) {
//       setProduct((prev) => ({
//         ...prev,
//         productdetails: {
//           ...prev.productdetails,
//           colors: [...prev.productdetails.colors, { color: newColor.color, image: newColor.image, sizes: [] }],
//         },
//       }));
//       setNewColor({ color: "", image: "" });
//     }
//   };

//   // ✅ Add size & quantity inside selected color
//   const addSize = (colorIndex) => {
//     const updatedColors = [...product.productdetails.colors];
//     updatedColors[colorIndex].sizes.push(newSize);
//     setProduct((prev) => ({
//       ...prev,
//       productdetails: {
//         ...prev.productdetails,
//         colors: updatedColors,
//       },
//     }));
//     setNewSize({ size: "", quantity: "", image: [] });
//   };

// // get the category id

   


//   // ✅ Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Final Product Data:", product);
//     let cateid=productdata.filter((e)=>(e.category==selectedCategory))
//     console.log("lolokiki",cateid)
//     adddatatoexistingcategory(product,cateid[0]._id);
//     alert("Product Added Successfully!");
//   };

//   return (
//     <div className="admin-adddata-container">
//       {/* ✅ Step 1: Show Two Options */}
//       {step === 0 && (
//         <div className="admin-adddata-options">
//           <button onClick={() => setStep(1)}>➕ Add New Category</button>
//           <button onClick={() => setStep(2)}>📂 Add Data to Existing Category</button>
//         </div>
//       )}

//       {/* ✅ Step 2: Select Category */}
//       {step === 2 && (
//         <div className="admin-adddata-category">
//           <h3>Choose Category</h3>
//           <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
//             <option value="">Select a Category</option>
//             {categories.map((category, index) => (
//               <option key={index} value={category}>
//                 {category}
//               </option>
//             ))}
//           </select>
//           <button disabled={!selectedCategory} onClick={() => setStep(3)}>Proceed</button>
//         </div>
//       )}

//       {/* ✅ Step 3: Show Form to Add Data */}
//       {step === 3 && (
//         <div className="admin-adddata-form">
//           <h2 className="admin-adddata-title">Add New Product</h2>
//           <form onSubmit={handleSubmit}>

//             {/* ✅ Select Category */}
//             {/* <label>Category:</label>
//             <select value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })}>
//               <option value="">Select Category</option>
//               {categories.map((category, index) => (
//                 <option key={index} value={category}>
//                   {category}
//                 </option>
//               ))}
//             </select> */}

//             {/* ✅ Basic Product Details */}
//             <label>Title:</label>
//             <input type="text" name="title" value={product.productdetails.title} onChange={handleChange} />
//             <label>Category:</label>
//             <input type="text" name="cate" value={product.productdetails.cate} onChange={handleChange} />

//             <label>Tag:</label>
//             <input type="text" name="tag" value={product.productdetails.tag} onChange={handleChange} />

//             <label>Description:</label>
//             <textarea name="description" value={product.productdetails.description} onChange={handleChange}></textarea>

//             <label>Price:</label>
//             <input type="number" name="price" value={product.productdetails.price} onChange={handleChange} />

//             <label>Discount Price:</label>
//             <input type="number" name="discountprice" value={product.productdetails.discountprice} onChange={handleChange} />

//             <label>Discount:</label>
//             <input type="text" name="discount" value={product.productdetails.discount} onChange={handleChange} />

//             {/* ✅ Upload Product Images */}
//             <label>Upload Product Images:</label>
//             <input type="file" multiple onChange={handleProductImageUpload} />

//             {/* ✅ Add Colors */}
//             <label>Add Color:</label>
//             <input type="text" placeholder="Color Name" value={newColor.color} onChange={(e) => setNewColor({ ...newColor, color: e.target.value })} />
//             {/* <input type="file" onChange={handleColorImageUpload} /> */}
//             <button type="button" onClick={addColor}>Add Color</button>

//             {/* ✅ Add Sizes & Quantity */}
//             {product.productdetails.colors.map((color, index) => (
//               <div key={index} className="color-section">
//                 <h4>{color.color}</h4>
//                 <img src={color.image} alt="Color Preview" width="50" />
//                 <input type="text" placeholder="Size" value={newSize.size} onChange={(e) => setNewSize({ ...newSize, size: e.target.value })} />
//                 <input type="number" placeholder="Quantity" value={newSize.quantity} onChange={(e) => setNewSize({ ...newSize, quantity: e.target.value })} />
//                 <input type="file" multiple onChange={handleSizeImageUpload} />
//                 <button type="button" onClick={() => addSize(index)}>Add Size</button>
//               </div>
//             ))}

//             <button type="submit">Submit Product</button>
//           </form>
//         </div>
//       )}

//  </div>
//   );
// };

// export default AddData;




















// import React, { useEffect, useState } from "react";
// import "./AddData.css";
// import { useDashboard } from "./DashboardContext";
// import { useBio } from "../BioContext";

// const AddData = () => {
//   const { adddatatoexistingcategory, addnewcategory} = useDashboard();
//   const { productdata } = useBio();

//   const [step, setStep] = useState(0); // 0 = Options, 1 = Add New Category, 2 = Choose Category, 3 = Add Product
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     if (productdata) {
//       let categoryList = productdata.map((e) => e.category);
//       setCategories(categoryList);
//     }
//   }, [productdata]);

//   // ✅ State for adding data to an existing category
//   const [product, setProduct] = useState({
//     productdetails: {
//       tag: "",
//       title: "",
//       cate: "",
//       description: "",
//       image: [],
//       price: "",
//       discountprice: "",
//       colors: [],
//       occasion: "",
//       neckline: "",
//       material: "",
//       printtype: "",
//       styletype: "",
//       discount: "",
//     },
//   });

//   // ✅ State for adding a new category
//   const [newProduct, setNewProduct] = useState({
//     category: "",
//     image: "",
//     productdetails: {
//       tag: "",
//       title: "",
//       cate: "",
//       description: "",
//       image: [],
//       price: "",
//       discountprice: "",
//       colors: [],
//       occasion: "",
//       neckline: "",
//       material: "",
//       printtype: "",
//       styletype: "",
//       discount: "",
//     },
//   });

//   const [newColor, setNewColor] = useState({ color: "", image: "" });
//   const [newSize, setNewSize] = useState({ size: "", quantity: "", image: [] });

//   // ✅ Handle input change dynamically for both cases
//   const handleChange = (e, isNewCategory) => {
//     const targetForm = isNewCategory ? setNewProduct : setProduct;
//     targetForm((prev) => ({
//       ...prev,
//       productdetails: {
//         ...prev.productdetails,
//         [e.target.name]: e.target.value,
//       },
//     }));
//   };

//   // ✅ Handle category image upload
//   const handleCategoryImageUpload = (e) => {
//     const file = URL.createObjectURL(e.target.files[0]);
//     setNewProduct((prev) => ({ ...prev, image: file }));
//   };

//   // ✅ Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (step === 1) {
//         addnewcategory(newProduct);
//       alert("New Category Added Successfully!");
//     } else {
//       let cateid = productdata.filter((e) => e.category === selectedCategory);
//       adddatatoexistingcategory(product, cateid[0]._id);
//       alert("Product Added Successfully!");
//     }
//   };

//   return (
//     <div className="admin-adddata-container">
//       {/* ✅ Step 1: Show Two Options */}
//       {step === 0 && (
//         <div className="admin-adddata-options">
//           <button onClick={() => setStep(1)}>➕ Add New Category</button>
//           <button onClick={() => setStep(2)}>📂 Add Data to Existing Category</button>
//         </div>
//       )}

//       {/* ✅ Step 2: Select Category */}
//       {step === 2 && (
//         <div className="admin-adddata-category">
//           <h3>Choose Category</h3>
//           <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
//             <option value="">Select a Category</option>
//             {categories.map((category, index) => (
//               <option key={index} value={category}>
//                 {category}
//               </option>
//             ))}
//           </select>
//           <button disabled={!selectedCategory} onClick={() => setStep(3)}>Proceed</button>
//         </div>
//       )}

//       {/* ✅ Step 3: Show Form for Adding Data */}
//       {step === 1 || step === 3 ? (
//         <div className="admin-adddata-form">
//           <h2 className="admin-adddata-title">{step === 1 ? "Add New Category" : "Add New Product"}</h2>
//           <form onSubmit={handleSubmit}>

//             {/* ✅ New Category Name Input */}
//             {step === 1 && (
//               <>
//                 <label>Category Name:</label>
//                 <input type="text" name="category" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} />
                
//                 <label>Category Image:</label>
//                 <input type="file" onChange={handleCategoryImageUpload} />
//               </>
//             )}

//             {/* ✅ Basic Product Details */}
//             {Object.keys(product.productdetails).map((field, index) => (
//               <div key={index}>
//                 <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
//                 <input
//                   type="text"
//                   name={field}
//                   value={step === 1 ? newProduct.productdetails[field] : product.productdetails[field]}
//                   onChange={(e) => handleChange(e, step === 1)}
//                 />
//               </div>
//             ))}

//             {/* ✅ Upload Product Images */}
//             <label>Upload Product Images:</label>
//             <input type="file" multiple onChange={(e) => {
//               const files = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
//               step === 1
//                 ? setNewProduct((prev) => ({ ...prev, productdetails: { ...prev.productdetails, image: files } }))
//                 : setProduct((prev) => ({ ...prev, productdetails: { ...prev.productdetails, image: files } }));
//             }} />

//             {/* ✅ Add Colors */}
//             <label>Add Color:</label>
//             <input type="text" placeholder="Color Name" value={newColor.color} onChange={(e) => setNewColor({ ...newColor, color: e.target.value })} />
//             <button type="button" onClick={() => {
//               const updatedProduct = step === 1 ? newProduct : product;
//               updatedProduct.productdetails.colors.push({ ...newColor, sizes: [] });
//               step === 1 ? setNewProduct(updatedProduct) : setProduct(updatedProduct);
//               setNewColor({ color: "", image: "" });
//             }}>Add Color</button>

//             {/* ✅ Add Sizes & Quantity */}
//             {step === 1 ? newProduct.productdetails.colors : product.productdetails.colors.map((color, index) => (
//               <div key={index} className="color-section">
//                 <h4>{color.color}</h4>
//                 <input type="text" placeholder="Size" value={newSize.size} onChange={(e) => setNewSize({ ...newSize, size: e.target.value })} />
//                 <input type="number" placeholder="Quantity" value={newSize.quantity} onChange={(e) => setNewSize({ ...newSize, quantity: e.target.value })} />
//                 <input type="file" multiple onChange={(e) => {
//                   const files = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
//                   setNewSize((prev) => ({ ...prev, image: [...prev.image, ...files] }));
//                 }} />
//                 <button type="button" onClick={() => {
//                   const updatedColors = step === 1 ? newProduct.productdetails.colors : product.productdetails.colors;
//                   updatedColors[index].sizes.push(newSize);
//                   step === 1 ? setNewProduct({ ...newProduct, productdetails: { ...newProduct.productdetails, colors: updatedColors } }) : setProduct({ ...product, productdetails: { ...product.productdetails, colors: updatedColors } });
//                   setNewSize({ size: "", quantity: "", image: [] });
//                 }}>Add Size</button>
//               </div>
//             ))}

//             <button type="submit">{step === 1 ? "Add Category" : "Submit Product"}</button>
//           </form>
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default AddData;












import React, { useEffect, useState } from "react";
import "./AddData.css";
import { useDashboard } from "./DashboardContext";
import { useBio } from "../BioContext";

const AddData = () => {
  const { adddatatoexistingcategory, addnewcategory } = useDashboard();
  const { productdata,handleRefetch } = useBio();

  const [step, setStep] = useState(0); // 0 = Options, 1 = Add New Category, 2 = Choose Category, 3 = Add Product
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (productdata) {
      let categoryList = productdata.map((e) => e.category);
      setCategories(categoryList);
    }
  }, [productdata]);

  // ✅ State for adding data to an existing category
  const [product, setProduct] = useState({
    productdetails: {
      tag: "",
      title: "",
      cate: "",
      description: "",
      image: [],
      price: "",
      discountprice: "",
      colors: [],
      occasion: "",
      neckline: "",
      material: "",
      printtype: "",
      styletype: "",
      shopname:"",
      shopaddress:"",
      discount: "",
    },
  });

  // ✅ State for adding a new category
  const [newProduct, setNewProduct] = useState({
    category: "",
    image: "",
    productdetails: {
      tag: "",
      title: "",
      cate: "",
      description: "",
      image: [],
      price: "",
      discountprice: "",
      colors: [],
      occasion: "",
      neckline: "",
      material: "",
      printtype: "",
      styletype: "",
      shopname:"",
      shopaddress:"",
      discount: "",
    },
  });

  const [newColor, setNewColor] = useState({ color: "", image: "" });
  const [newSize, setNewSize] = useState({ size: "", quantity: "", image: [] });

  // ✅ Handle input change dynamically for both cases
  const handleChange = (e, isNewCategory) => {
    const targetForm = isNewCategory ? setNewProduct : setProduct;
    targetForm((prev) => ({
      ...prev,
      productdetails: {
        ...prev.productdetails,
        [e.target.name]: e.target.value,
      },
    }));
  };

  // ✅ Handle category image upload
  const handleCategoryImageUpload = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setNewProduct((prev) => ({ ...prev, image: file }));
  };

  // ✅ Add Color
  const addColor = (isNewCategory) => {
    if (newColor.color.trim()) {
      const targetForm = isNewCategory ? setNewProduct : setProduct;
      targetForm((prev) => ({
        ...prev,
        productdetails: {
          ...prev.productdetails,
          colors: [...prev.productdetails.colors, { color: newColor.color, image: newColor.image, sizes: [] }],
        },
      }));
      setNewColor({ color: "", image: "" });
    }
  };

  // ✅ Add Size inside Color
  const addSize = (colorIndex, isNewCategory) => {
    const targetForm = isNewCategory ? newProduct : product;
    const updatedColors = [...targetForm.productdetails.colors];
    updatedColors[colorIndex].sizes.push(newSize);
    isNewCategory
      ? setNewProduct((prev) => ({
          ...prev,
          productdetails: { ...prev.productdetails, colors: updatedColors },
        }))
      : setProduct((prev) => ({
          ...prev,
          productdetails: { ...prev.productdetails, colors: updatedColors },
        }));
    setNewSize({ size: "", quantity: "", image: [] });
  };


    // ✅ Handle size image upload
  const handleSizeImageUpload = (e) => {
    const files = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
    setNewSize((prev) => ({ ...prev, image: [...prev.image, ...files] }));
  };

  // ✅ Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      addnewcategory(newProduct);
      alert("New Category Added Successfully!");
    } else {
      let cateid = productdata.find((e) => e.category === selectedCategory);
      adddatatoexistingcategory(product, cateid._id);
      console.log("ye h data mera ",product)
      alert("Product Added Successfully!");
    }
  };

  return (
    <div className="admin-adddata-container">
      {/* ✅ Step 1: Show Two Options */}
      {step === 0 && (
        <div className="admin-adddata-options">
          <button onClick={() => setStep(1)}>➕ Add New Category</button>
          <button onClick={() => setStep(2)}>📂 Add Data to Existing Category</button>
        </div>
      )}

      {/* ✅ Step 2: Select Category */}
      {step === 2 && (
        <div className="admin-adddata-category">
          <h3>Choose Category</h3>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Select a Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button disabled={!selectedCategory} onClick={() => setStep(3)}>Proceed</button>
        </div>
      )}

      {/* ✅ Step 3: Show Form for Adding Data */}
      {step === 1 || step === 3 ? (
        <div className="admin-adddata-form">
          <h2 className="admin-adddata-title">{step === 1 ? "Add New Category" : "Add New Product"}</h2>
          <form onSubmit={handleSubmit}>
            {/* ✅ New Category Name Input */}
            {step === 1 && (
              <>
                <label>Category Name:</label>
                <input type="text" name="category" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} />
                
                <label>Category Image:</label>
                <input type="file" onChange={handleCategoryImageUpload} />
              </>
            )}

            {/* ✅ Basic Product Details */}
            {Object.keys(product.productdetails).map((field, index) => (
              <div key={index}>
                <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                <input
                  type="text"
                  name={field}
                  value={step === 1 ? newProduct.productdetails[field] : product.productdetails[field]}
                  onChange={(e) => handleChange(e, step === 1)}
                />
              </div>
            ))}

             {/* ✅ Upload Product Images */}
             <label>Upload Product Images:</label>
             <input type="file" multiple onChange={(e) => {
               const files = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
               step === 1
                 ? setNewProduct((prev) => ({ ...prev, productdetails: { ...prev.productdetails, image: files } }))
                 : setProduct((prev) => ({ ...prev, productdetails: { ...prev.productdetails, image: files } }));
            }} />

            {/* ✅ Add Colors */}
            <label>Add Color:</label>
            <input type="text" placeholder="Color Name" value={newColor.color} onChange={(e) => setNewColor({ ...newColor, color: e.target.value })} />
            <button type="button" onClick={() => addColor(step === 1)}>Add Color</button>

            {/* ✅ Add Sizes & Quantity */}
            {(step === 1 ? newProduct.productdetails.colors : product.productdetails.colors).map((color, index) => (
              <div key={index} className="color-section">
                <h4>{color.color}</h4>
                <input type="text" placeholder="Size" value={newSize.size} onChange={(e) => setNewSize({ ...newSize, size: e.target.value })} />
                {/* <input type="number" placeholder="Quantity" value={newSize.quantity} onChange={(e) => setNewSize({ ...newSize, quantity: e.target.value })} /> */}
                <input type="number" placeholder="Quantity" value={newSize.quantity} onChange={(e) => setNewSize({ ...newSize, quantity: e.target.value })} />
               <input type="file" multiple onChange={handleSizeImageUpload} />
               {/* <input type="file" multiple onChange={(e) => {
               const files = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
               step === 1
                 ? setNewProduct((prev) => ({ ...prev, productdetails: { ...prev.productdetails, image: files } }))
                 : setProduct((prev) => ({ ...prev, productdetails: { ...prev.productdetails, image: files } }));
            }} /> */}
{/* //                 <button type="button" onClick={() => addSize(index)}>Add Size</button> */}
                <button type="button" onClick={() => addSize(index, step === 1)}>Add Size</button>
              </div>
            ))}

            <button type="submit" onClick={() => {
    setTimeout(() => {
        handleRefetch();
    }, 500); // ⏳ Thoda delay do taaki state update ho jaye
}}
>{step === 1 ? "Add Category" : "Submit Product"}</button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default AddData;
