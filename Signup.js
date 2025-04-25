import React, { Fragment, useState } from "react";
import { signupReq } from "./fetchApi";
import { useHistory } from 'react-router-dom';
import { Container } from "react-bootstrap";
const Signup = (props) => {
  const history = useHistory();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
    error: false,
    loading: false,
    success: false,
  });

  const alert = (msg, type) => (
    <div className={`text-sm text-${type}-500`}>{msg}</div>
  );

  const formSubmit = async () => {
    setData({ ...data, loading: true });
    if (data.cPassword !== data.password) {
      return setData({
        ...data,
        error: {
          cPassword: "Password doesn't match",
          password: "Password doesn't match",
        },
      });
    }
    try {
      let responseData = await signupReq({
        name: data.name,
        email: data.email,
        password: data.password,
        cPassword: data.cPassword,
      });
      if (responseData.error) {
        setData({
          ...data,
          loading: false,
          error: responseData.error,
          password: "",
          cPassword: "",
        });
      } else if (responseData.success) {
        setData({
          success: responseData.success,
          name: "",
          email: "",
          password: "",
          cPassword: "",
          loading: false,
          error: false,
        });
        history.push('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Fragment>
        <div className="text-center text-success text-2xl mt-5 mb-6">Register</div>
        <form className="space-y-4">
          {data.success ? history.push("/login") : ""}
          <div className="flex flex-col">
            <label htmlFor="name">
              Name<span className="text-sm text-gray-600 ml-1">*</span>
            </label>
            <input
              onChange={(e) =>
                setData({
                  ...data,
                  success: false,
                  error: {},
                  name: e.target.value,
                })
              }
              value={data.name}
              type="text"
              id="name"
              className={`${data.error.name ? "border-red-500" : ""
                } px-4 py-2 focus:outline-none border`}
            />
            {!data.error ? "" : alert(data.error.name, "red")}
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">
              Email address<span className="text-sm text-gray-600 ml-1">*</span>
            </label>
            <input
              onChange={(e) =>
                setData({
                  ...data,
                  success: false,
                  error: {},
                  email: e.target.value,
                })
              }
              value={data.email}
              type="email"
              id="email"
              className={`${data.error.email ? "border-red-500" : ""
                } px-4 py-2 focus:outline-none border`}
            />
            {!data.error ? "" : alert(data.error.email, "red")}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">
              Password<span className="text-sm text-gray-600 ml-1">*</span>
            </label>
            <input
              onChange={(e) =>
                setData({
                  ...data,
                  success: false,
                  error: {},
                  password: e.target.value,
                })
              }
              value={data.password}
              type="password"
              id="password"
              className={`${data.error.password ? "border-red-500" : ""
                } px-4 py-2 focus:outline-none border`}
            />
            {!data.error ? "" : alert(data.error.password, "red")}
          </div>
          <div className="flex flex-col">
            <label htmlFor="cPassword">
              Confirm password
              <span className="text-sm text-gray-600 ml-1">*</span>
            </label>
            <input
              onChange={(e) =>
                setData({
                  ...data,
                  success: false,
                  error: {},
                  cPassword: e.target.value,
                })
              }
              value={data.cPassword}
              type="password"
              id="cPassword"
              className={`${data.error.cPassword ? "border-red-500" : ""
                } px-4 py-2 focus:outline-none border`}
            />
            {!data.error ? "" : alert(data.error.cPassword, "red")}
          </div>
          <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:items-center">
            <div>
              <label htmlFor="rememberMe">
                <a href="/login">
                  Already have an Account ? Sign in
                </a>
                <span className="text-sm text-gray-600">*</span>
              </label>
            </div>

          </div>
          <div
            onClick={(e) => formSubmit()}
            style={{ background: "#303031" }}
            className="px-4 py-2 text-white bg-success text-center cursor-pointer font-medium"
          >
            Create  account
          </div>
        </form>
      </Fragment>
    </Container>
  );
};

export default Signup;
