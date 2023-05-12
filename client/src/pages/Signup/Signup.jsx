import React, { useState } from "react";
//Assest import
import logo from "../../assets/images/logo/logo.png";
//Library import
import { Link, useNavigate } from "react-router-dom";
//Config import
import { inputs } from "./inputs";
//Components import
import FormInput from "../../components/FormInput";
import axios from "axios";
import "../Signup/input.css";
const Signup = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    terms: false,
  });
  console.log(values);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${process.env.REACT_APP_USER_URL}/register`, {
        username: values.username,
        password: values.password,
        email: values.email,
        phone: values.phone,
        address: values.address,
        fullName: `${values.firstName} ${values.lastName}`,
      })
      .then(function (response) {
        console.log(response);
        if (response.data.status === "failed") {
          alert(response.data.msg);
        } else {
          alert("Đăng kí thành công");
          navigate("/Signin");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  console.log(values);
  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
      terms: e.target.checked,
    });
  };

  return (
    <>
      <div className="flex container mx-auto bg-green-200">
        <div className="w-2/5 my-10 mx-auto bg-green-100 rounded p-10">
          {/* header */}
          <header>
            <img alt="Logo" className="mx-auto mb-5" src={logo} />
          </header>
          {/* form */}
          <form id="registerForm" action="" onSubmit={handleSubmit}>
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
                Đăng ký
              </button>
            </div>
          </form>
          {/* footer */}
          <footer className="text-center font-bold">
            <label className="">
              Bạn đã có tài khoản rồi?
              <Link
                to="/Signin"
                className="text-blue-500 hover:text-green-500 font-bold"
              >
                {" "}
                Hãy đăng nhập ở đây
              </Link>
            </label>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Signup;
