import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageTitle from "./PageTitle";
import { Outlet } from "react-router-dom";

const Layout = ({ title, children }) => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <PageTitle title={title} />
      <Navbar />
      <main className="w-full max-w-7xl mx-auto p-4 md:py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
