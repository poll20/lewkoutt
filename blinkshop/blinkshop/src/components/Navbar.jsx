import React, { useState,useRef,useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { CiShoppingCart, CiHome, CiLogin} from "react-icons/ci";
import { PiDressThin } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import { IoIosMenu } from "react-icons/io";
import { PiStorefrontThin } from "react-icons/pi";
import './Navbar.css'; // CSS for professional styling
import SearchBar from './SearchBar';
import { CiHeart } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import LoginButton from './Login';
import dress from "./image/dress.png"
import { GoHeart } from "react-icons/go";
import { FaRegUser } from "react-icons/fa6"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GoHome } from "react-icons/go";
import { BsShop } from "react-icons/bs";
import { useBio } from './BioContext';
// import { set } from 'mongoose';
import { useAuth } from './AuthContext';
import { useFirebaseAuth } from './FirebaseContext';
import VibeSticker from './VibeSticker';
import LewkoutLogo from './LewkoutLogo';
import lewkoutlogo from "../components/image/lewklogo.png"
const ResponsiveNavbar = (props) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  // let {user,userDetails}=useAuth()
  let {user,userDetails}=useFirebaseAuth()
  let {setcatehicate,addtocartdatas}=useBio()
  const [dropdown, setDropdown] = useState(false);
  const [sideNavbarOpen, setSideNavbarOpen] = useState(false);
const navigate=useNavigate()
  // Toggle for the category dropdown
  const handleDropdownToggle = () => {
    setDropdown(!dropdown);
    
  };
  if(addtocartdatas){
    console.log("plzaaaaaaaaaaaa aajaaaaaaa",addtocartdatas.length)
  }

  // Toggle for the sliding navbar on mobile
  const handleSideNavbarToggle = () => {
    setSideNavbarOpen(!sideNavbarOpen);
  };
  const [isOpen, setIsOpen] = useState(false);

  // Function to open and close popup
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const [issOpen, ssetIsOpen] = useState(false);
  const [subMenu, setSubMenu] = useState(null);
  let [categorydata,setcategorydata]=useState([])
  const dropdownRef = useRef(null);
  const [tags,settags]=useState([])
  const toggleDropdown = () => {
    ssetIsOpen(!issOpen);
    
  };

  const handleSubMenu = (category) => {
    console.log("toto",category)
    setSubMenu(category === subMenu ? null : category);
    
    // let taging=categorydata.filter((tags)=>{
    //   return tags.category===category 
    // })

    let taging=categorydata.filter((e)=>(e.category==category))
    console.log("taging",taging)
      let alltags=taging.map((e)=>{
        return e.productdetails
      }).flat()
      console.log("altag",alltags)
      let finaltag=alltags.map((e)=>(e.tag))
      let distincttag=[...new Set(finaltag)]
      settags(distincttag)
    
  };
  console.log("momk",tags)

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        ssetIsOpen(false);
        setSubMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


let datafetch=async()=>{
  let data=await fetch(`${apiUrl}/productmodel?operation=all`)
  let finaldata=await data.json()
  console.log("kookoaio",finaldata)
 setcategorydata(finaldata)
  
}  
useEffect(()=>{
  datafetch()
},[])

let categoryy=categorydata.map((cat)=>{
  return cat.category 
})

let distinctcat=[...new Set(categoryy)]
console.log(distinctcat)
useEffect(()=>{
  if(distinctcat){
    setcatehicate(distinctcat)
  }
},[categorydata])


