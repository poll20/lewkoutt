import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./DashNavbar.css";
import { NavLink } from "react-router-dom";

const DashNavbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // ❗ Default: Always open on desktop
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isUserOpen, setUserOpen] = useState(false);

  useEffect(() => {
    // ✅ Check screen size & toggle sidebar only for mobile
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false); // ❗ Hide sidebar on small screens
      } else {
        setIsSidebarOpen(true); // ❗ Always show sidebar on large screens
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // ✅ Run on mount

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="admin-ka-panel-container">
      {/* ✅ Sidebar */}
      <aside className={`admin-ka-panel-sidebar ${isSidebarOpen ? "open" : ""}`}>
        <h2 className="admin-ka-panel-title">Admin Panel</h2>
        <ul className="admin-ka-panel-menu">
          <li>
            <button
              className="admin-ka-panel-dropdown-btn"
              onClick={() => setIsInventoryOpen(!isInventoryOpen)}
            >
              Inventory<span>{isInventoryOpen ? "▲" : "▼"}</span>
            </button>
            {isInventoryOpen && (
              <ul className="admin-ka-panel-dropdown">
                <NavLink to="/admin/available-products"><li>Available Product</li></NavLink>
                <NavLink to="/admin/category"><li>Categories</li></NavLink>
                <NavLink to='/admin/lowstock'><li>Low Stock</li></NavLink>
                <NavLink to='/admin/adddata'><li>Products</li></NavLink>
                <NavLink to='/admin/outofstock' ><li>Out Of Stock</li></NavLink>
                <NavLink to='/admin/newarrival' ><li>New Arrival</li></NavLink>
              </ul>
            )}
           
          </li>
        </ul>



        <ul className="admin-ka-panel-menu">
          <li>
            <button
              className="admin-ka-panel-dropdown-btn"
              onClick={() => setUserOpen(!isUserOpen)}
            >
              User Insight<span>{isUserOpen ? "▲" : "▼"}</span>
            </button>
            {isUserOpen && (
              <ul className="admin-ka-panel-dropdown">
                <NavLink to="/admin/registeruser"><li>Register User</li></NavLink>
                <NavLink to="/admin/activeuser"><li>Active User</li></NavLink>
                <NavLink to="/admin/userorder"><li>Orders</li></NavLink>
               
              </ul>
            )}
           
          </li>
        </ul>
        
      </aside>
      

      {/* ✅ Toggle Button (Only for Mobile) */}
      <button
        className="admin-ka-panel-menu-btn"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>
    </div>
  );
};

export default DashNavbar;
