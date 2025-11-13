import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const CreateNewProduct = () => {
  const categories = ["mens", "womens", "kids", "electronis", "appliances", "books", "sports", "movies"];
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: "",
    previewImages: [],
  });

  // const handleOnChange = function (e) {
  //   const { id, files, value } = e.target;

  //   if (id === "image") {
  //     const file = files[0];
  //     console.log(file);

  //     if (!file) return;

  //     const reader = new FileReader();

  //     reader.readAsDataURL(file);

  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setFormData((prev) => ({ ...prev, image: reader.result }));
  //       }
  //     };

  //     reader.onerror = (err) => {
  //       toast.error("Unable to Upload, Error reading file");
  //       console.error("Error reading file:", err.target.error);
  //     };
  //   } else {
  //     setFormData((prev) => ({ ...prev, [id]: value }));
  //   }
  // };

  const handleOnChange = (e) => {
    const { id, files, value } = e.target;

    if (id === "image") {
      console.log(files);

      // Convert FileList to Array
      const fileArray = Array.from(files);
      // console.log("Selected files:", fileArray);

      // Preview (optional)
      const previews = fileArray.map((file) => URL.createObjectURL(file));

      // Update your state
      setFormData((prev) => ({
        ...prev,
        image: fileArray, // store actual File objects
        previewImages: previews, // for showing previews
      }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = function (e) {
    e.preventDefault();

    const payload = new FormData();

    payload.append("name", formData.name);
    payload.append("description", formData.description);
    payload.append("price", formData.price);
    payload.append("stock", formData.stock);
    payload.append("category", formData.category);
    formData.image.forEach((file) => payload.append("image", file));

    for (const [key, value] of payload.entries()) {
      console.log(key, value);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg mb-6 text-center font-semibold text-gray-900 dark:text-white sm:text-xl">Create Product</h2>
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

        {formData.previewImages.length > 0 && (
          <div className="flex gap-2 items-center justify-baseline w-fit h-15 rounded-lg overflow-hidden ">
            {formData.previewImages?.map((image, index) => (
              <img key={index} className="w-15 object-cover" src={image} />
            ))}
          </div>
        )}

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 mt-6 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateNewProduct;
