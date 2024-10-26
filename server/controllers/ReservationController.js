import { Reservation } from "../models/Reservation.js";

export const MakeReservation = async (req, res) => {
  try {
    const { name, date, time, email, phone, guests } = req.body;
    console.log(name, date, time, email, phone, guests);
    const reservation = await Reservation.create({
      name,
      date,
      time,
      email,
      phone,
      guests,
    });
    if (!reservation) {
      throw new Error("Reservation not created");
    }
    res.status(200).json({ reservation });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

export const GetListOfReservation = async (req, res) => {
  try {
    const { isConfirmed } = req.query;
    const filter = {};
    if (isConfirmed !== undefined) filter.isConfirmed = isConfirmed;
    const reservations = await Reservation.find(filter);
    if (!reservations) {
      throw new Error("Reservation not found");
    }
    res.status(200).json({ reservations });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

export const ConfirmReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      throw new Error("Reservation not found");
    }
    reservation.isConfirmed = true;
    await reservation.save();
    res.status(200).json({ reservation });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

export const DeleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      throw new Error("Reservation not found");
    }
    await reservation.deleteOne();
    res.status(200).json({ message: "Reservation canceled successfully" });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};
