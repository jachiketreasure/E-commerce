import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Nav/Nav';
import Footer from '../../Footer/Footer';
import axios from 'axios';
import './OrderHistory.css';

const BASE = import.meta.env.VITE_API_BASE_URL || "https://ecommerce-backend-bwha.onrender.com";

export default function OrderHistory() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('OrderHistory component mounted. isAuthenticated:', isAuthenticated, 'User:', user);

    if (!isAuthenticated) {
      console.log('User not authenticated, redirecting to login.');
      navigate('/login');
      return;
    }

    const fetchOrderHistory = async () => {
      console.log('Fetching order history...');
      try {
        const token = localStorage.getItem('token');
        console.log('Token from localStorage:', token);
        if (!token) {
          setError('Authentication token not found.');
          setLoading(false);
          navigate('/login');
          return;
        }

        const apiUrl = `${BASE}/api/orders/user`;
        console.log('API URL for fetching orders:', apiUrl);

        const response = await axios.get(apiUrl, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log('API Response for orders:', response);

        if (response.status === 200) {
          setOrders(response.data);
          console.log('Orders set to state:', response.data);
        } else {
          setError(response.data.message || 'Failed to fetch order history.');
          console.error('Error response status not 200:', response);
        }
      } catch (err) {
        console.error('Error fetching order history:', err);
        if (err.response?.status === 401) {
          setError('Session expired. Please log in again.');
          navigate('/login');
        } else {
          setError('An error occurred while fetching order history.');
        }
      } finally {
        setLoading(false);
        console.log('Finished fetching order history. Loading state:', false);
      }
    };

    fetchOrderHistory();
  }, [isAuthenticated, navigate, user]); // Added user to dependency array to re-run if user changes

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
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
      <div className="order-history-page-wrapper">
        <Navbar />
        <div className="order-history-container p-4 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading order history...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-history-page-wrapper">
        <Navbar />
        <div className="order-history-container p-4 text-center">
          <div className="error-icon text-danger mb-3" style={{ fontSize: '3rem' }}>
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <h2>Error</h2>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={() => navigate('/shop')}>Continue Shopping</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="order-history-page-wrapper">
      <Navbar />
      <div className="order-history-container p-4">
        <h1 className="text-center mb-5">Your Order History</h1>
        
        {orders.length === 0 ? (
          <div className="text-center p-5">
            <p className="lead">You haven't placed any orders yet.</p>
            <button className="btn btn-primary" onClick={() => navigate('/shop')}>Start Shopping</button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order._id} className="order-card mb-4">
                <div className="order-header d-flex justify-content-between align-items-center mb-3">
                  <h5>Order ID: {order._id}</h5>
                  <span className={`status status-${order.status}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <div className="order-meta mb-3">
                  <p>Order Date: {formatDate(order.createdAt)}</p>
                  <p>Total: ${order.pricing.total.toFixed(2)}</p>
                </div>
                <div className="order-items">
                  <h6>Items:</h6>
                  <ul className="list-group list-group-flush">
                    {order.items.map((item) => (
                      <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                          {item.productName} (x{item.quantity})
                        </div>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
