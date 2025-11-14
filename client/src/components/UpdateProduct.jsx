import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetails } from "../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { adminUpdateProduct, removeError, removeSuccess } from "../features/admin/adminSlice";
import { toast } from "react-toastify";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, isLoading, error } = useSelector((state) => state.product);
  console.log(product);

  const { product: updatedProduct, loading, error: updateProdctErr, success } = useSelector((state) => state.admin);

  const categories = ["mens", "womens", "kids", "electronis", "appliances", "books", "sports", "movies"];

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    oldImage: "",
    previewImages: "",
    newImage: "",
    newPreviewImages: "",
  });

  const { id } = useParams();

  const handleSubmit = function (e) {
    e.preventDefault();

    const payload = new FormData();

    payload.append("name", formData.name);
    payload.append("description", formData.description);
    payload.append("price", formData.price);
    payload.append("stock", formData.stock);
    payload.append("category", formData.category);

    // if (!formData.newImage.length > 0) {
    //   formData.oldImage.forEach((file) => payload.append("image", file));
    // } else {
    //   formData.newImage.forEach((file) => payload.append("image", file));
    // }

    if (formData.newImage.length > 0) {
      formData.newImage.forEach((file) => payload.append("image", file));
    } else {
      payload.append("oldImage", JSON.stringify(formData.oldImage));
    }

    // for (const [key, value] of payload.entries()) {
    //   console.log(key, value);
    // }

    dispatch(adminUpdateProduct({ id, formData: payload }));
  };

  const handleOnChange = (e) => {
    const { id, files, value } = e.target;

    if (id === "image") {
      //   console.log(files);

      const fileArray = Array.from(files);

      // Preview
      const previews = fileArray.map((file) => URL.createObjectURL(file));

      // Update your state
      setFormData((prev) => ({
        ...prev,
        newImage: fileArray,
        newPreviewImages: previews,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  useEffect(
    function () {
      if (product) {
        setFormData((prev) => ({
          ...prev,
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          category: product.category,
          oldImage: product.image,
          previewImages: product.image,
        }));
      }
    },

    [product]
  );

  useEffect(
    function () {
      dispatch(getProductDetails(id));
    },

    [dispatch, id]
  );

  useEffect(
    function () {
      if (success) {
        toast.success("Product updated successfully");
        navigate(-1);
        dispatch(removeSuccess());
      }
    },
    [dispatch, success, navigate]
  );

  useEffect(
    function () {
      if (updateProdctErr) {
        toast.error(updateProdctErr);
        dispatch(removeError());
      }
    },

    [updateProdctErr, dispatch]
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="p-4">
          <h2 className="text-lg mb-6 text-center font-semibold text-gray-900 dark:text-white sm:text-xl">Update Product</h2>
          <form className="w-full mx-auto" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Product Name
              </label>
              <input
                type="input"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Men's Shirt, XL Full Sleeve"
                required
                value={formData.name}
                onChange={handleOnChange}
              />
            </div>

            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Product Description
              </label>
              <input
                type="input"
                id="description"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write a Product Description"
                required
                value={formData.description}
                onChange={handleOnChange}
              />
            </div>

            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Product Price
              </label>
              <input
                type="number"
                id="price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="789"
                required
                value={formData.price}
                onChange={handleOnChange}
              />
            </div>

            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Stocks In-hand
              </label>
              <input
                type="number"
                id="stock"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="10"
                required
                value={formData.stock}
                onChange={handleOnChange}
              />
            </div>

            <div className="mb-5">
              <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Choose Product Category
              </label>
              <select
                id="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={formData.category}
                onChange={handleOnChange}
              >
                <option>Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category} className="capitalize">
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-center w-full mb-2">
              <label className="flex flex-col items-center justify-center w-full h-25 border-1 border-gray-300 border-solid rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Click to upload product images</p>
                </div>
                <input id="image" type="file" className="hidden" accept="image/" multiple onChange={handleOnChange} />
              </label>
            </div>

            {formData.oldImage && formData?.previewImages?.length > 0 && (
              <>
                <p className="text-gray-200 text-xs mb-1">Old Images</p>
                <div className="flex gap-2 items-center justify-baseline w-fit h-15 rounded-lg overflow-hidden ">
                  {formData.previewImages?.map((image, index) => (
                    <img key={index} className="w-15 object-cover" src={image.url} />
                  ))}
                </div>
              </>
            )}

            {formData.newImage && formData?.newPreviewImages?.length > 0 && (
              <>
                <p className="text-gray-200 text-xs mb-1 mt-2">New Images</p>
                <div className="flex gap-2 items-center justify-baseline w-fit h-15 rounded-lg overflow-hidden ">
                  {formData.newPreviewImages?.map((image, index) => (
                    <img key={index} className="w-15 object-cover" src={image} />
                  ))}
                </div>
              </>
            )}

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 mt-6 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {loading ? "Updating..." : "Update Product"}{" "}
              {loading && (
                <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateProduct;
