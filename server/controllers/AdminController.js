import { serialize } from "cookie";
import { Admin } from "../models/Admin.js";

export const LoginAdmin = async (req, res) => {
  try {
    console.log("register");
    const { username, password } = req.body;
    const admin = await findOne({ username });
    if (!admin) {
      throw new Error("Admin not found");
    }
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      throw new Error("Invalid password");
    }
    const token = admin.generateAuthToken();
    console.log("token", token);

    res.cookie("token", token, {
      httpOnly: true, // Helps prevent XSS
      secure: process.env.NODE_ENV === "production", // Set to true only in production
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      path: "/", // Available on all routes
    });
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(error.status || 500).json({ err: error.message });
  }
};

export const Logout = async (req, res) => {
  try {
    res.setHeader(
      "Set-Cookie",
      serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: -1,
        path: "/",
      })
    );
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(400).json({ err: error });
  }
};
