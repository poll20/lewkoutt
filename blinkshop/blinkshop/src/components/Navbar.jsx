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
const ResponsiveNavbar = () => {

  let {user,userDetails}=useAuth()
  let {setcatehicate}=useBio()
  const [dropdown, setDropdown] = useState(false);
  const [sideNavbarOpen, setSideNavbarOpen] = useState(false);

  // Toggle for the category dropdown
  const handleDropdownToggle = () => {
    setDropdown(!dropdown);
    
  };

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
  let data=await fetch("http://localhost:3000/productmodel?operation=all")
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
  return (
    <>
      {/* Top Navbar */}
      <nav className="navbar top-navbar">
        <div className="mobile-menu-icon" onClick={handleSideNavbarToggle}>
          <IoIosMenu  size={30} />
        </div>
        <div className="logo lato-thin" >LEWKOUT</div>
        
        <div style={{display:"flex",gap:"15%"}}>
        <NavLink to="/cart" className="hideinbigscreen"><CiShoppingCart size={30}/></NavLink>
         <NavLink to='/searchme'className='navlink'><CiSearch size={30}/></NavLink>
          </div>
        
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
      <nav className="navbar bottom-navbar">
        <ul className="nav-links">
          <div className="homeeee">
          <NavLink to="/" className="homeeee">
          <li><GoHome size={30} /></li>
          <li className='homer'>Home</li>
          
          </NavLink>
         
          </div>
          <div className='homeeee'>
          <NavLink to="/store/store" className="homeeee">
          <li><BsShop size={30} /></li>
          <li className='homer'>Shope</li>
          </NavLink>
          </div>
          
          <div className='homeeee' style={{borderRadius:"100%",backgroundColor:"pink"}}>
          <NavLink to="/rent/rent" className='homeeee'>
          <li><PiDressThin style={{color:"black",fontSize:'2em'}} size={20}/></li>
          <li className='homer' style={{color:"black"}}>Rent</li>
          </NavLink>
          </div>
          
          <div className="homeeee">
          <NavLink to="/wishlist/wish" className="homeeee">
          <li><GoHeart size={30}/></li>
          <li className='homer'>Wishlist</li>
          </NavLink>
          </div>

          <div className="homeeee">
          
          <li style={{textAlign:"center"}}><LoginButton/></li>
          <li className='homer'>account</li>
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
            <li style={{ fontFamily: "'Poppins', sans-serif" }} onClick={closeslidecategorynav}>Login</li>
            {userDetails || user?(<li style={{ fontFamily: "'Poppins', sans-serif" }}><NavLink to={`/${userDetails.role}`} >{userDetails.role}</NavLink></li>):("")}
          </ul>
        </div>
     

    

      
    </div>
      </div>

      {/* Overlay for closing the side navbar when clicked outside */}
      {sideNavbarOpen && <div className="overlay" onClick={handleSideNavbarToggle}></div>}
    </>
  );

};

export default ResponsiveNavbar;

