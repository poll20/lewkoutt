// import React, { useState,useRef,useEffect } from 'react';
// import { NavLink } from "react-router-dom";
// import { CiShoppingCart, CiHome, CiLogin} from "react-icons/ci";
// import { SlBadge } from "react-icons/sl";

// import { PiDressThin } from "react-icons/pi";
// // import { CiUser } from "react-icons/ci";
// import { IoIosMenu } from "react-icons/io";
// // import { PiStorefrontThin } from "react-icons/pi";
// import './Navbar.css'; // CSS for professional styling
// // import SearchBar from './SearchBar';
// import { CiHeart } from "react-icons/ci";
// // import { CiSearch } from "react-icons/ci";
// import { useNavigate } from 'react-router-dom';
// import LoginButton from './Login';

// import { useBio } from './BioContext';
// // import { set } from 'mongoose';
// // import { useAuth } from './AuthContext';
// import { useFirebaseAuth } from './FirebaseContext';

// import lewkoutlogo from "../components/image/lewklogo.webp"
// import { useLoading } from './LoadingContext';

// const ResponsiveNavbar = (props) => {
//   const apiUrl = import.meta.env.VITE_API_URL;
//   // let {user,userDetails}=useAuth()
//   let {user,userDetails}=useFirebaseAuth()
//   let {setcatehicate,addtocartdatas,isLoggedIn,guestCart}=useBio()
//   const [dropdown, setDropdown] = useState(false);
//     const { setIsLoading } = useLoading();
  
//   const [sideNavbarOpen, setSideNavbarOpen] = useState(false);
// const navigate=useNavigate()
//   // Toggle for the category dropdown
//   // const handleDropdownToggle = () => {
//   //   setDropdown(!dropdown);
    
//   // };
//   if(addtocartdatas){
//     console.log("plzaaaaaaaaaaaa aajaaaaaaa",addtocartdatas.length)
//   }

//   // Toggle for the sliding navbar on mobile
//   const handleSideNavbarToggle = () => {
//     setSideNavbarOpen(!sideNavbarOpen);
//   };
//   const [isOpen, setIsOpen] = useState(false);

//   // Function to open and close popup
//   const togglePopup = () => {
//     setIsOpen(!isOpen);
//   };

//   const [issOpen, ssetIsOpen] = useState(false);
//   const [subMenu, setSubMenu] = useState(null);
//   let [categorydata,setcategorydata]=useState([])
//   const dropdownRef = useRef(null);
//   const [tags,settags]=useState([])
//   const toggleDropdown = () => {
//     ssetIsOpen(!issOpen);
    
//   };

//   // const handleSubMenu = (category) => {
//   //   console.log("toto",category)
//   //   setSubMenu(category === subMenu ? null : category);
    
//   //   // let taging=categorydata.filter((tags)=>{
//   //   //   return tags.category===category 
//   //   // })

//   //   let taging=categorydata.filter((e)=>(e.category==category))
//   //   console.log("taging",taging)
//   //     let alltags=taging.map((e)=>{
//   //       return e.productdetails
//   //     }).flat()
//   //     console.log("altag",alltags)
//   //     let finaltag=alltags.map((e)=>(e.tag))
//   //     // let distincttag=[...new Set(finaltag)]
//   //     let distincttag = [...new Set(finaltag)].filter(tag => tag !== "Co-ord Sets");

//   //     settags(distincttag)
    
//   // };
//   const handleSubMenu = (category) => {
//  setSubMenu(category);

//   const found = categorydata?.find(c => c.category === category);
//   settags(found?.tags || []);
// };
//   console.log("momk",tags)

//   // Close dropdown if clicked outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         ssetIsOpen(false);
//         setSubMenu(null);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);


// // let datafetch=async()=>{
// //   let data=await fetch(`${apiUrl}/productmodel?operation=all`)
// //   let finaldata=await data.json()
// //   console.log("kookoaio",finaldata)
// //  setcategorydata(finaldata)
  
// // }  
// // useEffect(()=>{
// //   datafetch()
// // },[])
// // const fetchNavbarData = async () => {
// //   const res = await fetch(`${apiUrl}/productmodel?operation=navbar`);
// //   const data = await res.json();

// //   /*
// //     data = [
// //       { category: "...", tags: [...] },
// //       ...
// //     ]
// //   */

// //   setcategorydata(data);
// // };

