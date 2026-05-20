import React from "react";

function PreLoader() {
  return (
    <section className="w-full h-screen flex justify-center items-center bg-blue-95000">
      <div role="status" className="w-15 rounded-full relative">
        <img src="/images/Add to cart.gif" alt="" />
        <span className="sr-only">Loading…</span>
      </div>
    </section>
  );
}

export default PreLoader;
