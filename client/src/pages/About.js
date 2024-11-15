import React from "react";

const About = () => {
  return (
    <div className="relative w-full mains flex items-center overflow-hidden">
      <div className="absolute w-[110%] h-[110%] -top-[5%] -left-[5%] bg-[#0000001d] z-[9]"></div>
      <div
        className="absolute w-[110%] h-[110%] -top-[5%] -left-[5%] blur-sm bg-cover bg-center"
        style={{ backgroundImage: "url('/images/overlay.jpg')" }}
      ></div>
      <div className="container relative flex-wrap flex items-center h-full p-3 md:p-12 mx-auto z-[9]">
        <div className="w-full text-center md:text-left md:w-1/2 md:p-6 font-bold rounded-3xl">
          <h1 className="text-[2.5rem] md:text-[4rem] text-nowrap text-white capitalize mb-6">
            foodly is the best
          </h1>
          <h2 className="text-[1.7rem] md:text-[2.2rem] text-white mb-4 pl-2">
            DON'T WAIT!
          </h2>
          <p className="text-lg text-white leading-relaxed pl-2 font-medium">
            Welcome to <span className="text-[1.3rem] font-bold">Foodly</span>,
            your go-to destination for delicious and unforgettable meals. For
            over 7 years, we have proudly served our community with a diverse
            menu crafted to satisfy every craving. From our signature pizzas and
            mouth-watering burgers to perfectly grilled meats, each dish is made
            with fresh ingredients and a passion for flavor. Whether you’re
            dining in or taking your favorite meal to-go, our mission is to
            provide exceptional food and a warm, welcoming experience. At
            Foodly, good food brings people together—so come join us and taste
            the difference today!
          </p>
        </div>
        <div className="img w-full -order-1 md:order-2 md:w-1/2 h-full flex justify-center items-center">
          <img
            className="cursor-pointer mx-auto"
            src="/images/Burger.png"
            alt="Burger Junk Food"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
