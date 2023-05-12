import React, { lazy, Suspense } from "react";
//Library import
import { BrowserRouter, Route, Routes } from "react-router-dom";
//Page import
import Header from "./components/Header/Header";
import Footer from "./components/Footer";

const Home = lazy(() => import("./pages/Home/Home"));
const Signin = lazy(() => import("./pages/Signin/Signin"));
const Signup = lazy(() => import("./pages/Signup/Signup"));
const ForgotPassword = lazy(() =>
  import("./pages/ForgotPassword/ForgotPassword")
);
const About = lazy(() => import("./pages/About"));
const Product = lazy(() => import("./pages/Product/Product"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const Error = lazy(() => import("./pages/Error"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const ShoppingCart = lazy(() => import("./pages/Cart/ShoppingCart"));
const VerifyEmail = lazy(() => import("./pages/Signup/VerifyEmail"));
const ResetPassword = lazy(() =>
  import("./pages/ForgotPassword/ResetPassword")
);
const PersonalProfile = lazy(() =>
  import("./pages/PersonalProfile/PersonalProfile")
);
const Search = lazy(() => import("./pages/Search"));
const Admin = lazy(() => import("./Admin/Admin"));
function App() {
  return (
    <>
      {sessionStorage.getItem("admin") !== null ? (
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Error />} />

            <Route exact path="/Admin/*" element={<Admin />}></Route>
          </Routes>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Header />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="*" element={<Error />} />
              <Route path="/" element={<Home />} />

              <Route exact path="/About" element={<About />} />
              <Route exact path="/Blog" element={<Blog />} />
              <Route exact path="/Contact" element={<Contact />} />
              <Route exact path="/Signup" element={<Signup />} />
              {localStorage.getItem("token") === null && (
                <Route exact path="/Signin" element={<Signin />} />
              )}

              <Route exact path="/Product" element={<Product />} />
              <Route
                exact
                path="/Product/:idProduct"
                element={<ProductDetails />}
              />
              <Route
                exact
                path="/ShoppingCart"
                element={<ShoppingCart />}
              ></Route>
              <Route
                exact
                path="/PersonalProfile"
                element={<PersonalProfile />}
              ></Route>
              <Route exact path="/Search" element={<Search />}></Route>
              <Route exact path="/Verify/:email" element={<VerifyEmail />} />
              <Route
                exact
                path="/ForgotPassword"
                element={<ForgotPassword />}
              />
              {localStorage.getItem("resetPwdToken") !== null && (
                <Route
                  exact
                  path="/Reset/:email/:token"
                  element={<ResetPassword />}
                />
              )}
              <Route
                exact
                path="/ShoppingCart"
                element={<ShoppingCart />}
              ></Route>
              <Route exact path="/Verify/:email" element={<VerifyEmail />} />
              <Route
                exact
                path="/ForgotPassword"
                element={<ForgotPassword />}
              />
              <Route
                exact
                path="/Profile/:idUser"
                element={<PersonalProfile />}
              />
            </Routes>
          </Suspense>
          <Footer />
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
