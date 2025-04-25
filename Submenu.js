import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { SlArrowRight } from "react-icons/sl";

const Submenu = (props) => {
  const { categoryId, category, product } = props.value;
  const history = useHistory();
  return (
    <Fragment>
      {/* Submenu Section */}
      <div className="container-fluid page-header mt-3 mb-5 p-0 ">
        <div className="container-fluid page-header-inner py-1">
          <div className="container text-center">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-white  shadow-lg justify-content-center text-uppercase list-none">
                <li className="breadcrumb-item  text-white" aria-current="Home">
                  <span
                    className="hover:text-yellow-700 mx-auto text-decoration-none text-dark text-[18px] px-3 cursor-pointer"
                    onClick={(e) => history.push("/")}
                  >
                    Home
                  </span>
                </li>
                <SlArrowRight className="text-dark fw-bold mt-1" />

                <li className="breadcrumb-item text-dark " aria-current="page">

                  <span
                    className="mx-auto text-decoration-none text-dark text-[18px] px-3 hover:text-yellow-700 cursor-pointer"
                    onClick={(e) => history.push(`/products/category/${categoryId}`)}
                  >
                    {category}
                  </span>
                </li>
                <SlArrowRight className="text-dark fw-bold mt-1" />

                <li className="breadcrumb-item text-dark " aria-current="page">
                  <span className="mx-auto text-decoration-none text-dark text-[18px] px-3 text-yellow-700 cursor-default">{product}</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      {/* Submenu Section */}
    </Fragment>
  );
};

export default Submenu;
