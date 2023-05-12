import React, { useState, useEffect, Suspense } from "react";
import "./Admin.css";
import Dashboard from "./pages/Dashboard";
import AdminProduct from "./components/AdminProduct/AdminProduct";
import AdminOrder from "./components/AdminOrder/AdminOrder";
import OrderDetail from "./components/AdminOrder/OrderDetail";
import AdminUser from "./components/AdminUser/AdminUser";
import Sidebar from "./components/sidebar/Sidebar";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import ProductDetail from "./components/AdminProduct/ProductDetail";
import AdminCategory from "./components/AdminCategory/AdminCategory";
import CategoryDetail from "./components/AdminCategory/CategoryDetail";
function Admin() {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    let ignore = false;

    if (sessionStorage.getItem("admin") !== null) {
      axios
        .post(
          "http://localhost:3000/api/user",
          sessionStorage.getItem("admin"),
          {
            headers: {
              authorization: `Bearer ${sessionStorage.getItem("admin")}`,
            },
          }
        )
        .then(function (response) {
          if (!ignore) {
            if (response.data.status === "success") {
              setAuth(true);
            }
          }
        })
        .catch(function (error) {
          alert("Lỗi!!!!!");
          console.log(error);
          setAuth(false);
          sessionStorage.removeItem("admin");
          localStorage.clear();
          window.location.href = "/Signin";
        });
    }
  });
  return (
    <>
      {auth === true && (
        <div className="layout">
          <Sidebar />
          <div className="layout__content">
            <div className="layout__content-main">
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Dashboard />}></Route>
                  <Route
                    exact
                    path="/Product"
                    element={<AdminProduct />}
                  ></Route>
                  <Route exact path="/Customer" element={<AdminUser />}></Route>
                  <Route exact path="/Order" element={<AdminOrder />}></Route>
                  <Route
                    exact
                    path="/Category"
                    element={<AdminCategory />}
                  ></Route>
                  <Route
                    exact
                    path="/Order/Detail/:idOrder"
                    element={<OrderDetail />}
                  ></Route>
                  <Route
                    exact
                    path="/Product/Detail/:idProduct"
                    element={<ProductDetail />}
                  ></Route>
                  <Route
                    exact
                    path="/Category/Detail/:idCategory"
                    element={<CategoryDetail />}
                  ></Route>
                </Routes>
              </Suspense>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Admin;
