import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import "./Nav.css";
import { useState, useEffect } from "react";
import { useCart } from '../../CartContext/CartContext';
import logo from '../images/logo.svg';

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const { cartItems } = useCart();  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); 
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
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav fw-bold d-flex justify-content-center gap-3 align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home ✦</Link>
            </li>
            
            
            {isAuthenticated && (
              <>
                <li className="nav-item dropdown custom-dropdown">
                  <Link className="nav-link" role="button">
                    Shop ✦
                  </Link>
                  <ul className="dropdown-menu custom-dropdown-menu ">
                    <li><Link className="dropdown-item" to="/AllProducts">All</Link></li>
                    <li><Link className="dropdown-item" to="/MensProducts">Men's Clothing</Link></li>
                    <li><Link className="dropdown-item" to="/WomensProducts">Women's Clothing</Link></li>
                    <li><Link className="dropdown-item" to="/terms">Accessories</Link></li>
                    <li><Link className="dropdown-item" to="/terms"><img src={logo} alt="" /></Link></li>
                  </ul>
                </li>
              </>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/blog">Blog ✦</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/layout">PostLayout ✦</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/port">Portfolio ✦</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pages">Pages ✦</Link>
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
              <span className="user-welcome">Welcome, {user?.firstName || 'User'}!</span>
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
