import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
function Product({
  num,
  id,
  image,
  name,
  price,
  category,
  amount,
  description,
}) {
  const handleRemove = () => {
    let decision = window.confirm(
      `Bạn có muốn xóa sản phẩm với mã ${id} không?`
    );
    if (decision === true) {
      axios
        .delete(
          `${process.env.REACT_APP_USER_URL}/admin/deleteProduct/${parseInt(
            id
          )}`
        )
        .then(function (response) {
          if (response.data.status === "success") {
            alert("Xóa thành công");
            window.location.reload();
          } else {
            alert("Xóa thất bại do sản phẩm vẫn đang được sử dụng");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  return (
    <tr>
      <td>{num + 1}</td>
      <td>{id}</td>
      <td>
        <img src={`/product/${image}`} alt={name} />
      </td>
      <td>{name}</td>
      <td>{price}</td>
      <td>{category}</td>
      <td>{amount}</td>
      <td>{description === null ? "Chưa có mô tả" : description}</td>

      <td className="h-full w-1/3">
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() =>
              (window.location.href = `/Admin/Product/Detail/${id}`)
            }
            className="bg-yellow-400  rounded text-white font-bold p-2"
          >
            Chi tiết
          </button>
          <button
            onClick={handleRemove}
            className="bg-red-400 rounded text-white font-bold p-2"
          >
            Xóa
          </button>
        </div>
      </td>
    </tr>
  );
}

export default Product;
