// import React, { useState } from "react";
// import { useDashboard } from "./DashboardContext";

// const CouponForm  = () => {
//   const {createCoupon}=useDashboard()
//   const [formData, setFormData] = useState({
//     name: "",
//     type: "all",
//     category: "",
//     discountPercentage: 0,
//     minAmount: 0,
//     maxDiscount: 0,
//     messageSend: false,
//     expiresAt: "",
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // onSubmit(formData);
//     createCoupon(formData)
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
//       <h2 className="text-lg font-semibold mb-4">Create Form</h2>

//       <input
//         name="name"
//         placeholder="Coupon Code"
//         className="input"
//         value={formData.name}
//         onChange={handleChange}
//         required
//       />

//       <select name="type" value={formData.type} onChange={handleChange} className="input">
//         <option value="all">For All</option>
//         <option value="category">Category Wise</option>
//         <option value="special">Special (Message Based)</option>
//          <option value="firstbuy">First Purchase</option>
//       </select>

//       {formData.type === "category" && (
//         <input
//           name="category"
//           placeholder="Category Name"
//           className="input"
//           value={formData.category}
//           onChange={handleChange}
//         />
//       )}
// <label htmlFor="discountPercentage">discount %</label>
//       <input
//        style={{width:"20vw"}}
//         type="number"
        
//         name="discountPercentage"
//         placeholder="Discount %"
//         className="input"
//         value={formData.discountPercentage}
//         onChange={handleChange}
//         required
//       />
// <label htmlFor="minAmount">Minimum Purchase Amount</label>
//       <input
//        style={{width:"20vw"}}
//         type="number"
//         name="minAmount"
//         placeholder="Minimum Purchase Amount"
//         className="input"
//         value={formData.minAmount}
//         onChange={handleChange}
//       />
// <label htmlFor="minAmount">max discount ₹</label>
//       <input
//        style={{width:"20vw"}}
//         type="number"
//         name="maxDiscount"
//         placeholder="Max Discount ₹"
//         className="input"
//         value={formData.maxDiscount}
//         onChange={handleChange}
//       />

//       {formData.type === "special" && (
//         <label className="flex items-center space-x-2 mt-2">
//           <input
//             type="checkbox"
//             name="messageSend"
//             checked={formData.messageSend}
//             onChange={handleChange}
//           />
//           <span>Send via message</span>
//         </label>
//       )}

// <label htmlFor="expiresAt">expiresdata</label>
//       <input
//         type="date"
//         name="expiresAt"
//         className="input"
//         value={formData.expiresAt}
//         onChange={handleChange}
//       />

//       <button type="submit" className="mt-4 bg-black text-white px-4 py-2 rounded">
//         Save Coupon
//       </button>
//     </form>
//   );
// };

// export default CouponForm ;















// import React, { useState } from "react";
// import { useDashboard } from "./DashboardContext";

// const CouponForm = () => {
//   const { createCoupon } = useDashboard();

//   const [coupon, setCoupon] = useState({
//     code: "",
//     discountType: "Percentage",
//     discountValue: 0,
//     minOrderAmount: "",
//     usageLimit: "",
//     usageLimitPerUser: "",
//     startDate: "",
//     expiryDate: "",
//     categories: [],
//     productNames: [],
//     couponType: "", // Manual entry
//     isActive: true,
//     description: "",
//     autoApply: false,
//     freeShipping: false,
//     userGender: "",
//   });

