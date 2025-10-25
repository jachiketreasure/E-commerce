import React from 'react';
import './Blog.css';

export default function Blog() {
    return (
        <div className="blog-page">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10 col-12">
                        <div className="blog-header text-center">
                            <h1 className="blog-title">Our Blog</h1>
                            <p className="blog-subtitle">
                                Stay updated with the latest fashion trends, style tips, and news from our team.
                            </p>
                        </div>
                        
                        <div className="blog-content">
                            <div className="coming-soon-card">
                                <div className="coming-soon-icon">
                                    <i className="fas fa-blog"></i>
                                </div>
                                <h2>Coming Soon!</h2>
                                <p>
                                    We're working hard to bring you amazing content about fashion, lifestyle, and more. 
                                    Check back soon for exciting blog posts!
                                </p>
                                <div className="blog-features">
                                    <div className="feature-item">
                                        <i className="fas fa-pen-fancy"></i>
                                        <span>Fashion Tips</span>
                                    </div>
                                    <div className="feature-item">
                                        <i className="fas fa-palette"></i>
                                        <span>Style Guides</span>
                                    </div>
                                    <div className="feature-item">
                                        <i className="fas fa-newspaper"></i>
                                        <span>Latest News</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
