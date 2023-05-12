import React from "react";

const ShippingStrategy = ({ image, profit, condition }) => {
  return (
    <div className="flex items-center px-4 border-r-2">
      <div className="">
        <img src={image} alt="Ship1" />
      </div>
      <div className="ml-6">
        <h6 className="font-bold">{profit}</h6>
        <p className="text-sm text-gray-600">{condition}</p>
      </div>
    </div>
  );
};

export default ShippingStrategy;
