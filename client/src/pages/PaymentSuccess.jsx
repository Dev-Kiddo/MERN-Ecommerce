import React from "react";
import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  console.log(location);
  console.log(location.search);

  const search = new URLSearchParams(location.search).get("reference");
  console.log(search);

  return <div className="text-white">PaymentSuccess</div>;
};

export default PaymentSuccess;
