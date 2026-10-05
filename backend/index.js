const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());


// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/bookstore")
.then(() => {
    console.log("Connected to DB...");
})
.catch((err) => {
    console.log("Didn't connect with DB");
    console.log(err);
});


// Import Model
const Order = require("./module/Order");


// Route
app.post("/confirm-order", async (req, res) => {

    try {

        // Get data from frontend
        const { name, address, mobile, books } = req.body;

        console.log(req.body);

        // Validation
        if (!name || !address || !mobile || !books || books.length === 0) {

            return res.status(400).json({
                error: "All fields including books are required"
            });

        }

        // Create new order
        const newOrder = new Order({
            name,
            address,
            mobile,
            books
        });

        // Save in MongoDB
        await newOrder.save();

        console.log("Order saved:", newOrder);

        // Success response
        res.status(200).json({
            message: "Order saved successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: "Failed to save order"
        });

    }

});


// Start Server
app.listen(5000, () => {
    console.log("Server is Running....");
});