import React from "react";
import axios from "axios";
const Category = ({ num, id, name, status }) => {
  const handleDelete = async () => {
    let flag = false;
    await axios
      .delete(
        `${process.env.REACT_APP_USER_URL}/admin/deleteProduct/cate/${id}`
      )
      .then(function (response) {
        console.log(response);
        flag = true;
      });

    axios
      .delete(`${process.env.REACT_APP_USER_URL}/admin/category/delete/${id}`)
      .then(function (response) {
        console.log(response);
        if (flag === true) {
          if (response.data.status === "success") {
            alert("Xóa thành công");
            window.location.reload();
          } else {
            alert("Xóa thất bại");
          }
        }
      });
  };

  return (
    <>
      <tr>
        <td>{num}</td>
        <td>{id}</td>
        <td>{name}</td>
        <td>{status === 1 ? "Đang hoạt động" : "Không hoạt động"}</td>
        <td>
          <button
            onClick={() => {
              window.location.href = `/Admin/Category/Detail/${id}`;
            }}
            className="bg-yellow-400  rounded text-white font-bold p-2"
          >
            Cập nhật
          </button>
          {status === 2 && (
            <button
              onClick={handleDelete}
              className="bg-red-400 ml-2 rounded text-white font-bold p-2"
            >
              Xóa
            </button>
          )}
        </td>
      </tr>
    </>
  );
};

export default Category;
