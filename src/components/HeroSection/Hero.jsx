import image from '../images/pic1.png'
import './Hero.css'

export default function HeroSection() {
    const handleWhatsAppSupport = () => {
        const phoneNumber = "+2349135663829";
        const message = "Hello! I need support with my order.";
        const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\+/g, '')}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <>
            <div className="container">
                <div className="floating1-button" onClick={handleWhatsAppSupport} style={{ cursor: 'pointer' }}>
                    <span className="icon"><i className="fa-brands fa-whatsapp"></i></span>
                    <span className="label">SUPPORT</span>
                </div>
                <div className="floating2-button">
                    <span className="icon"><i className="fa-solid fa-headphones"></i></span>
                    <span className="label">BUY NOW</span>
                </div>

                <div className="main d-flex justify-content-between" style={{ marginTop: '2.2rem' }}>
                    <div className="text-main slide-in-left" style={{ marginTop: '5rem' }}>
                        <h1 className='fw-bolder' style={{ fontSize: '70px' }}>Your Ultimate</h1>
                        <h1 className='fw-bold' style={{ fontSize: '70px', color: '#cc0d39' }}>
                            <span className='me-2' style={{ fontSize: '80px' }}>✦</span>
                            Online Store
                        </h1>
                        <h1 className='fw-bold' style={{ fontSize: '70px' }}>For All Your Needs.</h1>
                        <h3>No Referal code needed. Plus free shippng on <span style={{ color: '#cc0d39' }}>$99+</span> orders!</h3>
                        <div className="button pt-5">
                        </div>
                    </div>
                    <div className="image-main slide-in-right">
                        <div className="star star1">✦</div>
                        <div className="star star2">✦</div>
                        <div className="star star3">✦</div>
                        <div className="bg-shape"></div>
                        <div className="image">

                            <img src={image} alt="image" style={{ width: '100%', maxWidth: '450px', height: 'auto' }} />


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}