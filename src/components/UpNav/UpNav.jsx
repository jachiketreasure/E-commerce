import logo from '../images/logo.svg';
import "./UpNav.css"
import { useAuth } from '../../context/AuthContext';

export default function UpNav() {
    const { isAuthenticated } = useAuth();
    
    return (
        <>
            <nav className="navbar upnav navbar-slide">
                <div className="container-fluid container">
                    <a className="navbar-brand"><img src={logo} alt="Logo" style={{ height: "62px" }} /></a>

                    {isAuthenticated && (
                        <form className="search-group d-flex" role="search">
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
                                <input className='input-search' type="text" placeholder="Search for products" />
                            </div>
                            <div className="search-icon-wrapper">
                                <i className="icon-search fa-solid fa-magnifying-glass fs-4"></i>
                            </div>
                        </form>
                    )}
                </div>
            </nav>
        </>
    )
}