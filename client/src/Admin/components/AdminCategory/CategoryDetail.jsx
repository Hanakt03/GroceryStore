import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const CategoryDetail = () => {
  const { idCategory } = useParams();
  const [values, setValues] = useState({});
  console.log(values);
  useEffect(() => {
    let ignore = false;
    if (idCategory !== "null")
      axios
        .get(
          `${process.env.REACT_APP_USER_URL}/admin/category/detail/${idCategory}`
        )
        .then(function (response) {
          console.log(response);
          if (!ignore) {
            setValues(response.data.category);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    else {
      setValues({ Status: 1 });
    }
    return () => {
      ignore = true;
    };
  }, []);
  //   useEffect(() => {
  //     let ignore = false;
  //     if (idCategory !== "null")
  //       axios
  //         .get(
  //           `${process.env.REACT_APP_USER_URL}/admin/category/detail/${idCategory}`
  //         )
  //         .then(function (response) {
  //           console.log(response);
  //           if (!ignore) {
  //             setValues(response.data.category);
  //           }
  //         })
  //         .catch(function (error) {
  //           console.log(error);
  //         });
  //     return () => {
  //       ignore = true;
  //     };
  //   }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (idCategory !== "null") {
      axios
        .put(`${process.env.REACT_APP_USER_URL}/admin/category/edit`, {
          values,
        })
        .then(function (response) {
          console.log(response);
          if (response.data.status === "success") {
            alert("Cập nhật thành công");
            window.location.href = "/Admin/Category";
          } else {
            alert("Cập nhật thất bại");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_USER_URL}/admin/category/add`, {
          values,
        })
        .then(function (response) {
          console.log(response);
          if (response.data.status === "success") {
            alert("Thêm thành công");
            window.location.href = "/Admin/Category";
          } else {
            alert("Thêm thất bại");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  return (
    <div>
      <h1>{`${
        idCategory !== "null"
          ? `Thông tin chi tiết của sản phẩm ${idCategory}`
          : `Thêm sản phẩm`
      }`}</h1>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Tên thể loại</label>
          <input
            value={values.Name}
            onChange={(e) => setValues({ ...values, Name: e.target.value })}
            type="text"
            name="categoryName"
            placeholder="Nhập tên thể loại"
          />
        </div>
        <div>
          <label htmlFor="category">Chọn tình trạng của thể loại</label>
          <select
            disabled={idCategory === "null" ? true : false}
            defaultValue={values.Status ? values.Status : 1}
            onChange={(e) =>
              setValues({ ...values, Status: parseInt(e.target.value) })
            }
            name="category"
          >
            <option value={1}>Đang hoạt động</option>
            <option value={2}>Không hoạt động</option>
          </select>
        </div>

        <button className="bg-green-400 rounded font-bold p-2" type="submit">
          Xác nhận sản phẩm
        </button>
      </form>
    </div>
  );
};

export default CategoryDetail;
