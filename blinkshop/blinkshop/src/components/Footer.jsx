import React  from 'react';
import { useState,useEffect } from 'react';
import './Footer.css';
import { NavLink } from 'react-router-dom';


const Footer = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
let [cat,setcat]=useState([])

  return (
  
  <footer className="bg-black text-white px-6 py-10 md:px-20 footer" style={{backgroundColor:"white",color:"black"}} >
      <div className="text-center mb-8 footer-container"style={{color:"black"}}>
        <h1 className="text-4xl font-bold font-serif italic">Lewkout</h1>
        <p className="text-sm mt-2">Fast. Fierce. Fashion in 60 minutes!</p>
        <p className="text-sm mt-1">Jaipur, Rajasthan</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-sm gap-6 md:gap-0"style={{display:"flex",color:'black'}}>
        <div>
          <h2 className="font-semibold mb-2"style={{color:"black  ",textAlign:"center",paddingRight:"30px"}}>Quick Links</h2>
          <ul className="space-y-1" style={{listStyle:"none",display:"flex",flexDirection:"column",textAlign:"start"}}>
            <li><NavLink to='/' className="hover:underline navlink" style={{textDecoration:"none",color:"black"}}>Home</NavLink></li>
            <li><NavLink to='/store/store' className="hover:underline navlink" style={{textDecoration:"none",color:"black"}}>Shop</NavLink></li>
            <li><NavLink to='aboutus' className="hover:underline navlink" style={{textDecoration:"none",color:"black"}}>About Us</NavLink></li>
            <li><NavLink to='/faq' className="hover:underline navlink" style={{textDecoration:"none",color:"black"}}>Contact</NavLink></li>
            <li><NavLink to='/privacy-policy' className="hover:underline navlink" style={{textDecoration:"none",color:"black"}}>Privacy Policy</NavLink></li>
            <li><NavLink to='/terms-and-conditions' className="hover:underline navlink" style={{textDecoration:"none",color:"black"}}>Terms & Conditions</NavLink></li>
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h2 className="font-semibold mb-2"style={{color:"black"}}>We’re on Instagram</h2>
          <div className="flex items-center justify-center md:justify-start gap-2"style={{ display:"flex",alignItems:"center",justifyContent:"center",fontSize:'20px'}}>
          <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="white"
  viewBox="0 0 24 24"
  strokeWidth="1.5"
  stroke="black"
  style={{
    width:"15px",
    height:"15px"
  }}
  // className="w-1 h-1" // 👈 Changed from w-5 h-5 to w-4 h-4
>
  <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm9.25 2a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zM12 7.25a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5z" />
</svg>      
              <NavLink to='https://www.instagram.com/lewkout.in/' target="_blank" rel="noopener noreferrer" className="hover:underline navlink" style={{textDecoration:"none",color:"black"}}>
            <span >@lewkout.in</span>
            </NavLink>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-gray-400 "style={{color:"black",marginBottom:"70px"}}>© 2025 Lewkout. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
