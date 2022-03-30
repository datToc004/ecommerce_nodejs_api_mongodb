const Order = require("../models/Order");
const Cart = require("../models/Cart");

let createOrder = async (req, res) => {
    try {
        const newCart = new Cart();
        newCart.user_id = req.body.user_id;
        newCart.products = req.body.products;
        let savedCart = await newCart.save();

        const newOrder = new Order();
        newOrder.user_id = req.body.user_id;
        newOrder.cart_id = savedCart._id;
        newOrder.total = req.body.total;
        newOrder.address = req.body.address;
        newOrder.phone = req.body.phone;
        const savedOrder = await newOrder.save();

        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
};
let updateCartOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        const updatedCart = await Cart.findByIdAndUpdate(
            order.cart_id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json(err);
    }
};
let updateDeliveryOrder = async (req, res) => {
    try {
        const updatedOrder = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
};
let deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        await Cart.findByIdAndDelete(order.cart_id);
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
};
let getOrderByUserId = async (req, res) => {
    try {
        const orders = await Order.find({ user_id: req.params.userId });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
};

let getAllOrder = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    createOrder: createOrder,
    updateCartOrder: updateCartOrder,
    updateDeliveryOrder: updateDeliveryOrder,
    deleteOrder: deleteOrder,
    getOrderByUserId: getOrderByUserId,
    getAllOrder: getAllOrder,
};