// const fetchNavbarData = async () => {
//   try {
//     setIsLoading(true); 

//     const res = await fetch(
//       `${apiUrl}/productmodel?operation=navbar`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     // ✅ Check HTTP status
//     if (!res.ok) {
//       throw new Error(`Server Error: ${res.status}`);
//     }

//     // ✅ Safely parse JSON
//     const data = await res.json();

//     // ✅ Validate data
//     if (!Array.isArray(data)) {
//       throw new Error("Invalid data format received");
//     }

//     setcategorydata(data);
//   } catch (error) {
//     console.error("❌ Navbar Fetch Error:", error.message);

//     // Optional: empty fallback
//     setcategorydata([]);

//     // Optional: show toast / UI message
//     // setError("Failed to load categories");
//   } finally {
//     setIsLoading(false);
//   }
// };

// useEffect(() => {
//   fetchNavbarData();
// }, []);


// let categoryy=categorydata?.map((cat)=>{
//   return cat.category 
// })

// const distinctcat = categorydata?.map(c => c.category);
// console.log("subcate",distinctcat)
// useEffect(()=>{
//   if(distinctcat){
//     setcatehicate(distinctcat)
//   }
// },[categorydata])


// let closeslidecategorynav=()=>{
//   setSideNavbarOpen(!sideNavbarOpen)
// }
// console.log("navbar m props.pdd value",props.pd)
//   return (
//     <div style={{visibility:props.pd==true?("hidden"):('')}}>
//       {/* Top Navbar */}
//       <nav className="navbar top-navbar" >
//         <div className="mobile-menu-icon" onClick={handleSideNavbarToggle}>
//           <IoIosMenu  size={30} />
//         </div>
//         <div className="logo lato-thin" ><img style={{width:"150px",height:"auto"}} alt='lewkout'  src={lewkoutlogo} loading="lazy"></img></div>
        
//         <div style={{display:"flex",gap:"15%"}}>
//           <NavLink
//   to="/cart"
//   className={`hideinbigscreen navlink ${
//     (isLoggedIn ? addtocartdatas?.length : guestCart?.length) > 0
//       ? "position-relative"
//       : ""
//   }`}
// >

//         {/* <NavLink to="/cart" className={`hideinbigscreen navlink ${addtocartdatas.length>0?('position-relative'):('')}`}> */}
//         <svg xmlns="http://www.w3.org/2000/svg" style={{width:"27px",height:"27px"}} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//   <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
// </svg>

//         {/* {
//           addtocartdatas.length>0?( <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//             {addtocartdatas.length>0?(addtocartdatas.length):('')}
//             <span class="visually-hidden">unread messages</span>
//           </span>):('')
       
// } */}
// {
//   (isLoggedIn ? addtocartdatas?.length : guestCart?.length) > 0 && (
//     <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//       {isLoggedIn ? addtocartdatas.length : guestCart.length}
//       <span className="visually-hidden">unread messages</span>
//     </span>
//   )
// }

//   </NavLink>
// <NavLink to='/searchme'className='navlink'><svg style={{width:"27px",height:"27px"}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//   <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
// </svg>
// </NavLink>
//           </div> 

// {/* <button type="button" class="btn btn-primary position-relative">
//   Inbox
//   <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//     99+
//     <span class="visually-hidden">unread messages</span>
//   </span>
// </button>       */}
//        <ul className="nav-links">
//           <li><NavLink to="/"><CiHome size={30} /></NavLink></li>
//           <li><NavLink to="/cart"><CiShoppingCart size={30} /></NavLink></li>
//           <li><NavLink to="/wishlist" className='navlink'><CiHeart size={30}/></NavLink></li>
//           {/* <li><LoginButton/></li> */}
          
           
//       {/* Category Dropdown */}
//       <nav className="mere-top-navbar">
//       <div className="mere-top-dropdown" >
//         <div className="mere-top-dropdown-btn">
//           Category
//         </div>
//         <div className="mere-top-category-row" >
//         {
//            distinctcat.map((cat,id)=>{
//             return(
//               <div className="mere-top-category-item">
//               <button className="mere-top-category-link" onMouseEnter={()=>{handleSubMenu(cat)}}>{cat}</button>

//               <div className="mere-top-subcategory-column">
//     {tags.map((t,id)=>{
//       return(
//         <NavLink to={`/wear/${t}`}><button className="mere-top-subcategory-link">{t}</button></NavLink>
//       )
//     })}
               
