// Slider.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';



import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import s1 from './images/slide1.jpg';
// import s2 from './images/slide2.jpg';
// import s3 from './images/slide3.jpg';
// import s4 from './images/slide4.jpg';


export default function AutoSwiper() {
    return (
        <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
        >
            {/* <SwiperSlide><img src={s1} alt="Slide 1" style={{ marginTop: '15px', width: '100%', height: '90vh', }} /></SwiperSlide> */}

            {/* <SwiperSlide><img src={s2} alt="Slide 2" style={{ marginTop: '15px', width: '100%', height: '90vh',}} /></SwiperSlide> */}

            {/* <SwiperSlide><img src={s3} alt="Slide 3" style={{ marginTop: '15px', width: '100%', height: '90vh', }} /></SwiperSlide>
            <SwiperSlide><img src={s4} alt="Slide 3" style={{ marginTop: '15px', width: '100%', height: '90vh', }} /></SwiperSlide> */}
        </Swiper>
    );
}