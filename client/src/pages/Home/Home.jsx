import React, { useState, useEffect } from "react";
//Library import
import { Link } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import "swiper/swiper.min.css";
import "swiper/css/navigation";
import "swiper/css/pagination";

//Components import
import BannerCards from "./BannerCards";
import ShippingStrategy from "./ShippingStrategy";
import ProductCard from "../../components/ProductCard";

//Assets import
import slider1 from "../../assets/images/slider/slider1.jpg";
import slider2 from "../../assets/images/slider/slider2.jpg";
import slider3 from "../../assets/images/slider/slider3.jpg";
// import banner1 from "../assets/images/banner/banner1.jpg";
// import banner2 from "../assets/images/banner/banner2.jpg";
// import banner3 from "../assets/images/banner/banner3.jpg";

//config import
import { listBanner, listShippingProfit } from "./config";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

const Home = () => {
  console.log(process.env.REACT_APP_USER_URL);
  const [newProducts, setNewProducts] = useState([]);
  console.log(newProducts);
  useEffect(() => {
    let ignore = false;
    axios
      .get(`${process.env.REACT_APP_USER_URL}/latestProduct/`)
      .then(function (response) {
        if (!ignore) {
          if (response.data.status === "success")
            setNewProducts(response.data.products);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      {/* Slider start */}
      <div className="container carousel relative bg-black mx-auto">
        <div className="carousel-inner relative overflow-hidden">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
          >
            <SwiperSlide>
              <img src={slider1} alt="Slide1"></img>
            </SwiperSlide>
            <SwiperSlide>
              <img src={slider2} alt="Slide2"></img>
            </SwiperSlide>
            <SwiperSlide>
              <img src={slider3} alt="Slide3"></img>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      {/* Slider end */}

      {/* Banner start */}
      <div className="container mx-auto py-8 grid grid-cols-3 gap-1">
        {listBanner.map((banner) => (
          <BannerCards
            image={banner.image}
            key={banner.id}
            name={banner.image}
          />
        ))}
      </div>
      {/* Banner end */}

      {/* New Products start */}
      <div className="container mx-auto text-center py-8 bg-gray-100">
        <h1 className="font-bold text-3xl">Sản Phẩm Mới</h1>
      </div>
      <section className="container mx-auto">
        <Swiper
          freeMode={true}
          grabCursor={true}
          modules={[FreeMode]}
          className=""
          slidesPerView={5}
          spaceBetween={35}
        >
          {newProducts.map((item) => (
            <SwiperSlide className="py-8">
              <ProductCard
                key={item.ID}
                id={item.ID}
                image={item.Image}
                name={item.Name}
                price={item.Price}
                quantity={item.Quantity}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      {/* New Products end */}

      {/* Shipping start*/}
      <div className="container mx-auto py-8 grid grid-cols-4 gap-4 h-32 border-2 border-gray-200 mb-8">
        {listShippingProfit.map((item) => {
          return (
            <>
              <ShippingStrategy
                key={item.id}
                condition={item.condition}
                image={item.image}
                profit={item?.profit}
              />
            </>
          );
        })}
      </div>
      {/* Shipping end */}

      {/* Best selling products start */}
      <div className="container mx-auto text-center py-8 bg-gray-100">
        <h1 className="font-bold text-3xl">Sản Phẩm Bán Chạy</h1>
      </div>
      <section className="container mx-auto">
        <Swiper
          freeMode={true}
          grabCursor={true}
          modules={[FreeMode]}
          slidesPerView={5}
          spaceBetween={35}
        >
          {newProducts.map((item) => (
            <SwiperSlide className="py-8">
              <ProductCard
                image={item.Image}
                key={item.ID}
                name={item.Name}
                price={item.Price}
                id={item.ID}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      {/* Best selling products end */}
    </>
  );
};

export default Home;