let closeslidecategorynav=()=>{
  setSideNavbarOpen(!sideNavbarOpen)
}
console.log("navbar m props.pdd value",props.pd)
  return (
    <div style={{visibility:props.pd==true?("hidden"):('')}}>
      {/* Top Navbar */}
      <nav className="navbar top-navbar" >
        <div className="mobile-menu-icon" onClick={handleSideNavbarToggle}>
          <IoIosMenu  size={30} />
        </div>
        <div className="logo lato-thin" ><img style={{width:"150px"}}  src={lewkoutlogo} loading="lazy"></img></div>
        
        <div style={{display:"flex",gap:"15%"}}>
        <NavLink to="/cart" className={`hideinbigscreen navlink ${addtocartdatas.length>0?('position-relative'):('')}`}>
        <svg xmlns="http://www.w3.org/2000/svg" style={{width:"27px",height:"27px"}} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>

        {
          addtocartdatas.length>0?( <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {addtocartdatas.length>0?(addtocartdatas.length):('')}
            <span class="visually-hidden">unread messages</span>
          </span>):('')
       
}
  </NavLink>
<NavLink to='/searchme'className='navlink'><svg style={{width:"27px",height:"27px"}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
</NavLink>
          </div>

{/* <button type="button" class="btn btn-primary position-relative">
  Inbox
  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    99+
    <span class="visually-hidden">unread messages</span>
  </span>
</button>       */}
       <ul className="nav-links">
          <li><NavLink to="/"><CiHome size={30} /></NavLink></li>
          <li><NavLink to="/cart"><CiShoppingCart size={30} /></NavLink></li>
          <li><NavLink to="/wishlist" className='navlink'><CiHeart size={30}/></NavLink></li>
          {/* <li><LoginButton/></li> */}
          
           
      {/* Category Dropdown */}
      <nav className="mere-top-navbar">
      <div className="mere-top-dropdown" >
        <div className="mere-top-dropdown-btn">
          Category
        </div>
        <div className="mere-top-category-row" >
        {
           distinctcat.map((cat,id)=>{
            return(
              <div className="mere-top-category-item">
              <button className="mere-top-category-link" onMouseEnter={()=>{handleSubMenu(cat)}}>{cat}</button>

              <div className="mere-top-subcategory-column">
    {tags.map((t,id)=>{
      return(
        <NavLink to={`/wear/${t}`}><button className="mere-top-subcategory-link">{t}</button></NavLink>
      )
    })}
               
              </div>


             </div>
            )
           })
          
        }
        </div>
      </div>
    </nav>
           <li><LoginButton/></li> 
           {/* <li><NavLink to="/createaccount">Sign up</NavLink></li>  */}
        </ul>
      </nav>

      {/* Bottom Navbar for mobile screens */}
      
      <nav className="navbar bottom-navbar" style={{border:"1px solid red",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <ul className="nav-links">
          <div>
          <NavLink to="/" className="homeeee">
          <li><svg style={{width:"30px",height:"30px"}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>
</li>
          <li >Home</li>
          
          </NavLink>
         
          </div>
          <div>
          <NavLink to="/store/store" className="homeeee">
          <li><svg style={{width:"30px",height:"30px"}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
</svg>
</li>
          <li >Shop</li>
          </NavLink>
          </div>
          
          <div  style={{borderRadius:"100%",backgroundColor:"pink"}}>
          <NavLink to="/rent/rent" className='homeeee'>
          <li><PiDressThin style={{color:"black"}} size={20}/></li>
          <li  style={{color:"black"}}>Rent</li>
          </NavLink>
          </div>
          
          <div >
          <NavLink to="/wishlist/wish" className="homeeee">
          {/* <li><GoHeart size={30}/></li> */}
          <li><svg style={{width:"30px",height:"30px"}}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>
    </li>
          <li >Wishlist</li>
          </NavLink>
          </div>

          <div >
          
          <li><LoginButton/>
          <span onClick={() => {navigate("/profile"); // Click andar na jaye
          }}
          
      style={{ cursor: "default" }}
    >
      Account
    </span></li>
          {/* <li className='homer'>account</li> */}
          </div>
        </ul>
       
      </nav>
      
        
      {/* Sliding Side Navbar */}
      <div className={`side-navbar ${sideNavbarOpen ? 'open' : ''}`} >
        
      <div className="menu-container" ref={dropdownRef} >
      <div>
          <ul className='catlist' >
           <NavLink to={`/productmodel/newarrivals`} onClick={closeslidecategorynav} className='navlink'> <li style={{ fontFamily: "'Poppins', sans-serif" }}>New Arrival</li></NavLink>
           <NavLink to={`/bestsalling/bestsale`} onClick={closeslidecategorynav} className='navlink'><li style={{ fontFamily: "'Poppins', sans-serif" }}>Best Selling</li></NavLink>
            <li style={{ fontFamily: "'Poppins', sans-serif" }}>
             <span onClick={toggleDropdown}>CATEGORIES</span>
               {/* Dropdown Menu */}
      <div className={`dropdown ${issOpen ? "slide-down" : "slide-up"}`}>
        <ul className="categories" style={{borderBottom:"1px solid black"}}>
          {distinctcat.map((category,id) => (
            <li key={id} className="category-item" style={{borderBottom:"1px solid white"}}>
              
             <span onClick={() => handleSubMenu(category)}>{category}</span>
              
              {/* Subcategories */}
              <ul
                className={`subcategories ${
                  subMenu === category ? "slide-down" : "slide-up"
                }`}
              >
                {tags.map((subCategory,id) => (
                  <li key={id} className="subcategory-item"  style={{backgroundColor:"white",textAlign:"start"}}>
                    <NavLink to={`/productmodel/${subCategory}`} onClick={closeslidecategorynav}>{subCategory}</NavLink>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
            </li>
            <NavLink className="navlink" to={'/faq'} onClick={closeslidecategorynav}>
            <li style={{ fontFamily: "'Poppins', sans-serif" }}>Customer Support</li>
            </NavLink>
            <NavLink to='/loginn'>
            <li style={{ fontFamily: "'Poppins', sans-serif" }} onClick={closeslidecategorynav}>Login</li>
            </NavLink>
            {/* <NavLink to='/mood'>
            <li style={{ fontFamily: "'Poppins', sans-serif" }} >Mood</li>
            </NavLink> */}
            {userDetails || user?(<li style={{ fontFamily: "'Poppins', sans-serif" }}><NavLink to={`/${userDetails.role}`} >{userDetails.role}</NavLink></li>):("")}
          </ul>
        </div>
     

    

      
    </div>
      </div>

      {/* Overlay for closing the side navbar when clicked outside */}
      {sideNavbarOpen && <div className="overlay" onClick={handleSideNavbarToggle}></div>}
    </div>
  );

};

export default ResponsiveNavbar;

