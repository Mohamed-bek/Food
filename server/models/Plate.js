import mongoose from "mongoose";
const { Schema, model } = mongoose;

const platSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "The Name of the plat is required"],
    },
    subName: {
      type: String,
      required: [true, "The SubName of the plat is required"],
    },
    chef: String,
    isMain: {
      type: Boolean,
      default: false,
    },
    isBestSelles: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      required: [true, "The Plat Type is required"],
    },
    description: String,
    image: {
      public_id: String,
      url: String,
    },
    price: {
      type: Number,
      required: [true, "The Price of the plat is required"],
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 5,
    },
  },
  {
    timestamps: true,
  }
);

platSchema.index({ isMain: 1 });

export const Plat = model("Plat", platSchema);
