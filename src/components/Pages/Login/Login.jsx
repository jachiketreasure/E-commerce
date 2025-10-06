import { useState } from "react";
import './Login.css';
import loginpng from '../../images/login.png';
import { Link, useNavigate } from "react-router-dom";
import '../../Nav/Nav';
import Navbar from '../../Nav/Nav';
import { useAuth } from "../../../context/AuthContext";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           const response = await fetch("http://localhost:8000/api/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                auth.login(data.token, data.user);
                navigate("/shop");
            } else {
             alert(data.message || "Login failed");
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert("An error occured. Please try again.");
        }
    };
    

    return (
        <>
            <Navbar />

            <div className="Login d-flex justify-content-around">
                
                <div className="floating1-button">
                    <span className="icon"><i className="fa-solid fa-headphones"></i></span>
                    <span className="label">SUPPORT</span>
                </div>
                <div className="floating2-button">
                    <span className="icon"><i className="fa-solid fa-headphones"></i></span>
                    <span className="label">BUY NOW</span>
                </div>

                
                <div style={{ width: '50%' }}>
                    <div className="imagee">
                        <div className='text-image'>
                            <h1 className='fw-bold mb-3'>Login</h1>
                            <h6>
                                <Link to="/" style={{ color: 'black' }}>Home</Link> &gt; Login
                            </h6>
                        </div>
                        <img 
                            src={loginpng} 
                            alt="image" 
                            style={{ width: '100%', maxWidth: '550px', height: 'auto' }} 
                        />
                    </div>
                </div>

            
                <div className="box-form" style={{ width: '50%' }}>
                    <div className="formm">
                        <div className="head">
                            <h2 className='fw-bold'>Login</h2>
                            <p style={{ color: 'gray' }}>Welcome, Please login to your account</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="box-group">
                                
                                <div className='groupp' style={{ padding: '3% 10%' }}>
                                    <label>Email Address</label>
                                    <div className="input">
                                        <input 
                                            type="email" 
                                            placeholder="Email Address" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                            
                                <div className='groupp' style={{ padding: '3% 10%' }}>
                                    <label>Password</label>
                                    <div className="input">
                                        <input 
                                            type="password" 
                                            placeholder="Password" 
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            
                            <div className='check d-flex justify-content-between px-4'>
                                <label>
                                    <input type="checkbox" className='me-2' /> Remember Me
                                </label>
                                <div>
                                    <p><a href="#" style={{ color: 'red' }}>Forgot Password</a></p>
                                </div>
                            </div>

                            
                            <div className="buttons fw-medium mt-3">
                                <button type="submit" className="btn-two" style={{ width: '200px', padding: '8px 0' }}>SIGN IN</button>
                            </div>
                        </form>

                        
                        <div className="text-center mt-3">
                            <p style={{ color: 'gray', marginBottom: '8px' }}>Don't have an account?</p>
                            <div className="buttons fw-medium">
                                <Link to="/Register">
                                    <button className="btn-two" style={{ width: '120px', padding: '8px 0' }}>REGISTER</button>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
