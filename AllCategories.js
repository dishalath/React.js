import React, { Fragment, useContext, useEffect } from "react";
import { getAllCategory, deleteCategory } from "./FetchApi";
import { CategoryContext } from "./index";
import moment from "moment";
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { Container } from "react-bootstrap";
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
const apiURL = process.env.REACT_APP_API_URL;

const AllCategory = (props) => {
  const { data, dispatch } = useContext(CategoryContext);
  const { categories, loading } = data;

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    dispatch({ type: "loading", payload: true });
    let responseData = await getAllCategory();
    setTimeout(() => {
      if (responseData && responseData.Categories) {
        dispatch({
          type: "fetchCategoryAndChangeState",
          payload: responseData.Categories,
        });
        dispatch({ type: "loading", payload: false });
      }
    }, 1000);
  };

  const deleteCategoryReq = async (cId) => {
    let deleteC = await deleteCategory(cId);
    if (deleteC.error) {
      console.log(deleteC.error);
    } else if (deleteC.success) {
      console.log(deleteC.success);
      fetchData();
    }
  };

  /* This method call the editmodal & dispatch category context */
  const editCategory = (cId, type, des, status) => {
    if (type) {
      dispatch({
        type: "editCategoryModalOpen",
        cId: cId,
        des: des,
        status: status,
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
      <Container>

        <div className="text-sm fs-4 text-dark mb-3 d-flex justify-content-center mt-2">
          {categories && categories.length} category
        </div>
        <div className="col-span-1 overflow-auto  bg-white shadow-lg p-4">

          <table className="table-auto border   w-full my-2">

            <thead>
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 d-flex justify-content-center  border">Conduct</th>
                <th className="px-4 py-2   border">Create at</th>
                <th className="px-4 py-2   border">Modernized at</th>
                <th className="px-4 py-2 border">Image</th>
              </tr>
            </thead>
            <tbody>
              {categories && categories.length > 0 ? (
                categories.map((item, key) => {
                  return (
                    <CategoryTable
                      category={item}
                      editCat={(cId, type, des,status) =>
                        editCategory(cId, type, des,status)
                      }
                      deleteCat={(cId) => deleteCategoryReq(cId)}
                      key={key}
                    />
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-xl text-center  font-semibold py-8"
                  >
                    No category found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

        </div>
      </Container>
    </Fragment>
  );
};

/* Single Category Component */
const CategoryTable = ({ category, deleteCat, editCat }) => {
  return (
    <Fragment>
      <tr>
        <td className="p-2 border text-left">
          {category.cName.length > 20
            ? category.cName.slice(0, 20) + "..."
            : category.cName}
        </td>
        <td className="p-2 border text-left">
          {category.cDescription.length > 30
            ? category.cDescription.slice(0, 30) + "..."
            : category.cDescription}
        </td>
        <td className="p-2 adminHov flex items-center justify-center">
          <span
            onClick={(e) =>
              editCat(
                category._id,
                true,
                category.cDescription,
              )
            }
            className="cursor-pointer  rounded-lg p-2 mx-1"
          >
            <MdEditSquare className="fs-3" />
          </span>
          <span
            onClick={(e) => deleteCat(category._id)}
            className="cursor-pointer  rounded-lg p-2 mx-1"
          >
            <MdDelete className="fs-3" />
          </span>
        </td>
        <td className="p-2 border text-center">
          {moment(category.createdAt).format("ll")}
        </td>
        <td className="p-2 border text-center">
          {moment(category.updatedAt).format("ll")}
        </td>
        <td className="p-2 border text-center">
          <img
            className="w-12 h-12 object-cover object-center"
            src={`${apiURL}/uploads/categories/${category.cImage}`}
            alt=""
          />
        </td>
      </tr>
    </Fragment>
  );
};

export default AllCategory;
