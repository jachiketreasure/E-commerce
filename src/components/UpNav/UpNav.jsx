import logo from '../images/logo.svg';
import "./UpNav.css"
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import SearchModal from '../SearchModal/SearchModal';

export default function UpNav() {
    const { isAuthenticated } = useAuth();
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setIsSearchModalOpen(true);
        }
    };
    
    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearchSubmit(e);
        }
    };
    
    const handleCloseSearchModal = () => {
        setIsSearchModalOpen(false);
        setSearchQuery('');
    };
    
    return (
        <>
            <nav className="navbar upnav navbar-slide">
                <div className="container-fluid container">
                    <a className="navbar-brand logo-container"><img src={logo} alt="Logo" className="main-logo" /></a>

                    {isAuthenticated && (
                        <form className="search-group d-flex" role="search" onSubmit={handleSearchSubmit}>
                            <div className="Ddown">
                                <button className="btn dropdown-toggle p-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    All categories
                                </button>
                                <ul className="dropdown-menu w-100">
                                    <li><a className="dropdown-item" href="#"><i className="fa-solid fa-arrow-right me-2"></i>UrbanSkirt</a></li>
                                    <li><a className="dropdown-item" href="#"><i className="fa-solid fa-arrow-right me-2"></i>Clothes</a></li>
                                    <li><a className="dropdown-item" href="#"><i className="fa-solid fa-arrow-right me-2"></i>velvetGown</a></li>
                                    <li><a className="dropdown-item" href="#"><i className="fa-solid fa-arrow-right me-2"></i>LushShorts</a></li>
                                    <li><a className="dropdown-item" href="#"><i className="fa-solid fa-arrow-right me-2"></i>Vintage</a></li>
                                    <li><a className="dropdown-item" href="#"><i className="fa-solid fa-arrow-right me-2"></i>Wedding</a></li>
                                    <li><a className="dropdown-item" href="#"><i className="fa-solid fa-arrow-right me-2"></i>Cotton</a></li>
                                    <li><a className="dropdown-item" href="#"><i className="fa-solid fa-arrow-right me-2"></i>Linen</a></li>
                                    <li><a className="dropdown-item" href="#"><i className="fa-solid fa-arrow-right me-2"></i>Navy</a></li>
                                    <li><a className="dropdown-item" href="#"><i className="fa-solid fa-arrow-right me-2"></i>Urban</a></li>
                                    <li><a className="dropdown-item" href="#"><i className="fa-solid fa-arrow-right me-2"></i>More</a></li>
                                </ul>
                            </div>
                            <div className='input-wrapper w-100'>
                                <input 
                                    className='input-search' 
                                    type="text" 
                                    placeholder="Search for products" 
                                    value={searchQuery}
                                    onChange={handleSearchInputChange}
                                    onKeyPress={handleKeyPress}
                                />
                            </div>
                            <div className="search-icon-wrapper">
                                <button type="submit" className="search-submit-btn">
                                    <i className="icon-search fa-solid fa-magnifying-glass fs-4"></i>
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </nav>
            
            {/* Search Modal */}
            <SearchModal 
                isOpen={isSearchModalOpen}
                onClose={handleCloseSearchModal}
                searchQuery={searchQuery}
            />
        </>
    )
}