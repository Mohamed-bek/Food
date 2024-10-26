import axios from "axios";
import React, { useRef, useState } from "react";

const RestaurantReservation = () => {
  const initialValue = {
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 1,
  };
  const [formData, setFormData] = useState(initialValue);
  const popRef = useRef(null); // Removed TypeScript type

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://foodlly-ozos.vercel.app/reservation", formData);
      popRef.current?.classList.add("scale-[1]");
      setFormData(initialValue);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-fit mains relative w-full flex items-center justify-center py-4">
      <div
        ref={popRef}
        className="w-[340px] scale-0 md:w-[430px] py-5 px-3 bg-primary rounded-2xl text-secondary text-center font-bold duration-500 text-[2.5rem] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[999999]"
      >
        We’ll give you a quick call soon to confirm your reservation!{" "}
        <button
          onClick={() => popRef.current?.classList.remove("scale-[1]")}
          className="py-1 px-5 text-[1.7rem] block mx-auto rounded-lg bg-secondary text-primary mt-4 cursor-pointer"
        >
          Ok
        </button>
      </div>
      <div className="w-[92%] h-fit rounded-2xl md:w-[80%] md:h-[90%] flex justify-center items-center flex-wrap">
        <form
          onSubmit={handleSubmit}
          className="w-full h-fit md:h-full md:w-1/2 bg-white text-secondary px-4 py-3 shadow-md"
        >
          <h1 className="text-3xl font-bold text-center mb-6">Book a Table</h1>
          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-lg font-medium mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md focus:outline-secondary"
              placeholder="Your name"
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-lg font-medium mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md focus:outline-secondary"
              placeholder="Your email"
            />
          </div>

          {/* Phone Input */}
          <div className="mb-4">
            <label className="block text-lg font-medium mb-1">Phone:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded-md focus:outline-secondary"
              placeholder="Phone number"
            />
          </div>

          {/* Date and Time Inputs */}
          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label className="block text-lg font-medium mb-1">Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded-md focus:outline-secondary"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-lg font-medium mb-1">Time:</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded-md focus:outline-secondary"
              />
            </div>
          </div>

          {/* Guests Input */}
          <div className="mb-4">
            <label className="block text-lg font-medium mb-1">Guests:</label>
            <input
              type="number"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
              min="1"
              className="w-full border p-2 rounded-md focus:outline-secondary"
              placeholder="Number of Guests"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-secondary text-white py-2 rounded-md text-lg hover:bg-secondary-dark"
          >
            Confirm Reservation
          </button>
        </form>
        <div className="w-full h-fit -order-1 md:order-2 md:w-1/2 md:h-full mx-auto">
          <img className="h-full w-full" src="/images/table.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default RestaurantReservation;
