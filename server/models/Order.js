import mongoose, { Schema, model } from "mongoose";

const orderItemSchema = new Schema({
  plat: { type: Schema.Types.ObjectId, ref: "Plat", required: true },
  quantity: { type: Number, required: true, min: 1 },
});

const orderSchema = new Schema(
  {
    order: { type: [orderItemSchema], required: true },
    name: {
      type: String,
      required: [true, "The Name Of Client Is Required"],
    },
    phone: {
      type: String,
      required: [true, "The Phone Number Of Client Is Required"],
    },
    location: {
      type: String,
      required: [true, "The Location Of Client Is Required"],
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Order = model("Order", orderSchema);
