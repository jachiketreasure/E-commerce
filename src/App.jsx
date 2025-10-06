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
import ProtectedRoute from './components/Pages/CartPage/CartPage';

function App() {
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
      </Routes> 
      <Footer/>
    </>
  );
}

export default App;