//   const [categoryInput, setCategoryInput] = useState("");
//   const [productInput, setProductInput] = useState("");

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setCoupon((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleAddCategory = () => {
//     if (categoryInput.trim()) {
//       setCoupon((prev) => ({
//         ...prev,
//         categories: [...prev.categories, categoryInput.trim()],
//       }));
//       setCategoryInput("");
//     }
//   };

//   const handleAddProduct = () => {
//     if (productInput.trim()) {
//       setCoupon((prev) => ({
//         ...prev,
//         productNames: [...prev.productNames, productInput.trim()],
//       }));
//       setProductInput("");
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     createCoupon(coupon);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="coupon-form">
//       <label>Coupon Code:</label>
//       <input name="code" value={coupon.code} onChange={handleChange} required />

//       <label>Discount Type:</label>
//       <select name="discountType" value={coupon.discountType} onChange={handleChange}>
//         <option value="Percentage">Percentage</option>
//         <option value="Fixed">Fixed</option>
//       </select>

//       <label>Discount Value:</label>
//       <input type="number" name="discountValue" value={coupon.discountValue} onChange={handleChange} required />

//       <label>Minimum Order Amount:</label>
//       <input type="number" name="minOrderAmount" value={coupon.minOrderAmount} onChange={handleChange} />

//       <label>Usage Limit:</label>
//       <input type="number" name="usageLimit" value={coupon.usageLimit} onChange={handleChange} />

//       <label>Usage Limit Per User:</label>
//       <input type="number" name="usageLimitPerUser" value={coupon.usageLimitPerUser} onChange={handleChange} />

//       <label>Start Date:</label>
//       <input type="datetime-local" name="startDate" value={coupon.startDate} onChange={handleChange} required />

//       <label>Expiry Date:</label>
//       <input type="datetime-local" name="expiryDate" value={coupon.expiryDate} onChange={handleChange} required />

//       {/* ✅ Categories */}
//       <label>Applicable Categories:</label>
//       <input
//         type="text"
//         value={categoryInput}
//         placeholder="Enter category name"
//         onChange={(e) => setCategoryInput(e.target.value)}
//       />
//       <button type="button" onClick={handleAddCategory}>Add Category</button>
//       <div className="chip-list">
//         {coupon.categories.map((cat, idx) => (
//           <span key={idx} className="chip">{cat}</span>
//         ))}
//       </div>

//       {/* ✅ Product Names */}
//       <label>Applicable Product Names:</label>
//       <input
//         type="text"
//         value={productInput}
//         placeholder="Enter product name"
//         onChange={(e) => setProductInput(e.target.value)}
//       />
//       <button type="button" onClick={handleAddProduct}>Add Product</button>
//       <div className="chip-list">
//         {coupon.productNames.map((prod, idx) => (
//           <span key={idx} className="chip">{prod}</span>
//         ))}
//       </div>

//       {/* ✅ Manual Coupon Type */}
//       <label>Coupon Type:</label>
//       <input
//         type="text"
//         name="couponType"
//         placeholder="Enter type (e.g. First Order)"
//         value={coupon.couponType}
//         onChange={handleChange}
//       />

//       <label>
//         <input type="checkbox" name="isActive" checked={coupon.isActive} onChange={handleChange} />
//         Is Active
//       </label>

//       <label>Description:</label>
//       <textarea name="description" value={coupon.description} onChange={handleChange} />

//       <label>
//         <input type="checkbox" name="autoApply" checked={coupon.autoApply} onChange={handleChange} />
//         Auto Apply
//       </label>

//       <label>
//         <input type="checkbox" name="freeShipping" checked={coupon.freeShipping} onChange={handleChange} />
//         Free Shipping
//       </label>

//       <label>User Gender (optional):</label>
//       <select name="userGender" value={coupon.userGender} onChange={handleChange}>
//         <option value="">All</option>
//         <option>Male</option>
//         <option>Female</option>
//         <option>Other</option>
//       </select>

//       <button type="submit">Save Coupon</button>
//     </form>
//   );
// };

// export default CouponForm;







import React, { useState } from 'react';

const CouponForm = () => {
  // Mock context for demonstration
  const createCoupon = (couponData) => {
    console.log('Creating coupon:', couponData);
    alert('Coupon created successfully!');
  };

  const [coupon, setCoupon] = useState({
    code: "",
    discountType: "Percentage",
    discountValue: 0,
    minOrderAmount: "",
    usageLimit: "",
    usageLimitPerUser: "",
    startDate: "",
    expiryDate: "",
    categories: [],
    productNames: [],
    couponType: "", // Manual entry
    isActive: true,
    description: "",
    autoApply: false,
    freeShipping: false,
    userGender: "",
  });

  const [categoryInput, setCategoryInput] = useState("");
  const [productInput, setProductInput] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCoupon((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddCategory = () => {
    if (categoryInput.trim()) {
      setCoupon((prev) => ({
        ...prev,
        categories: [...prev.categories, categoryInput.trim()],
      }));
      setCategoryInput("");
    }
  };

  const handleAddProduct = () => {
    if (productInput.trim()) {
      setCoupon((prev) => ({
        ...prev,
        productNames: [...prev.productNames, productInput.trim()],
      }));
      setProductInput("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCoupon(coupon);
  };

  // Styles
  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const formStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    background: '#ffffff',
    borderRadius: '24px',
    padding: '40px',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
    backdropFilter: 'blur(10px)',
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: '8px',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const subtitleStyle = {
    color: '#718096',
    textAlign: 'center',
    marginBottom: '40px',
    fontSize: '1.1rem',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    marginBottom: '24px',
  };

  const fieldGroupStyle = {
    marginBottom: '24px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#374151',
    fontSize: '0.95rem',
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    backgroundColor: '#ffffff',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  };

  const inputFocusStyle = {
    outline: 'none',
    borderColor: '#667eea',
    boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
    transform: 'translateY(-1px)',
  };

  const selectStyle = {
    ...inputStyle,
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
    backgroundPosition: 'right 12px center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '16px',
    paddingRight: '40px',
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '100px',
    resize: 'vertical',
  };

  const addButtonStyle = {
    padding: '10px 20px',
    backgroundColor: '#667eea',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginLeft: '12px',
    boxShadow: '0 2px 4px rgba(102, 126, 234, 0.2)',
  };

  const addButtonHoverStyle = {
    backgroundColor: '#5a67d8',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 8px rgba(102, 126, 234, 0.3)',
  };

  const chipListStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '12px',
  };

  const chipStyle = {
    backgroundColor: '#e0e7ff',
    color: '#3730a3',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '500',
    border: '1px solid #c7d2fe',
  };

  const checkboxContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    border: '2px solid #e2e8f0',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  };

  const checkboxStyle = {
    width: '20px',
    height: '20px',
    accentColor: '#667eea',
    cursor: 'pointer',
  };

  const checkboxLabelStyle = {
    fontWeight: '500',
    color: '#374151',
    cursor: 'pointer',
    margin: 0,
  };

  const submitButtonStyle = {
    width: '100%',
    padding: '16px 32px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginTop: '32px',
  };

  const submitButtonHoverStyle = {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.6)',
  };

  const sectionStyle = {
    padding: '24px',
    backgroundColor: '#f8fafc',
    borderRadius: '16px',
    marginBottom: '24px',
    border: '1px solid #e2e8f0',
  };

  const sectionTitleStyle = {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: '16px',
    paddingBottom: '8px',
    borderBottom: '2px solid #e2e8f0',
  };

  const inputWithButtonStyle = {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    flexWrap: 'wrap',
  };

  const inputFlexStyle = {
    flex: '1',
    minWidth: '200px',
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h1 style={titleStyle}>Create Coupon</h1>
        <p style={subtitleStyle}>Design and configure your promotional coupon</p>

        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Basic Information</h3>
          
          <div style={gridStyle}>
            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Coupon Code *</label>
              <input 
                name="code" 
                value={coupon.code} 
                onChange={handleChange} 
                required
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                placeholder="Enter coupon code"
              />
            </div>

            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Discount Type *</label>
              <select 
                name="discountType" 
                value={coupon.discountType} 
                onChange={handleChange}
                style={selectStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, selectStyle)}
              >
                <option value="Percentage">Percentage</option>
                <option value="Fixed">Fixed Amount</option>
              </select>
            </div>

            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Discount Value *</label>
              <input 
                type="number" 
                name="discountValue" 
                value={coupon.discountValue} 
                onChange={handleChange} 
                required
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                placeholder="Enter discount value"
              />
            </div>

            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Coupon Type</label>
              <input
                type="text"
                name="couponType"
                placeholder="e.g., First Order, VIP, Seasonal"
                value={coupon.couponType}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
            </div>
          </div>

          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Description</label>
            <textarea 
              name="description" 
              value={coupon.description} 
              onChange={handleChange}
              style={textareaStyle}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => Object.assign(e.target.style, textareaStyle)}
              placeholder="Describe your coupon offer..."
            />
          </div>
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Usage Limits & Dates</h3>
          
          <div style={gridStyle}>
            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Minimum Order Amount</label>
              <input 
                type="number" 
                name="minOrderAmount" 
                value={coupon.minOrderAmount} 
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                placeholder="Minimum order value"
              />
            </div>

            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Total Usage Limit</label>
              <input 
                type="number" 
                name="usageLimit" 
                value={coupon.usageLimit} 
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                placeholder="Total usage limit"
              />
            </div>

            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Usage Limit Per User</label>
              <input 
                type="number" 
                name="usageLimitPerUser" 
                value={coupon.usageLimitPerUser} 
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                placeholder="Per user limit"
              />
            </div>

            <div style={fieldGroupStyle}>
              <label style={labelStyle}>User Gender</label>
              <select 
                name="userGender" 
                value={coupon.userGender} 
                onChange={handleChange}
                style={selectStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, selectStyle)}
              >
                <option value="">All Genders</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Start Date *</label>
              <input 
                type="datetime-local" 
                name="startDate" 
                value={coupon.startDate} 
                onChange={handleChange} 
                required
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
            </div>

            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Expiry Date *</label>
              <input 
                type="datetime-local" 
                name="expiryDate" 
                value={coupon.expiryDate} 
                onChange={handleChange} 
                required
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
            </div>
          </div>
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Product & Category Targeting</h3>
          
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Applicable Categories</label>
            <div style={inputWithButtonStyle}>
              <input
                type="text"
                value={categoryInput}
                placeholder="Enter category name"
                onChange={(e) => setCategoryInput(e.target.value)}
                style={{...inputStyle, ...inputFlexStyle}}
                onFocus={(e) => Object.assign(e.target.style, {...inputStyle, ...inputFlexStyle, ...inputFocusStyle})}
                onBlur={(e) => Object.assign(e.target.style, {...inputStyle, ...inputFlexStyle})}
              />
              <button 
                type="button" 
                onClick={handleAddCategory}
                style={addButtonStyle}
                onMouseEnter={(e) => Object.assign(e.target.style, addButtonHoverStyle)}
                onMouseLeave={(e) => Object.assign(e.target.style, addButtonStyle)}
              >
                Add Category
              </button>
            </div>
            <div style={chipListStyle}>
              {coupon.categories.map((cat, idx) => (
                <span key={idx} style={chipStyle}>{cat}</span>
              ))}
            </div>
          </div>

          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Applicable Product Names</label>
            <div style={inputWithButtonStyle}>
              <input
                type="text"
                value={productInput}
                placeholder="Enter product name"
                onChange={(e) => setProductInput(e.target.value)}
                style={{...inputStyle, ...inputFlexStyle}}
                onFocus={(e) => Object.assign(e.target.style, {...inputStyle, ...inputFlexStyle, ...inputFocusStyle})}
                onBlur={(e) => Object.assign(e.target.style, {...inputStyle, ...inputFlexStyle})}
              />
              <button 
                type="button" 
                onClick={handleAddProduct}
                style={addButtonStyle}
                onMouseEnter={(e) => Object.assign(e.target.style, addButtonHoverStyle)}
                onMouseLeave={(e) => Object.assign(e.target.style, addButtonStyle)}
              >
                Add Product
              </button>
            </div>
            <div style={chipListStyle}>
              {coupon.productNames.map((prod, idx) => (
                <span key={idx} style={chipStyle}>{prod}</span>
              ))}
            </div>
          </div>
        </div>

        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Additional Options</h3>
          
          <div style={gridStyle}>
            <label style={checkboxContainerStyle}>
              <input 
                type="checkbox" 
                name="isActive" 
                checked={coupon.isActive} 
                onChange={handleChange}
                style={checkboxStyle}
              />
              <span style={checkboxLabelStyle}>Coupon is Active</span>
            </label>

            <label style={checkboxContainerStyle}>
              <input 
                type="checkbox" 
                name="autoApply" 
                checked={coupon.autoApply} 
                onChange={handleChange}
                style={checkboxStyle}
              />
              <span style={checkboxLabelStyle}>Auto Apply at Checkout</span>
            </label>

            <label style={checkboxContainerStyle}>
              <input 
                type="checkbox" 
                name="freeShipping" 
                checked={coupon.freeShipping} 
                onChange={handleChange}
                style={checkboxStyle}
              />
              <span style={checkboxLabelStyle}>Includes Free Shipping</span>
            </label>
          </div>
        </div>

        <button 
          type="submit"
          style={submitButtonStyle}
          onMouseEnter={(e) => Object.assign(e.target.style, {...submitButtonStyle, ...submitButtonHoverStyle})}
          onMouseLeave={(e) => Object.assign(e.target.style, submitButtonStyle)}
        >
          Create Coupon
        </button>
      </form>
    </div>
  );
};

function App() {
  return <CouponForm />;
}

export default App;