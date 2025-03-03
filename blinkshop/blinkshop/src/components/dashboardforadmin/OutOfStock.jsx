import React, { useState,useEffect } from 'react'
import { useBio } from '../BioContext'
export default function OutOfStock() {
let {productdataonlydetail}=useBio()
let [outofstock,setoutofstock]=useState([])
 useEffect(() => {
        console.log("Product Data", productdataonlydetail);  // Check the data you are receiving
        if (productdataonlydetail) {
          const outofProducts = productdataonlydetail.filter((product) => {
            console.log("Checking product:", product);  // Check individual product
            return product.colors?.some((color) => 
              color.sizes?.some((size) => size.quantity ==0)
            );
          });
          console.log("Low stock products:", outofProducts);  // Check filtered data
          setoutofstock(outofProducts);
        }
      }, [productdataonlydetail]);

    if(outofstock ){
        console.log("ls",outofstock)
    }
  return (
    <>
       {
        outofstock.length!=0?(<div className="admin-ka-dashtable-container">
            <h2 className="admin-ka-dashtable-title">Available Products</h2>
            <h2 className="admin-ka-dashtable-title">Number Of Products is: {outofstock.length}</h2>
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
                {outofstock.map((product, index) => (
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
          </div>):(<h1>number of out of stock data is: {outofstock.length}</h1>)
       }
       
    </>
  )
}
