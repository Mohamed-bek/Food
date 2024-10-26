import React, { useState, useEffect, useRef } from "react";
import { useOrderStore } from "../context/context";
import axios from "axios";
import { Link } from "react-router-dom";

const BestSelles = () => {
  const [plates, setPlates] = useState([]);
  const { addQuantity } = useOrderStore();

  useEffect(() => {
    const getMainsPlats = async () => {
      try {
        const res = await axios.get(
          "https://foodlly-ozos.vercel.app/best-selles-plats"
        );
        setPlates(res.data.bestSellesPlats);
      } catch (error) {
        console.log(error);
      }
    };
    getMainsPlats();
  }, []);

  const plateRefs = useRef(Array(plates.length).fill(null));
  const [shownPlates, setShownPlates] = useState(
    Array(plates.length).fill(false)
  );

  const isElementInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight)
    );
  };

  const handleScroll = () => {
    plateRefs.current.forEach((ref, index) => {
      if (ref && isElementInViewport(ref) && !shownPlates[index]) {
        setShownPlates((prev) => {
          const newShownPlates = [...prev];
          newShownPlates[index] = true;
          return newShownPlates;
        });
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full p-5 bg-white mx-auto pb-7">
      {plates.length > 0 &&
        plates.map((plate, i) => (
          <div
            key={plate._id}
            className="w-full gap-10 bg-primary px-2 md:px-5 py-3 rounded-2xl overflow-hidden flex items-center justify-between mb-5 flex-wrap"
          >
            <div className="w-[100%] text-center md:text-left md:flex-1 text-secondary">
              <h1 className="text-[1.8rem] md:text-[3rem] font-semibold mb-4">
                {plate?.name + " " + plate?.subName}
              </h1>
              <p className="text-[1.2rem] font-normal mb-5">
                {plate?.description}
              </p>
              <div className="w-full flex gap-5 justify-center items-center">
                <button className="bg-primary px-5 py-2 text-[1.2rem] text-secondary rounded-xl border border-secondary border-solid">
                  <Link to="/menu">More</Link>
                </button>
                <button
                  onClick={() => addQuantity(plate)}
                  className="bg-secondary px-5 py-2 text-[1.2rem] text-primary rounded-xl"
                >
                  {plate?.price} DA
                </button>
              </div>
            </div>
            <div
              ref={(el) => {
                plateRefs.current[i] = el;
              }}
              className={`w-full -order-1 md:w-[45%] max-w-[580px] plate ${
                shownPlates[i] ? "show" : ""
              } ${i % 2 === 0 ? "md:-order-1 plate1" : "md:order-3 plate2"}`}
            >
              <img
                className="mx-auto w-full"
                src={plate?.image?.url}
                alt={plate?.name}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default BestSelles;
