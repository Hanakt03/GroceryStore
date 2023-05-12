import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./AdminOrder.css";
import axios from "axios";
import Order from "./Order";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
function AdminOrder() {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();
  let page = searchParams.get("Page");
  const handleSearch = () => {
    // search === "" && setSearch("  ");

    axios
      .get(`${process.env.REACT_APP_USER_URL}/admin/order/find/${search}`)
      .then(function (response) {
        console.log(response);
        setOrders(response.data.orders);
        setSearch("");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    let ignore = false;
    axios
      .get(`${process.env.REACT_APP_USER_URL}/admin/orders/page/${page}`)
      .then(function (response) {
        console.log(response);
        if (!ignore) {
          setOrders(response.data.orders);
          setPagination(response.data);
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
      <div className="admin-order">
        <div className="admin-order-top">
          <div className="admin-order-top-search">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm ..."
            ></input>
            <button onClick={handleSearch} className="bg-red-500 ">
              Tìm kiếm
            </button>
          </div>
        </div>
        <div className="admin-order-list">
          <table>
            <tr>
              <th></th>
              <th>Mã ĐH</th>
              <th>Mã KH</th>
              <th>Ngày Đặt</th>
              <th>Số Lượng</th>
              <th>Tổng Tiền</th>
              <th>Tình Trạng</th>
              <th>Chi tiết</th>
              <th></th>
            </tr>

            {orders ? (
              orders.map((order, index) => (
                <Order
                  id={order.ID}
                  idCustomer={order.ID_Customer}
                  num={index + 1}
                  key={order.ID}
                  quantity={order.TotalQuantity}
                  status={order.Status}
                  totalPrice={order.TotalPrice}
                  date={order.DateOrder}
                />
              ))
            ) : (
              <div>Không có dữ liệu hóa đơn của khách hàng này</div>
            )}
          </table>
          <ul className="mt-5 w-full flex flex-row justify-center items-center">
            <li>
              {parseInt(page) > 1 && (
                <a
                  href={`/Product/?Page=${parseInt(page) - 1}`}
                  className="p-1 flex rounded transition duration-150 ease-in-out text-base leading-tight font-bold hover:text-green-600 focus:outline-none mr-1 sm:mr-3"
                >
                  <FontAwesomeIcon icon={faAngleLeft} size="lg" />
                </a>
              )}
            </li>
            {(() => {
              let listPage = [];

              for (
                let i = pagination.iterator;
                i <= pagination.endingLink;
                i++
              ) {
                let url = `/Admin/Product/?Page=${i}`;
                let li = (
                  <li>
                    <a
                      href={url}
                      className={`flex ${
                        i === parseInt(page) && "bg-slate-500"
                      } text-green-600 hover:bg-green-600 hover:text-white text-base leading-tight font-bold cursor-pointer shadow transition duration-150 ease-in-out mx-2 sm:mx-4 rounded px-3 py-2 focus:outline-none`}
                    >
                      {i}
                    </a>
                  </li>
                );
                listPage.push(li);
              }
              return listPage;
            })()}
            <li>
              {parseInt(page) < pagination.numberOfPages && (
                <a
                  href={`/Product/?Page=${parseInt(page) + 1}`}
                  className="flex rounded transition duration-150 ease-in-out text-base leading-tight font-bold hover:text-green-600 p-1 focus:outline-none ml-1 sm:ml-3"
                >
                  <FontAwesomeIcon icon={faAngleRight} size="lg" />
                </a>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminOrder;
