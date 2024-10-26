import { useAuthStore } from "../context/context";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";

function formatDate(dateString) {
  const date = new Date(dateString);
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = dayNames[date.getUTCDay()];
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  return `${dayName} ${hours}:${minutes}`;
}

const Page = () => {
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  const [isConfirm, setIsConfirm] = useState(true);
  const DeleteRef = useRef(null);
  const ConfirmRef = useRef(null);

  const [listOfOrders, setListOfOrders] = useState([]);

  const ConfirmOrder = async (id) => {
    try {
      const res = await axios.put(
        "https://food-beta-indol.vercel.app/order/" + id,
        {},
        { withCredentials: true }
      );
      ConfirmRef.current?.classList.add("scale-[1]");
      const confirmed = listOfOrders.find((ord) => ord._id === id);
      if (confirmed) {
        confirmed.isConfirmed = true;
      }
      setListOfOrders((prev) => [...prev]); // Triggers a re-render
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const CancelOrder = async (id) => {
    try {
      await axios.delete("https://food-beta-indol.vercel.app/order/" + id, {
        withCredentials: true,
      });
      DeleteRef.current?.classList.add("scale-[1]");
      const UpdatedList = listOfOrders.filter((ord) => ord._id !== id);
      setListOfOrders(UpdatedList);
      setIsConfirm(!isConfirm);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  useEffect(() => {
    const GetListOfOrders = async () => {
      try {
        const res = await axios.get(
          "https://food-beta-indol.vercel.app/orders",
          {
            withCredentials: true,
          }
        );
        setListOfOrders(res.data.orders);
      } catch (error) {
        console.log(error);
      }
    };
    GetListOfOrders();
  }, []);

  return (
    <div className="h-fit relative md:h-[calc(100dvh-70px)] flex justify-center items-start pt-10">
      <div
        ref={ConfirmRef}
        className="w-[340px] scale-0 md:w-[430px] py-5 px-3 bg-primary rounded-2xl text-secondary text-center font-bold duration-500 text-[2.5rem] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[999999]"
      >
        Order Confirmed successfully
        <button
          onClick={() => ConfirmRef.current?.classList.remove("scale-[1]")}
          className="py-1 px-5 text-[1.7rem] block mx-auto rounded-lg bg-secondary text-primary mt-4 cursor-pointer"
        >
          Ok
        </button>
      </div>
      <div
        ref={DeleteRef}
        className="w-[340px] scale-0 md:w-[430px] py-5 px-3 bg-primary rounded-2xl text-secondary text-center font-bold duration-500 text-[2.5rem] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[999999]"
      >
        Order Canceled successfully
        <button
          onClick={() => DeleteRef.current?.classList.remove("scale-[1]")}
          className="py-1 px-5 text-[1.7rem] block mx-auto rounded-lg bg-secondary text-primary mt-4 cursor-pointer"
        >
          Ok
        </button>
      </div>
      <div className="w-[90%] h-fit border-t border-l border-r border-secondary border-solid">
        <div className="w-full bg-secondary text-primary flex items-center">
          <span className="w-[20%] border-r border-primary border-solid block px-1 py-2 text-center text-[1.15rem]">
            Name
          </span>
          <span className="w-[20%] border-r border-primary border-solid block px-1 py-2 text-center text-[1.15rem]">
            Phone
          </span>
          <span className="w-[20%] border-r border-primary border-solid block px-1 py-2 text-center text-[1.15rem]">
            Location
          </span>
          <span className="w-[20%] border-r border-primary border-solid block px-1 py-2 text-center text-[1.15rem]">
            Order
          </span>
          <span className="w-[20%] block px-1 py-2 text-center text-[1.15rem]">
            Confirmation
          </span>
        </div>
        {listOfOrders.map((ord) => (
          <div
            key={ord._id}
            className="w-full border-b border-secondary border-solid bg-primary text-secondary flex items-center"
          >
            <span className="w-[20%] border-r border-secondary border-solid block px-1 py-2 text-center text-[1.15rem]">
              {ord?.name}
            </span>
            <span className="w-[20%] border-r border-secondary border-solid block px-1 py-2 text-center text-[1.15rem]">
              {ord?.phone}
            </span>
            <span className="w-[20%] border-r border-secondary border-solid block px-1 py-2 text-center text-[1.15rem]">
              {ord?.location}
            </span>
            <span className="w-[20%] border-r border-secondary border-solid block px-1 py-2 text-center text-[1.15rem]">
              <Link
                className="w-full h-full cursor-pointer"
                to={`/order/${ord._id}`}
              >
                Order
              </Link>
            </span>
            {!ord?.isConfirmed && (
              <span className="w-[20%] px-1 py-2 text-center text-[1.15rem] justify-center flex gap-1 items-center">
                <button
                  onClick={() => CancelOrder(ord._id)}
                  className="bg-[#ff0000af] p-1 px-2 cursor-pointer rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    ord.isConfirmed = true;
                    ConfirmOrder(ord._id);
                  }}
                  className="bg-[#008000b9] p-1 px-2 rounded-md cursor-pointer"
                >
                  Confirm
                </button>
              </span>
            )}
            {ord?.isConfirmed && (
              <span className="w-[20%] px-1 py-2 text-center text-[1.15rem] justify-center flex gap-1 items-center">
                {formatDate(ord?.createdAt)}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
