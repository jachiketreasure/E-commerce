import React from 'react';
import './TermsConditions.css';

export default function TermsConditions() {
    return (
        <div className="terms-page">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10 col-md-12">
                        <div className="terms-header text-center">
                            <h1 className="terms-title">Terms & Conditions</h1>
                            <p className="terms-subtitle">Last updated: {new Date().toLocaleDateString()}</p>
                        </div>

                        <div className="terms-content">
                            <section className="terms-section">
                                <h2>1. Acceptance of Terms</h2>
                                <p>
                                    Welcome to Jachike Treasure. These Terms and Conditions ("Terms") govern your use of our 
                                    e-commerce website and services. By accessing or using our website, you agree to be bound 
                                    by these Terms. If you do not agree to these Terms, please do not use our services.
                                </p>
                                <div className="highlight-box">
                                    <h3>Important Notice</h3>
                                    <p>
                                        These terms constitute a legally binding agreement between you and Jachike Treasure. 
                                        Please read them carefully before making any purchases or using our services.
                                    </p>
                                </div>
                            </section>

                            <section className="terms-section">
                                <h2>2. Definitions</h2>
                                <div className="definitions-grid">
                                    <div className="definition-item">
                                        <h4>"Company" or "We"</h4>
                                        <p>Refers to Jachike Treasure, the operator of this e-commerce platform.</p>
                                    </div>
                                    <div className="definition-item">
                                        <h4>"Customer" or "You"</h4>
                                        <p>Refers to any individual or entity using our website or services.</p>
                                    </div>
                                    <div className="definition-item">
                                        <h4>"Products"</h4>
                                        <p>Refers to all goods, services, and items offered for sale on our website.</p>
                                    </div>
                                    <div className="definition-item">
                                        <h4>"Website"</h4>
                                        <p>Refers to our e-commerce platform and all associated pages and services.</p>
                                    </div>
                                </div>
                            </section>

                            <section className="terms-section">
                                <h2>3. Use of Website</h2>
                                
                                <h3>3.1 Permitted Use</h3>
                                <p>You may use our website for the following purposes:</p>
                                <ul>
                                    <li>Browsing and viewing products</li>
                                    <li>Making legitimate purchases</li>
                                    <li>Creating and managing your account</li>
                                    <li>Accessing customer support</li>
                                    <li>Reading product reviews and information</li>
                                </ul>

                                <h3>3.2 Prohibited Activities</h3>
                                <p>You agree not to:</p>
                                <ul>
                                    <li>Use the website for any illegal or unauthorized purpose</li>
                                    <li>Attempt to gain unauthorized access to our systems</li>
                                    <li>Interfere with the proper functioning of the website</li>
                                    <li>Upload malicious code or viruses</li>
                                    <li>Impersonate another person or entity</li>
                                    <li>Violate any applicable laws or regulations</li>
                                    <li>Engage in fraudulent activities</li>
                                </ul>
                            </section>

                            <section className="terms-section">
                                <h2>4. Account Registration</h2>
                                
                                <h3>4.1 Account Creation</h3>
                                <p>
                                    To make purchases, you must create an account. You agree to provide accurate, 
                                    current, and complete information during registration and to update such information 
                                    to keep it accurate, current, and complete.
                                </p>

                                <h3>4.2 Account Security</h3>
                                <p>You are responsible for:</p>
                                <ul>
                                    <li>Maintaining the confidentiality of your account credentials</li>
                                    <li>All activities that occur under your account</li>
                                    <li>Notifying us immediately of any unauthorized use</li>
                                    <li>Ensuring your account information remains accurate</li>
                                </ul>

                                <h3>4.3 Account Termination</h3>
                                <p>
                                    We reserve the right to suspend or terminate your account at any time for 
                                    violation of these Terms or for any other reason at our sole discretion.
                                </p>
                            </section>

                            <section className="terms-section">
                                <h2>5. Products and Pricing</h2>
                                
                                <h3>5.1 Product Information</h3>
                                <p>
                                    We strive to provide accurate product descriptions, images, and pricing. 
                                    However, we do not warrant that product descriptions or other content is 
                                    accurate, complete, reliable, or error-free.
                                </p>

                                <h3>5.2 Pricing</h3>
                                <ul>
                                    <li>All prices are subject to change without notice</li>
                                    <li>Prices are displayed in the currency specified on the website</li>
                                    <li>Additional taxes and fees may apply based on your location</li>
                                    <li>We reserve the right to refuse or cancel orders at any time</li>
                                </ul>

                                <h3>5.3 Product Availability</h3>
                                <p>
                                    Product availability is subject to change. We reserve the right to discontinue 
                                    any product at any time. If a product becomes unavailable after you place an order, 
                                    we will notify you and provide alternatives or a full refund.
                                </p>
                            </section>

                            <section className="terms-section">
                                <h2>6. Orders and Payment</h2>
                                
                                <h3>6.1 Order Process</h3>
                                <div className="order-process">
                                    <div className="process-step">
                                        <span className="step-number">1</span>
                                        <span className="step-text">Add items to cart</span>
                                    </div>
                                    <div className="process-step">
                                        <span className="step-number">2</span>
                                        <span className="step-text">Proceed to checkout</span>
                                    </div>
                                    <div className="process-step">
                                        <span className="step-number">3</span>
                                        <span className="step-text">Enter payment information</span>
                                    </div>
                                    <div className="process-step">
                                        <span className="step-number">4</span>
                                        <span className="step-text">Confirm and place order</span>
                                    </div>
                                </div>

                                <h3>6.2 Payment Methods</h3>
                                <p>We accept the following payment methods:</p>
                                <ul>
                                    <li>Credit and Debit Cards (Visa, Mastercard, American Express)</li>
                                    <li>PayPal</li>
                                    <li>Bank Transfers</li>
                                    <li>Other methods as specified on our website</li>
                                </ul>

                                <h3>6.3 Payment Security</h3>
                                <p>
                                    All payments are processed securely through encrypted connections. 
                                    We do not store your complete payment information on our servers.
                                </p>
                            </section>

                            <section className="terms-section">
                                <h2>7. Shipping and Delivery</h2>
                                
                                <h3>7.1 Shipping Information</h3>
                                <ul>
                                    <li>Shipping costs are calculated at checkout</li>
                                    <li>Delivery times vary by location and shipping method</li>
                                    <li>We are not responsible for delays caused by shipping carriers</li>
                                    <li>Risk of loss transfers to you upon delivery</li>
                                </ul>

                                <h3>7.2 International Shipping</h3>
                                <p>
                                    International orders may be subject to customs duties and taxes. 
                                    These additional costs are the responsibility of the customer.
                                </p>

                                <h3>7.3 Delivery Issues</h3>
                                <p>
                                    If you experience delivery issues, please contact us immediately. 
                                    We will work with the shipping carrier to resolve the problem.
                                </p>
                            </section>

                            <section className="terms-section">
                                <h2>8. Returns and Refunds</h2>
                                <p>
                                    Our return and refund policy is detailed in our separate Returns Policy. 
                                    By making a purchase, you agree to the terms outlined in that policy.
                                </p>
                                
                                <div className="policy-link">
                                    <p>
                                        <strong>For detailed return information, please refer to our 
                                        <a href="/privacy-policy" style={{ color: '#667eea', textDecoration: 'none' }}>
                                            Returns & Refunds Policy
                                        </a>
                                        </strong>
                                    </p>
                                </div>
                            </section>

                            <section className="terms-section">
                                <h2>9. Intellectual Property</h2>
                                
                                <h3>9.1 Our Content</h3>
                                <p>
                                    All content on our website, including text, graphics, logos, images, 
                                    and software, is the property of Jachike Treasure and is protected by 
                                    copyright and other intellectual property laws.
                                </p>

                                <h3>9.2 User Content</h3>
                                <p>
                                    By submitting content (reviews, comments, etc.) to our website, 
                                    you grant us a non-exclusive, royalty-free license to use, modify, 
                                    and display such content.
                                </p>

                                <h3>9.3 Trademarks</h3>
                                <p>
                                    "Jachike Treasure" and related trademarks are our property. 
                                    You may not use our trademarks without our written permission.
                                </p>
                            </section>

                            <section className="terms-section">
                                <h2>10. Privacy and Data Protection</h2>
                                <p>
                                    Your privacy is important to us. Our collection and use of personal 
                                    information is governed by our Privacy Policy, which is incorporated 
                                    into these Terms by reference.
                                </p>
                                
                                <div className="policy-link">
                                    <p>
                                        <strong>For detailed privacy information, please refer to our 
                                        <a href="/privacy-policy" style={{ color: '#667eea', textDecoration: 'none' }}>
                                            Privacy Policy
                                        </a>
                                        </strong>
                                    </p>
                                </div>
                            </section>

                            <section className="terms-section">
                                <h2>11. Limitation of Liability</h2>
                                <p>
                                    To the maximum extent permitted by law, Jachike Treasure shall not be liable 
                                    for any indirect, incidental, special, consequential, or punitive damages, 
                                    including but not limited to loss of profits, data, or use, arising from 
                                    your use of our website or services.
                                </p>
                                
                                <h3>11.1 Maximum Liability</h3>
                                <p>
                                    Our total liability to you for any claims arising from these Terms or 
                                    your use of our services shall not exceed the amount you paid for the 
                                    products or services in question.
                                </p>
                            </section>

                            <section className="terms-section">
                                <h2>12. Indemnification</h2>
                                <p>
                                    You agree to indemnify and hold harmless Jachike Treasure, its officers, 
                                    directors, employees, and agents from any claims, damages, or expenses 
                                    arising from your use of our website or violation of these Terms.
                                </p>
                            </section>

                            <section className="terms-section">
                                <h2>13. Dispute Resolution</h2>
                                
                                <h3>13.1 Governing Law</h3>
                                <p>
                                    These Terms shall be governed by and construed in accordance with the laws 
                                    of Nigeria, without regard to conflict of law principles.
                                </p>

                                <h3>13.2 Dispute Resolution Process</h3>
                                <ol>
                                    <li>First, contact our customer service to attempt resolution</li>
                                    <li>If unresolved, disputes may be subject to binding arbitration</li>
                                    <li>Arbitration shall be conducted in Nigeria</li>
                                    <li>Each party shall bear their own costs and attorney fees</li>
                                </ol>
                            </section>

                            <section className="terms-section">
                                <h2>14. Modifications to Terms</h2>
                                <p>
                                    We reserve the right to modify these Terms at any time. Changes will be 
                                    effective immediately upon posting on our website. Your continued use of 
                                    our services after changes constitutes acceptance of the new Terms.
                                </p>
                            </section>

                            <section className="terms-section">
                                <h2>15. Contact Information</h2>
                                <p>For questions about these Terms and Conditions:</p>
                                <div className="contact-info">
                                    <p><strong>Email:</strong> jachiketreasure@outlook.com</p>
                                    <p><strong>Phone:</strong> +234 913 5663 829</p>
                                    <p><strong>Address:</strong> Our Online Store</p>
                                    <p><strong>Business Hours:</strong> Monday - Friday, 9 AM - 6 PM (GMT+1)</p>
                                </div>
                            </section>

                            <div className="terms-footer">
                                <p>
                                    By using our website and services, you acknowledge that you have read, 
                                    understood, and agree to be bound by these Terms and Conditions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
