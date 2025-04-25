import React, { Fragment, useState, useContext } from "react";
import { loginReq } from "./fetchApi";
import { LayoutContext } from "../index";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
export const MargLogin = (props) => {
    const { data: layoutData, dispatch: layoutDispatch } =
        useContext(LayoutContext);

    const [data, setData] = useState({
        email: "",
        password: "",
        error: false,
        loading: true,
    });

    const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup

    const alert = (msg) => <div className="text-xs text-red-500">{msg}</div>;

    const formSubmit = async () => {
        setData({ ...data, loading: true });
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
                window.location.href = "/";
            }
        } catch (error) {
            console.log(error);
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin); // Toggle between login and signup forms
    };
    return (
        <>
            <Container>
                <Fragment>
                    <div className="text-center text-2xl mb-6">{isLogin ? 'Login' : 'Sign Up'}</div>
                    {layoutData.loginSignupError ? (
                        <div className="bg-red-200 py-2 px-4 rounded">
                            You need to login for checkout. Haven't accont? Create new one.
                        </div>
                    ) : (
                        ""
                    )}
                    {isLogin ? ( // Conditional rendering based on login state
                        <form className="space-y-4">
                            <div className="flex flex-col">
                                <label htmlFor="name">
                                    Email address
                                    <span className="text-sm text-gray-600 ml-1">*</span>
                                </label>
                                {/* Email input field */}
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="password">
                                    Password<span className="text-sm text-gray-600 ml-1">*</span>
                                </label>
                                {/* Password input field */}
                            </div>
                            {/* Remember me and Lost password section */}
                            <div
                                onClick={(e) => formSubmit()}
                                style={{ background: "#303031" }}
                                className="font-medium px-4 py-2 text-white text-center cursor-pointer"
                            >
                                Login
                            </div>
                            {/* Toggle between login and signup */}
                            <div onClick={toggleForm} className="px-4 py-2 font-medium text-center cursor-pointer">
                                Create an account
                            </div>
                        </form>
                    ) : (
                        <Signup /> // Render Signup component if isLogin is false
                    )}
                </Fragment>
            </Container>
        </>
    )
}
