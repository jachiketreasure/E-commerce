import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import "./Nav.css";
import { useState, useEffect } from "react";
import { useCart } from '../../CartContext/CartContext';
import SearchModal from '../SearchModal/SearchModal';
import logo from '../images/logo.svg';

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartItems, clearCart } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearCart();
    logout();
    
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
    
    if (isSearchModalOpen) {
      setIsSearchModalOpen(false);
    }
    
    navigate("/", { replace: true });
    
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleOpenSearch = () => {
    setIsSearchModalOpen(true);
  };

  const handleCloseSearch = () => {
    setIsSearchModalOpen(false);
    setSearchQuery('');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 110); 
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
    <nav className={`navbar navbar-expand-lg py-3 navbar-slide ${isSticky ? "sticky-navbar show-navbar" : ""}`}>
      <div className="container Nav d-flex justify-content-between align-items-center">

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
                <li className="nav-item">
                  <Link className="nav-link" to="/order-history" onClick={handleCloseMobileMenu}>Order History ✦</Link>
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
            
            {!isAuthenticated && (
              <>
                <li className="nav-item mobile-login-register">
                  <Link className="nav-link mobile-login-btn" to="/Login" onClick={handleCloseMobileMenu}>Login</Link>
                </li>
                <li className="nav-item mobile-login-register">
                  <Link className="nav-link mobile-register-btn" to="/Register" onClick={handleCloseMobileMenu}>Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="iconss fs-5 d-flex gap-3 align-items-center">
          {isAuthenticated && (
            <>
              <i 
                className="fa-solid fa-magnifying-glass" 
                onClick={handleOpenSearch}
                style={{ cursor: 'pointer' }}
                title="Search products"
              ></i>
              <i className="fa-regular fa-heart"></i>
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
              <div className="d-flex align-items-center gap-2">
                {user && (
                  <span className="user-welcome">
                    <i className="fas fa-user"></i>
                    {user.name || user.email}
                  </span>
                )}
                <button onClick={handleLogout} className="logout-link">
                  Logout
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </nav>
    
    {isSearchModalOpen && (
      <SearchModal 
        isOpen={isSearchModalOpen} 
        onClose={handleCloseSearch}
        searchQuery={searchQuery}
      />
    )}
  </>
  );
}
