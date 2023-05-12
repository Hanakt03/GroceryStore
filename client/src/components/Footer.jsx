import React from "react";
import logo from "../assets/images/logo/logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="container mx-auto body-font">
      <div className="container py-6 mx-auto">
        <div className="flex flex-wrap md:text-left order-first ">
          <div className="lg:w-1/3 md:w-1/2 w-full px-4 ">
            <img src={logo} alt="Logo" className="h-6 w-24 mb-3 ml-16" />
            <nav className="list-none mb-10 text-base mx-4">
              <li>
                Địa chỉ: 273 An Dương Vương, Phường 3, Quận 5, TP Hồ Chí Minh
              </li>
              <li>Điện thoại: 0123 456 789</li>
              <li>Email: Sanjifood@gmail.com</li>
            </nav>
          </div>

          <div className="lg:w-1/3 md:w-1/2 w-full px-4 text-base">
            <h2 className="title-font font-bold mb-3 text-center">
              Về Sanjifood
            </h2>
            <nav className="list-none mb-10 mx-24">
              <li>
                <Link to="" className="hover:text-green-600">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="" className="hover:text-green-600">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="" className="hover:text-green-600">
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link to="" className="hover:text-green-600">
                  Tin tức
                </Link>
              </li>
              <li>
                <Link to="" className="hover:text-green-600">
                  Liên hệ
                </Link>
              </li>
            </nav>
          </div>

          <div className="lg:w-1/3 md:w-1/2 w-full px-4 text-base">
            <h2 className="title-font font-bold text-gray-900 mb-3 text-center">
              Hỗ trợ khách hàng
            </h2>
            <nav className="list-none mb-10 mx-16">
              <li>
                <Link to="" className="hover:text-green-600">
                  Chính sách đổi trả
                </Link>
              </li>
              <li>
                <Link to="" className="hover:text-green-600">
                  Chăm sóc khách hàng
                </Link>
              </li>
              <li>
                <Link to="" className="hover:text-green-600">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link to="" className="hover:text-green-600">
                  Chính sách bảo mật
                </Link>
              </li>
            </nav>
          </div>
        </div>
      </div>

      <div className="container px-4 mx-auto">
        <div className="container py-6 mx-auto flex items-center sm:flex-row flex-col bg-gray-100 ">
          <p className="sm:mt-0 mt-4">
            Copyright &copy; 2022, All Right Reserved
          </p>
          <span className="inline-flex sm:ml-auto justify-center sm:justify-start">
            <Link to="#" className="ml-3">
              <FontAwesomeIcon icon={faFacebookF} color="blue" size="2x" />
            </Link>
            <Link to="#" className="ml-3 ">
              <FontAwesomeIcon icon={faTwitter} color="blue" size="2x" />
            </Link>
            <Link to="#" className="ml-3">
              <FontAwesomeIcon icon={faInstagram} color="red" size="2x" />
            </Link>
            <Link to="#" className="ml-3">
              <FontAwesomeIcon icon={faLinkedin} color="red" size="2x" />
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
