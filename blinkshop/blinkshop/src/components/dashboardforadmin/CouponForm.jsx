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
import React, { useState } from "react";
import { useDashboard } from "./DashboardContext";

const CouponForm = () => {
  const { createCoupon } = useDashboard();

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

  return (
    <form onSubmit={handleSubmit} className="coupon-form">
      <label>Coupon Code:</label>
      <input name="code" value={coupon.code} onChange={handleChange} required />

      <label>Discount Type:</label>
      <select name="discountType" value={coupon.discountType} onChange={handleChange}>
        <option value="Percentage">Percentage</option>
        <option value="Fixed">Fixed</option>
      </select>

      <label>Discount Value:</label>
      <input type="number" name="discountValue" value={coupon.discountValue} onChange={handleChange} required />

      <label>Minimum Order Amount:</label>
      <input type="number" name="minOrderAmount" value={coupon.minOrderAmount} onChange={handleChange} />

      <label>Usage Limit:</label>
      <input type="number" name="usageLimit" value={coupon.usageLimit} onChange={handleChange} />

      <label>Usage Limit Per User:</label>
      <input type="number" name="usageLimitPerUser" value={coupon.usageLimitPerUser} onChange={handleChange} />

      <label>Start Date:</label>
      <input type="datetime-local" name="startDate" value={coupon.startDate} onChange={handleChange} required />

      <label>Expiry Date:</label>
      <input type="datetime-local" name="expiryDate" value={coupon.expiryDate} onChange={handleChange} required />

      {/* ✅ Categories */}
      <label>Applicable Categories:</label>
      <input
        type="text"
        value={categoryInput}
        placeholder="Enter category name"
        onChange={(e) => setCategoryInput(e.target.value)}
      />
      <button type="button" onClick={handleAddCategory}>Add Category</button>
      <div className="chip-list">
        {coupon.categories.map((cat, idx) => (
          <span key={idx} className="chip">{cat}</span>
        ))}
      </div>

      {/* ✅ Product Names */}
      <label>Applicable Product Names:</label>
      <input
        type="text"
        value={productInput}
        placeholder="Enter product name"
        onChange={(e) => setProductInput(e.target.value)}
      />
      <button type="button" onClick={handleAddProduct}>Add Product</button>
      <div className="chip-list">
        {coupon.productNames.map((prod, idx) => (
          <span key={idx} className="chip">{prod}</span>
        ))}
      </div>

      {/* ✅ Manual Coupon Type */}
      <label>Coupon Type:</label>
      <input
        type="text"
        name="couponType"
        placeholder="Enter type (e.g. First Order)"
        value={coupon.couponType}
        onChange={handleChange}
      />

      <label>
        <input type="checkbox" name="isActive" checked={coupon.isActive} onChange={handleChange} />
        Is Active
      </label>

      <label>Description:</label>
      <textarea name="description" value={coupon.description} onChange={handleChange} />

      <label>
        <input type="checkbox" name="autoApply" checked={coupon.autoApply} onChange={handleChange} />
        Auto Apply
      </label>

      <label>
        <input type="checkbox" name="freeShipping" checked={coupon.freeShipping} onChange={handleChange} />
        Free Shipping
      </label>

      <label>User Gender (optional):</label>
      <select name="userGender" value={coupon.userGender} onChange={handleChange}>
        <option value="">All</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>

      <button type="submit">Save Coupon</button>
    </form>
  );
};

export default CouponForm;
