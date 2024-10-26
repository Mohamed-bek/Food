"use client";
import React, { useRef, useState } from "react";
import { IoMdMail } from "react-icons/io";
import { FaPhoneAlt, FaStore } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import emailjs from "emailjs-com";

const Page = () => {
  const popRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: "Foodly",
      message,
    };
    emailjs
      .send(
        "service_z7uljhm",
        "template_6zy5l9o",
        templateParams,
        "UlpkbnBdtvynHA5xh"
      )
      .then(
        (result) => {
          popRef.current?.classList.add("scale-[1]");
          setName("");
          setEmail("");
          setMessage(""); // Reset the form
        },
        (error) => {
          console.log(error.text);
          alert("An error occurred, please try again.");
        }
      );
  };

  return (
    <div className="mains md:h-fit py-10 bg-white relative flex justify-center items-center">
      <div
        ref={popRef}
        className="w-[340px] scale-0 md:w-[430px] py-5 px-3 bg-primary rounded-2xl text-secondary text-center font-bold duration-500 text-[2.5rem] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[999999]"
      >
        We’ll give you a quick call soon to confirm your reservation!
        <button
          onClick={() => popRef.current?.classList.remove("scale-[1]")}
          className="py-1 px-5 text-[1.7rem] block mx-auto rounded-lg bg-secondary text-primary mt-4 cursor-pointer"
        >
          Ok
        </button>
      </div>
      <div className="hidden md:block absolute w-1/5 bg-black h-full right-0 top-0"></div>
      <div className="lg:w-4/5 md:w-[90%] relative z-[999] flex justify-between items-center flex-wrap mr-0 ml-auto h-[80vh]">
        <div className="w-full md:w-[48%] justify-center lg:w-[45%] py-7 md:py-0 h-fit md:h-full text-secondary px-2 flex items-center -translate-y-[40px]">
          <div className="text-center md:text-left">
            <h1 className="text-[3rem] md:text-[6rem]">Contact Us</h1>
            <h3 className="text-[1.3rem] font-light max-w-[500px] mb-7 text-wrap mx-auto md:text-left">
              Feel free to contact us any time. We will get back to you as soon
              as we can!
            </h3>
            <form className="text-secondary" onSubmit={handleSubmit}>
              <input
                className="w-full mx-auto md:ml-0 mb-7 max-w-[400px] block focus:outline-none border-b border-secondary border-solid py-2 px-3 bg-transparent"
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="w-full mx-auto md:ml-0 mb-7 max-w-[400px] block focus:outline-none border-b border-secondary border-solid py-2 px-3 bg-transparent"
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="w-full mx-auto md:ml-0 mb-14 max-w-[400px] block focus:outline-none border-b border-secondary border-solid py-2 px-3 bg-transparent"
                type="text"
                placeholder="Message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className="w-full max-w-[400px] bg-secondary text-center py-2 text-primary text-[1.2rem] cursor-pointer">
                Send
              </button>
            </form>
          </div>
        </div>
        <div className="w-full md:w-[48%] lg:w-[45%] h-fit md:h-full text-primary flex justify-center items-center">
          <div className="bg-secondary w-[96%] sm:w-[80%] text-center md:w-full h-fit py-3 md:px-16">
            <h2 className="text-[2.2rem] font-medium mb-7">Info</h2>
            <div className="mb-10 justify-center md:justify-start flex items-center gap-3 text-[1.2rem] font-bold">
              <span>
                <IoMdMail className="text-[2.3rem]" />
              </span>
              <p>foodly.25@gmail.com</p>
            </div>
            <div className="mb-10 justify-center md:justify-start flex items-center gap-3 text-[1.2rem] font-bold">
              <span>
                <FaPhoneAlt className="text-[2.3rem]" />
              </span>
              <p>+213 5 56 27 35 55</p>
            </div>
            <div className="mb-10 justify-center md:justify-start flex items-center gap-3 text-[1.2rem] font-bold">
              <span>
                <FaStore className="text-[2.3rem]" />
              </span>
              <p>nouvelle ville uv 15 oscar</p>
            </div>
            <div className="mb-5 justify-center md:justify-start flex items-center gap-3 text-[1.2rem] font-bold">
              <span>
                <IoTime className="text-[2.3rem]" />
              </span>
              <p>09:00 - 22:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
