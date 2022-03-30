const Cart = require("../models/Cart");

let getDetailCart = async (req, res) => {
    try {
        const cart = await Cart.findById(findById(req.params.id));
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
};


module.exports = {
    getDetailCart: getDetailCart,
};
