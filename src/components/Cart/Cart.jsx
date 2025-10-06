import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../CartContext/CartContext'
import { useAuth } from '../../context/AuthContext';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './Cart.css';

export default function Cart() {
  const [likedProducts, setLikedProducts] = useState([]);
  const [mensProducts, setMensProducts] = useState([]);
  const [womensProducts, setWomensProducts] = useState([]);
  const [loadingMens, setLoadingMens] = useState(true);
  const [loadingWomens, setLoadingWomens] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="text-center py-5">
        <p className="lead">
          Please <a href="/Login">log in</a> to view our collections and add items to your cart.
        </p>
      </div>
    );
  }



  const cardColors = [
    'linear-gradient(135deg, #FAD6A5, #FFB6B9)',
    'linear-gradient(135deg, #A0CED9, #C8E4DC)',
    'linear-gradient(135deg, #C9BBCF, #FFE0AC)',
    'linear-gradient(135deg, #D4A5A5, #E5E5E5)',
    'linear-gradient(135deg, #F9844A, #FFB6B9)',
    'linear-gradient(135deg, #E2F0CB, #B3CBB9)',
  ];

  const randomColor = cardColors[Math.floor(Math.random() * cardColors.length)];
  const toggleLike = (id) => {
    setLikedProducts(prev =>
      prev.includes(id)
        ? prev.filter(pid => pid !== id)
        : [...prev, id]
    );
  };




  useEffect(() => {
    fetch('https://dummyjson.com/products/category/mens-shirts')
      .then(res => res.json())
      .then(data => {
        setMensProducts(data.products);
        setTimeout(() => setLoadingMens(false), 1000);
      })
      .catch(err => {
        console.error('Error fetching mens products:', err);
        setLoadingMens(false);
      });
  }, []);

  useEffect(() => {
    fetch('https://dummyjson.com/products/category/womens-dresses')
      .then(res => res.json())
      .then(data => {
        setWomensProducts(data.products);
        setLoadingWomens(false);
      })
      .catch(err => {
        console.error('Error fetching womens products:', err);
        setLoadingWomens(false);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };


  return (
    <div className="container py-4">
      {/* 👔 Men's Clothing */}
      <div className="head-sec d-flex justify-content-between">
        <div className='ms-3'>
          <h2 className="fw-bold m-0 ">Men's Collection</h2>
          <p className="text-muted m-0 ">Stylish and modern outfits for men</p>
        </div>
        <div className='me-3' style={{ width: '15%' }}>
          <button className='btn-sec p-2' style={{ backgroundColor: 'black', color: 'white', width: '100%', borderRadius: '10px' }} onClick={() => navigate('/MensProducts')}>View All</button>
        </div>
      </div>
      {loadingMens ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <Slider {...settings}>
          {mensProducts.map((item, index) => (
            <div key={item.id} className="p-2 position-relative">
              <p className='offer'>GET 20% OFF</p>
              <i className='trash fas fa-trash-can'></i>
              <i
                className={`heart fas fa-heart ${likedProducts.includes(item.id) ? 'text-danger' : ''}`}
                onClick={() => toggleLike(item.id)}
              ></i>

              <div
                className="card"
                style={{
                  background: cardColors[index % cardColors.length], // لون متغير
                  borderRadius: '10px'
                }}
              >
                <img
                  src={item.thumbnail}
                  className="card-img-top"
                  style={{ width: '100%', height: 'auto', borderRadius: '10px 10px 0 0' }}
                  alt={item.title}
                />
                <div className="card-body">
                  <div className='d-flex justify-content-between'>
                    <h5 className="card-title fw-bold" style={{ width: '70%', margin: '', minHeight: '50px' }}>{item.title}</h5>
                    <p className='fw-bold' style={{ width: '21%', margin: '1%' }}>
                      ${item.price}
                    </p>
                  </div>
                  <button className="buy-btn" onClick={() => setSelectedProduct(item)}>View Item</button>
                </div>
              </div>
            </div>
          ))}
        </Slider>

      )}

      {/* 👗 Women's Clothing */}
      <h2 className="fw-bold m-0 mt-5">Women's Collection</h2>
      <p className="text-muted m-0  mb-3">Stylish and modern outfits for wommen</p>
      {loadingWomens ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <Slider {...settings}>
          {womensProducts.map((item, index) => (
            <div key={item.id} className="p-2 col-12 col-sm-6 col-md-4 col-lg-3 position-relative">
              <p className='offer'>GET 20% OFF</p>
              <i className='trash fas fa-trash-can'></i>
              <i
                className={`heart fas fa-heart ${likedProducts.includes(item.id) ? 'text-danger' : ''}`}
                onClick={() => toggleLike(item.id)}
              ></i>

              <div
                className="card"
                style={{
                  background: cardColors[index % cardColors.length], // لون متغير
                  borderRadius: '10px'
                }}
              >
                <img
                  src={item.thumbnail}
                  className="card-img-top"
                  alt={item.title}
                  style={{ borderRadius: '10px 10px 0 0' }}
                />
                <div className="card-body">
                  <div className='d-flex justify-content-between'>
                    <h5 className="card-title fw-bold" style={{ width: '70%', margin: '', minHeight: '50px' }}>{item.title}</h5>
                    <p className='fw-bold' style={{ width: '21%', margin: '1%' }}>
                      ${item.price}
                    </p>
                  </div>
                  <button className="buy-btn" onClick={() => setSelectedProduct(item)}>View Item</button>
                </div>
              </div>
            </div>
          ))}
        </Slider>


      )}

      {/*The modal appears only when selectedProduct is not null. */}
      {selectedProduct && (
        <>
          <button type="button" className="btn-close" aria-label="Close" onClick={() => setSelectedProduct(null)} />
          {/* the background */}⭐
          <div className="modal-backdrop fade show"></div>

          {/* The modal content */}
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-modal="true" role="dialog">


            <div className="modall">

              <div className="image-modall d-flex justify-content-between position-relative" style={{
                backgroundColor: 'white',
                width: '90%',
                maxWidth: '700px',
                height: 'auto',
                borderRadius: '20px',
                flexDirection: window.innerWidth < 768 ? 'column' : 'row'
              }}
              >
                <div className='image-product me-5 ' style={{
                  background: randomColor,
                  borderRadius: '20px 0 0 20px'
                }}>
                  <img className='' src={selectedProduct.thumbnail} alt="" />
                </div>
                <div className="content-modall w-50 m-auto py-3">
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setSelectedProduct(null)} />

                  <p className='px-2 py-1 my-2 text-light fw-bold' style={{ backgroundColor: 'black', borderRadius: '20px', fontSize: '12px', width: 'fit-content' }}>SALE 20% OFF</p>
                  <h3 className='fw-bold'>{selectedProduct.title}</h3>
                  <p className='fw-meduim' style={{ fontSize: '13px' }} >Rating: <i class="fa-solid fa-star"></i> {selectedProduct.rating}</p>
                  <p style={{ fontSize: '14px' }}>{selectedProduct.description}</p>
                  <p className='' style={{ fontSize: '20px' }}><strong>Price:</strong> ${selectedProduct.price}</p>
                  <button className="m-1 px-2 py-1 btn-1-modall" type="button" onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null); // close the modal after adding to cart
                  }}
                    style={{ backgroundColor: 'black', color: 'white', borderRadius: '10px', fontSize: '15px' }}>ADD TO CART</button>
                  <button className="m-1 px-2 py-1 btn-2-modall" onClick={()=>{setSelectedProduct(null)}} type="button" style={{ backgroundColor: 'white', color: 'black', borderRadius: '10px', fontSize: '15px' }}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}