//               </div>


//              </div>
//             )
//            })
          
//         }
//         </div>
//       </div>
//     </nav>
//            <li><LoginButton/></li> 
//            {/* <li><NavLink to="/createaccount">Sign up</NavLink></li>  */}
//         </ul>
//       </nav>

//       {/* Bottom Navbar for mobile screens */}
      
//       <nav className="navbar bottom-navbar" style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"0 10p"}}>
//         <ul className="nav-links" style={{display:"flex",alignItems:"center",justifyContent:"space-around",width:"100%"}}>
//           <div>
//           <NavLink to="/" className="homeeee">
//           <li><svg style={{width:"30px",height:"30px"}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//   <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
// </svg>
// </li>
//           <li className='menu-link-name'>Home</li>
          
//           </NavLink>
         
//           </div>
//           <div>
//           <NavLink to="/store/store" className="homeeee">
//           <li><svg style={{width:"30px",height:"30px"}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//   <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
// </svg>
// </li>
//           <li className='menu-link-name'>Shop</li>
//           </NavLink>
//           </div>
          
//           {/* <div  style={{borderRadius:"100%",backgroundColor:"pink"}}>
//           <NavLink to="/rent/rent" className='homeeee'>
//           <li  style={{color:"black",fontSize:"8px"}}>Coming</li>
//           <li  style={{color:"black",fontSize:"8px"}}>Soon</li>
//           </NavLink>
//           </div> */}
          
//           <div >
//           <NavLink to="/wishlist/wish" className="homeeee">
//           {/* <li><GoHeart size={30}/></li> */}
//           <li><svg style={{width:"30px",height:"30px"}}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//   <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
// </svg>
//     </li>
//           <li className='menu-link-name'>Wishlist</li>
//           </NavLink>
//           </div>

//           <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",borderRadius:"50%",width:"40px",height:"40px"}}>
          
//           <li><LoginButton/>
          
//           <span onClick={() => {navigate("/profile"); // Click andar na jaye
//           }}
//           className='menu-link-name'
//        style={{ cursor: "default" }}
//     >
//       Account
     
//     </span></li>
//           {/* <li className='homer'>account</li> */}
//           </div>
//         </ul>
       
//       </nav>
      
        
//       {/* Sliding Side Navbar */}
//       <div className={`side-navbar ${sideNavbarOpen ? 'open' : ''}`} >
        
//       <div className="menu-container" ref={dropdownRef} >
//       <div>
//           <ul className='catlist' >
//            {/* <NavLink to={`/productmodel/newarrivals`} onClick={closeslidecategorynav} className='navlink'> <li style={{ fontFamily: "'Poppins', sans-serif" }}>New Arrival</li></NavLink> */}
//            {/* <NavLink to={`/bestsalling/bestsale`} onClick={closeslidecategorynav} className='navlink'><li style={{ fontFamily: "'Poppins', sans-serif" }}>Best Selling</li></NavLink> */}
//             <li style={{ fontFamily: "'Poppins', sans-serif" }}>
//              <span onClick={toggleDropdown}>CATEGORIES</span>
//                {/* Dropdown Menu */}
//       <div className={`dropdown ${issOpen ? "slide-down" : "slide-up"}`}>
//         <ul className="categories" style={{borderBottom:"1px solid black"}}>
//           {distinctcat.map((category,id) => (
//             <li key={id} className="category-item" style={{ fontFamily: "'Poppins', sans-serif",fontSize:"14px" ,borderBottom:"1px solid white"}}>
              
//              <span onClick={() => handleSubMenu(category)}>{category}</span>
              
              
//               <ul
//                 className={`subcategories ${
//                   subMenu === category ? "slide-down" : "slide-up"
//                 }`}
//               >
//                 {tags.map((subCategory,id) => (
//                   <li key={id} className="subcategory-item"  style={{backgroundColor:"white",textAlign:"start",fontFamily: "'Poppins', sans-serif" }}>
//                     <NavLink to={`/productmodel/${subCategory}`} onClick={closeslidecategorynav} >{subCategory}</NavLink>
//                   </li>
//                 ))}
//               </ul>
//             </li>
//           ))}
//         </ul>
//       </div>
//             </li>
//             <NavLink className="navlink" to={'/faq'} onClick={closeslidecategorynav}>
//             <li style={{ fontFamily: "'Poppins', sans-serif" }}>Customer Support</li>
//             </NavLink>
//             <NavLink to='/loginn' className={"navlink"}>
//             <li style={{ fontFamily: "'Poppins', sans-serif" }} onClick={closeslidecategorynav}>Login</li>
//             </NavLink>
//             {/* <NavLink to='/mood'>
//             <li style={{ fontFamily: "'Poppins', sans-serif" }} >Mood</li>
//             </NavLink> */}
//             {userDetails || user?(<li style={{ fontFamily: "'Poppins', sans-serif",borderBottom:"white" }}><NavLink to={`/${userDetails.role}`} >{userDetails.role=="admin"?(userDetails.role):('')}</NavLink></li>):("")}
//           </ul>
//         </div>
     

    

      
//     </div>
//       </div>

