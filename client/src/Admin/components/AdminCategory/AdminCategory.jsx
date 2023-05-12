import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminCategory.css";
import Category from "./Category";

const AdminCategory = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const handleSearch = () => {
    axios
      .get(`${process.env.REACT_APP_USER_URL}/admin/category/search/${search}`)
      .then(function (response) {
        console.log(response);
        setCategories(response.data.categories);
        setSearch("");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
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
  return (
    <div className="admin-user">
      <div className="admin-user-top">
        <div className="admin-user-top-search">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm ..."
          ></input>
          <button className="bg-green-400" onClick={handleSearch}>
            Tìm kiếm
          </button>

          <button
            className="bg-green-400 p-3 mt-3 rounded text-white font-bold"
            onClick={() => {
              window.location.href = "/Admin/Category/Detail/null";
            }}
          >
            Thêm thể loại
          </button>
        </div>
      </div>
      <div className="admin-user-list">
        <table>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Tên</th>
            <th>Tình Trạng</th>
            <th></th>
          </tr>

          {categories ? (
            categories.map((category, index) => (
              <Category
                key={category.ID}
                name={category.Name}
                id={category.ID}
                num={index + 1}
                status={category.Status}
              />
            ))
          ) : (
            <div>Không tìm thấy thể loại này</div>
          )}
        </table>
        {/* <ul className="mt-5 w-full flex flex-row justify-center items-center">
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
              let url = `/Admin/User/?Page=${i}`;

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
        </ul> */}
      </div>
    </div>
  );
};

export default AdminCategory;
