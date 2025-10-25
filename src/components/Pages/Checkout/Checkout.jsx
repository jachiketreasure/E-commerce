import React, { useState } from 'react';
import { useCart } from '../../../CartContext/CartContext';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Nav/Nav';
import './Checkout.css';
import axios from 'axios';

const BASE = import.meta.env.VITE_API_BASE_URL || "https://ecommerce-backend-bwha.onrender.com";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    paymentMethod: 'card'
  });

  const [billingInfo, setBillingInfo] = useState({
    sameAsShipping: true,
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    if (section === 'shipping') {
      setShippingInfo(prev => ({ ...prev, [name]: value }));
    } else if (section === 'payment') {
      setPaymentInfo(prev => ({ ...prev, [name]: value }));
    } else if (section === 'billing') {
      setBillingInfo(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSameAsShipping = (e) => {
    const isChecked = e.target.checked;
    setBillingInfo(prev => ({ ...prev, sameAsShipping: isChecked }));
    if (isChecked) {
      setBillingInfo(prev => ({
        ...prev,
        firstName: shippingInfo.firstName,
        lastName: shippingInfo.lastName,
        address: shippingInfo.address,
        city: shippingInfo.city,
        state: shippingInfo.state,
        zipCode: shippingInfo.zipCode,
        country: shippingInfo.country
      }));
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate required fields
      const requiredShippingFields = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zipCode', 'country'];
      const missingShippingFields = requiredShippingFields.filter(field => !shippingInfo[field] || shippingInfo[field].trim() === '');
      
      if (missingShippingFields.length > 0) {
        setError(`Please fill in all required shipping fields: ${missingShippingFields.join(', ')}`);
        setLoading(false);
        return;
      }

      // Validate billing info if not same as shipping
      if (!billingInfo.sameAsShipping) {
        const requiredBillingFields = ['firstName', 'lastName', 'address', 'city', 'state', 'zipCode', 'country'];
        const missingBillingFields = requiredBillingFields.filter(field => !billingInfo[field] || billingInfo[field].trim() === '');
        
        if (missingBillingFields.length > 0) {
          setError(`Please fill in all required billing fields: ${missingBillingFields.join(', ')}`);
          setLoading(false);
          return;
        }
      }

      // Validate payment method
      if (!paymentInfo.paymentMethod) {
        setError('Please select a payment method');
        setLoading(false);
        return;
      }

      if (paymentInfo.paymentMethod === 'card') {
        const cardFields = ['cardNumber', 'expiryDate', 'cvv', 'cardName'];
        const missingCardFields = cardFields.filter(field => !paymentInfo[field] || paymentInfo[field].trim() === '');
        
        if (missingCardFields.length > 0) {
          setError(`Please fill in all payment fields: ${missingCardFields.join(', ')}`);
          setLoading(false);
          return;
        }

        // Validate card number format (basic validation)
        const cardNumber = paymentInfo.cardNumber.replace(/\s/g, '');
        if (cardNumber.length < 13 || cardNumber.length > 19) {
          setError('Please enter a valid card number');
          setLoading(false);
          return;
        }

        // Validate CVV
        if (paymentInfo.cvv.length < 3 || paymentInfo.cvv.length > 4) {
          setError('Please enter a valid CVV');
          setLoading(false);
          return;
        }
      }

      // Create order data
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.id,
          productName: item.title,
          price: item.price,
          quantity: item.quantity,
          image: item.thumbnail
        })),
        shippingInfo: {
          ...shippingInfo,
          fullName: `${shippingInfo.firstName} ${shippingInfo.lastName}`
        },
        billingInfo: billingInfo.sameAsShipping ? {
          firstName: shippingInfo.firstName,
          lastName: shippingInfo.lastName,
          fullName: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
          address: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          zipCode: shippingInfo.zipCode,
          country: shippingInfo.country
        } : {
          firstName: billingInfo.firstName,
          lastName: billingInfo.lastName,
          fullName: `${billingInfo.firstName} ${billingInfo.lastName}`,
          address: billingInfo.address,
          city: billingInfo.city,
          state: billingInfo.state,
          zipCode: billingInfo.zipCode,
          country: billingInfo.country
        },
        paymentInfo: {
          method: paymentInfo.paymentMethod,
          ...(paymentInfo.paymentMethod === 'card' && {
            cardNumber: paymentInfo.cardNumber.replace(/\s/g, ''),
            expiryDate: paymentInfo.expiryDate,
            cvv: paymentInfo.cvv,
            cardName: paymentInfo.cardName
          })
        },
        pricing: {
          subtotal,
          shipping,
          tax,
          total
        },
        status: 'pending'
      };

      console.log('Creating order:', orderData);
      console.log('Shipping info:', shippingInfo);
      console.log('Billing info:', billingInfo);
      console.log('Payment info:', paymentInfo);
      console.log('Cart items:', cartItems);
      
      // Validate order data before sending
      if (!orderData.items || orderData.items.length === 0) {
        setError('No items in cart. Please add items before checking out.');
        setLoading(false);
        return;
      }
      
      if (!orderData.shippingInfo.fullName || !orderData.billingInfo.fullName) {
        setError('Missing required shipping or billing information.');
        setLoading(false);
        return;
      }

      // For demo purposes, we'll simulate a successful payment
      // In a real app, you'd integrate with Stripe, PayPal, etc.
      const response = await axios.post(`${BASE}/api/orders`, orderData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        setOrderId(response.data.orderId);
        setOrderSuccess(true);
        clearCart();
        
        // Redirect to success page after 3 seconds
        setTimeout(() => {
          navigate(`/order-success/${response.data.orderId}`);
        }, 3000);
      }

    } catch (error) {
      console.error('Payment error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Error headers:', error.response?.headers);
      console.error('Request URL:', error.config?.url);
      console.error('Request method:', error.config?.method);
      console.error('Request data:', error.config?.data);
      
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.data?.error) {
        setError(`Order creation failed: ${error.response.data.error}`);
      } else if (error.response?.status === 401) {
        setError('Authentication failed. Please log in again.');
      } else if (error.response?.status === 400) {
        setError('Invalid order data. Please check your information.');
      } else if (error.response?.status === 422) {
        setError('Validation error. Please check all required fields.');
      } else if (error.response?.status === 500) {
        setError('Server error. Please try again later or contact support.');
      } else if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
        setError('Unable to connect to server. Please check your internet connection.');
      } else if (error.message.includes('timeout')) {
        setError('Request timeout. Please try again.');
      } else {
        setError(`Order creation failed: ${error.message || 'Unknown error occurred'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && !orderSuccess) {
    return (
      <>
        <Navbar />
        <div className="checkout-empty">
          <div className="container py-5 text-center">
            <h2>Your cart is empty</h2>
            <p>Add some items to your cart before proceeding to checkout.</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/shop')}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </>
    );
  }

  if (orderSuccess) {
    return (
      <>
        <Navbar />
        <div className="order-success">
          <div className="container py-5 text-center">
            <div className="success-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h2>Order Placed Successfully!</h2>
            <p>Your order ID is: <strong>{orderId}</strong></p>
            <p>You will receive a confirmation email shortly.</p>
            <p>Redirecting to order details...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="checkout-page">
        <div className="container py-4">
          <div className="row">
            <div className="col-lg-8">
              <div className="checkout-form">
                <h2 className="mb-4">Checkout</h2>
                
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handlePayment}>
                  {/* Shipping Information */}
                  <div className="form-section">
                    <h4 className="section-title">
                      <i className="fas fa-shipping-fast me-2"></i>
                      Shipping Information
                    </h4>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">First Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="firstName"
                          value={shippingInfo.firstName}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Last Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="lastName"
                          value={shippingInfo.lastName}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Email *</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={shippingInfo.email}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Phone</label>
                        <input
                          type="tel"
                          className="form-control"
                          name="phone"
                          value={shippingInfo.phone}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Address *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={shippingInfo.address}
                        onChange={(e) => handleInputChange(e, 'shipping')}
                        required
                      />
                    </div>
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label className="form-label">City *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="city"
                          value={shippingInfo.city}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          required
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">State *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="state"
                          value={shippingInfo.state}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          required
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">ZIP Code *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="zipCode"
                          value={shippingInfo.zipCode}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="form-section">
                    <h4 className="section-title">
                      <i className="fas fa-credit-card me-2"></i>
                      Payment Information
                    </h4>
                    <div className="mb-3">
                      <label className="form-label">Payment Method</label>
                      <select
                        className="form-control"
                        name="paymentMethod"
                        value={paymentInfo.paymentMethod}
                        onChange={(e) => handleInputChange(e, 'payment')}
                      >
                        <option value="card">Credit/Debit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="apple">Apple Pay</option>
                      </select>
                    </div>
                    
                    {paymentInfo.paymentMethod === 'card' && (
                      <>
                        <div className="mb-3">
                          <label className="form-label">Card Number *</label>
                          <input
                            type="text"
                            className="form-control"
                            name="cardNumber"
                            value={paymentInfo.cardNumber}
                            onChange={(e) => {
                              const formatted = formatCardNumber(e.target.value);
                              setPaymentInfo(prev => ({ ...prev, cardNumber: formatted }));
                            }}
                            placeholder="1234 5678 9012 3456"
                            maxLength="19"
                            required
                          />
                        </div>
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label className="form-label">Expiry Date *</label>
                            <input
                              type="text"
                              className="form-control"
                              name="expiryDate"
                              value={paymentInfo.expiryDate}
                              onChange={(e) => {
                                const formatted = formatExpiryDate(e.target.value);
                                setPaymentInfo(prev => ({ ...prev, expiryDate: formatted }));
                              }}
                              placeholder="MM/YY"
                              maxLength="5"
                              required
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label className="form-label">CVV *</label>
                            <input
                              type="text"
                              className="form-control"
                              name="cvv"
                              value={paymentInfo.cvv}
                              onChange={(e) => handleInputChange(e, 'payment')}
                              placeholder="123"
                              maxLength="4"
                              required
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Cardholder Name *</label>
                          <input
                            type="text"
                            className="form-control"
                            name="cardName"
                            value={paymentInfo.cardName}
                            onChange={(e) => handleInputChange(e, 'payment')}
                            required
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {/* Billing Information */}
                  <div className="form-section">
                    <h4 className="section-title">
                      <i className="fas fa-receipt me-2"></i>
                      Billing Information
                    </h4>
                    <div className="mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={billingInfo.sameAsShipping}
                          onChange={handleSameAsShipping}
                        />
                        <label className="form-check-label">
                          Same as shipping address
                        </label>
                      </div>
                    </div>
                    
                    {!billingInfo.sameAsShipping && (
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            value={billingInfo.firstName}
                            onChange={(e) => handleInputChange(e, 'billing')}
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            value={billingInfo.lastName}
                            onChange={(e) => handleInputChange(e, 'billing')}
                          />
                        </div>
                        <div className="col-12 mb-3">
                          <label className="form-label">Address</label>
                          <input
                            type="text"
                            className="form-control"
                            name="address"
                            value={billingInfo.address}
                            onChange={(e) => handleInputChange(e, 'billing')}
                          />
                        </div>
                        <div className="col-md-4 mb-3">
                          <label className="form-label">City</label>
                          <input
                            type="text"
                            className="form-control"
                            name="city"
                            value={billingInfo.city}
                            onChange={(e) => handleInputChange(e, 'billing')}
                          />
                        </div>
                        <div className="col-md-4 mb-3">
                          <label className="form-label">State</label>
                          <input
                            type="text"
                            className="form-control"
                            name="state"
                            value={billingInfo.state}
                            onChange={(e) => handleInputChange(e, 'billing')}
                          />
                        </div>
                        <div className="col-md-4 mb-3">
                          <label className="form-label">ZIP Code</label>
                          <input
                            type="text"
                            className="form-control"
                            name="zipCode"
                            value={billingInfo.zipCode}
                            onChange={(e) => handleInputChange(e, 'billing')}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="form-actions">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <i className="fas fa-spinner fa-spin me-2"></i>
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-lock me-2"></i>
                          Complete Order - ${total.toFixed(2)}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="col-lg-4">
              <div className="order-summary">
                <h4 className="mb-4">Order Summary</h4>
                
                <div className="order-items">
                  {cartItems.map((item) => (
                    <div key={item.id} className="order-item">
                      <div className="item-image">
                        <img src={item.thumbnail} alt={item.title} />
                      </div>
                      <div className="item-details">
                        <h6>{item.title}</h6>
                        <p>Qty: {item.quantity}</p>
                        <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-totals">
                  <div className="total-row">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="total-row">
                    <span>Shipping:</span>
                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="total-row">
                    <span>Tax:</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="total-row total-final">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {shipping > 0 && (
                  <div className="shipping-note">
                    <i className="fas fa-info-circle me-2"></i>
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
