import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NotFound from "./NotFound";

import { removeSuccess } from "../features/admin/adminSlice";

const AdminProducts = () => {
  const { products, success } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  // console.log(products);

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
                <img className="w-15" src="/images/productph.png" />
              </td>
              <td className="px-6 py-4">{product.name}</td>
              <td className="px-6 py-4">{product.price}</td>
              <td className="px-6 py-4">{product.ratings}</td>
              <td className="px-6 py-4">{product.category}</td>
              <td className="px-6 py-4">{product.stock}</td>
              <td className="px-6 py-4">{new Date(product.createdAt).toLocaleString().split(",")[0]}</td>
              <td className="px-6 py-4 flex gap-4">
                <button className="bg-blue-700 p-3 rounded-lg cursor-pointer text-md text-white">&#9998;</button>
                <button className="bg-gray-600 p-3 rounded-lg cursor-pointer text-2xl text-white">&times;</button>
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
