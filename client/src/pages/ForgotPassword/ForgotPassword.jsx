import React, { useState } from "react";
//Assets import
import logo from "../../assets/images/logo/logo.png";
//Library import
import { Link } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [resetEmail, setResetEmail] = useState("");
  const [msgReset, setMsgReset] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_USER_URL}/email`, {
        email: resetEmail,
      })
      .then(function (response) {
        if (response.data.status === "success") {
          setMsgReset(true);
          localStorage.setItem("resetPwdToken", response.data.accessToken);
          console.log(response.data.accessToken);
        } else {
          setMsgReset(false);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <div className="flex bg-green-200 mx-auto container">
      <div className="w-2/5 my-10 mx-auto bg-green-100 rounded p-10">
        {/* header */}
        <header>
          <img alt="logo" className="mx-auto mb-5" src={logo} />
          <p className="text-center mb-5 font-semibold">
            {msgReset === null
              ? "Hãy nhập email của tài khoản của bạn, hệ thống sẽ gửi mail để bạn đặt lại mật khẩu"
              : msgReset === true
              ? "Hãy kiểm tra mail của bạn"
              : "Email không hợp lệ"}
          </p>
        </header>
        {/* form */}
        <form action="" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 font-semibold" htmlFor="password">
              Email:
            </label>
            <input
              required
              className="w-full p-2 mb-6 border-b-2 border-green-600 outline-none focus:bg-gray-300"
              type="text"
              name="email"
              placeholder="Hãy nhập email của bạn"
              value={resetEmail}
              onChange={(e) => {
                setResetEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <button className="w-full hover:bg-blue-700 bg-green-600 text-white font-bold py-2 px-4 mb-6 rounded">
              Xác nhận
            </button>
          </div>
        </form>
        {/* footer */}
        {/* <footer className="text-center">
          <Link
            to="/Signup"
            className="text-blue-500 px-5 hover:text-green-600 font-semibold"
          >
            Tạo tài
          </Link>
          <br />
          <label className="font-semibold px-5">
            Already have an account?
            <Link
              to="/Signin"
              className="text-blue-500 hover:text-green-500 font-semibold"
            >
              {" "}
              Signin
            </Link>
          </label>
        </footer> */}
      </div>
    </div>
  );
};

export default ForgotPassword;
