
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaBox, FaUsers, FaComments, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const DashNavbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isUserOpen, setUserOpen] = useState(false);
  const [isMoodOpen, setMoodOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const styles = {
    container: {
      position: 'relative',
      zIndex: 1000,
    },
    sidebar: {
      position: 'fixed',
      top: 0,
      left: isSidebarOpen ? '0' : '-280px',
      width: '280px',
      height: '100vh',
      background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      boxShadow: '4px 0 20px rgba(0, 0, 0, 0.15)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      overflowY: 'auto',
      overflowX: 'hidden',
      zIndex: 1001,
      borderRight: '1px solid rgba(255, 255, 255, 0.1)',
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
      opacity: isMobile && isSidebarOpen ? 1 : 0,
      visibility: isMobile && isSidebarOpen ? 'visible' : 'hidden',
      transition: 'all 0.3s ease',
    },
    header: {
      padding: '24px 20px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      background: 'rgba(255, 255, 255, 0.05)',
    },
    title: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#ffffff',
      margin: 0,
      textAlign: 'center',
      letterSpacing: '0.5px',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    },
    menuSection: {
      padding: '16px 0',
    },
    dropdownButton: {
      width: '100%',
      padding: '16px 20px',
      backgroundColor: 'transparent',
      border: 'none',
      color: '#e2e8f0',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      transition: 'all 0.2s ease',
      borderRadius: '0',
      position: 'relative',
      overflow: 'hidden',
    },
    dropdownButtonHover: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: '#ffffff',
      transform: 'translateX(4px)',
    },
    dropdownIcon: {
      fontSize: '14px',
      transition: 'transform 0.2s ease',
    },
    sectionIcon: {
      marginRight: '12px',
      fontSize: '18px',
      color: '#60a5fa',
    },
    dropdown: {
      maxHeight: '0',
      overflow: 'hidden',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    dropdownOpen: {
      maxHeight: '500px',
      paddingBottom: '8px',
    },
    dropdownList: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },
    navLink: {
      display: 'block',
      padding: '12px 20px 12px 52px',
      color: '#cbd5e1',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: '400',
      transition: 'all 0.2s ease',
      borderLeft: '3px solid transparent',
      position: 'relative',
    },
    navLinkHover: {
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      color: '#ffffff',
      borderLeftColor: '#3b82f6',
      paddingLeft: '56px',
    },
    navLinkActive: {
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      color: '#60a5fa',
      borderLeftColor: '#3b82f6',
      fontWeight: '500',
    },
    menuButton: {
      position: 'fixed',
      top: '20px',
      left: isSidebarOpen ? '300px' : '20px',
      width: '50px',
      height: '50px',
      backgroundColor: '#3b82f6',
      border: 'none',
      borderRadius: '12px',
      color: 'white',
      fontSize: '20px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: 1002,
      transform: isSidebarOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    },
    menuButtonHover: {
      backgroundColor: '#2563eb',
      transform: 'scale(1.05)',
      boxShadow: '0 6px 16px rgba(59, 130, 246, 0.4)',
    },
  };

  const NavLinkStyled = ({ to, children, ...props }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <NavLink
        to={to}
        style={({ isActive }) => ({
          ...styles.navLink,
          ...(isHovered ? styles.navLinkHover : {}),
          ...(isActive ? styles.navLinkActive : {}),
        })}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => isMobile && setIsSidebarOpen(false)}
        {...props}
      >
        {children}
      </NavLink>
    );
  };

  const DropdownButton = ({ children, isOpen, onClick, icon }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <button
        style={{
          ...styles.dropdownButton,
          ...(isHovered ? styles.dropdownButtonHover : {}),
        }}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={styles.sectionIcon}>{icon}</span>
          {children}
        </div>
        <span style={{
          ...styles.dropdownIcon,
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        }}>
          <FaChevronDown />
        </span>
      </button>
    );
  };

  const MenuButton = () => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <button
        style={{
          ...styles.menuButton,
          ...(isHovered ? styles.menuButtonHover : {}),
        }}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>
    );
  };

  return (
    <div style={styles.container}>
      {/* Overlay for mobile */}
      <div 
        style={styles.overlay}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.header}>
          <h2 style={styles.title}>Admin Panel</h2>
        </div>

        {/* Inventory Section */}
        <div style={styles.menuSection}>
          <DropdownButton
            isOpen={isInventoryOpen}
            onClick={() => setIsInventoryOpen(!isInventoryOpen)}
            icon={<FaBox />}
          >
            Inventory
          </DropdownButton>
          <div style={{
            ...styles.dropdown,
            ...(isInventoryOpen ? styles.dropdownOpen : {}),
          }}>
            <ul style={styles.dropdownList}>
              <li><NavLinkStyled to="/admin/available-products">Available Products</NavLinkStyled></li>
              <li><NavLinkStyled to="/admin/category">Categories</NavLinkStyled></li>
              <li><NavLinkStyled to="/admin/lowstock">Low Stock</NavLinkStyled></li>
              <li><NavLinkStyled to="/admin/adddata">Add Products</NavLinkStyled></li>
              <li><NavLinkStyled to="/admin/outofstock">Out Of Stock</NavLinkStyled></li>
              <li><NavLinkStyled to="/admin/newarrival">New Arrivals</NavLinkStyled></li>
            </ul>
          </div>
        </div>

        {/* User Insight Section */}
        <div style={styles.menuSection}>
          <DropdownButton
            isOpen={isUserOpen}
            onClick={() => setUserOpen(!isUserOpen)}
            icon={<FaUsers />}
          >
            User Insights
          </DropdownButton>
          <div style={{
            ...styles.dropdown,
            ...(isUserOpen ? styles.dropdownOpen : {}),
          }}>
            <ul style={styles.dropdownList}>
              <li><NavLinkStyled to="/admin/registeruser">Registered Users</NavLinkStyled></li>
              <li><NavLinkStyled to="/admin/activeuser">Active Users</NavLinkStyled></li>
              <li><NavLinkStyled to="/admin/userorder">Orders</NavLinkStyled></li>
              <li><NavLinkStyled to="/admin/returnmyorder">Return Orders</NavLinkStyled></li>
            </ul>
          </div>
        </div>

        {/* Mood Message Section */}
        <div style={styles.menuSection}>
          <DropdownButton
            isOpen={isMoodOpen}
            onClick={() => setMoodOpen(!isMoodOpen)}
            icon={<FaComments />}
          >
            Marketing Tools
          </DropdownButton>
          <div style={{
            ...styles.dropdown,
            ...(isMoodOpen ? styles.dropdownOpen : {}),
          }}>
            <ul style={styles.dropdownList}>
              <li><NavLinkStyled to="/admin/moodmsg">Mood Messages</NavLinkStyled></li>
              <li><NavLinkStyled to="/admin/moodmngr">Mood Manager</NavLinkStyled></li>
              <li><NavLinkStyled to="/admin/coupon">Coupons</NavLinkStyled></li>
              <li><NavLinkStyled to="/admin/bandle">Bundles</NavLinkStyled></li>
              <li><NavLinkStyled to="/admin/slots">Slot Control</NavLinkStyled></li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Menu Toggle Button */}
      <MenuButton />
    </div>
  );
};

export default DashNavbar;