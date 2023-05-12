import React from "react";
import { useLocation } from "react-router-dom";
const HeaderSection = ({ path, content }) => {
  let { pathname } = useLocation();

  return (
    <div>
      <a
        className={`${
          pathname === path ? "text-green-600" : "text-black"
        } py-4 px-2 font-bold hover:text-green-600 `}
        href={path}
      >
        {content}
      </a>
    </div>
  );
};

export default HeaderSection;
