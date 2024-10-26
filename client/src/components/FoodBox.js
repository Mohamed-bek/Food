import { useAuthStore, useOrderStore } from "../context/context";
import { Link } from "react-router-dom";
import React, { useRef } from "react";
import { FaHeart } from "react-icons/fa";
import { RiStarSFill, RiStarHalfSFill, RiStarLine } from "react-icons/ri";

const RenderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex justify-center items-center">
      {Array.from({ length: fullStars }, (_, i) => (
        <RiStarSFill key={`full-${i}`} className="text-yellow-500" />
      ))}
      {hasHalfStar && <RiStarHalfSFill className="text-yellow-500" />}
      {Array.from({ length: emptyStars }, (_, i) => (
        <RiStarLine key={`empty-${i}`} className="text-gray-300" />
      ))}
    </div>
  );
};

const FoodBox = ({ plate }) => {
  const { isLoggedIn } = useAuthStore();
  const { addQuantity, order } = useOrderStore();

  const playAudio = () => {
    const audio = new Audio("/sound.mp3"); // Path to the audio file
    audio.play();
  };

  const heartIconRef = useRef(null);

  return (
    <div className="FoodBox relative w-[260px] bg-white rounded-xl mb-14">
      <div className="w-full relative h-[160px] rounded-xl cursor-pointer">
        <span
          ref={heartIconRef}
          className="cursor-pointer text-[red] hover:text-secondary rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 text-[3rem] heartIcon z-[9999999999999999]"
        >
          <FaHeart />
        </span>
        <img
          onDoubleClick={() => {
            heartIconRef.current?.classList.add("active");
            playAudio();
            setTimeout(
              () => heartIconRef.current?.classList.remove("active"),
              750
            );
          }}
          className="mx-auto hover:translate-y-1/4 hover:scale-[1.7] z-[9999999] duration-300 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[20%] w-[180px]"
          src={plate?.image?.url}
          alt={plate?.name}
        />
      </div>
      <div className="p-2 text-center pt-1 pb-7 text-secondary">
        <h1 className="text-[1.35rem] text-nowrap font-bold truncate">
          {plate?.name}
        </h1>
        <p className="text-[0.9rem] font-medium mb-2">{plate?.subName}</p>
        <div className="flex justify-center items-center relative font-medium text-[1.7rem]">
          {RenderStars(plate?.rating)}
        </div>
        {isLoggedIn ? (
          <button className="px-5 border border-black border-solid absolute bottom-0 left-1/2 -translate-x-1/2 text-nowrap translate-y-1/2 py-2 mt-2 bg-secondary text-primary text-[1.3rem] cursor-pointer rounded-3xl">
            <Link to={`food/${plate._id}`}>Modify</Link>
          </button>
        ) : (
          <button
            onClick={() => {
              addQuantity(plate);
              console.log(order);
            }}
            className="px-5 border border-black border-solid absolute bottom-0 left-1/2 -translate-x-1/2 text-nowrap translate-y-1/2 py-2 mt-2 bg-secondary text-primary text-[1.3rem] cursor-pointer rounded-3xl"
          >
            {plate?.price} DA
          </button>
        )}
      </div>
    </div>
  );
};

export default FoodBox;
