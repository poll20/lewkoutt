import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDashboard } from './DashboardContext'

export default function UserActivity() {
    let [userwish,setuserwish]=useState([])
    let [usercart,setusercart]=useState([])
    let [userorder,setuserorder]=useState([])
    let [userreturn,setuserreturn]=useState([])
    let {addtocartdata,addtocartdataonly,fetchCartItems,wishlistdata,wishlist,fetchCartItemss,userorderr,fetchUserOrders}=useDashboard()
    let {id}=useParams()
    useEffect(() => {
        if (id) {
          console.log("userkiid", id);
    
          const fetchData = async () => {
            try {
              await fetchCartItems(id);
              await fetchCartItemss(id);
              await fetchUserOrders(id)
            } catch (err) {
              console.error("Error fetching cart data:", err);
            }
          };
    
          fetchData(); // call the async wrapper
        }
      }, [id]);
      

    useEffect(() => {
        if (addtocartdata && addtocartdataonly && wishlistdata && wishlist &&userorderr) {
            console.log('user ke hisab se', addtocartdata,wishlistdata,userorderr)
        }
    }, [addtocartdata, addtocartdataonly,wishlistdata,wishlist,userorderr ])  // jab ye data aaye tab console kare
    const orderDelivered = userorderr?.filter(order => order.status?.toLowerCase() === "delivered");
  const orderReturned = userorderr?.filter(order => order.status?.toLowerCase() === "returned");

  
  
    const containerStyle = {
        padding: '20px',
        maxWidth: '100%',
        overflowX: 'auto',
      };
    
      const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        minWidth: '800px', // so horizontal scroll appears on small screens
      };
    
      const thTdStyle = {
        border: '1px solid #ccc',
        padding: '10px',
        textAlign: 'center',
        fontSize: '14px',
      };
    
      const thStyle = {
        ...thTdStyle,
        backgroundColor: '#f0f0f0',
        fontWeight: 'bold',
      };
    
      const imgStyle = {
        width: '60px',
        height: '60px',
        objectFit: 'cover',
        borderRadius: '6px',
      };

    
      
      const tdStyle = {
        padding: '10px',
        border: '1px solid #ccc',
        textAlign: 'left',
        verticalAlign: 'top'
      };
  return (
    <div>
       <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>User Cart</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Discount Price</th>
              <th style={thStyle}>Qty</th>
              <th style={thStyle}>Size</th>
              <th style={thStyle}>Shop Name</th>
              <th style={thStyle}>Product ID</th>
              <th style={thStyle}>productId (null?)</th>
              <th style={thStyle}>User ID</th>
              <th style={thStyle}>Image</th>
              <th style={thStyle}>_id</th>
              <th style={thStyle}>__v</th>
            </tr>
          </thead>
          <tbody>
            {addtocartdata && addtocartdata.length > 0 ? (
              addtocartdata.map((item, index) => (
                <tr key={index}>
                  <td style={thTdStyle}>{item.title}</td>
                  <td style={thTdStyle}>{item.description}</td>
                  <td style={thTdStyle}>{item.price}</td>
                  <td style={thTdStyle}>{item.discountprice}</td>
                  <td style={thTdStyle}>{item.qty}</td>
                  <td style={thTdStyle}>{item.size}</td>
                  <td style={thTdStyle}>{item.shopname}</td>
                  <td style={thTdStyle}>{item.productid}</td>
                  <td style={thTdStyle}>{item.productId}</td>
                  <td style={thTdStyle}>{item.userId}</td>
                  <td style={thTdStyle}>
                    {item.image && item.image.length > 0 && (
                      <img src={item.image[0]} alt="product" style={imgStyle} loading="lazy"/>
                    )}
                  </td>
                  <td style={thTdStyle}>{item._id}</td>
                  <td style={thTdStyle}>{item.__v}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={thTdStyle} colSpan="13">
                  No items in user cart.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>User Wishlist</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
          <thead style={{ backgroundColor: '#f2f2f2' }}>
            <tr>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Discount Price</th>
              <th style={thStyle}>Images</th>
              <th style={thStyle}>Size</th>
              <th style={thStyle}>Shop Name</th>
              <th style={thStyle}>Product ID</th>
              <th style={thStyle}>Item ID</th>
              <th style={thStyle}>User ID</th>
              <th style={thStyle}>_id</th>
              <th style={thStyle}>__v</th>
            </tr>
          </thead>
          <tbody>
            {wishlistdata && wishlistdata.map((item, index) => (
              <tr key={index}>
                <td style={tdStyle}>{item.title}</td>
                <td style={tdStyle}>{item.description}</td>
                <td style={tdStyle}>{item.price}</td>
                <td style={tdStyle}>{item.discountprice}</td>
                <td style={tdStyle}>
                  {item.image && item.image.map((img, i) => (
                    <img key={i} src={img} alt="wishlist-img" style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '5px' }} loading="lazy"/>
                  ))}
                </td>
                <td style={tdStyle}>
                  {item.size && item.size.length > 0 ? item.size.join(', ') : 'N/A'}
                </td>
                <td style={tdStyle}>{item.shopname}</td>
                <td style={tdStyle}>{item.productId || 'null'}</td>
                <td style={tdStyle}>{item.itemid}</td>
                <td style={tdStyle}>{item.userId}</td>
                <td style={tdStyle}>{item._id}</td>
                <td style={tdStyle}>{item.__v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "10px" }}>Delivered Orders</h2>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "900px" }}>
          <thead>
            <tr>
              <th style={thStyle}>_id</th>
              <th style={thStyle}>User ID</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Ordered At</th>
              <th style={thStyle}>Delivered At</th>
              <th style={thStyle}>Created At</th>
              <th style={thStyle}>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {orderDelivered?.map((item, i) => (
              <tr key={i}>
                <td style={tdStyle}>{item._id}</td>
                <td style={tdStyle}>{item.userId}</td>
                <td style={tdStyle}>{item.status}</td>
                <td style={tdStyle}>{formatDate(item.orderedAt)}</td>
                <td style={tdStyle}>{formatDate(item.deliveredAt)}</td>
                <td style={tdStyle}>{formatDate(item.createdAt)}</td>
                <td style={tdStyle}>{formatDate(item.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ margin: "40px 0 10px" }}>Returned Orders</h2>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "900px" }}>
          <thead>
            <tr>
              <th style={thStyle}>_id</th>
              <th style={thStyle}>User ID</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Ordered At</th>
              <th style={thStyle}>Delivered At</th>
              <th style={thStyle}>Created At</th>
              <th style={thStyle}>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {orderReturned?.map((item, i) => (
              <tr key={i}>
                <td style={tdStyle}>{item._id}</td>
                <td style={tdStyle}>{item.userId}</td>
                <td style={tdStyle}>{item.status}</td>
                <td style={tdStyle}>{formatDate(item.orderedAt)}</td>
                <td style={tdStyle}>{formatDate(item.deliveredAt)}</td>
                <td style={tdStyle}>{formatDate(item.createdAt)}</td>
                <td style={tdStyle}>{formatDate(item.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}
// ✅ Date formatter
function formatDate(date) {
    if (!date) return "N/A";
    return new Date(date).toLocaleString();
  }