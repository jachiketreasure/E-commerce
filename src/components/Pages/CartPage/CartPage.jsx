import { useCart } from '../../../CartContext/CartContext';
import Navbar from '../../Nav/Nav';
import './CartPage.css';
import cartPageImage from '../../images/CartPage.avif';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();
  
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponMessage, setCouponMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calculate discount based on applied coupon
  const discount = appliedCoupon ? (subtotal * appliedCoupon.percentage) / 100 : 0;
  const totalPrice = subtotal - discount;

  // Apply coupon function
  const handleApplyCoupon = () => {
    const trimmedCode = couponCode.trim().toUpperCase();
    
    if (!trimmedCode) {
      setCouponMessage('Please enter a coupon code');
      setMessageType('error');
      setTimeout(() => setCouponMessage(''), 3000);
      return;
    }

    // Check if coupon is valid
    if (trimmedCode === 'XOFT') {
      setAppliedCoupon({
        code: 'XOFT',
        percentage: 10
      });
      setCouponMessage('Coupon applied successfully! You get 10% off');
      setMessageType('success');
      setTimeout(() => setCouponMessage(''), 5000);
    } else {
      setCouponMessage('Invalid coupon code');
      setMessageType('error');
      setAppliedCoupon(null);
      setTimeout(() => setCouponMessage(''), 3000);
    }
  };

  // Remove coupon function
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponMessage('Coupon removed');
    setMessageType('success');
    setTimeout(() => setCouponMessage(''), 3000);
  };


  return (
    <>
      <Navbar />
      <div className="cart-page">
        <div className="imageee" style={{ position: 'relative', width: '100%', height: '30vh', minHeight: '150px' }}>
          <img src={cartPageImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div
            className="hero-content"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              textShadow: '0 0 10px rgba(0,0,0,0.7)',
            }}
          >
            <h1 className='fw-bold hero-title'>Shop Cart</h1>
            <h6 className='hero-breadcrumb'><Link style={{
              textDecoration: 'none',
              color: 'white'
            }} to="/">Home</Link> &gt; Login</h6>
          </div>
        </div>

        <div className="container py-5">
          {/* <h2 className="mb-4">🛒 for my Cart</h2> */}
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (

            <div className="cart-items container py-5">
              {/* Desktop Header - hidden on mobile */}
              <div className="head-cart-page row align-items-center mb-3 fw-bold d-none d-md-flex">
                <div className="col-md-4">Product</div>
                <div className="col-md-3 text-center">Quantity</div>
                <div className="col-md-3 text-end">Price</div>
                <div className="col-md-2 text-end">Action</div>
              </div>

              {cartItems.map((item) => (
                <div className="cart-item border-bottom mb-3 pb-3" key={item.id}>
                  {/* Mobile Layout */}
                  <div className="d-md-none">
                    <div className="d-flex align-items-center mb-2">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="product-img"
                        style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                      />
                      <div className="ms-3 flex-grow-1">
                        <h6 className="mb-1 fw-bold">{item.title}</h6>
                        <p className="text-muted mb-0" style={{ fontSize: '14px' }}>${item.price.toFixed(2)}</p>
                      </div>
                      <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item.id)}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                    
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <div className="d-flex align-items-center">
                        <span className="me-3" style={{ fontSize: '14px' }}>Quantity:</span>
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => updateQuantity(item.id, -1)}>-</button>
                        <span className="px-3">{item.quantity}</span>
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => updateQuantity(item.id, 1)}>+</button>
                      </div>
                      <div>
                        <strong style={{ fontSize: '16px' }}>${(item.price * item.quantity).toFixed(2)}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="row align-items-center d-none d-md-flex">
                    <div className="col-md-4 d-flex align-items-center">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="product-img"
                        style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                      />
                      <div className="ms-3">
                        <h5 className="mb-1">{item.title}</h5>
                        <p className="text-muted mb-0" style={{ color: 'gray' }}>${item.price.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="col-md-3 text-center">
                      <div className="d-flex justify-content-center align-items-center">
                        <button className="btn btn-sm btn-outline-secondary me-1" onClick={() => updateQuantity(item.id, -1)}>-</button>
                        <span className="px-2">{item.quantity}</span>
                        <button className="btn btn-sm btn-outline-secondary ms-1" onClick={() => updateQuantity(item.id, 1)}>+</button>
                      </div>
                    </div>

                    <div className="col-md-3 text-end">
                      <strong style={{ color: 'gray' }}>${(item.price * item.quantity).toFixed(2)}</strong>
                    </div>

                    <div className="col-md-2 text-end">
                      <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item.id)}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Coupon and Update Section */}
              <div className='row my-4'>
                <div className='col-12 col-lg-6 mb-3 mb-lg-0'>
                  <div className='d-flex flex-column flex-md-row'>
                    <input 
                      type="text" 
                      placeholder='Enter coupon code' 
                      className='form-control'
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={appliedCoupon !== null}
                      style={{
                        backgroundColor: appliedCoupon ? '#e8f5e9' : 'beige',
                        borderRadius: '10px 0 0 10px',
                        border: '1px solid black',
                        flex: '1'
                      }} 
                    />
                    {appliedCoupon ? (
                      <button 
                        onClick={handleRemoveCoupon}
                        style={{
                          backgroundColor: '#f44336',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '0 10px 10px 0',
                          border: '1px solid #d32f2f',
                          borderLeft: 'none',
                          whiteSpace: 'nowrap',
                          fontWeight: '600'
                        }}
                      >
                        Remove
                      </button>
                    ) : (
                      <button 
                        onClick={handleApplyCoupon}
                        style={{
                          backgroundColor: 'beige',
                          padding: '8px 16px',
                          borderRadius: '0 10px 10px 0',
                          border: '1px solid black',
                          borderLeft: 'none',
                          whiteSpace: 'nowrap',
                          fontWeight: '600'
                        }}
                      >
                        Apply coupon
                      </button>
                    )}
                  </div>
                  {/* Coupon Message */}
                  {couponMessage && (
                    <div 
                      className='mt-2'
                      style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '500',
                        backgroundColor: messageType === 'success' ? '#e8f5e9' : '#ffebee',
                        color: messageType === 'success' ? '#2e7d32' : '#c62828',
                        border: `1px solid ${messageType === 'success' ? '#4caf50' : '#f44336'}`
                      }}
                    >
                      {messageType === 'success' ? '✓ ' : '✗ '}
                      {couponMessage}
                    </div>
                  )}
                </div>
                <div className='col-12 col-lg-6 text-lg-end'>
                  {appliedCoupon && (
                    <div 
                      className='mb-2'
                      style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        backgroundColor: '#e3f2fd',
                        border: '1px solid #2196f3',
                        display: 'inline-block',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#1565c0'
                      }}
                    >
                      <i className="fas fa-tag me-2"></i>
                      {appliedCoupon.code} - {appliedCoupon.percentage}% OFF
                    </div>
                  )}
                </div>
              </div>

              {/* Total and Checkout */}
              <div className="row mt-4">
                <div className="col-12 text-center text-lg-end">
                  <div 
                    className='mb-3 p-4'
                    style={{
                      backgroundColor: '#f8f9fa',
                      borderRadius: '12px',
                      border: '2px solid #e9ecef'
                    }}
                  >
                    <div className='d-flex justify-content-between mb-2'>
                      <span className='fs-5'>Subtotal:</span>
                      <span className='fs-5 fw-semibold'>${subtotal.toFixed(2)}</span>
                    </div>
                    {appliedCoupon && (
                      <div className='d-flex justify-content-between mb-2' style={{ color: '#28a745' }}>
                        <span className='fs-5'>
                          <i className="fas fa-tag me-2"></i>
                          Discount ({appliedCoupon.percentage}%):
                        </span>
                        <span className='fs-5 fw-semibold'>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <hr style={{ border: '1px solid #dee2e6', margin: '1rem 0' }} />
                    <div className='d-flex justify-content-between'>
                      <h4 className='fw-bold fs-2 mb-0'>Total:</h4>
                      <h5 className='fw-bold fs-2 mb-0' style={{ color: '#667eea' }}>
                        ${totalPrice.toFixed(2)}
                      </h5>
                    </div>
                    {appliedCoupon && (
                      <div className='mt-2' style={{ color: '#28a745', fontSize: '14px', fontWeight: '500' }}>
                        You saved ${discount.toFixed(2)}!
                      </div>
                    )}
                  </div>
                  <div>
                    <button 
                      className="btn btn-primary btn-lg"
                      onClick={() => navigate('/checkout')}
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                        borderRadius: '50px',
                        padding: '12px 30px',
                        fontWeight: '600',
                        boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)',
                        width: '100%',
                        maxWidth: '300px'
                      }}
                    >
                      <i className="fas fa-shopping-cart me-2"></i>
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>

          )}
        </div>
      </div>

    </>
  );
}