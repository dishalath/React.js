import React, { Fragment, useContext, useEffect, useState } from "react";
import { getAllProduct, deleteProduct } from "./FetchApi";
import moment from "moment";
import { ProductContext } from "./index";
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
const apiURL = process.env.REACT_APP_API_URL;

const AllProduct = (props) => {
  const { data, dispatch } = useContext(ProductContext);
  const { products } = data;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    setLoading(true);
    let responseData = await getAllProduct();
    setTimeout(() => {
      if (responseData && responseData.Products) {
        dispatch({
          type: "fetchProductsAndChangeState",
          payload: responseData.Products,
        });
        setLoading(false);
      }
    }, 1000);
  };

  const deleteProductReq = async (pId) => {
    let deleteC = await deleteProduct(pId);
    if (deleteC.error) {
      console.log(deleteC.error);
    } else if (deleteC.success) {
      console.log(deleteC.success);
      fetchData();
    }
  };

  /* This method call the editmodal & dispatch product context */
  const editProduct = (pId, product, type) => {
    if (type) {
      dispatch({
        type: "editProductModalOpen",
        product: { ...product, pId: pId },
      });
    }
  };

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
      <div className="text-sm fs-4 d-flex justify-content-center text-dark mb-3 mt-2">
        {products && products.length} Product
      </div>
      <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
        <table className="table-auto border w-full my-2">
          <thead>
            <tr>
              <th className="px-4 py-2  border">Name</th>
              <th className="px-4 py-2  border">Description</th>
              <th className="px-4 py-2  border">Stock</th>
              <th className="px-4 py-2  border">Category</th>
              <th className="px-4 py-2  border">Offer</th>
              <th className="px-4 py-2  border">Actions</th>
              <th className="px-4 py-2  border">Create at</th>
              <th className="px-4 py-2  border">Modernized at</th>
              <th className="px-4 py-2 d-flex justify-content-center border">Image</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 ? (
              products.map((item, key) => {
                return (
                  <ProductTable
                    product={item}
                    editProduct={(pId, product, type) =>
                      editProduct(pId, product, type)
                    }
                    deleteProduct={(pId) => deleteProductReq(pId)}
                    key={key}
                  />
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="10"
                  className="text-xl text-center font-semibold py-8"
                >
                  No product found
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>
    </Fragment>
  );
};

/* Single Product Component */
const ProductTable = ({ product, deleteProduct, editProduct }) => {
  return (
    <Fragment>
      <tr>
        <td className="p-2  border  text-left">
          {product.pName.length > 15
            ? product.pDescription.substring(1, 15) + "..."
            : product.pName}
        </td>
        <td className="p-2  border  text-left">
          {product.pDescription.slice(0, 15)}...
        </td>

        <td className="p-2 border text-center ">{product.pQuantity}</td>
        <td className="p-2 border text-center">
          {product.pCategory ? product.pCategory.cName : "N/A"}
        </td>

        <td className="p-2 border text-center">{product.pOffer} %</td>
        <td className="p-2 adminHov flex items-center justify-center">
          <span
            onClick={(e) => editProduct(product._id, product, true)}
            className="cursor-pointer  rounded-lg p-2 mx-1"
          >
            <MdEditSquare className="fs-3" />
          </span>
          <span
            onClick={(e) => deleteProduct(product._id)}
            className="cursor-pointer  rounded-lg p-2 mx-1"
          >
            <MdDelete className="fs-3" />
          </span>
        </td>
        <td className="p-2 border text-center">
          {moment(product.createdAt).format("lll")}
        </td>
        <td className="p-2 border text-center">
          {moment(product.updatedAt).format("lll")}
        </td>
        <td className="p-2  d-flex justify-content-center  border text-center">
          <img
            className="w-12 h-12 d-flex justify-content-center object-cover object-center"
            src={`${apiURL}/uploads/products/${product.pImages[0]}`}
            alt="pic"
          />
        </td>
      </tr>
    </Fragment>
  );
};

export default AllProduct;
