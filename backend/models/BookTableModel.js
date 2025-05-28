import db from "../config/database.js";

// Get all bookings
export const getAllBookings = (result) => {
    db.query("SELECT * FROM booktable ORDER BY book_id DESC", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

// Insert booking (existing function)
export const insertBooking = (data, result) => {
    db.query("INSERT INTO booktable SET ?", data, (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });
};

// Update booking status
export const updateBookingStatus = (id, status, result) => {
    db.query(
        "UPDATE booktable SET status = ? WHERE book_id = ?",
        [status, id],
        (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        }
    );
};