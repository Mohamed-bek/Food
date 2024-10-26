import { LuSettings2 } from "react-icons/lu";
import FoodBox from "../components/FoodBox";
import React, { useEffect, useRef, useState } from "react";
import { RiStarSFill } from "react-icons/ri";
import axios from "axios";
import { MdAdd } from "react-icons/md";
import { useAuthStore } from "../context/context";
import { Link } from "react-router-dom";

const Page = () => {
  const { isLoggedIn } = useAuthStore();
  const spanRef = useRef(null); // Removed TypeScript type
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedSections, setSelectedSections] = useState([]);
  const [rating, setRating] = useState(1);

  const menuSections = [
    { id: "appetizers", label: "Appetizers" },
    { id: "main_courses", label: "Entrées" },
    { id: "desserts", label: "Desserts" },
    { id: "beverages", label: "Beverages" },
  ];

  const handleCheckboxChange = (event) => {
    const section = event.target.value;

    setSelectedSections((prev) => {
      if (prev.includes(section)) {
        return prev.filter((s) => s !== section); // Remove if already selected
      } else {
        return [...prev, section]; // Add if not selected
      }
    });
  };

  const [plates, setPlates] = useState([]);

  const GetFilterPlats = async () => {
    try {
      const res = await axios.get("https://food-beta-indol.vercel.app/plats", {
        params: {
          minPrice,
          maxPrice,
          sections: selectedSections,
          rating,
        },
      });
      setPlates(res.data.plats);
      console.log("Filter Plats ", res.data.plats);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetFilterPlats();
  }, []);

  const navRef = useRef(null);

  return (
    <div className="w-full relative z-10 flex justify-between items-center flex-wrap">
      <nav
        ref={navRef}
        className="fixed duration-500 text-primary h-[100vh] top-[0px] left-0 -translate-x-full bg-[#383636f1] w-full md:w-[300px] z-[99999999999999]"
      >
        <h1 className="text-[2.5rem] capitalize pl-3 font-bold mb-[55px] py-2">
          Foodly
        </h1>
        <h2 className="pl-3 text-[1.7rem] mb-4">Filters:</h2>
        <h3 className="pl-5 text-[1.4rem]">Menu Sections:</h3>
        <div className="px-5 text-[1.15rem] text-primary">
          {menuSections.map((section) => (
            <label
              key={section.id}
              className="flex items-center mb-2 text-[1.1rem]"
            >
              <input
                type="checkbox"
                value={section.id}
                checked={selectedSections.includes(section.id)}
                onChange={handleCheckboxChange}
                className="mr-2 w-4 h-4"
              />
              {section.label}
            </label>
          ))}
          <div className="mb-2">
            <label className="block mb-1 text-[1.3rem]">Min Price:</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="rounded-md text-black font-bold py-1 px-2 w-full focus:outline-none"
              placeholder="DA"
            />
          </div>

          <div className="mb-2">
            <label className="block mb-1 text-[1.3rem]">Max Price:</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="rounded-md text-black font-bold px-2 py-1 w-full focus:outline-none"
              placeholder="DA"
            />
          </div>

          {/* Rating Filter */}
          <div className="mb-2">
            <label className="block mb-1 text-[1.3rem]">Rating:</label>
            <div className="flex justify-center items-center space-x-2">
              {Array.from({ length: 5 }, (_, i) => {
                const starValue = i + 1;
                return (
                  <RiStarSFill
                    key={starValue}
                    className={`cursor-pointer text-[2rem] ${
                      starValue <= rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                    onClick={() => setRating(starValue)}
                  />
                );
              })}
            </div>
          </div>
          <button
            onClick={() => GetFilterPlats()}
            className="w-fit block px-4 py-2 bg-primary text-secondary cursor-pointer rounded-3xl mt-3 text-[1.5rem] font-medium mx-auto"
          >
            Apply Filters
          </button>
        </div>
      </nav>
      <div className="w-full ">
        <span
          ref={spanRef}
          onClick={() => {
            spanRef.current?.classList.toggle("bg-white");
            spanRef.current?.classList.toggle("text-secondary");
            navRef.current?.classList.toggle("-translate-x-full");
          }}
          className="p-3 fixed top-[80px] left-[20px] duration-300 z-[999999999999] text-[1.7rem] text-primary bg-secondary rounded-full cursor-pointer"
        >
          <LuSettings2 />
        </span>
        {isLoggedIn && (
          <h1 className="w-fit flex items-center gap-2 ml-auto mr-4 mt-3 px-4 py-2 bg-secondary relative z-[9999999] rounded-full text-primary text-[1.5rem] cursor-pointer">
            <Link to="/add-plat">Add Plat</Link> <MdAdd />
          </h1>
        )}
      </div>
      <div className="w-[90%] mx-auto flex justify-center gap-3 gap-y-5 items-center flex-wrap pt-10">
        {plates.length > 0 &&
          plates.map((plate) => <FoodBox key={plate._id} plate={plate} />)}
      </div>
    </div>
  );
};

export default Page;
