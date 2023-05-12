import React, { useState } from "react";
//Assets import
import logo from "../../assets/images/logo/logo.png";
//Library import
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
//Config import
import "../../index.css";
import { sections } from "./sections";
//Components import
import HeaderSection from "./HeaderSection";
import { useEffect } from "react";
const Header = () => {
  const [username, setUsername] = useState("");
  const [idUserApi, setIdUserApi] = useState("");

  const [show, setShow] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [filteredList, setFilteredList] = useState(itemList);
  const [keyword, setKeyword] = useState("");
  let amountItem = JSON.parse(localStorage.getItem("cart"));
  console.log(keyword);
  const filterBySearch = (query) => {
    if (query === "") {
      setFilteredList([]);
    } else {
      // Create copy of item list
      console.log(itemList);

      let updatedList = [...itemList];

      // Include all elements which includes the search query
      updatedList = updatedList.filter((item) => {
        let name = item.Name;
        console.log(name.toLowerCase().includes(query.toLowerCase()));
        return name.toLowerCase().includes(query.toLowerCase());
      });

      // Trigger render with updated values
      setFilteredList(updatedList);
    }
  };

  useEffect(() => {
    let ignore = false;

    if (localStorage.getItem("token") !== null) {
      axios
        .post("http://localhost:8000/api/user", localStorage.getItem("token"), {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(function (response) {
          if (!ignore) {
            if (response.data.status === "success") {
              setUsername(response.data.user.Username);
              setIdUserApi(response.data.user.ID);
            }
          }
        })
        .catch(function (error) {
          console.log(error);
          setUsername("");
          setIdUserApi("");
          localStorage.removeItem("token");
        });
    }

    axios
      .get("http://localhost:8000/api/products")
      .then(function (response) {
        if (!ignore) {
          setItemList(response.data.products);
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
    <div className="w-full sticky top-0 z-50">
      <nav className="flex justify-around items-center bg-white ">
        {/* Website Logo */}
        <section>
          <Link to="/" className="flex items-center py-4 px-2">
            <img src={logo} alt="Logo" className="h-14 w-42" />
          </Link>
        </section>

        {/* left header section */}
        <section className="flex items-center space-x-1">
          {sections.map((section) => (
            <HeaderSection
              key={section.id}
              path={section.path}
              content={section.content}
            />
          ))}
        </section>

        {/* right header section */}

        <section className="md:flex items-center space-x-3 ">
          {/* search */}
          <div className="flex flex-col justify-center items-center">
            <div className="flex appearance-none border-2 p-1 sm:max-w-screen-sm text-stone-900 rounded-xl">
              <input
                type="text"
                className="h-6 appearance-none bg-transparent px-3 py-1 w-40 rounded-xl border-green-600 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 focus:border-green-600 outline-none"
                placeholder="Search..."
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                  filterBySearch(e.target.value);
                }}
                onClick={() => setShow(!show)}
              />
              <button className="flex items-center justify-center px-5">
                <FontAwesomeIcon icon={faSearch} color="gray" />
              </button>
            </div>
            <div
              className={`${
                show ? "block" : "hidden"
              } shadow bg-gray-100 rounded z-30 absolute py-4 w-56 p-16 top-16`}
            >
              <ol>
                {filteredList.map((item, index) => {
                  if (index < 4)
                    return (
                      <Link to={`/Product/${item.ID}`}>
                        <li key={item.ID}>{item.Name}</li>
                      </Link>
                    );
                })}
                <a href={`/Search?Key=${keyword}`}>
                  <li>Xem thêm</li>
                </a>
              </ol>
            </div>
          </div>

          {/* cart */}
          <div>
            <a href="/ShoppingCart" className="px-4 relative flex w-full">
              <div className="absolute text-xs rounded-full px-1 font-bold right-2 bottom-2 bg-green-600 text-white">
                {amountItem ? amountItem.length : 0}
              </div>
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            </a>
          </div>

          {/*user*/}
          <div className="dropdown">
            <p className="px-4">
              <FontAwesomeIcon icon={faUser} size="lg" />
            </p>
            <ul className="hidden dropdown-content p-2 shadow bg-gray-100 rounded z-30 absolute right-2 w-34 py-4">
              {localStorage.getItem("token") === null || username === "" ? (
                <>
                  <li>
                    <a
                      href="/Signin"
                      className="block font-bold hover:text-green-600 mx-6"
                    >
                      Đăng nhập
                    </a>
                  </li>
                  <li>
                    <a
                      href="/Signup"
                      className="block font-bold hover:text-green-600 mx-6"
                    >
                      Đăng ký
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to={`/Profile/${idUserApi}`}>{username}</Link>
                  </li>
                  <li>
                    <p
                      onClick={() => {
                        localStorage.clear();
                        window.location.reload();
                      }}
                      className="block font-bold hover:text-green-600 mx-6 cursor-pointer"
                    >
                      Đăng xuất
                    </p>
                  </li>
                </>
              )}
            </ul>
          </div>
        </section>
      </nav>
    </div>
  );
};

export default Header;
