import React, { useState, useEffect } from 'react';
import { useCart } from '../../../CartContext/CartContext';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Nav/Nav';
import './Checkout.css';
import axios from 'axios';

const BASE = import.meta.env.VITE_API_BASE_URL || "https://ecommerce-backend-bwha.onrender.com";

// US States data
const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas',
  'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas',
  'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

// Popular cities by state (simplified version)
const CITY_BY_STATE = {
  'Alabama': ['Birmingham', 'Montgomery', 'Mobile', 'Huntsville', 'Tuscaloosa'],
  'Alaska': ['Anchorage', 'Fairbanks', 'Juneau', 'Sitka', 'Wasilla'],
  'Arizona': ['Phoenix', 'Tucson', 'Mesa', 'Chandler', 'Scottsdale'],
  'Arkansas': ['Little Rock', 'Fort Smith', 'Fayetteville', 'Springdale', 'Jonesboro'],
  'California': ['Los Angeles', 'San Diego', 'San Jose', 'San Francisco', 'Oakland', 'Sacramento', 'Fresno', 'Long Beach', 'Anaheim', 'Riverside'],
  'Colorado': ['Denver', 'Colorado Springs', 'Aurora', 'Fort Collins', 'Lakewood'],
  'Connecticut': ['Bridgeport', 'New Haven', 'Hartford', 'Stamford', 'Waterbury'],
  'Delaware': ['Wilmington', 'Dover', 'Newark', 'Middletown', 'Smyrna'],
  'Florida': ['Jacksonville', 'Miami', 'Tampa', 'Orlando', 'St. Petersburg', 'Fort Lauderdale', 'Tallahassee', 'Port St. Lucie'],
  'Georgia': ['Atlanta', 'Augusta', 'Columbus', 'Savannah', 'Athens'],
  'Hawaii': ['Honolulu', 'Hilo', 'Kailua', 'Kaneohe', 'Waipahu'],
  'Idaho': ['Boise', 'Nampa', 'Meridian', 'Idaho Falls', 'Pocatello'],
  'Illinois': ['Chicago', 'Aurora', 'Rockford', 'Joliet', 'Naperville'],
  'Indiana': ['Indianapolis', 'Fort Wayne', 'Evansville', 'South Bend', 'Carmel'],
  'Iowa': ['Des Moines', 'Cedar Rapids', 'Davenport', 'Sioux City', 'Iowa City'],
  'Kansas': ['Wichita', 'Overland Park', 'Kansas City', 'Topeka', 'Olathe'],
  'Kentucky': ['Louisville', 'Lexington', 'Bowling Green', 'Owensboro', 'Covington'],
  'Louisiana': ['New Orleans', 'Baton Rouge', 'Shreveport', 'Lafayette', 'Lake Charles'],
  'Maine': ['Portland', 'Lewiston', 'Bangor', 'South Portland', 'Auburn'],
  'Maryland': ['Baltimore', 'Frederick', 'Rockville', 'Gaithersburg', 'Bowie'],
  'Massachusetts': ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge'],
  'Michigan': ['Detroit', 'Grand Rapids', 'Warren', 'Sterling Heights', 'Ann Arbor'],
  'Minnesota': ['Minneapolis', 'St. Paul', 'Rochester', 'Duluth', 'Bloomington'],
  'Mississippi': ['Jackson', 'Gulfport', 'Southaven', 'Hattiesburg', 'Biloxi'],
  'Missouri': ['Kansas City', 'St. Louis', 'Springfield', 'Columbia', 'Independence'],
  'Montana': ['Billings', 'Missoula', 'Great Falls', 'Bozeman', 'Butte'],
  'Nebraska': ['Omaha', 'Lincoln', 'Bellevue', 'Grand Island', 'Kearney'],
  'Nevada': ['Las Vegas', 'Henderson', 'Reno', 'North Las Vegas', 'Sparks'],
  'New Hampshire': ['Manchester', 'Nashua', 'Concord', 'Derry', 'Rochester'],
  'New Jersey': ['Newark', 'Jersey City', 'Paterson', 'Elizabeth', 'Edison'],
  'New Mexico': ['Albuquerque', 'Las Cruces', 'Rio Rancho', 'Santa Fe', 'Roswell'],
  'New York': ['New York City', 'Buffalo', 'Rochester', 'Albany', 'Syracuse', 'Bronx', 'Brooklyn', 'Queens'],
  'North Carolina': ['Charlotte', 'Raleigh', 'Greensboro', 'Durham', 'Winston-Salem'],
  'North Dakota': ['Fargo', 'Bismarck', 'Grand Forks', 'Minot', 'West Fargo'],
  'Ohio': ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo', 'Akron'],
  'Oklahoma': ['Oklahoma City', 'Tulsa', 'Norman', 'Broken Arrow', 'Lawton'],
  'Oregon': ['Portland', 'Eugene', 'Salem', 'Gresham', 'Hillsboro'],
  'Pennsylvania': ['Philadelphia', 'Pittsburgh', 'Allentown', 'Erie', 'Reading'],
  'Rhode Island': ['Providence', 'Warwick', 'Cranston', 'Pawtucket', 'East Providence'],
  'South Carolina': ['Charleston', 'Columbia', 'North Charleston', 'Mount Pleasant', 'Rock Hill'],
  'South Dakota': ['Sioux Falls', 'Rapid City', 'Aberdeen', 'Brookings', 'Watertown'],
  'Tennessee': ['Memphis', 'Nashville', 'Knoxville', 'Chattanooga', 'Clarksville'],
  'Texas': ['Houston', 'San Antonio', 'Dallas', 'Austin', 'Fort Worth', 'El Paso', 'Arlington', 'Corpus Christi'],
  'Utah': ['Salt Lake City', 'West Valley City', 'Provo', 'West Jordan', 'Orem'],
  'Vermont': ['Burlington', 'Essex', 'South Burlington', 'Colchester', 'Rutland'],
  'Virginia': ['Virginia Beach', 'Norfolk', 'Richmond', 'Newport News', 'Chesapeake'],
  'Washington': ['Seattle', 'Spokane', 'Tacoma', 'Vancouver', 'Bellevue'],
  'West Virginia': ['Charleston', 'Huntington', 'Parkersburg', 'Wheeling', 'Morgantown'],
  'Wisconsin': ['Milwaukee', 'Madison', 'Green Bay', 'Kenosha', 'Racine'],
  'Wyoming': ['Cheyenne', 'Casper', 'Laramie', 'Gillette', 'Rock Springs']
};

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      // If state changes, reset city
      if (name === 'state') {
        setShippingInfo(prev => ({ ...prev, city: '' }));
      }
    } else if (section === 'payment') {
      setPaymentInfo(prev => ({ ...prev, [name]: value }));
    } else if (section === 'billing') {
      setBillingInfo(prev => ({ ...prev, [name]: value }));
      // If state changes, reset city
      if (name === 'state') {
        setBillingInfo(prev => ({ ...prev, city: '' }));
      }
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
      const missingShippingFields = requiredShippingFields.filter(field => !shippingInfo[field] || String(shippingInfo[field]).trim() === '');
      
      if (missingShippingFields.length > 0) {
        setError(`Please fill in all required shipping fields: ${missingShippingFields.join(', ')}`);
        setLoading(false);
        return;
      }

      // Validate billing info if not same as shipping
      if (!billingInfo.sameAsShipping) {
        const requiredBillingFields = ['firstName', 'lastName', 'address', 'city', 'state', 'zipCode', 'country'];
        const missingBillingFields = requiredBillingFields.filter(field => !billingInfo[field] || String(billingInfo[field]).trim() === '');
        
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
        if (cardNumber.length < 13 || cardNumber.length > 19 || !/^\d+$/.test(cardNumber)) {
          setError('Please enter a valid card number (13-19 digits)');
          setLoading(false);
          return;
        }

        // Validate expiry date format (MM/YY)
        if (!/^\d{2}\/\d{2}$/.test(paymentInfo.expiryDate)) {
          setError('Please enter a valid expiry date (MM/YY)');
          setLoading(false);
          return;
        }

        // Validate CVV
        if (!/^\d{3,4}$/.test(paymentInfo.cvv)) {
          setError('Please enter a valid CVV (3-4 digits)');
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
          ...(paymentInfo.paymentMethod === 'card' && paymentInfo.cardNumber && {
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
            {/* Order Summary - shown second on mobile */}
            <div className="col-12 col-lg-4 order-2 mb-4 mb-lg-0">
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

                {/* Complete Order Button */}
                <div className="order-summary-actions">
                  <button
                    type="submit"
                    form="checkout-form"
                    className="btn btn-primary btn-lg complete-order-btn"
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
              </div>
            </div>

            {/* Checkout Form - shown first on mobile */}
            <div className="col-12 col-lg-8 order-1">
              <div className="checkout-form">
                <h2 className="mb-4">Checkout</h2>
                
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form id="checkout-form" onSubmit={handlePayment}>
                  {/* Shipping Information */}
                  <div className="checkout-form-section">
                    <div className="section-header">
                      <div className="section-icon">
                        <i className="fas fa-shipping-fast"></i>
                      </div>
                      <h4>Shipping Information</h4>
                    </div>
                    <div className="form-fields-grid">
                      <div className="field-group">
                        <label>First Name <span className="required">*</span></label>
                        <input
                          type="text"
                          name="firstName"
                          value={shippingInfo.firstName}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          required
                          className="input-field"
                        />
                      </div>
                      <div className="field-group">
                        <label>Last Name <span className="required">*</span></label>
                        <input
                          type="text"
                          name="lastName"
                          value={shippingInfo.lastName}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          required
                          className="input-field"
                        />
                      </div>
                      <div className="field-group">
                        <label>Email <span className="required">*</span></label>
                        <input
                          type="email"
                          name="email"
                          value={shippingInfo.email}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          required
                          className="input-field"
                        />
                      </div>
                      <div className="field-group">
                        <label>Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={shippingInfo.phone}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          className="input-field"
                        />
                      </div>
                      <div className="field-group full-width">
                        <label>Street Address <span className="required">*</span></label>
                        <input
                          type="text"
                          name="address"
                          value={shippingInfo.address}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          required
                          className="input-field"
                        />
                      </div>
                      <div className="field-group">
                        <label>State <span className="required">*</span></label>
                        <select
                          name="state"
                          value={shippingInfo.state}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          required
                          className="input-field"
                        >
                          <option value="">Select a state</option>
                          {US_STATES.map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                      </div>
                      <div className="field-group">
                        <label>City <span className="required">*</span></label>
                        <select
                          name="city"
                          value={shippingInfo.city}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          required
                          className="input-field"
                          disabled={!shippingInfo.state}
                        >
                          <option value="">Select a city</option>
                          {shippingInfo.state && CITY_BY_STATE[shippingInfo.state]?.map(city => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                      </div>
                      <div className="field-group">
                        <label>ZIP Code <span className="required">*</span></label>
                        <input
                          type="text"
                          name="zipCode"
                          value={shippingInfo.zipCode}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          required
                          className="input-field"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="checkout-form-section">
                    <div className="section-header">
                      <div className="section-icon">
                        <i className="fas fa-credit-card"></i>
                      </div>
                      <h4>Payment Information</h4>
                    </div>
                    <div className="form-fields-grid">
                      <div className="field-group full-width">
                        <label>Payment Method</label>
                        <select
                          name="paymentMethod"
                          value={paymentInfo.paymentMethod}
                          onChange={(e) => handleInputChange(e, 'payment')}
                          className="input-field"
                        >
                          <option value="card">Credit/Debit Card</option>
                          <option value="paypal">PayPal</option>
                          <option value="apple">Apple Pay</option>
                        </select>
                      </div>
                      
                      {paymentInfo.paymentMethod === 'card' && (
                        <>
                          <div className="field-group full-width">
                            <label>Card Number <span className="required">*</span></label>
                            <input
                              type="text"
                              name="cardNumber"
                              value={paymentInfo.cardNumber}
                              onChange={(e) => {
                                const formatted = formatCardNumber(e.target.value);
                                setPaymentInfo(prev => ({ ...prev, cardNumber: formatted }));
                              }}
                              placeholder="1234 5678 9012 3456"
                              maxLength="19"
                              required
                              className="input-field"
                            />
                          </div>
                          <div className="field-group">
                            <label>Expiry Date <span className="required">*</span></label>
                            <input
                              type="text"
                              name="expiryDate"
                              value={paymentInfo.expiryDate}
                              onChange={(e) => {
                                const formatted = formatExpiryDate(e.target.value);
                                setPaymentInfo(prev => ({ ...prev, expiryDate: formatted }));
                              }}
                              placeholder="MM/YY"
                              maxLength="5"
                              required
                              className="input-field"
                            />
                          </div>
                          <div className="field-group">
                            <label>CVV <span className="required">*</span></label>
                            <input
                              type="text"
                              name="cvv"
                              value={paymentInfo.cvv}
                              onChange={(e) => handleInputChange(e, 'payment')}
                              placeholder="123"
                              maxLength="4"
                              required
                              className="input-field"
                            />
                          </div>
                          <div className="field-group full-width">
                            <label>Cardholder Name <span className="required">*</span></label>
                            <input
                              type="text"
                              name="cardName"
                              value={paymentInfo.cardName}
                              onChange={(e) => handleInputChange(e, 'payment')}
                              required
                              className="input-field"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Billing Information */}
                  <div className="checkout-form-section">
                    <div className="section-header">
                      <div className="section-icon">
                        <i className="fas fa-receipt"></i>
                      </div>
                      <h4>Billing Information</h4>
                    </div>
                    
                    <div className="checkbox-field">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={billingInfo.sameAsShipping}
                          onChange={handleSameAsShipping}
                          className="checkbox-input"
                        />
                        <span className="checkbox-text">Same as shipping address</span>
                      </label>
                    </div>
                    
                    {!billingInfo.sameAsShipping && (
                      <div className="form-fields-grid">
                        <div className="field-group">
                          <label>First Name</label>
                          <input
                            type="text"
                            name="firstName"
                            value={billingInfo.firstName}
                            onChange={(e) => handleInputChange(e, 'billing')}
                            className="input-field"
                          />
                        </div>
                        <div className="field-group">
                          <label>Last Name</label>
                          <input
                            type="text"
                            name="lastName"
                            value={billingInfo.lastName}
                            onChange={(e) => handleInputChange(e, 'billing')}
                            className="input-field"
                          />
                        </div>
                        <div className="field-group full-width">
                          <label>Street Address</label>
                          <input
                            type="text"
                            name="address"
                            value={billingInfo.address}
                            onChange={(e) => handleInputChange(e, 'billing')}
                            className="input-field"
                          />
                        </div>
                        <div className="field-group">
                          <label>State</label>
                          <select
                            name="state"
                            value={billingInfo.state}
                            onChange={(e) => handleInputChange(e, 'billing')}
                            className="input-field"
                          >
                            <option value="">Select a state</option>
                            {US_STATES.map(state => (
                              <option key={state} value={state}>{state}</option>
                            ))}
                          </select>
                        </div>
                        <div className="field-group">
                          <label>City</label>
                          <select
                            name="city"
                            value={billingInfo.city}
                            onChange={(e) => handleInputChange(e, 'billing')}
                            className="input-field"
                            disabled={!billingInfo.state}
                          >
                            <option value="">Select a city</option>
                            {billingInfo.state && CITY_BY_STATE[billingInfo.state]?.map(city => (
                              <option key={city} value={city}>{city}</option>
                            ))}
                          </select>
                        </div>
                        <div className="field-group">
                          <label>ZIP Code</label>
                          <input
                            type="text"
                            name="zipCode"
                            value={billingInfo.zipCode}
                            onChange={(e) => handleInputChange(e, 'billing')}
                            className="input-field"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
