import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { checkStatus } from "../utils/showStatus";
const ProductCard = ({ id, quantity, name, price, image }) => {
  return (
    <div className="w-52 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-2xl mb-8">
      <a href={`/Product/${id}`}>
        <img
          src={`/product/${image}`}
          alt="Product"
          className="h-56 w-60 object-cover rounded-t-xl"
        />
      </a>
      <div className="px-2 py-2 w-56">
        <p className="text-lg font-bold truncate block capitalize">{name}</p>
        <p className="text-gray-400">{checkStatus(quantity)}</p>
        <div className="flex items-center">
          <p className="text-lg font-semibold text-black cursor-auto my-3">
            {`${price}đ`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
