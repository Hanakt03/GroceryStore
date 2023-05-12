import React, { useState, useEffect } from "react";
import axios from "axios";
const OrderDetail = ({ idOrder }) => {
  const [orderDetail, setOrderDetail] = useState([{}]);
  let totalPrice = 0;
  useEffect(() => {
    let ignore = false;
    axios
      .get(`${process.env.REACT_APP_USER_URL}/detailOrder/${idOrder}`)
      .then(function (response) {
        if (!ignore) {
          if (response.data.status === "success") {
            setOrderDetail(response.data.orders);
          } else setOrderDetail([]);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    return () => {
      ignore = true;
    };
  }, [idOrder]);
  return (
    <>
      <div className="border-b border-gray-200 mt-4 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
        <div className=" w-full pb-12 space-y-4 md:space-y-0">
          {orderDetail.map((detail) => {
            totalPrice += detail.Price;
            return (
              <>
                <div className="w-full grid grid-cols-5 pb-5 ">
                  <img
                    className="w-full"
                    src={`/product/${detail.Image}`}
                    alt=""
                  />
                  <h3 className="text-lg text-center text-white font-semibold leading-6">
                    {detail.Name}
                  </h3>
                  <p className="text-base text-white text-center leading-6">
                    {detail.Price / detail.Quantity}
                  </p>
                  <p className="text-base text-white text-center leading-6 ">{`x${detail.Quantity}`}</p>
                  <p className="text-base text-white text-right font-semibold leading-6">
                    {detail.Price}
                  </p>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div className="mt-6 flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
        <div className="flex justify-between w-full">
          <p className="text-base font-semibold leading-4 text-white">
            Thành tiền
          </p>
          <p className="text-base font-semibold leading-4 text-white">
            {totalPrice}
          </p>
        </div>

        <div className="flex justify-between w-full">
          <p className="text-base font-semibold leading-4 text-white">
            Phí ship
          </p>
          <p className="text-base font-semibold leading-4 text-white">
            30.000đ
          </p>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center w-full">
        <p className="text-base font-semibold leading-4 text-white">
          Tổng số tiền
        </p>
        <p className="text-base font-semibold leading-4 text-white">
          {totalPrice + 30000}
        </p>
      </div>
    </>
  );
};

export default OrderDetail;
