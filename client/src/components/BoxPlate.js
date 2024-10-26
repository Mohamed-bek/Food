import React, { useEffect, useState } from "react";
import { AiFillLike, AiFillDislike, AiFillStar } from "react-icons/ai";
import { useOrderStore } from "../context/context";

const BoxPlate = ({ Plate, animate }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const { addQuantity } = useOrderStore();

  const incrementCounter = (target, setValue) => {
    let current = 0;
    const increment = Math.ceil(target / 50); // Increment step size
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setValue(target);
        clearInterval(interval);
      } else {
        setValue(current);
      }
    }, 25); // 25ms interval for smooth animation
  };

  useEffect(() => {
    incrementCounter(Plate?.likes || 0, setLikes);
    incrementCounter(Plate?.dislikes || 0, setDislikes);
  }, [Plate]);
  useEffect(() => {}, [animate]);
  return (
    <div
      className={`p-1 animate__animated animate__bounceIn duration-[2s] animated-element-forwards px-2 md:px-6 md:py-3 bg-primary rounded-xl text-secondary`}
    >
      <h3 className="font-extrabold text-[1.2rem]"> Overview </h3>
      <h1 className="text-[2.5rem] md:text-[4rem] relative w-fit font-bold flex gap-1 items-center">
        <span className="overflow-hidden">
          <span className={`block ${animate ? "RatingDown" : ""}`}>
            {Number.isInteger(Plate?.rating)
              ? `${Plate?.rating}.0`
              : Plate?.rating}
          </span>
        </span>
        <span className="absolute top-[10%] left-full">
          <AiFillStar className="text-[1.3rem] md:text-[2rem]" />
        </span>
      </h1>
      <h1 className="text-[1.3rem] md:text-[1.7rem] font-normal mb-2 md:mb-5 text-nowrap">
        Chef {Plate?.chef}
      </h1>
      <div className="flex items-center gap-5 mb-2 md:mb-5">
        <div className="py-1 px-2 bg-white rounded-3xl flex items-center gap-2 min-w-[125px]">
          <span className="p-2 rounded-full bg-primary">
            <AiFillLike className="text-white hover:text-secondary transition-[0.2s] text-[1.4rem] cursor-pointer" />
          </span>
          <span className="text-nowrap font-medium">{likes} likes</span>
        </div>
        <div className="py-1 px-3 bg-white rounded-3xl flex items-center gap-2 min-w-[125px]">
          <span className="p-2 rounded-full bg-primary">
            <AiFillDislike className="text-white hover:text-secondary transition-[0.2s] text-[1.4rem] cursor-pointer" />
          </span>
          <span className="text-nowrap font-medium">{dislikes} dislikes</span>
        </div>
      </div>
      <button
        onClick={() => addQuantity(Plate)}
        className="bg-secondary overflow-hidden py-2 text-primary block mx-auto px-4 text-[1.2rem] font-bold rounded-2xl transition-[0.6s] hover:bg-white hover:text-secondary"
      >
        <span className={`block ${animate ? "RatingDown" : ""}`}>
          {Plate?.price} DA
        </span>
      </button>
    </div>
  );
};

export default BoxPlate;
