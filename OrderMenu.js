import React, { Fragment, useState, useContext } from "react";
import { OrderContext } from "./index";
import UpdateOrderModal from "./UpdateOrderModal";
import { filterOrder } from "./Actions";
import { FaFilter } from "react-icons/fa";

const OrderMenu = (props) => {
  const { data, dispatch } = useContext(OrderContext);
  const [dropdown, setDropdown] = useState(false);
  return (
    <Fragment>
      <div className="col-span-1  flex items-center">
        <div className="flex  position-relative  flex-col space-y-5 h-full md:flex-row md:justify-between md:items-center md:space-y-0 w-full">
          {/* It's open the add order modal */}
          <div className=" text-black  mt-1  position-absolute top-2 end-0  rounded-full text-gray-100 text-sm font-semibold uppercase">
            <div
              onClick={(e) => setDropdown(!dropdown)}
              className="flex  items-center cursor-pointer rounded-full overflow-hidden p-2 justify-center"
            >
              <FaFilter className="w-6 h-6 text-black mr-2" />

              <span className="pr-2">Filter</span>
            </div>
            <div
              className={`${
                dropdown ? "" : "hidden"
              } absolute top-0 bg-success text-white right-0 mt-12 rounded-lg overflow-hidden w-full md:w-48 flex flex-col z-10`}
            >
              <span
                onClick={(e) =>
                  filterOrder("All", data, dispatch, dropdown, setDropdown)
                }
                className="px-4 py-2 hover:bg-black text-center cursor-pointer"
              >
                All
              </span>
              <span
                onClick={(e) =>
                  filterOrder(
                    "Not processed",
                    data,
                    dispatch,
                    dropdown,
                    setDropdown
                  )
                }
                className="px-4 py-2 hover:bg-black text-center cursor-pointer"
              >
                Not processed
              </span>
              <span
                onClick={(e) =>
                  filterOrder(
                    "Processing",
                    data,
                    dispatch,
                    dropdown,
                    setDropdown
                  )
                }
                className="px-4 py-2 hover:bg-black text-center cursor-pointer"
              >
                Processing
              </span>
              <span
                onClick={(e) =>
                  filterOrder("Shipped", data, dispatch, dropdown, setDropdown)
                }
                className="px-4 py-2 hover:bg-black text-center cursor-pointer"
              >
                Shipped
              </span>
              <span
                onClick={(e) =>
                  filterOrder(
                    "Delivered",
                    data,
                    dispatch,
                    dropdown,
                    setDropdown
                  )
                }
                className="px-4 py-2 hover:bg-black text-center cursor-pointer"
              >
                Delivered
              </span>
              <span
                onClick={(e) =>
                  filterOrder(
                    "Cancelled",
                    data,
                    dispatch,
                    dropdown,
                    setDropdown
                  )
                }
                className="px-4 py-2 hover:bg-black text-center cursor-pointer"
              >
                Cancelled
              </span>
            </div>
          </div>
        </div>
        {/*<AddCategoryModal/>*/}
        <UpdateOrderModal />
      </div>
    </Fragment>
  );
};

export default OrderMenu;
