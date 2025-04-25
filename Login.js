import React, { Fragment, useState, useContext, useEffect } from "react";
import { loginReq } from "./fetchApi";
import { LayoutContext } from "../index";
import { Container } from "react-bootstrap";

const Login = (props) => {
  const { data: layoutData, dispatch: layoutDispatch } =
    useContext(LayoutContext);

  const [data, setData] = useState({
    email: "",
    password: "",
    error: false,
    loading: true,
  });

  const [loggedIn, setLoggedIn] = useState(false);

  const alert = (msg) => <div className="text-xs text-red-500">{msg}</div>;

  useEffect(() => {
    if (loggedIn) {
      const timeout = setTimeout(() => {
        setLoggedIn(false);
      }, 10000);


      return () => clearTimeout(timeout);
    }
  }, [loggedIn]);

  const formSubmit = async () => {
    setData({ ...data, loading: true, error: false });
    try {
      let responseData = await loginReq({
        email: data.email,
        password: data.password,
      });
      
      if (responseData.error) {
        setData({
          ...data,
          loading: false,
          error: responseData.error,
          password: "",
        });
      } else if (responseData.token) {
        setData({ email: "", password: "", loading: false, error: false });
        localStorage.setItem("jwt", JSON.stringify(responseData));
        setLoggedIn(true);
        
        // Check if user is admin and redirect accordingly
        const userData = JSON.parse(localStorage.getItem("jwt"));
        if (userData.user.role === 1) {
          setTimeout(() => {
            window.location.href = "/admin/dashboard";
          }, 1000);
        } else {
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setData({
        ...data,
        loading: false,
        error: "An error occurred during login. Please try again.",
        password: "",
      });
    }
  };

  return (
    <Container>
      <Fragment>
        <div className="text-center position-relative mt-5 text-2xl mb-6 ">
          Login
        </div>
        {layoutData.loginSignupError ? (
          <div className="bg-red-200 py-2 px-4 rounded">
            You need to login for checkout. Haven't accont? Create new one.
          </div>
        ) : (
          ""
        )}
        <form className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name">
              Email address
              <span className="text-sm text-gray-600 ml-1">*</span>
            </label>
            <input
              onChange={(e) => {
                setData({ ...data, email: e.target.value, error: false });
                layoutDispatch({ type: "loginSignupError", payload: false });
              }}
              value={data.email}
              type="text"
              id="name"
              className={`${
                !data.error ? "" : "border-red-500"
              } px-4 py-2 focus:outline-none border`}
            />
            {!data.error ? "" : alert(data.error)}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">
              Password<span className="text-sm text-gray-600 ml-1">*</span>
            </label>
            <input
              onChange={(e) => {
                setData({ ...data, password: e.target.value, error: false });
                layoutDispatch({ type: "loginSignupError", payload: false });
              }}
              value={data.password}
              type="password"
              id="password"
              className={`${
                !data.error ? "" : "border-red-500"
              } px-4 py-2 focus:outline-none border`}
            />
            {!data.error ? "" : alert(data.error)}
          </div>
          <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:items-center">
            <div>
              <label htmlFor="rememberMe">
                <a href="/Register">Create Account</a>{" "}
                <span className="text-sm text-gray-600">*</span>
              </label>
            </div>
            <a className="block text-gray-600" href="/Froget_email">
              Forget Password
            </a>
          </div>
          <div
            onClick={(e) => formSubmit()}
            style={{ background: "#303031" }}
            className="font-medium px-4 py-2 bg-success text-white text-center cursor-pointer"
          >
            Login
          </div>
         
        </form>
      </Fragment>
      {loggedIn && (
        <div
          className="hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300 max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700"
          role="alert"
        >
           {/* TOast */}
           <div className="absolute mt-4 me-4 top-0 end-0">
            <div
              className="max-w-xs bg-teal-100 border border-teal-200 text-sm text-teal-800 rounded-lg dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500"
              role="alert"
            >
              <div className="p-3 sm:p-4">
              <div className="flex ">
               <h5>

               Login Successfully...!
               </h5>
              </div>
              </div>
            </div>
            </div>
        </div>
      )}
    </Container>
  );
};

export default Login;
