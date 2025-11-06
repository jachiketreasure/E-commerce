import logo from '../images/logo.svg';
import imge1 from '../images/footer1.png'
import imge2 from '../images/footer2.png'
import imge3 from '../images/footer3.png'
import visa from '../images/visa.png'
import './Footer.css'
import { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';

export default function Footer() {
    const footerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);

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

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setIsSubscribed(true);
            setEmail('');
            setTimeout(() => setIsSubscribed(false), 3000);
        }
    };

    const handleItemHover = (item) => {
        setHoveredItem(item);
    };

    const handleItemLeave = () => {
        setHoveredItem(null);
    };

    return (
        <>
            <footer
                ref={footerRef}
                className={`footer ${isVisible ? "footer-slide-down" : ""}`}
            >
                <div className="container footer-container">
                    <div className="footer-content">
                        <div className='footer-section company-info'>
                            <div className="logo-container">
                                <img src={logo} alt="Logo" className='footer-logo' />
                                <div className="logo-glow"></div>
                            </div>
                            <p className="company-description">
                                Your premier destination for stylish and modern fashion. 
                                We bring you the latest trends with exceptional quality.
                            </p>
                            <div className="contact-info">
                                <div className="contact-item">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <span>Our Online Store</span>
                                </div>
                                <div className="contact-item">
                                    <i className="fas fa-envelope"></i>
                                    <span>jachiketreasure@outlook.com</span>
                                </div>
                                <div className="contact-item">
                                    <i className="fas fa-phone"></i>
                                    <span>+234 913 5663 829</span>
                                </div>
                            </div>
                            
                            <div className="newsletter-section">
                                <h5>Subscribe to our newsletter</h5>
                                <form onSubmit={handleSubscribe} className="newsletter-form">
                                    <div className='input-group'>
                                        <input 
                                            type="email" 
                                            placeholder='Your Email Address' 
                                            className='newsletter-input' 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <button type="submit" className='newsletter-btn'>
                                            <i className='fas fa-arrow-right'></i>
                                        </button>
                                    </div>
                                    {isSubscribed && (
                                        <div className="success-message">
                                            <i className="fas fa-check-circle"></i>
                                            Thank you for subscribing!
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>

                        <div className='footer-section recent-posts'>
                            <h4 className='section-title'>Recent Posts</h4>
                            <div className="posts-list">
                                <div 
                                    className={`post-item ${hoveredItem === 'post1' ? 'hovered' : ''}`}
                                    onMouseEnter={() => handleItemHover('post1')}
                                    onMouseLeave={handleItemLeave}
                                >
                                    <img src={imge1} alt="Cozy Knit Cardigan" className='post-image' />
                                    <div className='post-content'>
                                        <h6 className='post-title'>Cozy Knit Cardigan Sweater</h6>
                                        <p className='post-date'>June 19, 2025</p>
                                    </div>
                                </div>
                                <div 
                                    className={`post-item ${hoveredItem === 'post2' ? 'hovered' : ''}`}
                                    onMouseEnter={() => handleItemHover('post2')}
                                    onMouseLeave={handleItemLeave}
                                >
                                    <img src={imge2} alt="Sophisticated Suit" className='post-image' />
                                    <div className='post-content'>
                                        <h6 className='post-title'>Sophisticated Swagger Suit</h6>
                                        <p className='post-date'>June 19, 2025</p>
                                    </div>
                                </div>
                                <div 
                                    className={`post-item ${hoveredItem === 'post3' ? 'hovered' : ''}`}
                                    onMouseEnter={() => handleItemHover('post3')}
                                    onMouseLeave={handleItemLeave}
                                >
                                    <img src={imge3} alt="Athletic Leggings" className='post-image' />
                                    <div className='post-content'>
                                        <h6 className='post-title'>Athletic Mesh Sports Leggings</h6>
                                        <p className='post-date'>June 19, 2025</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='footer-section our-stores'>
                            <h4 className='section-title'>Our Stores</h4>
                            <div className="stores-list">
                                {['Chicago, USA', 'Lagos, Nigeria', 'Warri, Nigeria', 'Abuja, Nigeria', 'Jos, Nigeria', 'Edo, Nigeria'].map((store, index) => (
                                    <div 
                                        key={index}
                                        className={`store-item ${hoveredItem === `store${index}` ? 'hovered' : ''}`}
                                        onMouseEnter={() => handleItemHover(`store${index}`)}
                                        onMouseLeave={handleItemLeave}
                                    >
                                        <i className="fas fa-store"></i>
                                        <span>{store}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='footer-section useful-links'>
                            <h4 className='section-title'>Useful Links</h4>
                            <div className="links-list">
                                {[
                                    { name: 'Privacy Policy', link: '/privacy-policy' },
                                    { name: 'Returns', link: '/returns' },
                                    { name: 'Terms & Conditions', link: '/terms-conditions' },
                                    { name: 'Contact Us', link: '#' },
                                    { name: 'Latest News', link: '#' },
                                    { name: 'Our Sitemap', link: '#' }
                                ].map((item, index) => (
                                    <div 
                                        key={index}
                                        className={`link-item ${hoveredItem === `link${index}` ? 'hovered' : ''}`}
                                        onMouseEnter={() => handleItemHover(`link${index}`)}
                                        onMouseLeave={handleItemLeave}
                                    >
                                        <i className="fas fa-chevron-right"></i>
                                        {item.link.startsWith('/') ? (
                                            <Link to={item.link} style={{ color: 'inherit', textDecoration: 'none' }}>
                                                {item.name}
                                            </Link>
                                        ) : (
                                            <span>{item.name}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='footer-section footer-menu'>
                            <h4 className='section-title'>Footer Menu</h4>
                            <div className="menu-list">
                                {['Instagram profile', 'New Collection', 'Woman Dress', 'Contact Us', 'Latest News'].map((item, index) => (
                                    <div 
                                        key={index}
                                        className={`menu-item ${hoveredItem === `menu${index}` ? 'hovered' : ''}`}
                                        onMouseEnter={() => handleItemHover(`menu${index}`)}
                                        onMouseLeave={handleItemLeave}
                                    >
                                        <i className="fas fa-chevron-right"></i>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <div className="footer-bottom-content">
                            <div className="copyright">
                                <h6>&copy;2024 <span className="brand-name">Jachike Treasure</span>. Shop. Smile. Repeat.</h6>
                            </div>
                            <div className="payment-methods">
                                <span className="payment-label">We Accept:</span>
                                <div className="payment-icons">
                                    <img src={visa} alt="Visa" className="payment-icon" />
                                    <div className="payment-icon-placeholder">
                                        <i className="fab fa-cc-mastercard"></i>
                                    </div>
                                    <div className="payment-icon-placeholder">
                                        <i className="fab fa-cc-paypal"></i>
                                    </div>
                                    <div className="payment-icon-placeholder">
                                        <i className="fab fa-apple-pay"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}










