import axios from "axios";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo/logo.png";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const { email, token } = useParams();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `${process.env.REACT_APP_USER_URL}/reset`,
        {
          email: email,
          token: token,
          password: newPassword,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("resetPwdToken")}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        if (response.data.status === "success") {
          alert("Đổi mật khẩu thành công");
          localStorage.removeItem("resetPwdToken");
          navigate("/Signin");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="flex bg-green-200 mx-auto container">
        <div className="w-2/5 my-10 mx-auto bg-green-100 rounded p-10">
          {/* header */}
          <header>
            <img alt="logo" className="mx-auto mb-5" src={logo} />
            <h1 className="text-center mb-5 font-semibold">Đổi mật khẩu</h1>
          </header>
          {/* form */}
          <form action="" onSubmit={handleSubmit}>
            <label className="block mb-2 font-semibold" htmlFor="password">
              Mật khẩu mới
            </label>
            <input
              className="w-full p-2 mb-6 border-b-2 border-green-600 outline-none focus:bg-gray-300"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              className="w-full hover:bg-blue-700 bg-green-600 text-white font-bold py-2 px-4 mb-6 rounded"
              type="submit"
            >
              Đổi mật khẩu
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
