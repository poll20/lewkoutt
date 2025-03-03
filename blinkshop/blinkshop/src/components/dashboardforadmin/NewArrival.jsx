import React, { useEffect, useState } from 'react'
import { useBio } from '../BioContext'
import { useDashboard } from './DashboardContext'
export default function NewArrival() {
let [newarrivaldata,setnewarrivaldata]=useState([])
let { newarrival, productdataonlydetail}=useBio()

useEffect(()=>{ 
    if( newarrival &&  productdataonlydetail)
    {
       let nd = productdataonlydetail.filter((e) =>
           newarrival.some((n) => e._id === n.ProductId)
         );
           console.log("nd",nd)
           setnewarrivaldata(nd)
    } },[newarrival])
 
  return (
    <>
      <div className="admin-ka-dashtable-container">
      <h2 className="admin-ka-dashtable-title">Available Products</h2>
      <h2 className="admin-ka-dashtable-title">Number Of Products is: {newarrivaldata.length}</h2>
      <table className="admin-ka-dashtable-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Category</th>
            <th>Title</th>
            <th>Tag</th>
            <th>Description</th>
            <th>Image</th>
            <th>Price</th>
            <th>Discount Price</th>
            <th>Colors & Sizes</th>
            <th>Discount</th>
          </tr>
        </thead>
        <tbody>
          {newarrivaldata.map((product, index) => (
            <tr key={index}>
              <td>{product._id}</td>
              <td>{product.cate}</td>
              <td>{product.title}</td>
              <td>{product.tag}</td>
              <td>{product.description}</td>
              <td>
                {product.image.map((e, i) => (
                  <div key={i}>{e}</div>
                ))}
              </td>
              <td>₹{product.price}</td>
              <td>₹{product.discountprice}</td>
              <td>
                {product.colors.map((color, cIndex) => (
                  <div key={cIndex}>
                    <strong>{color.color}</strong>:{" "}
                    {color.sizes.map((size, sIndex) => (
                      <span key={sIndex}>
                        {size.size} ({size.quantity})({size.image}){" "}
                      </span>
                    ))}
                  </div>
                ))}
              </td>
              <td>{product.discount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )
}
