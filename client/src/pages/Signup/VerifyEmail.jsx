import React, { useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo/logo.png";

const VerifyEmail = () => {
  const { email } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    let ignore = false;
    if (email) {
      axios
        .get(`${process.env.REACT_APP_USER_URL}/verify/${email}`)
        .then(function (response) {
          if (!ignore) {
            if (response.data.status === "success") {
              alert("Xác thực thành công");
              navigate("/Signin");
            } else {
              alert("Xác thực thất bại");
              navigate("/Signup");
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
  }, []);
  return (
    <div>
      <div className="flex bg-green-200 mx-auto container">
        <div className="w-2/5 my-10 mx-auto bg-green-100 rounded p-10">
          {/* header */}
          <header>
            <img alt="logo" className="mx-auto mb-5" src={logo} />
          </header>
          {/* form */}
          <div>Xác thực thành công</div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
