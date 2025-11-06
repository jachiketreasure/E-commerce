import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Nav from './components/Nav/Nav';
import Home from './components/Pages/Home/Home';
import Shop from './components/Pages/Shop/Shop';
import Login from './components/Pages/Login/Login';
import UpNav from './components/UpNav/UpNav';
import Footer from './components/Footer/Footer';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Register from './components/Pages/Register/Register';
import AllProducts from './components/AllProducts/AllProducts';
import MensProducts from './components/MensProducts/MensProducts';
import WomensProducts from './components/WomenProducts/WomenProducts';
import CartPage from './components/Pages/CartPage/CartPage';
import Checkout from './components/Pages/Checkout/Checkout';
import OrderSuccess from './components/Pages/OrderSuccess/OrderSuccess';
import OrderHistory from './components/Pages/OrderHistory/OrderHistory';
import Blog from './components/Pages/Blog/Blog';
import PostLayout from './components/Pages/PostLayout/PostLayout';
import PrivacyPolicy from './components/Pages/PrivacyPolicy/PrivacyPolicy';
import Returns from './components/Pages/Returns/Returns';
import TermsConditions from './components/Pages/TermsConditions/TermsConditions';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import './App.css';

function App() {
  const { isAuthenticated } = useAuth();
  
  const handleWhatsAppSupport = () => {
    const phoneNumber = "+2349135663829";
    const message = "Hello! I need support with my order.";
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\+/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Shop" element={<ProtectedRoute><Shop /></ProtectedRoute>}/>
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/AllProducts" element={<ProtectedRoute><AllProducts /></ProtectedRoute>}/>
        <Route path="/MensProducts" element={<ProtectedRoute><MensProducts /></ProtectedRoute>}/>
        <Route path="/WomensProducts" element={<ProtectedRoute><WomensProducts /></ProtectedRoute>}/>
        <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>}/>
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>}/>
        <Route path="/order-success/:orderId" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>}/>
        <Route path="/order-history" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>}/>
        <Route path="/blog" element={<Blog />} />
        <Route path="/layout" element={<PostLayout />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="*" element={<Home />} />
      </Routes> 
      {isAuthenticated && <Footer/>}
      <div className="floating1-button" onClick={handleWhatsAppSupport} style={{ cursor: 'pointer' }}>
        <span className="icon"><i className="fa-brands fa-whatsapp"></i></span>
        <span className="label">SUPPORT</span>
      </div>
    </>
  );
}

export default App;