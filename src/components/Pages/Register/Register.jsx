import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import '../../Nav/Nav'
import Navbar from '../../Nav/Nav'
import registerpng from '../../images/login.png'
import './Register.css'

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
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value});
      };
      const handleSubmit = async (e) => {
        e.preventDefault();

      if (formData.password !== formData.confirmPassword){
        alert("Passwords do not match!");
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
        const res =await fetch("http://localhost:8000/api/auth/register",{
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(userData),
        });
console.log(res)
        if (res.ok){
            alert(res?.data?.message|| "Registration Successful");
            navigate("/login");
        } else {
            alert(res?.data?.message || "Registration failed.");
        }
 
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      }
      };

    return (
        <>
            <Navbar/>
            <div className="Register d-flex justify-content-around">

                
                <div className="floating1-button">
                    <span className="icon"><i className="fa-solid fa-headphones"></i></span>
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
                                          <h6><Link to="/" style={{ color: 'black' }}>Home</Link> &gt; Register</h6>
                                      </div>
                                      <img src={registerpng} alt="image" style={{ width: '100%', maxWidth: '550px', height: 'auto' }} />
              
                                  </div>
                              </div>
                              <div className="box-form " style={{ width: '50%' }}>
                                   <form className="formm" onSubmit ={handleSubmit}>
                                      <div className="head">
                                          <h2 className='fw-bold'>Register</h2>
                                          <p style={{ color: 'gray' }}>Fill The Form To Register</p>
                                      </div>
                                      <div className="box-group">
                                          <div className="Name">
                                              <div className='groupp' >
                                                  <label htmlFor="" className='input-f-name'>First Name</label>
                                                  <div className="input input-f-name"><input type="text" name= "firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required/></div>
                                              </div>
                                              <div className='groupp' >
                                                  <label htmlFor="" className='input-l-name'>Last Name</label>
                                                  <div className="input input-l-name"><input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required/></div>
                                              </div>
                                          </div>
                                          <div className="email">
                                              <div className='groupp' style={{ padding: '3% 10%' }}>
                                                  <label htmlFor=""> Email Address</label>
                                                  <div className="input"><input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your Email Address" required/></div>
                                              </div>
                                          </div>
                                          <div className="phone">
                                              <div className='groupp' style={{ padding: '3% 10%' }}>
                                                  <label htmlFor="">Phone Number</label>
                                                  <div className="input"><input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your Phone Number"/></div>
                                              </div>
                                          </div>
                                          <div className="pass">
                                              <div className='groupp' style={{ padding: '3% 10%' }}>
                                                  <label htmlFor="">Password</label>
                                                  <div className="input"><input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password password" required/>    </div>
                                              </div>
                                              <div className='groupp' style={{ padding: '3% 10%' }}>
                                                  <label htmlFor="">Confirm Password</label>
                                                  <div className="input"><input type="password" name="confirmPassword" value={formData. confirmPassword} onChange={handleChange} placeholder="Re-enter your password" required/>    
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="gender">
                                              <div>
                                                  <input type="radio" name="gender" value="male" checked={formData.gender === "male"} onChange={handleChange} className='me-1'/>
                                                  <label htmlFor="male"> Male</label>
                                              </div>
                                              <div>
                                                  <input type="radio" name="gender" value="female" checked={formData.gender === "female"} onChange={handleChange} className='me-1' />
                                                  <label htmlFor="female"> Female</label>
                                              </div>
                                          </div>
                                      </div>
                                    <div className="buttons fw-medium">
                                        <button type="submit" className="btn-on">REGISTER</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </>
                );
                }
