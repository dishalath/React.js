import React, { useState, Fragment, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { LayoutContext } from "../index";
import { cartListProduct } from "./FetchApi";
import { isAuthenticate } from "../auth/fetchApi";
import { cartList } from "../productDetails/Mixins";
import { subTotal, quantity, totalCost } from "./Mixins";
import { loadStripe } from '@stripe/stripe-js';
import { FaPlus } from "react-icons/fa6";
import { RiSubtractFill } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
const apiURL = process.env.REACT_APP_API_URL;

const CartModal = () => {
  const history = useHistory();

  const [Payment, setPayment] = useState([]);
  const { data, dispatch } = useContext(LayoutContext);
  const products = data.cartProduct;
  const [cart, setCart] = useState([]);

  // State to manage product quantities in the cart
  const [quantities, setQuantities] = useState({});

  // console.log("Final quantities:", quantities);
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const cartModalOpen = () =>
    dispatch({ type: "cartModalToggle", payload: !data.cartModal });

  useEffect(() => {
    fetchData();

  }, []);

  const fetchData = async () => {
    try {
      let responseData = await cartListProduct();
      if (responseData && responseData.Products) {
        // console.log("Card Data", responseData);
        setPayment(responseData.Products);
        dispatch({ type: "cartProduct", payload: responseData.Products });
        dispatch({ type: "cartTotalCost", payload: totalCost() });

        const updatedQuantities = {};
        responseData.Products.forEach((product) => {
          updatedQuantities[product._id] = quantity(product._id) || 1;
        });
        setQuantities(updatedQuantities);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartProduct = (id) => {
    let cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    if (cart.length !== 0) {
      cart = cart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(cart));
      fetchData();
      dispatch({ type: "inCart", payload: cartList() });
      dispatch({ type: "cartTotalCost", payload: totalCost() });
    }
    if (cart.length === 0) {
      dispatch({ type: "cartProduct", payload: null });
      fetchData();
      dispatch({ type: "inCart", payload: cartList() });
    }
  };

  const updateQuantity = (id, type) => {
    try {
      // Update cart state and localStorage
      let updatedProducts = [...cart];
      const index = updatedProducts.findIndex((item) => item.id === String(id));

      if (index !== -1) {
        if (type === "increase") {
          updatedProducts[index].quantity += 1;
        } else if (type === "decrease" && updatedProducts[index].quantity > 1) {
          updatedProducts[index].quantity -= 1;
        }
        setCart(updatedProducts);
        localStorage.setItem("cart", JSON.stringify(updatedProducts));

        // Update quantities state
        const updatedQuantities = { ...quantities }; // Create a copy to avoid mutation
        updatedQuantities[id] = updatedProducts[index].quantity; // Reflect changes in cart
        setQuantities(updatedQuantities); // Update quantities state
      }

      dispatch({ type: "cartTotalCost", payload: totalCost() }); // Recalculate total after update
    } catch (error) {
      console.error(error);
    }
  };

  const HandelPayment = async () => {
    const stripe = await loadStripe("pk_test_51OKI1ISIlmDhCecgz61aPgXeMD1t9TV4rDwgL4mEEcjMAhDnfyAezG1heSFG6MEFMR4nkWLEK6rqbLfz8TRoHx0a00ObeYk74G");

    const body = {
      Products: Payment.map((product) => {
        return {
          ...product,
          quantity: quantities[product._id] || quantity(product._id), // Use quantity from state or calculate if missing
        };

      }),
    };
    // console.log("body", body.Products);

    const headers = new Headers({
      "Content-Type": "application/json",
    });

    try {
      const PResponse = await fetch("http://localhost:8000/api/order/MakePayment", {
        method: "POST",
        headers,
        body: JSON.stringify(body.Products),
      });


      // console.log("PResponse", PResponse);

      const session = await PResponse.json();
      const result = stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.log(result.error);
      }
      if (PResponse.ok) {
        console.log("Payment successful!");
        console.log("Payment response:", await PResponse.json());
        history.push('/Success');
      }

    } catch (error) {
      console.log("Error in Stripe Payment", error);
    }
  };
  return (
    <Fragment>
      {/* Black Overlay */}
      <div
        className={`${!data.cartModal ? "hidden" : ""
          } fixed top-0 z-30 w-full h-full bg-black opacity-50`}
      />
      {/* Cart Modal Start */}
      <section
        className={`${!data.cartModal ? "hidden" : ""
          } fixed z-40 inset-0 flex items-start justify-end`}
      >
        <div
          // style={{ background: "#303031" }}
          className="w-full bg-success  h-full flex flex-col justify-between"
        >
          <div className="overflow-y-auto">
            <div className="border-b border-white flex justify-between">
              <div className="p-4 text-white text-lg font-semibold">Cart</div>
              {/* Cart Modal Close Button */}
              <div className="p-4 text-white">
                <svg
                  onClick={(e) => cartModalOpen()}
                  className="w-6 h-6 cursor-pointer"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="m-4 flex-col">
              {products &&
                products.length !== 0 &&
                products.map((item, index) => {
                  // console.log("Quantity of item", item._id, ":", quantity(item._id));

                  return (
                    <Fragment key={index}>
                     
                      <div className=" carEnd border-white mb-2 text-white flex space-x-2 my-4 items-center">
                        <img
                          className="imgCart object-cover object-center"
                          src={`${apiURL}/uploads/products/${item.pImages[0]}`}
                          alt="cartProduct"

                        />
                        <div className="relative w-full flex flex-col">
                          <div className="my-2 fs-5 ">{item.pName}</div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center justify-between space-x-2">
                              <div className="fs-5 text-gray-400">
                                Quantity :
                              </div>
                              <div className="d-flex align-items-center">
                                <span onClick={() => updateQuantity(item._id, "increase")}>
                            
                                  <FaPlus className="me-2 fs-5 cursor-pointer " />
                                </span>
                                <span className="fs-5 text-gray-200">
                                  {quantity(item._id)}
                                </span>
                                <span onClick={() => updateQuantity(item._id, "decrease")}>
                                  
                                  <RiSubtractFill className="ms-2  fs-5 cursor-pointer" />
                                </span>
                              </div>
                            </div>
                            <div>
                              {" "}
                              <span className="fs-5 text-gray-400">
                                Subtotoal :
                              </span>{" "}
                              <div className="fs-5">
                              ₹{ subTotal(item._id, item.pPrice)}.00

                              </div>
                            </div>{" "}
                            {/* SUbtotal Count */}
                          </div>
                          {/* Cart Product Remove Button */}
                          <div
                            onClick={(e) => removeCartProduct(item._id)}
                            className="absolute top-0 right-0 text-white"
                          >
                            <MdDeleteOutline className="w-10 h-8 cursor-pointer" />
                          
                          </div>
                        </div>
                      </div>
                      {/* Cart Product Start */}
                    </Fragment>
                  );
                })}

              {products === null && (
                <div className="m-4 flex-col text-white text-xl text-center">
                  No product in cart
                </div>
              )}
            </div>
          </div>
          <div className="m-4 space-y-4">
            <div
              onClick={(e) => cartModalOpen()}
              className="cursor-pointer px-4 py-2 border border-gray-400 text-white text-center cursor-pointer"
            >
              Continue shopping
            </div>
            {data.cartTotalCost ? (
              <Fragment>
                {isAuthenticate() ? (
                  <div
                    className="px-4  adminHov py-2 bg-white text-dark fs-5 text-center cursor-pointer"
                    onClick={(e) => {
                      history.push("/checkout");
                      cartModalOpen();
                    }}
                    // onClick={HandelPayment}
                  >
                    Checkout  ₹{data.cartTotalCost}.00
                  </div>
                ) : (
                  <div
                    className="px-4 py-2 bg-black text-white text-center cursor-pointer"
                    onClick={(e) => {
                      history.push("/");
                      cartModalOpen();
                      dispatch({
                        type: "loginSignupError",
                        payload: !data.loginSignupError,
                      });
                      dispatch({
                        type: "loginSignupModalToggle",
                        payload: !data.loginSignupModal,
                      });
                    }}
                  >
                    Checkout ₹{data.cartTotalCost}.00
                  </div>
                )}
              </Fragment>
            ) : (
              <div className="px-4 py-2 bg-black text-white text-center cursor-not-allowed">
                Checkout
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Cart Modal End */}
    </Fragment>
  );
};

export default CartModal;
