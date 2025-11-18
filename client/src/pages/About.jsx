import React from "react";
import PageTitle from "../components/PageTitle";

const About = () => {
  return (
    <>
      <PageTitle title="About" />
      <div class="items-center mx-auto py-4 px-4">
        <h2 class="mt-10 text-4xl lg:text-center font-extrabold text-gray-900 dark:text-white">About Project 🛍️</h2>
      </div>

      <section>
        <div class="gap-16 items-center py-4 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">MERN Stack E-Commerce Application </h2>
            <p class="mb-4 font-light text-justify">
              A fully functional online shopping platform built to demonstrate real-world features used in modern e-commerce systems. This project was developed to strengthen my
              full-stack development skills and implement practical features such as authentication, cart management, payments, admin dashboard, and more.
            </p>
            <p className="font-light text-justify">My focus was to make the application clean, fast, secure, and scalable, using industry-standard tools and best practices.</p>
          </div>
          <div class="grid grid-cols-2 gap-4 mt-8">
            <img class="w-full rounded-lg" src="https://res.cloudinary.com/dnbswhvko/image/upload/v1763137613/about2_tpxk52.jpg" alt="about 1" />
            <img class="mt-4 w-full lg:mt-10 rounded-lg" src="https://res.cloudinary.com/dnbswhvko/image/upload/v1763137613/about1_sojet3.jpg" alt="about 2" />
          </div>
        </div>
      </section>

      <hr className="my-4  dark:border-gray-600" />

      <section>
        <div class="py-8 px-4 mx-auto lg:py-16 lg:px-6">
          <div class="text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 class="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">SHOPIQ ~ Key Features</h2>
            <h2 class="mb-4 text-xl tracking-tight font-bold text-gray-900 dark:text-white">User Features</h2>
            <p class="mb-4 font-light text-justify">
              User Registration & Login, JWT Authentication, cookies, Product Listing with categories & search, Product Details Page, Add to Cart / Remove from cart, Checkout Flow,
              Order History & Order Details, Secure Online Payment using Razorpay, Image upload support via Cloudinary (for profile/products if used)
            </p>
            <h2 class="mb-4 text-xl tracking-tight font-bold text-gray-900 dark:text-white">Admin Features</h2>
            <p class="font-light">
              Admin Dashboard, Add New Products, Update Existing Products, Delete Products, Manage Orders (update order status, view user orders), Real-time product image upload
              using Cloudinary
            </p>
          </div>
        </div>
      </section>

      <hr className="my-4  dark:border-gray-600" />

      <section>
        <div class="py-8 px-4 mx-auto lg:py-16 lg:px-6">
          <div class="text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 class="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">Tech Stack</h2>
            <h2 class="text-xl tracking-tight font-bold text-gray-900 dark:text-white">Frontend</h2>
            <p class="mb-4 font-light text-justify">React.js, Redux & Redux Toolkit, TailwindCSS, React Router</p>
            <h2 class="text-xl tracking-tight font-bold text-gray-900 dark:text-white">Backend</h2>
            <p class="mb-4 font-light">Node.js, Express.js, JWT Authentication, bcryptjs, cookie-parser, Cloudinary SDK</p>
            <h2 class="text-xl tracking-tight font-bold text-gray-900 dark:text-white">Database</h2>
            <p class="mb-4 font-light">MongoDB</p>
            <h2 class=" text-xl tracking-tight font-bold text-gray-900 dark:text-white">Payment Gateway</h2>
            <p class="font-light mb-4">Razorpay Integration</p>
            <h2 class=" text-xl tracking-tight font-bold text-gray-900 dark:text-white">Deployment</h2>
            <p class="font-light ">Frontend: , Backend: </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
