import AutoSwiper from '../../../components/Slider';
import Cart from '../../Cart/Cart';
import Category from '../../Category/Category';
import HeroSection from '../../HeroSection/Hero';
import { useAuth } from "../../../context/AuthContext";
import Navbar from '../../Nav/Nav';
import UpNav from '../../UpNav/UpNav';

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <UpNav />
      <Navbar />
      <HeroSection />
       {!isAuthenticated ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
          <div className="text-center p-5 shadow rounded-4" style={{ backgroundColor: "white", maxWidth: "400px" }}>
            <h2 className="fw-bold mb-3">Welcome Back!</h2>
            <p className="text-muted mb-4">
              Please log in to explore our exclusive collections and shop your favorite items.
            </p>
            <a href="/Login" className="btn btn-dark px-4 py-2 rounded-pill">
              Log In
            </a>
          </div>
        </div>
      ) : (
        <>
      <Category />

     
          <Cart />
          <AutoSwiper />
        </>
      )}
    </>
  );
}
