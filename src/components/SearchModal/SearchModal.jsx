import React, { useState, useEffect } from 'react';
import './SearchModal.css';
import { fetchAllProducts, fetchMenProducts, fetchWomenProducts, fetchWomenShoesProducts } from '../../api/products';

const SearchModal = ({ isOpen, onClose, searchQuery }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [allProducts, setAllProducts] = useState([]);

    // Fetch all website products when component mounts
    useEffect(() => {
        const fetchWebsiteProducts = async () => {
            try {
                console.log('Starting to fetch website products...');
                
                const [allProductsData, menProductsData, womenProductsData, womenShoesData] = await Promise.all([
                    fetchAllProducts(),
                    fetchMenProducts(),
                    fetchWomenProducts(),
                    fetchWomenShoesProducts()
                ]);

                console.log('Raw fetched data:', {
                    allProducts: allProductsData,
                    menProducts: menProductsData,
                    womenProducts: womenProductsData,
                    womenShoes: womenShoesData
                });

                // Combine all products from different categories
                const combinedProducts = [
                    ...(allProductsData || []),
                    ...(menProductsData || []),
                    ...(womenProductsData || []),
                    ...(womenShoesData || [])
                ];

                // Remove duplicates based on product ID
                const uniqueProducts = combinedProducts.filter((product, index, self) => 
                    product && product.id && index === self.findIndex(p => p && p.id === product.id)
                );

                console.log('Fetched products:', {
                    allProducts: (allProductsData || []).length,
                    menProducts: (menProductsData || []).length,
                    womenProducts: (womenProductsData || []).length,
                    womenShoes: (womenShoesData || []).length,
                    combined: combinedProducts.length,
                    unique: uniqueProducts.length
                });
                
                setAllProducts(uniqueProducts);
            } catch (err) {
                console.error('Error fetching website products:', err);
                setError('Failed to load products');
            }
        };

        fetchWebsiteProducts();
    }, []);

    const performSearch = (query) => {
        console.log('Performing search:', { query, allProductsCount: allProducts.length });
        
        if (!query.trim() || allProducts.length === 0) {
            console.log('No search - empty query or no products');
            setSearchResults([]);
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Search through website products only
            const filteredProducts = allProducts.filter(product => {
                try {
                    return (
                        (product.title && product.title.toLowerCase().includes(query.toLowerCase())) ||
                        (product.brand && product.brand.toLowerCase().includes(query.toLowerCase())) ||
                        (product.category && product.category.toLowerCase().includes(query.toLowerCase())) ||
                        (product.description && product.description.toLowerCase().includes(query.toLowerCase()))
                    );
                } catch (err) {
                    console.error('Error filtering product:', product, err);
                    return false;
                }
            });

            console.log('Search results:', filteredProducts.length, 'products found');
            setSearchResults(filteredProducts);
        } catch (err) {
            console.error('Search error:', err);
            setError('Search failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log('Search effect triggered:', { isOpen, searchQuery, allProductsCount: allProducts.length });
        if (isOpen && searchQuery) {
            if (allProducts.length > 0) {
                performSearch(searchQuery);
            } else {
                // If products haven't loaded yet, show loading state
                setLoading(true);
                setError('');
                setSearchResults([]);
            }
        }
    }, [isOpen, searchQuery, allProducts]);

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
        // Navigate to product details page
        window.location.href = `/product/${product.id}`;
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
                            <small>Try different keywords or check your spelling. Only products from our website are shown.</small>
                        </div>
                    ) : (
                        <div className="search-results">
                            <div className="search-results-header">
                                <p>Found {searchResults.length} product{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"</p>
                                <small>Showing products from our website</small>
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
