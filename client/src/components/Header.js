import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useOrderStore, useAuthStore } from "../context/context";
import { FaPlus, FaMinus } from "react-icons/fa";
import axios from "axios";

const Header = () => {
  const [title, setTitle] = useState("Loading...");

  useEffect(() => {
    setTitle("Reservations");
  }, []);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const navRef = useRef(null);
  const CardRef = useRef(null);
  const { order, addQuantity, subQuantity, getTotalAmount } = useOrderStore();
  const { isLoggedIn } = useAuthStore();
  const [links, setLinks] = useState([
    { link: "/", name: "Home" },
    { link: "/menu", name: "Menu" },
    { link: "/bookinglist", name: "Book" },
    { link: "/orders", name: "Orders" },
  ]);

  useEffect(() => {
    if (!isLoggedIn) {
      setLinks([
        { link: "/", name: "Home" },
        { link: "/menu", name: "Menu" },
        { link: "/booking", name: "Book" },
        { link: "/about", name: "About Us" },
        { link: "/contact", name: "Contact Us" },
      ]);
    }
  }, [isLoggedIn]);

  const toggleMenu = () => {
    if (navRef.current) {
      const liElements = navRef.current.querySelectorAll("li");
      const isActive = navRef.current.classList.contains("active");

      if (isActive) {
        liElements.forEach((li) => li.classList.add("exiting"));
        setTimeout(() => {
          navRef.current?.classList.remove("active");
          liElements.forEach((li) => li.classList.remove("exiting"));
        }, 500);
      } else {
        navRef.current.classList.add("active");
      }
    }
  };

  const MadeOrder = async (e) => {
    e.preventDefault();
    try {
      console.log("Order: ", order);
      const res = await axios.post(
        "https://food-beta-indol.vercel.app/order",
        { order, name, location, phone },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json", // Important: Correct content type
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="boncDown -translate-y-full bg-primary MainHeder relative flex justify-around items-center w-full h-[70px] border-b-[2px] z-[999999999999999999999999999] border-solid border-secondary">
      <nav
        ref={CardRef}
        className="fixed duration-500 text-primary h-[100vh] top-0 overflow-y-visible  py-7 right-0  bg-[#383636f1] w-full md:w-[600px] z-[9999999999999999999] translate-x-full"
      >
        <h1 className="px-4 py-3 text-primary text-[4.5rem] mb-5 w-fit mx-auto">
          Orders
        </h1>
        {order.map((item) => (
          <div
            key={item.plat._id}
            className="mx-auto mb-3 px-1 flex items-center w-full md:w-[90%] gap-3 text-primary"
          >
            <img className="w-1/5" src={item.plat.image?.url} alt="" />
            <p className="flex-1 text-[1.8rem] font-medium">
              {item.plat.name + " " + item.plat.subName}
            </p>
            <span
              onClick={() => subQuantity(item.plat._id)}
              className="block cursor-pointer p-1 md:p-2 rounded-full bg-primary text-secondary text-[1.2rem] md:text-[1.6rem]"
            >
              <FaMinus />
            </span>
            <p className="text-[1.5rem] mx-2">{item.quantity}</p>
            <span
              onClick={() => addQuantity(item.plat)}
              className="block cursor-pointer p-1 md:p-2 rounded-full bg-primary text-secondary text-[1.2rem] md:text-[1.6rem]"
            >
              <FaPlus />
            </span>
            <p className="w-1/6">{item.quantity * item.plat.price} DA</p>
          </div>
        ))}
        <p className="text-[1.4rem] text-primary font-medium text-center mt-2">
          The Total Amount is {getTotalAmount()} DA
        </p>
        {order.length > 0 && (
          <form className="w-4/5 max-w-[200px] mx-auto" onSubmit={MadeOrder}>
            <label className="text-[1.1rem] block text-primary mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full text-secondary mb-2 focus:outline-secondary px-2 py-1 rounded-sm"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <label className="text-[1.1rem] block text-primary mb-1">
              Phone
            </label>
            <input
              type="text"
              className="w-full text-secondary mb-2 focus:outline-secondary px-2 py-1 rounded-sm"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
            <label className="text-[1.1rem] block text-primary mb-1">
              Location
            </label>
            <input
              type="text"
              className="w-full text-secondary mb-2 focus:outline-secondary px-2 py-1 rounded-sm"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
            />
            <button
              type="submit"
              className="bg-primary px-4 py-2 rounded-3xl text-secondary text-[1.2rem] font-medium cursor-pointer block mx-auto mt-4"
            >
              Confirm
            </button>
          </form>
        )}
      </nav>
      <div className="text-[2.5rem] capitalize pr-4 text-secondary font-bold">
        Foodly
      </div>
      <ul
        ref={navRef}
        className="NavBar flex duration-1000 h-full items-center w-fit bg-primary"
      >
        {links.map((item, index) => (
          <li
            key={index}
            className="block cursor-pointer px-[15px] py-[25px] text-center text-[1.2rem] capitalize text-secondary font-medium relative z-[3]"
          >
            <Link to={item.link}>{item.name}</Link>
          </li>
        ))}
      </ul>
      <span className="flex items-center gap-5">
        <span className="fixed top-5 z-[99999999999999999999999999999999999999999999] right-7">
          <span className="absolute z-[9999999999999999999999] -top-[35%] -right-[35%] bg-red-500 text-white p-1 rounded-full w-5 h-5 flex justify-center items-center">
            {order.length}
          </span>
          <FaShoppingCart
            onClick={(e) => {
              e.target.classList.toggle("text-white");
              CardRef.current?.classList.toggle("translate-x-0");
              CardRef.current?.classList.toggle("translate-x-full");
            }}
            className="text-[1.8rem] cursor-pointer z-[999999999999999999999999999]"
          />
        </span>
        <div className="md:hidden" onClick={toggleMenu}>
          <GiHamburgerMenu className="text-[1.8rem] cursor-pointer" />
        </div>
      </span>
    </div>
  );
};

export default Header;
