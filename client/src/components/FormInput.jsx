import React, { useState } from "react";
//Library import
import { Link, useLocation } from "react-router-dom";
const FormInput = ({
  label,
  onChange,
  value,
  errorMessage,
  page,
  ...inputProps
}) => {
  const { pathname } = useLocation();
  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div>
      {inputProps.type !== "checkbox" ? (
        <>
          <label
            className={`${
              page === "profile"
                ? "text-base font-medium leading-none text-white block mb-5 space-y-2 pt-2"
                : "block mb-2 font-bold"
            }`}
            htmlFor={label}
          >
            {label}
          </label>
          <input
            className="w-full p-2 mb-6 border-b-2 border-green-500 outline-none focus:bg-gray-100"
            value={value}
            {...inputProps}
            onBlur={handleFocus}
            onFocus={() =>
              inputProps.name === "confirmPassword" && setFocused(true)
            }
            focused={pathname === "/Signin" ? "false" : focused.toString()}
            onChange={onChange}
          />
          <span className="hidden text-red-500 pb-4">{errorMessage}</span>
        </>
      ) : (
        <>
          <label className="block mb-6 font-bold">
            <input {...inputProps} onChange={onChange} /> Tôi chấp nhận{" "}
            <span className="text-blue-500">
              điều khoản sử dụng của cửa hàng
            </span>
          </label>
          <span className="hidden ">{errorMessage && errorMessage}</span>
        </>
      )}
    </div>
  );
};

export default FormInput;
