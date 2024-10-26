import { Router } from "express";
import { LoginAdmin } from "../controllers/AdminController.js";

const AdminRouter = Router();

AdminRouter.post("/login", LoginAdmin);

export default AdminRouter;
