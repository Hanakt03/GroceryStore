import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const OrderDetail = () => {
  const [orderDetail, setOrderDetail] = useState([]);
  const { idOrder } = useParams();
  let total = 0;
  console.log(orderDetail);
  useEffect(() => {
    let ignore = false;
    axios
      .get(`${process.env.REACT_APP_USER_URL}/detailOrder/${idOrder}`)
      .then(function (response) {
        if (!ignore) {
          console.log(response);
          setOrderDetail(response.data.orders);
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
    <div className="order">
      <section className="pl-4 py-2">
        <h1 className="font-bold text-lg">{`Thông tin của đơn hàng ${idOrder}`}</h1>
      </section>

      <div className="admin-order-list">
        <table>
          <tr>
            <th></th>
            <th>Tên SP</th>
            <th>Ảnh</th>
            <th>Giá</th>
            <th>Số lượng</th>
          </tr>
          {orderDetail.map((detail, index) => {
            total += detail.Price;
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{detail.Name}</td>
                <td>
                  <img
                    className="w-32"
                    src={`/product/${detail.Image}`}
                    alt={detail.Name}
                  />
                </td>
                <td>{detail.Price}</td>
                <td>{detail.Quantity}</td>
              </tr>
            );
          })}
        </table>
      </div>
      <div className="text-right font-bold pr-24 py-2">{`Tổng tiền: ${total}`}</div>
    </div>
  );
};

export default OrderDetail;
