const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json()); // Needed to parse JSON in requests

mongoose.connect("mongodb://127.0.0.1:27017/bookstore").then(() => {
    console.log("Connected to DB...");
}).catch(() => {
    console.log("Didn't connect with DB");
});

const Order = require("./module/Order");

app.post("/confirm-order", async (req, res) => {
  try {
    const data = req.body;

    if (!name || !address || !mobile || !books || books.length === 0) {
      return res.status(400).json({ error: "All fields including books are required" });
    }

    const newOrder = new Order(data);
    await newOrder.save();
    console.log("Order saved:", newOrder);
    res.status(200).json({ message: "Order saved!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save order" });
  }
});

app.listen(5000, () => {
    console.log("Server is Running....");
});
