import { useEffect, useState } from 'react';
import {
    fetchAllProducts,
    fetchMenProducts,
    fetchWomenProducts,
    fetchWomenShoesProducts
} from '../../../api/products';
import { useAuth } from "../../../context/AuthContext";
import Navbar from '../../Nav/Nav';
import UpNav from '../../UpNav/UpNav';
import { Link } from 'react-router-dom';
import { useCart } from '../../../CartContext/CartContext';
import CommentModal from '../../CommentModal/CommentModal';
import './Home.css';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const [productsAll, setProductsAll] = useState([]);
  const [productsMen, setProductsMen] = useState([]);
  const [productsWomen, setProductsWomen] = useState([]);
  const [productsShoesWomen, setProductsShoesWomen] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [selectedProductForComment, setSelectedProductForComment] = useState(null);

  // WhatsApp Support Handler
  const handleWhatsAppSupport = () => {
    const phoneNumber = "+2349135663829";
    const message = "Hello! I need support with my order.";
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\+/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const cardColors = [
      'linear-gradient(135deg, #FAD6A5, #FFB6B9)',
      'linear-gradient(135deg, #A0CED9, #C8E4DC)',
      'linear-gradient(135deg, #C9BBCF, #FFE0AC)',
      'linear-gradient(135deg, #D4A5A5, #E5E5E5)',
      'linear-gradient(135deg, #F9844A, #FFB6B9)',
      'linear-gradient(135deg, #E2F0CB, #B3CBB9)',
  ];

  const randomColor = cardColors[Math.floor(Math.random() * cardColors.length)];

  const toggleLike = (id) => {
      setLikedProducts(prev =>
          prev.includes(id)
              ? prev.filter(pid => pid !== id)
              : [...prev, id]
      );
  };

  const handleCommentClick = (product) => {
      setSelectedProductForComment(product);
      setIsCommentModalOpen(true);
  };

  const handleCloseCommentModal = () => {
      setIsCommentModalOpen(false);
      setSelectedProductForComment(null);
  };

  // Fetch all products
  useEffect(() => {
      if (isAuthenticated) {
          fetchAllProducts().then(data => setProductsAll(data));
      }
  }, [isAuthenticated]);

  // Fetch men's products
  useEffect(() => {
      if (isAuthenticated) {
          fetchMenProducts().then(data => setProductsMen(data));
      }
  }, [isAuthenticated]);

  // Fetch women's clothing
  useEffect(() => {
      if (isAuthenticated) {
          fetchWomenProducts().then(data => setProductsWomen(data));
      }
  }, [isAuthenticated]);

  // Fetch women's shoes products 
  useEffect(() => {
      if (isAuthenticated) {
          fetchWomenShoesProducts().then(data => setProductsShoesWomen(data));
      }
  }, [isAuthenticated]);

  return (
    <>
      <UpNav />
      <Navbar />
      
      {!isAuthenticated ? (
        <div className="advanced-landing-page">
          {/* Hero Section with Animated Background */}
          <section className="hero-section">
            <div className="hero-background">
              <div className="hero-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
                <div className="shape shape-4"></div>
              </div>
            </div>
            
            <div className="hero-content-wrapper">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-6 col-md-12 mb-5 mb-lg-0">
                    <div className="hero-text">
                      <div className="hero-badge">
                        <i className="fas fa-sparkles me-2"></i>
                        <span>Premium Fashion Store</span>
                      </div>
                      <h1 className="hero-main-title">
                        Discover Your
                        <span className="gradient-text"> Perfect Style</span>
                      </h1>
                      <p className="hero-description">
                        Unlock access to exclusive collections, limited editions, and personalized shopping experiences. 
                        Join thousands of fashion enthusiasts worldwide.
                      </p>
                      
                      <div className="hero-cta-buttons">
                        <Link to="/Login" className="cta-btn cta-primary">
                          <span>Sign In</span>
                          <i className="fas fa-arrow-right ms-2"></i>
                        </Link>
                        <Link to="/Register" className="cta-btn cta-secondary">
                          <span>Create Account</span>
                          <i className="fas fa-user-plus ms-2"></i>
                        </Link>
                      </div>
                      
                      <div className="hero-stats">
                        <div className="stat-item">
                          <div className="stat-number">10K+</div>
                          <div className="stat-label">Happy Customers</div>
                        </div>
                        <div className="stat-item">
                          <div className="stat-number">500+</div>
                          <div className="stat-label">Premium Products</div>
                        </div>
                        <div className="stat-item">
                          <div className="stat-number">4.9</div>
                          <div className="stat-label">
                            <i className="fas fa-star text-warning"></i> Rating
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-lg-6 col-md-12">
                    <div className="hero-image-container">
                      <div className="floating-card card-1">
                        <i className="fas fa-shipping-fast"></i>
                        <span>Free Shipping</span>
                      </div>
                      <div className="floating-card card-2">
                        <i className="fas fa-shield-check"></i>
                        <span>Secure Payment</span>
                      </div>
                      <div className="floating-card card-3">
                        <i className="fas fa-percent"></i>
                        <span>Great Deals</span>
                      </div>
                      <div className="hero-image-main">
                        <div className="image-placeholder">
                          <i className="fas fa-shopping-bag"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="features-section">
            <div className="container">
              <div className="section-header text-center mb-5">
                <h2 className="section-title">Why Choose Us</h2>
                <p className="section-subtitle">Experience the best in online fashion shopping</p>
              </div>
              
              <div className="row g-4">
                <div className="col-lg-3 col-md-6 col-12">
                  <div className="feature-card">
                    <div className="feature-icon">
                      <i className="fas fa-truck-fast"></i>
                    </div>
                    <h4 className="feature-title">Fast Delivery</h4>
                    <p className="feature-text">Free shipping on orders over $50. Get your items delivered in 2-3 days.</p>
                  </div>
                </div>
                
                <div className="col-lg-3 col-md-6 col-12">
                  <div className="feature-card">
                    <div className="feature-icon">
                      <i className="fas fa-lock"></i>
                    </div>
                    <h4 className="feature-title">Secure Shopping</h4>
                    <p className="feature-text">Your data is encrypted and protected with industry-standard security.</p>
                  </div>
                </div>
                
                <div className="col-lg-3 col-md-6 col-12">
                  <div className="feature-card">
                    <div className="feature-icon">
                      <i className="fas fa-undo"></i>
                    </div>
                    <h4 className="feature-title">Easy Returns</h4>
                    <p className="feature-text">30-day hassle-free returns. Shop with confidence and peace of mind.</p>
                  </div>
                </div>
                
                <div className="col-lg-3 col-md-6 col-12">
                  <div className="feature-card">
                    <div className="feature-icon">
                      <i className="fas fa-headset"></i>
                    </div>
                    <h4 className="feature-title">24/7 Support</h4>
                    <p className="feature-text">Our customer service team is always here to help you anytime.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Categories Preview Section */}
          <section className="categories-section">
            <div className="container">
              <div className="section-header text-center mb-5">
                <h2 className="section-title">Explore Our Collections</h2>
                <p className="section-subtitle">Discover trending styles and exclusive items</p>
              </div>
              
              <div className="row g-4">
                <div className="col-lg-4 col-md-6 col-12">
                  <div className="category-card">
                    <div className="category-image">
                      <div className="category-overlay">
                        <h3 className="category-name">Men's Collection</h3>
                        <p className="category-desc">Premium quality clothing</p>
                        <div className="category-cta">
                          <i className="fas fa-arrow-right"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-lg-4 col-md-6 col-12">
                  <div className="category-card">
                    <div className="category-image category-women">
                      <div className="category-overlay">
                        <h3 className="category-name">Women's Collection</h3>
                        <p className="category-desc">Latest fashion trends</p>
                        <div className="category-cta">
                          <i className="fas fa-arrow-right"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-lg-4 col-md-6 col-12">
                  <div className="category-card">
                    <div className="category-image category-accessories">
                      <div className="category-overlay">
                        <h3 className="category-name">Accessories</h3>
                        <p className="category-desc">Complete your look</p>
                        <div className="category-cta">
                          <i className="fas fa-arrow-right"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="testimonials-section">
            <div className="container">
              <div className="section-header text-center mb-5">
                <h2 className="section-title">What Our Customers Say</h2>
                <p className="section-subtitle">Join thousands of satisfied shoppers</p>
              </div>
              
              <div className="row g-4">
                <div className="col-lg-4 col-md-6 col-12">
                  <div className="testimonial-card">
                    <div className="testimonial-rating">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                    <p className="testimonial-text">
                      "Amazing quality and fast delivery! The shopping experience was smooth and the products exceeded my expectations."
                    </p>
                    <div className="testimonial-author">
                      <div className="author-avatar">
                        <i className="fas fa-user"></i>
                      </div>
                      <div className="author-info">
                        <h5 className="author-name">Sarah Johnson</h5>
                        <p className="author-role">Verified Buyer</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-lg-4 col-md-6 col-12">
                  <div className="testimonial-card">
                    <div className="testimonial-rating">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                    <p className="testimonial-text">
                      "Best online shopping experience! Great customer service and the quality of products is outstanding."
                    </p>
                    <div className="testimonial-author">
                      <div className="author-avatar">
                        <i className="fas fa-user"></i>
                      </div>
                      <div className="author-info">
                        <h5 className="author-name">Michael Chen</h5>
                        <p className="author-role">Regular Customer</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-lg-4 col-md-6 col-12">
                  <div className="testimonial-card">
                    <div className="testimonial-rating">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                    <p className="testimonial-text">
                      "Love the variety and quality! The website is easy to navigate and checkout process is seamless."
                    </p>
                    <div className="testimonial-author">
                      <div className="author-avatar">
                        <i className="fas fa-user"></i>
                      </div>
                      <div className="author-info">
                        <h5 className="author-name">Emma Williams</h5>
                        <p className="author-role">Fashion Enthusiast</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="cta-section">
            <div className="container">
              <div className="cta-content text-center">
                <h2 className="cta-title">Ready to Start Shopping?</h2>
                <p className="cta-subtitle">Join our community and get exclusive access to amazing deals</p>
                <div className="cta-buttons">
                  <Link to="/Register" className="cta-btn cta-large">
                    <span>Get Started Free</span>
                    <i className="fas fa-arrow-right ms-2"></i>
                  </Link>
                </div>
                <p className="cta-note">
                  <i className="fas fa-check-circle me-2"></i>
                  No credit card required
                </p>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <>
          {/* WhatsApp Floating Button */}
          <div className="floating1-button" onClick={handleWhatsAppSupport} style={{ cursor: 'pointer' }}>
            <span className="icon"><i className="fa-brands fa-whatsapp"></i></span>
            <span className="label">SUPPORT</span>
          </div>

          {/* Hero Section for Authenticated Users */}
          <div className="home-hero-section">
            <div className="home-hero-overlay">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-10 col-md-12 col-12">
                    <div className="home-hero-content text-center">
                      <div className="home-hero-badge">
                        <i className="fas fa-star me-2"></i>
                        Premium Quality
                      </div>
                      <h1 className="home-hero-title">Discover Your Style</h1>
                      <p className="home-hero-subtitle">
                        Explore our curated collection of premium fashion and accessories. 
                        Find the perfect items that match your unique style.
                      </p>
                      <div className="home-features-grid">
                        <div className="home-feature">
                          <div className="home-feature-icon">
                            <i className="fas fa-shipping-fast"></i>
                          </div>
                          <h5>Free Shipping</h5>
                          <p>On orders over $50</p>
                        </div>
                        <div className="home-feature">
                          <div className="home-feature-icon">
                            <i className="fas fa-shield-alt"></i>
                          </div>
                          <h5>Secure Payment</h5>
                          <p>100% protected</p>
                        </div>
                        <div className="home-feature">
                          <div className="home-feature-icon">
                            <i className="fas fa-undo"></i>
                          </div>
                          <h5>Easy Returns</h5>
                          <p>30-day policy</p>
                        </div>
                        <div className="home-feature">
                          <div className="home-feature-icon">
                            <i className="fas fa-headset"></i>
                          </div>
                          <h5>24/7 Support</h5>
                          <p>Always here to help</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="container py-4">
            {/* Men's Products */}
            <div className="row">
            <h2 className="fw-bold m-0 text-center">Men's Collection</h2>
            <p className="text-muted m-0 text-center mb-3">Stylish and modern outfits for men</p>
            {productsMen.map((item, index) => (
              <div key={item.id} className="p-2 col-12 col-sm-6 col-md-4 col-lg-3 position-relative">
                <p className='offer'>GET 20% OFF</p>
                <i
                  className={`heart fas fa-heart ${likedProducts.includes(item.id) ? 'text-danger' : ''}`}
                  onClick={() => toggleLike(item.id)}
                ></i>

                <div
                  className="card"
                  style={{
                    background: cardColors[index % cardColors.length],
                    borderRadius: '10px'
                  }}
                >
                  <img
                    src={item.thumbnail}
                    className="card-img-top"
                    alt={item.title}
                    style={{ height: '250px', objectFit: 'cover', borderRadius: '10px 10px 0 0' }}
                  />
                  <div className="card-body">
                    <div className='d-flex justify-content-between'>
                      <h5 className="card-title fw-bold" style={{ width: '70%', minHeight: '50px' }}>{item.title}</h5>
                      <p className='fw-bold' style={{ width: '21%', margin: '1%' }}>
                        ${item.price}
                      </p>
                    </div>
                    <button className="buy-btn" onClick={() => setSelectedProduct(item)}>View Item</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Women's Clothing */}
          <div className="row">
            <h2 className='fw-bold m-0 text-center mt-5'>Women's Collection</h2>
            <p className="text-muted m-0 text-center mb-3">Stylish and modern outfits for women</p>
            {productsWomen.map((item, index) => (
              <div key={item.id} className="p-2 col-12 col-sm-6 col-md-4 col-lg-3 position-relative">
                <p className='offer'>GET 20% OFF</p>
                <i
                  className={`heart fas fa-heart ${likedProducts.includes(item.id) ? 'text-danger' : ''}`}
                  onClick={() => toggleLike(item.id)}
                ></i>

                <div
                  className="card"
                  style={{
                    background: cardColors[index % cardColors.length],
                    borderRadius: '10px'
                  }}
                >
                  <img
                    src={item.thumbnail}
                    className="card-img-top"
                    alt={item.title}
                    style={{ height: '250px', objectFit: 'cover', borderRadius: '10px 10px 0 0' }}
                  />
                  <div className="card-body">
                    <div className='d-flex justify-content-between'>
                      <h5 className="card-title fw-bold" style={{ width: '70%', minHeight: '50px' }}>{item.title}</h5>
                      <p className='fw-bold' style={{ width: '21%', margin: '1%' }}>
                        ${item.price}
                      </p>
                    </div>
                    <button className="buy-btn" onClick={() => setSelectedProduct(item)}>View Item</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Women's Shoes */}
          <div className="row">
            <h2 className='fw-bold m-0 text-center mt-5'>Women's Shoes</h2>
            <p className="text-muted m-0 text-center mb-3">Step in style with our footwear collection</p>
            {productsShoesWomen.map((item, index) => (
              <div key={item.id} className="p-2 col-12 col-sm-6 col-md-4 col-lg-3 position-relative">
                <p className='offer'>GET 20% OFF</p>
                <i
                  className={`heart fas fa-heart ${likedProducts.includes(item.id) ? 'text-danger' : ''}`}
                  onClick={() => toggleLike(item.id)}
                ></i>

                <div
                  className="card"
                  style={{
                    background: cardColors[index % cardColors.length],
                    borderRadius: '10px'
                  }}
                >
                  <img
                    src={item.thumbnail}
                    className="card-img-top"
                    alt={item.title}
                    style={{ height: '250px', objectFit: 'cover', borderRadius: '10px 10px 0 0' }}
                  />
                  <div className="card-body">
                    <div className='d-flex justify-content-between'>
                      <h5 className="card-title fw-bold" style={{ width: '70%', minHeight: '50px' }}>{item.title}</h5>
                      <p className='fw-bold' style={{ width: '21%', margin: '1%' }}>
                        ${item.price}
                      </p>
                    </div>
                    <button className="buy-btn" onClick={() => setSelectedProduct(item)}>View Item</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* All Products */}
          <div className="row">
            <h2 className='fw-bold m-0 text-center mt-5'>All Products</h2>
            <p className="text-muted m-0 text-center mb-3">Browse our complete collection</p>
            {productsAll.map((item, index) => (
              <div key={item.id} className="p-2 col-12 col-sm-6 col-md-4 col-lg-3 position-relative">
                <p className='offer'>GET 20% OFF</p>
                <i
                  className={`heart fas fa-heart ${likedProducts.includes(item.id) ? 'text-danger' : ''}`}
                  onClick={() => toggleLike(item.id)}
                ></i>

                <div
                  className="card"
                  style={{
                    background: cardColors[index % cardColors.length],
                    borderRadius: '10px'
                  }}
                >
                  <img
                    src={item.thumbnail}
                    className="card-img-top"
                    alt={item.title}
                    style={{ height: '250px', objectFit: 'cover', borderRadius: '10px 10px 0 0' }}
                  />
                  <div className="card-body">
                    <div className='d-flex justify-content-between'>
                      <h5 className="card-title fw-bold" style={{ width: '70%', minHeight: '50px' }}>{item.title}</h5>
                      <p className='fw-bold' style={{ width: '21%', margin: '1%' }}>
                        ${item.price}
                      </p>
                    </div>
                    <button className="buy-btn" onClick={() => setSelectedProduct(item)}>View Item</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal */}
          {selectedProduct && (
            <>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setSelectedProduct(null)}
              />
              <div className="modal-backdrop fade show"></div>
              <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-modal="true" role="dialog">
                <div className="modall">
                  <div className="image-modall d-flex justify-content-between position-relative"
                    style={{ 
                      backgroundColor: 'white', 
                      width: '90%', 
                      maxWidth: '800px', 
                      height: 'auto', 
                      borderRadius: '20px',
                      flexDirection: window.innerWidth < 768 ? 'column' : 'row'
                    }}>

                    <div className='image-product me-md-5' style={{
                      background: randomColor,
                      borderRadius: window.innerWidth < 768 ? '20px 20px 0 0' : '20px 0 0 20px',
                      width: window.innerWidth < 768 ? '100%' : '50%'
                    }}>
                      <img src={selectedProduct.thumbnail} alt="" style={{ width: '100%', height: 'auto' }} />
                    </div>

                    <div className="content-modall w-100 w-md-50 m-auto p-3">
                      <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={() => setSelectedProduct(null)}
                      />
                      <p className='px-2 py-1 my-2 text-light fw-bold'
                        style={{ backgroundColor: 'black', borderRadius: '20px', fontSize: '12px', width: 'fit-content' }}>
                        SALE 20% OFF
                      </p>
                      <h3 className='fw-bold'>{selectedProduct.title}</h3>
                      <p className='fw-medium' style={{ fontSize: '13px' }}>
                        Rating: <i className="fa-solid fa-star"></i> {selectedProduct.rating}
                      </p>
                      <p style={{ fontSize: '14px' }}>{selectedProduct.description}</p>
                      <p style={{ fontSize: '20px' }}>
                        <strong>Price:</strong> ${selectedProduct.price}
                      </p>
                      <button
                        className="m-1 px-2 py-1 btn-1-modall"
                        type="button"
                        onClick={() => {
                          addToCart(selectedProduct);
                          setSelectedProduct(null);
                        }}
                        style={{ backgroundColor: 'black', color: 'white', borderRadius: '10px', fontSize: '15px' }}
                      >
                        ADD TO CART
                      </button>
                      <button
                        className="m-1 px-2 py-1 btn-comment-modall"
                        type="button"
                        onClick={() => handleCommentClick(selectedProduct)}
                        style={{ backgroundColor: '#667eea', color: 'white', borderRadius: '10px', fontSize: '15px' }}
                      >
                        <i className="fas fa-comments"></i> Comments
                      </button>
                      <button
                        onClick={() => { setSelectedProduct(null); }}
                        className="m-1 px-2 py-1 btn-2-modall"
                        type="button"
                        style={{ backgroundColor: 'white', color: 'black', borderRadius: '10px', fontSize: '15px' }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Comment Modal */}
          <CommentModal
            isOpen={isCommentModalOpen}
            onClose={handleCloseCommentModal}
            productId={selectedProductForComment?.id}
            productTitle={selectedProductForComment?.title}
          />
          </div>
        </>
      )}
    </>
  );
}
