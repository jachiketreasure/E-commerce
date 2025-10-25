import { useState } from "react";
import './Login.css';
import loginpng from '../../images/login.png';
import { Link, useNavigate } from "react-router-dom";
import Navbar from '../../Nav/Nav';
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";
import ForgotPasswordModal from '../../ForgotPasswordModal/ForgotPasswordModal';

const BASE = import.meta.env.VITE_API_BASE_URL || "https://ecommerce-backend-bwha.onrender.com";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();

    const handleWhatsAppSupport = () => {
        const phoneNumber = "+2349135663829";
        const message = "Hello! I need support with my login/account.";
        const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\+/g, '')}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleForgotPasswordClick = (e) => {
        e.preventDefault();
        setIsForgotPasswordOpen(true);
    };

    const handleCloseForgotPassword = () => {
        setIsForgotPasswordOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            // Basic validation
            if (!email || !password) {
                setError('Please fill in all fields');
                return;
            }

            console.log('Attempting login to:', `${BASE}/api/auth/login`);
            const response = await axios.post(`${BASE}/api/auth/login`, { email, password });

            if (response.status === 200) {
                auth.login(response.data.token, response.data.user);
                navigate("/");
            }
        } catch (error) {
            console.error('Login error:', error);
            console.log("Full error object:", error);
            
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else if (error.response && error.response.status === 401) {
                setError("Invalid email or password. Please try again.");
            } else if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
                setError('Unable to connect to server. Please check your internet connection and try again.');
            } else if (error.message.includes('CORS')) {
                setError('Server configuration error. Please contact support.');
            } else {
                setError('An error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <Navbar />

            <div className="Login">
                {/* Floating buttons - hidden on mobile */}
                <div className="floating1-button d-none d-md-block" onClick={handleWhatsAppSupport} style={{ cursor: 'pointer' }}>
                    <span className="icon"><i className="fa-brands fa-whatsapp"></i></span>
                    <span className="label">SUPPORT</span>
                </div>
                <div className="floating2-button d-none d-md-block">
                    <span className="icon"><i className="fa-solid fa-headphones"></i></span>
                    <span className="label">BUY NOW</span>
                </div>

                {/* Mobile support button */}
                <div className="mobile-support-btn d-md-none" onClick={handleWhatsAppSupport}>
                    <i className="fa-brands fa-whatsapp"></i>
                </div>

                <div className="login-container">
                    {/* Image section - hidden on mobile */}
                    <div className="image-section d-none d-lg-block">
                        <div className="imagee">
                            <div className='text-image'>
                                <h1 className='fw-bold mb-3'>Login</h1>
                            </div>
                            <img 
                                src={loginpng} 
                                alt="Login illustration" 
                                className="login-image"
                            />
                        </div>
                    </div>

                    {/* Form section */}
                    <div className="form-section">
                        <div className="formm">
                            <div className="head">
                                <h2 className='fw-bold'>Login</h2>
                                <p style={{ color: 'gray' }}>Welcome, Please login to your account</p>
                            </div>

                            {error && (
                                <div className="alert alert-danger" role="alert" style={{ margin: '10px', padding: '10px', borderRadius: '5px', backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb' }}>
                                    {error}
                                </div>
                            )}
                            
                            <form onSubmit={handleSubmit}>
                                <div className="box-group">
                                    <div className='groupp'>
                                        <label>Email Address</label>
                                        <div className="input">
                                            <input 
                                                type="email" 
                                                placeholder="Email Address" 
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                disabled={loading}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className='groupp'>
                                        <label>Password</label>
                                        <div className="input">
                                            <input 
                                                type="password" 
                                                placeholder="Password" 
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                disabled={loading}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className='check'>
                                    <label>
                                        <input type="checkbox" className='me-2' /> Remember Me
                                    </label>
                                    <div>
                                        <p><a href="#" onClick={handleForgotPasswordClick} style={{ color: 'red', cursor: 'pointer' }}>Forgot Password</a></p>
                                    </div>
                                </div>

                                <div className="buttons fw-medium mt-3">
                                    <button 
                                        type="submit" 
                                        className="btn-two" 
                                        disabled={loading}
                                    >
                                        {loading ? 'SIGNING IN...' : 'SIGN IN'}
                                    </button>
                                </div>
                            </form>

                            <div className="text-center mt-3">
                                <p style={{ color: 'gray', marginBottom: '8px' }}>Don't have an account? <Link to="/Register" style={{ color: 'red' }}>Register</Link></p>
                                <div className="buttons fw-medium">
                                    <Link to="/Register">
                                        <button className="btn-two">REGISTER</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Forgot Password Modal */}
            <ForgotPasswordModal 
                isOpen={isForgotPasswordOpen}
                onClose={handleCloseForgotPassword}
            />
        </>
    )
}
