import { Order } from "../models/Order.js";
import { Plat } from "../models/Plate.js";

export const makeOrder = async (req, res) => {
  try {
    const { order, location, name, phone } = req.body;

    if (!order || !Array.isArray(order) || order.length === 0) {
      throw new Error("Order items are required");
    }
    const plateIds = order.map((item) => item.plat);
    const foundPlates = await Plat.find({ _id: { $in: plateIds } });

    if (foundPlates.length !== plateIds.length) {
      throw new Error("Some plates do not exist");
    }
    const newOrder = new Order({ order, location, name, phone });
    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrders = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const orders = await Order.find({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    res.status(200).json({ orders });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      throw new Error("Order not found");
    }
    await order.deleteOne();
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

export const confirmOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      throw new Error("Order not found");
    }
    order.isConfirmed = true;
    await order.save();
    res.status(200).json({ message: "Order confirmed successfully" });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

export const getOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the order by ID and populate the 'plat' field with plate details
    const order = await Order.findById(id).populate({
      path: "order.plat", // Access nested 'plat' field in 'order' array
      model: "Plat", // Make sure the model name matches your 'Plate' model
    });

    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return; // Ensure we exit the function
    }

    res.status(200).json({ order });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
