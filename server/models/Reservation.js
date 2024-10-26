import mongoose, { Schema, model } from "mongoose";
const ReservationSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "The Name of the Booker is required"],
    },
    email: {
      type: String,
      required: [true, "The Email of the Booker is required"],
    },
    phone: {
      type: String,
      required: [true, "The Phone Number of the Booker is required"],
    },
    guests: {
      type: Number,
      required: [true, "The Number of guests is required"],
    },
    date: {
      type: String,
      required: [true, "The Date of the reservation is required"],
    },
    time: {
      type: String,
      required: [true, "The Time of the reservation is required"],
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Reservation = model("Reservation", ReservationSchema);
