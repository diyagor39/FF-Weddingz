const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());


// TEST ROUTE
app.get("/", (req, res) => {
  res.send("FF Weddingz Backend Running 🚀");
});

// BOOKING API
app.post("/api/bookings", (req, res) => {
  const { name, email, phone, service, date, message } = req.body;

  const sql = `
    INSERT INTO bookings (name, email, phone, service, date, message)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, email, phone, service, date, message], (err, result) => {
    if (err) {
      console.log("Booking insert error ❌", err);
      return res.status(500).json({
        success: false,
        message: "Booking failed",
      });
    }

    res.status(201).json({
      success: true,
      message: "Booking saved successfully ✅",
      bookingId: result.insertId,
    });
  });
});

// GET ALL BOOKINGS API
app.get("/api/bookings", (req, res) => {
  const sql = "SELECT * FROM bookings ORDER BY id DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.log("Bookings fetch error ❌", err);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch bookings",
      });
    }

    res.json({
      success: true,
      bookings: results,
    });
  });
});

// DELETE BOOKING API
app.delete("/api/bookings/:id", (req, res) => {
  const bookingId = req.params.id;

  const sql = "DELETE FROM bookings WHERE id = ?";

  db.query(sql, [bookingId], (err, result) => {
    if (err) {
      console.log("Delete booking error ❌", err);
      return res.status(500).json({
        success: false,
        message: "Booking delete failed",
      });
    }

    res.json({
      success: true,
      message: "Booking deleted successfully ✅",
    });
  });
});

// UPDATE BOOKING STATUS API
app.put("/api/bookings/:id/status", (req, res) => {
  const bookingId = req.params.id;
  const { status } = req.body;

  const sql = "UPDATE bookings SET status = ? WHERE id = ?";

  db.query(sql, [status, bookingId], (err, result) => {
    if (err) {
      console.log("Status update error ❌", err);
      return res.status(500).json({
        success: false,
        message: "Status update failed",
      });
    }

    res.json({
      success: true,
      message: "Status updated successfully ✅",
    });
  });
});

// USER SIGNUP API
app.post("/api/signup", (req, res) => {
  const { name, email, password } = req.body;

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Signup failed. Email already exists.",
      });
    }

    res.json({
      success: true,
      message: "Signup successful ✅",
    });
  });
});

// USER LOGIN API
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Login failed",
      });
    }

    if (results.length > 0) {
      res.json({
        success: true,
        message: "Login successful ✅",
        user: results[0],
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid email or password ❌",
      });
    }
  });
}); 

// SERVER START
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});