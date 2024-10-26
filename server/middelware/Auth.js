import jwt from "jsonwebtoken";
import doteenv from "dotenv";
doteenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new Error("Access denied. No token provided.");
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};
