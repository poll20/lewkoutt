







import React, { useEffect, useState } from "react";
import { ChevronLeft, Plus, FolderPlus, Upload, X, Check, Image as ImageIcon, Tag, Palette, Package, Gift } from 'lucide-react';
// import { useDashboard } from "./DashboardContext";
import { useBio } from "../BioContext";
import { useDashboard } from "./DashboardContext";



const AddData = () => {
  const { adddatatoexistingcategory, addnewcategory } = useDashboard();
  const { productdata, handleRefetch } = useBio();

  const [step, setStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [newCoupon, setNewCoupon] = useState("");

  useEffect(() => {
    if (productdata) {
      let categoryList = productdata.map((e) => e.category);
      setCategories(categoryList);
    }
  }, [productdata]);

  const [product, setProduct] = useState({
    productdetails: {
      tag: "",
      title: "",
      cate: "",
      description: "",
      image: [],
      price: "",
      discount: "",
      discountprice: "",
      coupons: [],
      defaultColor: "",
      colors: [],
      occasion: "",
      neckline: "",
      material: "",
      printtype: "",
      styletype: "",
      shopname: "",
      shopaddress: "",
      rentalcloth: "",
      rentalprice: "",
    },
  });

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
      discount: "",
      discountprice: "",
      coupons: [],
      defaultColor: "",
      colors: [],
      occasion: "",
      neckline: "",
      material: "",
      printtype: "",
      styletype: "",
      shopname: "",
      shopaddress: "",
      rentalcloth: "",
      rentalprice: "",
    },
  });

  const [newColor, setNewColor] = useState({
    color: "",
    image: "",
    title: "",
    tag: "",
    description: "",
    rentalcloth: "",
    rentalprice: "",
  });

   const handleRemoveImage = () => {
     // newProduct.image reset
    setNewProduct((prev) => ({
      ...prev,
      image: "",
    }));
  };
  const [newSize, setNewSize] = useState({ size: "", quantity: "", image: [] });

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

  
  const handleCategoryImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "lewkout");
  formData.append("cloud_name", "ddbz9m39a");

  try {
    const res = await fetch("https://api.cloudinary.com/v1_1/ddbz9m39a/image/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    // ✅ optimize kar diya
    // const uploadedUrl = data.secure_url.replace(
    //   "/upload/",
    //   "/upload/f_auto,q_auto/"
    // );
    const uploadedUrl=data.secure_url;

    setNewProduct((prev) => ({ ...prev, image: uploadedUrl }));
  } catch (err) {
    console.error("Category image upload failed:", err);
    alert("Failed to upload category image.");
  }
};


  const addColor = (isNewCategory) => {
    if (newColor.color.trim()) {
      const targetForm = isNewCategory ? setNewProduct : setProduct;
      targetForm((prev) => ({
        ...prev,
        productdetails: {
          ...prev.productdetails,
          colors: [...prev.productdetails.colors, {
            color: newColor.color,
            image: newColor.image,
            title: newColor.title,
            tag: newColor.tag,
            description: newColor.description,
            sizes: []
          }],
        },
      }));
      setNewColor({ color: "", image: "", title: "", tag: "", description: "", rentalcloth: "", rentalprice: "" });
    }
  };

  const addCoupon = (isNewCategory) => {
    if (!newCoupon.trim()) return;
    const targetForm = isNewCategory ? setNewProduct : setProduct;

    targetForm((prev) => ({
      ...prev,
      productdetails: {
        ...prev.productdetails,
        coupons: [...prev.productdetails.coupons, newCoupon.trim()],
      },
    }));

    setNewCoupon("");
  };

  const addSize = async (colorIndex, isNewCategory) => {
    const targetForm = isNewCategory ? newProduct : product;
    const updatedColors = [...targetForm.productdetails.colors];

    const fileInput = document.querySelector(`#size-image-${colorIndex}`);
    const files = fileInput ? Array.from(fileInput.files) : [];

    if (!newSize.size || !newSize.quantity || files.length === 0) {
      alert("Please fill size, quantity, and upload at least one image.");
      return;
    }

    const uploadedUrls = await uploadToCloudinary(files);

    const sizeData = {
      size: newSize.size,
      quantity: newSize.quantity,
      image: uploadedUrls,
    };

    updatedColors[colorIndex].sizes.push(sizeData);

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

    if (fileInput) fileInput.value = "";
  };

  const handleSizeImageUpload = (e) => {
    const files = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
    setNewSize((prev) => ({ ...prev, image: [...prev.image, ...files] }));
  };

  // const uploadToCloudinary = async (files) => {
  //   const urls = [];
  //   for (let file of files) {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     formData.append("upload_preset", "lewkout");
  //     formData.append("cloud_name", "ddbz9m39a");

  //     const res = await fetch("https://api.cloudinary.com/v1_1/ddbz9m39a/image/upload", {
  //       method: "POST",
  //       body: formData,
  //     });
  //     const data = await res.json();
  //     urls.push(data.secure_url);
  //   }
  //   return urls;
  // };
  const uploadToCloudinary = async (files) => {
  const urls = [];
  for (let file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "lewkout");
    formData.append("cloud_name", "ddbz9m39a");

    const res = await fetch("https://api.cloudinary.com/v1_1/ddbz9m39a/image/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    // ✅ optimize kar diya
    // urls.push(
    //   data.secure_url.replace("/upload/", "/upload/f_auto,q_auto/")
    // );
     urls.push(data.secure_url);
  }
  return urls;
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const isNew = step === 1;
      const targetProduct = isNew ? newProduct : product;

      const productImagesInput = document.querySelector('input[type="file"][multiple]');
      const productFiles = productImagesInput ? Array.from(productImagesInput.files) : [];

      const uploadedProductImages = await uploadToCloudinary(productFiles);

      const colorImages = targetProduct.productdetails.colors.map((c) => c.image).filter(Boolean);
      const uploadedColorImages = await uploadToCloudinary(colorImages);

      const sizeImages = targetProduct.productdetails.colors
        .flatMap((color) => color.sizes.flatMap((size) => size.image).filter(Boolean));
      const uploadedSizeImages = await uploadToCloudinary(sizeImages);

      const updatedProduct = {
        ...targetProduct,
        productdetails: {
          ...targetProduct.productdetails,
          image: uploadedProductImages,
          colors: targetProduct.productdetails.colors.map((color, i) => {
            const sizes = color.sizes.map((size) => {
              const sizeImageUrls = uploadedSizeImages.splice(0, size.image.length);
              return { ...size, image: sizeImageUrls };
            });

            return {
              ...color,
              image: uploadedColorImages[i] || "",
              sizes,
            };
          }),
        },
      };

      if (isNew) {
        addnewcategory(updatedProduct);
        alert("New Category Added Successfully!");
      } else {
        const cateid = productdata.find((e) => e.category === selectedCategory);
        adddatatoexistingcategory(updatedProduct, cateid._id);
        alert("Product Added Successfully!");
      }

    } catch (err) {
      console.error("Image upload error:", err);
      alert("Something went wrong while uploading images.");
    }
  };

  const fieldLabels = {
    tag: "Product Tag",
    title: "Product Title",
    cate: "Category",
    description: "Description",
    price: "Price ($)",
    discount: "Discount (%)",
    discountprice: "Discounted Price ($)",
    defaultColor: "Default Color",
    occasion: "Occasion",
    neckline: "Neckline",
    material: "Material",
    printtype: "Print Type",
    styletype: "Style Type",
    shopname: "Shop Name",
    shopaddress: "Shop Address",
    rentalcloth: "Rental Available",
    rentalprice: "Rental Price ($)",
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
  };

  const backgroundOverlay = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
    pointerEvents: 'none',
  };

  const mainCardStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    padding: '40px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    position: 'relative',
    zIndex: 1,
    animation: 'slideUp 0.6s ease-out',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '40px',
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '8px',
    letterSpacing: '-0.02em',
  };

  const subtitleStyle = {
    color: '#6b7280',
    fontSize: '1.1rem',
    fontWeight: '500',
  };

  const buttonStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '16px 32px',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
  };

  const buttonHoverStyle = {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.6)',
  };

  const inputStyle = {
    width: '100%',
    padding: '16px 20px',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    background: '#ffffff',
    fontFamily: 'inherit',
  };

  const inputFocusStyle = {
    borderColor: '#667eea',
    outline: 'none',
    boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '8px',
    letterSpacing: '0.025em',
  };

  const backButtonStyle = {
    background: 'rgba(107, 114, 128, 0.1)',
    color: '#374151',
    border: '2px solid rgba(107, 114, 128, 0.2)',
    padding: '12px 20px',
    borderRadius: '12px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '20px',
  };

  return (
    <div style={containerStyle}>
      <div style={backgroundOverlay}></div>
      
      <style>
        {`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          .form-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 24px;
            margin-bottom: 32px;
          }
          
          .color-card {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            border: 2px solid #e2e8f0;
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 20px;
            transition: all 0.3s ease;
          }
          
          .color-card:hover {
            border-color: #667eea;
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          }
          
          .coupon-chip {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 500;
            margin: 4px;
            display: inline-flex;
            align-items: center;
            gap: 4px;
          }
          
          @media (max-width: 768px) {
            .form-grid {
              grid-template-columns: 1fr;
              gap: 16px;
            }
          }
        `}
      </style>

      <div style={mainCardStyle}>
        {step > 0 && (
          <button
            style={backButtonStyle}
            onClick={() => setStep(step === 3 ? 2 : 0)}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(107, 114, 128, 0.2)';
              e.target.style.transform = 'translateX(-4px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(107, 114, 128, 0.1)';
              e.target.style.transform = 'translateX(0)';
            }}
          >
            <ChevronLeft size={20} />
            Back
          </button>
        )}

        <div style={headerStyle}>
          <h1 style={titleStyle}>Product Management</h1>
          <p style={subtitleStyle}>Create and manage your product catalog</p>
        </div>

        {step === 0 && (
          <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              marginTop: '40px'
            }}>
              <div
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '20px',
                  padding: '32px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
                }}
                onClick={() => setStep(1)}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-8px)';
                  e.target.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.3)';
                }}
              >
                <FolderPlus size={48} color="white" style={{ marginBottom: '16px' }} />
                <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '700', marginBottom: '12px' }}>
                  Add New Category
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1rem' }}>
                  Create a new product category with custom attributes
                </p>
              </div>

              <div
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderRadius: '20px',
                  padding: '32px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)',
                }}
                onClick={() => setStep(2)}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-8px)';
                  e.target.style.boxShadow = '0 20px 40px rgba(16, 185, 129, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 10px 30px rgba(16, 185, 129, 0.3)';
                }}
              >
                <Package size={48} color="white" style={{ marginBottom: '16px' }} />
                <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '700', marginBottom: '12px' }}>
                  Add to Existing
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1rem' }}>
                  Add a new product to an existing category
                </p>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '8px'
              }}>Choose Category</h2>
              <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
                Select the category where you want to add your product
              </p>
            </div>

            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
              <label style={labelStyle}>Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  ...inputStyle,
                  cursor: 'pointer',
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 16px center',
                  backgroundSize: '20px',
                  paddingRight: '48px',
                  appearance: 'none',
                }}
                onFocus={(e) => {
                  Object.assign(e.target.style, inputFocusStyle);
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="">Select a Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <button
                style={{
                  ...buttonStyle,
                  width: '100%',
                  justifyContent: 'center',
                  marginTop: '24px',
                  opacity: selectedCategory ? 1 : 0.6,
                  cursor: selectedCategory ? 'pointer' : 'not-allowed',
                }}
                disabled={!selectedCategory}
                onClick={() => setStep(3)}
                onMouseEnter={(e) => {
                  if (selectedCategory) {
                    Object.assign(e.target.style, buttonHoverStyle);
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                }}
              >
                <Check size={20} />
                Proceed
              </button>
            </div>
          </div>
        )}

        {(step === 1 || step === 3) && (
          <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '8px'
              }}>
                {step === 1 ? "Create New Category" : "Add New Product"}
              </h2>
              <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
                {step === 1 
                  ? "Set up a new product category with detailed information"
                  : `Adding product to ${selectedCategory} category`
                }
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
              {step === 1 && (
                <div style={{
                  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                  borderRadius: '16px',
                  padding: '24px',
                  marginBottom: '32px',
                  border: '2px solid #e2e8f0',
                }}>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    color: '#1f2937',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <Tag size={24} color="#667eea" />
                    Category Details
                  </h3>
                  
                  <div className="form-grid">
                    <div>
                      <label style={labelStyle}>Category Name</label>
                      <input
                        type="text"
                        name="category"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        style={inputStyle}
                        placeholder="Enter category name"
                        onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e5e7eb';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    
                    <div>
                      <label style={labelStyle}>Category Image</label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type="file"
                          onChange={handleCategoryImageUpload}
                          style={{ display: 'none' }}
                          id="category-upload"
                          accept="image/*"
                        />
                        <label
                          htmlFor="category-upload"
                          style={{
                            ...inputStyle,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                            border: '2px dashed #cbd5e1',
                            color: '#64748b',
                          }}
                        >
                          <Upload size={20} />
                          {newProduct ? (
                            <>
          <img
            src={newProduct.image}
            alt="Preview"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            loading="lazy"
          />
          <button  onClick={(e) => {
                e.preventDefault(); // file input khulne se rokta hai
                handleRemoveImage();
              }}>remove</button>
          </>
        ) : (
          <>
            <Upload size={20} />
            Upload Category Image
          </>
        )}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div style={{
                background: 'linear-gradient(135deg, #fefefe 0%, #f8fafc 100%)',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '32px',
                border: '2px solid #e2e8f0',
              }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <Package size={24} color="#667eea" />
                  Product Information
                </h3>
                
                <div className="form-grid">
                  {Object.keys(product.productdetails)
                    .filter(field => !['image', 'colors', 'coupons'].includes(field))
                    .map((field, index) => (
                    <div key={index}>
                      <label style={labelStyle}>{fieldLabels[field] || field}</label>
                      <input
                        type={['price', 'discount', 'discountprice', 'rentalprice'].includes(field) ? 'number' : 'text'}
                        name={field}
                        value={step === 1 ? newProduct.productdetails[field] : product.productdetails[field]}
                        onChange={(e) => handleChange(e, step === 1)}
                        style={inputStyle}
                        placeholder={`Enter ${fieldLabels[field] || field}`}
                        onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e5e7eb';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* <div style={{ marginTop: '24px' }}>
                  <label style={labelStyle}>Product Images</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => {
                        const files = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
                        step === 1
                          ? setNewProduct((prev) => ({ ...prev, productdetails: { ...prev.productdetails, image: files } }))
                          : setProduct((prev) => ({ ...prev, productdetails: { ...prev.productdetails, image: files } }));
                      }}
                      style={{ display: 'none' }}
                      id="product-images"
                      accept="image/*"
                    />
                    <label
                      htmlFor="product-images"
                      style={{
                        ...inputStyle,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                        border: '2px dashed #cbd5e1',
                        color: '#64748b',
                        minHeight: '80px',
                      }}
                    >
                      <ImageIcon size={24} />
                      <span>
                        <strong>Click to upload</strong> product images<br />
                        <small>Support multiple files</small>
                      </span>
                    </label>
                  </div>
                </div> */}
                <div style={{ marginTop: '24px' }}>
  <label style={labelStyle}>Product Images</label>

  <div style={{ position: 'relative', marginBottom: '16px' }}>
    <input
      type="file"
      multiple
      // onChange={(e) => {
      //   const files = Array.from(e.target.files).map((file) =>
      //     URL.createObjectURL(file)
      //   );
      //   step === 1
      //     ? setNewProduct((prev) => ({
      //         ...prev,
      //         productdetails: { ...prev.productdetails, image: files },
      //       }))
      //     : setProduct((prev) => ({
      //         ...prev,
      //         productdetails: { ...prev.productdetails, image: files },
      //       }));
      // }}
      onChange={(e) => {
  const files = Array.from(e.target.files).map((file) =>
    URL.createObjectURL(file)
  );

  step === 1 || step === 3
    ? setNewProduct((prev) => ({
        ...prev,
        productdetails: {
          ...prev.productdetails,
          image: [...prev.productdetails.image, ...files], // 👈 append instead of replace
        },
      }))
    : setProduct((prev) => ({
        ...prev,
        productdetails: {
          ...prev.productdetails,
          image: [...prev.productdetails.image, ...files], // 👈 append instead of replace
        },
      }));
}}

      style={{ display: 'none' }}
      id="product-images"
      accept="image/*"
    />

    <label
      htmlFor="product-images"
      style={{
        ...inputStyle,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        cursor: 'pointer',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        border: '2px dashed #cbd5e1',
        color: '#64748b',
        minHeight: '80px',
      }}
    >
      <ImageIcon size={24} />
      <span>
        <strong>Click to upload</strong> product images
        <br />
        <small>Support multiple files</small>
      </span>
    </label>
  </div>

  Preview Images
  {/* <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
    {(step === 1
      ? newProduct.productdetails.image
      : product.productdetails.image
    ).map((img, index) => (
      <div
        key={index}
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid #e2e8f0',
        }}
      >
        <button
      onClick={() => {
        const updatedImages = newProduct.productdetails.image.filter((_, i) => i !== index);
        setNewProduct({
          ...newProduct,
          productdetails: {
            ...newProduct.productdetails,
            image: updatedImages,
          },
        });
      }}
      
    >
      ✕
    </button>
        <img
          src={img}
          alt="Preview"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          loading="lazy"
        />
        
      </div>
    ))}
  </div> */}
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
  {newProduct.productdetails.image.map((img, index) => (
    <div
      key={index}
      style={{
        width: '120px',
        height: '120px',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid #e2e8f0',
        position: 'relative', // button ke liye
      }}
    >
      <button
        onClick={() => {
          const updatedImages = newProduct.productdetails.image.filter(
            (_, i) => i !== index
          );
          setNewProduct({
            ...newProduct,
            productdetails: {
              ...newProduct.productdetails,
              image: updatedImages,
            },
          });
        }}
        style={{
          position: 'absolute',
          top: '4px',
          right: '4px',
          background: 'rgba(0,0,0,0.6)',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          cursor: 'pointer',
          zIndex: 10,
        }}
      >
        ✕
      </button>

      <img
        src={img}
        alt="Preview"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        loading="lazy"
      />
    </div>
  ))}
</div>

</div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #fef3e2 0%, #fed7aa 100%)',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '32px',
                border: '2px solid #fed7aa',
              }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <Gift size={24} color="#ea580c" />
                  Coupons
                </h3>
                
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                  <input
                    type="text"
                    placeholder="Enter Coupon Code"
                    value={newCoupon}
                    onChange={(e) => setNewCoupon(e.target.value)}
                    style={{ ...inputStyle, flex: 1 }}
                    onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => addCoupon(step === 1)}
                    style={{
                      background: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '16px 24px',
                      borderRadius: '12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(234, 88, 12, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <Plus size={16} style={{ display: 'inline' }} />
                  </button>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {(step === 1 ? newProduct.productdetails.coupons : product.productdetails.coupons).map((coupon, i) => (
                    <span key={i} className="coupon-chip">
                      <Gift size={14} />
                      {coupon}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #f0f9ff 0%, #dbeafe 100%)',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '32px',
                border: '2px solid #dbeafe',
              }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <Palette size={24} color="#2563eb" />
                  Colors & Variations
                </h3>
                
                <div className="form-grid">
                  <div>
                    <label style={labelStyle}>Color Name</label>
                    <input
                      type="text"
                      placeholder="e.g., Midnight Blue"
                      value={newColor.color}
                      onChange={(e) => setNewColor({ ...newColor, color: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Title</label>
                    <input
                      type="text"
                      placeholder="Color variant title"
                      value={newColor.title}
                      onChange={(e) => setNewColor({ ...newColor, title: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Tag</label>
                    <input
                      type="text"
                      placeholder="Color tag"
                      value={newColor.tag}
                      onChange={(e) => setNewColor({ ...newColor, tag: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Description</label>
                    <input
                      type="text"
                      placeholder="Color description"
                      value={newColor.description}
                      onChange={(e) => setNewColor({ ...newColor, description: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={() => addColor(step === 1)}
                  style={{
                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '16px',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <Plus size={16} />
                  Add Color
                </button>

                <div style={{ marginTop: '24px' }}>
                  {(step === 1 ? newProduct.productdetails.colors : product.productdetails.colors).map((color, index) => (
                    <div key={index} className="color-card">
                      <h4 style={{
                        fontSize: '1.1rem',
                        fontWeight: '700',
                        color: '#1f2937',
                        marginBottom: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}>
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          background: color.color.toLowerCase(),
                          border: '2px solid #e5e7eb',
                        }}></div>
                        {color.color}
                      </h4>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                        <div>
                          <label style={{ ...labelStyle, fontSize: '0.8rem' }}>Size</label>
                          <input
                            type="text"
                            placeholder="e.g., XL"
                            value={newSize.size}
                            onChange={(e) => setNewSize({ ...newSize, size: e.target.value })}
                            style={{ ...inputStyle, padding: '12px 16px', fontSize: '0.9rem' }}
                            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                            onBlur={(e) => {
                              e.target.style.borderColor = '#e5e7eb';
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                        </div>
                        <div>
                          <label style={{ ...labelStyle, fontSize: '0.8rem' }}>Quantity</label>
                          <input
                            type="number"
                            placeholder="Stock count"
                            value={newSize.quantity}
                            onChange={(e) => setNewSize({ ...newSize, quantity: e.target.value })}
                            style={{ ...inputStyle, padding: '12px 16px', fontSize: '0.9rem' }}
                            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                            onBlur={(e) => {
                              e.target.style.borderColor = '#e5e7eb';
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label style={{ ...labelStyle, fontSize: '0.8rem' }}>Size Images</label>
                        <input
                          type="file"
                          multiple
                          onChange={handleSizeImageUpload}
                          id={`size-image-${index}`}
                          style={{ display: 'none' }}
                          accept="image/*"
                        />
                        <label
                          htmlFor={`size-image-${index}`}
                          style={{
                            ...inputStyle,
                            padding: '12px 16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            background: 'rgba(255, 255, 255, 0.8)',
                            border: '2px dashed #cbd5e1',
                            color: '#64748b',
                            fontSize: '0.9rem',
                            minHeight: '50px',
                          }}
                        >
                          <ImageIcon size={16} />
                          Upload Size Images
                        </label>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => addSize(index, step === 1)}
                        style={{
                          background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                          color: 'white',
                          border: 'none',
                          padding: '10px 20px',
                          borderRadius: '10px',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          marginTop: '12px',
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 6px 20px rgba(5, 150, 105, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        <Plus size={14} />
                        Add Size
                      </button>
                      
                      {color.sizes && color.sizes.length > 0 && (
                        <div style={{ marginTop: '16px' }}>
                          <p style={{ fontSize: '0.8rem', fontWeight: '600', color: '#6b7280', marginBottom: '8px' }}>
                            Sizes Added:
                          </p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {color.sizes.map((size, sizeIndex) => (
                              <span
                                key={sizeIndex}
                                style={{
                                  background: 'rgba(59, 130, 246, 0.1)',
                                  color: '#3b82f6',
                                  padding: '4px 10px',
                                  borderRadius: '12px',
                                  fontSize: '0.7rem',
                                  fontWeight: '500',
                                  border: '1px solid rgba(59, 130, 246, 0.2)',
                                }}
                              >
                                {size.size} ({size.quantity} pcs)
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                onClick={() => {
                  setTimeout(() => {
                    handleRefetch();
                  }, 500);
                }}
                style={{
                  ...buttonStyle,
                  width: '100%',
                  justifyContent: 'center',
                  padding: '20px 32px',
                  fontSize: '1.1rem',
                  boxShadow: '0 8px 30px rgba(102, 126, 234, 0.4)',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 12px 40px rgba(102, 126, 234, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 30px rgba(102, 126, 234, 0.4)';
                }}
              >
                <Check size={24} />
                {step === 1 ? "Create Category" : "Add Product"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};  

function App() {
  return <AddData />;
}

export default App;