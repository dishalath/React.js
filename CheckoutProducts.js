import React, { Fragment, useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { LayoutContext } from "../layout";
import { subTotal, quantity, totalCost } from "../partials/Mixins";

import { cartListProduct } from "../partials/FetchApi";
import { getBrainTreeToken, getPaymentProcess } from "./FetchApi";
import { fetchData, fetchbrainTree, pay } from "./Action";
import { Row, Col } from "react-bootstrap";
import DropIn from "braintree-web-drop-in-react";
import { Button, Spinner } from "react-bootstrap";

const apiURL = process.env.REACT_APP_API_URL;

export const CheckoutComponent = (props) => {
  const history = useHistory();
  const { data, dispatch } = useContext(LayoutContext);

  const [state, setState] = useState({
    address: "",
    phone: "",
    error: false,
    success: false,
    clientToken: null,
    instance: {},
  });

  useEffect(() => {
    fetchData(cartListProduct, dispatch);
    fetchbrainTree(getBrainTreeToken, setState);
  }, []);

  if (data.loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Button size="lg" className="" variant="success" disabled>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
            className="me-2 "
          />
          Loading...
        </Button>
      </div>
    );
  }
  return (
    <Fragment>
      <section className="mx-4 mt-20 md:mx-12 md:mt-32 lg:mt-24">
        <div className="mx-2 text-2xl">Order</div>
        {/* Product List */}
        <div className="flex flex-col md:flex md:space-x-2 md:flex-row">
          <div className="md:w-1/2">
            <CheckoutProducts products={data.cartProduct} />
          </div>
          <div className="order-first w-full md:order-last md:w-1/2">
            {state.clientToken !== null ? (
              <Fragment>
                <div
                  onBlur={(e) => setState({ ...state, error: false })}
                  className="p-4 md:p-8"
                >
                  <div className="flex flex-col py-2">
                    <label htmlFor="address" className="pb-2">
                      Delivery Address
                    </label>
                    <input
                      value={state.address}
                      onChange={(e) =>
                        setState({
                          ...state,
                          address: e.target.value,
                          error: false,
                        })
                      }
                      type="text"
                      id="address"
                      className="px-4 py-2 border"
                      placeholder="Address..."
                    />
                  </div>
                  <div className="flex flex-col py-2 mb-2">
                    <label htmlFor="phone" className="pb-2">
                      Phone
                    </label>
                    <input
                      value={state.phone}
                      onChange={(e) =>
                        setState({
                          ...state,
                          phone: e.target.value,
                          error: false,
                        })
                      }
                      type="number"
                      id="phone"
                      className="px-4 py-2 border"
                    />
                  </div>
                  <DropIn
                    options={{
                      authorization: state.clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => (state.instance = instance)}
                  />
                  {state.error ? (
                    <div className="px-4 py-2 mb-3 text-white rounded bg-danger text-capitalize">
                      {state.error}
                    </div>
                  ) : (
                    ""
                  )}
                  <div
                    onClick={(e) =>
                      pay(
                        data,
                        dispatch,
                        state,
                        setState,
                        getPaymentProcess,
                        totalCost,
                        history
                      )
                    }
                    className="w-full px-4 py-2 font-semibold text-center text-white cursor-pointer bg-success"
                  >
                    Pay now
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="flex items-center justify-center py-12">
                <svg
                  className="w-12 h-12 text-gray-600 animate-spin"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  ></path>
                </svg>
              </div>
            )}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

const CheckoutProducts = ({ products }) => {
  const history = useHistory();

  return (
    <Fragment>
      <div className="grid grid-cols-2 md:grid-cols-1">
        <Row>
          {products !== null && products.length > 0 ? (
            products.map((product, index) => {
              return (
                <Col>
                  <div
                    key={index}
                    className="col-span-1 m-2 md:py-6 md:border-t md:border-b md:my-2 md:mx-0 md:flex md:items-center md:justify-between"
                  >
                    <div className="d-md-flex">
                      <img
                        onClick={(e) =>
                          history.push(`/products/${product._id}`)
                        }
                        className="object-cover object-center cursor-pointer md:h-20 md:w-20"
                        src={`${apiURL}/uploads/products/${product.pImages[0]}`}
                        alt="wishListproduct"
                      />
                      <div className="">
                        <div className="text-lg truncate md:ml-6">
                          {product.pName}
                        </div>
                        <div className="ms-4">
                          Price : ₹{product.pPrice}.00 Quantitiy :{" "}
                          {quantity(product._id)}
                          <br />
                          Subtotal : ₹{subTotal(product._id, product.pPrice)}.00
                        </div>
                      </div>
                    </div>
                    {/* <div className="">
                  <img
                    onClick={(e) => history.push(`/products/${product._id}`)}
                    className="object-cover object-center cursor-pointer md:h-20 md:w-20"
                    src={`${apiURL}/uploads/products/${product.pImages[0]}`}
                    alt="wishListproduct"
                  />
                  
                  <div className="text-lg truncate md:ml-6">
                    {product.pName}
                  </div>
                  <div className="md:flex md:items-center md:space-x-4">
                  <div className="text-sm font-semibold text-gray-600 md:ml-6">
                    Price : ₹{product.pPrice}.00{" "}
                  </div>
                  <div className="text-sm font-semibold text-gray-600 md:ml-6">
                    Quantitiy : {quantity(product._id)}
                  </div>
                  <div className="text-sm font-semibold text-gray-600">
                    Subtotal : ₹{subTotal(product._id, product.pPrice)}.00
                  </div>
                  </div>
                </div> */}
                  </div>
                </Col>
              );
            })
          ) : (
            <div>No product found for checkout</div>
          )}
        </Row>
      </div>
    </Fragment>
  );
};

export default CheckoutProducts;
