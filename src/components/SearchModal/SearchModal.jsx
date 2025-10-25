import React, { useState, useEffect } from 'react';
import './SearchModal.css';

const SearchModal = ({ isOpen, onClose, searchQuery }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const performSearch = async (query) => {
        setLoading(true);
        setError('');
        
        try {
            // Search in the dummy API
            const response = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=20`);
            const data = await response.json();
            
            if (data.products) {
                setSearchResults(data.products);
            } else {
                setSearchResults([]);
            }
        } catch (err) {
            console.error('Search error:', err);
            setError('Failed to search products. Please try again.');
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen && searchQuery) {
            performSearch(searchQuery);
        }
    }, [isOpen, searchQuery]);

    useEffect(() => {
        const handleEscapeKey = (e) => {
            if (e.key === 'Escape' && isOpen) {
                handleClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleClose = () => {
        setSearchResults([]);
        setError('');
        onClose();
    };

    const handleProductClick = (product) => {
        // Navigate to product details or handle product selection
        console.log('Selected product:', product);
        handleClose();
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div className="search-modal-backdrop" onClick={handleClose}></div>
            
            {/* Modal */}
            <div className="search-modal">
                <div className="search-modal-header">
                    <h3>Search Results</h3>
                    <button className="search-modal-close" onClick={handleClose}>
                        <i className="fa-solid fa-times"></i>
                    </button>
                </div>
                
                <div className="search-modal-content">
                    {loading ? (
                        <div className="search-loading">
                            <i className="fa-solid fa-spinner fa-spin"></i>
                            <p>Searching products...</p>
                        </div>
                    ) : error ? (
                        <div className="search-error">
                            <i className="fa-solid fa-exclamation-triangle"></i>
                            <p>{error}</p>
                        </div>
                    ) : searchResults.length === 0 ? (
                        <div className="search-no-results">
                            <i className="fa-solid fa-search"></i>
                            <p>No products found for "{searchQuery}"</p>
                            <small>Try different keywords or check your spelling</small>
                        </div>
                    ) : (
                        <div className="search-results">
                            <div className="search-results-header">
                                <p>Found {searchResults.length} product{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"</p>
                            </div>
                            
                            <div className="search-results-grid">
                                {searchResults.map((product) => (
                                    <div 
                                        key={product.id} 
                                        className="search-result-item"
                                        onClick={() => handleProductClick(product)}
                                    >
                                        <div className="search-result-image">
                                            <img 
                                                src={product.thumbnail} 
                                                alt={product.title}
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="search-result-info">
                                            <h4 className="search-result-title">{product.title}</h4>
                                            <p className="search-result-brand">{product.brand}</p>
                                            <p className="search-result-price">${product.price}</p>
                                            <div className="search-result-rating">
                                                <span className="rating-stars">
                                                    {'★'.repeat(Math.floor(product.rating))}
                                                    {'☆'.repeat(5 - Math.floor(product.rating))}
                                                </span>
                                                <span className="rating-value">({product.rating})</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default SearchModal;
