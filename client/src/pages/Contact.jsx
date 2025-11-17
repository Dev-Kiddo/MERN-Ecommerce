import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../config/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = function (e) {
    e.preventDefault();
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const { data } = await axios.post(`${API}/contact`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success(data.message || "Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <div className="py-8 lg:py-16 px-4 mx-auto">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl max-w-screen-md mx-auto">
          Have a question? Found a bug?
          <br /> Or just want to tell that our website looks “kinda nice”? Whatever it is — Iam here, alive, and reading messages with full seriousness (mostly).
        </p>
        <form className="space-y-8" onSubmit={handleOnSubmit}>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light"
              placeholder="Prasanth@Your-mail.com"
              required
              value={formData.email}
              onChange={handleOnChange}
            />
          </div>

          <div>
            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light"
              placeholder="Let us know how we can help you"
              required
              value={formData.subject}
              onChange={handleOnChange}
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Your message
            </label>
            <textarea
              id="message"
              rows="6"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Leave a comment..."
              value={formData.message}
              onChange={handleOnChange}
            ></textarea>
          </div>

          <button
            type="submit"
            className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 sm:w-fit hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600"
          >
            {isLoading ? " Disturbing 😭" : "Disturb Me 😂"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
