import { useAuthStore } from "../context/context";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { id } = useParams();
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await axios.get(
          "https://food-beta-indol.vercel.app/order/" + id,
          { withCredentials: true }
        );
        setOrder(res.data.order);
      } catch (error) {
        console.error("Failed to fetch order:", error); // Optionally log the error
      }
    };

    getOrder();
  }, [id]);

  return (
    <div className="w-full h-[calc(100dvh-70px)] overflow-y-visible py-10">
      <h1 className="text-[2rem] font-medium md:text-[3rem] mb-5 text-center">
        Order Of {order?.name}
      </h1>
      <div className="w-[90%] mx-auto flex justify-center flex-wrap items-center gap-5">
        {order?.order.map((item, index) => (
          <div
            key={index} // Add a unique key for each item
            className="w-[250px] pt-1 h-[340px] rounded-xl shadow-md border border-secondary border-solid text-primary bg-secondary"
          >
            <div className="w-full h-1/2">
              <img
                className="w-4/5 mx-auto"
                src={item.plat.image?.url}
                alt=""
              />
            </div>
            <div className="flex justify-center items-center h-1/2">
              <div className="w-full h-fit">
                <p className="flex-1 text-[1.8rem] font-medium text-center">
                  {item.plat.name + " " + item.plat.subName}
                </p>
                <p className="text-[1.1rem] text-center mx-2">
                  Quantity: <span className="font-bold">{item.quantity}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
