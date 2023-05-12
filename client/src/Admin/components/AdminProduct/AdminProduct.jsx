import React, { useState, useEffect } from "react";
import Product from "./Product";
import { useSearchParams } from "react-router-dom";
import "./AdminProduct.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function AdminProduct() {
  const [listProduct, setListProduct] = useState([]);
  const [pagination, setPagination] = useState({});
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  console.log(search);
  let page = searchParams.get("Page");
  console.log(listProduct);
  const handleSearch = () => {
    // search === "" && setSearch("  ");
    axios
      .get(`${process.env.REACT_APP_USER_URL}/product/search/${search}`)
      .then(function (response) {
        console.log(response);
        setListProduct(response.data.products);
        setSearch("");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    let ignore = false;
    axios
      .get(`${process.env.REACT_APP_USER_URL}/admin/products/${page}`)
      .then(function (response) {
        console.log(response);
        if (!ignore) {
          setListProduct(response.data.products);
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
    <div className="admin-product">
      <div className="admin-product-top">
        <div className="admin-product-top-search">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm ..."
          ></input>
          <button className="bg-slate-300 font-bold" onClick={handleSearch}>
            Tìm kiếm
          </button>

          <button
            className="bg-green-400 p-3 mt-3 rounded text-white font-bold"
            onClick={() => {
              window.location.href = "/Admin/Product/Detail/null";
            }}
          >
            Thêm sản phẩm
          </button>
        </div>
      </div>
      <div className="admin-product-list">
        <table>
          <tr>
            <th>#</th>
            <th>Mã Sản Phẩm</th>
            <th>Hình ảnh</th>
            <th>Tên SP</th>
            <th>Giá</th>
            <th>Thể Loại</th>
            <th>Số Lượng</th>
            <th>Mô tả</th>

            <th></th>
          </tr>
          {listProduct ? (
            listProduct.map((data, index) => (
              <Product
                key={data.ID}
                id={data.ID}
                num={index}
                category={data.CategoryName}
                image={data.Image}
                name={data.Name}
                price={data.Price}
                amount={data.Quantity}
                description={data.Description}
              />
            ))
          ) : (
            <div>Không thể tìm thấy sản phẩm này</div>
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

            for (let i = pagination.iterator; i <= pagination.endingLink; i++) {
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
  );
}

export default AdminProduct;
