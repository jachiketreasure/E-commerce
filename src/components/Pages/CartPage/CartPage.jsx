import { useCart } from '../../../CartContext/CartContext';
import Navbar from '../../Nav/Nav';
import './CartPage.css';
import cartPageImage from '../../images/CartPage.avif';
import { Link } from 'react-router-dom';


export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );


  return (
    <>
      <Navbar />
      <div className="cart-page">
        <div className="imageee" style={{ position: 'relative', width: '100%', height: '30vh' }}>
          <img src={cartPageImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              fontSize: '24px',
              fontWeight: 'bold',
              textShadow: '0 0 10px rgba(0,0,0,0.7)', // Shadow for better readability
            }}
          >
            <h1 className='fw-bold'>Shop Cart</h1>
            <h6 className='text-center'><Link style={{
              textDecoration: 'none',
              color: 'white'
            }} to="/">Home</Link> &gt; Login</h6>
          </div>
        </div>

        <div className="container py-5">
          {/* <h2 className="mb-4">🛒 for my Cart</h2> */}
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (

            <div className="cart-items container py-5">
              <div className="head-cart-page row align-items-center mb-3 fw-bold">
                <div className="col">Product</div>
                <div className="col-3 text-center">Quantity</div>
                <div className="col-2 text-end">Price</div>
                <div className="col-1"></div>
              </div>

              {cartItems.map((item) => (
                <div className="cart-item row align-items-center py-2 mb-3 border-bottom" key={item.id}>
                  <div className="col d-flex align-items-center">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="product-img"
                    />
                    <div className="ms-3">
                      <h5 className="mb-1" >{item.title}</h5>
                      <p className="text-muted mb-0" style={{ color: 'gray' }}>${item.price.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="updateQuantity col-3 text-center">
                    <button className="btn btn-sm btn-outline-secondary me-1" onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span className="px-2">{item.quantity}</span>
                    <button className="btn btn-sm btn-outline-secondary ms-1" onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>

                  <div className="col-2 text-end">
                    <strong style={{ color: 'gray' }}>${(item.price * item.quantity).toFixed(2)}</strong>
                  </div>

                  <div className="col-1 text-end">
                    <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item.id)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
              <div className='coupon'>
                <div className='w-50'>
                  <input type="text" placeholder='coupon code' style={{
                    backgroundColor: 'beige',
                    padding: '1% 2%',
                    borderRadius: '10px',
                    width: '40%',
                    margin: '1%',
                    border: '1px solid black'

                  }} />
                  <button style={{
                    marginLeft: '-5%',
                    backgroundColor: 'beige',
                    padding: '1% 2%',
                    borderRadius: '0 10px 10px 0',
                    borderLeft: 'none',
                    border: '1px solid black'
                  }}>
                    Apply coupon
                  </button>
                </div>
                <div className='w-50'>
                  <button
                    className='btn-copon'
                    style={{
                      backgroundColor: 'black',
                      color: 'white',
                      padding: '1.5% 4%',
                      borderRadius: '10px',
                      width: 'fit-content',
                      margin: '1%',
                      border: '1px solid black',
                      fontSize: '13px',
                      fontWeight: 'bold'
                    }}>UPDATE CART</button>
                </div>
              </div>

              <div className="row">
                <div className="col text-end">
                  <div><h4 className='fw-bold fs-2'>Total Price</h4></div>
                  <div><h5 className='fw-bold fs-3 '>${totalPrice.toFixed(2)}</h5></div>
                </div>
              </div>
            </div>

          )}
        </div>
      </div>

    </>
  );
}