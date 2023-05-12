import React, { useState } from "react";
import { convertDateFromDb } from "../../../utils/convertDate";
import axios from "axios";
import { convertOrderStatus } from "./utils";
import { Link } from "react-router-dom";
function Order({ num, id, idCustomer, date, quantity, totalPrice, status }) {
  const [orderStatus, setOrderStatus] = useState(status);

  const handleUpdate = () => {
    console.log(parseInt(orderStatus) !== status);
    if (parseInt(orderStatus) !== status) {
      let decision = window.confirm(
        `Bạn có muốn đổi trạng thái của đơn hàng ${id} sang ${convertOrderStatus(
          parseInt(orderStatus)
        )} không?`
      );
      if (decision === true)
        axios
          .put(`${process.env.REACT_APP_USER_URL}/admin/order/status`, {
            id,
            status: orderStatus,
          })
          .then(function (response) {
            console.log(response);
            alert("Cập nhật thành công");
            window.location.reload();
          })
          .catch(function (error) {
            console.log(error);
          });
    } else {
      alert("Bạn cần phải thay đổi trạng thái trước khi cập nhật");
    }
  };

  return (
    <tr>
      <td>{num}</td>
      <td>{id}</td>
      <td>{idCustomer}</td>
      <td>{convertDateFromDb(date)}</td>
      <td>{quantity}</td>
      <td>{totalPrice}</td>
      <td className="flex justify-center items-center pr-4">
        <select
          defaultValue={orderStatus}
          onChange={(e) => {
            setOrderStatus(e.target.value);
          }}
          disabled={status === 4 && true}
        >
          <option value={1}>Vừa nhận đơn hàng</option>
          <option value={2}>Đơn hàng đang chuẩn bị vận chuẩn</option>
          <option value={3}>Sản phẩm chuẩn bị đang đến chỗ bạn</option>
          <option value={4}>Giao hàng thành công</option>
        </select>
      </td>
      <td>
        <Link to={`/Admin/Order/Detail/${id}`}>Chi tiết</Link>
      </td>
      <td>
        {status !== 4 ? (
          <button
            onClick={handleUpdate}
            className="bg-yellow-400  rounded text-white font-bold p-2"
          >
            Cập nhật
          </button>
        ) : (
          <p className="text-green-500 font-bold">Đơn hàng xử lý xong</p>
        )}
      </td>
    </tr>
  );
}

export default Order;
