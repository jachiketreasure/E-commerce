import { useEffect, useState } from 'react';
import { fetchMenProducts } from '../../api/products';
import UpNav from '../UpNav/UpNav';
import Navbar from '../Nav/Nav';
import { useCart } from '../../CartContext/CartContext';
import CommentModal from '../CommentModal/CommentModal';

export default function MensProducts() {
    const { addToCart } = useCart();
    const [likedProducts, setLikedProducts] = useState([]);
    const [productsMen, setProductsMen] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [selectedProductForComment, setSelectedProductForComment] = useState(null);
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

    const handleCommentClick = (product) => {
        setSelectedProductForComment(product);
        setIsCommentModalOpen(true);
    };

    const handleCloseCommentModal = () => {
        setIsCommentModalOpen(false);
        setSelectedProductForComment(null);
    };

    useEffect(() => {
        fetchMenProducts().then(data => setProductsMen(data));
    }, [])

    useEffect(() => {
        fetchMenProducts()
            .then(data => {
                setProductsMen(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch products:", err);
                setLoading(false);
            });
    }, []);
    return (
        <>
            <UpNav />
            <Navbar />
            <div className="container">


                <div className="row">
                    <h2 className="fw-bold m-0 text-center">Men's Collection</h2>
                    <p className="text-muted m-0 text-center mb-3">Stylish and modern outfits for men</p>

                    {productsMen.map((item, index) => (
                        <div key={item.id} className="p-2 col-12 col-sm-6 col-md-4 col-lg-3 position-relative">
                            <p className='offer'>GET 20% OFF</p>
                            <i
                                className={`heart fas fa-heart ${likedProducts.includes(item.id) ? 'text-danger' : ''}`}
                                onClick={() => toggleLike(item.id)}
                            ></i>

                            <div
                                className="card"
                                style={{
                                    background: cardColors[index % cardColors.length],
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
                </div>
                {selectedProduct && (
                    <>
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => setSelectedProduct(null)} />
                        
                        <div className="modal-backdrop fade show"></div>

                        
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
                                            setSelectedProduct(null);
                                        }}
                                            style={{ backgroundColor: 'black', color: 'white', borderRadius: '10px', fontSize: '15px' }}>ADD TO CART</button>
                                        <button className="m-1 px-2 py-1 btn-2-modall" onClick={()=>{setSelectedProduct(null)}} type="button" style={{ backgroundColor: 'white', color: 'black', borderRadius: '10px', fontSize: '15px' }}>Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                <CommentModal
                    isOpen={isCommentModalOpen}
                    onClose={handleCloseCommentModal}
                    productId={selectedProductForComment?.id}
                    productTitle={selectedProductForComment?.title}
                />

            </div>

        </>
    );
}