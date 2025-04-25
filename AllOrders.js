import React, { Fragment, useContext, useEffect } from "react";
import moment from "moment";
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { OrderContext } from "./index";
import { fetchData, editOrderReq, deleteOrderReq } from "./Actions";
import { MdDelete, MdEditSquare } from "react-icons/md";

const apiURL = process.env.REACT_APP_API_URL;

const AllCategory = (props) => {
  const { data, dispatch } = useContext(OrderContext);
  const { orders, loading } = data;

  useEffect(() => {
    fetchData(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
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
      <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
        <table className="table-auto border w-full my-2">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Products</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Created at</th>
              <th className="px-4 py-2 border">Conduct</th>
              <th className="px-4 py-2 border">Total</th>
              <th className="px-4 py-2 border">Customer</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Address</th>
              <th className="px-4 py-2 border">Transaction Id</th>
              <th className="px-4 py-2 border">Updated at</th>
           
            </tr>
          </thead>
          <tbody>
            {orders && orders.length > 0 ? (
              orders.map((item, i) => {
                return (
                  <CategoryTable
                    key={i}
                    order={item}
                    editOrder={(oId, type, status) =>
                      editOrderReq(oId, type, status, dispatch)
                    }
                  />
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="12"
                  className="text-xl text-center font-semibold py-8"
                >
                  No order found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="text-sm text-gray-600 mt-2">
          Total {orders && orders.length} order found
        </div>
      </div>
    </Fragment>
  );
};

/* Single Category Component */
const CategoryTable = ({ order, editOrder }) => {
  const { dispatch } = useContext(OrderContext);

  return (
    <Fragment>
      <tr className="border-b">
        {/* <td className="w-full  p-2 flex  flex-col space-y-1">
          {order.allProduct.map((product, i) => {
            return (
              <span className="block flex items-center space-x-2" key={i}>
                <div className="">
                  <img
                    className="w-23 h-20 object-cover object-center"
                    src={`${apiURL}/uploads/products/${product.id.pImages[0]}`}
                    alt="productImage"
                  />
                </div>
                <div className="m-3">
                  <span className="w-full">Name : {product.id.pName}</span>
                  <br />
                  <span className="">Quantity : {product.quantity}</span>
                </div>
              </span>
            );
          })}
        </td> */}
         <td className="w-full   p-2 flex flex-col space-y-1">
          {order.allProduct.map((product, i) => {
            console.log("-----------o-----------", order);
            return (
              <span className="block flex justify-content-center align-content-center " key={i}>
                <div className="">
                  {product.id &&
                  product.id.pImages.length &&
                  product.id.pName.length > 0 ? (
                    <div className="   d-lg-flex align-item-center">
                      <div className="">
                        <img
                        style={{height:"150px",width:"400px"}}
                          className=" object-cover object-center"
                          src={`${apiURL}/uploads/products/${product.id.pImages[0]}`}
                          alt="productImage"
                        />
                      </div>
                      <div className="">
                        <div className="d-flex ms-lg-4 ">
                          <span>
                            Name :{" "}
                            {product.id && product.id.pName
                              ? product.id.pName
                              : "Product Not Available"}
                          </span>
                        </div>
                        <div className="">
                          <span className="ms-lg-4">
                            Quantity : {product.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    "Product Not Available  "
                  )}
                </div>
              </span>
            );
          })}
        </td>
        <td className=" p-2 text-center cursor-default">
          {order.status === "Not processed" && (
            <span className="block text-red-600 rounded-full text-center text-xs px-2 font-semibold">
              {order.status}
            </span>
          )}
          {order.status === "Processing" && (
            <span className="block text-yellow-600 rounded-full text-center text-xs px-2 font-semibold">
              {order.status}
            </span>
          )}
          {order.status === "Shipped" && (
            <span className="block text-blue-600 rounded-full text-center text-xs px-2 font-semibold">
              {order.status}
            </span>
          )}
          {order.status === "Delivered" && (
            <span className="block text-green-600 rounded-full text-center text-xs px-2 font-semibold">
              {order.status}
            </span>
          )}
          {order.status === "Cancelled" && (
            <span className="block text-red-600 rounded-full text-center text-xs px-2 font-semibold">
              {order.status}
            </span>
          )}
        </td>
        <td className=" p-2 text-center">
          {moment(order.createdAt).format("lll")}
        </td>
        <td className="  ps-5  adminHov  ">
          <span
            onClick={(e) => editOrder(order._id, true, order.status)}
            className="cursor-pointer  rounded-lg p-2 mx-1"
          >
            <MdEditSquare className="w-6 h-6 fill-current text-black" />
          </span>
          <span
            onClick={(e) => deleteOrderReq(order._id, dispatch)}
            className="cursor-pointer  rounded-lg p-2 mx-1"
          >
            <MdDelete className="w-6 h-6 text-black" />
          </span>
        </td>
        <td className=" p-2 text-center">
          ₹{order.amount}.00
        </td>

        {/* Add conditional checks for order.user */}
        <td className=" p-2 text-center">
          {order.user ? order.user.name : "N/A"}
        </td>
        {/* Add conditional checks for order.user */}
        <td className=" p-2 text-center">
          {order.user ? order.user.email : "N/A"}
        </td>
        {/* Add conditional checks for order.phone */}
        <td className=" p-2 text-center">
          {order.phone || "N/A"}
        </td>
        {/* Add conditional checks for order.address */}
        <td className=" p-2 text-center">
          {order.address || "N/A"}
        </td>
        <td className=" p-2 text-center">
          {order.transactionId}
        </td>
        <td className=" p-2 text-center">
          {moment(order.updatedAt).format("lll")}
        </td>
      </tr>
    </Fragment>
  );
};

export default AllCategory;
