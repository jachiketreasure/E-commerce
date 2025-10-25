import React from 'react';
import './PostLayout.css';

export default function PostLayout() {
    return (
        <div className="post-layout-page">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10 col-12">
                        <div className="post-layout-header text-center">
                            <h1 className="post-layout-title">Post Layout</h1>
                            <p className="post-layout-subtitle">
                                Discover our curated content layouts and design templates for your posts.
                            </p>
                        </div>
                        
                        <div className="post-layout-content">
                            <div className="coming-soon-card">
                                <div className="coming-soon-icon">
                                    <i className="fas fa-layer-group"></i>
                                </div>
                                <h2>Coming Soon!</h2>
                                <p>
                                    We're developing beautiful post layouts and templates to enhance your content experience. 
                                    Stay tuned for amazing design options!
                                </p>
                                <div className="layout-features">
                                    <div className="feature-item">
                                        <i className="fas fa-th-large"></i>
                                        <span>Grid Layouts</span>
                                    </div>
                                    <div className="feature-item">
                                        <i className="fas fa-columns"></i>
                                        <span>Column Designs</span>
                                    </div>
                                    <div className="feature-item">
                                        <i className="fas fa-magic"></i>
                                        <span>Custom Templates</span>
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
