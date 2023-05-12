import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
const Search = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("Key");
  const [foundData, setFoundData] = useState([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    let ignore = false;
    axios
      .get(`${process.env.REACT_APP_USER_URL}/product/search/${keyword}`)
      .then(function (response) {
        console.log(response);
        setFoundData(response.data.products);
      })
      .catch(function (error) {
        console.log(error);
      });
    return () => {
      ignore = true;
    };
  }, [keyword]);

  const handleSearch = () => {
    window.location.href = `/Search?Key=${query}`;
  };

  return (
    <div class="flex justify-center items-center md:px-10 min-h-screen bg-gray-200">
      <div class="w-96 my-12 h-auto bg-[#f2f9fb] transition-all rounded-lg md:w-full p-4">
        <div class="relative px-2">
          <input
            class="w-full h-12 text-base outline-none border mt-3 rounded-lg border-green-600 transition-all pl-7 pr-20 focus:border-blue-600"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search product..."
          />
          <i class="absolute top-7 text-[#bfc6cd] left-2 fa fa-search"></i>
          <button
            onClick={() => handleSearch()}
            class="absolute right-2 rounded-lg cursor-pointer transition-all hover:bg-blue-600 top-4 h-10 w-24 bg-green-500 text-white text-sm mr-1"
          >
            Search
          </button>
        </div>
        <div class="flex mt-3 justify-between items-center">
          <p class="text-gray-600 text-sm font-semibold ml-4">
            Hiển thị 6 kết quả
          </p>
        </div>
        <section className="py-8 grid grid-cols-5 gap-2 justify-items-center justify-center">
          {foundData.map((data) => (
            <ProductCard
              key={data.ID}
              id={data.ID}
              image={data.Image}
              name={data.Name}
              price={data.Price}
              quantity={data.Quantity}
            />
          ))}
        </section>

        <section className="py-8 grid grid-cols-5 gap-2 justify-items-center justify-center">
          <div className="w-56 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-2xl mb-8"></div>
        </section>
      </div>
    </div>
  );
};

export default Search;
