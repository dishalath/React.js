import React, { Fragment } from "react";
import Navber from "./Navber";
import Footer from "./Footer";
import About from "./About";
import { useHistory } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";
export const MainAbout = () => {
  const history = useHistory();
  return (
    <>
      <Fragment>
        <Navber />
        <div className="p-0 mt-3 mb-5 container-fluid page-header ">
          <div className="py-1 container-fluid page-header-inner">
            <div className="container text-center">
              <nav aria-label="breadcrumb">
                <ol className="list-none bg-white shadow-lg breadcrumb cartHo justify-content-center text-uppercase">
                  <li
                    className="text-white breadcrumb-item"
                    aria-current="Home"
                  >
                    <span
                      className="hover:text-yellow-700 mx-auto text-decoration-none text-dark text-[18px] px-3 cursor-pointer"
                      onClick={(e) => history.push("/")}
                    >
                      Home
                    </span>
                  </li>
                  <SlArrowRight className="mt-1 text-dark fw-bold" />
                  <li
                    className="text-white breadcrumb-item"
                    aria-current="Home"
                  >
                    <span className="hover:text-yellow-700 mx-auto text-decoration-none text-dark text-[18px] px-3 cursor-pointer">
                      About
                    </span>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
        <About />
        <Footer />
      </Fragment>
    </>
  );
};
