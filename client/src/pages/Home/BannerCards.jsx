import React from "react";

const BannerCards = ({ image, name }) => {
  return (
    <div>
      <img
        className="h-40 rounded-lg transform transition duration-500 hover:scale-95"
        src={image}
        alt={name}
      />
    </div>
  );
};

export default BannerCards;
