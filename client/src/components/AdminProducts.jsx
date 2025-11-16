import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NotFound from "./NotFound";
import { Link } from "react-router-dom";

import { adminDeleteProduct, removeSuccess } from "../features/admin/adminSlice";
import { toast } from "react-toastify";
import Loader from "./Loader";

const AdminProducts = () => {
  const { products, success, deletingProductId } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  // console.log(products);

  // console.log("deletingProductId:", deletingProductId);

  const handleDeleteProduct = function (id) {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(adminDeleteProduct({ id }))
        .unwrap()
        .then(() => toast.success("Product Deleted Successfully"))
        .catch((err) => toast.error(err || "Product Deletion Failed"));
      // console.log("Product deleted successfully");
    }
  };

  useEffect(
    function () {
      if (success) {
        dispatch(removeSuccess());
      }
    },
    [success, dispatch]
  );

  return products.length > 0 ? (
    <div className="relative overflow-scroll h-100">
      <h2 className="text-lg mb-4 font-semibold text-gray-900 dark:text-white sm:text-xl">All Products</h2>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              SI/No
            </th>
            <th scope="col" className="px-6 py-3">
              image
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              price
            </th>
            <th scope="col" className="px-6 py-3">
              ratings
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Stock
            </th>
            <th scope="col" className="px-6 py-3">
              Created
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {products?.map((product, index) => (
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <td scope="row" className="px-6 py-4 dark:text-white text-xs">
                {index + 1}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize">
                <img className="w-15" src={product.image[0].url} />
              </td>
              <td className="px-6 py-4 capitalize">{product.name}</td>
              <td className="px-6 py-4">{product.price}</td>
              <td className="px-6 py-4">{product.ratings}</td>
              <td className="px-6 py-4">{product.category}</td>
              <td className="px-6 py-4">{product.stock}</td>
              <td className="px-6 py-4">{new Date(product.createdAt).toLocaleString().split(",")[0]}</td>
              <td className="px-6 py-4 flex items-center gap-4">
                <Link
                  className="flex items-center justify-center bg-blue-700 p-3 w-14 h-14 rounded-full cursor-pointer text-lg 
                text-white"
                  to={`/updateproduct/${product._id}`}
                >
                  &#9998;
                </Link>

                {deletingProductId === product._id ? (
                  <Loader fillColor="fill-red-700" />
                ) : (
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="flex items-center justify-center bg-red-700 p-3  w-14 h-14 rounded-full cursor-pointer text-3xl text-white"
                  >
                    &times;
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <NotFound />
  );
};

export default AdminProducts;
