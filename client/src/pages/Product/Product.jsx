import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faBars,
  faList,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import ProductCard from "../../components/ProductCard";

const Product = () => {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const [pagination, setPagination] = useState({});
  const [listCategories, setListCategories] = useState([]);
  const [searchParams] = useSearchParams();
  console.log(pagination);
  let page = searchParams.get("Page");
  let idCate = searchParams.get("Cate") || null;

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      axios
        .get(`${process.env.REACT_APP_USER_URL}/category`)
        .then(function (response) {
          if (!ignore) {
            if (response.data.status === "success") {
              setListCategories(response.data.categories);
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      if (idCate === null) {
        axios
          .get(
            `${process.env.REACT_APP_USER_URL}/product/page/${parseInt(page)}`
          )
          .then(function (response) {
            console.log(response);
            if (!ignore) {
              if (response.data.status === "success") {
                setListProduct(response.data.products);
                setPagination(response.data);
              }
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        axios
          .get(
            `${process.env.REACT_APP_USER_URL}/product/page/${parseInt(
              page
            )}/cate/${parseInt(idCate)}`
          )
          .then(function (response) {
            if (response.data.status === "success") {
              console.log(response.data);
              setListProduct(response.data.products);
              setPagination(response.data);
            } else {
              setListProduct(null);
              setPagination({});
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <div className="container mx-auto bg-gray-100 px-5 py-4 rounded-md flex items-center justify-between">
        <ol className="list-reset flex">
          <li>
            <Link to="/" class="text-blue-600 hover:text-blue-700">
              Trang chủ
            </Link>
          </li>
          <li>
            <span className="text-gray-500 mx-2">/</span>
          </li>
          <li className="text-gray-500">Sản phẩm</li>
        </ol>
        <button onClick={() => setShow(!show)}>
          <FontAwesomeIcon
            icon={faList}
            color="green"
            size="xl"
            onClick={() => setShow(!show)}
          />
        </button>
      </div>

      <div className="container mx-auto py-4 rounded-md flex items-center justify-between">
        <button
          onClick={() => setShow1(!show1)}
          className="bg-gray-100 hover:bg-green-100 cursor-pointer rounded py-4 px-5"
        >
          <FontAwesomeIcon
            icon={faBars}
            color="green"
            size="xl"
            onClick={() => setShow1(!show1)}
          />
          <span className="hover:text-green-600 ml-2">Danh mục sản phẩm</span>
        </button>
      </div>

      <div
        className={`${
          show1 ? "block" : "hidden"
        } container mx-auto flex justify-center`}
      >
        {listCategories.length > 0 ? (
          <>
            <a
              href="/Product/?Page=1"
              className="mx-2 my-2 focus:bg-green-600 bg-white transition duration-150 ease-in-out focus:outline-none rounded border border-green-600 px-6 py-2 text-base hover:bg-green-600 hover:text-white"
            >
              Tất cả
            </a>
            {listCategories.map((category) => (
              <a
                key={category.ID}
                href={`/Product/?Page=1&Cate=${parseInt(category.ID)}`}
                className="mx-2 my-2 focus:bg-green-600 bg-white transition duration-150 ease-in-out focus:outline-none rounded border border-green-600 px-6 py-2 text-base hover:bg-green-600 hover:text-white"
              >
                {category.Name}
              </a>
            ))}
          </>
        ) : null}
      </div>

      <div>
        <section className="py-8 grid grid-cols-5 gap-2 justify-items-center justify-center">
          {listProduct !== null &&
            listProduct.map((item) => (
              <>
                <ProductCard
                  key={item.ID}
                  id={item.ID}
                  image={item.Image}
                  name={item.Name}
                  price={item.Price}
                  quantity={item.Quantity}
                />
              </>
            ))}
        </section>

        <div className="mx-auto container py-2">
          {listProduct === null ? (
            <div>Không có dữ liệu</div>
          ) : listProduct.length !== 0 ? (
            <ul className="flex justify-center items-center">
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

                for (
                  let i = pagination.iterator;
                  i <= pagination.endingLink;
                  i++
                ) {
                  let url = idCate
                    ? `/Product/?Page=${i}&Cate=${idCate}`
                    : `/Product/?Page=${i}`;
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
          ) : (
            <div>Đang tải dữ liệu</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Product;
