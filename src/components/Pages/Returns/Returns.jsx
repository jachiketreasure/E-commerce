import React, { useEffect } from 'react';
import './Returns.css';

export default function Returns() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="returns-page">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10 col-md-12">
                        <div className="returns-header text-center">
                            <h1 className="returns-title">Returns & Refunds</h1>
                            <p className="returns-subtitle">Last updated: {new Date().toLocaleDateString()}</p>
                        </div>

                        <div className="returns-content">
                            <section className="returns-section">
                                <h2>1. Return Policy Overview</h2>
                                <p>
                                    At Jachike Treasure, we want you to be completely satisfied with your purchase. 
                                    We offer a comprehensive return and refund policy to ensure your shopping experience 
                                    is hassle-free and enjoyable.
                                </p>
                                <div className="highlight-box">
                                    <h3>Quick Return Summary</h3>
                                    <ul>
                                        <li><strong>Return Window:</strong> 30 days from delivery</li>
                                        <li><strong>Refund Processing:</strong> 5-7 business days</li>
                                        <li><strong>Return Shipping:</strong> Free for defective items</li>
                                        <li><strong>Exchange Policy:</strong> Available for size/color changes</li>
                                    </ul>
                                </div>
                            </section>

                            <section className="returns-section">
                                <h2>2. Eligibility for Returns</h2>
                                
                                <h3>2.1 Items Eligible for Return</h3>
                                <p>The following items can be returned within 30 days of delivery:</p>
                                <ul>
                                    <li>Unworn clothing and accessories</li>
                                    <li>Items with original tags and packaging</li>
                                    <li>Defective or damaged items</li>
                                    <li>Items that don't match the description</li>
                                    <li>Wrong items sent by mistake</li>
                                </ul>

                                <h3>2.2 Items NOT Eligible for Return</h3>
                                <p>The following items cannot be returned:</p>
                                <ul>
                                    <li>Items worn or used</li>
                                    <li>Items without original tags</li>
                                    <li>Personalized or custom-made items</li>
                                    <li>Underwear and intimate apparel</li>
                                    <li>Items damaged by customer misuse</li>
                                    <li>Final sale items (clearly marked)</li>
                                </ul>
                            </section>

                            <section className="returns-section">
                                <h2>3. Return Process</h2>
                                
                                <div className="process-steps">
                                    <div className="step">
                                        <div className="step-number">1</div>
                                        <div className="step-content">
                                            <h4>Contact Customer Service</h4>
                                            <p>Email us at jachiketreasure@outlook.com or call +234 913 5663 829 to initiate your return.</p>
                                        </div>
                                    </div>
                                    
                                    <div className="step">
                                        <div className="step-number">2</div>
                                        <div className="step-content">
                                            <h4>Receive Return Authorization</h4>
                                            <p>We'll provide you with a Return Merchandise Authorization (RMA) number and return instructions.</p>
                                        </div>
                                    </div>
                                    
                                    <div className="step">
                                        <div className="step-number">3</div>
                                        <div className="step-content">
                                            <h4>Package Your Items</h4>
                                            <p>Pack items securely in original packaging with all tags attached. Include the RMA number.</p>
                                        </div>
                                    </div>
                                    
                                    <div className="step">
                                        <div className="step-number">4</div>
                                        <div className="step-content">
                                            <h4>Ship Your Return</h4>
                                            <p>Send the package to our return address. We recommend using tracked shipping.</p>
                                        </div>
                                    </div>
                                    
                                    <div className="step">
                                        <div className="step-number">5</div>
                                        <div className="step-content">
                                            <h4>Receive Refund</h4>
                                            <p>Once we receive and inspect your return, we'll process your refund within 5-7 business days.</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="returns-section">
                                <h2>4. Refund Information</h2>
                                
                                <h3>4.1 Refund Methods</h3>
                                <p>Refunds will be processed using the same payment method used for the original purchase:</p>
                                <ul>
                                    <li>Credit/Debit Cards: Refunded to original card</li>
                                    <li>PayPal: Refunded to PayPal account</li>
                                    <li>Bank Transfer: Refunded to original account</li>
                                </ul>

                                <h3>4.2 Refund Timeline</h3>
                                <div className="timeline-box">
                                    <ul>
                                        <li><strong>Processing Time:</strong> 5-7 business days after receiving return</li>
                                        <li><strong>Credit Card:</strong> 3-5 business days to appear on statement</li>
                                        <li><strong>PayPal:</strong> 1-2 business days</li>
                                        <li><strong>Bank Transfer:</strong> 5-10 business days</li>
                                    </ul>
                                </div>

                                <h3>4.3 Partial Refunds</h3>
                                <p>Partial refunds may be issued in the following cases:</p>
                                <ul>
                                    <li>Items returned in less than perfect condition</li>
                                    <li>Missing accessories or packaging</li>
                                    <li>Items showing signs of wear</li>
                                </ul>
                            </section>

                            <section className="returns-section">
                                <h2>5. Exchange Policy</h2>
                                <p>
                                    We offer exchanges for size and color changes. Exchanges are subject to availability 
                                    and must be requested within 30 days of delivery.
                                </p>
                                
                                <h3>5.1 Exchange Process</h3>
                                <ol>
                                    <li>Contact customer service to request an exchange</li>
                                    <li>Specify the desired size/color</li>
                                    <li>Return the original item following our return process</li>
                                    <li>We'll ship the new item once the return is received</li>
                                </ol>

                                <h3>5.2 Exchange Fees</h3>
                                <ul>
                                    <li><strong>Size/Color Exchange:</strong> Free (customer pays return shipping)</li>
                                    <li><strong>Different Item Exchange:</strong> Price difference applies</li>
                                    <li><strong>Express Exchange:</strong> Additional shipping fees may apply</li>
                                </ul>
                            </section>

                            <section className="returns-section">
                                <h2>6. Defective Items</h2>
                                <p>
                                    If you receive a defective or damaged item, we'll make it right immediately. 
                                    We cover all return shipping costs for defective items.
                                </p>
                                
                                <h3>6.1 What Qualifies as Defective</h3>
                                <ul>
                                    <li>Manufacturing defects (holes, tears, broken zippers)</li>
                                    <li>Items damaged during shipping</li>
                                    <li>Items that don't match the product description</li>
                                    <li>Missing parts or accessories</li>
                                </ul>

                                <h3>6.2 Defective Item Process</h3>
                                <ol>
                                    <li>Contact us immediately with photos of the defect</li>
                                    <li>We'll provide a prepaid return label</li>
                                    <li>Return the item using our prepaid shipping</li>
                                    <li>Receive a full refund or replacement</li>
                                </ol>
                            </section>

                            <section className="returns-section">
                                <h2>7. International Returns</h2>
                                <p>
                                    International customers can return items following the same process. 
                                    Please note that return shipping costs are the customer's responsibility 
                                    unless the item is defective.
                                </p>
                                
                                <h3>7.1 International Return Address</h3>
                                <div className="address-box">
                                    <p><strong>Jachike Treasure Returns</strong></p>
                                    <p>Our Online Store</p>
                                    <p>Return Department</p>
                                    <p>Please include your RMA number</p>
                                </div>
                            </section>

                            <section className="returns-section">
                                <h2>8. Contact Information</h2>
                                <p>For returns, exchanges, or any questions about our return policy:</p>
                                <div className="contact-info">
                                    <p><strong>Email:</strong> jachiketreasure@outlook.com</p>
                                    <p><strong>Phone:</strong> +234 913 5663 829</p>
                                    <p><strong>Hours:</strong> Monday - Friday, 9 AM - 6 PM (GMT+1)</p>
                                    <p><strong>Response Time:</strong> Within 24 hours</p>
                                </div>
                            </section>

                            <div className="returns-footer">
                                <p>
                                    We're committed to making your return experience as smooth as possible. 
                                    If you have any questions or concerns, please don't hesitate to contact us.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
