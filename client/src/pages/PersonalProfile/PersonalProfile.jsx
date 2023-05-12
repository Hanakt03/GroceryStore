import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import product from "../assets/images/product/bapcai.jpg";
import axios from "axios";
import OrderDetail from "./OrderDetail";
import Error from "../Error";
import FormInput from "../../components/FormInput";
import { inputs } from "./inputs";
import { convertStatus, convertDate } from "./convertStatus";
import "../PersonalProfile/input.css";
export const PersonalProfile = () => {
  const [idUserApi, setIdUserApi] = useState(0);
  const [listOrder, setListOrder] = useState([]);
  const { idUser } = useParams();

  const [values, setValues] = useState({});
  let newId = parseInt(idUser);

  useEffect(() => {
    let ignore = false;
    const getUser = async () => {
      if (localStorage.getItem("token") !== null) {
        await axios
          .post(
            `${process.env.REACT_APP_USER_URL}/user`,
            localStorage.getItem("token"),
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then(function (response) {
            if (!ignore) setIdUserApi(response.data.user.ID);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    };
    getUser();

    return () => {
      ignore = true;
    };
  }, []);
  useEffect(() => {
    let ignore = false;
    if (newId === idUserApi) {
      axios
        .get(`${process.env.REACT_APP_USER_URL}/profile/${parseInt(newId)}`)
        .then(function (response) {
          if (!ignore) {
            // setUser(response.data.user);
            const { user } = response.data;
            setValues({
              name: user.Name,
              phone: user.Phone,
              address: user.Address,
            });
            console.log(user);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      axios
        .get(`${process.env.REACT_APP_USER_URL}/getOrders/${parseInt(newId)}`)
        .then(function (response) {
          if (!ignore) {
            if (response.data.status === "success") {
              setListOrder(response.data.orders);
              console.log(response);
            } else {
              setListOrder([]);
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    return () => {
      ignore = true;
    };
  }, [newId, idUserApi]);

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Test");
    await axios
      .put(`${process.env.REACT_APP_USER_URL}/profile/update`, {
        id: idUserApi,
        name: values.name,
        phone: values.phone,
        address: values.address,
      })
      .then(function (response) {
        console.log(response);
        alert("Cập nhật thành công");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      {idUserApi === 0 ? (
        <Error />
      ) : (
        <>
          <div className="container mx-auto bg-gray-100 px-5 py-3 rounded-md">
            <ol className="list-reset flex">
              <li>
                <Link to="/Home" className="text-blue-600 hover:text-blue-700">
                  Trang chủ
                </Link>
              </li>
              <li>
                <span className="text-gray-500 mx-2">/</span>
              </li>
              <li className="text-gray-500">Hồ sơ cá nhân</li>
            </ol>
          </div>

          <div className="container mx-auto bg-gray-300">
            <div className="py-12">
              <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg md:max-w-6xl p-4">
                <div className="md:flex">
                  <div className="w-1/4 p-5 bg-gray-800 rounded overflow-visible ">
                    <div>
                      <p className="text-xl font-black leading-9 text-white">
                        Trang cá nhân
                      </p>
                      <form onSubmit={handleSubmit}>
                        {inputs.map((input) => {
                          return (
                            <FormInput
                              key={input.id}
                              {...input}
                              value={values[input.name]}
                              onChange={onChange}
                              page={"profile"}
                            />
                          );
                        })}
                        <div>
                          <button className="w-full hover:bg-blue-700 bg-green-500 text-white font-bold py-2 px-4 mb-6 rounded">
                            Đăng nhập
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="w-3/4 ml-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="col-span-2">
                        <div className="flex flex-col xl:flex-row justify-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                            {/* Looping start */}

                            {listOrder.length > 0 ? (
                              listOrder.map((order) => (
                                <>
                                  {console.log("Test " + order.ID)}
                                  <div className="flex flex-col justify-start items-start rounded bg-gray-800 py-4 p-8 w-full">
                                    <div className="flex justify-start item-start space-y-2 flex-col">
                                      <h1 className="text-lg font-semibold leading-7 lg:leading-9 text-white">
                                        {`Đơn hàng ${order.ID}`}
                                      </h1>
                                      <p className="text-base font-medium leading-6 text-white">
                                        {`Tình trạng: ${convertStatus(
                                          order.Status
                                        )}`}
                                      </p>
                                      <p className="text-base font-medium leading-6 text-white">
                                        {`Nơi giao:  ${order.Location}`}
                                      </p>
                                      <p className="text-base font-medium leading-6 text-white">
                                        {`Ghi chú:  ${
                                          order.Note === ""
                                            ? "Không có ghi chú"
                                            : order.Note
                                        }`}
                                      </p>
                                      <p className="text-base font-medium leading-6 text-white">
                                        {`Ngày đặt: ${convertDate(
                                          order.DateOrder
                                        )}`}
                                      </p>
                                    </div>
                                    <OrderDetail idOrder={order.ID} />
                                  </div>
                                </>
                              ))
                            ) : (
                              <div>
                                Trông có vẻ bạn cần phải đi mua sắm thêm
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default PersonalProfile;
