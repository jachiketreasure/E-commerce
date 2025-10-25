import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import "./Nav.css";
import { useState, useEffect } from "react";
import { useCart } from '../../CartContext/CartContext';
import logo from '../images/logo.svg';

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItems } = useCart();  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); 
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 110); 
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg py-3 navbar-slide ${isSticky ? "sticky-navbar show-navbar" : ""}`}>
      <div className="container Nav">

        <button
          className="navbar-toggler"
          type="button"
          onClick={handleMobileMenuToggle}
          aria-controls="navbarNavDropdown"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`} id="navbarNavDropdown">
          {/* Close button */}
          <button 
            className="mobile-menu-close-btn"
            onClick={handleCloseMobileMenu}
            aria-label="Close menu"
          >
            ✕
          </button>
          
          <ul className="navbar-nav fw-bold d-flex justify-content-center gap-3 align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={handleCloseMobileMenu}>Home ✦</Link>
            </li>
            
            
            {isAuthenticated && (
              <>
                <li className="nav-item dropdown custom-dropdown">
                  <Link className="nav-link" role="button">
                    Shop ✦
                  </Link>
                  <ul className="dropdown-menu custom-dropdown-menu ">
                    <li><Link className="dropdown-item" to="/AllProducts" onClick={handleCloseMobileMenu}>All</Link></li>
                    <li><Link className="dropdown-item" to="/MensProducts" onClick={handleCloseMobileMenu}>Men's Clothing</Link></li>
                    <li><Link className="dropdown-item" to="/WomensProducts" onClick={handleCloseMobileMenu}>Women's Clothing</Link></li>
                    <li><Link className="dropdown-item" to="/terms" onClick={handleCloseMobileMenu}>Accessories</Link></li>
                    <li><Link className="dropdown-item" to="/terms" onClick={handleCloseMobileMenu}><img src={logo} alt="" /></Link></li>
                  </ul>
                </li>
              </>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/blog" onClick={handleCloseMobileMenu}>Blog ✦</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/layout" onClick={handleCloseMobileMenu}>PostLayout ✦</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://jachiketreasure.github.io/Treasure-Jachike-Portfolio/" target="_blank" rel="noopener noreferrer" onClick={handleCloseMobileMenu}>Portfolio ✦</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Shop" onClick={handleCloseMobileMenu}>Pages ✦</Link>
            </li>
          </ul>
        </div>

        
        <div className="login-register ms-5 mx-5" style={{ color: 'black' }}>
          {!isAuthenticated ? (
            <>
             <Link className="login-link mx-1" to="/Login">Login</Link>
             <Link className="register-link mx-1" to="/Register">Register</Link>
            </>
          ) : (
            <div className="d-flex align-items-center gap-2">
              <div className="user-welcome-container">
                <span className="user-welcome">
                  <i className="fas fa-user-circle me-2"></i>
                  Welcome, {user?.firstName || 'User'}!
                </span>
              </div>
              <button className="logout-link mx-1" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>

        <div className="iconss fs-5 d-flex gap-3">
          {isAuthenticated && <i className="fa-solid fa-magnifying-glass"></i>}
          {isAuthenticated && <i className="fa-regular fa-heart"></i>}
      {isAuthenticated && (
        <div className="position-relative">
          <i
            className="fas fa-cart-shopping"
            onClick={() => navigate('/cart')}
            style={{ cursor: 'pointer' }}
          />
        {cartItems.length > 0 && (
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            style={{ fontSize: '10px' }}
          >
            {cartItems.length}
          </span>
        )}
      </div>
    )}
  </div>

      </div>
    </nav>
  );
}
