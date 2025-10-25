import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../Nav/Nav'
import registerpng from '../../images/login.png'
import './Register.css'
import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"; 

export default function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        gender: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    const handleWhatsAppSupport = () => {
        const phoneNumber = "+2349135663829";
        const message = "Hello! I need support with my registration/account.";
        const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\+/g, '')}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value});
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Validation
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
            setError("Please fill in all required fields");
            setLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long");
            setLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            setLoading(false);
            return;
        }

        const userData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            gender: formData.gender,
        };

        try {
            console.log('Attempting registration to:', `${BASE}/api/auth/register`);
            const res = await axios.post(`${BASE}/api/auth/register`, userData);
            
            if (res.status === 201) {
                alert(res?.data?.message || "Registration Successful");
                navigate("/login");
            }
        } catch (error) {
            console.error("Registration error:", error);
            console.log("Full error object:", error);
            
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else if (error.response && error.response.status === 400) {
                setError("Invalid registration data. Please check all fields.");
            } else if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
                setError('Unable to connect to server. Please check your internet connection and try again.');
            } else if (error.message.includes('CORS')) {
                setError('Server configuration error. Please contact support.');
            } else {
                setError("An error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar/>
            <div className="Register d-flex justify-content-around">

                
                <div className="floating1-button" onClick={handleWhatsAppSupport} style={{ cursor: 'pointer' }}>
                    <span className="icon"><i className="fa-brands fa-whatsapp"></i></span>
                    <span className="label">SUPPORT</span>
                </div>
                <div className="floating2-button">
                    <span className="icon"><i className="fa-solid fa-headphones"></i></span>
                    <span className="label">BUY NOW</span>
                </div>

                
                              <div className='' style={{ width: '50%', }}>
                                  <div className="imagee">
                                      <div className='text-image'>
                                          <h1 className='fw-bold mb-3'>Register</h1>
                                      </div>
                                      <img src={registerpng} alt="image" style={{ width: '100%', maxWidth: '550px', height: 'auto' }} />
              
                                  </div>
                              </div>
                              <div className="box-form " style={{ width: '50%' }}>
                                   <form className="formm" onSubmit={handleSubmit}>
                                      <div className="head">
                                          <h2 className='fw-bold'>Register</h2>
                                          <p style={{ color: 'gray' }}>Fill The Form To Register</p>
                                      </div>

                                      {error && (
                                          <div className="alert alert-danger" role="alert" style={{ margin: '10px', padding: '10px', borderRadius: '5px', backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb' }}>
                                              {error}
                                          </div>
                                      )}
                                      <div className="box-group">
                                          <div className="Name">
                                              <div className='groupp' >
                                                  <label htmlFor="" className='input-f-name'>First Name</label>
                                                  <div className="input input-f-name"><input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" disabled={loading} required/></div>
                                              </div>
                                              <div className='groupp' >
                                                  <label htmlFor="" className='input-l-name'>Last Name</label>
                                                  <div className="input input-l-name"><input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" disabled={loading} required/></div>
                                              </div>
                                          </div>
                                          <div className="email">
                                              <div className='groupp' style={{ padding: '3% 10%' }}>
                                                  <label htmlFor=""> Email Address</label>
                                                  <div className="input"><input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your Email Address" disabled={loading} required/></div>
                                              </div>
                                          </div>
                                          <div className="phone">
                                              <div className='groupp' style={{ padding: '3% 10%' }}>
                                                  <label htmlFor="">Phone Number</label>
                                                  <div className="input"><input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your Phone Number" disabled={loading}/></div>
                                              </div>
                                          </div>
                                          <div className="pass">
                                              <div className='groupp' style={{ padding: '3% 10%' }}>
                                                  <label htmlFor="">Password</label>
                                                  <div className="input"><input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" disabled={loading} required/>    </div>
                                              </div>
                                              <div className='groupp' style={{ padding: '3% 10%' }}>
                                                  <label htmlFor="">Confirm Password</label>
                                                  <div className="input"><input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter your password" disabled={loading} required/>    
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="gender">
                                              <div>
                                                  <input type="radio" name="gender" value="male" checked={formData.gender === "male"} onChange={handleChange} className='me-1' disabled={loading}/>
                                                  <label htmlFor="male"> Male</label>
                                              </div>
                                              <div>
                                                  <input type="radio" name="gender" value="female" checked={formData.gender === "female"} onChange={handleChange} className='me-1' disabled={loading} />
                                                  <label htmlFor="female"> Female</label>
                                              </div>
                                          </div>
                                      </div>
                                    <div className="buttons fw-medium">
                                        <button type="submit" className="btn-on" disabled={loading}>
                                            {loading ? 'REGISTERING...' : 'REGISTER'}
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </>
                );
                }
