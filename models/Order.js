const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        user_id: { type: String, required: true },
        cart_id: { type: String, required: true, unique: true },
        total: { type: Number, required: true },
        address: { type: String, required: true },
        phone: { type: String, required: true },
        status: { type: String, default: "pending" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
