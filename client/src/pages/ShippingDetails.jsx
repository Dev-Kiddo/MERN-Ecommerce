import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import CheckOutPath from "../components/CheckOutPath";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../features/cart/cartSlice";
import { Country, State, City } from "country-state-city";
import { toast } from "react-toastify";

const ShippingDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippinginfo } = useSelector((state) => state.cart);
  //   console.log(shippinginfo);

  const [formData, setFormData] = useState({
    address: shippinginfo?.address || "",
    country: shippinginfo?.country || "",
    city: shippinginfo?.city || "",
    state: shippinginfo?.state || "",
    pincode: shippinginfo?.pincode || "",
    phoneNumber: shippinginfo?.phoneNumber || "",
    email: shippinginfo?.email || "",
  });

  const countries = Country.getAllCountries();
  const states = State.getStatesOfCountry(formData.country) || [];
  const cities = City.getCitiesOfState(formData.country, formData.state) || [];

  //   console.log("states:", states);
  //   console.log("cities", cities);

  //   const [formData, setFormData] = useState({
  //     address: "",
  //     country: "",
  //     city: "",
  //     pincode: "",
  //     phoneNumber: "",
  //     email: "",
  //   });

  const handleonChange = function (e) {
    const { id, value } = e.target;

    if (id === "country") {
      setFormData((prev) => ({ ...prev, [id]: value }));
      setFormData((prev) => ({ ...prev, state: "", city: "" }));
    }

    if (id === "state") {
      setFormData((prev) => ({ ...prev, [id]: value }));
      setFormData((prev) => ({ ...prev, city: "" }));
    }

    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    if (formData.phoneNumber.length !== 10) {
      return toast.error("Please enter valid Phone Number");
    }

    // console.log("clicked");

    dispatch(saveShippingInfo(formData));
    navigate("/order/confirm");
  };
  return (
    <>
      <PageTitle title="Shipping Details" />
      <section className="mx-auto">
        <CheckOutPath currentStep={0} />

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
              <input
                type="text"
                id="address"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your address"
                required
                value={formData.address}
                onChange={handleonChange}
              />
            </div>

            <div>
              <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Select an option
              </label>

              <select
                value={formData.country}
                onChange={handleonChange}
                id="country"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option defaultValue>Choose Your country</option>
                {countries.map((country) => (
                  <option key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {formData.country ? "Select an option" : "Select The Country First *"}
              </label>

              <select
                value={formData.state}
                onChange={handleonChange}
                id="state"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option defaultValue>Choose Your State</option>
                {states.map((state) => (
                  <option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {formData.country && formData.state ? "Select an option" : "Select The Country & State First *"}
              </label>

              <select
                value={formData.city}
                onChange={handleonChange}
                id="city"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option defaultValue>Choose Your City</option>
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Pincode
              </label>
              <input
                type="text"
                id="pincode"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="123 456"
                required
                value={formData.pincode}
                onChange={handleonChange}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Phone number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="123-45-678"
                required
                value={formData.phoneNumber}
                onChange={handleonChange}
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="prasanth@gmail.com"
                required
                value={formData.email}
                onChange={handleonChange}
              />
            </div>
          </div>

          {/* <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              required
            />
          </div>
          <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            I agree with the{" "}
            <Link href="#" className="text-blue-600 hover:underline dark:text-blue-500">
              terms and conditions
            </Link>
            .
          </label>
        </div> */}

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 mt-6 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Continue
          </button>
        </form>
      </section>
    </>
  );
};

export default ShippingDetails;
