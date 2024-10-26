import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../context/context";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = window.localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      navigate("/");
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        "https://food-beta-indol.vercel.app/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (typeof window !== "undefined") {
        window.localStorage.setItem("isLoggedIn", "true");
      }
      login();
      setSuccess("Login successful!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setError(error.response?.data?.err || "Login failed. Please try again.");
    } finally {
      setUsername("");
      setPassword("");
    }
  };

  if (isLoading) {
    return null; // Optionally, you could return a loading spinner or message here
  }

  return (
    <div className="flex items-center justify-center w-full mains py-40 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-secondary text-primary p-6 rounded-2xl shadow-md w-[320px] md:w-[400px]"
      >
        <h2 className="text-[4rem] font-bold mb-4 text-center">Login</h2>
        <h3 className="text-[1.3rem] font-light mb-4 text-center">
          This Place Only for Admins
        </h3>
        {error && (
          <p className="text-red-600 text-center mb-5 text-[1.3rem]">{error}</p>
        )}
        {success && (
          <p className="text-green-600 text-center mb-5 text-[1.3rem]">
            {success}
          </p>
        )}
        <div className="mb-4">
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-2 border-none text-black rounded w-full focus:outline-none"
            required
            placeholder="User Name"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 border-none text-black rounded w-full focus:outline-none"
            required
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          className="w-1/2 max-w-[100px] text-[1.3rem] font-medium cursor-pointer mx-auto block mt-5 py-2 bg-primary text-secondary rounded-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
