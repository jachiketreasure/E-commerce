import React, { useEffect } from 'react';
import './PrivacyPolicy.css';

export default function PrivacyPolicy() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="privacy-policy-page">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10 col-md-12">
                        <div className="privacy-header text-center">
                            <h1 className="privacy-title">Privacy Policy</h1>
                            <p className="privacy-subtitle">Last updated: {new Date().toLocaleDateString()}</p>
                        </div>

                        <div className="privacy-content">
                            <section className="privacy-section">
                                <h2>1. Introduction</h2>
                                <p>
                                    Welcome to Jachike Treasure ("we," "our," or "us"). This Privacy Policy explains how we collect, 
                                    use, disclose, and safeguard your information when you visit our e-commerce website. Please read 
                                    this privacy policy carefully. If you do not agree with the terms of this privacy policy, please 
                                    do not access the site.
                                </p>
                            </section>

                            <section className="privacy-section">
                                <h2>2. Information We Collect</h2>
                                
                                <h3>2.1 Personal Information</h3>
                                <p>We may collect personal information that you voluntarily provide to us when you:</p>
                                <ul>
                                    <li>Register for an account</li>
                                    <li>Make a purchase</li>
                                    <li>Subscribe to our newsletter</li>
                                    <li>Contact us for support</li>
                                    <li>Participate in surveys or promotions</li>
                                </ul>
                                <p>This information may include:</p>
                                <ul>
                                    <li>Name and contact information (email address, phone number)</li>
                                    <li>Billing and shipping addresses</li>
                                    <li>Payment information (processed securely through third-party providers)</li>
                                    <li>Account credentials</li>
                                    <li>Communication preferences</li>
                                </ul>

                                <h3>2.2 Automatically Collected Information</h3>
                                <p>We automatically collect certain information when you visit our website:</p>
                                <ul>
                                    <li>IP address and location data</li>
                                    <li>Browser type and version</li>
                                    <li>Device information</li>
                                    <li>Pages visited and time spent on site</li>
                                    <li>Referring website information</li>
                                    <li>Cookies and similar tracking technologies</li>
                                </ul>
                            </section>

                            <section className="privacy-section">
                                <h2>3. How We Use Your Information</h2>
                                <p>We use the information we collect for various purposes:</p>
                                <ul>
                                    <li><strong>Order Processing:</strong> To process and fulfill your orders</li>
                                    <li><strong>Account Management:</strong> To create and manage your account</li>
                                    <li><strong>Customer Support:</strong> To provide customer service and respond to inquiries</li>
                                    <li><strong>Marketing:</strong> To send promotional materials and newsletters (with your consent)</li>
                                    <li><strong>Website Improvement:</strong> To analyze usage patterns and improve our website</li>
                                    <li><strong>Security:</strong> To protect against fraud and unauthorized access</li>
                                    <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
                                </ul>
                            </section>

                            <section className="privacy-section">
                                <h2>4. Information Sharing and Disclosure</h2>
                                <p>We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:</p>
                                
                                <h3>4.1 Service Providers</h3>
                                <p>We may share information with trusted third-party service providers who assist us in:</p>
                                <ul>
                                    <li>Payment processing</li>
                                    <li>Shipping and delivery</li>
                                    <li>Email marketing</li>
                                    <li>Website analytics</li>
                                    <li>Customer support</li>
                                </ul>

                                <h3>4.2 Legal Requirements</h3>
                                <p>We may disclose your information if required by law or in response to:</p>
                                <ul>
                                    <li>Court orders or legal processes</li>
                                    <li>Government requests</li>
                                    <li>Protection of our rights and property</li>
                                    <li>Prevention of fraud or illegal activities</li>
                                </ul>
                            </section>

                            <section className="privacy-section">
                                <h2>5. Data Security</h2>
                                <p>
                                    We implement appropriate security measures to protect your personal information against unauthorized 
                                    access, alteration, disclosure, or destruction. These measures include:
                                </p>
                                <ul>
                                    <li>SSL encryption for data transmission</li>
                                    <li>Secure servers and databases</li>
                                    <li>Regular security audits</li>
                                    <li>Access controls and authentication</li>
                                    <li>Employee training on data protection</li>
                                </ul>
                                <p>
                                    However, no method of transmission over the internet or electronic storage is 100% secure. 
                                    While we strive to protect your information, we cannot guarantee absolute security.
                                </p>
                            </section>

                            <section className="privacy-section">
                                <h2>6. Cookies and Tracking Technologies</h2>
                                <p>
                                    We use cookies and similar tracking technologies to enhance your browsing experience. 
                                    Cookies are small text files stored on your device that help us:
                                </p>
                                <ul>
                                    <li>Remember your preferences</li>
                                    <li>Analyze website traffic</li>
                                    <li>Provide personalized content</li>
                                    <li>Improve website functionality</li>
                                </ul>
                                <p>
                                    You can control cookie settings through your browser preferences. However, disabling cookies 
                                    may affect the functionality of our website.
                                </p>
                            </section>

                            <section className="privacy-section">
                                <h2>7. Your Rights and Choices</h2>
                                <p>You have certain rights regarding your personal information:</p>
                                <ul>
                                    <li><strong>Access:</strong> Request access to your personal information</li>
                                    <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                                    <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                                    <li><strong>Portability:</strong> Request transfer of your data</li>
                                    <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                                    <li><strong>Restriction:</strong> Request restriction of processing</li>
                                </ul>
                                <p>
                                    To exercise these rights, please contact us using the information provided in the "Contact Us" section.
                                </p>
                            </section>

                            <section className="privacy-section">
                                <h2>8. Data Retention</h2>
                                <p>
                                    We retain your personal information for as long as necessary to fulfill the purposes outlined 
                                    in this privacy policy, unless a longer retention period is required or permitted by law. 
                                    When we no longer need your information, we will securely delete or anonymize it.
                                </p>
                            </section>

                            <section className="privacy-section">
                                <h2>9. International Data Transfers</h2>
                                <p>
                                    Your information may be transferred to and processed in countries other than your own. 
                                    We ensure that such transfers comply with applicable data protection laws and implement 
                                    appropriate safeguards to protect your information.
                                </p>
                            </section>

                            <section className="privacy-section">
                                <h2>10. Children's Privacy</h2>
                                <p>
                                    Our website is not intended for children under 13 years of age. We do not knowingly collect 
                                    personal information from children under 13. If you are a parent or guardian and believe 
                                    your child has provided us with personal information, please contact us immediately.
                                </p>
                            </section>

                            <section className="privacy-section">
                                <h2>11. Changes to This Privacy Policy</h2>
                                <p>
                                    We may update this privacy policy from time to time. We will notify you of any changes by 
                                    posting the new privacy policy on this page and updating the "Last updated" date. We encourage 
                                    you to review this privacy policy periodically for any changes.
                                </p>
                            </section>

                            <section className="privacy-section">
                                <h2>12. Contact Us</h2>
                                <p>If you have any questions about this privacy policy or our data practices, please contact us:</p>
                                <div className="contact-info">
                                    <p><strong>Email:</strong> jachiketreasure@outlook.com</p>
                                    <p><strong>Phone:</strong> +234 913 5663 829</p>
                                    <p><strong>Address:</strong> Our Online Store</p>
                                </div>
                            </section>

                            <div className="privacy-footer">
                                <p>
                                    By using our website, you acknowledge that you have read and understood this privacy policy 
                                    and agree to the collection, use, and disclosure of your information as described herein.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
