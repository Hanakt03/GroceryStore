import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const ShoppingCart = () => {
  let totalPrice = 0,
    totalQuantity = 0,
    orderId = 0;
  let tempQuantity = [];
  const navigate = useNavigate();
  const [listCart, setListCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [user, setUser] = useState({});
  const [quantityProduct, setQuantityProduct] = useState([]);

  const [shipLocation, setShipLocation] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    let ignore = false;

    if (localStorage.getItem("token") !== null) {
      axios
        .post(
          `${process.env.REACT_APP_USER_URL}/user`,
          localStorage.getItem("token"),
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(function (response) {
          if (!ignore) {
            if (response.data.status === "success") {
              // setIdUserApi(response.data.user.ID);
              setUser(response.data.user);
              setShipLocation(response.data.user.Address);
            }
          }
        })
        .catch(function (error) {
          console.log(error);
          localStorage.removeItem("token");
        });
    }

    return () => {
      ignore = true;
    };
  }, []);
  for (let i = 0; i < listCart.length; i++) {
    tempQuantity.push(listCart[i].Quantity);
    quantityProduct.push(listCart[i].Quantity);
  }
  const addCount = (index) => {
    tempQuantity[index]++;
    listCart[index].Quantity = tempQuantity[index];
    console.log(tempQuantity);

    localStorage.setItem("cart", JSON.stringify(listCart));
    setQuantityProduct(tempQuantity);
  };

  const minusCount = (index) => {
    tempQuantity[index]--;
    if (tempQuantity[index] < 1) {
      tempQuantity[index] = 1;
    }
    listCart[index].Quantity = tempQuantity[index];
    console.log(tempQuantity);
    localStorage.setItem("cart", JSON.stringify(listCart));
    setQuantityProduct(tempQuantity);
  };

  const handleDelete = (index) => {
    const decision = window.confirm("Bạn có xóa sản phẩm này không?");
    if (decision) {
      listCart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(listCart));
      alert("Xóa thành công");
      window.location.reload();
    }
  };

  const handlePayment = async () => {
    if (Object.keys(user).length > 0) {
      if (shipLocation !== "") {
        await axios
          .post(`${process.env.REACT_APP_USER_URL}/checkout`, {
            idCustomer: user.ID,
            totalPrice,
            totalQuantity,
            location: shipLocation,
            shipNote: note,
          })
          .then(function (response) {
            console.log("add success");
            orderId = response.data.id;
          })
          .catch(function (error) {
            console.log("Error");
          });

        if (orderId !== 0) {
          listCart.map(async (cart, index) => {
            if (quantityProduct[index] > parseInt(cart.currentQuantity)) {
              alert("Bạn đang nhập quá số lượng đang có");
            } else {
              await axios
                .post(`${process.env.REACT_APP_USER_URL}/detail/${orderId}`, {
                  idProduct: cart.ID,
                  quantity: quantityProduct[index],
                  price: cart.Price * cart.Quantity,
                })
                .then(function (response) {
                  console.log("Response " + index);
                })
                .catch(function (error) {
                  console.log("Error " + index);
                });
              axios
                .put(
                  `${process.env.REACT_APP_USER_URL}/product/${cart.ID}/amount/${quantityProduct[index]}`
                )
                .then(function (response) {
                  console.log(response);
                })
                .catch(function (error) {
                  console.log(error);
                });
              alert("Thanh toán thành công");
              localStorage.removeItem("cart");
              window.location.href = "/";
            }
          });
        } else {
          alert("Quá trình thanh toán thất bại!");
        }
      } else {
        alert("Mời bạn nhập địa chỉ giao hàng");
      }
    } else {
      alert("Mời bạn đăng nhập mới có thể thanh toán");
      navigate("/Signin");
    }
  };

  return (
    <>
      <div className="container mx-auto bg-gray-100 px-5 py-3 rounded-md">
        <ol className="list-reset flex">
          <li>
            <Link to="/Home" className="text-blue-600 hover:text-blue-700">
              Trang chủ
            </Link>
          </li>
          <li>
            <span className="text-gray-500 mx-2">/</span>
          </li>
          <li className="text-gray-500">Giỏ hàng</li>
        </ol>
      </div>
      <div className="container mx-auto bg-gray-300">
        <div className="py-12">
          <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg md:max-w-5xl">
            <div className="md:flex">
              <div className="w-full p-4 px-5 py-5">
                <div>
                  <div className="col-span-2 p-5">
                    <h1 className="text-3xl pb-4 scroll-mx-0.5 font-bold">
                      Shopping Cart
                    </h1>
                    {listCart.length === 0 ? (
                      <div>Không có giỏ hàng mời bạn mua thêm</div>
                    ) : (
                      <>
                        <div className="w-full grid grid-cols-3 gap-5">
                          <div className="col-span-2">
                            <div className="h-64 overflow-auto">
                              {listCart.map((cart, index) => {
                                totalPrice += cart.Price * cart.Quantity;
                                totalQuantity += cart.Quantity;
                                return (
                                  <>
                                    <div
                                      key={cart.ID}
                                      className="flex justify-between items-center mt-6 pt-6 pr-5"
                                    >
                                      <div className="flex items-center">
                                        <img
                                          src={`/product/${cart.Image}`}
                                          width="100"
                                          className="rounded-full"
                                          alt=""
                                        />
                                        <div className="flex flex-col ml-3">
                                          <span className="text-base font-bold">
                                            {cart.Name}
                                          </span>
                                          <span className="text-base font-light text-gray-400">
                                            {cart.CategoryName}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="flex justify-center items-center">
                                        <div className="pr-12 flex ">
                                          <span
                                            onClick={() => minusCount(index)}
                                            className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border border-gray-300 border-r-0 w-7 h-7 flex items-center justify-center pb-1"
                                          >
                                            -
                                          </span>
                                          <input
                                            id="counter"
                                            aria-label="input"
                                            className="border border-gray-300 h-full text-center w-14 pb-1"
                                            type="text"
                                            value={quantityProduct[index]}
                                            onChange={(e) => e.target.value}
                                          />
                                          <span
                                            onClick={() => addCount(index)}
                                            className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border border-gray-300 border-l-0 w-7 h-7 flex items-center justify-center pb-1 "
                                          >
                                            +
                                          </span>
                                        </div>
                                        <div className="pr-12">
                                          <span
                                            about="totalPrice"
                                            id="test"
                                            className="text-base font-medium"
                                          >
                                            {cart.Price * cart.Quantity}
                                          </span>
                                        </div>
                                        <div>
                                          <FontAwesomeIcon
                                            onClick={() => handleDelete(index)}
                                            icon={faTrashCan}
                                            size="xl"
                                            color="green"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                );
                              })}
                            </div>
                            <div className="flex flex-col md:w-full">
                              <h2 className="my-8 font-bold text-xl text-heading text-green-600">
                                Thông tin giao hàng
                              </h2>

                              <div className="">
                                <div className="w-full">
                                  <label
                                    for="firstName"
                                    className="block mb-3 text-base font-semibold "
                                  >
                                    Họ & Tên
                                  </label>
                                  <input
                                    name="firstName"
                                    value={user.Name}
                                    disabled
                                    type="text"
                                    className="w-full px-4 py-3 text-base border border-green-600 rounded lg:text-base focus:outline-none focus:ring-1 focus:ring-blue-600"
                                  />
                                </div>

                                <div className="mt-4">
                                  <div className="w-full">
                                    <label className="block mb-3 text-base font-semibold ">
                                      Email
                                    </label>
                                    <input
                                      disabled
                                      value={user.Email}
                                      type="text"
                                      className="w-full px-4 py-3 text-base border border-green-600 rounded lg:text-base focus:outline-none focus:ring-1 focus:ring-blue-600"
                                    />
                                  </div>
                                </div>
                                <div className="mt-4">
                                  <div className="w-full">
                                    <label className="block mb-3 text-base font-semibold">
                                      Địa chỉ
                                    </label>
                                    <input
                                      type="text"
                                      value={shipLocation}
                                      onChange={(e) =>
                                        setShipLocation(e.target.value)
                                      }
                                      className="w-full px-4 py-3 text-base border border-green-600 rounded lg:text-base focus:outline-none focus:ring-1 focus:ring-blue-600"
                                    />
                                  </div>
                                </div>

                                <div className="flex items-center mt-4">
                                  <label className="flex items-center text-base group text-heading">
                                    <input
                                      type="checkbox"
                                      className="w-5 h-5 border border-green-600 rounded focus:outline-none focus:ring-1"
                                    />
                                    <span className="ml-2">
                                      Lưu thông tin này cho lần sau
                                    </span>
                                  </label>
                                </div>
                                <div className="relative pt-3 xl:pt-6">
                                  <label
                                    for="note"
                                    className="block mb-3 text-base font-semibold "
                                  >
                                    Ghi chú
                                  </label>
                                  <textarea
                                    name="note"
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    className="flex items-center w-full px-4 py-3 text-base border border-green-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                                    rows="3"
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className=" col-span-1 p-5 bg-gray-800 rounded overflow-visible">
                            <div>
                              <p className="text-2xl font-black leading-9 text-gray-500 dark:text-white pt-5">
                                Tổng tiền
                              </p>
                              <div className="flex items-center justify-between pt-16">
                                <p className="text-base leading-none text-white">
                                  Tiền hàng
                                </p>
                                <p className="text-base leading-none text-white">
                                  {totalPrice}
                                </p>
                              </div>
                              <div className="flex items-center justify-between pt-5">
                                <p className="text-base leading-none text-white">
                                  Tiền ship
                                </p>
                                <p className="text-base leading-none text-white">
                                  30.000đ
                                </p>
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                                <p className="text-xl leading-normal text-white">
                                  Tổng cộng
                                </p>
                                <p className="text-xl font-bold leading-normal text-right text-white">
                                  {totalPrice}
                                </p>
                              </div>
                              <button
                                type="submit"
                                onClick={() => handlePayment()}
                                className="text-base leading-none w-full py-5 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 dark:hover:bg-green-600"
                              >
                                Thanh toán
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="flex justify-between items-center mt-6 pt-6 border-t">
                      <div className="flex items-center">
                        <FontAwesomeIcon
                          icon={faArrowLeft}
                          size="xl"
                          className="mr-2"
                        />
                        <Link
                          to="/Product/?Page=1"
                          className="text-md font-medium text-green-600"
                        >
                          Tiếp tục mua hàng
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
