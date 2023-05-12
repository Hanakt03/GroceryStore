import React, { useState } from "react";
//Assets import
import logo from "../../assets/images/logo/logo.png";
//Library import
import { Link } from "react-router-dom";
import axios from "axios";
//Components import
import FormInput from "../../components/FormInput";
//Config import
import { inputs } from "./inputs";
import { convertDate } from "../../utils/convertDate";
const Signin = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [flashMsg, setFlashMsg] = useState("");
  const [date, setDate] = useState("");
  console.log(date);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = "";
    await axios
      .post(`${process.env.REACT_APP_USER_URL}/login`, {
        username: values.username,
        password: values.password,
      })
      .then(function (response) {
        if (response.data.status === "failed") {
          token = null;
          setFlashMsg("Tài khoản hoặc mật khẩu sai");
        } else {
          token = response.data.accessToken;
          localStorage.setItem("token", token);
          setFlashMsg("Đăng nhập thành công!");
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    if (localStorage.getItem("token")) {
      axios
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
          console.log(response);
          if (response.data.user.ID_ROLE === 1) {
            setDate(response.data.user.Email_verified_at);
            if (convertDate(response.data.user.Email_verified_at)) {
              alert("Đăng nhập thành công");
              window.location.replace("/");
            } else {
              setFlashMsg("Chưa xác thực tài khoản");
              window.location.reload();
              localStorage.removeItem("token");
              alert(
                "Tài khoản của bạn chưa được xác thực, mời bạn hãy kiểm tra email"
              );
            }
            if (response.data.user.Status === 2) {
              window.location.reload();
              localStorage.removeItem("token");
              alert("Tài khoản của bạn đã bị khóa");
            }
          } else {
            sessionStorage.setItem("admin", token);
            window.location.href = "/Admin";
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  };

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <div className="flex container mx-auto bg-green-200">
        <div className="w-2/5 my-10 mx-auto bg-green-100 rounded p-10">
          {/* header */}
          <header>
            <img className="mx-auto mb-5" alt="logo" src={logo} />
            <p>{flashMsg}</p>
          </header>
          {/* form */}
          <form action="" onSubmit={handleSubmit}>
            {inputs.map((input) => {
              return (
                <FormInput
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={onChange}
                />
              );
            })}

            <div>
              <button className="w-full hover:bg-blue-700 bg-green-500 text-white font-bold py-2 px-4 mb-6 rounded">
                Đăng nhập
              </button>
            </div>
          </form>
          {/* footer */}

          <footer>
            <Link
              to="/ForgotPassword"
              className="text-blue-500 hover:text-green-600 float-left font-bold"
            >
              Quên mật khẩu?
            </Link>
            <Link
              to="/Signup"
              className="text-blue-500 hover:text-green-600 float-right font-bold"
            >
              Đăng ký
            </Link>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Signin;
