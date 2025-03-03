import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Ordersofusers.css"; // ✅ CSS file bhi add karo
import { useDashboard } from "./DashboardContext";

const Ordersofusers = () => {
  const [orders, setOrders] = useState([]);
  const {userorder,markAsDelivered}=useDashboard()
  const[status,setStatus]=useState("")
if(!userorder){
    return(<p>loading....</p>)
}

  



  return (
    <div className="user-ke-orders-container">
      <h2 className="user-ke-orders-title">All Orders{userorder.length}</h2>

      <div className="user-ke-orders-table-wrapper">
        <table className="user-ke-orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Products</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Ordered At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userorder.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.userId}</td>
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>{order.phone}</td>
                <td>{order.address.join(", ")}</td>
                <td>
                  {order.products.map((product, index) => (
                    <div key={index}>
                      <b>{product.tag}</b> - {product.size} ({product.quantity}x) - ₹{product.discountprice}
                    </div>
                  ))}
                </td>
                <td>₹{order.products.reduce((acc, p) => acc + p.totalAmount, 0)}</td>
                <td className={`user-ke-orders-status ${order.status.toLowerCase()}`}>
                  {order.status}
                </td>
                <td>{new Date(order.orderedAt).toLocaleString()}</td>
                <td>
                  <button className="user-ke-orders-btn"  onClick={() => {markAsDelivered(order._id) }}>Update Status</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ordersofusers;
