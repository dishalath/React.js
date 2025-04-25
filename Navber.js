import React, { Fragment, useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./style.css";
// import { DashboardUserContext } from "../layout/";
import { logout } from "./Action";
import { LayoutContext } from "../index";
import { isAdmin } from "../auth/fetchApi";
import { IoMdLogIn } from "react-icons/io";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import { DashboardUserContext } from "../dashboardUser/Layout";
import { CiLogin } from "react-icons/ci";
import { IoBagHandleSharp } from "react-icons/io5";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

const Navber = (props) => {
  const history = useHistory();
  const location = useLocation();

  const { data, dispatch } = useContext(LayoutContext);
  const navberToggleOpen = () =>
    data.navberHamburger
      ? dispatch({ type: "hamburgerToggle", payload: false })
      : dispatch({ type: "hamburgerToggle", payload: true });

  const loginModalOpen = () =>
    data.loginSignupModal
      ? dispatch({ type: "loginSignupModalToggle", payload: false })
      : dispatch({ type: "loginSignupModalToggle", payload: true });

  const cartModalOpen = () =>
    data.cartModal
      ? dispatch({ type: "cartModalToggle", payload: false })
      : dispatch({ type: "cartModalToggle", payload: true });

  return (
    <Fragment>
      {/* Navber Section */}
      <nav className=" top-0 w-full   shadow-lg lg:shadow-none bg-success pt-1 pb-1  text-white ">
        <div className="m-4 md:mx-12 md:my-6 grid grid-cols-4 lg:grid-cols-3">
          <div className="hidden lg:block col-span-1 flex text-gray-600 mt-1">
            <span
              className="adminHov   hover:bg-black px-4 py-3 rounded-lg  text-white tracking-widest hover:text-orange-600 cursor-pointer"
              onClick={(e) => history.push("/")}
            >
              Home
            </span>
            <span
              className=" adminHov hover:bg-black px-4 py-3 rounded-lg text-white tracking-widest hover:text-white cursor-pointer"
              onClick={(e) => history.push("/About")}
            >
              About
            </span>
            <span
              className=" adminHov hover:bg-black px-4 py-3  rounded-lg text-white tracking-widest hover:text-white cursor-pointer"
              onClick={(e) => history.push("/contact-us")}
            >
              Contact
                          </span>
          </div>
          <div className="col-span-2 lg:hidden flex justify-items-stretch 	 items-center">
            <svg
              onClick={(e) => navberToggleOpen()}
              className="col-span-1 lg:hidden w-8 h-8 cursor-pointer text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <span
              onClick={(e) => history.push("/")}
              style={{ letterSpacing: "0.10rem" }}
              className="flex items-left text-center font-bold uppercase text-gray-800 text-2xl cursor-pointer px-2 text-center"
            >
              Feastful delights
            </span>
          </div>
          <div
            onClick={(e) => history.push("/")}
            style={{ letterSpacing: "0.70rem" }}
            className="hidden lg:block flex items-left col-span-1 text-center text-gray-800 font-bold tracking-widest uppercase text-2xl cursor-pointer"
          >
            Feastful delights
          </div>
          <div className="  flex items-right col-span-2 lg:col-span-1 flex justify-end align-item-center  mb-2">
            {localStorage.getItem("jwt") ? (
              <Fragment>
                {/* Menu  */}
                <div
                  className="  d-sm-none   z-10 userDropdownBtn changeHov py-2 rounded-lg relative"
                  title="Menu"
                >
                  <svg
                    className="cursor-pointer w-8 h-8 text-white-600 hover:text-white-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="userDropdown absolute right-0 mt-1 bg-gray-200 rounded">
                    {!isAdmin() ? (
                      <Fragment>
                        <li className="flex flex-col text-gray-700 w-48 shadow-lg">
                          <span
                            onClick={(e) => history.push("/user/profile")}
                            className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                          >
                            <span>
                              <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                            </span>
                            <span>My Account</span>
                          </span>
                          <span
                            onClick={(e) => history.push("/user/profile")}
                            className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                          >
                            <MdOutlineProductionQuantityLimits className="w-6 h-6" />
                            <span>Orders</span>
                          </span>

                          <span
                            onClick={(e) => logout()}
                            className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                          >
                            <CiLogin className="w-6 h-6" title="LogOut" />

                            <span>Logout</span>
                          </span>
                        </li>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <li className="flex  z-10 flex-col text-gray-700  w-48 shadow-lg">
                          <span
                            onClick={(e) =>
                              history.push("admin/dashboard/categories")
                            }
                            className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                          >
                            <span>
                              <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                            </span>
                            <span>Admin Panel</span>
                          </span>
                          <span
                            onClick={(e) => logout()}
                            className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                          >
                            <span>
                              <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                              </svg>
                            </span>
                            <span>Logout</span>
                          </span>
                        </li>
                      </Fragment>
                    )}
                  </div>
                </div>

                {/* Logout */}
                <div className="resp">
                  <CiLogin
                    className=" changeHov w-8 h-8 mt-2 fs-bold text-white me-1 rounded-lg  cursor-pointer "
                    title="LogOut"
                    onClick={(e) => logout()}
                  />
                </div>

                {!isAdmin() ? (
                  <div className="resp">
                    <div className="d-flex">
                      <MdManageAccounts
                        title="Account"
                        onClick={(e) => history.push("/user/profile")}
                        className="w-8 ms-2 h-8 mt-2 fs-bold text-white rounded-lg  cursor-pointer  changeHov
                        "
                      />
                      <MdOutlineProductionQuantityLimits
                        title="order"
                        onClick={(e) => history.push("/user/orders")}
                        className="w-8 ms-2 h-8 mt-2 fs-bold text-white rounded-lg  cursor-pointer  changeHov
                        "
                      />
                    </div>
                  </div>
                ) : (
                  <div className="resp">
                    <MdOutlineAdminPanelSettings
                      title="Admin Panel"
                      className="w-8 h-8 ms-2 mt-2 fs-bold text-white  rounded-lg  cursor-pointer changeHov"
                      onClick={(e) =>
                        history.push("admin/dashboard/categories")
                      }
                    />
                  </div>
                )}
              </Fragment>
            ) : (
              <span
                className="changeHov px-4 py-2 rounded-lg text-white tracking-widest changeHov cursor-pointer"
                onClick={(e) => history.push("/login")}
              >
                <IoMdLogIn className="w-8 h-8" />
              </span>
            )}

            {/*  WishList Page Button */}
            <FcLike
              onClick={(e) => history.push("/wish-list")}
              className="w-8  ms-2 h-8 mt-2 fs-bold text-white like  rounded-lg  cursor-pointer changeHov"
            />

            {/* Cart Modal Button */}

            <div className="relative">
              <IoBagHandleSharp
                onClick={(e) => cartModalOpen()}
                className="w-8  ms-2 h-8 mt-2 fs-bold text-white like   rounded-lg  cursor-pointer changeHov"
              />
              <span className="absolute top-0 ml-6 mt-1 bg-danger rounded px-1 text-white text-xs hover:text-gray-200 font-semibold">
                {data.cartProduct !== null ? data.cartProduct.length : 0}
              </span>
            </div>
          </div>
        </div>

        <div
          className={
            data.navberHamburger && data.navberHamburger
              ? "px-1 pb-2 md:pb-0 md:px-10 lg:hidden"
              : "hidden px-1 pb-2 md:pb-0 md:px-10 lg:hidden"
          }
        >
          <div className="col-span-1 flex flex-col text-white-600">
            <span
              className="font-medium text-white-lg tracking-widest hover:bg-black   px-3 py-2 rounded-lg cursor-pointer"
              onClick={(e) => history.push("/")}
            >
              Home
            </span>
            <span
              className="font-medium text-lg tracking-widest hover:bg-black  px-3 py-2 rounded-lg cursor-pointer"
              onClick={(e) => history.push("/blog")}
            >
              Blog
            </span>
            <span
              className="font-medium text-lg tracking-widest hover:bg-black  px-3 py-2 rounded-lg cursor-pointer"
              onClick={(e) => history.push("/contact-us")}
            >
              Contact us
            </span>
          </div>
        </div>
      </nav>
      {/* End Navber Section */}
    </Fragment>
  );
};

export default Navber;
