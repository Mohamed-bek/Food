import axios from "axios";
import React, { useState, useEffect } from "react";
import Plates from "./Plates";
import PlatesBox from "./PlatesBox";

const Hero = () => {
  const [MainPlates, setMainPlates] = useState([
    {
      _id: "1",
      name: "bikin",
      subName: "eggs",
      image: {
        url: "/images/plat2.png",
        public_id: "1",
      },
      chef: "Mohamed",
      price: 2000,
      likes: 100,
      dislikes: 19,
      rating: 4.5,
      description:
        "is a flavorful dish made from ground meat (typically beef or lamb) mixed with aromatic spices, herbs, onions, and sometimes breadcrumbs. The meat mixture is shaped into patties, balls, or skewers and grilled, baked, or pan-fried until juicy and tender. It pairs perfectly with pita bread, hummus, or a drizzle of yogurt sauce for extra flavor.",
    },
  ]);

  const [MainPlate, setMainPlate] = useState(MainPlates[0]);

  useEffect(() => {
    const GetMainsPlats = async () => {
      try {
        const res = await axios.get(
          "https://food-beta-indol.vercel.app/main-plats"
        );
        console.log("get main : " + res.data.mainPlats);
        setMainPlates(res.data.mainPlats);
        setMainPlate(res.data.mainPlats[0]);
      } catch (error) {
        console.log(`Couldn't get main : ` + error);
      }
    };
    GetMainsPlats();
  }, []);

  return (
    <div className="hero relative overflow-hidden">
      <div className="w-[90%] mx-auto pt-2 md:pt-10">
        <div className="animate__hinge animate__animated animated-element animate__duration2s animate__delay05s">
          <h2 className="text-[1.1rem] font-normal text-secondary text-nowrap md:text-[1.6rem] lg:text-[1.9rem]">
            Are You Hungry ?
          </h2>
          <h1 className="text-[2.2rem] font-bold uppercase text-secondary m-0 -mt-3 text-nowrap md:text-[2.5rem] lg:text-[3.5rem]">
            Don&apos;t Wait !
          </h1>
        </div>
        <PlatesBox
          MainPLates={MainPlates}
          MainPlate={MainPlate}
          setMainPlate={setMainPlate}
        />
      </div>
      <Plates MainPLates={MainPlates} MainPlate={MainPlate} />
    </div>
  );
};

export default Hero;
