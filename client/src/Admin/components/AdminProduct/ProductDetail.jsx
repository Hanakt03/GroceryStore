import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const ProductDetail = () => {
  const { idProduct } = useParams();
  const [values, setValues] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let ignore = false;
    if (idProduct !== "null") {
      axios
        .get(`${process.env.REACT_APP_USER_URL}/product/${parseInt(idProduct)}`)
        .then(function (response) {
          if (!ignore) {
            console.log(response);
            setValues(response.data.product);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    return () => {
      ignore = true;
    };
  }, []);
  useEffect(() => {
    let ignore = false;
    axios
      .get(`${process.env.REACT_APP_USER_URL}/category`)
      .then(function (response) {
        if (!ignore) {
          console.log(response);
          setCategories(response.data.categories);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    return () => {
      ignore = true;
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    if (idProduct !== "null") {
      axios
        .put(`${process.env.REACT_APP_USER_URL}/admin/editProduct`, {
          values,
        })
        .then(function (response) {
          if (response.data.status === "success") {
            alert("Sửa thành công");
            setValues({});
            window.location.href = `/Admin/Product/?Page=1`;
          } else {
            alert("Sửa thất bại");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_USER_URL}/admin/addProduct`, { values })
        .then(function (response) {
          if (Object.keys(response.data) > 0) {
            alert("Thêm thành công");
            setValues({});
            window.location.href = `/Admin/Product/?Page=1`;
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
        idProduct !== "null"
          ? `Thông tin chi tiết của sản phẩm ${idProduct}`
          : `Thêm sản phẩm`
      }`}</h1>
      <form
        action=""
        enctype="multipart/form-data"
        onSubmit={handleSubmit}
        method="POST"
      >
        <div>
          <label htmlFor="name">Tên sản phẩm</label>
          <input
            value={values.Name}
            onChange={(e) => setValues({ ...values, Name: e.target.value })}
            type="text"
            name="productName"
            placeholder="Nhập tên sản phẩm"
          />
        </div>
        <div>
          <label htmlFor="image">Hình ảnh</label>
          <input
            onChange={(e) => {
              setValues({
                ...values,
                Image: e.target.files[0].name,
              });
            }}
            type="file"
            name="imageProduct"
            placeholder="Nhập hình ảnh"
          />
        </div>
        <div>
          <label htmlFor="price">Giá sản phẩm</label>
          <input
            value={values.Price}
            onChange={(e) => setValues({ ...values, Price: e.target.value })}
            type="text"
            name="price"
            placeholder="Nhập giá sản phẩm"
          />
        </div>
        <div>
          <label htmlFor="category">Chọn thể loại sản phẩm</label>
          <select
            value={values.ID_Category}
            onChange={(e) =>
              setValues({ ...values, ID_Category: parseInt(e.target.value) })
            }
            name="category"
          >
            {categories.map((category, index) => (
              <option key={index} value={category.ID}>
                {category.Name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="quantity">Nhập số lượng</label>
          <input
            value={values.Quantity}
            onChange={(e) =>
              setValues({ ...values, Quantity: parseInt(e.target.value) })
            }
            type="text"
            name="quantity"
            placeholder="Nhập số lượng sản phẩm"
          />
        </div>
        <div>
          <label htmlFor="description">Nhập mô tả</label>
          <textarea
            value={values.Description}
            onChange={(e) =>
              setValues({ ...values, Description: e.target.value })
            }
            type="text"
            name="quantity"
            placeholder="Nhập mô tả sản phẩm"
          />
        </div>
        <button className="bg-green-400 rounded font-bold p-2" type="submit">
          Xác nhận sản phẩm
        </button>
      </form>
    </div>
  );
};

export default ProductDetail;
