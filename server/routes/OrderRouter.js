import { Router } from "express";
import {
  confirmOrder,
  deleteOrder,
  getOrder,
  getOrders,
  makeOrder,
} from "../controllers/OrderController.js";
import { authMiddleware } from "../middelware/Auth.js";

const OrderRouter = Router();

OrderRouter.post("/order", makeOrder);
OrderRouter.get("/orders", authMiddleware, getOrders);
OrderRouter.get("/order/:id", authMiddleware, getOrder);
OrderRouter.put("/order/:id", authMiddleware, confirmOrder);
OrderRouter.delete("/order/:id", authMiddleware, deleteOrder);

export default OrderRouter;
