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

  setProducts(prev =>
    prev.map((p, i) =>
      i === index ? { ...p, [field]: value } : p
    )
  );
};


  // const handleImageUpload = (e, index) => {
  //   const files = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
  //   const updatedProducts = [...products];
  //   updatedProducts[index].image = [...updatedProducts[index].image, ...files];
  //   setProducts(updatedProducts);
  // };
const handleImageUpload = async (e, index) => {
  const files = Array.from(e.target.files);
  if (!files.length) return;

  try {
    const uploadedUrls = await uploadToCloudinary(files);
    const updatedProducts = [...products];
    updatedProducts[index].image = [...updatedProducts[index].image, ...uploadedUrls];
    setProducts(updatedProducts);
  } catch (err) {
    console.error("Product image upload failed:", err);
    alert("Failed to upload product images.");
  }
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

  // const handleSizeImageUpload = (e, pIndex, cIndex, sIndex) => {
  //   const files = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
  //   const updatedProducts = [...products];
  //   updatedProducts[pIndex].colors[cIndex].sizes[sIndex].image = [...files];
  //   setProducts(updatedProducts);
  // };

  const handleSizeImageUpload = async (e, pIndex, cIndex, sIndex) => {
  const files = Array.from(e.target.files);
  if (!files.length) return;

  try {
    const uploadedUrls = await uploadToCloudinary(files);
    const updatedProducts = [...products];
    updatedProducts[pIndex].colors[cIndex].sizes[sIndex].image = [
      ...(updatedProducts[pIndex].colors[cIndex].sizes[sIndex].image || []),
      ...uploadedUrls
    ];
    setProducts(updatedProducts);
  } catch (err) {
    console.error("Size image upload failed:", err);
    alert("Failed to upload size images.");
  }
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
    const uploadedUrl = data.secure_url.replace(
      "/upload/",
      "/upload/f_auto,q_auto/"
    );

    // setNewProduct((prev) => ({ ...prev, image: uploadedUrl }));
  } catch (err) {
    console.error("Category image upload failed:", err);
    alert("Failed to upload category image.");
  }
};


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
    urls.push(
      data.secure_url.replace("/upload/", "/upload/f_auto,q_auto/")
    );
  }
  return urls;
};
  // Styles
  const styles = {
    container: {
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      minWidth:"100vw",
      
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
          {
          filteredProducts.map((product, index) => (
            <MobileCard key={index} product={product} index={index} />
          ))
          }


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


