import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DashboardCard = () => {
  const { numOfProducts } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const cardsList = [
    { cardTitle: "Total Products", value: numOfProducts },
    { cardTitle: "Total Orders", value: 3 },
    { cardTitle: "Total Reviews", value: 3 },
    { cardTitle: "Total Revenue", value: 900 },
    { cardTitle: "Out Of Stock", value: 2 },
    { cardTitle: "In Stock", value: 10 },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-4">
      {cardsList.map((cardItem) => (
        <div className="flex" key={cardItem.cardTitle}>
          <Link
            to="#"
            className="flex flex-col items-stretch justify-between max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white capitalize">{cardItem.cardTitle}</h5>
            <p className="text-xs dark:text-gray-400">Lorem ipsum is placeholder text commonly used fro development</p>
            <p className="w-full h-15 mt-4 flex justify-center items-center text-white bg-gray-600 rounded-lg">
              {cardItem.cardTitle === "Total Revenue" ? "₹" : ""}
              {cardItem.value}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default DashboardCard;
