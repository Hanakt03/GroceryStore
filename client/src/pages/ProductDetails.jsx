import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
//Library import
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import axios from "axios";
import ProductCard from "../components/ProductCard";
//Utils import
import { checkStatus } from "../utils/showStatus";
import "swiper/swiper.min.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const ProductDetails = () => {
  const { idProduct } = useParams();
  let listCart = [];
  const [productDetails, setProductDetails] = useState({});
  const [idCate, setIdCate] = useState(0);

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [count, setCount] = useState(1);

  const addCount = () => {
    setCount((prev) => prev + 1);
  };
  const minusCount = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  };

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      axios
        .get(`${process.env.REACT_APP_USER_URL}/product/${idProduct}`)
        .then(function (response) {
          if (!ignore) {
            if (response.data.status === "success") {
              console.log(response.data);
              setProductDetails(response.data.product);
              setIdCate(response.data.product.ID_Category);
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    fetchData();
    if (idCate !== 0) {
      axios
        .get(
          `${process.env.REACT_APP_USER_URL}/product/${idProduct}/cate/${idCate}`
        )
        .then(function (response) {
          if (!ignore) {
            console.log(response);

            if (response.data.status === "success")
              setRelatedProducts(response.data.products);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    return () => {
      ignore = true;
    };
  }, [idCate]);

  const handleAddToCart = () => {
    if (count > productDetails.Quantity) {
      alert("Bạn nhập quá số lượng sản phẩm đang có");
      setCount(1);
    } else {
      if (localStorage.getItem("cart") === null) {
        localStorage.setItem(
          "cart",
          JSON.stringify([
            {
              ...productDetails,
              currentQuantity: productDetails.Quantity,
              Quantity: count,
              totalPrice: count * productDetails.Price,
            },
          ])
        );
      } else {
        let flag = 0;
        listCart = JSON.parse(localStorage.getItem("cart"));

        listCart.map((cart) => {
          if (cart.ID === parseInt(idProduct)) {
            flag++;
            if (productDetails.Quantity <= parseInt(cart.Quantity) + count) {
              alert("Bạn nhập quá số lượng sản phẩm đang có");
            } else {
              alert("Thêm giỏ hàng thành công!!!");
              cart.Quantity = parseInt(cart.Quantity) + count;
              localStorage.setItem("cart", JSON.stringify(listCart));
              window.location.href = "/Product/?Page=1";
            }
          }
        });
        if (flag === 0) {
          alert("Thêm giỏ hàng thành công");
          listCart.push({
            ...productDetails,
            currentQuantity: productDetails.Quantity,
            Quantity: count,
            totalPrice: count * productDetails.Price,
          });
          localStorage.setItem("cart", JSON.stringify(listCart));
          window.location.href = "/Product/?Page=1";
        }
      }
    }
  };

  return (
    <>
      <div className="container mx-auto bg-gray-100 px-5 py-3 rounded-md ">
        <ol className="list-reset flex">
          <li>
            <Link to="/" class="text-blue-600 hover:text-blue-700">
              Trang chủ
            </Link>
          </li>
          <li>
            <span className="text-gray-500 mx-2">/</span>
          </li>
          <li className="text-gray-500">Chi tiết sản phẩm</li>
        </ol>
      </div>
      <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4 ">
        <div className="xl:w-2/6 lg:w-2/5 w-80">
          <img alt="#" src={productDetails.Image} />
        </div>
        <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
          <div>
            <h1 className="lg:text-2xl text-xl lg:leading-6 leading-7 mt-2 font-bold">
              {productDetails.Name}
            </h1>
          </div>

          <div className="py-4 border-b border-gray-200 flex items-center justify-between">
            <p className="text-base leading-4 font-bold">Nhà sản xuất</p>
            <div className="flex items-center justify-center">{`${productDetails.ProducerName}`}</div>
          </div>
          <div className="py-4 border-b border-gray-200 flex items-center justify-between">
            <p className="text-base leading-4 font-bold">Tình trạng</p>
            <div className="flex items-center justify-center font-bold">{`${checkStatus(
              productDetails.Quantity
            )}`}</div>
          </div>
          <div className="py-4 border-b border-gray-200 flex items-center justify-between">
            <p className="text-base leading-4 font-bold">Số lượng:</p>
            <div className="flex items-center justify-center">
              <span
                onClick={minusCount}
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border border-gray-300 border-r-0 w-7 h-7 flex items-center justify-center pb-1"
              >
                -
              </span>
              <input
                id="counter"
                aria-label="input"
                className="border border-gray-300 h-full text-center w-14 pb-1"
                type="text"
                value={count}
                onChange={(e) => e.target.value}
              />
              <span
                onClick={addCount}
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border border-gray-300 border-l-0 w-7 h-7 flex items-center justify-center pb-1 "
              >
                +
              </span>
            </div>
          </div>
          <div className="py-4 flex bg-gray-100">
            <p className="text-4xl font-bold text-green-600 cursor-auto mx-2">
              {`${productDetails.Price}đ`}
            </p>
            <del>
              <p className="text-xl text-gray-600 cursor-auto ml-2 mt-2 mx-2">
                25.000đ
              </p>
            </del>
          </div>
          <button
            onClick={() => handleAddToCart()}
            className=" focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 text-base flex items-center justify-center leading-none text-white bg-green-600 w-full py-4 mt-2 hover:bg-blue-600"
          >
            Thêm vào giỏ hàng
          </button>
          <div className="py-4 flex">
            <p className="text-base cursor-auto font-bold">Mô tả sản phẩm:</p>
          </div>
          <div className="text-base text-justify pb-4">
            {console.log(productDetails.Description)}
            <p>
              {!productDetails.Description
                ? "Sẽ cập nhật sau"
                : productDetails.Description}
            </p>
          </div>
        </div>
      </div>

      {/* Best related products start */}

      <div className="container mx-auto text-center py-8 bg-gray-100">
        <h1 className="font-bold text-3xl">Sản Phẩm Bán Chạy</h1>
      </div>
      {relatedProducts.length > 0 ? (
        <section className="container mx-auto">
          <Swiper
            freeMode={true}
            grabCursor={true}
            modules={[FreeMode]}
            slidesPerView={5}
          >
            {relatedProducts.map((item) => (
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
      ) : (
        <div>Mặt hàng chưa có nhiều sản phẩm cùng loại</div>
      )}
    </>
  );
};

export default ProductDetails;
