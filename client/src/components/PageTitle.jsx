import React, { useEffect } from "react";

const PageTitle = ({ title }) => {
  useEffect(() => {
    document.title = `ShopIQ - ${title}`;
  }, [title]);
  return null;
};

export default PageTitle;
