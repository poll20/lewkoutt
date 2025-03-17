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
      defaultColor: "",
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
      defaultColor: "",  // ✅ New field added here
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

  const [newColor, setNewColor] = useState({ color: "", 
    image: "",
    title: "",
    tag: "",
    description: "", });
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
          colors: [...prev.productdetails.colors, { color: newColor.color, 
            image: newColor.image, 
            title: newColor.title,
            tag: newColor.tag,  
            description: newColor.description,
            sizes: [] }],
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
            <input type="text" placeholder="Title" value={newColor.title} onChange={(e) => setNewColor({ ...newColor, title: e.target.value })} />
            <input type="text" placeholder="Tag" value={newColor.tag} onChange={(e) => setNewColor({ ...newColor, tag: e.target.value })} />
            <input type="text" placeholder="Description" value={newColor.description} onChange={(e) => setNewColor({ ...newColor, description: e.target.value })} />
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
// import React, { useEffect, useState } from "react";
// import "./AddData.css";
// import { useDashboard } from "./DashboardContext";
// import { useBio } from "../BioContext";

// const AddData = () => {
//   const { adddatatoexistingcategory, addnewcategory } = useDashboard();
//   const { productdata, handleRefetch } = useBio();

//   const [step, setStep] = useState(0);
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
//       defaultColor: "",  // ✅ New field added here
//       occasion: "",
//       neckline: "",
//       material: "",
//       printtype: "",
//       styletype: "",
//       shopname: "",
//       shopaddress: "",
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
//       defaultColor: "",  // ✅ New field added here
//       occasion: "",
//       neckline: "",
//       material: "",
//       printtype: "",
//       styletype: "",
//       shopname: "",
//       shopaddress: "",
//       discount: "",
//     },
//   });

//   const [newColor, setNewColor] = useState({
//     color: "",
//     image: "",
//     title: "",       // ✅ New field inside colors
//     tag: "",         // ✅ New field inside colors
//     description: "", // ✅ New field inside colors
//   });

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

//   // ✅ Add Color
//   const addColor = (isNewCategory) => {
//     if (newColor.color.trim()) {
//       const targetForm = isNewCategory ? setNewProduct : setProduct;
//       targetForm((prev) => ({
//         ...prev,
//         productdetails: {
//           ...prev.productdetails,
//           colors: [
//             ...prev.productdetails.colors,
//             {
//               color: newColor.color,
//               image: newColor.image,
//               title: newColor.title,       // ✅ New field
//               tag: newColor.tag,           // ✅ New field
//               description: newColor.description, // ✅ New field
//               sizes: [],
//             },
//           ],
//         },
//       }));
//       setNewColor({ color: "", image: "", title: "", tag: "", description: "" });
//     }
//   };

//   // ✅ Add Size inside Color
//   const addSize = (colorIndex, isNewCategory) => {
//     const targetForm = isNewCategory ? newProduct : product;
//     const updatedColors = [...targetForm.productdetails.colors];
//     updatedColors[colorIndex].sizes.push(newSize);
//     isNewCategory
//       ? setNewProduct((prev) => ({
//           ...prev,
//           productdetails: { ...prev.productdetails, colors: updatedColors },
//         }))
//       : setProduct((prev) => ({
//           ...prev,
//           productdetails: { ...prev.productdetails, colors: updatedColors },
//         }));
//     setNewSize({ size: "", quantity: "", image: [] });
//   };

//   // ✅ Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (step === 1) {
//       addnewcategory(newProduct);
//       alert("New Category Added Successfully!");
//     } else {
//       let cateid = productdata.find((e) => e.category === selectedCategory);
//       adddatatoexistingcategory(product, cateid._id);
//       alert("Product Added Successfully!");
//     }
//   };

//   return (
//     <div className="admin-adddata-container" style={{border:"2px solid red",marginTop:"20px"}}>
//       {step === 1 || step === 3 ? (
//         <div className="admin-adddata-form">
//           <h2 className="admin-adddata-title">
//             {step === 1 ? "Add New Category" : "Add New Product"}
//           </h2>
//           <form onSubmit={handleSubmit}>

//             {step === 1 && (
//               <>
//                 <label>Category Name:</label>
//                 <input
//                   type="text"
//                   name="category"
//                   value={newProduct.category}
//                   onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
//                 />

//                 <label>Category Image:</label>
//                 <input type="file" onChange={handleCategoryImageUpload} />
//               </>
//             )}

//             {/* ✅ Default Color Field */}
//             <label>Default Color:</label>
//             <input
//               type="text"
//               name="defaultColor"
//               value={step === 1 ? newProduct.productdetails.defaultColor : product.productdetails.defaultColor}
//               onChange={(e) => handleChange(e, step === 1)}
//             />

//             {/* ✅ Add Color Section */}
//             <label>Add Color:</label>
//             <input type="text" placeholder="Color Name" value={newColor.color} onChange={(e) => setNewColor({ ...newColor, color: e.target.value })} />
//             <input type="text" placeholder="Title" value={newColor.title} onChange={(e) => setNewColor({ ...newColor, title: e.target.value })} />
//             <input type="text" placeholder="Tag" value={newColor.tag} onChange={(e) => setNewColor({ ...newColor, tag: e.target.value })} />
//             <input type="text" placeholder="Description" value={newColor.description} onChange={(e) => setNewColor({ ...newColor, description: e.target.value })} />
//             <button type="button" onClick={() => addColor(step === 1)}>Add Color</button>

//             {/* ✅ Display Colors with New Fields */}
//             {(step === 1 ? newProduct.productdetails.colors : product.productdetails.colors).map((color, index) => (
//               <div key={index} className="color-section">
//                 <h4>{color.color}</h4>
//                 <p>Title: {color.title}</p>
//                 <p>Tag: {color.tag}</p>
//                 <p>Description: {color.description}</p>

//                 <input type="text" placeholder="Size" value={newSize.size} onChange={(e) => setNewSize({ ...newSize, size: e.target.value })} />
//                 <input type="number" placeholder="Quantity" value={newSize.quantity} onChange={(e) => setNewSize({ ...newSize, quantity: e.target.value })} />
//                 <button type="button" onClick={() => addSize(index, step === 1)}>Add Size</button>
//               </div>
//             ))}

//             <button type="submit" onClick={() => setTimeout(() => handleRefetch(), 500)}>
//               {step === 1 ? "Add Category" : "Submit Product"}
//             </button>
//           </form>
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default AddData;
