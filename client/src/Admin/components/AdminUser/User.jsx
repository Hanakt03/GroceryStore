import React, { useState } from "react";
import { convertUserStatus } from "./utils";
import axios from "axios";
function User({ num, id, username, fullName, email, status }) {
  const [userStatus, setUserStatus] = useState(status);
  const handleDelete = () => {
    let decision = window.confirm(`Bạn có muốn xóa tài khoản ${id} không?`);
    if (decision === true) {
      axios
        .delete(`${process.env.REACT_APP_USER_URL}/admin/user/delete/${id}`)
        .then(function (response) {
          if (response.data.status === "success") {
            alert("Xóa thành công");
            window.location.reload();
          } else {
            alert("Xóa thất bại do tài khoản vẫn đang được sử dụng");
          }
        })
        .catch();
      alert("Xóa thành công");
    }
  };
  const handleUpdate = () => {
    if (parseInt(userStatus) !== status) {
      let decision = window.confirm(
        `Bạn có muốn đổi trạng thái của tài khoản ${username} sang ${convertUserStatus(
          parseInt(userStatus)
        )} không?`
      );
      if (decision === true)
        axios
          .put(`${process.env.REACT_APP_USER_URL}/admin/user/status`, {
            id,
            status: userStatus,
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
      <td>{fullName}</td>
      <td>{username}</td>
      <td>{email}</td>
      <td>
        <select
          defaultValue={userStatus}
          onChange={(e) => {
            setUserStatus(e.target.value);
          }}
        >
          <option value={1}>Đang hoạt động</option>
          <option value={2}>Khóa</option>
        </select>
      </td>
      <td>
        <button
          onClick={handleUpdate}
          className="bg-yellow-400  rounded text-white font-bold p-2"
        >
          Cập nhật
        </button>
        {status !== 1 && (
          <button
            onClick={handleDelete}
            className="bg-red-400 ml-2 rounded text-white font-bold p-2"
          >
            Xóa
          </button>
        )}
      </td>
    </tr>
  );
}

export default User;
