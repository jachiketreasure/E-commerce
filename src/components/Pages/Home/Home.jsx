import AutoSwiper from '../../../components/Slider';
import Cart from '../../Cart/Cart';
import Category from '../../Category/Category';
import HeroSection from '../../HeroSection/Hero';
import { useAuth } from "../../../context/AuthContext";
import Navbar from '../../Nav/Nav';
import UpNav from '../../UpNav/UpNav';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <UpNav />
      <Navbar />
      
      {!isAuthenticated ? (
        <div className="welcome-page">
          {/* Hero Background */}
          <div className="welcome-hero">
            <div className="welcome-overlay">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-8 col-md-10 col-12">
                    <div className="welcome-content text-center">
                      {/* Main Welcome Card */}
                      <div className="welcome-card">
                        <div className="welcome-icon">
                          <i className="fas fa-shopping-bag"></i>
                        </div>
                        <h1 className="welcome-title">Welcome Back!</h1>
                        <p className="welcome-subtitle">
                          Please log in to explore our exclusive collections and shop your favorite items.
                        </p>
                        
                        {/* Action Buttons */}
                        <div className="welcome-actions">
                          <Link to="/Login" className="btn btn-primary welcome-btn">
                            <i className="fas fa-sign-in-alt me-2"></i>
                            Log In
                          </Link>
                          <Link to="/Register" className="btn btn-outline-light welcome-btn">
                            <i className="fas fa-user-plus me-2"></i>
                            Create Account
                          </Link>
                        </div>
                      </div>
                      
                      {/* Features Section */}
                      <div className="welcome-features">
                        <div className="row">
                          <div className="col-md-4 col-12 mb-4">
                            <div className="feature-item">
                              <i className="fas fa-shipping-fast"></i>
                              <h5>Fast Shipping</h5>
                              <p>Free delivery on orders over $50</p>
                            </div>
                          </div>
                          <div className="col-md-4 col-12 mb-4">
                            <div className="feature-item">
                              <i className="fas fa-shield-alt"></i>
                              <h5>Secure Shopping</h5>
                              <p>Your data is protected and secure</p>
                            </div>
                          </div>
                          <div className="col-md-4 col-12 mb-4">
                            <div className="feature-item">
                              <i className="fas fa-heart"></i>
                              <h5>Quality Products</h5>
                              <p>Curated selection of premium items</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <HeroSection />
          <Category />
          <Cart />
          <AutoSwiper />
        </>
      )}
    </>
  );
}
