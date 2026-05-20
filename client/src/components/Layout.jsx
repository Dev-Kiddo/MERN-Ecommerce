import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageTitle from "./PageTitle";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import PreLoader from "./PreLoader";
import { useEffect } from "react";

const Layout = ({ title }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <PreLoader />
      ) : (
        <div className="min-h-screen flex flex-col justify-between">
          <PageTitle title={title} />
          <Navbar />
          <main className="w-full max-w-7xl mx-auto p-4 my-12 md:py-8">
            <Outlet />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Layout;
