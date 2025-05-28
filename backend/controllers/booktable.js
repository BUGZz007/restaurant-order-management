import { insertBooking, getAllBookings, updateBookingStatus } from "../models/BookTableModel.js";

// Get all bookings
export const getBookings = (req, res) => {
    getAllBookings((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

// Create booking
export const createBooking = (req, res) => {
    const data = req.body;
    insertBooking(data, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

// Cancel booking
export const cancelBooking = (req, res) => {
    const id = req.params.id;
    updateBookingStatus(id, 'cancelled', (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

// Confirm booking
export const confirmBooking = (req, res) => {
    const id = req.params.id;
    updateBookingStatus(id, 'confirmed', (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};