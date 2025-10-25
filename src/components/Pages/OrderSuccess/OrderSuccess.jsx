import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../Nav/Nav';
import './OrderSuccess.css';
import axios from 'axios';

const BASE = import.meta.env.VITE_API_BASE_URL || "https://ecommerce-backend-bwha.onrender.com";

export default function OrderSuccess() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`${BASE}/api/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.status === 200) {
        setOrder(response.data);
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      setError('Unable to fetch order details');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="order-success">
          <div className="container py-5 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading order details...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="order-success">
          <div className="container py-5 text-center">
            <div className="error-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h2>Error</h2>
            <p>{error}</p>
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

  return (
    <>
      <Navbar />
      <div className="order-success">
        <div className="container py-5">
          <div className="success-header text-center mb-5">
            <div className="success-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h1>Order Confirmed!</h1>
            <p className="lead">Thank you for your purchase. Your order has been successfully placed.</p>
          </div>

          <div className="row">
            <div className="col-lg-8">
              <div className="order-details">
                <h3 className="mb-4">
                  <i className="fas fa-receipt me-2"></i>
                  Order Details
                </h3>
                
                {order && (
                  <>
                    <div className="order-info">
                      <div className="info-row">
                        <span className="label">Order ID:</span>
                        <span className="value">{order._id}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Order Date:</span>
                        <span className="value">{formatDate(order.createdAt)}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Status:</span>
                        <span className={`status status-${order.status}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <div className="info-row">
                        <span className="label">Payment Method:</span>
                        <span className="value">
                          {order.paymentInfo.method === 'card' ? 'Credit/Debit Card' : 
                           order.paymentInfo.method === 'paypal' ? 'PayPal' : 
                           order.paymentInfo.method === 'apple' ? 'Apple Pay' : 
                           order.paymentInfo.method}
                        </span>
                      </div>
                    </div>

                    <div className="shipping-info mt-4">
                      <h4>
                        <i className="fas fa-shipping-fast me-2"></i>
                        Shipping Information
                      </h4>
                      <div className="address-card">
                        <p><strong>{order.shippingInfo.fullName}</strong></p>
                        <p>{order.shippingInfo.address}</p>
                        <p>{order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zipCode}</p>
                        <p>{order.shippingInfo.country}</p>
                        {order.shippingInfo.phone && <p>Phone: {order.shippingInfo.phone}</p>}
                        <p>Email: {order.shippingInfo.email}</p>
                      </div>
                    </div>

                    <div className="order-items mt-4">
                      <h4>
                        <i className="fas fa-shopping-bag me-2"></i>
                        Items Ordered
                      </h4>
                      <div className="items-list">
                        {order.items.map((item, index) => (
                          <div key={index} className="order-item">
                            <div className="item-image">
                              <img src={item.image} alt={item.productName} />
                            </div>
                            <div className="item-details">
                              <h6>{item.productName}</h6>
                              <p>Quantity: {item.quantity}</p>
                              <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="col-lg-4">
              <div className="order-summary">
                <h4 className="mb-4">Order Summary</h4>
                
                {order && (
                  <>
                    <div className="summary-totals">
                      <div className="total-row">
                        <span>Subtotal:</span>
                        <span>${order.pricing.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="total-row">
                        <span>Shipping:</span>
                        <span>{order.pricing.shipping === 0 ? 'FREE' : `$${order.pricing.shipping.toFixed(2)}`}</span>
                      </div>
                      <div className="total-row">
                        <span>Tax:</span>
                        <span>${order.pricing.tax.toFixed(2)}</span>
                      </div>
                      <div className="total-row total-final">
                        <span>Total:</span>
                        <span>${order.pricing.total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="next-steps">
                      <h5>What's Next?</h5>
                      <div className="steps-list">
                        <div className="step">
                          <i className="fas fa-envelope"></i>
                          <span>Confirmation email sent</span>
                        </div>
                        <div className="step">
                          <i className="fas fa-box"></i>
                          <span>Order being prepared</span>
                        </div>
                        <div className="step">
                          <i className="fas fa-truck"></i>
                          <span>Shipped within 2-3 business days</span>
                        </div>
                        <div className="step">
                          <i className="fas fa-home"></i>
                          <span>Delivered to your address</span>
                        </div>
                      </div>
                    </div>

                    <div className="action-buttons">
                      <button 
                        className="btn btn-primary w-100 mb-2"
                        onClick={() => navigate('/shop')}
                      >
                        <i className="fas fa-shopping-bag me-2"></i>
                        Continue Shopping
                      </button>
                      <button 
                        className="btn btn-outline-primary w-100"
                        onClick={() => window.print()}
                      >
                        <i className="fas fa-print me-2"></i>
                        Print Receipt
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
