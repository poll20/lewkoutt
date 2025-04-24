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
  //   <footer className="footer">
  //     <div className="footer-container">
  //       {/* Company Info Section */}
  //       <div className="footer-column">
  //         <h4>About Us</h4>
  //         <p>
  //           We are a leading e-commerce platform offering a wide range of products to suit your needs. Our goal is to provide top-notch services with exceptional customer experience.
  //         </p>
  //       </div>

  //       {/* Quick Links Section */}
  //       <div className="footer-column">
  //         <h4>Quick Links</h4>
  //         <ul>
  //           <li><a href="/">Home</a></li>
  //           <li><a href="/about">About</a></li>
  //           <li><a href="/products">Products</a></li>
  //           <li><a href="/contact">Contact</a></li>
  //         </ul>
  //       </div>

  //       {/* Newsletter Section */}
  //       {/* <div className="footer-column">
  //         <h4>Newsletter</h4>
  //         <p>Subscribe to get the latest news and updates.</p>
  //         <form>
  //           <input type="email" placeholder="Enter your email" />
  //           <button type="submit">Subscribe</button>
  //         </form>
  //       </div> */}

  //       {/* Social Media Icons */}
  //       <div className="footer-column">
  //         <h4>Follow Us</h4>
  //         <div className="social-icons">
  //           <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
  //             <i className="fab fa-facebook-f">facebook</i>
  //           </a>
  //           <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
  //             <i className="fab fa-twitter">twitter</i>
  //           </a>
  //           <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
  //             <i className="fab fa-instagram">instagram</i>
  //           </a>
  //           <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
  //             <i className="fab fa-linkedin-in">linkedin</i>
  //           </a>
  //         </div>
  //       </div>

  //       <div className="footer-column shop">
  //         <h4>SHOP</h4>
  //         <ul>
  // {
  //   distinctcat.map((e)=>{
  //     return(
  //       <li>
  //         <NavLink to={`/productmodel/${e}`}>{e}</NavLink>
  //       </li>
  //     )
  //   })
  // }
  //         </ul>
  //       </div>
  //     </div>
      
  //     <div className="footer-bottom">
  //       <p>&copy; 2024 Your Company. All rights reserved.</p>
  //     </div>
  //   </footer>
  <footer className="bg-black text-white px-6 py-10 md:px-20 footer"  >
      <div className="text-center mb-8 footer-container">
        <h1 className="text-4xl font-bold font-serif italic">Lewkout</h1>
        <p className="text-sm mt-2">Fast. Fierce. Fashion in 60 minutes!</p>
        <p className="text-sm mt-1">Jaipur, Rajasthan</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-sm gap-6 md:gap-0"style={{display:"flex"}}>
        <div>
          <h2 className="font-semibold mb-2"style={{color:"white",textAlign:"center",paddingRight:"30px"}}>Quick Links</h2>
          <ul className="space-y-1" style={{listStyle:"none",display:"flex",flexDirection:"column",textAlign:"start"}}>
            <li><NavLink to='/' className="hover:underline navlink" style={{textDecoration:"none",color:"white"}}>Home</NavLink></li>
            <li><NavLink to='/store/store' className="hover:underline navlink" style={{textDecoration:"none",color:"white"}}>Shop</NavLink></li>
            <li><NavLink to='aboutus' className="hover:underline navlink" style={{textDecoration:"none",color:"white"}}>About Us</NavLink></li>
            <li><NavLink to='/faq' className="hover:underline navlink" style={{textDecoration:"none",color:"white"}}>Contact</NavLink></li>
            <li><NavLink to='/faq' className="hover:underline navlink" style={{textDecoration:"none",color:"white"}}>Privacy Policy</NavLink></li>
            <li><NavLink to='/terms' className="hover:underline navlink" style={{textDecoration:"none",color:"white"}}>Terms & Conditions</NavLink></li>
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h2 className="font-semibold mb-2"style={{color:"white"}}>We’re on Instagram</h2>
          <div className="flex items-center justify-center md:justify-start gap-2"style={{ display:"flex",alignItems:"center",justifyContent:"center",fontSize:'20px'}}>
          <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="white"
  viewBox="0 0 24 24"
  strokeWidth="1.5"
  stroke="white"
  style={{
    width:"15px",
    height:"15px"
  }}
  // className="w-1 h-1" // 👈 Changed from w-5 h-5 to w-4 h-4
>
  <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm9.25 2a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zM12 7.25a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5z" />
</svg>
            <span>@lewkout</span>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-gray-400 "style={{color:"white",marginBottom:"70px"}}>© 2025 Lewkout. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
