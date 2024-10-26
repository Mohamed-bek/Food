import "./App.css";
// import "animate.css";
import AddPlat from "./pages/AddPlat";
import About from "./pages/About";
import BookingList from "./pages/BookingList";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import Food from "./pages/Food";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Order from "./pages/Order";
import Orders from "./pages/Orders";
import Header from "./components/Header";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App bg-[#eee] min-h-[100vh] relative font-roboto overflow-x-hidden w-[100vw]">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/add-plat" element={<AddPlat />} />
        <Route path="/booking-list" element={<BookingList />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/food/:id" element={<Food />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
  );
}

export default App;