//       {/* Overlay for closing the side navbar when clicked outside */}
//       {sideNavbarOpen && <div className="overlay" onClick={handleSideNavbarToggle}></div>}
//     </div>
//   );

// };

// export default ResponsiveNavbar;

import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import './Navbar.css';
import { useBio } from './BioContext';
import { useFirebaseAuth } from './FirebaseContext';
import LoginButton from './Login';
import lewkoutlogo from "../components/image/lewklogo.webp";
import { useLoading } from './LoadingContext';

const ResponsiveNavbar = (props) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { user, userDetails } = useFirebaseAuth();
  const { setcatehicate, addtocartdatas, isLoggedIn, guestCart } = useBio();
  const { setIsLoading } = useLoading();
  const navigate = useNavigate();
  const location = useLocation();

  const [sideNavbarOpen, setSideNavbarOpen] = useState(false);
  const [issOpen, ssetIsOpen] = useState(false);
  const [subMenu, setSubMenu] = useState(null);
  const [categorydata, setcategorydata] = useState([]);
  const [tags, settags] = useState([]);
  const [scrolled, setScrolled] = useState(false);

  const dropdownRef = useRef(null);
  const sideNavRef = useRef(null);

  const cartCount = isLoggedIn ? addtocartdatas?.length : guestCart?.length;

  /* ── scroll shadow ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── close side nav on route change ── */
  useEffect(() => {
    setSideNavbarOpen(false);
    ssetIsOpen(false);
    setSubMenu(null);
  }, [location.pathname]);

  /* ── close dropdown on outside click ── */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        ssetIsOpen(false);
        setSubMenu(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* ── lock body scroll when side nav open ── */
  useEffect(() => {
    document.body.style.overflow = sideNavbarOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sideNavbarOpen]);

  /* ── fetch navbar categories ── */
  const fetchNavbarData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${apiUrl}/productmodel?operation=navbar`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error(`Server Error: ${res.status}`);
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error('Invalid data format');
      setcategorydata(data);
    } catch (err) {
      console.error('Navbar Fetch Error:', err.message);
      setcategorydata([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchNavbarData(); }, []);

  const distinctcat = categorydata?.map((c) => c.category) || [];

  useEffect(() => {
    if (distinctcat.length) setcatehicate(distinctcat);
  }, [categorydata]);

  const handleSubMenu = (category) => {
    setSubMenu(category === subMenu ? null : category);
    const found = categorydata?.find((c) => c.category === category);
    settags(found?.tags || []);
  };

  const closeSideNav = () => setSideNavbarOpen(false);

  if (props.pd === true) return null;

  return (
    <>
      {/* ═══════════════════════════════════════
          TOP NAVBAR
      ═══════════════════════════════════════ */}
      <nav className={`lw-navbar ${scrolled ? 'lw-navbar--scrolled' : ''}`}>

        {/* Hamburger — mobile only */}
        <button
          className="lw-hamburger"
          onClick={() => setSideNavbarOpen(true)}
          aria-label="Open menu"
        >
          <span /><span /><span />
        </button>

        {/* Logo — centre on mobile, left on desktop */}
        <NavLink to="/" className="lw-logo-link">
          <img
            src={lewkoutlogo}
            alt="lewkout"
            className="lw-logo-img"
            loading="lazy"
          />
        </NavLink>

        {/* Desktop category mega-nav */}
        <div className="lw-desktop-cats" ref={dropdownRef}>
          {distinctcat.map((cat) => (
            <div
              key={cat}
              className="lw-cat-item"
              onMouseEnter={() => handleSubMenu(cat)}
              onMouseLeave={() => { setSubMenu(null); settags([]); }}
            >
              <NavLink
                to={`/productmodel/${cat}`}
                className="lw-cat-link"
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </NavLink>

              {/* Sub-menu */}
              {subMenu === cat && tags.length > 0 && (
                <div className="lw-submenu">
                  {tags.map((t) => (
                    <NavLink
                      key={t}
                      to={`/wear/${t}`}
                      className="lw-submenu-link"
                    >
                      {t}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right action icons */}
        <div className="lw-actions">
          {/* Search */}
          <NavLink to="/searchme" className="lw-action-btn" aria-label="Search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </NavLink>

          {/* Wishlist — desktop */}
          <NavLink to="/wishlist/wish" className="lw-action-btn lw-hide-mobile" aria-label="Wishlist">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </NavLink>

          {/* Cart */}
          <NavLink to="/cart" className="lw-action-btn lw-cart-btn" aria-label="Cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && (
              <span className="lw-cart-badge">{cartCount}</span>
            )}
          </NavLink>

          {/* Account — desktop */}
          <div className="lw-account-btn lw-hide-mobile">
            <LoginButton />
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════
          SIDE DRAWER (mobile)
      ═══════════════════════════════════════ */}
      <div
        className={`lw-overlay ${sideNavbarOpen ? 'lw-overlay--visible' : ''}`}
        onClick={closeSideNav}
      />

      <aside
        ref={sideNavRef}
        className={`lw-drawer ${sideNavbarOpen ? 'lw-drawer--open' : ''}`}
      >
        {/* Drawer header */}
        <div className="lw-drawer-header">
          <img src={lewkoutlogo} alt="lewkout" className="lw-drawer-logo" />
          <button className="lw-drawer-close" onClick={closeSideNav} aria-label="Close menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer body */}
        <nav className="lw-drawer-nav" ref={dropdownRef}>

          {/* Categories accordion */}
          <div className="lw-drawer-section">
            <span className="lw-drawer-section-label">Categories</span>

            {distinctcat.map((cat) => (
              <div key={cat} className="lw-drawer-cat">
                <button
                  className="lw-drawer-cat-btn"
                  onClick={() => handleSubMenu(cat)}
                >
                  <span>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                  <svg
                    className={`lw-drawer-chevron ${subMenu === cat ? 'lw-drawer-chevron--open' : ''}`}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                {subMenu === cat && (
                  <div className="lw-drawer-subcats">
                    {tags.map((t) => (
                      <NavLink
                        key={t}
                        to={`/productmodel/${t}`}
                        className="lw-drawer-subcat-link"
                        onClick={closeSideNav}
                      >
                        {t}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick links */}
          <div className="lw-drawer-section">
            <span className="lw-drawer-section-label">Quick links</span>
            <NavLink to="/" className="lw-drawer-link" onClick={closeSideNav}>Home</NavLink>
            <NavLink to="/store/store" className="lw-drawer-link" onClick={closeSideNav}>Shop all</NavLink>
            <NavLink to="/wishlist/wish" className="lw-drawer-link" onClick={closeSideNav}>Wishlist</NavLink>
            <NavLink to="/faq" className="lw-drawer-link" onClick={closeSideNav}>Customer support</NavLink>
          </div>

          {/* Login */}
          <div className="lw-drawer-section lw-drawer-section--login">
            {/* <LoginButton /> */}
            {(userDetails || user) && userDetails?.role === 'admin' && (
              <NavLink to="/admin" className="lw-drawer-link" onClick={closeSideNav}>
                Admin panel
              </NavLink>
            )}
          </div>
        </nav>
      </aside>

      {/* ═══════════════════════════════════════
          BOTTOM NAV (mobile)
      ═══════════════════════════════════════ */}
      <nav className="lw-bottom-nav">
        <NavLink to="/" className="lw-bn-item" end>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
            <path d="M9 21V12h6v9" />
          </svg>
          <span>Home</span>
        </NavLink>

        <NavLink to="/store/store" className="lw-bn-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <span>Shop</span>
        </NavLink>

        <NavLink to="/wishlist/wish" className="lw-bn-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span>Wishlist</span>
        </NavLink>

        <div className="lw-bn-item lw-bn-account">
          <LoginButton />
          <span onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>Account</span>
        </div>
      </nav>
    </>
  );
};

export default ResponsiveNavbar;