import { Router } from "express";
import {
  AddPlat,
  BestSellesPlat,
  DeletePlat,
  GetBestSellesPlats,
  GetFilterPlats,
  GetMainPlats,
  GetPlat,
  UpdatePlat,
} from "../controllers/PlatController.js";
import { authMiddleware } from "../middelware/Auth.js";
import multer from "multer";
const upload = multer();

const PlatRouter = Router();

PlatRouter.post("/plat", authMiddleware, upload.single("file"), AddPlat);
PlatRouter.put("/plat/:id", authMiddleware, UpdatePlat);
PlatRouter.delete("/plat", authMiddleware, DeletePlat);
PlatRouter.get("/plat/:id", GetPlat);
PlatRouter.get("/plats", GetFilterPlats);
PlatRouter.get("/main-plats", GetMainPlats);
PlatRouter.get("/best-selles-plats", GetBestSellesPlats);

export default PlatRouter;
