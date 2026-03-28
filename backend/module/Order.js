const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    name: String,
    address: String,
    mobile: String,
    books: [String] ,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
