import React from "react";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <p>Logo</p>
      </div>

      <div className="sidebar-list">
        <a href="/Admin" className={"sidebar-list-item"}>
          <p>Thống Kê</p>
        </a>

        <a href="/Admin/Customer/?Page=1" className={"sidebar-list-item"}>
          <p>Tài Khoản</p>
        </a>

        <a href="/Admin/Product/?Page=1" className={"sidebar-list-item"}>
          <p>Sản Phẩm</p>
        </a>

        <a href="/Admin/Order/?Page=1" className={"sidebar-list-item"}>
          <p>Đơn Hàng</p>
        </a>
        <a href="/Admin/Category" className={"sidebar-list-item"}>
          <p>Thể Loại</p>
        </a>
      </div>
      <div className="sidebar-bottom">
        <span
          onClick={() => {
            sessionStorage.clear();
            localStorage.clear();
            window.location.href = "/Signin";
          }}
        >
          Đăng xuất
        </span>
      </div>
    </div>
  );
}

export default Sidebar;
