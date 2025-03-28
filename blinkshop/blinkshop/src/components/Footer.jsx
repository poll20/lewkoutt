import React  from 'react';
import { useState,useEffect } from 'react';
import './Footer.css';
import { NavLink } from 'react-router-dom';


const Footer = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
let [cat,setcat]=useState([])

let fetchCateGory=async()=>{
  try{
let data=await fetch(`${apiUrl}/productmodel?operation=all`)
let res=await data.json()
console.log("Dffefe",res)
setcat(res)
  }
  catch(e){
    console.log(e)
  }
}
useEffect(()=>{
  fetchCateGory()
},[])

console.log("popo",cat)
let data=cat.map((e)=>(e.productdetails.map((e)=>(e.tag)))).flat()
console.log("cucu",data)

let distinctcat=[... new Set(data)]

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Company Info Section */}
        <div className="footer-column">
          <h4>About Us</h4>
          <p>
            We are a leading e-commerce platform offering a wide range of products to suit your needs. Our goal is to provide top-notch services with exceptional customer experience.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Newsletter Section */}
        {/* <div className="footer-column">
          <h4>Newsletter</h4>
          <p>Subscribe to get the latest news and updates.</p>
          <form>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div> */}

        {/* Social Media Icons */}
        <div className="footer-column">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f">facebook</i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter">twitter</i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram">instagram</i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in">linkedin</i>
            </a>
          </div>
        </div>

        <div className="footer-column shop">
          <h4>SHOP</h4>
          <ul>
  {
    distinctcat.map((e)=>{
      return(
        <li>
          <NavLink to={`/wear/${e}`}>{e}</NavLink>
        </li>
      )
    })
  }
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
