import React, { useState,useEffect } from "react";
import { useBio } from "./BioContext";
import { useDashboard } from "./dashboardforadmin/DashboardContext";


const ShopkeeperDashboard = () => {
  // Sample data for demonstration
  let[products,setproducts]=useState([])
   const {shopkeeperprd ,shopkeepersale } = useDashboard();

     useEffect(() => {
       if (shopkeeperprd || shopkeepersale) {
        let arr=shopkeeperprd.map((e)=>(e.productdetails)).flat()
        console.log("only productdetilas",arr)
         setproducts(arr);
       }
       console.log("shopkeeper sale",shopkeepersale)

     }, [shopkeeperprd,shopkeepersale]);
   
//   const products = [
//     { id: "p1", name: "Product 1", shopname: "My Shop", price: 100 },
//     { id: "p2", name: "Product 2", shopname: "My Shop", price: 200 },
//     { id: "p3", name: "Product 3", shopname: "My Shop", price: 150 },
//   ];

  const sales = [
    { id: "s1", productid: "p1", productname: "Product 1", shopname: "My Shop", price: 100, dateofsale: "2025-02-27" },
    { id: "s2", productid: "p2", productname: "Product 2", shopname: "My Shop", price: 200, dateofsale: "2025-02-26" },
    { id: "s3", productid: "p1", productname: "Product 1", shopname: "My Shop", price: 100, dateofsale: "2025-02-25" },
  ];

  const totalSales = sales.reduce((acc, sale) => acc + sale.price, 0);

  const [activeSection, setActiveSection] = useState("products");

  return (
    <div style={{marginTop:"60px"}}>
    
    <div className="p-2 sm:p-4">
      {/* Toggle Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setActiveSection("products")}
          className={`px-2 py-1 sm:px-4 sm:py-2 rounded text-xs sm:text-sm ${activeSection === "products" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          All Products
        </button>
        <button
          onClick={() => setActiveSection("sales")}
          className={`px-2 py-1 sm:px-4 sm:py-2 rounded text-xs sm:text-sm ${activeSection === "sales" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          Sales
        </button>
      </div>

      {/* Products Table */}
      {activeSection === "products" && (
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 py-1 sm:px-4 sm:py-2 border">Product ID</th>
                <th className="px-2 py-1 sm:px-4 sm:py-2 border">Product Name</th>
                <th className="px-2 py-1 sm:px-4 sm:py-2 border">Shop Name</th>
                <th className="px-2 py-1 sm:px-4 sm:py-2 border">Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-2 py-1 sm:px-4 sm:py-2 border">{product._id}</td>
                  <td className="px-2 py-1 sm:px-4 sm:py-2 border">{product.title}</td>
                  <td className="px-2 py-1 sm:px-4 sm:py-2 border">{product.shopname}</td>
                  <td className="px-2 py-1 sm:px-4 sm:py-2 border">{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Sales Table */}
{activeSection === "sales" && (
  <div className="overflow-x-auto">
    <table className="w-full text-xs sm:text-sm bg-white border border-gray-200 rounded-lg shadow-md mb-4">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-2 py-1 sm:px-4 sm:py-2 border">Sale Date</th>
          <th className="px-2 py-1 sm:px-4 sm:py-2 border">Total Sale</th>
          <th className="px-2 py-1 sm:px-4 sm:py-2 border">Total Return</th>
          <th className="px-2 py-1 sm:px-4 sm:py-2 border">Total Revenue</th>
          <th className="px-2 py-1 sm:px-4 sm:py-2 border">Products & Qty</th>
        </tr>
      </thead>
      <tbody>
        {shopkeepersale?.map((sale, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="px-2 py-1 sm:px-4 sm:py-2 border">
              {new Date(sale._id).toLocaleDateString()} {/* ✅ Convert date */}
            </td>
            <td className="px-2 py-1 sm:px-4 sm:py-2 border">{sale.totalSales}</td>
            <td className="px-2 py-1 sm:px-4 sm:py-2 border">{sale.totalReturns}</td>
            <td className="px-2 py-1 sm:px-4 sm:py-2 border">{sale.totalRevenue}</td>
            <td className="px-2 py-1 sm:px-4 sm:py-2 border">
              {sale.products.map(p => `${p.productName} (${p.quantity})`).join(", ")}
              {/* ✅ Products ko ek line mein dikhane ke liye */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {/* ✅ Total Revenue Show */}
    <div className="text-right font-bold text-xs sm:text-sm">
      Total Sales: {shopkeepersale?.reduce((sum, sale) => sum + sale.totalRevenue, 0)}
    </div>
  </div>
)}

    </div>
    </div>
    
  );
};

export default ShopkeeperDashboard;
