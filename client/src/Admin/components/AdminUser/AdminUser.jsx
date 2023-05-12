import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "./AdminUser.css";
import axios from "axios";
import User from "./User";

function AdminUser() {
  const [listUsers, setListUsers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  let page = searchParams.get("Page");

  const handleSearch = () => {
    // if (search === "") setSearch(" ");
    axios
      .get(`${process.env.REACT_APP_USER_URL}/admin/user/search/${search}`)
      .then(function (response) {
        console.log(response);
        setListUsers(response.data.users);
        setSearch("");
        // setPagination(response.data);
      });
  };

  useEffect(() => {
    let ignore = false;
    axios
      .get(`${process.env.REACT_APP_USER_URL}/admin/users/page/${page}`)
      .then(function (response) {
        if (!ignore) {
          setListUsers(response.data.users);
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
    <div className="admin-user">
      <div className="admin-user-top">
        <div className="admin-user-top-search">
          <div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm ..."
            ></input>
            <button onClick={handleSearch} className="bg-red-500">
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>
      <div className="admin-user-list">
        <table>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Tên tài khoản</th>
            <th>Họ Tên</th>
            <th>Email</th>
            <th>Tình Trạng</th>
            <th></th>
          </tr>
          {listUsers ? (
            listUsers.map((user, index) => (
              <User
                key={user.ID}
                email={user.Email}
                fullName={user.Name}
                username={user.Username}
                id={user.ID}
                num={index + 1}
                status={user.Status}
              />
            ))
          ) : (
            <div>Không tìm thấy dữ liệu người dùng</div>
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
        </ul>
      </div>
    </div>
  );
}

export default AdminUser;
