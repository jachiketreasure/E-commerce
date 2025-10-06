import logo from '../images/logo.svg';
import imge1 from '../images/footer1.png'
import imge2 from '../images/footer2.png'
import imge3 from '../images/footer3.png'
import visa from '../images/visa.png'
import './Footer.css'
import { useEffect, useRef, useState } from "react";

export default function Footer() {



    const footerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.05,
            }
        );

        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        return () => {
            if (footerRef.current) {
                observer.unobserve(footerRef.current);
            }
        };
    }, []);



    return (
        <>
            <footer
                ref={footerRef}
                className={`footer ${isVisible ? "footer-slide-down" : ""}`}
            >

                <div className="container footer-slide-down">
                    <div className="footer d-flex justify-content-between mt-5">
                        <div className='col-one'>
                            <img src={logo} alt="Logo" style={{ height: "50px" }} className='mb-4' />
                            <p>Address : Our Online Store</p>
                            <p>E-mail : jachiketreasure@outlook.com</p>
                            <p>Phone : +234 913 5663 829 </p>
                            <br />
                            <p>subscribe to our newsletter</p>
                            <div className='group'>
                                <input type="email" placeholder='Your Email Address ' className='inp' />
                                <span className='fas fa-arrow-right arrow'></span>
                            </div>
                        </div>
                        <div className='col-two'>
                            <h4 className='mb-4 fw-bold'>Recent Posts</h4>
                            <div className='d-flex mt-3'>
                                <img src={imge1} alt="Logo" style={{ height: "65px" }} className='im mb-2' />
                                <div className='ms-3'>
                                    <div className='fw-bold'>Cozy Knit Cardigan Sweater</div>
                                    <p>June 19, 2025</p>
                                </div>
                            </div>
                            <div className='d-flex mt-3'>
                                <img src={imge2} alt="Logo" style={{ height: "65px" }} className='im mb-2' />
                                <div className='ms-3'>
                                    <div className='fw-bold m-auto'>Sophisticated Swagger Suit</div>
                                    <p>June 19, 2025</p>
                                </div>
                            </div>
                            <div className='d-flex mt-3'>
                                <img src={imge3} alt="Logo" style={{ height: "65px" }} className='im mb-2' />
                                <div className='ms-3'>
                                    <div className='fw-bold'>Athletic Mesh Sports Leggings</div>
                                    <p>June 19, 2025</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-three' >
                            <h4 className='mb-4 fw-bold'>Our Stores</h4>
                            <p>Chicago, USA</p>
                            <p>Lagos, Nigeria</p>
                            <p>Warri, Nigeria</p>
                            <p>Abuja, Nigeria</p>
                            <p>Jos, Nigeria</p>
                            <p>Edo, Nigeria</p>
                        </div>
                        <div className='col-four'>
                            <h4 className='mb-4 fw-bold'>Useful Links</h4>
                            <p>Privacy Policy</p>
                            <p>Returns</p>
                            <p>Terms & Conditions</p>
                            <p>Contact Us</p>
                            <p>Latest News</p>
                            <p>Our Sitemap</p>
                        </div>
                        <div className='col-five'>
                            <h4 className='mb-4 fw-bold '>Footer Menu</h4>
                            <p>Instagram profile</p>
                            <p>New Collection</p>
                            <p>Woman Dress</p>
                            <p>Contact Us</p>
                            <p>Latest News</p>
                        </div>
                    </div>
                    <hr className='mt-5 mb-4' />
                    <div className='d-flex justify-content-between mb-3'>
                        <div><h6 className='fw-bold'>&copy;2025 <span style={{ color: 'blue' }}>Jachike Treasure</span>. All Rights Reserved</h6></div>
                        <div>
                            <div className="imag">
                                <span className='fw-bold'>We Accept: </span>
                                <img src={visa} alt="" />
                            </div>
                        </div>
                    </div>
                </div>

            </footer>
        </>
    )
}










